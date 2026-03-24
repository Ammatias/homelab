# 📝 Trilium (Docker Setup)

Self-hosted **note-taking and personal knowledge base**.

> Powerful hierarchical notes with full-text search and rich features.

---

## 🚀 Quick Start

```bash id="h8m3qs"
git clone https://github.com/Ammatias/homelab
cd homelab/apps/productivity/trilium
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:8083

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env id="d2x7ua"
TZ=UTC
```

---

## 📦 Included Services

* Trilium

---

## ⚠️ Network

This setup uses an external Docker network:

```bash id="2zk5pr"
docker network create proxy
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 8083 | Web UI      |

---

## 📁 Volumes

| Path      | Purpose        |
| --------- | -------------- |
| ./trilium | Notes and data |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 🔐 Reverse Proxy

If using reverse proxy, set:

```env id="o5z7qn"
TRILIUM_NETWORK_TRUSTEDREVERSEPROXY=172.18.0.0/16
```

---

## 📌 Notes

* Data is stored in `./trilium`
* First startup may take a few minutes
* Change port if conflict occurs

---

## 🚧 Improvements

* Add authentication via Authentik
* Add backups
* Add reverse proxy (Traefik)

---

## 📚 Resources

* https://github.com/TriliumNext/Trilium
