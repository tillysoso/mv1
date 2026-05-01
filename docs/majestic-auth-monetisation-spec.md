# MAJESTIC — AUTH & MONETISATION POSITIONING

## When to ask, how to ask, and how not to feel like an app doing it

*Version 1.0 — Your adventure. But Majestic.*

-----

## 01 — THE PROBLEM THIS SPEC SOLVES

Majestic’s brand promise is that it never feels like a sign-up flow. The audience is sceptical of being profiled, sold to, or sorted. The onboarding spec explicitly states: “no form energy, no administrative progress bars.”

And yet: journal entries, avatar state, birth cards, reading history, and subscription status all require an authenticated user in Supabase. None of these can persist across sessions without one.

This spec defines exactly when authentication happens, how it’s framed, and how paid features are introduced — in a way that is consistent with everything else Majestic is.

-----

## 02 — GUIDING PRINCIPLES

**1. Value before ask.** The user must have received something genuinely meaningful before being asked to do anything. Auth after the world has given them their Majestic Profile and their companion — not before.

**2. Frame as continuity, not account creation.** The user is not creating a login. The world is remembering them. The copy and UX must reflect this.

**3. Two taps maximum.** Apple Sign In and Google Sign In only. No email/password in v1. No password confirmation. No marketing opt-in. No terms of service checkbox during onboarding — link in settings.

**4. Paid features introduced passively.** The user discovers what’s gated when they reach for it, not in a features list during onboarding. They should never feel sold to before they’ve decided they want to stay.

**5. Daily draw is always the anchor.** It is never gated. It is never interrupted. It is the one thing the app always delivers, every day, without asking for anything in return. This is what earns trust.

-----

## 03 — AUTH TIMING

### When: Screen 11 — Companion Confirmed

This is the exact right moment. Here’s why:

By Screen 11, the user has:

- Seen the world (Screen 01)
- Given their name and date of birth (02–03)
- Received their personality and soul cards (05–06)
- Seen their Majestic Profile (07)
- Chosen their companion (08–11)

They have invested 3–5 minutes. They have received something that feels personal and specific to them. They have chosen something. The instinct to save it is natural — Majestic simply provides the mechanism.

The companion’s first words have just fired. The UI theme has bloomed. In this moment, the world says: *let’s make sure we remember this.*

### What happens

After the avatar’s first words and a brief hold (1 second), a single overlay appears — not a modal, not a new screen. It rises as a bottom sheet, low-friction, world-registered:

**Copy (Cinzel, displaySM, bone white, centred):**
*“Your companion is set. Let’s make sure the world remembers you.”*

**Two options below (full-width buttons, avatar accent colour):**

- **Continue with Apple**
- **Continue with Google**

**Below the buttons (Montserrat, 12px, mist grey):**
*“Your profile, readings, and journal stay yours.”*

No “sign up.” No “create account.” No “log in.” Framed entirely as saving and continuity.

### What if they dismiss it?

Don’t offer a dismiss option at this stage. The design makes it feel inevitable, not forced — the copy frames it as protecting something they already value, not as requesting something from them. The two buttons are the only option. But neither has urgency or pressure copy.

If auth genuinely fails (network issue, user cancels Apple/Google prompt), fall back gracefully:

*“We’ll save your progress when you’re ready.”*

Store onboarding state locally, retry on next app open. If they return without authenticating, the world picks up where it left off and offers auth again quietly.

### After auth

Auth succeeds → profile created in Supabase (name, DOB, birth cards, avatar) → Screen 12 (First Draw) loads. Seamless. The user never feels like they just created an account.

-----

## 04 — WHAT AUTH ENABLES (COMMUNICATED PASSIVELY)

The user learns what auth gives them through experience, not a features list:

- **Session 1:** After first draw, a quiet line appears: *“Your profile and this draw are now in your codex. The world is starting to know you.”* They discover the journal exists. They discover the codex is tracking their cards.
- **Session 2:** The avatar greets them by name. The daily draw is waiting. The world remembered. This is the payoff.
- **Session 3+:** They notice their reading history building. The pattern emerges. They’re hooked before they’ve even been told what they’re paying for.

None of this is announced during onboarding. It accumulates.

-----

## 05 — PAID FEATURE INTRODUCTION TIMING

### The principle: never before they want it

Paid features are discovered at the moment of wanting, not presented as a features list. The user reaches for something and Majestic is honest that it costs — but only after they’ve already decided they want it.

### Sequence of discovery (natural progression)

**Day 1 — First draw:**
User experiences daily draw, base reading, avatar companion line. Everything they see is free. No paywall anywhere. Zero friction. They leave having had a real experience.

**Day 2–3 — Return sessions:**
Daily draw again. They start initiating their own readings (1-card or 3-card). After 2–3 readings, the DIG DEEPER button appears and they tap it. Synthesis lands. They like it. Angles appear. They tap one.

*First paywall moment.* Inline, no interruption, no drama:

> *There’s more here. Unlock the full reading.*

Two options. They can ignore it and come back tomorrow with fresh credits. No countdown. No expiry anxiety.

**Day 4–7 — Credit awareness:**
They’ve used their 3 free Dig Deeper sessions a few times. The limit feels real but not aggressive. The value of going unlimited starts to feel obvious. The subscription prompt is available in Profile — passive, not pushed.

**Natural conversion moment:**
A reading lands that they care about. They want to go deeper. Credits are exhausted. The upgrade prompt is there. They’ve already experienced the value. This is when conversion happens — from desire, not pressure.

### What never happens

- A paywall during onboarding
- A “here’s what you can unlock” slide during onboarding
- A notification about subscription
- A badge or indicator counting down free readings before they’ve been used
- Any mention of money before the user has completed their first reading

-----

## 06 — SUBSCRIPTION DISCOVERY SURFACES

### Passive (always present, never pushed)

**Profile surface:**
A quiet line below the reading history section. Not highlighted, not badged.
*“Go deeper into every reading.”* Text link → subscription screen.

Free users see this. Subscribers see their current plan + manage option. No upsell copy for subscribers.

**Settings:**
Subscription status visible. Upgrade link for free users. No upsell copy — just the option.

### Active (appears only when user reaches a gate)

**Inline upgrade prompt** — appears in content space when locked content is tapped. Copy locked in Dig Deeper v2 spec and Subscription Tier spec. Always appears after value has already been delivered in the same session.

**Reading credit exhausted** — DIG DEEPER button replaced with upgrade prompt copy. Never appears before the base reading is complete.

### What never appears

- Full-screen interstitial paywall
- “You have X readings left” counter (until credits are fully exhausted — and even then, just the reading credit exhausted message, no countdown during the session)
- Subscription upsell in any notification
- Subscription badge on any navigation icon

-----

## 07 — DEV IMPLEMENTATION NOTES

**Auth:**

- Supabase Auth with Apple and Google providers only in v1
- `auth.ts` already implements signUp, signIn, signOut, getCurrentUser, onAuthStateChange (#112 complete)
- Auth prompt at Screen 11 fires after `avatarStore.setAvatar()` is called and avatar theme has bloomed
- On auth success: write profile to Supabase (name from onboarding state, DOB, birthCards from profileStore, avatarId from avatarStore)
- On auth failure: store onboarding state to AsyncStorage, retry on next open
- Auth state persists via `authStore.ts` listener — already implemented

**Reading credit gate:**

- Check fires on DIG DEEPER tap, not on card draw or reading screen load
- If `profiles.readings_today >= 3` AND `profiles.subscription_active = false` → show upgrade prompt, do not open Dig Deeper panel
- If credits available → increment `readings_today`, open panel
- Reset logic: compare `readings_reset_at` date to today on app open, reset if new day

**Subscription state:**

- `subscription_active` written only by RevenueCat webhook edge function — never by client
- Client reads subscription state from `authStore` or `profileStore` on load
- All subscription-gated UI checks against this single boolean — no client-side product ID checks

**Local fallback (pre-auth):**

- Onboarding state stored in Zustand during flow — profileStore already handles this
- If auth fails at Screen 11, persist profileStore state to AsyncStorage
- On next open, detect incomplete auth, restore profileStore from AsyncStorage, re-prompt auth at same point

-----

## 08 — COPY LOCKED IN THIS SPEC

|Moment                   |Copy                                                                                    |
|-------------------------|----------------------------------------------------------------------------------------|
|Auth prompt headline     |*“Your companion is set. Let’s make sure the world remembers you.”*                     |
|Auth prompt subtext      |*“Your profile, readings, and journal stay yours.”*                                     |
|Auth button (Apple)      |*Continue with Apple*                                                                   |
|Auth button (Google)     |*Continue with Google*                                                                  |
|Auth failure fallback    |*“We’ll save your progress when you’re ready.”*                                         |
|Post-first-draw discovery|*“Your profile and this draw are now in your codex. The world is starting to know you.”*|
|Profile subscription link|*“Go deeper into every reading.”*                                                       |

All other upgrade/paywall copy lives in `majestic-subscription-tier-spec.md`.

-----

## 09 — WHAT THIS UNLOCKS

- Auth prompt implementation at Screen 11 (depends on #103, #104, #105)
- Profile subscription status display (#128 — spec complete, display logic needed)
- Reading credit exhausted state (depends on #160 schema additions)
- All subscription gating logic (depends on #159, #160, #115)

-----

*Majestic — Auth & Monetisation Positioning — v1.0*
*Your adventure. But Majestic.*
