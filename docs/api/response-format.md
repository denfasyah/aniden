# Response Format

Overview

Semua API Aynime wajib menggunakan response structure yang konsisten.

Tujuan:

- predictable API
- easier frontend integration
- easier debugging
- scalable architecture

---

Success Response

Standard Format

```json id="r5q8vx"
{
  "success": true,
  "message": "Request success",
  "data": {},
  "meta": {}
}
```

---

Error Response

Standard Format

```json id="u2m4qt"
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "INTERNAL_SERVER_ERROR"
  }
}
```

---
Pagination Response

```json id="v8q1xp"
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

---

Validation Error Response

```json id="x4m7vt"
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "fields": {
      "email": "Invalid email"
    }
  }
}
```

---

Response Principles

Rule 1
Semua response wajib memiliki:

- success
- message

---

Rule 2
Jangan expose:

- stack trace
- internal database error
- sensitive information

---

Rule 3
Gunakan HTTP status code yang sesuai.

---

Status Code Rules

Success

```txt id="n9q2vk"
200 OK
201 Created
```

---

Client Error

```txt id="y6m4xp"
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
429 Too Many Requests
```

---

Server Error

```txt id="q2m8vt"
500 Internal Server Error
```

---

API Consistency

Semua endpoint wajib:

- consistent shape
- predictable structure
- centralized formatting

---
Future Improvements

Future:

- request tracing
- error id
- analytics metadata
