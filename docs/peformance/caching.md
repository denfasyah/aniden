# Caching Strategy

## Overview

Caching digunakan untuk:
- reduce request
- improve response speed
- reduce infrastructure load
- improve scalability

---

# Caching Philosophy

Prinsip:
```txt id="x2q7vt"
Cache public data aggressively
```

---

# Cache Categories

## Server Cache
Untuk:
- anime detail
- trending anime
- homepage data

---

# Browser Cache

Untuk:
- images
- fonts
- static assets

---

# Fetch Cache

Menggunakan:
- Next.js fetch caching
- revalidate strategy

---

# ISR Strategy

ISR digunakan untuk:
- homepage
- trending page
- popular page
- schedule page

---

# No Cache Areas

Jangan cache:
```txt id="f8m4xp"
session
payment validation
premium validation
```

---

# Search Cache

Search menggunakan:
- debounce
- temporary cache
- query reuse

---

# Streaming Cache

Streaming data:
- lightweight caching
- avoid stale source issue

---

# API Response Cache

Gunakan:
- response normalization
- request deduplication

---

# Future Scaling

Future:
```txt id="u4q2vx"
Redis
CDN Edge Cache
Service Worker
```

---

# Cache Invalidation

Cache harus:
- predictable
- easy invalidate
- version friendly

---

# Anti-Pattern

Hindari:
- stale auth cache
- over caching dynamic data
- caching sensitive data