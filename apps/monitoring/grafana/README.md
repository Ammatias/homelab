# 📈 Grafana (Docker Setup)

Self-hosted **monitoring and visualization platform**.

> Powerful dashboards for metrics collected by Prometheus.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/monitoring/grafana
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:3002

---

## 🔐 Login

Credentials are set via `.env`:

```env
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=admin
```

---

## ⚙️ Configuration

### Required

Edit `.env` file:

```env
GF_SECURITY_ADMIN_USER=admin
GF_SECURITY_ADMIN_PASSWORD=secure-admin-password
ROOT_URL=https://grafana.domain.com
```

### Optional (Authentik OAuth2)

Configure variables in `.env` to enable SSO:

```env
OAUTH_ENABLED=true
OAUTH_NAME=authentik
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
OAUTH_AUTH_URL=https://authentik.domain.ru/application/o/authorize/
OAUTH_TOKEN_URL=https://authentik.domain.ru/application/o/token/
OAUTH_API_URL=https://authentik.domain.ru/application/o/userinfo/
SIGNOUT_REDIRECT_URL=https://authentik.domain.ru/application/o/grafana/end-session/
```

---

## 📦 Included Services

* Grafana

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create frontend
docker network create backend
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 3002 | Web UI      |

---

## 📁 Volumes

| Path   | Purpose      |
| ------ | ------------ |
| /home/grafana/data | Grafana data |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 🔗 Connect to Prometheus

Add data source manually:

* URL: `http://prometheus:9090`
* Access: Server

---

## 📌 Notes

* Runs as root (`user: "0"`) to avoid permission issues
* Change default credentials immediately
* Data is persisted in `/home/grafana/data`

---

## 🚧 Improvements

* Add automatic provisioning
* Add dashboards
* Add alerting

---

## 📚 Resources

* https://grafana.com/docs/
