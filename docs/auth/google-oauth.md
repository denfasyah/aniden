# Google OAuth

## Overview

Aynime menggunakan:
```txt id="q8m2vx"
Google OAuth
```

sebagai authentication provider utama.

Tidak menggunakan:
- email/password
- manual credential login

---

# Why Google OAuth

Alasan menggunakan Google OAuth:
- onboarding lebih cepat
- lebih aman
- user familiar
- mobile friendly
- maintenance lebih mudah

---

# Authentication Stack

```txt id="u5m8qt"
Google OAuth
↓
Auth.js
↓
Session Management
↓
Database User Sync
```

---

# Login Flow

```txt id="v7q2xp"
Click Login
↓
Google Consent Screen
↓
OAuth Callback
↓
Session Created
↓
Redirect User
```

---

# OAuth Data

Data yang diambil:
```txt id="n2m4vk"
name
email
profile_image
provider_id
```

---

# Security Rules

Jangan simpan:
- raw access token
- refresh token secara tidak aman

---

# Account Strategy

User account dibuat otomatis saat:
```txt id="r6m8xp"
first login
```

---

# Duplicate Prevention

User uniqueness berdasarkan:
```txt id="x4q7vt"
email
```

---

# Session Strategy

Session menggunakan:
- HTTP-only cookie
- secure cookie
- encrypted session

---

# Redirect Rules

Setelah login:
- kembali ke previous page
- atau homepage

---

# Error Handling

Jika OAuth gagal:
- tampilkan readable message
- retry option
- fallback state

---

# Environment Variables

OAuth wajib menggunakan:
```txt id="k8m2qp"
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
AUTH_SECRET
```

---

# Production Rules

Production wajib:
- HTTPS
- verified domain
- secure callback URL

---

# Future Expansion

Future:
- Discord OAuth
- GitHub OAuth
- multi-provider login