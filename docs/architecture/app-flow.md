# Application Flow

## Overview

Dokumen ini menjelaskan flow utama aplikasi Aynime.

 High Level Flow

txt id="n4m8vp"
Client
↓
Next.js App Router
↓
Server Components
↓
Services Layer
↓
External API / Database
↓
Response
↓
UI Rendering

 Routing Flow

Menggunakan:
 Next.js App Router
 nested layouts
 dynamic routing

 Main Navigation Flow

```txt id="v7p2mk"
Homepage
↓
Anime Detail
↓
Episode List
↓
Streaming Page
↓
Continue Watching
```

 Authentication Flow

```txt id="x4m8qt"
Guest User
↓
Protected Action
↓
Google OAuth
↓
Session Created
↓
Authenticated User
```

 Streaming Flow

```txt id="s2q7vk"
Open Episode
↓
Fetch Episode Data
↓
Fetch Streaming Source
↓
Initialize Player
↓
Save Watch Progress
```

 Bookmark Flow

```txt id="y9m5xp"
Click Bookmark
↓
Check Session
↓
Save To Database
↓
Update UI State
```

 Continue Watching Flow

 Guest
Disimpan di local storage.

 User
Disimpan di database.

 Search Flow

```txt id="k6q2wr"
Input Search
↓
Debounce
↓
API Request
↓
Render Results
```

 Premium Flow

```txt id="d7m1xp"
Upgrade Premium
↓
Midtrans Payment
↓
Webhook Validation
↓
Update Subscription
↓
Premium Access Enabled
```

 Error Handling Flow

```txt id="q4n9vz"
Request Failed
↓
Fallback State
↓
Retry Strategy
↓
User Feedback
```

 Architecture Principles

Flow aplikasi harus:
 predictable
 scalable
 modular
 resilient
