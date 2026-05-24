# Authentication Flow

## Overview

Aynime menggunakan authentication system berbasis:
- Google OAuth
- session authentication
- role-based access

Authentication dirancang untuk:
- simple onboarding
- minimal friction
- modern user experience
- scalable security

---

# User Roles

```txt id="n5q8vx"
Guest
↓
Authenticated User
↓
Premium User
```

---

# Authentication Philosophy

Prinsip utama:
- frictionless login
- no email/password complexity
- mobile-friendly auth
- secure session handling

---

# Guest Flow

## Guest Access

Guest dapat:
- browse anime
- search anime
- watch anime
- lihat jadwal
- lihat trending anime

---

# Guest Restrictions

Guest tidak dapat:
- bookmark anime
- comment
- sync continue watching
- akses premium feature

---

# Login Trigger Strategy

Login tidak dipaksa saat pertama membuka website.

Best practice:
```txt id="u7m4qt"
soft authentication
```

---

# Soft Authentication Flow

Guest bebas explore terlebih dahulu.

Login popup muncul ketika:
- bookmark anime
- comment
- save continue watching
- akses profile

---

# Login Flow

```txt id="v2q7xp"
Guest User
↓
Protected Action
↓
Google OAuth Popup
↓
Session Created
↓
Authenticated User
```

---

# Continue Watching Strategy

## Guest
Disimpan di:
```txt id="f8m2vk"
localStorage
```

---

## Authenticated User
Disimpan di:
```txt id="r4q8vt"
database
```

---

# Premium Access Flow

```txt id="t5m1xp"
User
↓
Upgrade Premium
↓
Payment Success
↓
Subscription Activated
↓
Premium Access Enabled
```

---

# Logout Flow

```txt id="x6q2vm"
Logout
↓
Session Destroyed
↓
Clear Local Cache
↓
Redirect Homepage
```

---

# Session Persistence

Session harus:
- persistent
- secure
- auto refresh
- cross-tab synchronized

---

# UX Principles

Authentication harus:
- cepat
- seamless
- tidak mengganggu browsing
- mobile friendly

---

# Future Expansion

Future:
- multi-device session
- profile customization
- notification preference
- social features