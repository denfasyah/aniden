# Session Strategy

## Overview

Session digunakan untuk:
- authentication persistence
- protected access
- premium validation
- personalization

---

# Session Philosophy

Session harus:
- secure
- lightweight
- scalable
- predictable

---

# Session Provider

Menggunakan:
```txt id="n7q2vx"
Auth.js Session
```

---

# Session Storage

Session disimpan menggunakan:
```txt id="u4m7xp"
HTTP-only cookies
```

---

# Why HTTP-only Cookie

Keuntungan:
- lebih aman
- protected dari XSS
- browser-native

---

# Session Data

Session hanya menyimpan:
```txt id="f8m2qt"
user_id
role
premium_status
basic_profile
```

---

# Do Not Store

Jangan simpan:
- sensitive token
- payment credential
- unnecessary user data

---

# Session Refresh Strategy

Session harus:
- auto refresh
- persistent
- synchronized antar tab

---

# Expiration Strategy

Session memiliki:
- expiration
- refresh lifecycle

---

# Authentication Check

Session validation dilakukan:
- middleware
- server component
- protected API route

---

# Premium Validation

Premium access dicek dari:
```txt id="r5q8vk"
subscription status
expires_at
```

---

# Guest Session

Guest tidak memiliki server session.

Guest state:
- local storage only
- temporary personalization

---

# Logout Strategy

Saat logout:
- destroy session
- clear local state
- clear cache terkait user

---

# Security Rules

Session wajib:
- secure cookie
- same-site protection
- HTTPS production only

---

# Future Expansion

Future:
- device management
- active session dashboard
- suspicious login detection