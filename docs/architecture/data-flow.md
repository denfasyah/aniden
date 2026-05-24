# Data Flow

## Overview

Aynime menggunakan pendekatan:

- server-first data fetching
- optimized rendering
- layered architecture

---

# High Level Data Flow

```txt id="a7m2vx"
External API / Database
↓
Services Layer
↓
Server Components
↓
Client Components
↓
UI Interaction
```

---

# API Data Flow

```txt id="b8q5wp"
Anime API
↓
Services Layer
↓
Validation
↓
Transformation
↓
UI Rendering
```

---

# Database Flow

```txt id="r2m7xp"
Client Action
↓
Server Action / API Route
↓
Prisma ORM
↓
Supabase PostgreSQL
↓
Response
```

---

# Authentication Data Flow

```txt id="x6p1vm"
Google OAuth
↓
Auth.js
↓
Session Creation
↓
Cookie Storage
↓
Protected Access
```

---

# Continue Watching Flow

```txt id="f8n3qt"
Player Progress
↓
Debounced Save
↓
Database Update
↓
Sync Across Devices
```

---

# Cache Flow

```txt id="v4m8xp"
Request
↓
Check Cache
↓
Cache Hit → Return Cached Data
↓
Cache Miss → Fetch API
↓
Store Cache
```

---

# Rendering Data Strategy

## Server Components
Digunakan untuk:
- SEO content
- initial fetch
- heavy data fetch

---

## Client Components
Digunakan untuk:
- interactive UI
- local interaction
- animation
- player state

---

# Data Principles

## Separation of Concerns
Data fetching tidak langsung di component UI.

---

## Centralized Service Layer
Semua API call melalui services layer.

---

## Predictable Flow
Flow data harus:
- mudah dilacak
- mudah debug
- consistent

---

# Error Handling Principles

Semua request wajib:
- try/catch
- fallback state
- loading state
- empty state