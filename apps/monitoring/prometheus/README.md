# 📊 Prometheus (Docker Setup)

Self-hosted **monitoring and metrics collection system**.

> Powerful, flexible and widely used in modern infrastructure.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/monitoring/prometheus
docker compose up -d
```

---

## 🌐 Access

* http://localhost:9090

---

## ⚙️ Configuration

Prometheus uses config file:

```bash
./config/prometheus.yml
```

---

### Example Config

```yaml id="w5wh1d"
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]
```

---

## 📦 Included Services

* Prometheus server

---

## ⚠️ Network

This setup uses an external Docker network:

```bash id="0lsy2u"
docker network create proxy
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 9090 | Web UI      |

---

## 📁 Volumes

| Path     | Purpose             |
| -------- | ------------------- |
| ./config | Configuration files |
| ./data   | Metrics storage     |

---

## 🛠 Requirements

* Docker
* Docker Compose

---

## 📌 Notes

* Make sure `prometheus.yml` exists before starting
* Data is stored locally in `./data`
* Default config only monitors Prometheus itself

---

## ⚠️ Storage

Prometheus stores time-series data locally.

To limit disk usage, add:

```yaml id="5t3sz3"
command:
  - "--storage.tsdb.retention.time=7d"
```

---

## 🚧 Improvements

* Add Node Exporter (system metrics)
* Add Grafana (visualization)
* Monitor Docker containers

---

## 📚 Resources

* https://prometheus.io/docs/introduction/overview/
