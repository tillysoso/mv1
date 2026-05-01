# MAJESTIC — PIXEL ELDER ADDENDUM
## The Lamp, the Threshold & the Talisman Prompt
*Addendum to Pixel Elder Character Spec & Altar Ritual Spec v2.0*
*Version 1.0 — Your adventure. But Majestic.*

---

## 01 — THE NEW ROLE: TALISMAN PROMPT

The Pixel Elder has an existing set of trigger moments (surprise card, loyalty milestones, birthday, full moon, personality/soul card appearances, rare draws). This addendum adds one new role that precedes all of those:

**She initiates the reading.**

Before every reading — daily draw or initiated spread — the Pixel Elder appears briefly, lights her lamp, and the screen responds. This is the visual prompt that tells the user: *we are going inward now.* It replaces any text-based instruction or UI cue for reading initiation. It is purely visual. Purely her.

This is the digital translation of Luke's physical ritual: the candle is lit, the space is blessed, the reading begins.

---

## 02 — THE LAMP SEQUENCE

### Duration: 3–4 seconds total. Hard limit.

The sequence is designed to be doable by a solo animator in Aseprite + React Native Reanimated. No 3D. No portal rendering. No parallax depth scene. The isekai quality comes from light consuming the screen — the user's imagination does the rest.

### Step-by-step

**Frame 0 — She appears (0ms)**
The Pixel Elder slides in from the bottom-right corner of the screen — her standard entry. She is in her base idle state, lamp unlit. She stands still for one beat — 400ms. She is small. The reading surface is already present behind her.

**Frame 1 — She looks up (400ms)**
A single animation beat — she tilts her head upward, toward the card / toward the user. 2–3 pixel frames. She is acknowledging something. She is about to do something.

**Frame 2 — The lamp lights (600ms)**
Her lamp flickers on. This is the key animation. In Aseprite: 3–4 frames.
- Frame A: lamp dark
- Frame B: tiny flicker — 2px warm pixel, irregular
- Frame C: lamp at full pixel glow — a small warm corona around the lamp head (4–6px halo, hand-drawn in pixel art)
- Frame D: settle — lamp steady, corona stable

The lamp colour: `#D4A843` warm gold. The corona: `#F5C842` at outer edge, `#D4A843` core.

**Frame 3 — The world responds (800ms)**
This is the React Native layer — not pixel art.

Two simultaneous animations fire from the lamp's position on screen:

1. **Screen dim:** Background fades to `#0D0D14` (obsidian) — opacity 0 → 70%, easing ease-out, duration 800ms. The world goes quiet. She is the light source now.

2. **Radial glow bloom:** A radial gradient centred on her lamp position expands outward across the screen. Colour: avatar accent primary at 30% opacity at centre, transparent at 100px radius. The gradient expands from 0px to 180px radius over 800ms, ease-out. It does not fill the screen — it blooms and then holds. The reading surface, the talisman, and the card remain visible inside it. Everything else is dim.

**Frame 4 — She steps back (1600ms)**
She performs a small pixel exit — not a slide off screen. She takes 2–3 pixel steps backward toward her corner and reduces to 60% opacity. She is still there. She has done her work. She is watching.

The talisman is now foregrounded in the glow. It is interactive. The breath beat fires (5 seconds, per Altar Ritual Spec v2.0). Then the reading begins.

**Total lamp sequence: ~1600ms active, then breath beat.**
**Total pre-reading pause including breath: ~6.5–7 seconds.**

---

## 03 — ANIMATION PRODUCTION NOTES (FOR OSO)

### What you are making in Aseprite

One sprite sheet. The Pixel Elder lamp sequence is an extension of her existing base sprite — the same character, same 48×64px canvas, same palette.

**New animation states required (additions to existing spec):**

| State | Frames | Description |
|-------|--------|-------------|
| `look_up` | 2–3 frames | Head tilt toward card/user. Subtle. 1–2px shift in head position. |
| `lamp_flicker` | 4 frames | Dark → flicker → full glow → settle. The corona is drawn as part of the sprite. |
| `lamp_hold` | 2 frames (looping) | Lamp at steady glow, very slight pulse. Loops while React Native layer runs. |
| `step_back` | 3–4 frames | 2–3 pixel steps backward. She doesn't leave — she recedes. |

**Palette additions for lamp:**
- Lamp dark: `#2A1A00` (unlit, warm shadow)
- Lamp flicker: `#C87830` (irregular, brief)
- Lamp glow core: `#D4A843`
- Lamp corona outer: `#F5C842`

The corona should be hand-drawn around the lamp head in the sprite — not relying on React Native to fake it at pixel scale. At 48×64px, a 4–6px halo drawn in Aseprite will read as lamplight. Keep it asymmetric — real light is not a perfect circle.

### What React Native Reanimated handles

- `withTiming` on background opacity: 0 → 0.7, duration 800ms, `Easing.out(Easing.quad)`
- Radial gradient expansion: use `react-native-linear-gradient` or Skia (already in stack). Animate the gradient radius via Skia's `useSharedValue` + Reanimated — `withTiming` 0 → 180, duration 800ms, same easing.
- Pixel Elder opacity: `withTiming` 1 → 0.6, duration 400ms, delay 1200ms

This is within Reanimated's normal capability. No custom native modules needed.

---

## 04 — THE ISEKAI LOGIC (WHY THIS WORKS)

The isekai genre grammar is: ordinary world → threshold moment → another world entered.

The lamp sequence follows this exactly:
- **Ordinary world:** The reading screen, the talisman, the card — all present and familiar.
- **Threshold moment:** She appears. She lights the lamp. The world dims to near-black around her light.
- **Another world entered:** The user doesn't literally go anywhere. But the screen has transformed. What was a phone app is now a lit space, a ritual environment. The talisman is glowing in her lamplight. The ordinary world is gone.

The portal is implied, not rendered. The anime audience will feel this instinctively — this is the visual grammar they grew up with. You don't need to render another world. You need to make this one disappear.

**This is also why she has to be pixel art in a high-fidelity world.** She is from somewhere else. Her aesthetic incongruity is the tell. She doesn't belong to the Loish art style — she predates it. She's older than the app. The isekai logic requires the traveller to be visually distinct from the world they're crossing into.

---

## 05 — EASTER EGG TRANSITION: FROM RITUAL TO SECRET

### Before avatar selection
The Pixel Elder has a functional role: she initiates every reading as described above. The user sees her every single time they draw a card during onboarding's first draw (Screen 12). She is present, visible, doing her job. She is not explained. She is simply there.

### After avatar selection — the easter egg unlock
Once the companion is chosen and the user enters daily use, her ritual role becomes background. She still lights the lamp before every reading — but now the lamp sequence is subtle, faster (2.5 seconds vs 3–4), and she is smaller on screen. The user has learned the grammar. She doesn't need to teach it anymore.

Now her other trigger moments activate: she appears at unexpected moments, in unexpected positions, with prop variants. She is no longer doing a job. She is being discovered.

**The transition is never announced.** There is no "you've unlocked the Pixel Elder" notification. She simply starts appearing differently — more secretly, less centrally. The user who was paying attention during onboarding will recognise her. The user who wasn't will see her one day in the corner of a reading and have no idea what she is.

That's the point.

### Onboarding — first draw (Screen 12) special case
The very first lamp sequence in onboarding is the longest and most visible — she should be slightly larger here (~64×84px vs standard 48×64px), and she should hold the `lamp_hold` state for longer (800ms instead of 400ms) before stepping back. She is introducing herself. She will never do this again. After this, she shrinks back into the world.

---

## 06 — DAILY DRAW vs READING SCREEN: DIFFERENCES

| Context | Lamp duration | Elder size | Glow radius | Dimming |
|---------|--------------|------------|-------------|---------|
| First draw (onboarding) | 4 seconds | 64×84px | 220px | 80% |
| Daily draw (regular) | 3 seconds | 48×64px | 180px | 70% |
| Initiated reading (1-card) | 3 seconds | 48×64px | 180px | 70% |
| Easter egg appearances (post-avatar) | No lamp sequence — existing trigger spec applies | 48×64px | — | — |

---

## 07 — WHAT THIS CHANGES IN EXISTING SPECS

**Altar Ritual Spec v2.0 — Section 04 (Breath Mechanic):**
The breath beat now fires *after* the lamp sequence completes, not independently. Sequence is: lamp sequence (3s) → talisman foregrounded → breath beat (5s) → talisman interactive. Total pre-reading pause: ~8 seconds on first draw, ~6.5 seconds on regular draws. This is still within acceptable range — it is shorter than the time most users spend looking at a tarot card before touching it.

**Pixel Elder Character Spec — Trigger Moments:**
Add "Reading initiation" as Trigger Moment #1 — fires before all other triggers, every reading. This is her primary function, not her easter egg function. The two roles are separate: ritual initiation (every reading) and easter egg (existing trigger list, post-avatar-selection).

**Onboarding Narrative v2 — Screen 12:**
Add lamp sequence to Screen 12 first draw notes. The Pixel Elder appears before the breath beat, not after the avatar line. Revised Screen 12 sequence:
1. Avatar line fires: *"Your first card is ready, [Name]. Take your time. There is no wrong moment."*
2. Pixel Elder appears (slightly enlarged)
3. Lamp lights — full sequence, 4 seconds
4. Screen dims, glow blooms, she steps back
5. Compressed breath beat fires (exhale only, 2.5 seconds)
6. Talisman interactive — user holds — card reveals

---

## 08 — TRACKER UPDATES NEEDED

- **#60** Pixel Elder character spec — note: addendum written. Lamp sequence, talisman initiation role, easter egg transition, reading initiation as Trigger Moment #1. Update to reflect v2 scope.
- **#61** Pixel Elder pixel art production — update note: 4 new animation states required (look_up, lamp_flicker, lamp_hold, step_back). Palette additions for lamp. First draw variant (64×84px) also needed.
- **#154** Altar ritual spec — note: Pixel Elder lamp sequence now precedes breath beat. Sequence order updated. Total pre-reading pause ~6.5–8 seconds.

---

*Majestic — Pixel Elder Addendum v1.0*
*Your adventure. But Majestic.*
