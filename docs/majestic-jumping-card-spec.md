# MAJESTIC — QUARTER DECK FAN SELECTION & JUMPING CARD SPEC
## Talisman-Initiated Card Fan · User Selection · Jumping Card Phenomenon
*Version 1.0 — Your adventure. But Majestic.*

---

## HOW THIS FITS INTO EXISTING SPECS

This document is an addendum to:
- `majestic-altar-ritual-spec-v2.md` — talisman hold gesture (Section 03)
- `majestic-reading-screen-animation-aura-spec.md` — reveal sequence (Part 02)

**What this replaces:** The existing talisman hold → single card auto-reveal flow. The fan selection state is inserted between hold threshold met and the reveal sequence. The reveal sequence itself (02.4) remains locked and unchanged.

**What this does not affect:** Daily draw. The daily draw retains its current auto-reveal flow — today's card is always already chosen. The fan selection applies to **initiated readings only** (1-card and 3-card spreads).

---

## PART 01 — DESIGN PHILOSOPHY

The fan is a magician's gesture. Cards held upright, base together, fanning outward toward the user — a bouquet of possibility. The user is not choosing from a menu. They are reaching into something alive.

Three governing rules:

1. **The fan is offered, not presented.** It rises from the talisman interaction — earned through the hold gesture, not simply shown.
2. **Selection is physical.** The tap must feel like touching something real. Haptics are not optional — they are the sensation of contact.
3. **The jumping card cannot be refused.** When it fires, the reading has already begun. The user witnesses it; they do not choose it.

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
- **Card height visible:** ~160px of each card visible above the base point — enough to feel like a full card, not just a sliver
- **Card width at fan position:** ~28px visible per card at the narrowest overlap point
- **Forward perspective tilt:** 12° toward the viewer — cards lean forward as if being held out. Achieved via a subtle Y-scale transform on the full fan group.

### 02.2 — Tap targets

Visible card widths are below Apple's 44px minimum. Solved with **extended invisible tap zones:**

Each card's interactive tap zone extends the full column height and is **48px wide** — wider than the visible card strip, centred on it. Zones do not overlap. Adjacent zones butt against each other cleanly.

The user does not need precision. They reach for a card and it responds. This is the intended feel.

### 02.3 — Card back appearance in fan

Cards are face-down. Back design visible — master Majestic emblem at low opacity (40%), atmospheric grain, avatar accent colour wash at 15% on each card back. Cards are identical in appearance. The choice is intuitive, not visual.

---

## PART 03 — INTERACTION SEQUENCE

### 03.1 — Full sequence with fan state inserted

```
1. ARRIVAL
   User arrives at reading screen (initiated reading)
   Pixel Elder lamp sequence fires (3s)
   Breath beat (5s full)
   Talisman becomes interactive — light source shifts toward it

2. HOLD GESTURE
   User holds talisman (600ms threshold)
   Avatar element responds — particles gather
   Talisman pulses at 600ms threshold met
   [Haptic: light impact — "something is happening"]

3. FAN RISE (new state — this document)
   13 cards rise from base point as a unified group
   Rise duration: 500ms, ease-out
   Fan arc unfolds simultaneously with rise — cards spread to
   their final positions as they ascend, not after
   Forward tilt resolves at 12° as fan completes
   [Haptic: soft thud — "the fan has landed"]
   Element particles increase to 60% — the space is charged

4. FAN ALIVE STATE
   Cards drift very gently — collective slow breathing motion
   ±4px vertical, 6-second period, ease-in-out sine curve
   All 13 cards share the same drift rhythm — they move together
   Avatar accent light source shifts subtly behind the fan
   Talisman dims to 40% — it has done its work, but is still present
   No timer. No auto-proceed. The user takes their time.

5. USER SELECTION
   User taps a card
   [Haptic: medium impact — "contact"]
   Selected card: separates from fan, rises 20px, slight forward
   translation toward user (scale 1.0 → 1.06 over 200ms)
   Remaining 12 cards: fold back down into reading surface
   over 400ms, ease-in — they return to where they came from
   Selected card: held in elevated position for 300ms
   Then: reveal sequence fires per majestic-reading-screen-animation-aura-spec.md 02.4

6. REVEAL
   Per locked spec — unchanged.
   [Haptic: medium-heavy impact at card flip apex]
```

### 03.2 — Haptic map summary

| Moment | Haptic type | Intensity |
|---|---|---|
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

### 04.2 — Trigger logic

The jumping card fires based on a composite score derived from user behaviour signals. It is never random.

**Signals that increase jumping card probability:**

| Signal | Weight | Notes |
|---|---|---|
| Active streak (days in a row) | High | 7+ days consecutive use — meaningful commitment |
| Session depth (time in app per session) | Medium | User who lingers, not just opens and closes |
| Reading frequency | Medium | Multiple readings per week, not just daily draw |
| Birth card recurrence | High | The user's personality or soul card has appeared in recent readings |
| Long absence broken | High | User returns after 7+ days away — the first reading back |
| Milestone session | Very high | First reading ever, 30-day anniversary, 100th reading |

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
   One card (already determined server-side before fan opens)
   breaks from the group mid-rise
   It surges upward — 40px above its fan position
   over 200ms, ease-out — fast, decisive, not violent
   Avatar accent glow fires on its edges — 80% intensity
   Skia radial bloom behind it — avatar accent at 40% opacity
   Remaining 12 cards: freeze in their partial rise position
   then slowly fold back down (600ms, ease-in)
   [Haptic: medium-heavy impact — unexpected, arresting]

4. PIXEL ELDER RESPONSE
   Pixel Elder glances upward toward the surging card
   animation state: look_up (existing state — already specced)
   Holds for 1.5s then steps back
   This is the only moment the Pixel Elder acknowledges a card
   directly. It is significant.

5. COMPANION ACKNOWLEDGEMENT LINE
   Avatar companion line fires — one line only, before reveal:
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

Determined server-side when the initiated reading begins (not when the fan opens). Logic:

- **If birth card recurrence signal is active:** The personality or soul card jumps
- **If milestone session:** The card most resonant with the milestone (e.g. The World for 100th reading, The Fool for first)
- **Otherwise:** Card selected from recent draw history — a card that has appeared before, asserting continued relevance

The card that jumps is always meaningful in context. Never arbitrary.

### 04.5 — Avatar jumping card acknowledgement lines (before reveal)

*One line per avatar. Fires as the card holds in elevated position — before the flip.*

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

- Entry is tagged with a **jump marker** — a subtle signal node icon (the `marker-signal-node.svg` from the glyph system) at 60% opacity next to the card name
- The jump marker persists indefinitely — it never fades
- In journal list view, jumping card entries are visually distinct — the signal node marker identifies them at a glance
- No special label or explanation. Users who understand tarot will recognise it. Users who don't will ask.

---

## PART 05 — DAILY DRAW EXCEPTION

The fan selection does **not** apply to the daily draw.

The daily draw is ambient, low-friction. Today's card is already waiting. The talisman hold reveals it directly — per the existing locked spec. No fan. No selection.

The jumping card phenomenon **also does not apply** to the daily draw. Jumpers are earned through initiated readings — intentional sessions where the user has chosen to go deeper. The daily draw is a different relationship with the cards.

---

## PART 06 — 3-CARD SPREAD ADAPTATION

For 3-card initiated readings, the fan fires **three times** — once per card position.

```
PAST position:
  Fan rises → user selects → card separates → fan folds
  Selected card moves to PAST position (left, 70% scale)
  held face-down

PRESENT position:
  New fan rises (same 13 cards minus the selected one — 
  12 cards now, same geometry, slightly tighter spacing)
  User selects → card separates → fan folds
  Selected card moves to PRESENT position (centre, 80% scale)

FUTURE position:
  New fan rises (11 cards)
  User selects → card separates → fan folds
  Selected card moves to FUTURE position (right, 70% scale)

All three cards held face-down in spread positions.
Then: sequential reveal fires per locked spec 02.5
```

**Jumping card in 3-card spread:** Can only fire on one of the three draws — the most significant position given the trigger signals. If birth card recurrence is active, it fires on the PRESENT position. Milestone sessions fire on the PAST position. All other triggers fire on the FUTURE position.

---

## PART 07 — TRACKER UPDATES REQUIRED

| Task | Update |
|---|---|
| #107 | Card flip and reveal animation — note: fan selection state now precedes reveal. Fan spec in majestic-fan-selection-spec.md. Reveal sequence unchanged. |
| #154 | Altar & ritual spec — note: fan selection state inserted between talisman hold and reveal for initiated readings. Daily draw unchanged. |
| #129 | Notification language — jumping card journal marker introduced. No copy change needed. |
| New task | Jumping card trigger algorithm — server-side scoring logic. Supabase fields needed: last_jump_date, jump_score, session_depth_seconds, streak_count (may already exist). |
| New task | Jumping card copy — 8 lines locked above (4 pre-reveal, 4 post-reveal). Needs adding to avatar copy library. |
| #61 | Pixel Elder — confirm look_up animation state covers jumping card use case. If not, specify variant. |

---

## PART 08 — OPEN QUESTIONS

1. **Fan re-draw:** If the user holds the talisman and the fan rises, then puts the phone down and returns 10 minutes later — does the fan persist or fold? Recommendation: fold after 60 seconds of no interaction, talisman returns to rest state, user holds again to re-initiate.

2. **Accessibility:** For users with reduced motion enabled — the fan rise should be near-instant (100ms) with no drift animation. Card tap still gets haptic. Jumping card surge is reduced to a simple glow appear with no motion. Core functionality intact.

3. **Sound design (#158):** The fan rise, card tap, and jumping card surge are natural sound trigger points. Flag for #158 when that spec is written.

---

*Majestic — Quarter Deck Fan Selection & Jumping Card Spec — v1.0*
*Your adventure. But Majestic.*
