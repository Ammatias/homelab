# 🎮 LAN Cache (Docker Setup)

Self-hosted **game download caching proxy and DNS server** using Docker.

> Cache game updates (Steam, Epic Games, Battle.net, Origin, etc.) to local storage so subsequent downloads run at LAN speed.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/game/lancache
```

2. Copy environment template and fill in settings (especially `LANCACHE_IP` and `DNS_BIND_IP`):
```bash
cp .env.example .env
```

3. Run the services:
```bash
docker compose up -d
```

---

## ⚙️ Configuration

Edit `.env`:

```env
USE_GENERIC_CACHE=true
LANCACHE_IP=192.168.1.100       # IP address of the cache server on your LAN
DNS_BIND_IP=192.168.1.100       # IP address of the DNS server to bind to
UPSTREAM_DNS=1.1.1.1            # Upstream DNS for forwarding non-cached queries
CACHE_ROOT=/mnt/cache           # Absolute path to cache storage
CACHE_DISK_SIZE=2000g           # Maximum disk cache size
MIN_FREE_DISK=100g              # Minimum free space to keep on the cache drive
CACHE_INDEX_SIZE=500m           # Index memory size for Nginx cache manager
CACHE_MAX_AGE=3650d             # Max age of cached files
TZ=Asia/Yekaterinburg
```

---

## 🔌 Ports

| Service    | Port | Protocol | Description |
| ---------- | ---- | -------- | ----------- |
| DNS        | 53   | UDP/TCP  | DNS Server to intercept game CDN domains |
| Monolithic | 80   | TCP      | HTTP cache proxy server |
| Monolithic | 443  | TCP      | HTTPS cache proxy server |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `./cache` | Local cache directory mapped to `/data/cache` |
| `./lancache/logs` | Local logs directory mapped to `/data/logs` |

---

## 📌 Usage

To use the cache, configure your clients (PC, console, etc.) to use the `DNS_BIND_IP` of the LAN Cache container as their **Primary DNS Server**. 

The DNS server will automatically intercept download requests for supported game services and route them through the local cache proxy. Other requests are forwarded to the `UPSTREAM_DNS`.

---

## 📚 Resources

* https://lancachenet.github.io/docs/
