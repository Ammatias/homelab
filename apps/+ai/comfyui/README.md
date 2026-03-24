# 🎨 ComfyUI (Docker Setup)

Self-hosted **node-based AI image generation tool**.

> ⚠️ Experimental setup — not fully tested.

---

## 🚧 Status

This setup is currently **experimental** and may require adjustments.

---

## 🚀 Quick Start

```bash
git clone https://github.com/Ammatias/homelab
cd homelab/apps/ai/comfyui
docker compose up -d
```

---

## 🌐 Access

* http://localhost:8188

---

## ⚙️ Requirements

### GPU (required)

* NVIDIA GPU
* Docker with NVIDIA runtime

---

## 📁 Volumes

| Path           | Purpose       |
| -------------- | ------------- |
| ./comfy-data   | App data      |
| ./config       | Configuration |
| ./custom_nodes | Custom nodes  |

---

## 📦 Models

Models must be placed manually.

Example structure:

```bash
models/
├── checkpoints/
├── loras/
├── vae/
```

---

## 📌 Notes

* This setup assumes external model storage
* Paths may need to be adjusted for your system
* Not fully tested yet

---

## 🚧 Improvements

* Simplify volume structure
* Add minimal working example
* Add model management guide

---

## 📚 Resources

* https://github.com/comfyanonymous/ComfyUI
