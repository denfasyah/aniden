# Security

## Overview

Security Aynime fokus pada:
- authentication protection
- API protection
- environment safety
- secure data handling

---

# Authentication Security

Menggunakan:
- Google OAuth only
- secure session handling
- protected routes

---

# Session Security

Session:
- HTTP-only cookie
- secure cookie
- session expiration

---

# Route Protection

Protected routes:
- bookmarks
- comments
- premium features
- profile

Middleware digunakan untuk:
- session validation
- premium access validation

---

# Environment Variables

Semua secret wajib:
- disimpan di .env
- tidak hardcoded
- tidak expose ke client

---

# API Security

## Validation
Semua request wajib:
- input validation
- sanitization
- type checking

---

# Rate Limiting

Digunakan untuk:
- auth endpoint
- comment system
- search abuse prevention

---

# Database Security

Gunakan:
- Prisma ORM
- parameterized queries
- secure relations

Hindari:
- raw SQL tanpa validasi

---

# Client Security

Jangan simpan:
- secret key
- sensitive token
- private credential

di client side.

---

# XSS Protection

UI wajib:
- sanitize input
- hindari dangerouslySetInnerHTML

---

# CSRF Protection

Gunakan:
- secure auth flow
- trusted callback validation

---

# Logging Rules

Jangan log:
- token
- password
- sensitive session data

---

# Production Security

Production wajib:
- HTTPS only
- secure headers
- production env separation

---

# Security Philosophy

Prioritas:
1. secure auth
2. secure session
3. safe API
4. protected user data
5. maintainable security