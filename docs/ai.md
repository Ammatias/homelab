# 🤖 AI Stack

This homelab includes a **self-hosted AI environment**.

---

## 🧠 Components

### LLM Backend

* KoboldCpp
* Runs local models
* GPU accelerated (if available)

---

### Chat UI

* SillyTavern
* Connects to KoboldCpp

---

### Image Generation

* ComfyUI (experimental)
* Node-based workflows

---

## 🔄 Flow

```
User → SillyTavern → KoboldCpp → Model
```

---

## 📦 Models

* Stored locally
* No external APIs required

---

## 📌 Notes

* Fully offline capable
* Performance depends on hardware
* Some setups are experimental
