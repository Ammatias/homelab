# 🚀 Deployment

Basic instructions to run services.

---

## 📦 Requirements

* Docker
* Docker Compose
* Linux server

---

## ⚙️ Setup

Clone repository:

```bash
git clone https://github.com/Ammatias/homelab
```

---

## ▶️ Run service

```bash
cd apps/<category>/<service>
docker compose up -d
```

---

## 🌐 Networking

Make sure required networks exist:

```bash
docker network create proxy
docker network create database
```

---

## 🔐 Environment

Create `.env` where required:

```bash
cp .env.example .env
```

---

## 📌 Notes

* Each service is independent
* Can be deployed separately
* Designed for incremental setup
