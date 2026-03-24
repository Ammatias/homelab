# 🐳 Dockhand (Docker Setup)

Lightweight **Docker container management UI**.

> Simple interface to manage containers in your homelab.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/infrastructure/dockhand
docker compose up -d
```

---

## 🌐 Access

* http://localhost:3000

---

## ⚙️ Configuration

No additional configuration required.

---

## 📦 Included Services

* Dockhand

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create proxy
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 3000 | Web UI      |

---

## 📁 Volumes

| Path                 | Purpose           |
| -------------------- | ----------------- |
| ./data               | Application data  |
| /var/run/docker.sock | Docker API access |

---

## 🔐 Security

Dockhand requires access to Docker socket:

```bash
/var/run/docker.sock
```

⚠️ This gives full control over your Docker environment.

Use only in trusted environments.

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 📌 Notes

* Runs on port `3000` (change if conflict occurs)
* Requires Docker socket access
* Data is persisted in `./data`

---

## 🚧 Improvements

* Add authentication (reverse proxy + Authentik)
* Change default port
* Restrict access via firewall

---

## 📚 Resources

* https://hub.docker.com/r/fnsys/dockhand
