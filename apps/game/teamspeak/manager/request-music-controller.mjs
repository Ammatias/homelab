import { createHmac } from 'node:crypto';
import { createServer } from 'node:http';

const backendUrl = process.env.MANAGER_BACKEND_URL || 'http://backend:3001';
const botId = Number(process.env.REQUEST_BOT_ID);
const jwtSecret = process.env.JWT_SECRET;
const managerUserId = Number(process.env.MANAGER_USER_ID || 1);
const managerUsername = process.env.MANAGER_USERNAME || 'controller';
const verifiedGroupId = String(process.env.VERIFIED_GROUP_ID || '');
const publicTeamspeakHost = process.env.PUBLIC_TEAMSPEAK_HOST || '';
const allowedChannels = new Set(
  (process.env.ALLOWED_CHANNEL_IDS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
);

if (!botId || !jwtSecret || !verifiedGroupId || !publicTeamspeakHost || allowedChannels.size === 0) {
  throw new Error('REQUEST_BOT_ID, JWT_SECRET, VERIFIED_GROUP_ID, PUBLIC_TEAMSPEAK_HOST and ALLOWED_CHANNEL_IDS are required');
}

const pending = [];
const issuedTokens = new Map();
let workerRunning = false;
let activeChannel = null;
let activeStage = 'idle';

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function makeJwt() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({
    id: managerUserId,
    username: managerUsername,
    role: 'admin',
    iat: now,
    exp: now + 300,
  }));
  const unsigned = `${header}.${payload}`;
  const signature = createHmac('sha256', jwtSecret).update(unsigned).digest('base64url');
  return `${unsigned}.${signature}`;
}

async function api(path, options = {}) {
  const response = await fetch(`${backendUrl}${path}`, {
    ...options,
    headers: {
      authorization: `Bearer ${makeJwt()}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!response.ok) {
    throw new Error(`${options.method || 'GET'} ${path}: HTTP ${response.status} ${text}`);
  }
  return data;
}

async function botState() {
  return api(`/api/music-bots/${botId}`);
}

async function sendPrivateMessage(clid, message) {
  return api(`/api/servers/1/vs/1/clients/${clid}/message`, {
    method: 'POST',
    body: JSON.stringify({ msg: message }),
  });
}

async function onboardClient(clid) {
  const clients = await api('/api/servers/1/vs/1/clients');
  const client = clients.find((item) => String(item.clid) === String(clid));
  if (!client || String(client.client_type) === '1') return { needed: false };

  const groups = String(client.client_servergroups || '').split(',').filter(Boolean);
  if (groups.includes(verifiedGroupId) || groups.includes('9') || groups.some((id) => id !== '8')) {
    return { needed: false };
  }

  const uid = String(client.client_unique_identifier || '');
  const cldbid = String(client.client_database_id || '');
  if (!uid || !cldbid) return { needed: false };

  const previousToken = issuedTokens.get(uid);
  if (previousToken) {
    try {
      await api(`/api/servers/1/vs/1/tokens/${encodeURIComponent(previousToken)}`, { method: 'DELETE' });
    } catch {
      // A previously issued one-time key may already have been redeemed.
    }
  }
  const created = await api('/api/servers/1/vs/1/tokens', {
    method: 'POST',
    body: JSON.stringify({
      tokentype: '0',
      tokenid1: verifiedGroupId,
      tokenid2: '0',
      tokendescription: `Guest verification: ${uid}`,
    }),
  });
  const token = String((Array.isArray(created) ? created[0] : created)?.token || '');
  if (!token) throw new Error('Manager did not return a privilege key');
  issuedTokens.set(uid, token);

  const musicBot = await botState();
  const params = new URLSearchParams({ port: '9987', token });
  if (musicBot.serverPassword) params.set('password', musicBot.serverPassword);
  const confirmationUrl = `teamspeak://${publicTeamspeakHost}?${params}`;
  const message = [
    '[B]Добро пожаловать в Ammatias Game Hub![/B]',
    'До подтверждения вам доступно только пребывание в лобби.',
    `[URL=${confirmationUrl}][B][COLOR=#43B581]✅ Подтвердить и получить базовые права[/COLOR][/B][/URL]`,
    'Кнопка повторно подключит вас к серверу и применит персональный одноразовый ключ.',
  ].join('\n');
  await sendPrivateMessage(client.clid, message);
  console.log(`[onboarding] One-time privilege key sent to cldbid=${cldbid}`);
  return { needed: true };
}

async function waitFor(predicate, timeoutMs, description) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const state = await botState();
    if (predicate(state)) return state;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Timed out waiting for ${description}`);
}

async function stopBot() {
  try {
    await api(`/api/music-bots/${botId}/stop`, { method: 'POST' });
  } catch (error) {
    console.error('[request-bot] Stop failed:', error.message);
  }
}

async function playRequest(request) {
  activeChannel = request.channelId;
  activeStage = 'starting';
  console.log(`[request-bot] Starting request in channel ${request.channelId}`);

  try {
    await api(`/api/music-bots/${botId}`, {
      method: 'PUT',
      body: JSON.stringify({ defaultChannel: request.channelId, autoStart: false }),
    });
    await api(`/api/music-bots/${botId}/start`, { method: 'POST' });
    await waitFor((state) => state.status === 'connected', 30000, 'bot connection');

    // From this point the bot hears channel chat itself, so later !play commands
    // in this channel are handled by TS6 Manager and appended to its queue.
    activeStage = 'joined';
    await api(`/api/music-bots/${botId}/play-url`, {
      method: 'POST',
      body: JSON.stringify({ url: request.url }),
    });
    activeStage = 'playing';

    let playbackSeen = false;
    let idleSince = 0;
    const deadline = Date.now() + 12 * 60 * 60 * 1000;
    while (Date.now() < deadline) {
      const state = await botState();
      if (state.status === 'playing' || state.status === 'paused' || state.nowPlaying) {
        playbackSeen = true;
        idleSince = 0;
      } else if (playbackSeen && state.status === 'connected' && !state.nowPlaying) {
        if (!idleSince) idleSince = Date.now();
        if (Date.now() - idleSince >= 6000) break;
      } else if (state.status === 'error' || state.status === 'stopped') {
        throw new Error(`Bot entered state ${state.status}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  } finally {
    activeStage = 'stopping';
    await stopBot();
    console.log(`[request-bot] Left channel ${request.channelId}`);
    activeChannel = null;
    activeStage = 'idle';
  }
}

async function runWorker() {
  if (workerRunning) return;
  workerRunning = true;
  try {
    while (pending.length > 0) {
      const request = pending.shift();
      try {
        await playRequest(request);
      } catch (error) {
        console.error('[request-bot] Request failed:', error.message);
      }
    }
  } finally {
    workerRunning = false;
  }
}

function jsonResponse(response, status, body) {
  response.writeHead(status, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(body));
}

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url, 'http://controller.internal');
  if (request.method === 'GET' && requestUrl.pathname === '/health') {
    jsonResponse(response, 200, {
      status: 'ok',
      activeChannel,
      activeStage,
      queued: pending.length,
    });
    return;
  }
  if (request.method !== 'POST' || !['/play', '/onboard'].includes(requestUrl.pathname)) {
    jsonResponse(response, 404, { error: 'Not found' });
    return;
  }

  let raw = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    raw += chunk;
    if (raw.length > 8192) request.destroy();
  });
  request.on('end', () => {
    try {
      const body = JSON.parse(raw || '{}');
      if (requestUrl.pathname === '/onboard') {
        const clid = String(body.clid || '');
        if (!clid) throw new Error('clid is required');
        void onboardClient(clid).catch((error) => console.error('[onboarding] Failed:', error.message));
        jsonResponse(response, 202, { accepted: true });
        return;
      }
      const channelId = String(body.channelId || '');
      const url = String(body.url || '').trim();
      if (!allowedChannels.has(channelId)) {
        jsonResponse(response, 400, { error: 'Channel is not enabled for request music' });
        return;
      }
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        throw new Error('Only HTTP(S) URLs are supported');
      }

      // When the bot is already present in this channel, its built-in command
      // listener receives the same message and adds the request to its queue.
      if (activeChannel === channelId && ['joined', 'playing'].includes(activeStage)) {
        jsonResponse(response, 202, { accepted: true, handledByConnectedBot: true });
        return;
      }

      pending.push({ channelId, url });
      void runWorker();
      jsonResponse(response, 202, { accepted: true, position: pending.length });
    } catch (error) {
      jsonResponse(response, 400, { error: error.message });
    }
  });
});

server.listen(3100, '0.0.0.0', () => {
  console.log(`[request-bot] Listening on :3100 for channels ${[...allowedChannels].join(',')}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await stopBot();
    server.close(() => process.exit(0));
  });
}
