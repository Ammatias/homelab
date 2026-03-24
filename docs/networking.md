# 🌐 Networking

This setup uses Docker networks to isolate and connect services.

---

## 🔗 Networks

### proxy

* Used by Traefik
* Handles incoming traffic
* Connects external requests to services

---

### database

* Internal network
* Used by PostgreSQL and dependent services
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
