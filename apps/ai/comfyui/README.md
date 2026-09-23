# 🎨 ComfyUI (Docker Setup)

Self-hosted **node-based AI image generation tool**.

The example uses the public `lecode-official/comfyui-docker` image and follows its documented container paths.

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
| `${DATA_ROOT}/output`| Host directory containing generated images/outputs |
| `${DATA_ROOT}/models` | Directory for manually placing AI checkpoints/LoRAs |
| `${DATA_ROOT}/custom-nodes` | Custom node installations |

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
* `USER_ID` and `GROUP_ID` default to `1000`; adjust them to the account that owns the host directories.
* Review GPU allocation before deployment.

---

## 🚧 Improvements

* Add model management guide

---

## 📚 Resources

* https://github.com/Comfy-Org/ComfyUI
* https://github.com/lecode-official/comfyui-docker
