# Continue Watching Feature

## Overview

Continue watching adalah:
```txt id="n8q2vx"
retention core feature
```

Karena meningkatkan:
- session duration
- returning user
- binge watching behavior

---

# Guest Strategy

Guest menggunakan:
```txt id="u5m7qt"
localStorage
```

---

# User Strategy

User menggunakan:
```txt id="v2m8qp"
database sync
```

---

# Saved Data

Data yang disimpan:
- anime id
- episode
- timestamp
- last watched

---

# Auto Save Strategy

Progress otomatis tersimpan:
- pause
- interval tertentu
- episode change

---

# Homepage Integration

Continue watching tampil di:
- homepage
- profile

---

# Empty State

Jika kosong:
- tampilkan recommendation anime

---

# Sync Strategy

User login:
- merge local history
- sync database

---

# Performance Rules

Progress save wajib:
- throttled
- lightweight
- async

---

# UX Goals

User harus:
- mudah lanjut nonton
- tidak kehilangan progress
- seamless cross device