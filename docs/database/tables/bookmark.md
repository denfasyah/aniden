# Bookmarks Table

## Overview

Menyimpan anime yang dibookmark user.

---

# Purpose

Digunakan untuk:
- favorite anime
- watch later
- personalization

---

# Main Columns

```txt id="y7q2vk"
id
user_id
anime_slug
anime_title
anime_image
created_at
updated_at
```

---

# Relationship

```txt id="m2q8vn"
Many Bookmarks → One User
```

---

# Important Rules

Satu user:
- tidak boleh bookmark anime duplicate

Gunakan:
```txt id="x8m4qt"
unique(user_id, anime_slug)
```

---

# Index Strategy

Index:
- user_id
- anime_slug

---

# Future Expansion

Future:
```txt id="u5m1xp"
bookmark_folder
bookmark_note
favorite_priority
```