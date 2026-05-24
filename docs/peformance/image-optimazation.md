# Image Optimization

## Overview

Image adalah asset terbesar di Aynime.

Karena:
- anime poster
- anime backdrop
- carousel images
- recommendation thumbnails

---

# Optimization Philosophy

Prinsip utama:
```txt id="q5m7vx"
High visual quality
with minimal payload
```

---

# Main Image Strategy

Menggunakan:
```txt id="u8m4xp"
next/image
```

untuk seluruh image utama.

---

# Benefits

Keuntungan:
- automatic optimization
- responsive sizing
- lazy loading
- modern format conversion

---

# Priority Images

Gunakan:
```txt id="r4q2vt"
priority
```

hanya untuk:
- hero image
- above-the-fold content

---

# Lazy Images

Semua image selain critical:
- lazy loaded
- responsive sized

---

# Responsive Image Strategy

Image wajib:
- responsive
- mobile optimized
- desktop optimized

---

# Placeholder Strategy

Gunakan:
- blur placeholder
- skeleton loading

---

# Image Sizing Rules

Jangan load:
```txt id="v7m1xp"
full-size image
```

untuk:
```txt id="n2q8vk"
small thumbnail
```

---

# CDN Strategy

Future:
- image CDN
- edge image optimization
- image compression pipeline

---

# Backdrop Optimization

Backdrop image wajib:
- compressed
- responsive
- optimized quality

---

# Anti-Pattern

Hindari:
- oversized image
- no dimension image
- massive GIF
- excessive image preload

---

# Mobile Optimization

Target:
- low bandwidth friendly
- fast first paint
- reduced image payload