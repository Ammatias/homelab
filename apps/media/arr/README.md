# 🎬 Arr Stack (Docker Setup)

Self-hosted **media automation stack** using Docker.

> Fully automated, portable setup for managing movies, TV shows and requests.

---

## 🚀 Included Services

* Radarr → movie management
* Sonarr → TV series management
* Prowlarr → indexer manager
* Jellyseerr → user requests
* FlareSolverr → bypass anti-bot protection
* Whisparr → niche content manager

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/media/arr
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

| Service      | URL                   |
| ------------ | --------------------- |
| Radarr       | http://localhost:7878 |
| Sonarr       | http://localhost:8989 |
| Prowlarr     | http://localhost:9696 |
| Seerr        | http://localhost:5055 |
| FlareSolverr | http://localhost:8191 |

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env
PUID=1000
PGID=1000
TZ=UTC
```

---

## 📁 Volumes

All services now use **relative paths** for full portability:

| Path             | Purpose           |
| ---------------- | ----------------- |
| /home/radarr     | Radarr config     |
| /home/sonarr     | Sonarr config     |
| /home/prowlarr   | Prowlarr config   |
| /home/jellyseerr | Jellyseerr config |
| /home/whisparr   | Whisparr config   |
| /mnt/media       | Media files       |

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create frontend
docker network create backend
```

---

## 🔌 Ports

| Service      | Port |
| ------------ | ---- |
| Radarr       | 7878 |
| Sonarr       | 8989 |
| Prowlarr     | 9696 |
| Seerr        | 5055 |
| FlareSolverr | 8191 |

---

## 🔐 Environment

All services use shared environment variables:

* `PUID` → user ID
* `PGID` → group ID
* `TZ` → timezone

Make sure they match your system.

---

## 📌 Notes

* All paths are now **relative (`./`)** → fully portable setup
* No hardcoded system paths
* `security_opt` is enabled (`no-new-privileges=true`)
* `.env` is used consistently across all services

---

## 🔗 Setup Flow

1. Open Prowlarr → add indexers
2. Connect Prowlarr to Radarr & Sonarr
3. Configure download client
4. Use Seerr for requests

---

## 🚧 Improvements

* Add qBittorrent (download client)
* Add reverse proxy (Traefik)
* Add authentication via Authentik

---

## 📚 Resources

* https://wiki.servarr.com/
