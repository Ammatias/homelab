# 🏠 Homelab

A collection of **self-hosted services** I run on my personal server using Docker.

> Real setups. Minimal configs. Easy to run.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/<category>/<service>
docker compose up -d
```

---

## 📦 Available Services

### 🔐 Security

* Authentik (SSO / identity provider)
* Vaultwarden (password manager)
* Passbolt (team password manager)

---

### ⚙️ Infrastructure

* Nginx (reverse proxy)
* Watchtower (auto updates)
* Dockge (Docker stack manager)

---

### 📊 Monitoring

* Uptime Kuma (uptime monitoring)
* Scrutiny (disk monitoring)

---

### 🧰 DevOps

* Semaphore (task runner / automation)

---

### 🖥 Dashboard

* Homepage (service dashboard)

---

## 🧠 Philosophy

* Keep it simple
* Make it reproducible
* Use what actually works

> If you can’t deploy it in one command — it’s too complex.

---

## 🛠 Requirements

* Docker
* Docker Compose
* Linux server

---

## ⚙️ Environment

Create `.env` file:

```bash
cp .env.example .env
```

---

## 📌 Notes

* These are real configurations used in my homelab
* Not production hardened
* Optimized for simplicity

---

## 🚧 Status

Continuously improving and adding new services.
