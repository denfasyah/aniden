# Folder Structure

## Overview

Struktur project Aynime dirancang untuk:
- scalability
- modularity
- maintainability
- AI-agent friendly workflow

Project menggunakan:
- feature-based architecture
- modular separation
- shared reusable system

---

# Root Structure

```txt id="k9q2vx"
src/
│
├── app/
├── components/
├── features/
├── services/
├── hooks/
├── lib/
├── store/
├── types/
├── constants/
├── styles/
└── utils/
```

---

# app/

Berisi:
- routing
- layouts
- pages
- server rendering entry

Menggunakan:
- Next.js App Router

---

# components/

Berisi reusable shared UI.

Contoh:
```txt id="q2n7kp"
components/
├── ui/
├── layout/
├── shared/
├── cards/
├── modal/
└── loading/
```

---

# features/

Berisi feature isolated modules.

Contoh:
```txt id="r5x8tm"
features/
├── auth/
├── anime/
├── streaming/
├── bookmarks/
├── comments/
└── premium/
```

Setiap feature memiliki:
- components
- hooks
- services
- types
- actions

---

# services/

Berisi:
- API calls
- external integrations
- business services

Contoh:
```txt id="u7p4mx"
services/
├── anime-api/
├── auth/
├── payment/
└── analytics/
```

---

# hooks/

Berisi reusable custom hooks.

Contoh:
```txt id="v8n1kt"
hooks/
├── use-auth.ts
├── use-theme.ts
├── use-bookmark.ts
└── use-streaming.ts
```

---

# lib/

Berisi:
- configuration
- helpers
- setup
- utilities infrastructure

Contoh:
```txt id="p4x7vm"
lib/
├── prisma.ts
├── supabase.ts
├── auth.ts
└── env.ts
```

---

# store/

Berisi global state.

Contoh:
```txt id="y5m2xp"
store/
├── auth-store.ts
├── theme-store.ts
└── player-store.ts
```

---

# types/

Berisi global TypeScript types.

---

# constants/

Berisi:
- routes
- enums
- static configs

---

# styles/

Berisi:
- global styles
- theme styles
- animation styles

---

# utils/

Berisi:
- formatter
- helper utilities
- reusable functions

---

# Architecture Principles

## Feature Isolation
Setiap feature harus:
- independent
- modular
- reusable

---

## Shared UI Separation
Reusable UI tidak boleh tightly coupled dengan feature tertentu.

---

## Scalability
Structure harus mudah:
- menambah feature
- refactor
- maintenance

---

# AI-Agent Friendly Structure

Structure dirancang agar:
- context mudah dipahami AI
- feature mudah diisolasi
- task mudah dipisah