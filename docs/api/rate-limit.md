# Rate Limiting

## Overview

Rate limiting digunakan untuk:

- prevent abuse
- protect infrastructure
- reduce spam
- secure API

---

Protection Philosophy

Prioritas:

- stability
- abuse prevention
- fair usage

---

Protected Endpoints

Rate limit wajib pada:

- auth endpoint
- comment endpoint
- search endpoint
- payment endpoint

---

Search Protection

Search menggunakan:

- debounce
- request throttling
- temporary cache

---

Auth Protection

Login endpoint wajib:

- request limit
- suspicious activity detection

---

Comment Protection

Comment system wajib:

- cooldown
- spam prevention
- rate limit

---

Payment Protection

Payment endpoint wajib:

- signature validation
- webhook verification
- replay attack prevention

---

General Limits

Guest User
Lebih ketat.

---

Authenticated User
Lebih longgar.

---

Premium User
Prioritas lebih tinggi.

---

Middleware Strategy

Gunakan middleware untuk:

- centralized rate limiting
- IP protection
- endpoint protection

---

Future Scaling

Future:

- Redis-based rate limiting
- IP reputation system
- bot detection
- edge protection

---

Security Principles

Rate limiting harus:

- scalable
- predictable
- non-invasive

---

Anti-Abuse Goals

Tujuan:

- menjaga stability
- mengurangi spam
- mengurangi scraping abuse
- menjaga UX user normal
