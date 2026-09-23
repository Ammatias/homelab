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

| Path | Purpose |
| ---- | ------- |
| `${DATA_ROOT}` | App configuration and general workspace data |
| `${DATA_ROOT}/input` | Host directory containing inputs for workflows |
| `${DATA_ROOT}/output`| Host directory containing generated images/outputs |
| `${DATA_ROOT}/models` | Directory for manually placing AI checkpoints/LoRAs |
| `${DATA_ROOT}/config` | Workspace settings and configurations |
| `${DATA_ROOT}/custom_nodes` | Custom node installations |

---

## ⚠️ Network

This setup uses an external Docker network for reverse proxy access:

```bash
docker network create frontend
```

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
