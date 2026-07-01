# 🦅 Wings Daemon (Docker Setup)

Pterodactyl's next-generation **game server control agent** using Docker.

> Wings is Pterodactyl's node agent, written in Go, which manages and controls game server containers on individual nodes.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/game/wings
```

2. Generate the node configuration on your Pterodactyl Panel.
3. Save the generated configuration as `config.yml` into `/home/pterodactyl/config.yml` on the host machine.
4. Run the daemon:
```bash
docker compose up -d
```

---

## ⚙️ Configuration

Wings relies heavily on the `config.yml` provided by the Pterodactyl Panel. The container is configured with the following defaults in `docker-compose.yaml`:
* `TZ=Asia/Yekaterinburg`
* `WINGS_UID=988`
* `WINGS_GID=988`
* `WINGS_USERNAME=pterodactyl`

---

## 🔌 Ports

| Service | Port | Protocol | Description |
| ------- | ---- | -------- | ----------- |
| REST API | 8080 | TCP | Panel to Wings communication & WebSockets |
| SFTP | 2022 | TCP | SFTP server for managing game server files |
| SSL/TLS | 443 | TCP | Secure SSL/TLS connection (if enabled) |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `/var/run/docker.sock` | Docker daemon socket for managing container lifecycles |
| `/var/lib/docker/containers/` | Path for accessing container log outputs |
| `/home/pterodactyl/` | Maps to `/etc/pterodactyl/` for daemon config (`config.yml`) |
| `/home/pterodactyl/` | Maps to `/var/lib/pterodactyl/` for game server files and volumes |
| `/home/pterodactyl/log/` | Path for Wings application log output |
| `/home/pterodactyl/tmp/` | Temporary files directory for server operations |
| `/etc/ssl/certs` | Read-only mapping for system SSL root certificates |

---

## 📌 Usage

Once started, Wings will establish a connection with the Pterodactyl Panel API.
Ensure your server firewall allows TCP traffic on port `8080` (for panel communications) and `2022` (for SFTP client connections).

---

## 📚 Resources

* [Wings Documentation](https://pterodactyl.io/wings/)
* [Official GitHub Repository](https://github.com/pterodactyl/wings)
