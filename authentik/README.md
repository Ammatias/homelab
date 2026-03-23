# Authentik

## 📦 Description

Self-hosted identity provider and SSO solution.

---

## 🚀 Run

```bash
docker compose up -d
```

---

## ⚙️ Configuration

Create `.env` file:

```bash
AUTHENTIK_SECRET_KEY=your_secret
POSTGRES_USER=authentik
POSTGRES_PASSWORD=authentik
POSTGRES_DB=authentik
```

Generate secret:

```bash
echo $(openssl rand -base64 32)
```

---

## 🔌 Ports

| Service | Port |
| ------- | ---- |
| HTTP    | 9000 |
| HTTPS   | 9443 |

---

## 📁 Includes

* Authentik server
* PostgreSQL
* Redis

---

## 📌 Notes

* Email settings are optional but recommended
* Make sure volumes are persisted
* Adjust ports if already in use

---

## 📚 Source

https://goauthentik.io/
