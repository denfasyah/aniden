# Watch Histories Table

## Overview

Menyimpan progress episode yang ditonton user.

Digunakan untuk:
- continue watching
- sync multi-device
- progress tracking

---

# Main Columns

```txt id="n4q2vk"
id
user_id
anime_slug
episode_number
episode_title
episode_image
watch_progress
duration
last_watched_at
created_at
updated_at
```

---

# Important Fields

## watch_progress
Progress detik video terakhir.

---

## duration
Total durasi episode.

---

## last_watched_at
Digunakan untuk sorting continue watching.

---

# Relationship

```txt id="r6m8qt"
Many Watch Histories → One User
```

---

# Performance Strategy

Index:
- user_id
- last_watched_at

---

# Save Strategy

Progress save menggunakan:
- debounce save
- periodic update

Agar:
- tidak spam database
- tetap realtime enough

---

# Future Expansion

Future:
```txt id="z2q7vx"
watch_completed
rewatch_count
watch_device
```