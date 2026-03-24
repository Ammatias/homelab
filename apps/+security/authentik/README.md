# 🔐 Authentik (Docker Setup)

Self-hosted **Identity Provider & SSO solution** using Docker.

> Simple, reproducible setup for homelab environments.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/security/authentik
cp .env.example .env
# make sure postgres + redis are running first
docker compose up -d
```

---

## 🌐 Access

* HTTP: http://localhost:9000
* HTTPS: https://localhost:9443

---

## ⚙️ Configuration

- Worker runs as root to access Docker socket

### Required

Edit `.env` file:

```env
AUTHENTIK_SECRET_KEY=
POSTGRES_USER=authentik
POSTGRES_PASSWORD=authentik
POSTGRES_DB=authentik
```

Generate secret key:

```bash
openssl rand -base64 32
```

---

### Notes

- Worker runs as root to access Docker socket
- Make sure PostgreSQL and Redis are reachable

---

### Optional (Email)

```env
AUTHENTIK_EMAIL_HOST=
AUTHENTIK_EMAIL_PORT=587
AUTHENTIK_EMAIL_USERNAME=
AUTHENTIK_EMAIL_PASSWORD=
```

---

## 📦 Included Services

* Authentik Server

---

## ⚠️ External Dependencies

This setup requires external services:

- PostgreSQL
- Redis

They are NOT included in this compose file.

Make sure they are:
- running
- accessible from Docker network
- correctly configured in `.env`

---

### Database & Redis

Set connection details in `.env`:

- `POSTGRESQL_HOST` → hostname of your database
- `POSTGRESQL_PORT` → usually 5432
- Redis must be reachable at the same Docker network

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create proxy
```

---

## 📁 Volumes

| Path               | Purpose             |
| ------------------ | ------------------- |
| ./media            | Uploaded files      |
| ./custom-templates | Custom UI templates |

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 9000 | HTTP        |
| 9443 | HTTPS       |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 📌 Notes

* First startup may take a few minutes
* Make sure ports `9000` and `9443` are available
* Use a reverse proxy (nginx, traefik) for production

---

## 🚧 Improvements

* Add reverse proxy support
* Add HTTPS with Let's Encrypt
* Add backup strategy

---

## 📚 Resources

* https://goauthentik.io/docs/
