# Roles & Permissions

## Overview

Aynime menggunakan role system sederhana untuk:
- access control
- premium feature gating
- scalable permission system

---

# Main Roles

```txt id="n2q7vk"
Guest
User
Premium
```

---

# Guest Role

## Description

User belum login.

---

# Guest Permissions

Guest dapat:
- browse anime
- streaming basic quality
- search anime
- lihat trending
- lihat jadwal rilis

---

# Guest Restrictions

Guest tidak dapat:
- bookmark
- comment
- sync progress
- premium access

---

# User Role

## Description

User yang sudah login menggunakan Google OAuth.

---

# User Permissions

User dapat:
- bookmark anime
- continue watching sync
- comment
- personalized homepage
- notification access

---

# User Restrictions

User tidak dapat:
- premium-only feature
- premium streaming quality
- future exclusive feature

---

# Premium Role

## Description

User dengan subscription aktif.

---

# Premium Permissions

Premium dapat:
- high quality streaming
- ad-free experience
- priority server
- early feature access
- exclusive future feature

---

# Premium Validation

Premium aktif jika:
```txt id="u8m4xp"
subscription active
AND
expires_at valid
```

---

# Permission Philosophy

Permission system harus:
- simple
- scalable
- easy maintenance

---

# Backend Validation

Semua permission wajib dicek di:
- middleware
- API route
- server action

Bukan hanya frontend.

---

# Future Roles

Future:
```txt id="f4q2vt"
admin
moderator
content_manager
```

---

# Future Permission Expansion

Future:
- granular permission
- moderation system
- dashboard access control
```