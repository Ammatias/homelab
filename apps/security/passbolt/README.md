# 🔑 Passbolt (Docker Setup)

Self-hosted **password manager for teams** using Docker.

> Secure, minimal and reproducible setup for homelab environments.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/security/passbolt
cp .env.example .env
# make sure PostgreSQL is running first
docker compose up -d
```

---

## 🌐 Access

* HTTP: http://localhost:8082
* HTTPS: https://localhost:8443

---

## ⚙️ Configuration

### Required

Edit `.env` file:

```env
APP_FULL_BASE_URL=https://your-domain.com

DATASOURCES_DEFAULT_URL=postgres://user:password@postgres_ip:5432/passbolt

EMAIL_TRANSPORT_DEFAULT_USERNAME=
EMAIL_TRANSPORT_DEFAULT_PASSWORD=
EMAIL_DEFAULT_FROM=
```

---

### 📌 Notes

* Replace `postgres_ip` with your PostgreSQL host
* Make sure PostgreSQL is reachable from Docker
* SMTP is required for user invitations

---

## 📦 Included Services

* Passbolt Server

---

## ⚠️ External Dependencies

This setup requires:

* PostgreSQL database

They are NOT included in this compose file.

Make sure:

* database is running
* credentials are correct
* network access is configured

---

## 🌐 Network

This setup uses an external Docker network:

```bash
docker network create proxy
```

---

## 📁 Volumes

| Path  | Purpose  |
| ----- | -------- |
| ./gpg | GPG keys |
| ./jwt | JWT keys |

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 8082 | HTTP        |
| 8443 | HTTPS       |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 📌 Notes

* First startup may take a few minutes
* HTTPS is recommended for production
* Email configuration is required for full functionality

---

## 🚧 Improvements

* Add reverse proxy (nginx / traefik)
* Add automatic HTTPS (Let's Encrypt)
* Add backup strategy

---

## 📚 Resources

* https://www.passbolt.com/docs/
