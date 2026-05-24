# Lazy Loading Strategy

## Overview

Lazy loading digunakan untuk:
- reduce initial load
- reduce JS bundle
- improve mobile performance
- improve perceived speed

---

# Lazy Loading Philosophy

Prinsip:
```txt id="u7q2vx"
Load only when needed
```

---

# Lazy Loaded Sections

## Homepage Sections

Section bawah fold:
- top trending
- recommendations
- comments
- footer heavy content

---

# Lazy Loaded Components

## Heavy Components

```txt id="v5m1xp"
video player
carousel
comments
modal
animation-heavy UI
```

---

# Dynamic Import Strategy

Gunakan:
```txt id="n2q8vt"
next/dynamic
```

untuk:
- player
- large client component
- premium modal

---

# Image Lazy Loading

Semua image:
- below fold
- recommendation section
- carousel item

wajib lazy load.

---

# Intersection Observer

Digunakan untuk:
- trigger lazy section
- infinite loading
- scroll-based loading

---

# Streaming Page Strategy

Player tidak langsung initialize.

Flow:
```txt id="r6m4xp"
Open Page
↓
Load Metadata
↓
Load UI
↓
Initialize Player
```

---

# Skeleton Strategy

Semua lazy section wajib memiliki:
- skeleton loading
- placeholder UI

---

# Route Level Lazy Loading

Page tertentu:
- admin
- premium
- dashboard

di-load terpisah.

---

# Lazy Loading Anti-Pattern

Hindari:
- lazy loading critical content
- excessive waterfall loading
- delayed user interaction

---

# UX Principles

User harus:
- tetap merasa cepat
- tetap melihat visual feedback
- tidak merasa UI kosong