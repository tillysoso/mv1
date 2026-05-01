# MAJESTIC — ALTAR & RITUAL SPEC
## The Sacred Pause — Avatar Altars, Breath Mechanics & Ritual Language
*Version 1.0 — Your adventure. But Majestic.*

---

## 01 — ORIGIN & PHILOSOPHY

This spec originates from a real-world practice. Before a physical tarot reading, the practitioner sets the scene: the client is offered something to eat or drink, encouraged to sit comfortably, the space is blessed — a candle lit, ritual beads used to anoint the space, three deep breaths taken together. The card reading begins only after this.

The app cannot replicate this. It should not try.

What it can do is find the *digital equivalent* of the same intention: create a minimum viable sacred pause — a brief, unavoidable moment of arrival that shifts the user from scrolling mode into presence mode. The mechanics are different. The effect is the same.

**The two physical elements worth translating:**

- **The beads** — tactile, interactive, grounding. Maps directly to a hold gesture. The user's thumb on glass, holding, particles gathering. This is already the language of the card reveal. It is now also the language of the ritual.
- **The candle** — ambient, already-lit, avatar-specific. Not something the user does. Something that exists when they arrive. The altar is always ready. The user steps into it.

**What does not translate:**
- Food and drink — physical hospitality, no digital equivalent. Let it go.
- The full blessing sequence — takes time the app cannot command. Distilled to breath only.
- Three deep breaths — three is a lot for a daily mobile interaction. One breath cycle, done well, is enough.

**The governing principle:**
> The ritual should be short enough that skipping it feels unnecessary. Not guilt-free — unnecessary. If it is beautiful and 6 seconds, most users will not skip it. If it is 15 seconds, they will bypass it every time.

---

## 02 — THE ALTAR SYSTEM

### What is an altar in Majestic?

Each avatar has a persistent altar — a small, atmospheric visual environment that appears on the reading screen and daily draw surface. It is ambient: it exists before the user arrives and after they leave. It is not a feature to be unlocked. It is not explained. It is simply there.

The altar is the avatar's *space* in Threshold City. It communicates the element, the character's world, and the mood of the reading without any copy. It is the visual equivalent of walking into a room that already has a candle lit.

**The altar is not:**
- A decorative splash screen
- A gamified element the user builds over time (v1)
- A settings choice
- Something the user "activates"

**The altar is:**
- Always present on the reading screen below the card
- Subtle — it never competes with the card art
- Responsive — it reacts to the user's arrival gesture (hold) in a way that feels like the space noticing them
- Avatar-specific — four distinct altars, one world

---

### 02.1 — CASPER / FIRE ALTAR

**Visual atmosphere:**
A low ember. Not a roaring fire — a single candle flame or coal in a dark surface. Copper and iron materials. A small signal-line circuit trace around the perimeter of the altar zone, like wiring carrying heat. Faint amber particles drift upward at rest — sparse, not dramatic.

**Altar object:** A single flame source. Could be a candle in a rough iron holder, or a small brazier. The flame breathes at rest — the same slow pulse as the breath mechanic. Casper's flame is always lit when the user arrives.

**Altar colour temperature:** Deep amber-black. `#C94B2C` ember, `#D4A843` gold, darkness beneath.

**Response to arrival gesture (hold):**
Ember sparks rise — three to five particles, upward, 600ms. The flame brightens slightly. The circuit trace pulses once. Then settles.

**Altar copy (none):** The altar does not speak. Casper speaks. The altar holds.

---

### 02.2 — ELI / AIR ALTAR

**Visual atmosphere:**
A clear surface — glass, or still water — with faint signal lines moving across it like wind on a surface. Pale silver and cool blue. The altar feels like looking through a window at a moving sky. A single thin instrument — something like a tuning fork or signal antenna — stands at centre, barely visible.

**Altar object:** The antenna or tuning fork. A vertical line with a small resonance halo around it at rest. It does not move. The signal lines move around it.

**Altar colour temperature:** Silver-blue-grey. `#A8B4C8` pale silver, `#6ECFCF` signal cyan.

**Response to arrival gesture (hold):**
Signal lines converge toward the antenna. A single resonance ring expands outward from its base — one ring, fading. Eli's altar is the one that most resembles a breath: it inhales (converge) and exhales (expand).

---

### 02.3 — OLIVIA / EARTH ALTAR

**Visual atmosphere:**
Stone and root. A low flat surface — a smooth stone platform — with botanical growth at the edges. Moss at the corners. A root line visible beneath. The altar is the most physically grounded of the four — it feels like a surface in the physical world, placed in Threshold City.

**Altar object:** A small stone vessel or bowl. Could hold nothing visible, or a single botanical element — a seed, a pressed leaf. The vessel is worn, old, clearly used.

**Altar colour temperature:** Moss and amber. `#5C6B3A` earth, `#C49A4A` clay gold, stone grey.

**Response to arrival gesture (hold):**
A single botanical particle — a spore or small seed — rises from the vessel and drifts slowly downward, settling. Root lines at the edge of the altar extend slightly — 2–3px, barely perceptible. Then stillness.

---

### 02.4 — DESTINY / WATER ALTAR

**Visual atmosphere:**
Still water surface. Dark, reflective, with a single point of light — like a candle reflected in a canal at night. The water is never agitated at rest. It breathes with micro-ripple at the edges — the smallest possible motion that reads as alive.

**Altar object:** The light on the water. Not an object placed on a surface — the altar *is* the water. The reflection is the point of focus. A small floating element (a flower, a folded paper vessel) sits at the centre, barely visible.

**Altar colour temperature:** Deep blue-black. `#2A7B8C` teal depth, `#4DBFCC` moon-on-water cyan.

**Response to arrival gesture (hold):**
One ripple ring expands from the centre — slow, wide, one ring only. The floating element rocks gently once. Then the water returns to stillness. Destiny's altar has the longest settle time — the water takes a moment.

---

## 03 — THE BREATH MECHANIC

### Core principle

One breath cycle. Not three. One.

The breath visual already exists in the daily draw ritual spec (Task #122) — this spec extends it and connects it to the altar system, and then defines how it appears in onboarding.

**The breath is not a breathing exercise.** It is a transition gesture. The user is not being told to breathe. The visual simply breathes, and the user — consciously or not — tends to follow.

### Visual behaviour

The breath pulse lives on the avatar's emblem, not on a standalone element.

| Phase | Behaviour | Duration |
|-------|-----------|----------|
| Inhale | Emblem expands 4–6% from rest | 4 seconds |
| Hold | Brief pause at expansion peak | 0.5 seconds |
| Exhale | Returns to rest size | 4 seconds |
| Altar response | Element-specific particle on exhale | 600ms (overlapping exhale) |

One cycle. Then it stops. It does not loop. The looping would make it feel like a screensaver, not a ritual.

**On exhale, the altar responds:**

| Avatar | Exhale particle |
|--------|----------------|
| Casper | Three ember sparks rise, 600ms, fade at 300px height |
| Eli | Single signal line traces outward from emblem, fades at screen edge |
| Olivia | One botanical spore drifts downward, settles on altar surface |
| Destiny | One water ripple ring expands from altar centre, fades |

After the exhale particle settles — the card appears. Or in onboarding, the instruction appears. The breath is the gate.

### User agency

The breath is not interactive. The user watches it. They cannot speed it up, tap through it, or skip it explicitly. What they can do is simply proceed — the gesture to continue (hold on the card) is always available. The breath just… happens first. If they ignore it and go straight to hold, that is fine. The ritual was offered.

**Skippability principle:** There is no skip button. There is no "continue" button during the breath. There is just the breath, and then the card becomes available. The gap is short enough that waiting feels natural, not imposed. Target total breath duration: 9 seconds.

---

## 04 — ONBOARDING INTEGRATION

### The problem

Onboarding is 12 screens. Introducing a 9-second breathing ritual somewhere in the middle risks making an already long onboarding feel even longer. But not introducing the ritual means the user's first draw (Screen 12) happens with no context for what the hold gesture means or why it is ceremonial.

### The solution: teach the language, not the ritual

Onboarding does not run the full ritual. It teaches two things:

**1. The hold gesture** — introduced at Screen 12 (First Draw). The card is present. The instruction is implicit. The avatar says one line. The user holds. The ritual language is demonstrated, not explained.

**2. A compressed breath beat** — a single exhale moment, not a full cycle. At the transition from Screen 11 (Companion Confirmed) to Screen 12 (First Draw), the avatar's altar appears for the first time. One breath — just the exhale particle, no inhale expansion — happens as the altar comes into focus. 3 seconds. Then the card is present and ready.

This is the digital equivalent of Luke lighting the candle. The user doesn't participate in lighting it. They arrive and it is already lit. The ritual has already begun.

### Where it appears in onboarding

**Screen 11 — Companion Confirmed**
The avatar appears fully for the first time. Their element is at full presence. The altar appears beneath them — new, not previously visible. The exhale particle fires once as the altar settles into view. This is the first time the user sees the altar system. It is not explained. It simply exists.

Avatar first words fire here (existing copy — "Right. Let's go." / "I'm glad you're here." etc.)

**Screen 11 → 12 transition**
The altar persists across the transition. The card arrives into the altar environment. The altar was already there. The card has come to it.

**Screen 12 — First Draw**
The avatar line: *"Your first card is ready, [Name]. Take your time. There is no wrong moment."*

Then — the breath beat. One inhale-hold-exhale. 9 seconds. The emblem pulses. The altar responds on exhale. Then the card is available to hold.

The user holds. The card reveals.

**What this teaches without explaining:**
- The altar exists and belongs to their avatar
- The breath happens before the card
- The hold is the gesture
- This is not a game. This is a practice.

They will recognise all of this on their second open without any instruction.

### What onboarding does NOT do

- Does not explain the altar ("This is Casper's space")
- Does not name the breath ("Take a deep breath before we begin")
- Does not gamify or frame the ritual as a feature
- Does not run the full arrival sequence — that belongs to daily use only

---

## 05 — READING SCREEN ALTAR INTEGRATION

### Placement

The altar occupies the lower portion of the reading screen — below the card, above the avatar companion line. It is not a full-width band. It is an environmental zone: the card appears to float above it, the altar is the ground beneath.

**Approximate altar zone height:** 80–100px on a 390px width screen. Enough to establish atmosphere. Not so tall it crowds the card or the companion text.

### Visual layering (bottom of screen, top to bottom)

1. Background: `#1A1A2E` with atmospheric grain
2. Altar zone: element-specific atmosphere (flame / signal lines / botanical / water surface)
3. Altar object: element-specific object (ember source / antenna / stone vessel / water surface with float)
4. Card: floats above altar zone, its bottom edge touching or just above the altar
5. Avatar emblem: peripheral, present at 40% opacity in neutral state
6. Avatar companion line: below card, above altar zone — text floats in the space between

### At rest

The altar breathes. The ambient particles are always present at minimum: 1–2 particles in motion at any time. Never still. Never distracting. The living signal layer.

### During arrival sequence (before draw)

Altar is at full ambient presence. Avatar emblem visible at 40% opacity. Breath cycle fires. Altar responds on exhale. Card becomes available.

### During reading (post-reveal)

Altar dims slightly — 60% opacity — to let the card and companion text lead. It is present but knows its place. The world doesn't disappear during a reading. It just steps back.

### After reading (journal prompt, intention field)

Altar returns to full presence as the card recedes. The space is available again.

---

## 06 — OPEN QUESTIONS & DECISIONS NEEDED

**For Oso to decide:**

1. **Altar persistence across sessions** — does the altar always look identical, or does it have subtle variation day-to-day (e.g. the candle slightly higher or lower, different botanical element in Olivia's vessel)? Variation makes it feel alive but increases build complexity. Recommend: v1 static, variation in v2.

2. **Sound design** — Luke's ritual has texture: the strike of a match, the clink of beads. The app spec currently has no audio layer. A single ambient sound on altar appearance (ember crackle, water drop, the smallest possible sound) could be significant. This is a flag for Luke. Even optional/off-by-default audio tied to the altar moment would be powerful. Needs a sound design decision before this surface is built.

3. **Nana's beads as a named object** — there is a case for giving the bead gesture a world-name inside Majestic. The hold gesture on the card could be referred to internally (in copy, in the codex) as something specific — not "nana's beads" obviously, but a Threshold City equivalent. Something the world calls this act. This is optional but would deepen the lore layer for the tabletop audience. Worth a conversation.

4. **The altar at onboarding pre-avatar-selection** — Screens 01–10 have no avatar yet. The altar cannot appear. The world atmosphere (rain on glass, rooftop mist) does the grounding work instead. This is already handled in the onboarding spec. Confirm this is the right call: no altar until companion is chosen.

5. **3-card spread altar behaviour** — the current spec covers daily draw and 1-card. For 3-card spreads, does the altar change? Three cards above one altar feels architecturally different. This is a future-state question — flag for when 3-card spread is specced in detail.

**For Luke to confirm:**
- Sound design appetite (yes / no / not yet)
- Whether "nana's beads" has a world-name he wants to carry into the product
- Whether the compressed onboarding breath beat (exhale only, no inhale) feels like enough to teach the ritual language, or whether he wants the full cycle even in onboarding

---

## 07 — WHAT THIS UNLOCKS DOWNSTREAM

Once this spec is locked, the following are unblocked or informed:

- **Daily draw component spec (#121)** — the altar zone needs to be defined before the full animated component spec can be written
- **Reading screen 1-card spec (#123)** — altar placement and layering affects the layout of this surface
- **Avatar motion rules** — the altar response particles extend the avatar motion vocabulary
- **Sound design** (if approved) — altar ambient audio is a new work stream
- **Codex world lore** — the altar is part of each avatar's Threshold City world. Lore fragments about the altar space could be unlockable content (future state)
- **MJ prompt library** — altar visual elements (the ember source, the stone vessel, the antenna, the water surface) could become reference images for card art and avatar art consistency

---

*Majestic — Altar & Ritual Spec — v1.0*
*Your adventure. But Majestic.*
