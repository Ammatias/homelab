# 🏠 Homelab

A modular **self-hosted platform** built with Docker.

> Real infrastructure. Portable configs. No overengineering.

---

## 🚀 Deployment model

These files are sanitized, portable examples. The live environment is managed through Dockhand; repository files are reviewed, parameterized, and imported there instead of being treated as the current production source of truth. See [deployment guidance](docs/deployment.md).

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

* [Authentik](apps/security/authentik/README.md) (SSO / identity provider)
* [Passbolt](apps/security/passbolt/README.md) (password manager)

---

### ⚙️ Infrastructure

* [Traefik](apps/infrastructure/traefik/README.md) (reverse proxy, system service)
* [Dockhand](apps/infrastructure/dockhand/README.md) (container management UI)
* [Hawser](apps/infrastructure/hawser/README.md) (Docker remote API proxy)

---

### 📊 Monitoring

* [Prometheus](apps/monitoring/prometheus/README.md) (metrics)
* [Grafana](apps/monitoring/grafana/README.md) (dashboards)
* [pve-exporter](apps/monitoring/pve-exporter/README.md) (Proxmox VE metrics for Prometheus and Grafana)

---

### 🎬 Media Stack

* [Radarr / Sonarr / Lidarr / Prowlarr / Seerr](apps/media/arr/README.md) (media management)

---

### 🎮 Game Services & Cache

* [Lancache](apps/game/lancache/README.md) (game cache & DNS server)
* [Pterodactyl Panel](apps/game/pterodactyl/README.md) (game management panel)
* [Wings](apps/game/wings/README.md) (Pterodactyl node daemon)
* [Crafty Controller](apps/game/crafty/README.md) (Minecraft server manager)
* [TeamSpeak 6](apps/game/teamspeak/README.md) (voice server, TS6 Manager, music bots)

---

### 🤖 AI

* [KoboldCpp](apps/ai/coboldcpp/README.md) (local LLM inference)
* [SillyTavern](apps/ai/sillytavern/README.md) (chat UI)
* [LiteLLM](apps/ai/litellm/README.md) (LLM proxy/gateway)
* [OpenWebUI](apps/ai/openwebui/README.md) (chat UI interface)
* [ComfyUI](apps/ai/comfyui/README.md) (image generation — experimental)

---

### 🧰 Tools & UI

* [Homepage](apps/dashboard/homepage/README.md) (dashboard)
* [pgAdmin](apps/infrastructure/pgadmin/README.md) (database management)
* [Trilium](apps/infrastructure/trillium/README.md) (notes / knowledge base)

---

### ✉️ Communication

* [Mailcow](apps/communication/mailcow/README.md) (mail server stack)
* [Bulwark Webmail](apps/communication/bulwark/README.md) (webmail and Mailcow bridge)

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

* Uses `.env.example` templates; real `.env` files are never published
* Uses relative paths (`./`)
* Is fully portable

---

## 💡 Features

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

* These are sanitized examples derived from real configurations
* Runtime state and secrets are intentionally excluded
* Some services are experimental (AI stack)
* Designed for learning and real usage

---

## 🚧 Status

Actively evolving:

* Improving architecture
* Expanding AI stack
* Adding new services
