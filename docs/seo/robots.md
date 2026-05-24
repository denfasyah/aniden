# Robots.txt Strategy

## Overview

robots.txt digunakan untuk:
- mengontrol crawling
- mencegah indexing page tertentu
- optimize crawl budget

---

# Main Robots Rules

## Allow Public Content

Izinkan:
```txt id="q5m7vx"
anime pages
episode pages
genre pages
homepage
```

---

# Block Private Routes

Block:
```txt id="u8m2qt"
/api/
/admin/
/dashboard/
/payment/
/profile/
```

---

# Search Page Strategy

Search page:
```txt id="r4q1xp"
noindex
```

Karena:
- low quality index
- duplicate query risk

---

# Crawl Budget Optimization

Prioritas crawl:
- anime detail
- episode detail
- trending pages

---

# Example Robots

```txt id="v7m4vt"
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /payment/
Disallow: /profile/

Sitemap: https://aynime.com/sitemap.xml
```

---

# Security Note

robots.txt bukan security layer.

Sensitive route tetap wajib:
- authentication
- authorization

---

# Future Expansion

Future:
- AI crawler policy
- media crawl optimization
- image indexing control