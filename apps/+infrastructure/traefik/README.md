# 🌐 Traefik (Systemd Setup)

Production-like **reverse proxy setup** using Traefik.

> Central entry point for all self-hosted services with HTTPS and routing.

---

## 🚀 Overview

This setup runs Traefik as a **systemd service**, not in Docker.

### Features:

* 🔐 Automatic HTTPS (Let's Encrypt)
* 🌍 Domain-based routing
* 🧩 Middleware support (headers, IP allowlist)
* 📊 Dashboard access
* ⚡ Lightweight and fast

---

## 🏗 Architecture

* Traefik runs on host (systemd)
* Services run in Docker
* Routing is configured via dynamic files

---

## 🌐 Domains

| Service           | Domain                 |
| ----------------- | ---------------------- |
| Traefik Dashboard | traefik.domain.ru      |
| Admin Dashboard   | dash.traefik.domain.ru |
| Dockhand          | dockhand.domain.ru     |

---

## 🔐 TLS Configuration

* TLS 1.2+ enforced
* Secure cipher suites
* Wildcard certificate (`*.domain.ru`)

---

## 📁 Configuration Structure

```bash
traefik/
├── traefik.yml        # main config
├── dynamic/
│   ├── routers.yaml
│   ├── middlewares.yaml
│   └── tls.yaml
```

---

## ⚙️ Setup

### 1. Install Traefik

Download binary:

```bash
wget https://github.com/traefik/traefik/releases
```

---

### 2. Create systemd service

```ini
[Unit]
Description=Traefik
After=network.target

[Service]
ExecStart=/usr/local/bin/traefik --configFile=/etc/traefik/traefik.yml
Restart=always

[Install]
WantedBy=multi-user.target
```

---

### 3. Start service

```bash
sudo systemctl daemon-reexec
sudo systemctl enable traefik
sudo systemctl start traefik
```

---

## 🔌 Example Service

Example routing (Dockhand):

* Domain: `dockhand.domain.ru`
* Target: `http://ip:3000`

---

## 🔐 Security

* IP allowlist for admin routes
* HTTPS enforced
* Secure headers middleware

---

## 📌 Notes

* Replace `domain.ru` with your domain
* Replace `ip` with your server IP or container name
* Uses external DNS + certificate resolver

---

## 🚧 Improvements

* Move services to Docker labels
* Add Authentik integration
* Add rate limiting
* Add access logs

---

## 📚 Resources

* https://doc.traefik.io/traefik/
