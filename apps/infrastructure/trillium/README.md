# 📝 Trilium (Docker Setup)

Self-hosted **note-taking and personal knowledge base**.

> Powerful hierarchical notes with full-text search and rich features.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/infrastructure/trillium
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:8080

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env
# Timezone
TZ=Asia/Yekaterinburg

# OAuth2 / Authentik settings
TRILIUM_BASE_URL=https://trilium.domain.ru
TRILIUM_CLIENT_ID=your-authentik-client-id
TRILIUM_CLIENT_SECRET=your-authentik-client-secret
TRILIUM_ISSUER_BASE_URL=https://authentik.domain.ru/application/o/trilium/
TRILIUM_ISSUER_NAME=Authentik
```

---

## 📦 Included Services

* Trilium

---

## ⚠️ Network

This setup uses an external Docker network:

```bash id="2zk5pr"
docker network create frontend
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 8080 | Web UI      |

---

## 📁 Volumes

| Path      | Purpose        |
| --------- | -------------- |
| /home/trilium | Notes and data |

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

* Data is stored in `/home/trilium`
* First startup may take a few minutes
* Change port if conflict occurs

---

## 🚧 Improvements

* Add backups

---

## 📚 Resources

* https://github.com/TriliumNext/Trilium
