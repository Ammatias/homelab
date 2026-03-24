# 🖥 Homepage (Docker Setup)

Self-hosted **dashboard for your homelab services**.

> Clean, customizable and Docker-integrated homepage.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/dashboard/homepage
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:3000

---

## ⚙️ Configuration

### Required

Edit `.env` file:

```env
HOMEPAGE_VAR_API_SECRET=
PUID=1000
PGID=1000
```

Generate secret:

```bash
openssl rand -hex 32
```

---

## 📁 Config Structure

Homepage uses config files inside:

```bash
./config/
```

Main files:

* `services.yaml` → your apps
* `bookmarks.yaml` → links
* `settings.yaml` → general config
* `widgets.yaml` → integrations

---

## 📦 Included Services

* Homepage dashboard

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

| Path     | Purpose            |
| -------- | ------------------ |
| ./config | Main configuration |
| ./images | Custom images      |
| ./icons  | Custom icons       |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 📌 Notes

* Docker socket is mounted (read-only) for service discovery
* Make sure correct permissions (PUID/PGID) are set
* Changes in config require container restart

---

## 🚧 Improvements

* Add widgets (Docker, system stats)
* Add authentication via Authentik
* Add custom branding

---

## 📚 Resources

* https://gethomepage.dev/
