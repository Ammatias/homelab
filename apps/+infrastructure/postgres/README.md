# 🐘 PostgreSQL (Docker Setup)

Self-hosted **PostgreSQL database** using Docker.

> Reliable and widely used relational database for homelab services.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/infrastructure/postgres
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* Host: `localhost`
* Port: `5432`

---

## 🔐 Credentials

Set in `.env`:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app
```

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

---

## 📦 Included Services

* PostgreSQL

---

## 🌐 Network

This setup uses an external Docker network:

```bash
docker network create database
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 5432 | PostgreSQL  |

---

## 📁 Volumes

| Path   | Purpose          |
| ------ | ---------------- |
| ./data | Database storage |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 🔗 Connect from Other Services

Use:

* Host: `postgres`
* Port: `5432`

---

## 📌 Notes

* Data is persisted in `./data`
* Make sure credentials match your services
* Consider removing port exposure for better security

---

## 🔒 Security

For better security:

* Remove port exposure (`5432:5432`)
* Use internal Docker network only
* Use strong passwords

---

## 🚧 Improvements

* Add automated backups
* Add replication
* Add monitoring (Prometheus exporter)

---

## 📚 Resources

* https://www.postgresql.org/docs/
