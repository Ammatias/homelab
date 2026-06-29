# 🌐 Networking

This setup uses Docker networks to isolate and connect services.

---

## 🔗 Networks

### frontend

* Used by Traefik and public-facing UIs
* Handles incoming traffic
* Connects external requests to services

---

### backend

* Internal network
* Used by databases (PostgreSQL), LLMs (KoboldCpp), and dependent services
* Not exposed externally

---

## 🔄 Communication

* Services communicate via container names
* Example:

  * `http://postgres:5432`
  * `http://koboldcpp:5001`

---

## 🌍 Domains

Routing is handled by Traefik using domain names:

* `service.domain.ru`

---

## 📌 Notes

* No need for IP addresses
* Services discover each other via Docker
* External access goes through Traefik only
