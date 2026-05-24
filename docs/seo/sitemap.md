# Sitemap Strategy

## Overview

Sitemap digunakan untuk:
- membantu crawling
- mempercepat indexing
- memberi struktur website ke search engine

---

# Sitemap Philosophy

Sitemap harus:
- otomatis
- scalable
- dynamic
- updated

---

# Main Sitemap

```txt id="u4q8vt"
sitemap.xml
```

---

# Included Pages

## Static Pages
```txt id="n7m2vx"
homepage
genres
ongoing
popular
schedule
```

---

## Dynamic Pages
```txt id="x5q1qp"
anime detail
episode detail
genre pages
season pages
```

---

# Dynamic Generation

Menggunakan:
```txt id="v8m4qt"
Next.js Metadata Route
```

---

# Priority Strategy

## Highest Priority
Anime detail pages.

---

## Medium Priority
Episode pages.

---

## Lower Priority
Search pages.

---

# Update Frequency

## Homepage
Daily.

---

## Anime Detail
Daily.

---

## Episode Detail
Frequently.

---

# Excluded Pages

Jangan index:
```txt id="f2q7vk"
admin
dashboard
private routes
payment callback
```

---

# Scalability Strategy

Future:
- split sitemap
- image sitemap
- video sitemap
- news sitemap

---

# Sitemap Goals

Tujuan:
- better crawl efficiency
- faster discovery
- stronger indexing