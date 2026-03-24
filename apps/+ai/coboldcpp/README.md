# 🤖 KoboldCpp (Docker Setup)

Self-hosted **local LLM runtime** with GPU acceleration.

> Run AI models locally without external APIs.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/ai/koboldcpp
cp .env.example .env
docker compose up -d
```

---

## 🌐 Access

* http://localhost:5001

---

## ⚙️ Configuration

### Required

Edit `.env`:

```env
MODEL_DIR=./models
MODEL_FILE=your-model.gguf
```

---

## 📦 Included Services

* KoboldCpp (LLM runtime)

---

## ⚠️ Requirements

### GPU (recommended)

* NVIDIA GPU
* Docker with NVIDIA runtime

---

### CPU (fallback)

You can remove GPU settings and run on CPU, but performance will be slower.

---

## 📁 Volumes

| Path     | Purpose   |
| -------- | --------- |
| ./models | AI models |

---

## 🔌 Ports

| Port | Description  |
| ---- | ------------ |
| 5001 | API / Web UI |

---

## ⚠️ Network

This setup uses an external Docker network:

```bash
docker network create proxy
```

---

## 📌 Notes

* Models must be in `.gguf` format
* GPU acceleration requires NVIDIA drivers
* Large models require significant RAM/VRAM

---

## 🚧 Improvements

* Add Open WebUI
* Add model manager (Ollama)
* Add API integration

---

## 📚 Resources

* https://github.com/LostRuins/koboldcpp
