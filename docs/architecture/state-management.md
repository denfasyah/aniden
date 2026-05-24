# State Management

## Overview

Aynime menggunakan layered state management strategy.

Tidak semua state harus global.

---

# State Categories

## Local State
Digunakan untuk:
- modal state
- dropdown
- UI interaction
- temporary form state

Gunakan:
- useState
- useReducer

---

# Global State

Digunakan untuk:
- auth session
- theme
- player state

Gunakan:
- Zustand

---

# Server State

Digunakan untuk:
- API data
- async data
- cached response

Gunakan:
- Server Components
- fetch caching
- React cache

---

# Theme State

Theme:
- dark mode
- light mode
- persisted storage

---

# Player State

Player state:
- current episode
- progress
- volume
- quality

---

# Authentication State

Auth state:
- session
- user profile
- premium status

---

# State Principles

## Minimal Global State
Jangan membuat global state berlebihan.

---

## Server First
Utamakan server data dibanding client fetching.

---

## Predictable Updates
State update harus:
- jelas
- terisolasi
- mudah debug

---

# State Anti-Patterns

Hindari:
- prop drilling berlebihan
- duplicated state
- unnecessary global store