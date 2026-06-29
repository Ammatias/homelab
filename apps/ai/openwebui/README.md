# 🤖 Open WebUI (Docker Setup)

Self-hosted **chat interface for local and external LLMs**.

> Feature-rich, customizable UI designed to interact with models hosted on KoboldCpp, LiteLLM, or Ollama, with SSO integration.

---

## 🚀 Quick Start

1. Clone the repository and navigate to the service:
```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/ai/openwebui
```

2. Copy environment template and fill in settings:
```bash
cp .env.example .env
```

3. Run the container:
```bash
docker compose up -d
```

---

## 🌐 Access

* Web UI: http://localhost:3000

---

## ⚙️ Configuration

Edit `.env` (configured for Authentik OAuth integration out-of-the-box):

```env
OAUTH_CLIENT_ID=your-authentik-client-id
OAUTH_CLIENT_SECRET=your-authentik-client-secret
OPENID_PROVIDER_URL=https://authentik.domain.ru/application/o/openwebui/
OPENID_REDIRECT_URI=https://openwebui.domain.ru/oauth/openid/callback
WEBUI_URL=https://openwebui.domain.ru
```

---

## 🔌 Ports

| Port | Description |
| ---- | ----------- |
| 3000 | Web interface port |

---

## 📁 Volumes

| Path     | Purpose |
| -------- | ------- |
| `/home/openwebui` | Application database, user uploads, chats, and configurations |

---

## ⚠️ Network

This setup uses external Docker networks to communicate with reverse proxies and authentication outposts:

```bash
docker network create frontend
docker network create backend
```

---

## 📚 Resources

* https://docs.openwebui.com/
