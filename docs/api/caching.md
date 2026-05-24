# Caching Strategy

## Overview

Caching digunakan untuk:

- reduce API requests
- improve performance
- reduce server load
- improve UX

---

Caching Philosophy

Prinsip utama:

```txt id="u7q4vt"
Cache aggressively for public data
Avoid cache for user-sensitive data
```

---

ISR Strategy

ISR Usage

Digunakan untuk:

- homepage
- trending anime
- latest update
- genres
- schedules

---

Revalidate Strategy

Homepage

```txt id="x2m8qp"
revalidate: 300
```

5 menit.

---

Trending Anime

```txt id="v5q1xp"
revalidate: 600
```

10 menit.

---

Anime Detail

```txt id="n4m7qt"
revalidate: 1800
```

30 menit.

---

Fetch Cache

## Force Cache

Digunakan untuk:

- static metadata
- genres
- low-changing content

---

## No Store

Digunakan untuk:

- session data
- premium validation
- payment state

---

Server Cache

Server caching digunakan untuk:

- anime detail
- trending list
- search suggestion

---

Browser Cache

Digunakan untuk:

- image assets
- static assets
- fonts

---

Image Optimization

Gunakan:

- next/image
- optimized image loading
- lazy image rendering

---

Search Caching

Search menggunakan:

- debounce
- temporary cache
- query caching

---

Future Scaling

Future:

- Redis cache
- CDN cache
- edge caching
- distributed cache

---

Cache Invalidation

Cache harus:

- predictable
- controlled
- easy invalidation

---

Anti-Pattern

Hindari:

- over caching
- stale critical data
- caching auth-sensitive data
