# 🌐 Traefik

Reverse proxy used as the **central entry point**.

---

## ⚙️ Setup

* Runs as systemd service (not Docker)
* Uses static + dynamic configuration

---

## 🔐 Features

* HTTPS (TLS)
* Domain-based routing
* Middleware support
* Dashboard access

---

## 🔄 Routing

Requests are routed based on domain:

```
https://service.domain.ru → service container
```

---

## 🧩 Components

### Routers

* Match requests
* Define rules (Host, Path)

---

### Services

* Define backend targets
* Example:

  * `http://dockhand:3000`

---

### Middlewares

* Security headers
* HTTPS redirect
* IP allowlist

---

## 🔐 Security

* HTTPS enforced
* TLS 1.2+
* Secure headers
* Restricted admin access

---

## 📌 Notes

* Traefik is the only public entry point
* Services can run without exposed ports
* Designed for future scaling
