# MAJESTIC — READING SCREEN, CARD ANIMATION & AURA AMBIENT SPEC
## Reading Screen Layout · Card Animation Choreography · Aura Glow Rules
*Version 1.0 — Your adventure. But Majestic.*

---

## HOW TO READ THIS DOCUMENT

Three locked specs in one file. They are interdependent — card animation depends on reading screen layout; aura rules depend on card state. Read in order.

**Companion documents:**
- `majestic-altar-ritual-spec-v2.md` — altar layer order, talisman interaction, breath mechanic
- `majestic-pixel-elder-addendum.md` — lamp sequence (fires before breath beat)
- `majestic-dig-deeper-spec-v2.md` — post-reading Dig Deeper access model
- `majestic-states-and-switching.md` — avatar switching, empty states
- `majestic-design-system.md` — spacing tokens, component specs

**This document defines:**
- Reading screen layout and zone map (daily draw + initiated spreads)
- Card animation choreography: shuffle → hold → reveal → settle
- Aura ambient glow behaviour: per avatar, per state, per surface

---

## PART 01 — READING SCREEN LAYOUT

### 01.1 — Two reading contexts

| Context | Entry point | Initiator | Talisman | Pixel Elder | Breath beat | Dig Deeper |
|---------|------------|-----------|----------|-------------|-------------|------------|
| **Daily draw** | Home screen main action | Automatic — today's card is always waiting | ✅ Yes | ✅ Yes (lamp sequence) | ✅ Yes (5s full) | ❌ No |
| **Initiated reading** | Reading tab — spread selection | User selects 1-card or 3-card, then taps | ✅ Yes | ✅ Yes (lamp sequence) | ✅ Yes (5s full) | ✅ Yes (after reveal) |

The reading screen itself is the same component for both contexts. What differs: the card count, the Dig Deeper button presence, and the spread label.

---

### 01.2 — Zone map (390px screen width, standard phone)

```
┌─────────────────────────────────────┐
│  Safe area + nav bar          ~60px │  ← Screen top, spread label here
├─────────────────────────────────────┤
│                                     │
│  Card zone                  ~240px  │  ← Card(s) float here
│  (altar light source behind)        │
│                                     │
├─────────────────────────────────────┤
│  Reading surface + talisman  ~100px │  ← Altar surface, talisman in lower third
├─────────────────────────────────────┤
│  Companion line               ~48px │  ← Avatar text. Appears post-reveal.
├─────────────────────────────────────┤
│  Action zone                  ~60px │  ← Save / Dig Deeper / Close. Appears post-reveal.
├─────────────────────────────────────┤
│  Bottom nav bar               ~72px │
└─────────────────────────────────────┘
```

**Total: ~580px scrollable content in a ~812px tall screen. No scroll during ritual sequence — everything fits. Scroll only enters if Dig Deeper output is long.**

---

### 01.3 — Layer order (back to front)

Identical to Altar Ritual Spec v2.0, Section 05. Restated here for dev reference:

1. Background — `#1A1A2E`, atmospheric grain at 5–6% opacity
2. Element layer — avatar ambient particles (peripheral motion)
3. Light source — avatar-specific, rear of card zone
4. Reading surface — avatar-specific, base of card zone
5. Card(s) — float above reading surface, lit by light source
6. Talisman — foregrounded, lower reading surface zone
7. Companion line — below card, above action zone (text layer)
8. Avatar emblem micro — peripheral, 40% opacity at rest
9. Pixel Elder — overlay layer, above everything, bottom-right quadrant

---

### 01.4 — Pre-reveal state (before card is drawn)

**What the user sees on arrival:**
- Altar fully rendered — light source, reading surface, element layer at ambient minimum
- Talisman at rest (ambient pulse, same rhythm as breath cycle)
- No card visible — the card zone is the lit altar surface, empty
- No companion text — that space is blank
- No action zone — not yet
- Pixel Elder slides in (lamp sequence per addendum)
- After lamp sequence → breath beat (5 seconds)
- After breath → talisman becomes interactive. No instruction text. Light source shifts slightly toward talisman.

---

### 01.5 — Post-reveal state (after card is drawn)

**What changes:**
- Card is present, face-up, settled into reading surface zone
- Aura layer active at full intensity (see Part 03)
- Talisman dims to 60% — it has done its work
- Companion line appears (sequenced — see card animation Part 02)
- Action zone appears after companion line settles
- Pixel Elder remains at 60% opacity, bottom-right, watching

**Action zone contents:**

| Action | Type | Visibility |
|--------|------|------------|
| SAVE TO JOURNAL | Text button, Montserrat tracked uppercase, avatar accent | Always visible post-reveal |
| DIG DEEPER | Cinzel, subtle full-width button, avatar accent | Initiated readings only |
| CLOSE | Ghost text link, mist grey | Always visible post-reveal |

**Save flow:** Universal. Tapping SAVE TO JOURNAL opens the journal entry composer pre-populated with: card name, spread type, date, avatar companion line. User can add intention field and free-write before confirming. Full spec in `majestic-journal-spec.md`.

---

### 01.6 — 3-card spread specific layout

**Spread label:** Appears in nav bar zone, Montserrat tracked uppercase mist grey: `PAST · PRESENT · FUTURE`

**Card zone — 3 cards:**
Cards are arranged horizontally across the card zone. Three cards at reduced scale.

| Position | Label | Scale | Reveal order |
|----------|-------|-------|-------------|
| Left | PAST | ~70% of single-card size | First |
| Centre | PRESENT | ~80% of single-card size | Second |
| Right | FUTURE | ~70% of single-card size | Third |

**Sequential reveal:** Cards do not all appear at once. Each card reveals individually per the animation choreography in Part 02. After each reveal, a 1.2s hold before the next card begins its reveal sequence.

**Companion line — 3-card:** After all three cards are revealed, the companion line appears as a single synthesised read across all three positions. Not three separate lines. One line that holds the spread as a whole.

**Recognition override:** If a card in the spread matches the user's personality or soul card, the companion line opens with a recognition beat before the spread read. See `majestic-profile-spec.md` for recognition line format.

**Dig Deeper:** Available after all three cards revealed and companion line settles.

---

## PART 02 — CARD ANIMATION CHOREOGRAPHY

### 02.1 — Philosophy

The card animation is not a UI transition. It is the moment. Every timing decision serves the same goal: give the card room to land.

Three hard rules:
1. **No instant reveals.** The card is never just there. It arrives.
2. **The pause is the point.** Holds between phases are intentional — do not compress them.
3. **Reanimated does the motion. The altar does the atmosphere.** The card animation and the altar particle system run in parallel, not in sequence.

All animations: React Native Reanimated. No Lottie for card motion — Reanimated gives frame-level control over the hold states. Skia handles the aura glow bloom.

---

### 02.2 — Shuffle state (pre-hold)

**When:** From talisman becoming interactive until user initiates the hold gesture.

**What happens:**
- Card remains face-down in the card zone, resting on the reading surface
- A slow ambient pulse on the card back — the emblem on the card back breathes at talisman rhythm
- The talisman light source cue is active (subtle brightening toward talisman)
- Element layer continues at ambient minimum
- No animation on the card itself — it is waiting, not performing

**Card back spec:**
- Master Majestic emblem centred, `#9500FF` gradient wash
- Brand line in Cinzel at base: *Your adventure. But Majestic.* — Cinzel 8px, bone white, very low opacity (30%)
- Card back grain: atmospheric grain at 8% opacity

**Duration:** As long as the user needs. No timeout. No auto-proceed.

---

### 02.3 — Hold phase (user gesture active)

**Trigger:** User presses and holds the talisman (not the card).

**What happens on the talisman (per avatar — from Altar Ritual Spec v2.0):**
- Casper: ember node brightens, sparks rise (3–5 particles, 600ms, upward)
- Eli: signal lines converge toward fork, one resonance ring expands outward
- Olivia: spore rises from vessel (upward, intention), root lines extend 2–3px
- Destiny: ripple ring expands from sea glass contact point, glass shifts, refraction intensifies

**What happens on the card (simultaneous with talisman response):**
- Card lifts — translates upward 8–12px from reading surface over 400ms, ease-out
- Light gathers at card edges — a thin luminous border, avatar accent at 20% opacity, appears over 300ms
- Card back emblem brightens — from 30% to 80% opacity over 400ms
- Element particles increase from ambient minimum to 40% density — gathering energy

**Hold duration required:** 600ms minimum hold before reveal fires. Below 600ms: card settles back to reading surface, talisman returns to rest. No penalty, no message.

**After 600ms (hold threshold met):**
- Card back emblem pulses once, bright
- Element particles spike to maximum (800ms, then begin to settle)
- Reveal sequence initiates automatically — user does not need to release. The hold completes the gesture.

---

### 02.4 — Reveal sequence

**Total reveal duration: 1,400ms from hold threshold met to card settled.**

**Phase 1 — Rise (0–300ms)**
- Card continues upward translation: 8–12px additional lift, ease-in-out
- Card begins 3D rotation on Y-axis: 0° → 90° over 300ms, ease-in
- At 90° (the apex): card is edge-on. Nothing visible. **Hold at apex: 80ms.**
- Skia: at apex, a brief light bloom radiates from the card edge outward — avatar accent at 60% opacity, radius 40px, duration 80ms, then fades

**Phase 2 — Turn (380–680ms)**
- Card continues Y-axis rotation: 90° → 180° over 300ms, ease-out
- Card face resolves as rotation completes — the illustration is visible for the first time
- Aura glow begins to build (see Part 03) — starts at 0% at flip initiation, reaches 40% by flip completion

**Phase 3 — Settle (680–1,000ms)**
- Card translates downward: returns toward reading surface, settles 16px above it over 320ms, ease-out
- Card face now fully visible
- Aura continues building to 100% intensity over the settle phase
- Element particles return to ambient minimum over 600ms (overlapping the settle)

**Phase 4 — Breathing pulse begins (1,000ms+)**
- Card settles into a slow ambient breathing pulse — vertical translation ±3px, period 4 seconds, ease-in-out sine curve
- This continues for the duration of the reading session
- Breathing pulse is tied to the aura pulse rhythm (same period, same curve)

**Phase 5 — Companion line appears (1,200ms from settle)**
- After a 200ms hold post-settle: companion text fades in, 300ms, ease-out
- Text arrives top-to-bottom — not a slide, just an opacity build
- After companion text fully visible: 800ms hold. Then action zone appears (opacity build, 300ms).

---

### 02.5 — 3-card spread reveal choreography

Card 1 (PAST) initiates. Card 2 (PRESENT) and Card 3 (FUTURE) are face-down on the reading surface throughout — present but not interactive.

**Sequence:**
1. **Card 1 reveal** — full animation per 02.4. After settle: 1,200ms hold.
2. **Card 2 reveal** — initiates automatically after hold. Full animation per 02.4. After settle: 1,200ms hold.
3. **Card 3 reveal** — initiates automatically. Full animation per 02.4.
4. **Companion line** — appears 1,200ms after Card 3 settles. One line for the full spread.
5. **Action zone** — 800ms after companion line visible.

**Cards 2 and 3 during wait:** Ambient breathing pulse at 50% intensity. They are not inert — they are waiting. The element layer is active throughout.

**No user gesture required for cards 2 and 3** — the reading is already initiated. Cards reveal on the choreographed schedule. This is a distinction from the single-card draw where the hold is the initiation gesture.

---

### 02.6 — Daily draw vs initiated reading: key differences

| Moment | Daily draw | Initiated reading |
|--------|-----------|-------------------|
| Hold gesture | On talisman | On talisman |
| Card count | 1 | 1 or 3 |
| Cards 2+3 reveal | N/A | Auto-sequenced |
| Companion line | 1 card-specific line | 1 spread synthesis line |
| Recognition check | Yes | Yes |
| Dig Deeper button | ❌ Never | ✅ After full reveal |
| Aura behaviour | Per card — full spec Part 03 | Per card — full spec Part 03 |

---

### 02.7 — Onboarding (Screen 12) — compressed animation

Screen 12 uses a compressed version of the reveal sequence. Purpose: establish the language without the full ceremony.

- No shuffle state — card is already in position
- No hold gesture instruction — the breath beat leads into talisman interaction directly
- Reveal sequence fires: Phases 1–3 per spec above (timing unchanged)
- Companion line: replaced by onboarding-specific first draw copy (per `majestic-birth-card-spec.md`)
- No action zone — onboarding continues to next screen

---

## PART 03 — AURA AMBIENT GLOW RULES

### 03.1 — What the aura is

The aura is a Skia-rendered ambient glow that wraps the revealed card and modifies the avatar's portal presence. It communicates the card's energy category (breakthrough / shadow / neutral) visually — before the user has read a word.

The aura is not a badge. The badge (see `majestic-design-system.md`) is a UI component. The aura is atmospheric — an environmental condition, not a label.

**Three aura states:**

| State | Energy | Visual register |
|-------|--------|-----------------|
| Breakthrough | Upward, expansive, movement | Warm, brightening, outward pulse |
| Shadow | Tension, friction, complexity | Cool, contracting, inward depth |
| Neutral | Holding, transition, pause | Balanced, slow, no directionality |

**Recognition** is a fourth condition — not an aura state but an aura modifier. When a card matches the user's personality or soul card, the aura inherits the card's base state and adds a recognition pulse layer on top.

---

### 03.2 — Aura glow: per-card colours

The aura uses the card's aura classification + the active avatar's accent palette. The base glow colour is always the aura state colour. The pulse highlight is the avatar accent.

| Aura state | Base glow colour | Opacity at full | Spread radius |
|-----------|-----------------|-----------------|--------------|
| Breakthrough | `#D4A843` warm gold | 35% | 48px from card edge |
| Shadow | `#5B4E8C` deep violet | 30% | 32px from card edge (inward quality) |
| Neutral | `#3A3A4A` world dark | 20% | 24px from card edge |

**Pulse highlight (avatar accent layer, sits above base glow):**

| Avatar | Breakthrough pulse | Shadow pulse | Neutral pulse |
|--------|-------------------|--------------|---------------|
| Casper / Fire | `#C94B2C` ember red → `#D4A843` heated gold | `#C94B2C` at 15% | `#C94B2C` at 8% |
| Eli / Air | `#6ECFCF` luminous aqua | `#A8B4C8` silver at 15% | `#A8B4C8` at 8% |
| Olivia / Earth | `#C49A4A` clay gold → `#A8C87A` bioluminescent | `#5C6B3A` moss at 20% | `#5C6B3A` at 10% |
| Destiny / Water | `#4DBFCC` moonlit cyan | `#2A7B8C` deep teal at 20% | `#2A7B8C` at 10% |

---

### 03.3 — Aura animation behaviour

**Build (0 → 100%):**
- Begins at card flip Phase 2 (180° rotation, card face resolving)
- Reaches 100% at end of Phase 3 (card settled)
- Easing: ease-out, smooth build
- Duration: ~600ms (overlaps settle phase)

**At rest (breathing pulse):**
- Synced to card breathing pulse — same period (4 seconds), same ease-in-out sine
- Breakthrough: breathes outward — glow radius oscillates ±8px at peak
- Shadow: breathes inward — glow slightly contracts at peak then returns, ±4px
- Neutral: minimal oscillation — ±2px, barely perceptible

**After companion line appears:**
- Aura remains at full intensity
- Breathing pulse continues throughout reading session

**On talisman dimming (60% dim post-reveal):**
- Aura is unaffected — it stays at full. The talisman recedes; the card leads.

**On session close:**
- Aura fades to 0% over 600ms as card exits (or screen transitions)

---

### 03.4 — Recognition modifier

**Trigger:** Card drawn matches the user's personality card or soul card (stored in `profileStore`).

**What changes:**
1. Base aura as normal for the card's state (breakthrough / shadow / neutral)
2. **Recognition pulse layer added on top:** a single outward ring — `#9500FF` Majestic brand purple at 40% opacity — expands from card edge to 80px radius over 1,200ms, then fades to 0% over 600ms. One ring. Does not repeat.
3. Companion line opens with recognition beat before the card read (see `majestic-profile-spec.md` for line format)
4. Avatar shifts to active state and holds it longer — 3 seconds before returning to neutral (standard is 1.5s)

**Recognition pulse timing:** Fires 200ms after aura reaches 100% (after card is settled). Not simultaneous with the build — it arrives as a distinct beat.

---

### 03.5 — Aura by app surface

The aura glow is a reading-screen and codex phenomenon. It does not appear on every card instance in the app.

| Surface | Aura present | Form |
|---------|-------------|------|
| Reading screen — card reveal | ✅ Full aura | Full glow + breathing pulse |
| Daily draw — card reveal | ✅ Full aura | Full glow + breathing pulse |
| Codex — card detail | ✅ Ambient aura | Soft ambient glow at card edges, 50% of reading screen intensity. No pulse. Static. |
| Codex — card grid | ❌ No aura | Too small for glow. Aura badge only. |
| Journal — saved reading | ❌ No aura | Thumbnail format. Aura badge label only. |
| Profile — reading history | ❌ No aura | Compact card thumbnails. No glow. |
| Onboarding — birth card reveal | ✅ Modified | Full aura for personality card. Softer (60% intensity) for soul card — they are equally important but the soul card moment is more interior. |

---

### 03.6 — Aura and avatar portal state

When a card is revealed, the avatar shifts from neutral to active state. The active state modifies the avatar portal alongside the card aura.

| Card aura | Avatar state | Portal behaviour |
|-----------|-------------|-----------------|
| Breakthrough | Active | Portal edge brightens to 100% accent intensity. Particles increase to 60% density. |
| Shadow | Active | Portal edge holds at 60% accent intensity. Particles slow — 30% density. The avatar is present, not celebratory. |
| Neutral | Active | Portal edge at 80% accent. Particles at ambient. No change from pre-reveal. |

**Hold duration:** Avatar holds active state for 1.5 seconds after companion line appears, then eases back toward neutral. Exception: recognition modifier holds active for 3 seconds.

**The avatar does not react before the card is seen.** Avatar remains in neutral state until card face is revealed (Phase 2 of reveal). The avatar's shift to active is always a response to the card, never an anticipation of it.

---

### 03.7 — Implementation notes

- **Aura renderer:** Skia (`@shopify/react-native-skia`). Render as a radial gradient layer behind the card, above the reading surface.
- **Aura values in code:** Derive from `card.auraContext` field in `cardData.ts` / `minorArcana-cardData.ts`. Values: `'breakthrough' | 'shadow' | 'neutral'`.
- **Recognition check:** Cross-reference `card.id` against `profileStore.birthCards.personalityCard` and `profileStore.birthCards.soulCard` on every draw.
- **Breathing pulse:** Reanimated `withRepeat(withSequence(...))` on the aura radius and opacity values. Sync with card breathing pulse via shared timing value.
- **Avatar state:** Drive via `avatarStore.setAuraState(auraContext)` after card face resolves. Reset to neutral after hold duration.
- **Performance note:** Aura is one Skia layer. Do not separate breakthrough / shadow / neutral into separate components. Parameterise colour, opacity, and radius from the aura context value.

---

## PART 04 — OPEN QUESTIONS

1. **Sound design (#156):** Reveal animation has natural sound trigger points — hold threshold met, apex bloom, card settle. Spec these sound events once #158 (sound design spec) is written. Animation timings here are final regardless.
2. **3-card spread — talisman for cards 2 and 3:** In the single-card draw, the user holds the talisman to initiate. In the 3-card spread, cards 2 and 3 reveal automatically. Confirm: does the talisman respond again for each auto-reveal, or only for card 1? **Recommendation:** Talisman pulses once for each card reveal — a visual acknowledgement, not an interaction requirement.
3. **Altar world-names (#155):** Talisman objects are named functionally here (iron beads, tuning fork etc.). Threshold City lore names are a separate task — flagged, not blocking.
4. **Dig Deeper — animation handoff:** When the user taps DIG DEEPER, the card and altar recede slightly (suggest 20% opacity dim over 300ms) and the Dig Deeper surface comes forward. The reading screen becomes a background to the synthesis. This transition needs a component spec — out of scope here, flagged for #123 completion.

---

*Majestic — Reading Screen, Card Animation & Aura Ambient Spec — v1.0*
*Your adventure. But Majestic.*
