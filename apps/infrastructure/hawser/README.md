# 🐳 Hawser (Docker Setup)

Self-hosted **Docker Remote API proxy / helper** using Docker.

> Securely exposes the local Docker daemon socket over a TCP port (`2376`) for remote integration.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/infrastructure/hawser
```

2. Run the container:
```bash
docker compose up -d
```

---

## 🌐 Access

* Port: `2376` (TCP)

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 2376 | Exposed Docker remote daemon API port |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `/var/run/docker.sock` | Direct read/write access to the host's Docker socket daemon |

---

## ⚠️ Security Notice

> [!CAUTION]
> Exposing `/var/run/docker.sock` over a TCP port gives anyone with access to port `2376` root-level privileges on the host system.
> Ensure this port is not exposed to the public internet and is firewalled/restricted to trusted local clients.
