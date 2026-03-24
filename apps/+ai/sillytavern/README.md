# 💬 SillyTavern (Docker Setup)

Self-hosted **chat UI for local AI models**.

> Frontend for interacting with local LLMs like KoboldCpp.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/ai/sillytavern
docker compose up -d
```

---

## 🌐 Access

* http://localhost:8000

---

## 📦 Included Services

* SillyTavern (AI chat UI)

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
| 8000 | Web UI      |

---

## 📁 Volumes

| Path         | Purpose           |
| ------------ | ----------------- |
| ./config     | App configuration |
| ./data       | User data         |
| ./plugins    | Plugins           |
| ./extensions | Extensions        |

---

## 🧠 Connect to KoboldCpp

1. Open SillyTavern
2. Go to API settings
3. Set:

* API Type: KoboldCpp
* API URL: `http://koboldcpp:5001`

---

## 📌 Notes

* Requires running KoboldCpp instance
* Works best with local models
* Data is stored locally

---

## 🚧 Improvements

* Add authentication (Authentik)
* Add reverse proxy (Traefik)
* Add persistent user profiles

---

## 📚 Resources

* https://github.com/SillyTavern/SillyTavern
