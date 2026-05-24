# Design System

## Overview

Aynime menggunakan design system modern dengan pendekatan:
- cyberpunk cinematic
- modern streaming platform
- immersive experience
- clean futuristic UI
- responsive mobile-first

Design system dibangun untuk:
- konsistensi UI
- scalability
- maintainability
- reusable components
- modern visual identity

---

# Design Principles

## Cinematic Experience
UI harus terasa immersive seperti platform streaming modern.

---

## Minimal Noise
Hindari visual yang terlalu ramai.
Fokus pada hierarchy dan readability.

---

## Futuristic Interface
Gunakan:
- glassmorphism ringan
- neon accent
- soft glow
- cinematic backdrop
- blur layer

---

## Responsive First
Semua layout wajib:
- mobile-first
- adaptive
- touch friendly

---

# Layout Rules

## Container Width

### Standard Container
```txt id="d5p8nm"
max-width: 1440px
```

### Reading Container
```txt id="v4q7sp"
max-width: 768px
```

---

# Spacing System

Gunakan spacing konsisten berbasis scale.

## Base Spacing Scale

```txt id="y4k7xq"
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
```

---

# Border Radius

## Small
```txt id="s7q2xn"
rounded-lg
```

## Medium
```txt id="g6n1pr"
rounded-2xl
```

## Large
```txt id="x1v5pk"
rounded-3xl
```

Streaming card dan modal menggunakan:
```txt id="u0r8cv"
rounded-2xl
```

---

# Shadow System

## Soft Shadow
Untuk card standard.

---

## Glow Shadow
Untuk:
- active state
- hover neon
- premium UI

Gunakan glow secara subtle.
Jangan berlebihan.

---

# Glassmorphism Rules

Glass effect digunakan pada:
- navbar
- modal
- floating card
- overlay panel

Karakteristik:
- semi transparent
- backdrop blur
- thin border
- soft reflection

Glass effect tidak boleh mengurangi readability.

---

# UI Hierarchy

Prioritas visual:
1. Hero Content
2. Anime Poster
3. Title
4. CTA Button
5. Metadata
6. Secondary Information

---

# Visual Style

## Theme Style
- cinematic
- dark futuristic
- cyberpunk modern
- neon minimal
- streaming-focused

---

# Icon Rules

Gunakan icon:
- simple
- outline based
- konsisten stroke

Hindari:
- icon terlalu detail
- skeuomorphic icon

---

# Interaction Rules

## Hover
Hover harus:
- subtle
- smooth
- responsive

---

## Active State
Gunakan:
- glow
- accent border
- soft scale

---

## Click Feedback
Semua interactive element wajib memiliki:
- hover state
- active state
- focus state

---

# Card Rules

Anime card wajib:
- focus pada poster
- memiliki hover cinematic
- memiliki overlay gradient
- menjaga readability title

---

# Modal Rules

Menggunakan:
- SweetAlert2 (Swal)

Modal style:
- glassmorphism
- blur background
- smooth animation
- responsive mobile

Modal digunakan untuk:
- login prompt
- premium prompt
- confirmation
- error state

---

# Accessibility

UI tetap harus:
- readable
- memiliki contrast cukup
- keyboard accessible
- responsive

---

# Animation Philosophy

Animation digunakan untuk:
- meningkatkan feel modern
- memperjelas interaction
- meningkatkan immersion

Bukan untuk:
- gimmick
- visual chaos

---

# Theme System

Aynime mendukung:
- Dark Mode
- Light Mode

Theme switching:
- smooth
- persistent
- system-aware

Dark mode menjadi default theme utama.