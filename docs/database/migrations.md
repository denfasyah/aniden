# Migration Strategy

## Overview

Migration digunakan untuk:
- versioning database
- schema evolution
- team consistency
- production safety

Menggunakan:
```txt id="r2q7vk"
Prisma Migrate
```

---

# Migration Principles

## Rule 1
Migration harus:
- kecil
- jelas
- isolated

---

## Rule 2
Satu migration hanya untuk:
- satu perubahan besar
- satu feature scope

---

## Rule 3
Jangan edit migration lama yang sudah production.

---

# Naming Convention

Gunakan:
```txt id="n8m4xp"
feature_action_description
```

---

# Example Naming

```txt id="x6q2vt"
add_bookmark_table
add_subscription_system
update_watch_history_progress
```

---

# Development Flow

```txt id="u4m8qp"
Update Prisma Schema
↓
Generate Migration
↓
Review Migration
↓
Run Migration
↓
Commit Migration
```

---

# Production Rules

Production migration wajib:
- tested locally
- backward safe
- reviewed

---

# Breaking Changes

Hindari:
- drop column langsung
- rename column langsung
- destructive migration

Gunakan:
- phased migration
- fallback strategy

---

# Seed Strategy

Gunakan seed untuk:
- development data
- testing data
- local environment

---

# Rollback Philosophy

Prisma rollback tidak otomatis.

Karena itu:
- review migration sebelum deploy
- gunakan backup production

---

# Future Scaling

Future:
- automated migration pipeline
- CI validation
- production migration automation