# Subscriptions Table

## Overview

Menyimpan data premium subscription user.

Digunakan untuk:
- premium validation
- payment tracking
- subscription lifecycle

---

# Main Columns

```txt id="n9q4qt"
id
user_id
plan_name
status
payment_provider
transaction_id
started_at
expires_at
created_at
updated_at
```

---

# Relationship

```txt id="r2m8xp"
One Subscription → One User
```

---

# Subscription Status

Possible status:
```txt id="x4q7vk"
active
expired
cancelled
pending
```

---

# Payment Provider

Default:
```txt id="z5m1qt"
midtrans
```

---

# Premium Validation

Premium access berdasarkan:
- active status
- expires_at validity

---

# Webhook Strategy

Midtrans webhook digunakan untuk:
- payment verification
- auto activation
- subscription update

---

# Future Expansion

Future:
```txt id="u8q2xp"
auto_renew
billing_history
invoice_url
coupon_code
```