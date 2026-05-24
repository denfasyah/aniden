# Comments Table

## Overview

Digunakan untuk sistem komentar episode anime.

---

# Purpose

Digunakan untuk:
- engagement
- community discussion
- user interaction

---

# Main Columns

```txt id="v8q4qt"
id
user_id
anime_slug
episode_number
content
like_count
created_at
updated_at
```

---

# Relationship

```txt id="u4m7xp"
Many Comments → One User
```

---

# Content Rules

Comment wajib:
- sanitized
- validated
- limited length

---

# Moderation Strategy

Future:
- report system
- moderation dashboard
- auto moderation

---

# Anti Spam

Gunakan:
- rate limiting
- cooldown system

---

# Index Strategy

Index:
- anime_slug
- episode_number
- created_at

---

# Future Expansion

Future:
```txt id="f5q2vk"
reply_system
comment_like
pinned_comment
spoiler_tag
```