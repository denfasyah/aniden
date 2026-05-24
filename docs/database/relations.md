# Database Relations

## Overview

Dokumen ini menjelaskan relasi antar table dalam database Aynime.

---

# Main Relationship Diagram

```txt id="v9m2xr"
users
├── bookmarks
├── watch_histories
├── comments
├── notifications
└── subscriptions
```

---

# User ↔ Bookmark

## Relationship
```txt id="n5q7vk"
One User → Many Bookmarks
```

---

## Purpose
Digunakan untuk:
- menyimpan anime favorit
- sync antar device
- personalization

---

# User ↔ Watch History

## Relationship
```txt id="u8m1xp"
One User → Many Watch Histories
```

---

## Purpose
Digunakan untuk:
- continue watching
- progress tracking
- history sync

---

# User ↔ Comments

## Relationship
```txt id="f2q9vn"
One User → Many Comments
```

---

## Purpose
Digunakan untuk:
- discussion system
- engagement
- community feature

---

# User ↔ Notifications

## Relationship
```txt id="x4m7qt"
One User → Many Notifications
```

---

## Purpose
Digunakan untuk:
- anime update
- premium update
- system notification

---

# User ↔ Subscription

## Relationship
```txt id="k7q2xp"
One User → One Subscription
```

---

## Purpose
Digunakan untuk:
- premium validation
- subscription status
- billing management

---

# Cascade Rules

## User Delete

Jika user dihapus:
- bookmarks ikut dihapus
- histories ikut dihapus
- comments ikut dihapus
- notifications ikut dihapus

Subscription:
- disimpan untuk audit history

---

# Relation Principles

Relasi harus:
- explicit
- predictable
- indexed
- scalable

---

# Future Relations

Future:
```txt id="t8m4vx"
anime_ratings
anime_reviews
user_following
watch_parties
```

---

# Database Integrity

Semua relation wajib:
- foreign key protected
- validated
- normalized