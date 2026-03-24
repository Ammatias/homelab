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

```env id="0i4mzs"
PGADMIN_DEFAULT_EMAIL=
PGADMIN_DEFAULT_PASSWORD=
```

---

## 📦 Included Services

* pgAdmin

---

## ⚠️ Network

This setup uses an external Docker network:

```bash id="v2l7yb"
docker network create proxy
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 8080 | Web UI      |

---

## 📁 Volumes

| Path   | Purpose      |
| ------ | ------------ |
| ./data | pgAdmin data |

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
* Data is persisted in `./data`

---

## 🚧 Improvements

* Add auto server provisioning
* Add reverse proxy (traefik)
* Secure access via Authentik

---

## 📚 Resources

* https://www.pgadmin.org/docs/
