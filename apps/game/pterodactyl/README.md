# 🎮 Pterodactyl Panel (Docker Setup)

Self-hosted **game server management panel** using Docker.

> An open-source game server management panel built on PHP 8, React, and Go. Runs game servers in isolated Docker containers using the Wings daemon.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/game/pterodactyl
```

2. Copy the environment template and configure database passwords and email settings:
```bash
cp .env.example .env
```

3. Run the database and redis cache services first:
```bash
docker compose up -d database cache
```

4. Run the initial setup commands for the panel container:
```bash
# Generate the application encryption key
docker compose run --rm panel php artisan key:generate --force

# Run database migrations and seed default data
docker compose run --rm panel php artisan migrate --seed --force

# Create the first administrator user
docker compose run --rm panel php artisan p:user:make
```

5. Start the panel service:
```bash
docker compose up -d panel
```

---

## ⚙️ Configuration

Edit `.env`:

```env
MYSQL_PASSWORD=your_secure_password
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=panel
MYSQL_USER=pterodactyl

MAIL_FROM=system@domain.ru
MAIL_DRIVER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=smtp_user
MAIL_PASSWORD=smtp_password
MAIL_ENCRYPTION=true
```

Inside `docker-compose.yaml`, the default App URL is configured to:
`APP_URL: "https://pterodactyl.domain.ru"`

---

## 🔌 Ports

| Service | Port | Protocol | Description |
| ------- | ---- | -------- | ----------- |
| Panel | 80 | TCP | HTTP interface |
| Panel | 443 | TCP | HTTPS interface |

---

## 📁 Volumes

| Path | Purpose |
| ---- | ------- |
| `/home/pterodactyl/database` | MariaDB database storage directory |
| `/home/pterodactyl/var/` | Persistent panel data storage (e.g. plugins, files) |
| `/home/pterodactyl/nginx/` | Custom Nginx server configurations |
| `/home/pterodactyl/certs/` | SSL certificates (such as Let's Encrypt certificates) |
| `/home/pterodactyl/logs/` | Panel application error logs |

---

## 📌 Usage

1. Once the services are fully started and initial setup commands have completed, access the panel via `https://pterodactyl.domain.ru` (or via the server's IP address if routing locally).
2. Log in using the administrator account you created during setup.
3. In the admin settings, configure a location, then create a new Node to connect to the Wings daemon.

---

## 📚 Resources

* [Pterodactyl Documentation](https://pterodactyl.io/)
* [Official GitHub Repository](https://github.com/pterodactyl/panel)
