# 🎮 Crafty Controller (Docker Setup)

Self-hosted **Minecraft server wrapper and manager** using Docker.

> Manage Minecraft servers, view console logs, schedule backups, and track performance from a sleek web interface.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/game/crafty
```

2. Run the service:
```bash
docker compose up -d
```

---

## ⚙️ Configuration

The container has the timezone preconfigured to `Asia/Yekaterinburg`. Additional configurations can be managed directly through the Web UI.

---

## 🔌 Ports

| Service | Port | Protocol | Description |
| ------- | ---- | -------- | ----------- |
| HTTP Web UI | 8000 | TCP | Main web interface (HTTP) |
| HTTPS Web UI | 8443 | TCP | Main web interface (HTTPS) |
| Minecraft Java | 25500-25600 | TCP | Minecraft Java server port range |
| Minecraft Bedrock | 19132 | UDP | Minecraft Bedrock server |
| Dynmap | 8123 | TCP | Minecraft Dynmap plugin |
| Hytale | 5520-5550 | UDP | Hytale server ports |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `${DATA_ROOT}/logs` | Crafty application log files |
| `${DATA_ROOT}/config` | Crafty controller configuration files |
| `${DATA_ROOT}/import` | Import directory for existing Minecraft servers |
| `${DATA_ROOT}/backups` | Automatic and manual server backups |
| `${DATA_ROOT}/servers` | Minecraft server instance directories |

---

## 📌 Usage

1. Open your web browser and navigate to `https://<your-server-ip>:8443`.
2. Follow the setup wizard to create your administrator account.
3. Once logged in, you can start creating or importing Minecraft servers.

---

## 📚 Resources

* [Crafty Controller Documentation](https://docs.craftycontrol.com/)
* [GitLab Repository](https://gitlab.com/crafty-controller/crafty-4)
