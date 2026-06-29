# 🎬 Jellyfin (Docker Setup)

Self-hosted **media server and entertainment system** using Docker.

> Clean, open-source alternative to Plex and Emby, with no premium feature paywalls.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/media/Jellyfin
```

2. Run the container:
```bash
docker compose up -d
```

---

## 🌐 Access

* Web UI: http://localhost:8096

---

## 🔌 Ports

| Port | Protocol | Description |
| ---- | -------- | ----------- |
| 8096 | TCP      | HTTP traffic / Web interface |
| 7359 | UDP      | Service discovery (e.g. for client app autodiscovery) |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `/home/jellyfin/config` | Configuration files and app settings |
| `/home/jellyfin/cache`  | Server caching (images, transcode cache, metadata) |
| `/mnt/media`            | Host media library directory (movies, series, music) |

---

## ⚠️ Network

This setup uses an external Docker network for reverse proxy access:

```bash
docker network create frontend
```

---

## 📚 Resources

* https://jellyfin.org/docs/
