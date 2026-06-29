# 🤖 LiteLLM (Docker Setup)

Self-hosted **LLM proxy and gateway** using Docker.

> Manage multiple LLM providers (local & cloud) with a unified OpenAI-compatible API.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/ai/litellm
```

2. Create a configuration file at `/home/litellm/config.yaml` (e.g., to proxy KoboldCpp or external APIs):
```yaml
model_list:
  - model_name: local-model
    litellm_params:
      api_base: http://koboldcpp:5001/v1
      api_key: none
      model: openai/model
```

3. Copy environment template and fill in settings:
```bash
cp .env.example .env
```

4. Run the container:
```bash
docker compose up -d
```

---

## 🌐 Access

* Admin UI / API Proxy: http://localhost:4000

---

## ⚙️ Configuration

Edit `.env`:

```env
DATABASE_URL=postgres://user:pass@postgres:5432/litellm
UI_USERNAME=admin
UI_PASSWORD=admin-secure-password
LITELLM_MASTER_KEY=sk-master-key-here
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 4000 | Admin UI & API proxy port |

---

## 📁 Volumes

| Path          | Purpose |
| ------------- | ------- |
| `/home/litellm/config.yaml` | LiteLLM routing configuration and model list |

---

## ⚠️ Network

This setup uses external Docker networks to communicate with databases and frontend reverse proxies:

```bash
docker network create frontend
docker network create backend
```

---

## 📚 Resources

* https://docs.litellm.ai/
