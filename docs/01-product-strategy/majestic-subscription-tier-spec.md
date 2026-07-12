# MAJESTIC — SUBSCRIPTION TIER SPEC
## Monetisation Model, Gating Logic & Upgrade UX
*Version 1.0 — Your adventure. But Majestic.*

---

## 01 — MODEL OVERVIEW

Majestic uses a freemium model. The free tier is genuinely useful — not crippled. The paid tier unlocks depth, not access. The principle throughout: **the world is free. The advice is gated.**

### Three tiers

| Tier | Name | Price | What it unlocks |
|------|------|-------|----------------|
| Free | — | $0 | Daily draw (unlimited). 3 initiated readings/day. Base avatar interpretation. Avatar lore resonance. Extended card reading. Full Codex discovery. Full journal. |
| Pay-as-you-go | Single Reading | ~$2.99 AUD | One reading session with full Dig Deeper access (synthesis + angles). Does not roll over. |
| Subscription | Majestic Full | ~$14.99 AUD/month | Unlimited initiated readings. Full Dig Deeper on all readings. Dig Even Deeper angle interpretations (Codex + reading screen). |

### What is always free — no exceptions

- Daily draw (the core retention mechanic — never gated, ever)
- Base avatar companion line and card interpretation after any draw
- Codex access — browsing, discovery, world lore fragments
- Avatar lore resonance (Codex card detail)
- Extended card reading (Codex card detail)
- Journal — all reading archive entries, standalone writing
- Majestic Profile — birth cards, resonance tracking
- Pixel Elder appearances

### What is gated

| Feature | Gate |
|---------|------|
| 4th+ initiated reading in a day | Reading credit exhausted → upgrade prompt |
| Dig Deeper on reading screen (AI synthesis) | Uses reading credit — free within 3/day, subscription for unlimited |
| Angle buttons on reading screen (WHAT'S THE TENSION etc.) | Subscription only |
| Love / Career / Life angle interpretations (Codex) | Subscription only |

---

## 02 — READING CREDIT LOGIC

### How it works

A "reading credit" is consumed when a user taps DIG DEEPER after an initiated reading (1-card or 3-card spread).

- Daily draw does **not** consume a reading credit. Ever.
- The base reading (card reveal, avatar companion line, aura context) does **not** consume a credit.
- The DIG DEEPER button tap consumes the credit — not the card draw.

This distinction matters for UX: the user always gets something valuable before hitting any limit. They see their card, they read their companion's take, the reading lands. Only then does the Dig Deeper gate appear.

### Credit count: 3 per day

Resets at midnight local time. Tracked in `profiles.readings_today` with `profiles.readings_reset_at`.

### When credits are exhausted

The DIG DEEPER button on the reading screen is replaced by:

*"You've had three deep readings today."*
*"Come back tomorrow, or go further now."*

Two options below:
- **UNLOCK THIS READING** — pay-as-you-go, ~$2.99 AUD
- **GO UNLIMITED** — subscription, ~$14.99 AUD/month

No countdown timer. No "X hours remaining." The limit is stated plainly, the options offered cleanly.

---

## 03 — SUBSCRIPTION UX

### Entry points (how users discover the subscription)

1. **Reading credit exhausted** — primary conversion moment. User hits the limit mid-flow.
2. **Codex angle pills** — free user taps LOVE / CAREER / LIFE in Codex card detail. Inline upgrade prompt appears.
3. **Profile surface** — subscription status visible in Profile. "Upgrade" text link present for free users.
4. **Settings** — manage subscription from here. No aggressive upsell in settings — just the status and options.

### The upgrade prompt — principles

Never interrupts before value is delivered. Always arrives after the user has received something. Never uses countdown timers, streak anxiety, or "limited time" language. Never mentions what other users do. Never gamifies the decision.

**Inline prompt copy (Codex angles, after base content visible):**

> *There's more here. Unlock the full reading.*

Options: **UNLOCK THIS READING** (pay-as-you-go) / **SEE SUBSCRIPTION** (text link)

**Reading credit exhausted copy (reading screen):**

> *You've had three deep readings today.*
> *Come back tomorrow, or go further now.*

Options: **UNLOCK THIS READING** / **GO UNLIMITED**

**Profile surface (passive, no urgency):**

> *Dig deeper into every reading. Unlimited, whenever you want.*

Option: **UPGRADE**

### After upgrade

Locked content appears immediately in place — no navigation away, no reload. The experience continues where it paused. The upgrade is invisible in its aftermath.

### Subscription management

Via RevenueCat + native App Store / Google Play subscription management. Cancellation handled natively — Majestic does not build a custom cancellation flow in v1.

---

## 04 — PAY-AS-YOU-GO

Single reading purchase: ~$2.99 AUD. Unlocks one reading session's full Dig Deeper access (synthesis + all angle buttons).

Does not unlock Codex angle interpretations — PAYG is reading-session only. Codex angles require subscription.

PAYG is positioned as: *try before you subscribe.* Not the primary revenue model — subscription is. But it lowers the first-purchase barrier significantly for users who are curious but not ready to commit.

RevenueCat: implement as a consumable in-app purchase, not a subscription product.

---

## 05 — PRICING RATIONALE

**~$14.99 AUD/month subscription:**
Positioned in the "considered but accessible" range for the AU market. Below Headspace / Calm (~$17–20/month) — Majestic is not positioning as a wellness app and should not price like one. Above cheap utility apps. The price communicates depth without intimidation.

**~$2.99 AUD per reading (PAYG):**
Low enough to be impulsive. High enough that 5 PAYG purchases = subscription price, creating natural upgrade pressure for any user who pays more than once. This maths should be visible on the subscription screen: *"Or go unlimited for the price of five readings."*

**Annual subscription (future):**
~$99 AUD/year (~$8.25/month). Offer post-launch once monthly retention is proven. Not in v1.

---

## 06 — SUPABASE SCHEMA ADDITIONS

```sql
-- profiles table additions
ALTER TABLE profiles ADD COLUMN readings_today integer DEFAULT 0;
ALTER TABLE profiles ADD COLUMN readings_reset_at timestamptz DEFAULT now();
ALTER TABLE profiles ADD COLUMN subscription_active boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN subscription_tier text; -- 'monthly' | 'payg' | null
ALTER TABLE profiles ADD COLUMN subscription_expires_at timestamptz;

-- RLS: users can only read/write their own subscription data
-- subscription_active is set server-side by RevenueCat webhook — never client-writable

-- card_content table (rename interp_general → interp_life)
ALTER TABLE card_content RENAME COLUMN interp_general TO interp_life;
```

### RevenueCat webhook

RevenueCat sends purchase/renewal/cancellation events to a Supabase Edge Function. The function updates `subscription_active`, `subscription_tier`, and `subscription_expires_at` on the relevant profile. Client-side never writes these fields directly.

### Reading credit reset

Option A (simpler): check and reset on app open — compare `readings_reset_at` to current date, reset `readings_today = 0` if new day.
Option B (more robust): Supabase scheduled function resets all profiles at midnight UTC. Adjust for local time on client.

Recommend Option A for v1 — lower infrastructure complexity, acceptable accuracy for a daily counter.

---

## 07 — REVCAT PRODUCT IDS (to be confirmed)

| Product | Type | RevenueCat ID |
|---------|------|---------------|
| Majestic Full — Monthly | Auto-renewing subscription | `majestic_monthly` |
| Single Reading Unlock | Consumable IAP | `majestic_reading_payg` |
| Majestic Full — Annual (v2) | Auto-renewing subscription | `majestic_annual` |

---

## 08 — WHAT THE SUBSCRIPTION SCREEN LOOKS LIKE

A single screen, accessible from upgrade prompts and Profile. Not a modal — a full screen. Clean, atmospheric, not a features comparison table.

**Layout (top to bottom):**
1. Small Majestic emblem, centred
2. Headline — Cinzel, displayMD: *"Go further."*
3. Two-line sub: Montserrat, bone white — *"Unlimited readings. Every angle. Whenever you need it."*
4. Signal-line divider
5. What you get — three items, no bullet points, Montserrat body:
   - *Unlimited daily readings*
   - *Full Dig Deeper on every spread*
   - *Love, Career & Life interpretations for all 78 cards*
6. Pricing block — Cinzel displaySM: **$14.99 / month**. Below it, mist grey Montserrat: *"Or try a single reading for $2.99."*
7. Primary CTA button — full width, avatar accent colour: **START UNLIMITED**
8. Secondary option — mist grey text link below: *"Just this reading — $2.99"*
9. Fine print — Montserrat 11px, mist grey: "Billed monthly. Cancel anytime. Manages via your App Store account."

**No free trial in v1.** Consider 3-day or 7-day trial post-launch once conversion data exists.

---

## 09 — TRACKER TASKS

| Task | ID | Status |
|------|----|--------|
| RevenueCat implementation | #115 | todo |
| Subscription tier spec (this doc) | #159 | complete |
| Supabase schema additions for subscription | depends #111 ✓ | new — add to tracker |
| Subscription screen UI | — | new — add to tracker |
| RevenueCat webhook edge function | — | new — add to tracker |

---

*Majestic — Subscription Tier Spec — v1.0*
*Your adventure. But Majestic.*
