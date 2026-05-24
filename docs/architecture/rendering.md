# Rendering Strategy

## Overview

Aynime menggunakan hybrid rendering strategy dengan fokus:
- SEO
- performance
- scalability
- streaming optimization

---

# Rendering Philosophy

Gunakan:
- server rendering sebanyak mungkin
- client rendering hanya jika diperlukan

Prinsip:
```txt id="z7m2vx"
Server First
Client When Needed
```

---

# Server Components

Digunakan untuk:
- homepage
- anime detail
- metadata
- SEO pages
- initial data fetch

Keuntungan:
- smaller bundle
- faster load
- better SEO

---

# Client Components

Digunakan hanya untuk:
- video player
- interactive state
- modal
- animation
- carousel interaction
- bookmark interaction

---

# SSR

Digunakan untuk:
- dynamic SEO pages
- anime detail
- search result

---

# ISR

Digunakan untuk:
- homepage
- trending anime
- schedule page

Karena:
- data sering berubah
- tidak harus realtime

---

# Lazy Loading

Digunakan untuk:
- images
- recommendation section
- comments
- below-the-fold content

---

# Dynamic Import

Digunakan untuk:
- video player
- heavy components
- animation-heavy components

---

# Image Optimization

Menggunakan:
- next/image
- responsive image sizing
- blur placeholder

---

# Performance Goals

Target:
- fast first load
- low JS bundle
- optimized mobile experience

---

# Rendering Rules

## Rule 1
Default gunakan Server Component.

---

## Rule 2
Gunakan Client Component hanya jika:
- membutuhkan state
- browser API
- interaction

---

## Rule 3
Pisahkan heavy interaction dari main layout.

---

# SEO Strategy

SEO pages:
- fully server rendered
- metadata optimized
- structured data ready