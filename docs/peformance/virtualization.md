# Virtualization Strategy

## Overview

Virtualization digunakan untuk:
- rendering list besar
- reduce DOM size
- improve scroll performance
- reduce memory usage

---

# Why Virtualization

Anime memiliki:
- episode sangat banyak
- comments sangat banyak
- long scrolling list

Tanpa virtualization:
- DOM terlalu besar
- scroll lag
- memory meningkat

---

# Main Virtualized Areas

## Episode List

Anime seperti:
```txt id="x8q4vt"
One Piece
Naruto
Bleach
```

memiliki ratusan episode.

---

# Comment Section

Comment panjang wajib:
- virtualized
- paginated
- lazy rendered

---

# Virtualization Philosophy

Prinsip:
```txt id="u5m7xp"
Render only visible items
```

---

# Episode List Strategy

Flow:
```txt id="v2m8qp"
Render visible episode
↓
User scroll
↓
Render next visible range
↓
Remove invisible range
```

---

# Benefits

Keuntungan:
- smooth scrolling
- lower memory
- faster rendering
- lower rerender cost

---

# Recommended Library

Gunakan:
```txt id="n7q2vx"
@tanstack/react-virtual
```

atau:
```txt id="f4m1qt"
react-window
```

---

# Hybrid Strategy

Gunakan kombinasi:
- pagination
- virtualization
- lazy loading

---

# UI Requirements

Virtualized list wajib:
- smooth
- stable height
- no layout shift

---

# Anti-Pattern

Hindari:
- render 500+ episode sekaligus
- huge comment DOM
- nested heavy virtualization

---

# Mobile Optimization

Virtualization sangat penting untuk:
- low RAM device
- low-end Android device