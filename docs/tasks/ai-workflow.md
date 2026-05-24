# AI Workflow Rules

## Overview

Dokumen ini mengatur:

- cara menggunakan AI agent
- task workflow
- context structure
- development flow

---

AI Philosophy

AI adalah:

```txt id="u5q8vx"
assistant engineer
```

Bukan:

```txt id="v4m2qt"
full autonomous replacement
```

---

Main Workflow

Flow kerja:

```txt id="n8m1xp"
Read Docs
↓
Understand Context
↓
Read Related Task
↓
Implement
↓
Review
↓
Refactor
↓
Document
```

---

Context Rules

Sebelum coding:
AI wajib membaca:

- related docs
- architecture docs
- task docs
- design docs

---

Task Structure

Task harus:

- jelas
- spesifik
- measurable
- scoped

---

Good Task Example

```txt id="r5q7vt"
Build responsive navbar
with mobile sidebar
and dark mode toggle.
```

---

Bad Task Example

```txt id="f2m8qp"
Fix UI
```

---

AI Prompting Rules

Prompt harus:

- jelas
- memiliki context
- memiliki expected output

---

Recommended AI Flow

## Step 1

Beri context docs.

---

## Step 2

Beri task kecil.

---

## Step 3

Review hasil AI.

---

## Step 4

Refactor manual jika perlu.

---

Anti-Pattern

Jangan:

- suruh AI build semua sekaligus
- tanpa context
- tanpa review

---

Development Philosophy

Gunakan:

```txt id="x7q4vx"
small iterative development
```

Bukan:

```txt id="u8m2vt"
massive one-shot generation
```

phase 1

step 1 setup project :
Baca:

- docs/architecture/tech-stack.md
- docs/architecture/folder-structure.md
- docs/design/design-system.md

Lalu bantu saya setup initial project Aniden menggunakan:

- Next.js App Router
- TypeScript
- TailwindCSS
- ESLint
- Prettier
- src architecture

Berikan step-by-step setup dan struktur folder final.

Step 2 — Setup Folder Architecture

Setelah setup selesai.

Prompt:

Baca:

- docs/architecture/folder-structure.md
- docs/architecture/naming-convention.md

Lalu buatkan struktur folder production-scale untuk project Aniden.
Gunakan scalable feature-based architecture.
Step 3 — Setup Design System

Prompt:

Baca:

- docs/design/colors.md
- docs/design/typography.md
- docs/design/design-system.md

Lalu setup:

- tailwind theme
- color variables
- typography system
- dark/light mode
- spacing system
- reusable class naming
Step 4 — Setup Core Providers

Prompt:

Baca:

- docs/auth/session.md
- docs/architecture/state-management.md

Lalu setup:

- Theme Provider
- Session Provider
- Query Provider
- Global App Layout
Step 5 — Setup Auth

Prompt:

Baca:

- docs/auth/auth-flow.md
- docs/auth/google-oauth.md
- docs/auth/roles.md

Lalu implement:

- Auth.js
- Google OAuth
- session handling
- protected route middleware
Step 6 — Setup Database

Prompt:

Baca:

- docs/database/schema.md
- docs/database/relations.md
- docs/database/tables/users.md

Lalu setup:

- Supabase
- Prisma
- initial schema
- migration structure
Step 7 — Setup API Layer

Prompt:

Baca:

- docs/api/anime-api.md
- docs/api/endpoints.md
- docs/api/response-format.md

Lalu buatkan:

- axios instance
- API service architecture
- error handling layer
- response transformer

phase 2

STEP 1 — Setup Theme System

Prompt AI:

Baca:

- docs/design/colors.md
- docs/design/design-system.md
- docs/design/typography.md
- docs/design/responsive.md

Lalu setup:

- dark/light mode
- CSS variables theme
- Tailwind custom theme
- typography scale
- spacing system
- container system
- cyberpunk aesthetic system

Gunakan:

- Next.js App Router
- TailwindCSS
- TypeScript

Buat scalable production-ready architecture.
Hasil Yang Harus Jadi
src/styles/
src/lib/theme/
tailwind.config.ts
globals.css
theme-provider.tsx

STEP 2 — Setup Layout System

Tujuan:
semua page punya struktur konsisten.

Prompt AI:

Baca:

- docs/design/ui-sections.md
- docs/design/responsive.md
- docs/features/navbar.md

Lalu buatkan:

- Root layout
- Main layout
- Container system
- Responsive layout wrapper
- Section wrapper
- Grid system

Gunakan clean scalable architecture.
Hasil Yang Harus Jadi
components/layout/
components/shared/
components/ui/

STEP 3 — Setup Reusable Components

JANGAN langsung bikin page.

Bikin reusable dulu.

Component Priority
Core UI
Button
Input
Modal
Card
Badge
Chip
Avatar
Dropdown
Tooltip
Tabs
Skeleton
Carousel wrapper

Prompt AI:

Baca:

- docs/design/components.md
- docs/design/design-system.md
- docs/design/animations.md

Lalu buat reusable UI components:

- Button
- Input
- Card
- Badge
- Skeleton
- Modal wrapper
- Tabs

Gunakan:

- Tailwind
- CVA
- clsx
- clean variant system

Pastikan:

- dark/light mode support
- responsive
- accessible
- scalable

STEP 4 — Setup Navbar

Navbar adalah:

core interaction system

Kerjakan sendiri terpisah.

Prompt AI:

Baca:

- docs/features/navbar.md
- docs/design/ui-sections.md
- docs/design/animations.md

Lalu buat responsive navbar:

- desktop navbar
- mobile navbar
- hamburger sidebar
- search interaction
- profile dropdown
- dark mode toggle

Theme:
cyberpunk modern anime streaming platform

Gunakan:

- Framer Motion
- Tailwind
- TypeScript

STEP 5 — Setup Footer

Prompt:

Baca:

- docs/design/ui-sections.md

Lalu buatkan footer modern:

- responsive
- anime streaming aesthetic
- social section
- navigation links
- copyright
- modern cyberpunk style

STEP 6 — Setup Loading States

INI PENTING.

Project anime:

heavy content platform

jadi loading harus bagus.

Prompt:

Baca:

- docs/design/components.md
- docs/design/animations.md

Lalu buat:

- anime card skeleton
- hero skeleton
- streaming skeleton
- detail page skeleton
- loading shimmer animation

STEP 7 — Baru Homepage

SETELAH reusable system jadi.

Homepage Build Order

1. Hero
2. Anime Card
3. Carousel System
4. Continue Watching
5. Latest Update
6. Genre Carousel
7. Trending
8. Schedule
Jangan Build Sekaligus

SALAH:

buat homepage lengkap

BENAR:

buat hero section dulu
Recommended Homepage Task
Task 1
Build Hero Carousel
Task 2
Build Anime Card
Task 3
Build Anime Carousel
Task 4
Build Continue Watching Section
Kenapa Harus Begini?

Karena professional frontend:

build system first

bukan:

build random pages
Tools Yang Sebaiknya Dipakai
Wajib
TailwindCSS
Framer Motion
clsx
tailwind-merge
class-variance-authority
Optional
shadcn/ui
embla-carousel
sonner
next-themes
Best UI Architecture
components/
├── ui/
├── shared/
├── layout/
├── anime/
├── streaming/
├── home/
Target UI Kamu

Bukan:

sekadar keren

Tapi:

maintainable + scalable + reusable

Itu yang membedakan:

UI artist
vs
senior frontend engineer.

phase 3

PHASE 03 — ANIME FEATURES

Sekarang baru mulai masuk ke:

core business logic Aniden

Di phase ini fokusnya:

ambil data anime
tampilkan anime
streaming flow
search
continue watching

BELUM:

AI
premium rumit
ads system kompleks
scaling besar
Goal Phase 03

Target akhir:

user sudah bisa:

- browse anime
- buka detail anime
- nonton episode
- search anime
- bookmark anime
- continue watching

Kalau ini sudah jadi:

MVP hampir hidup
Urutan PHASE 03 Yang Benar

1. API Layer
2. Data Normalization
3. Anime Card System
4. Homepage Anime Sections
5. Anime Detail
6. Streaming Page
7. Search System
8. Continue Watching
9. Bookmark
STEP 1 — Setup Anime API Layer

JANGAN fetch random langsung di component.

Bikin:

service architecture
Prompt AI
Baca:

- docs/api/anime-api.md
- docs/api/endpoints.md
- docs/api/response-format.md
- docs/api/error-handling.md

Lalu buatkan:

- axios instance
- anime service layer
- endpoint abstraction
- response transformer
- typed API response
- error handler

Gunakan:

- TypeScript
- scalable service architecture
- production-ready pattern
Hasil Yang Harus Jadi
src/services/anime/
├── anime.service.ts
├── anime.types.ts
├── anime.mapper.ts
├── anime.query.ts
├── anime.constants.ts
Kenapa Penting?

Karena API anime biasanya:

inconsistent
messy
berubah-ubah

Jadi kamu perlu:

normalization layer
STEP 2 — Setup Anime Types

JANGAN pakai:

any

Bikin type system.

Prompt
Baca response API anime lalu buat:

- Anime type
- Episode type
- Genre type
- Streaming type
- Pagination type

Gunakan scalable TypeScript typing.
STEP 3 — Build Anime Card

Anime card adalah:

most reused component

dipakai dimana-mana.

Prompt
Baca:

- docs/design/components.md
- docs/features/homepage.md

Lalu buat AnimeCard component:

- poster image
- hover animation
- episode badge
- rating badge
- loading state
- responsive

Theme:
modern cyberpunk anime platform
STEP 4 — Build Carousel System

Karena homepage penuh carousel.

Prompt
Buat reusable anime carousel system:

- horizontal scroll
- navigation button
- drag support
- responsive
- loading state

Gunakan:

- embla-carousel
- TypeScript
- Tailwind
STEP 5 — Build Homepage Sections

JANGAN sekaligus.

Urutan:

5.1 Hero Carousel

Prompt:

Baca:

- docs/features/homepage.md

Lalu buat hero anime carousel:

- backdrop image
- autoplay
- smooth transition
- anime metadata
- CTA button
- responsive
- cinematic cyberpunk style
5.2 Latest Update Section

Prompt:

Build latest anime update section:

- reusable anime grid
- loading skeleton
- responsive grid
- server-side data fetching
5.3 Continue Watching

Prompt:

Baca:

- docs/features/continue-watching.md

Lalu buat continue watching section:

- guest localStorage support
- user database support
- progress indicator
- horizontal carousel
5.4 Genre Carousel

Prompt:

Build genre carousel:

- clickable genre chip
- horizontal scroll
- active state
- responsive interaction
STEP 6 — Anime Detail Page

INI halaman paling penting.

Prompt
Baca:

- docs/features/anime-detail.md
- docs/performance/virtualization.md

Lalu buat anime detail page:

- hero section
- anime metadata
- synopsis expand
- episode list
- recommendation section
- bookmark button
- continue watching CTA

Gunakan:

- server components
- optimized image
- virtualization untuk episode list
STEP 7 — Streaming Page

INI retention core.

Prompt
Baca:

- docs/features/streaming.md
- docs/performance/lazy-loading.md

Lalu buat streaming page:

- video player
- next/prev episode
- episode navigation
- continue watching sync
- recommendation section
- mobile optimized player layout
STEP 8 — Search System

Search sangat penting.

Prompt
Baca:

- docs/features/search.md

Lalu buat anime search system:

- debounce search
- suggestion dropdown
- search overlay mobile
- keyboard navigation
- loading state
- empty state
STEP 9 — Bookmark System

Prompt:

Baca:

- docs/features/bookmarks.md

Lalu buat bookmark system:

- optimistic UI
- database sync
- guest handling
- bookmark page
STEP 10 — Continue Watching Sync

Prompt:

Baca:

- docs/features/continue-watching.md

Lalu implement:

- localStorage sync
- database sync
- timestamp saving
- episode progress
- resume watching logic
Best Practice Yang Sangat Penting

1. Pisahkan:
UI
Logic
Data Fetching
State
2. Gunakan Server Components

Untuk:

anime data
homepage sections
SEO page
3. Gunakan Client Components

HANYA untuk:

interactivity
carousel
dropdown
player interaction
4. JANGAN Over Client Component

Kesalahan pemula Next.js:

"use client" dimana-mana
5. Normalize Semua API

JANGAN expose raw API response langsung ke UI.

1. Gunakan Skeleton

Anime website:

wajib punya perceived performance bagus
7. Streaming Page Jangan Berat

Karena:

player sudah berat
comments berat
recommendation berat
MVP Selesai Kapan?

Kalau sudah ada:

- homepage
- anime detail
- streaming
- search
- bookmark
- continue watching

Maka:

Aniden sudah bisa launch alpha

Dan itu sudah jauh lebih profesional dibanding:
90% project anime clone random GitHub.
