# Protected Routes

## Overview

Protected routes digunakan untuk:
- authentication validation
- premium access control
- role-based protection

---

# Route Protection Philosophy

Tidak semua page harus protected.

Prioritas:
- smooth browsing
- minimal friction
- secure action validation

---

# Public Routes

Guest dapat mengakses:
```txt id="q4m7vt"
/
anime detail
episode detail
genres
search
schedule
```

---

# User Protected Routes

Login diperlukan untuk:
```txt id="u7q2xp"
/bookmark
/profile
/comments/create
/watch-history
```

---

# Premium Protected Routes

Premium diperlukan untuk:
```txt id="f5m8vk"
premium streaming quality
premium features
future exclusive content
```

---

# Middleware Strategy

Middleware digunakan untuk:
- session validation
- role validation
- premium validation

---

# Protection Flow

```txt id="r2m4qt"
Request Route
↓
Middleware Check
↓
Validate Session
↓
Validate Role
↓
Allow / Redirect
```

---

# Redirect Rules

## Guest Access Protected Route

Redirect:
```txt id="x6q8vx"
login modal
```

atau:
```txt id="v9m2xp"
homepage
```

---

# Unauthorized Access

Jika user tidak memiliki akses:
- tampilkan upgrade modal
- tampilkan readable message

---

# API Protection

Protected API wajib:
- validate session
- validate role
- validate premium status

---

# Security Principles

Jangan hanya protect di frontend.

Backend wajib:
- validate semua request
- ignore fake client state

---

# Future Expansion

Future:
- admin route
- moderator dashboard
- creator panel