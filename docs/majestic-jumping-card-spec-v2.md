# MAJESTIC — QUARTER DECK FAN SELECTION & JUMPING CARD SPEC
## Talisman-Initiated Card Fan · User Selection · Jumping Card Phenomenon
*Version 2.0 — Your adventure. But Majestic.*

---

## SCOPE — READ FIRST

**Fan selection and jumping card apply to INITIATED READINGS ONLY.**

| Context | Fan selection | Jumping card |
|---------|--------------|--------------|
| Onboarding first draw | ❌ No — direct talisman → reveal | ❌ Never |
| Daily draw | ❌ No — direct talisman → reveal | ❌ Never |
| Initiated 1-card reading | ✅ Yes | ✅ When triggered |
| Initiated 3-card reading | ✅ Yes (×3) | ✅ One position only |

The daily draw and onboarding first draw are a different relationship with the cards. Today's card is already waiting. The fan is not offered — the talisman reveals directly. This distinction is intentional and permanent. Do not change it.

---

## HOW THIS FITS INTO EXISTING SPECS

This document is an addendum to:
- `majestic-altar-ritual-spec-v2.md` — talisman hold gesture (Section 03)
- `majestic-reading-screen-animation-aura-spec.md` — reveal sequence (Part 02)

**What this adds:** A fan selection state inserted between talisman hold threshold met and the reveal sequence — for initiated readings only. The reveal sequence (02.4) remains locked and unchanged.

**What this does not affect:** Daily draw. Onboarding. The reveal sequence itself.

---

## PART 01 — DESIGN PHILOSOPHY

The fan is a magician's gesture. Cards held upright, base together, fanning outward toward the user — a bouquet of possibility. The user is not choosing from a menu. They are reaching into something alive.

Three governing rules:

1. **The fan is offered, not presented.** It rises from the talisman interaction — earned through the hold gesture, not simply shown.
2. **Selection is physical.** The tap must feel like touching something real. Haptics are not optional — they are the sensation of contact.
3. **The jumping card cannot be refused.** When it fires, the reading has already begun. The user witnesses it; they did not choose it.

---

## PART 02 — FAN GEOMETRY & LAYOUT

### 02.1 — Card count and spacing

**13 cards.** Quarter deck. Full magician's fan drama on a single screen.

```
Fan geometry — viewed from front:

         [7]
      [6]   [8]
    [5]       [9]
   [4]          [10]
   [3]            [11]
    [2]           [12]
      [1]       [13]
           [base]
           [talisman]
```

- Cards fan outward at **~7° intervals** — 13 cards × 7° = ~84° total arc
- Arc centred on vertical axis — symmetric left and right
- **Base point:** anchored 20px above the talisman position (lower reading surface zone)
- **Card height visible:** ~160px of each card visible above the base point
- **Card width at fan position:** ~28px visible per card at the narrowest overlap point
- **Forward perspective tilt:** 12° toward the viewer — cards lean forward as if being held out. Achieved via a subtle Y-scale transform on the full fan group.

### 02.2 — Tap targets

Visible card widths are below Apple's 44px minimum. Solved with **extended invisible tap zones:**

Each card's interactive tap zone extends the full column height and is **48px wide** — wider than the visible card strip, centred on it. Zones do not overlap. Adjacent zones butt against each other cleanly.

The user does not need precision. They reach for a card and it responds. This is the intended feel.

### 02.3 — Card back appearance in fan

Cards are face-down. Back design visible — master Majestic emblem at low opacity (40%), atmospheric grain, avatar accent colour wash at 15% on each card back. Cards are identical in appearance. The choice is intuitive, not visual.

### 02.4 — Fan idle timeout

If the fan rises and the user puts their phone down — the fan folds after **60 seconds of no interaction.** The talisman returns to rest state. The user holds again to re-initiate. No penalty. No error state. The world waits.

---

## PART 03 — INTERACTION SEQUENCE (INITIATED READINGS ONLY)

### 03.1 — Full sequence

```
1. ARRIVAL
   User arrives at reading screen via initiated reading flow
   Pixel Elder lamp sequence fires (3s)
   Breath beat (5s full)
   Talisman becomes interactive — light source shifts toward it

2. HOLD GESTURE
   User holds talisman (600ms threshold)
   Avatar element responds — particles gather
   Talisman pulses at threshold met
   [Haptic: light impact — "something is happening"]

3. FAN RISE
   13 cards rise from talisman base point as a unified group
   Rise duration: 500ms, ease-out
   Fan arc unfolds simultaneously with rise — cards spread to
   their final arc positions as they ascend, not after
   Forward tilt resolves at 12° as fan completes
   [Haptic: soft thud — "the fan has landed"]
   Element particles increase to 60% — the space is charged

4. FAN ALIVE STATE
   Cards drift very gently — collective slow breathing motion
   ±4px vertical, 6-second period, ease-in-out sine curve
   All 13 cards share the same drift rhythm — they move together
   Avatar accent light source shifts subtly behind the fan
   Talisman dims to 40% — it has done its work, still present
   No timer. No auto-proceed. The user takes their time.

5. USER SELECTION
   User taps a card
   [Haptic: medium impact — "contact"]
   Selected card: separates from fan, rises 20px, slight forward
   translation toward user (scale 1.0 → 1.06 over 200ms)
   Remaining 12 cards: fold back down into reading surface
   over 400ms, ease-in — they return to where they came from
   Selected card: held in elevated position for 300ms
   Then: reveal sequence fires per
   majestic-reading-screen-animation-aura-spec.md 02.4

6. REVEAL
   Per locked spec — unchanged.
   [Haptic: medium-heavy impact at card flip apex]
```

### 03.2 — Haptic map summary

| Moment | Haptic type | Intensity |
|--------|------------|-----------|
| Talisman hold threshold met | Light impact | Subtle — something beginning |
| Fan lands in position | Soft thud (notification) | Arrival — the fan is here |
| Card tap / selection | Medium impact | Contact — physical touch |
| Card flip apex | Medium-heavy impact | Reveal — the moment |

Implementation: `expo-haptics`. `Haptics.impactAsync(ImpactFeedbackStyle.Light/Medium/Heavy)` and `Haptics.notificationAsync(NotificationFeedbackType.Success)` for the fan landing.

---

## PART 04 — JUMPING CARD PHENOMENON

### 04.1 — What it is

A jumping card is a tarot phenomenon where a card asserts itself without being chosen — it physically jumps from the deck during shuffling, demanding attention. In Majestic, this is faithfully replicated: when a jumping card fires, **the fan never fully opens.** One card surges forward before the user can interact. The reading has begun. The user witnesses it; they did not choose it.

This is not a feature the user activates. It is something that happens to them.

**Jumping cards only occur in initiated readings.** They never occur in the daily draw. They never occur in onboarding.

### 04.2 — Trigger logic

The jumping card fires based on a composite score derived from user behaviour signals. It is never random.

**Signals that increase jumping card probability:**

| Signal | Weight | Notes |
|--------|--------|-------|
| Active streak (days in a row) | High | 7+ days consecutive use |
| Session depth (time in app per session) | Medium | User who lingers, not just opens and closes |
| Reading frequency | Medium | Multiple readings per week, not just daily draw |
| Birth card recurrence | High | Personality or soul card has appeared in recent readings |
| Long absence broken | High | User returns after 7+ days away — first reading back |
| Milestone session | Very high | First initiated reading, 30-day anniversary, 100th reading |

**Base probability:** 0% — jumping cards never fire by chance alone.

**Scoring:** Signals accumulate into a composite score. When the score crosses a threshold, the next initiated reading triggers a jumping card. The threshold resets after it fires.

**Cooldown:** Maximum one jumping card per 7-day period regardless of score. It must feel rare.

**The user never sees the score. They experience the phenomenon.**

### 04.3 — Jumping card sequence

```
1. HOLD GESTURE completes normally (600ms)
   [Haptic: light impact — same as normal]

2. FAN BEGINS TO RISE
   Fan rise initiates — 500ms ease-out
   Fan reaches approximately 60% of its full rise height...

3. CARD SURGES — fan interruption
   One card (determined server-side before fan opens)
   breaks from the group mid-rise
   Surges upward — 40px above its fan position
   over 200ms, ease-out — fast, decisive, not violent
   Avatar accent glow fires on its edges — 80% intensity
   Skia radial bloom behind it — avatar accent at 40% opacity
   Remaining 12 cards: freeze in partial rise position
   then slowly fold back down (600ms, ease-in)
   [Haptic: medium-heavy impact — unexpected, arresting]

4. PIXEL ELDER RESPONSE
   Pixel Elder glances upward toward the surging card
   animation state: look_up (existing — specced in addendum)
   Holds for 1.5s then steps back
   This is the only moment the Pixel Elder acknowledges a card
   directly. It is significant.

5. COMPANION ACKNOWLEDGEMENT LINE
   Avatar companion line fires — one line only, before reveal
   Avatar-specific jumping card line (see 04.5 below)
   Appears over 300ms, holds for 1.5s

6. CARD HELD — elevated
   Jumping card holds in its elevated position
   Breathing pulse begins — same as post-reveal breathing pulse
   Glow holds at 60% intensity — present but not blaring
   1,000ms hold total before reveal fires automatically

7. REVEAL SEQUENCE
   Per locked spec 02.4 — unchanged.
   [Haptic: medium-heavy at apex — same as normal reveal]

8. POST-REVEAL — special companion line
   After companion interpretation line: one additional line
   acknowledging the jump (see 04.6 below)
   Appears 800ms after standard companion line settles
   Does not replace standard interpretation — adds to it
```

### 04.4 — Which card jumps

Determined server-side when the initiated reading begins (not when the fan opens):

- **Birth card recurrence signal active:** The personality or soul card jumps
- **Milestone session:** Card most resonant with the milestone (The World for 100th reading, The Fool for first initiated reading)
- **Otherwise:** Card from recent draw history — a card that has appeared before, asserting continued relevance

The card that jumps is always meaningful in context. Never arbitrary.

### 04.5 — Avatar jumping card acknowledgement lines (before reveal)

*One line per avatar. Fires as the card holds elevated — before the flip.*

**Casper (Fire)**
> Something wanted to be seen today. Let it speak.

**Eli (Air)**
> The signal chose this. Not you. Not me. Pay attention.

**Olivia (Earth)**
> It came forward on its own. That means something. Trust it.

**Destiny (Water)**
> I felt that. This card has been waiting. Don't look away.

### 04.6 — Avatar jumping card post-reveal lines

*Appended after standard interpretation. One line per avatar.*

**Casper (Fire)**
> It jumped because it had to. Fire doesn't wait for permission.

**Eli (Air)**
> A card that chooses itself carries different weight. Hold this one carefully.

**Olivia (Earth)**
> When the earth moves, you don't ask why. You adjust. Start here.

**Destiny (Water)**
> Some things surface before you're ready. This is one of them.

### 04.7 — Journal persistence

When a jumping card reading is saved to journal:

- Entry tagged with a **jump marker** — subtle signal node icon (`marker-signal-node.svg` from the glyph system) at 60% opacity next to card name
- Jump marker persists indefinitely — it never fades
- In journal list view, jumping card entries are visually distinct at a glance
- No label or explanation. Users who understand tarot will recognise it.

---

## PART 05 — DAILY DRAW — NO FAN, NO JUMPER

The fan selection does **not** apply to the daily draw.

The daily draw is ambient, low-friction. Today's card is already waiting. The talisman hold reveals it directly per the existing locked spec. No fan. No selection. No jumping card.

The jumping card phenomenon **also does not apply** to the daily draw. Jumpers are earned through initiated readings — intentional sessions where the user has chosen to go deeper. The daily draw is a different relationship with the cards. This will never change.

---

## PART 06 — ONBOARDING — NO FAN, NO JUMPER

The fan selection does **not** appear in onboarding.

The first draw (Screen 12) is the onboarding draw — it follows the daily draw model: direct talisman hold → reveal. The Pixel Elder lamp sequence fires. The breath beat fires. The card reveals. No fan rises. This is intentional — the fan is introduced in the user's first initiated reading, after onboarding is complete.

Rationale: onboarding teaches the language of the talisman and the hold gesture. Adding fan selection on first contact would introduce a mechanic before the user understands the baseline. The fan is earned, not introduced.

---

## PART 07 — 3-CARD SPREAD ADAPTATION

For 3-card initiated readings, the fan fires **three times** — once per card position.

```
PAST position:
  Fan rises (13 cards) → user selects → card separates → fan folds
  Selected card moves to PAST position (left, 70% scale), held face-down

PRESENT position:
  New fan rises (12 cards — selected card excluded, tighter spacing)
  User selects → card separates → fan folds
  Selected card moves to PRESENT position (centre, 80% scale), held face-down

FUTURE position:
  New fan rises (11 cards)
  User selects → card separates → fan folds
  Selected card moves to FUTURE position (right, 70% scale), held face-down

All three cards held face-down in spread positions.
Then: sequential reveal fires per majestic-reading-screen-animation-aura-spec.md 02.5
```

**Jumping card in 3-card spread:** Can only fire on one of the three draws — the most significant position given the trigger signals.
- Birth card recurrence active → fires on PRESENT position
- Milestone session → fires on PAST position
- All other triggers → fires on FUTURE position

---

## PART 08 — SOUND DESIGN FLAG

Fan rise, card tap/selection, and jumping card surge are natural sound trigger points. These must be factored into the sound design spec (#158) when that work begins. Specifically:

- Fan rise landing (soft, ceremonial — the arrival of the fan)
- Card tap (contact — physical, brief)
- Jumping card surge (unexpected — the most dramatic sound event in the reading)

Sound design is not in scope for the initial fan/jumping card build. Add audio layer when #158 is complete.

---

## PART 09 — ACCESSIBILITY

For users with **reduced motion enabled:**

- Fan rise: near-instant (100ms) with no drift animation
- Card drift in fan alive state: disabled — cards hold static
- Jumping card surge: no movement — card appears with glow only, no position change
- Card flip: preserved — this is the primary reveal moment, not decorative

Core functionality intact for all users.

---

## PART 10 — TRACKER CROSS-REFERENCE

| Task | Status | Notes |
|------|--------|-------|
| #165 | todo | Fan selection — Skia geometry and animation. POST-SHOWCASE. |
| #166 | todo | Jumping card trigger algorithm. Supabase fields: last_jump_date, jump_score, session_depth_seconds. POST-SHOWCASE. |
| #167 | todo | Jumping card journal marker. POST-SHOWCASE. |
| #168 | todo | Fan selection — 3-card spread adaptation. POST-SHOWCASE. |
| #107 | todo | Card flip/reveal — fan inserts before reveal for initiated readings. Reveal sequence unchanged. |
| #61 | todo | Pixel Elder sprite — look_up animation state covers jumping card use case. |
| #158 | todo | Sound design — fan and jumping card are sound trigger points. Factor in when spec is written. |

---

*Majestic — Quarter Deck Fan Selection & Jumping Card Spec — v2.0*
*Supersedes v1.0*
*Your adventure. But Majestic.*
