# TEST_DESIGN.md

## Why This Structure

- **POM** — widely used in UI automation. If a selector changes, I fix one file, not six.
- **One spec per scenario** — file name tells me what broke.
- **Fixtures** — change test data without touching code.
- **Custom commands** — write common checks once, reuse everywhere.

**Assumptions:**
- eMag tested as guest — assignment didn't mention auth, cart works without login.
- "Accessory" = soundbars — task didn't specify, Samsung has many on eMag.
- Cookie banners — dismissed if present, skipped if not.

---

## What I'd Add With 2 More Hours

Replace hardcoded waits with fluent waits — wait for actual responses, not guessed milliseconds.

---

## Easy vs Fragile

**Easy:** tests against stable content (headings, logos, links). POM and fixtures keep updates small.

**Fragile:** tests against a live production site I don't control — DOM, products, uptime can change anytime. Ideally this runs against staging, but the assignment required a public site. The shopping scenario requirements were also vague, so some decisions were based on assumptions.
