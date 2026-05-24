# Notifications Table

## Overview

Menyimpan notification user.

---

# Purpose

Digunakan untuk:
- anime update
- premium update
- system notification

---

# Main Columns

```txt id="q2m8vt"
id
user_id
title
message
type
is_read
created_at
updated_at
```

---

# Notification Types

```txt id="v6q4xp"
anime_update
premium
system
announcement
```

---

# Relationship

```txt id="y5m1qt"
Many Notifications → One User
```

---

# Notification Rules

Notification harus:
- lightweight
- informative
- non-spammy

---

# Read Strategy

Gunakan:
```txt id="k8q2vx"
is_read boolean
```

---

# Future Expansion

Future:
```txt id="t4m7xp"
push_notification
email_notification
notification_preferences
```

---

# Performance Strategy

Index:
- user_id
- is_read
- created_at