# 🐘 pgAdmin (Docker Setup)

Web-based **PostgreSQL administration tool**.

> Simple UI to manage databases, users and queries.

---

## 🚀 Quick Start

```bash id="c5f2v3"
git clone https://github.com/Ammatias/homelab
cd homelab/apps/infrastructure/pgadmin
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:8080

---

## 🔐 Login

Credentials are set via `.env`:

```env id="2c3h7y"
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
```

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=secure-admin-password
```

### Optional (Authentik OAuth2)

To enable SSO via Authentik, configure:

```env
AUTHENTICATION_SOURCES=['oauth2']
AUTO_CREATE_USER=true
OAUTH2_CONFIG=[{'OAUTH2_NAME':'authentik','OAUTH2_DISPLAY_NAME':'Authentik','OAUTH2_CLIENT_ID':'CLIENT_ID','OAUTH2_CLIENT_SECRET':'CLIENT_SECRET','OAUTH2_TOKEN_URL':'TOKEN_URL','OAUTH2_AUTHORIZATION_URL':'AUTHORIZATION_URL','OAUTH2_API_BASE_URL':'API_BASE_URL','OAUTH2_USERINFO_ENDPOINT':'USERINFO_ENDPOINT','OAUTH2_SERVER_METADATA_URL':'SERVER_METADATA_URL','OAUTH2_SCOPE':'openid email profile','OAUTH2_ICON':'fa-key','OAUTH2_BUTTON_COLOR':'#ff5500'}]
```

---

## 📦 Included Services

* pgAdmin

---

## ⚠️ Network

This setup uses an external Docker network:

```bash id="v2l7yb"
docker network create frontend
docker network create backend
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 8080 | Web UI      |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `/home/pgadmin/data` | persistent application database and settings |
| `/home/pgadmin/config_local.py` | local configuration overrides (Python settings) |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 🔗 Connect to PostgreSQL

1. Open pgAdmin
2. Add new server

Use:

* **Host**: `postgres` (or your DB host)
* **Port**: `5432`
* **User**: your DB user
* **Password**: your DB password

---

## 📌 Notes

* Make sure PostgreSQL is reachable from Docker network
* Credentials are stored in `.env`
* Data is persisted in `/home/pgadmin/data`

---

## 🚧 Improvements

* Add auto server provisioning
* Add reverse proxy (traefik)
* Secure access via Authentik

---

## 📚 Resources

* https://www.pgadmin.org/docs/
