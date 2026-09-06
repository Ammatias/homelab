import { lookup } from 'dns/promises';

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  'metadata.google.internal',
  'metadata.internal',
]);
const CLOUD_METADATA_IPS = new Set([
  '169.254.169.254',
  'fd00:ec2::254',
]);
const INTERNAL_HTTP_HOSTS = new Set(
  (process.env.TS_INTERNAL_HTTP_HOSTS || '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean),
);

export function isPrivateIP(ip) {
  const parts = ip.split('.');
  if (parts.length === 4) {
    const [a, b] = parts.map(Number);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
    if (a === 169 && b === 254) return true;
    if (a === 0) return true;
  }
  const lower = ip.toLowerCase();
  if (lower === '::1') return true;
  if (lower.startsWith('fe80:')) return true;
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true;
  if (lower.startsWith('::ffff:')) return isPrivateIP(lower.slice(7));
  return false;
}

export async function validateUrl(url, options = {}) {
  const allowedProtocols = options.allowedProtocols || ['http:', 'https:'];
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }

  if (!allowedProtocols.includes(parsed.protocol)) {
    return { valid: false, error: `Protocol "${parsed.protocol}" is not allowed. Use: ${allowedProtocols.join(', ')}` };
  }

  const hostname = parsed.hostname.toLowerCase();
  // Explicit, operator-controlled allowlist for internal services. All other
  // private and metadata addresses keep the upstream SSRF protection.
  if (INTERNAL_HTTP_HOSTS.has(hostname)) return { valid: true };
  if (BLOCKED_HOSTNAMES.has(hostname)) return { valid: false, error: `Hostname "${hostname}" is blocked` };
  if (CLOUD_METADATA_IPS.has(hostname)) return { valid: false, error: 'Cloud metadata endpoint is blocked' };
  if (isPrivateIP(hostname)) return { valid: false, error: 'Private/reserved IP addresses are blocked' };

  if (!options.skipDnsCheck) {
    try {
      const { address } = await lookup(hostname);
      if (isPrivateIP(address)) {
        return { valid: false, error: `Hostname "${hostname}" resolves to a private IP (${address})` };
      }
      if (CLOUD_METADATA_IPS.has(address)) {
        return { valid: false, error: 'Hostname resolves to a cloud metadata IP' };
      }
    } catch {
      // Let the caller surface ordinary DNS/network errors.
    }
  }
  return { valid: true };
}
