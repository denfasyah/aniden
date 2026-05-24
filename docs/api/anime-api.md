# Anime API

## Overview

Aynime menggunakan external anime source API sebagai sumber utama data anime dan streaming.

Source utama:

- Wajik Anime API
- Otakudesu Source

---

Architecture Philosophy

External API tidak boleh langsung diakses dari UI.

Flow wajib:

```txt id="n8q2vx"
Client
↓
Internal Service Layer
↓
External API
↓
Transform Response
↓
UI
```

Tujuan:

- security
- response consistency
- caching control
- error handling centralized

---

Wajik Anime API

Purpose

Digunakan untuk:

- anime list
- anime detail
- episode data
- genre data
- schedule
- popular anime

---

Otakudesu Source

Purpose

Digunakan sebagai:

- anime streaming source
- anime update source

---

API Layer Strategy

Semua external request wajib melalui:

```txt id="u4m7qt"
services/anime-api/
```

---

API Transformation

External response harus:

- divalidasi
- dinormalisasi
- ditransform

Jangan expose raw response langsung ke frontend.

---

Data Normalization

Tujuan:

- consistent frontend structure
- easier maintenance
- easier refactor

---

Fallback Strategy

Jika API gagal:

- gunakan fallback cache
- tampilkan graceful error state
- hindari blank UI

---

Timeout Strategy

External API wajib memiliki:

```txt id="r6m2xp"
request timeout
```

Tujuan:

- mencegah hanging request
- improve UX

---

Retry Strategy

Retry hanya digunakan untuk:

- temporary network issue
- timeout ringan

Jangan retry:

- invalid request
- 404 response

---

Security Rules

Jangan expose:

- raw streaming source
- private API key
- sensitive endpoint

di client side.

---

Future Expansion

Future:

- multiple anime source provider
- fallback provider system
- metadata aggregation
- AI recommendation source
