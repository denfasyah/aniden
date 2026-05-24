# Users Table

## Overview

Table utama untuk menyimpan data user Aynime.

Authentication menggunakan:
- Google OAuth
- Auth.js

---

# Purpose

Digunakan untuk:
- authentication
- profile data
- premium status
- personalization

---

# Main Columns

```txt id="v5m8qt"
id
name
username
email
image
provider
role
is_premium
premium_expires_at
created_at
updated_at
```

---

# Important Fields

## email
Harus:
- unique
- indexed

---

## username
Digunakan untuk:
- profile display
- comments
- future social feature

---

## role
Default:
```txt id="t2q7vk"
user
```

Future:
```txt id="u8m4xp"
admin
moderator
```

---

## is_premium
Boolean premium status.

---

# Index Strategy

Index:
- email
- username
- is_premium

---

# Security Notes

Jangan simpan:
- password
- sensitive OAuth token

---

# Future Fields

Future:
```txt id="n5m2qt"
bio
banner_image
favorite_genre
theme_preference
```