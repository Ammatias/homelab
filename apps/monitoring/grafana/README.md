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
GF_SECURITY_ADMIN_USER=
GF_SECURITY_ADMIN_PASSWORD=
ROOT_URL=http://localhost:3002
```

---

## 📦 Included Services

* Grafana

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create proxy
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
| ./data | Grafana data |

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
* Data is persisted in `./data`

---

## 🚧 Improvements

* Add automatic provisioning
* Add dashboards
* Add alerting

---

## 📚 Resources

* https://grafana.com/docs/
