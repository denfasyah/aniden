# Database Schema

## Overview

Aynime menggunakan:
- PostgreSQL (Supabase)
- Prisma ORM

Database dirancang dengan fokus:
- scalability
- maintainability
- normalized relations
- performance
- clean data structure

---

# Database Philosophy

Prinsip utama:
- simple first
- scalable later
- avoid overengineering
- relational consistency
- clear ownership

---

# Main Entities

## Core Tables

```txt id="x8m4qt"
users
bookmarks
watch_histories
comments
subscriptions
notifications
```

---

# High Level Architecture

```txt id="v5n2xp"
User
├── Bookmarks
├── Watch Histories
├── Comments
├── Notifications
└── Subscription
```

---

# Prisma Strategy

Prisma digunakan untuk:
- schema management
- migrations
- type-safe query
- relation handling

---

# Naming Convention

## Table Naming
Gunakan:
```txt id="n4q8vk"
snake_case plural
```

Contoh:
```txt id="u2m5xp"
users
watch_histories
subscriptions
```

---

# Column Naming

Gunakan:
```txt id="a8m1qt"
snake_case
```

Contoh:
```txt id="r6q2vx"
created_at
updated_at
anime_slug
episode_number
```

---

# Common Columns

Semua table wajib memiliki:

```txt id="f7m4xp"
id
created_at
updated_at
```

---

# Primary Key Strategy

Gunakan:
```txt id="z2q8vn"
cuid()
```

Karena:
- scalable
- collision-safe
- distributed-friendly

---

# Timestamp Strategy

Gunakan:
- created_at
- updated_at

Semua timestamp menggunakan:
```txt id="k8m5qt"
UTC timezone
```

---

# Soft Delete Strategy

Untuk MVP:
- belum menggunakan soft delete

Future:
```txt id="w5n2xp"
deleted_at
```

---

# Relation Philosophy

Gunakan:
- explicit relation
- foreign key consistency
- cascade rule yang jelas

---

# Performance Strategy

## Indexed Fields

Prioritas index:
- user_id
- anime_slug
- created_at
- episode_id

---

# Scalability Notes

Future scaling:
- Redis caching
- analytics database
- queue system
- notification worker

---

# Security Principles

Data sensitif:
- tidak disimpan berlebihan
- minimal personal data
- OAuth only authentication

---

# MVP Database Scope

Fokus MVP:
- auth
- bookmark
- continue watching
- comment
- premium subscription

Hindari table berlebihan di awal development.