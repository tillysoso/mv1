# MAJESTIC — ALTAR & RITUAL SPEC
## The Sacred Pause — Avatar Altars, Talismans, Breath Mechanics & Ritual Language
*Version 2.0 — Your adventure. But Majestic.*

---

## 01 — ORIGIN & PHILOSOPHY

This spec originates from a real-world practice. Before a physical tarot reading, the practitioner sets the scene: a candle is lit, ritual beads are used to anoint the space, the client is asked to close their eyes and take three deep breaths. The card reading begins only after this.

The app cannot replicate this. It should not try.

What it can do is find the digital equivalent of the same intention: a minimum viable sacred pause — a brief moment of arrival that shifts the user from scrolling mode into presence mode. The mechanics are different. The effect is the same.

**The governing principle:**
> The ritual should be short enough that skipping it feels unnecessary. Not guilt-free — unnecessary. 5 seconds max. If it is beautiful and intentional, most users will not skip it. If it exceeds this, they will bypass it every time.

**The two physical elements that translate directly:**

- **The beads (→ Talisman)** — tactile, interactive, identity-bearing. The beads do not just ground — they initiate. Touching them is the act that opens the reading. In the app, each avatar has a Talisman: a unique object that the user interacts with to begin the reading. It is the point of contact between the user and the world. It is the digital equivalent of picking up the beads.
- **The candle (→ Light Source)** — ambient, already-lit. Not something the user activates. Something that is already burning when they arrive. The space was ready before they got there.

---

## 02 — THE READING SPACE VISUAL HIERARCHY

Every avatar's reading space is built from four distinct visual layers, in order of function:

| Layer | Name | Function | Example |
|-------|------|----------|---------|
| 1 | **Light Source** | Anchor. Illuminates the reading surface and the card. The card floats in the light. | Casper: ember flame. Eli: signal lamp. Olivia: bioluminescent root glow. Destiny: moonlight on water. |
| 2 | **Talisman** | Identity + Interaction. The avatar's ritual object. The user holds this to begin the reading. It is the initiation gesture. | Casper: iron beads on a copper wire. Eli: a resonance tuning fork. Olivia: a worn stone vessel. Destiny: a string of sea glass. |
| 3 | **Reading Surface** | Interaction zone. Where the card lives. The physical-feeling surface the card rests on or floats above. | Casper: scorched iron plate. Eli: a glass panel with signal lines beneath. Olivia: a flat stone altar with root inlays. Destiny: a still water surface. |
| 4 | **Element** | Atmosphere. The environmental layer that fills the space — always in peripheral motion, never demanding attention. | Casper: ember drift. Eli: air current signal traces. Olivia: slow botanical particles. Destiny: micro-ripple and mist. |

**Visual hierarchy rule:** Light Source illuminates everything. Talisman is foregrounded on approach. Reading Surface is where the eye rests during a reading. Element is always felt, rarely seen directly.

**The card floats at the intersection of Light Source and Reading Surface.** The light hits it from below or behind. The surface grounds it. The element surrounds it.

---

## 03 — THE TALISMAN SYSTEM

### What is a Talisman?

The Talisman is the avatar's equivalent of nana's beads. It is the ritual object unique to each avatar — present in their reading space, held or touched to initiate a reading. It carries the avatar's identity (material, texture, element) and the user's interaction (the hold gesture that begins the draw).

The Talisman is not decorative. It has a function: it is the gate. The reading does not begin until the user engages with it.

**The Talisman is:**
- Visually present at all times in the reading space
- The object the user holds to initiate the reading (replaces or wraps the generic hold-to-reveal gesture)
- Avatar-specific in material, form, and ambient behaviour
- The first thing the user sees animate when they arrive

**The Talisman is not:**
- A button
- A progress indicator
- Explained or labelled
- Gamified or collectible (v1)

### Talisman interaction flow

1. User arrives at reading screen or daily draw
2. Talisman is present and at rest — subtle ambient motion
3. Breath beat fires (see Section 04) — 5 seconds, the talisman breathes with it
4. After breath — talisman becomes the interaction point. Subtle visual cue: the light source brightens slightly toward it. No text instruction.
5. User holds the talisman. Particles gather. The element responds.
6. Card rises from / appears above the reading surface. Reading begins.

**The hold gesture is on the Talisman, not directly on the card.** The card is revealed through the Talisman. This is the key distinction from the previous spec.

---

### 03.1 — CASPER / FIRE TALISMAN

**Talisman object:** Iron prayer beads on a copper wire — heavy, dark, strung unevenly. A small ember node sits at the junction — a single amber point that breathes at rest.

**Material language:** Rough iron. Copper wire. Heat-marked surfaces. Industrial but ceremonial — the kind of object that has been used many times.

**At rest:** The ember node at the bead junction pulses slowly — the same rhythm as the breath cycle. Three to five of the beads catch the flame light and reflect it. The copper wire has a faint signal-line trace running along it.

**On hold:** The ember node brightens. Sparks rise from the beads — upward, 600ms, 3–5 particles. The iron beads shift slightly as if felt. The copper wire trace pulses once along its full length.

**Light source:** A single iron flame holder — a low brazier or rough candleholder — positioned at the rear of the reading space. It illuminates the reading surface from behind and below. Always lit.

**Reading surface:** Scorched iron plate, flat, signal-line circuit traces along the edges. The card rests on this surface.

**Element:** Ember drift. Fine amber-gold particles, rising, sparse. Never distracting.

**Colour temperature:** `#C94B2C` ember / `#D4A843` copper gold / obsidian black beneath.

---

### 03.2 — ELI / AIR TALISMAN

**Talisman object:** A resonance tuning fork — thin, precise, two-pronged. It stands upright in a small base on the reading surface. It does not move at rest. The space around it does.

**Material language:** Brushed silver. Cool and exact. The kind of instrument that belongs in both a laboratory and a temple.

**At rest:** Signal lines move around the tuning fork — thin, silver-blue, like air currents made visible. A very faint resonance halo pulses around it at the same rhythm as the breath cycle.

**On hold:** Signal lines converge toward the fork. A single resonance ring expands outward from its base — one ring, fading slowly. The fork appears to vibrate — a subtle visual oscillation, no sound in v1.

**Light source:** A signal lamp — a directional light source with a pale cyan quality. Cold, precise, luminous. It throws clean shadows and illuminates the glass reading surface from above.

**Reading surface:** A glass panel with signal lines etched beneath — like a lightbox. The card floats above it, partially lit from below.

**Element:** Air current traces. Moving signal lines, horizontal, slow. Like the surface of a window in wind.

**Colour temperature:** `#A8B4C8` silver / `#6ECFCF` signal cyan / deep blue-black.

---

### 03.3 — OLIVIA / EARTH TALISMAN

**Talisman object:** A worn stone vessel — a small, smooth bowl with visible use-marks. Inside: a single botanical element, different each season but static in v1 (a seed, a dried leaf, a pressed flower). The vessel is the object. The contents are the identity.

**Material language:** River stone. Worn clay. Natural impressions. Old in the way that means trusted, not abandoned.

**At rest:** A single bioluminescent spore drifts slowly from the vessel — downward, settling on the reading surface. One spore every 8–12 seconds. Root lines at the edges of the reading surface breathe faintly.

**On hold:** A spore rises from the vessel (upward this time, on intention). Root lines at the altar edges extend slightly — 2–3px, barely perceptible. The vessel appears to settle deeper — a slight sinking, as if grounded.

**Light source:** Bioluminescent root glow — light that comes from below the reading surface through the root inlays. Warm, gold-green, soft. Not dramatic. The kind of light that exists without explaining itself.

**Reading surface:** A flat stone altar with root inlays visible beneath. Smooth on top, alive beneath.

**Element:** Botanical drift. Spores, fine botanical particles, slow. Gravity-following. Always downward at rest.

**Colour temperature:** `#5C6B3A` moss earth / `#C49A4A` clay gold / `#A8C87A` bioluminescent green.

---

### 03.4 — DESTINY / WATER TALISMAN

**Talisman object:** A string of sea glass — worn smooth, translucent pieces in pale blue, green, and white, strung together loosely. It rests in the water surface or is draped at its edge. It catches the moonlight.

**Material language:** Sea-worn glass. Salt-smooth. The kind of thing found, not made. Each piece is different. The string is imperfect.

**At rest:** The sea glass catches the moonlight and throws small refracted light points across the water surface. The water breathes — micro-ripple at the edges only. One ripple ring, very slow, from the talisman's resting point every 10–15 seconds.

**On hold:** One ripple ring expands from the sea glass contact point — wider, slower than at rest. The glass pieces shift slightly — the string moves. The light refraction intensifies briefly and then softens.

**Light source:** Moonlight on water — a diffuse, cool, reflective light that comes from above and is reflected by the water surface. The card appears lit from two directions: above by moonlight, below by its own reflection.

**Reading surface:** A still water surface — dark, reflective, deeply calm at rest. The card appears to float on it.

**Element:** Mist and micro-ripple. Water surface motion at the edges. A thin mist layer at low opacity. Destiny's element is the subtlest of the four.

**Colour temperature:** `#2A7B8C` deep teal / `#4DBFCC` moonlit cyan / near-black beneath.

---

## 04 — THE BREATH MECHANIC

### Purpose

The breath beat is a 5-second conscious transition. It is not a mindfulness feature. It is not optional in the sense that it has a skip button — it simply happens before the talisman becomes interactive. The user is not told to breathe. The space breathes. The user, consciously or not, tends to follow.

**5 seconds maximum. This is a hard limit.**

### Visual behaviour

The breath lives on the Talisman, not on a standalone emblem element.

| Phase | Behaviour | Duration |
|-------|-----------|----------|
| Inhale | Talisman light source brightens gently, 3–4% | 2.5 seconds |
| Exhale | Returns to rest. Avatar element particle fires once. | 2.5 seconds |

One cycle. Then stops. The talisman becomes interactive on exhale completion.

**On exhale, the element responds (once only):**

| Avatar | Exhale particle |
|--------|----------------|
| Casper | One ember spark rises from the iron beads, 600ms |
| Eli | One resonance ring expands from the tuning fork base, fades |
| Olivia | One botanical spore drifts downward from the vessel, settles |
| Destiny | One ripple ring from the sea glass resting point, fades |

After the exhale particle settles — the talisman is ready. The light source shifts very slightly toward it. No text. No instruction. The user holds.

---

## 05 — READING SCREEN LAYOUT

### Layer order (back to front)

1. **Background** — `#1A1A2E` with atmospheric grain, 5–6% opacity
2. **Element layer** — avatar-specific ambient particles, always in peripheral motion
3. **Light source** — avatar-specific, positioned at rear of reading zone
4. **Reading surface** — avatar-specific, centre of screen
5. **Card** — floats above reading surface, lit by light source
6. **Talisman** — foregrounded slightly, lower portion of reading zone
7. **Avatar companion line** — below card, above talisman. Text in this space.
8. **Avatar emblem** — peripheral, 40% opacity at rest

### Zone heights (390px screen)

| Zone | Height |
|------|--------|
| Top safe area + nav | ~60px |
| Card zone | ~260px |
| Reading surface + talisman zone | ~100px |
| Companion line | ~48px |
| Bottom nav bar | ~72px |

**Total reading surface + talisman zone: ~100px.** This is the altar. Compact, atmospheric, purposeful.

### During reading (post-reveal)

The talisman dims to 60% opacity — it has done its work. The card and companion text lead. The element continues at minimum ambient. The light source persists but softens.

### After reading (integration / journal prompt)

The talisman returns to full ambient presence. The card can recede. The space is open again.

---

## 06 — ONBOARDING INTEGRATION

### The principle

Onboarding does not run the full ritual. It teaches the physical language of it — specifically:
- That the talisman exists and belongs to their avatar
- That the hold gesture initiates the reading
- That something brief and intentional happens before the card appears

### Where it appears

**Screen 11 — Companion Confirmed**
The avatar appears fully. Their reading space appears for the first time — light source, talisman, element. The user sees their avatar's world. The talisman is present, at rest, breathing.

No explanation. No label. It simply exists.

**Screen 11 → 12 transition**
The reading space persists across the transition. The card arrives into the space that already exists. The space was ready.

**Screen 12 — First Draw**
Avatar line fires. Then: a compressed breath beat — exhale only, no inhale, 2.5 seconds. The element particle fires once. The talisman brightens. Then the card is available.

The user holds the talisman. The card reveals.

**What this teaches without saying:**
- This is where you go
- This is what you hold
- Something small happens first
- Then the card

They will recognise all of this on day two. No instruction required.

### What onboarding does NOT include
- The full 5-second breath cycle (compressed to exhale-only, 2.5 seconds)
- Labels, tooltips, or "this is your talisman" copy
- A skip button on the breath beat (it is short enough that one is unnecessary)

---

## 07 — COMPANION SKIP / NO-QUIZ UX

### The question
Should users be able to skip avatar selection entirely? And if so, what is the default state?

### Recommendation: Skip the quiz, not the choice

**Option A (recommended for v1):** Add a skip option to the quiz intro screen (Screen 08). The user can bypass the four questions and go directly to Screen 10 — where all four avatar cards are shown without a highlighted recommendation. The user picks on instinct. They still make a conscious choice. The companion system stays clean.

- **Copy for skip:** *"Skip straight to choosing."* — in the Majestic parent voice, not a system label.
- **Screen 10 without recommendation:** All four avatar cards shown equally. No highlighted panel. No "tends to find people like you" line. Just: *"Choose your companion."*
- **Downstream:** Identical to a quiz completion. The user has a companion. Everything works.

**Option B (not recommended for v1):** A fifth "no companion" state — Threshold City itself as the guide, master emblem, parent voice throughout, `#9500FF` base accent. Requires defining a fifth voice register, a fifth altar, and a fifth set of talismans. Significant overhead for a v1 edge case. Flag for v2 if data shows a meaningful number of users refusing selection.

**Why not "no companion at all":** The companion drives altar, talisman, reading voice, and UI accent. Without a selection, none of these can render. The app's visual identity collapses to a generic state. This is a worse experience than gentle pressure to choose.

### Default state if somehow no companion is stored (edge case / technical fallback only)
- Accent colour: `#9500FF` brand primary
- No talisman rendered
- No avatar companion line
- No altar zone
- Card appears on a plain `#16213E` surface
- This is a technical fallback, not a designed state. It should never be a user experience.

---

## 08 — REFLECTION MODE (V2 FLAG)

Reflection Mode is a future feature. It is flagged here because it directly extends the altar and talisman system and decisions made in v1 should not foreclose it.

**What it is:** A user-initiated mode available after a reading. The user taps "Reflect" — the altar animates and changes perspective (as if the camera moves closer, or the altar expands to fill the screen). The talisman becomes the centre. Ambient visuals and sound deepen. Thought prompts appear sequentially, meditative in pace. The purpose is to help the user integrate the reading, not receive new content.

**What it requires from v1:**
- The altar must be built as a layered system (which it is) — not a static image
- The talisman must be an interactive element (which it is) — not just decoration
- Sound design must be decided before this feature can be built (flagged as #156)

**What is NOT in v1:**
- Perspective animation
- Expanded altar view
- Meditative thought prompts
- Ambient audio
- The "Reflect" button/entry point

**V1 decision:** Build the altar and talisman as a layered system even if Reflection Mode is years away. The architecture cost is low. The cost of retrofitting later is high.

---

## 09 — OPEN QUESTIONS (UPDATED)

**Resolved from v1:**
- ✅ Altar static in v1 — confirmed
- ✅ No altar before avatar selection — confirmed
- ✅ Onboarding compressed breath (exhale only) — confirmed
- ✅ Sound design: effects/ambient only, not priority for v1 — noted, #156 remains open for timing
- ✅ 3-card spread altar: to be addressed when 3-card spread is specced in detail
- ✅ Quiz skip UX: Option A recommended — skip quiz, still choose companion

**Still open:**
1. **Altar world-names (#155)** — the four talismans and their light sources need Threshold City names. Brief copy task. Blocks lore writing and codex unlock copy.
2. **Sound design timing (#156)** — effects/ambient confirmed in principle. Specific implementation and timing TBD with Luke.
3. **"Nana's beads" world-name** — does the hold gesture / talisman initiation have a name inside the Threshold City world? Worth a conversation with Luke. The tabletop audience will want this to have a name.
4. **Talisman in Daily Draw vs Reading Screen** — the talisman appears in both contexts. Confirm whether the Daily Draw talisman is identical to the Reading Screen talisman, or whether there is a simplified version for the daily context. Recommend: identical in v1.

---

## 10 — WHAT THIS UNLOCKS DOWNSTREAM

- **#121 Daily draw component spec** — talisman placement and interaction defines the hold mechanic
- **#123 Reading screen 1-card spec** — altar zone, talisman placement, layer order all defined here
- **#155 Altar world-names** — unblocked once this spec is locked
- **#156 Sound design** — altar ambient audio context now defined
- **Avatar motion rules** — talisman response particles extend the avatar motion vocabulary
- **MJ prompt library** — each talisman object (iron beads, tuning fork, stone vessel, sea glass) can become a cref for card art and avatar art consistency
- **Reflection Mode (v2)** — architectural decisions in this spec directly enable it

---

*Majestic — Altar & Ritual Spec — v2.0*
*Supersedes v1.0*
*Your adventure. But Majestic.*
