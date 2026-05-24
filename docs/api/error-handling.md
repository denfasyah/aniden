# Error Handling

Overview

Error handling Aynime dirancang untuk:

- graceful recovery
- predictable debugging
- better UX
- safer backend behavior

---

Error Principles

Rule 1
Jangan pernah crash UI karena API error.

---

Rule 2
Selalu tampilkan:

- fallback state
- retry option
- readable message

---

Rule 3
Error internal tidak boleh expose sensitive data.

---

Error Categories

Validation Error
Input invalid.

Contoh:

```txt id="x7q2vx"
invalid query
invalid body
missing parameter
```

---

Authentication Error
User belum login atau session invalid.

---

Authorization Error
User tidak memiliki akses.

---

External API Error
Anime source API gagal.

---

Database Error
Database query gagal.

---

Network Error
Timeout atau connection issue.

---

Frontend Error Handling

Frontend wajib memiliki:

- loading state
- empty state
- error state

---
API Retry Strategy

Retry hanya untuk:

- timeout
- temporary network failure

---

Logging Strategy

Gunakan:

- structured logging
- centralized logging

Jangan log:

- token
- sensitive session
- payment credential

---
User Error Messaging

Gunakan pesan:

- simple
- readable
- actionable

Hindari:

- technical jargon
- raw stack trace

---

Fallback Strategy

Jika anime API gagal:

- tampilkan cached data
- tampilkan retry button
- tampilkan fallback content

---

Production Principles

Production wajib:

- monitoring
- alerting
- request tracing

---

Future Scaling

Future:

- Sentry integration
- distributed tracing
- analytics logging
