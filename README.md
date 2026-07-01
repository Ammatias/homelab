# 🏠 Homelab

A modular **self-hosted platform** built with Docker.

> Real infrastructure. Portable configs. No overengineering.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/<category>/<service>
docker compose up -d
```

---

## 🏗 Architecture

This homelab is built as a **layered system**:

* 🌐 Reverse proxy → Traefik (systemd, central entrypoint)
* 🐳 Services → Docker-based applications
* 🗄 Data layer → PostgreSQL
* 🔐 Auth layer → Authentik

See full architecture in docs:
👉 docs/architecture.md

---

## 📦 Services

### 🔐 Security

* Authentik (SSO / identity provider)
* Passbolt (password manager)

---

### ⚙️ Infrastructure

* Traefik (reverse proxy, system service)
* Dockhand (container management UI)
* Hawser (Docker remote API proxy)

---

### 📊 Monitoring

* Prometheus (metrics)
* Grafana (dashboards)
* Uptime Kuma (uptime monitoring)

---

### 🎬 Media Stack

* Radarr / Sonarr / Lidarr (media management)
* Prowlarr (indexers)
* Seerr (requests)

---

### 🎮 Game Services & Cache

* [Lancache](apps/game/lancache/README.md) (game cache & DNS server)
* [Pterodactyl Panel](apps/game/pterodactyl/README.md) (game management panel)
* [Wings](apps/game/wings/README.md) (Pterodactyl node daemon)
* [Crafty Controller](apps/game/crafty/README.md) (Minecraft server manager)

---

### 🤖 AI

* KoboldCpp (local LLM inference)
* SillyTavern (chat UI)
* LiteLLM (LLM proxy/gateway)
* OpenWebUI (chat UI interface)
* ComfyUI (image generation — experimental)

---

### 🧰 Tools & UI

* Homepage (dashboard)
* pgAdmin (database management)
* Trilium (notes / knowledge base)

---

## 🌐 Networking

* External `frontend` network (public-facing proxy routing)
* External `backend` network (internal service communication & databases)
* Domain-based routing (`*.domain.ru`)

---

## 🔐 Security

* HTTPS everywhere (Traefik)
* IP allowlist for sensitive services
* Secure headers
* Minimal exposed ports

---

## ⚙️ Configuration

Each service:

* Uses `.env`
* Uses relative paths (`./`)
* Is fully portable

---

## 💡 Features

* One-command deployments
* Clean and minimal configs
* Real setups — not tutorials
* Fully self-hosted (including AI)

---

## 🧠 Philosophy

* Keep it simple
* Make it reproducible
* Build real systems

> If it’s not reproducible — it’s broken

---

## 🛠 Requirements

* Docker
* Docker Compose
* Linux server

---

## 📌 Notes

* These are real configurations used in my homelab
* Some services are experimental (AI stack)
* Designed for learning and real usage

---

## 🚧 Status

Actively evolving:

* Improving architecture
* Expanding AI stack
* Adding new services
