import { downloadYouTube } from './audio/youtube.js';
import { buildCommand } from './tslib/index.js';
const MUSIC_DIR = process.env.MUSIC_DIR || '/data/music';
const CMD_PREFIX = '!';
const RADIO_BOT_ID = Number(process.env.RADIO_BOT_ID || '3');
const VIDEO_BOT_ID = Number(process.env.VIDEO_BOT_ID || '6');
const MUSIC_COMMANDS = new Set([
    'radio', 'play', 'stop', 'pause', 'skip', 'next', 'prev',
    'vol', 'volume', 'np', 'nowplaying', 'queue', 'add',
    'stream', 'stopstream', 'viewers',
]);
/**
 * Handles text-based music commands (!radio, !play, !stop, etc.)
 * by listening directly on each VoiceBot's TS3 connection.
 *
 * The bot receives `notifytextmessage` in its own channel —
 * no SSH EventBridge needed.
 */
export class MusicCommandHandler {
    prisma;
    voiceBotManager;
    registeredBots = new Set();
    constructor(prisma, voiceBotManager) {
        this.prisma = prisma;
        this.voiceBotManager = voiceBotManager;
    }
    /**
     * Register text message listener on a VoiceBot instance.
     * Called by VoiceBotManager whenever a bot is created/started.
     */
    registerBot(botId, bot) {
        if (this.registeredBots.has(botId))
            return;
        this.registeredBots.add(botId);
        bot.on('textMessage', (data) => {
            this.onTextMessage(botId, bot, data).catch(err => {
                console.error(`[MusicCmd] Error processing text message on bot ${botId}: ${err.message}`);
            });
        });
        console.log(`[MusicCmd] Registered text command listener on bot ${botId}`);
    }
    unregisterBot(botId) {
        this.registeredBots.delete(botId);
    }
    async onTextMessage(botId, bot, data) {
        const msg = (data.msg || '').trim();
        if (!msg.startsWith(CMD_PREFIX))
            return;
        const parts = msg.substring(CMD_PREFIX.length).split(/\s+/);
        const command = parts[0].toLowerCase();
        if (!MUSIC_COMMANDS.has(command))
            return;
        // Radio requests are dispatched centrally so the radio bot can remain
        // disconnected until requested. Music bots must never consume them,
        // and the radio bot must never consume music commands directly.
        if (botId === RADIO_BOT_ID || botId === VIDEO_BOT_ID || command === 'radio')
            return;
        const args = parts.slice(1).join(' ').trim();
        const userClid = parseInt(data.invokerid || '0');
        if (!userClid)
            return;
        // Ignore messages from ourselves (the bot)
        if (userClid === bot.ts3ClientId)
            return;
        console.log(`[MusicCmd] Bot ${botId}: !${command} ${args} (from clid=${userClid})`);
        try {
            switch (command) {
                case 'radio':
                    await this.handleRadio(botId, bot, userClid, args);
                    break;
                case 'play':
                    await this.handlePlay(bot, userClid, args);
                    break;
                case 'stop':
                    this.handleStop(bot, userClid);
                    break;
                case 'pause':
                    this.handlePause(bot, userClid);
                    break;
                case 'skip':
                case 'next':
                    await this.handleSkip(bot, userClid);
                    break;
                case 'prev':
                    await this.handlePrev(bot, userClid);
                    break;
                case 'vol':
                case 'volume':
                    this.handleVolume(bot, userClid, args);
                    break;
                case 'np':
                case 'nowplaying':
                    this.handleNowPlaying(bot, userClid);
                    break;
                case 'queue':
                case 'add':
                    await this.handleQueue(bot, userClid, args);
                    break;
                case 'stream':
                    await this.handleStream(bot, userClid, args);
                    break;
                case 'stopstream':
                    await this.handleStopStream(bot, userClid);
                    break;
                case 'viewers':
                    this.handleViewers(bot, userClid);
                    break;
            }
        }
        catch (err) {
            console.error(`[MusicCmd] Error handling !${command}: ${err.message}`);
            this.reply(bot, userClid, `Error: ${err.message}`);
        }
    }
    reply(bot, _targetClid, msg) {
        try {
            const cmd = buildCommand('sendtextmessage', {
                targetmode: 2,
                msg,
            });
            bot.client.sendCommand(cmd);
        }
        catch (err) {
            console.error(`[MusicCmd] Failed to send reply: ${err.message}`);
        }
    }
    // ─── Command Handlers ───────────────────────────────────────
    async handleRadio(botId, bot, userClid, args) {
        // Get serverConfigId for this bot from DB
        const dbBot = await this.prisma.musicBot.findUnique({ where: { id: botId }, select: { serverConfigId: true } });
        if (!dbBot) {
            this.reply(bot, userClid, 'Bot config not found.');
            return;
        }
        const stations = await this.prisma.radioStation.findMany({
            where: { serverConfigId: dbBot.serverConfigId },
            orderBy: { name: 'asc' },
        });
        if (stations.length === 0) {
            this.reply(bot, userClid, 'No radio stations configured.');
            return;
        }
        // No argument — list stations
        if (!args) {
            const lines = stations.map((s) => `[${s.id}] ${s.name}${s.genre ? ` (${s.genre})` : ''}`);
            this.reply(bot, userClid, 'Radio Stations:\n' + lines.join('\n'));
            return;
        }
        // Argument — play station by ID
        const stationId = parseInt(args);
        if (isNaN(stationId)) {
            this.reply(bot, userClid, 'Usage: !radio <id> — Use !radio to list stations.');
            return;
        }
        const station = stations.find((s) => s.id === stationId);
        if (!station) {
            this.reply(bot, userClid, `Station #${stationId} not found. Use !radio to list stations.`);
            return;
        }
        const queueItem = {
            id: `radio_${station.id}`,
            title: station.name,
            artist: station.genre ?? 'Radio',
            filePath: '',
            source: 'radio',
            streamUrl: station.url,
        };
        await bot.playStream(queueItem);
        this.reply(bot, userClid, `Now playing: ${station.name}`);
    }
    async handlePlay(bot, userClid, args) {
        if (!args) {
            if (bot.status === 'paused') {
                bot.resume();
                this.reply(bot, userClid, 'Resumed.');
                return;
            }
            this.reply(bot, userClid, 'Usage: !play <youtube-url>');
            return;
        }
        if (!args.startsWith('http://') && !args.startsWith('https://')) {
            this.reply(bot, userClid, 'Please provide a valid URL. Usage: !play <url>');
            return;
        }
        this.reply(bot, userClid, 'Loading...');
        try {
            const { filePath, info } = await downloadYouTube(args, MUSIC_DIR);
            const queueItem = {
                id: `yt_${info.id}`,
                title: info.title,
                artist: info.artist,
                duration: info.duration,
                filePath,
                source: 'youtube',
                sourceUrl: args,
            };
            bot.queue.add(queueItem);
            // Save to MusicRequest history
            this.saveMusicRequest(bot, queueItem);
            // If something is already playing, queue it instead of interrupting
            if (bot.status === 'playing' || bot.status === 'paused') {
                this.reply(bot, userClid, `Queued: ${info.artist} - ${info.title} (position #${bot.queue.length})`);
            }
            else {
                bot.queue.playAt(bot.queue.length - 1);
                await bot.play(queueItem);
                this.reply(bot, userClid, `Now playing: ${info.artist} - ${info.title}`);
            }
        }
        catch (err) {
            this.reply(bot, userClid, `Failed to play: ${err.message}`);
        }
    }
    async handleQueue(bot, userClid, args) {
        // No args — show current queue
        if (!args) {
            const items = bot.queue.getAll();
            if (items.length === 0) {
                this.reply(bot, userClid, 'Queue is empty.');
                return;
            }
            const np = bot.nowPlaying;
            const lines = items.slice(0, 15).map((item, i) => {
                const marker = np && item.id === np.id ? '▶ ' : '  ';
                const artist = item.artist ? `${item.artist} - ` : '';
                return `${marker}${i + 1}. ${artist}${item.title}`;
            });
            if (items.length > 15)
                lines.push(`  ... and ${items.length - 15} more`);
            this.reply(bot, userClid, `Queue (${items.length} tracks):\n${lines.join('\n')}`);
            return;
        }
        // URL provided — add to queue without interrupting
        if (!args.startsWith('http://') && !args.startsWith('https://')) {
            this.reply(bot, userClid, 'Usage: !queue [url] — Show queue or add a song.');
            return;
        }
        this.reply(bot, userClid, 'Loading...');
        try {
            const { filePath, info } = await downloadYouTube(args, MUSIC_DIR);
            const queueItem = {
                id: `yt_${info.id}`,
                title: info.title,
                artist: info.artist,
                duration: info.duration,
                filePath,
                source: 'youtube',
                sourceUrl: args,
            };
            bot.queue.add(queueItem);
            // Save to MusicRequest history
            this.saveMusicRequest(bot, queueItem);
            // If nothing is playing, start playing the queued item
            if (bot.status !== 'playing' && bot.status !== 'paused') {
                bot.queue.playAt(bot.queue.length - 1);
                await bot.play(queueItem);
                this.reply(bot, userClid, `Now playing: ${info.artist} - ${info.title}`);
            }
            else {
                this.reply(bot, userClid, `Queued: ${info.artist} - ${info.title} (position #${bot.queue.length})`);
            }
        }
        catch (err) {
            this.reply(bot, userClid, `Failed to queue: ${err.message}`);
        }
    }
    handleStop(bot, userClid) {
        bot.stopAudio();
        this.reply(bot, userClid, 'Playback stopped.');
    }
    handlePause(bot, userClid) {
        if (bot.status === 'paused') {
            bot.resume();
            this.reply(bot, userClid, 'Resumed.');
        }
        else if (bot.status === 'playing') {
            bot.pause();
            this.reply(bot, userClid, 'Paused.');
        }
        else {
            this.reply(bot, userClid, 'Nothing is playing.');
        }
    }
    async handleSkip(bot, userClid) {
        const next = bot.queue.next();
        if (next) {
            if (next.streamUrl) {
                await bot.playStream(next);
            }
            else {
                await bot.play(next);
            }
            this.reply(bot, userClid, `Skipped to: ${next.title}`);
        }
        else {
            bot.stopAudio();
            this.reply(bot, userClid, 'Queue empty — playback stopped.');
        }
    }
    async handlePrev(bot, userClid) {
        const prev = bot.queue.previous();
        if (prev) {
            if (prev.streamUrl) {
                await bot.playStream(prev);
            }
            else {
                await bot.play(prev);
            }
            this.reply(bot, userClid, `Previous: ${prev.title}`);
        }
        else {
            this.reply(bot, userClid, 'No previous track.');
        }
    }
    handleVolume(bot, userClid, args) {
        if (!args) {
            const vol = bot.currentConfig.volume;
            this.reply(bot, userClid, `Volume: ${vol}%`);
            return;
        }
        const vol = parseInt(args);
        if (isNaN(vol) || vol < 0 || vol > 100) {
            this.reply(bot, userClid, 'Usage: !vol <0-100>');
            return;
        }
        bot.setVolume(vol);
        this.reply(bot, userClid, `Volume set to ${vol}%.`);
    }
    handleNowPlaying(bot, userClid) {
        const np = bot.nowPlaying;
        if (!np) {
            this.reply(bot, userClid, 'Nothing is playing.');
            return;
        }
        const artist = np.artist ? `${np.artist} - ` : '';
        this.reply(bot, userClid, `Now playing: ${artist}${np.title}`);
    }
    // ─── Video Streaming Commands ─────────────────────────────
    async handleStream(bot, userClid, args) {
        if (!args) {
            this.reply(bot, userClid, 'Usage: !stream <url> [preset]  — Presets: 480p, 720p, 1080p');
            return;
        }
        const parts = args.split(/\s+/);
        const url = parts[0];
        const preset = parts[1] || undefined;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            this.reply(bot, userClid, 'Please provide a valid URL.');
            return;
        }
        if (bot.videoStreaming) {
            // Change source if already streaming
            try {
                await bot.setVideoSource(url);
                this.reply(bot, userClid, `Stream source changed to: ${url}`);
            }
            catch (err) {
                this.reply(bot, userClid, `Error: ${err.message}`);
            }
            return;
        }
        this.reply(bot, userClid, 'Starting video stream...');
        try {
            await bot.startVideoStream(url, preset);
            this.reply(bot, userClid, `Video stream started: ${url}`);
        }
        catch (err) {
            this.reply(bot, userClid, `Failed to start stream: ${err.message}`);
        }
    }
    async handleStopStream(bot, userClid) {
        if (!bot.videoStreaming) {
            this.reply(bot, userClid, 'No active video stream.');
            return;
        }
        await bot.stopVideoStream();
        this.reply(bot, userClid, 'Video stream stopped.');
    }
    handleViewers(bot, userClid) {
        const status = bot.videoStreamStatus;
        if (!status.streaming) {
            this.reply(bot, userClid, 'No active video stream.');
            return;
        }
        if (status.viewers.length === 0) {
            this.reply(bot, userClid, 'No viewers connected.');
            return;
        }
        const lines = status.viewers.map((v) => {
            const duration = Math.floor((Date.now() - v.joinedAt) / 1000);
            return `  clid=${v.clid} (${duration}s)`;
        });
        this.reply(bot, userClid, `Viewers (${status.viewerCount}):\n${lines.join('\n')}`);
    }
    saveMusicRequest(bot, item) {
        if (!item.sourceUrl || !bot.currentConfig.serverConfigId)
            return;
        this.prisma.musicRequest.upsert({
            where: {
                serverConfigId_url: {
                    serverConfigId: bot.currentConfig.serverConfigId,
                    url: item.sourceUrl,
                },
            },
            update: {
                requestedAt: new Date(),
                title: item.title || 'Unknown Title',
            },
            create: {
                serverConfigId: bot.currentConfig.serverConfigId,
                url: item.sourceUrl,
                title: item.title || 'Unknown Title',
                requestedAt: new Date(),
            },
        }).catch((err) => {
            console.error('[MusicCmd] Failed to save music request history:', err.message);
        });
    }
}
//# sourceMappingURL=music-command-handler.js.map
