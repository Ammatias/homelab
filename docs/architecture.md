# 🏗 Architecture

This homelab is designed as a **layered self-hosted platform**.

---

## 🔄 Request Flow

```
User → Traefik → Service → Database (optional)
```

---

## 🧱 Layers

### 🌐 Entry Layer

* Reverse proxy: Traefik (systemd)
* Handles:

  * HTTPS
  * routing
  * middleware

---

### 🐳 Application Layer

* Docker-based services
* Each service runs independently
* Connected via Docker networks

---

### 🗄 Data Layer

* PostgreSQL
* Persistent volumes
* Used by multiple services

---

### 🔐 Auth Layer

* Central authentication (SSO)
* Used to secure internal services

---

## 📌 Key Principles

* Modular services
* Portable configurations (`./`)
* Minimal external dependencies
* Real-world usage

---

## 🎯 Goal

Build a **reproducible and practical self-hosted system**

---

## 🏗 Architecture Diagram

                         🌍 Internet
                              │
                              ▼
                    ┌──────────────────┐
                    │     Traefik      │
                    │ (systemd, HTTPS) │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │  Homepage  │  │  Dockhand  │  │  Grafana   │
     └────────────┘  └────────────┘  └────────────┘

              ▼              ▼              ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │ Authentik  │  │  pgAdmin   │  │ Prometheus │
     └────────────┘  └────────────┘  └────────────┘

────────────────────────────────────────────────────

                    🤖 AI Layer

        ┌──────────────────────────────┐
        │        SillyTavern           │
        │         (UI)                │
        └────────────┬───────────────┘
                     ▼
        ┌──────────────────────────────┐
        │        KoboldCpp             │
        │     (LLM backend)           │
        └────────────┬───────────────┘
                     ▼
              [ Local Models ]

        ┌──────────────────────────────┐
        │        ComfyUI               │
        │   (image generation)         │
        └──────────────────────────────┘

────────────────────────────────────────────────────

                    🎬 Media Stack

        Radarr ─┐
        Sonarr ─┼──→ Prowlarr ─→ Indexers
    Jellyseerr ─┘
        │
        ▼
    Download Client (future)

────────────────────────────────────────────────────

                    🗄 Data Layer

            ┌────────────────────┐
            │     PostgreSQL     │
            └────────────────────┘

────────────────────────────────────────────────────

                    🌐 Networks

- proxy → Traefik ↔ services
- database → services ↔ PostgreSQL

