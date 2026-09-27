# MAJESTIC — EMPTY STATES, LOADING STATES & AVATAR SWITCHING
## Component Specs — Tasks #130 and #131
*Your adventure. But Majestic.*

---

# TASK #130 — EMPTY STATES & LOADING STATES

---

## 01 — PRINCIPLE

No screen in Majestic is ever dead. Every moment of loading, waiting, or emptiness is a beat inside the world — atmospheric, purposeful, never corporate filler. The user is always inside Threshold City. The world does not pause because content hasn't arrived yet.

**Three rules:**
1. Every loading state has a world visual — rain on glass, signal pulse, botanical detail, atmospheric haze
2. Every loading state has a single line of copy in the Majestic brand voice — never "Loading...", never a spinner with no context
3. Empty states never push the user toward action — they simply hold. The world is patient.

---

## 02 — LOADING STATES

### Global loading — app initialisation

**When:** App cold start, auth check, initial data fetch.

**Visual:** Full-screen `#1A1A2E`. The Majestic master emblem (Convergence Crest) centred, monochrome, 80px. A single slow pulse — emblem breathes in and out at rest scale. No spinner. No progress bar.

**Copy:** Nothing. The emblem is enough. If load exceeds 3 seconds, fade in one line below the emblem:

> *The signal is finding you.*

Montserrat, mist grey, centred. Fades in at 3s, stays until load completes.

---

### Daily draw — card loading / shuffle state

**When:** Between opening the daily draw and the card being ready to reveal.

**Visual:** Face-down card centred on screen. Ambient living signal shimmer at the card edges. Avatar emblem at peripheral, 40% opacity, pulsing slowly. Elemental particles gather gently in the avatar's motion skin — not dramatic, just alive.

**Copy:** Avatar-voiced. One line, appears after 800ms:

| Avatar | Loading line |
|--------|-------------|
| Casper | *Something's ready for you.* |
| Olivia | *The deck is settling.* |
| Eli | *The signal is assembling.* |
| Destiny | *Something is on its way to you.* |

---

### Codex — card data loading

**When:** Codex grid is fetching from Supabase on first load.

**Visual:** Grid skeleton — card-shaped placeholder panels in a 3-column layout. Not grey boxes — each placeholder has the world grain texture and a very faint Majestic purple wash at 6% opacity. They breathe slightly. They look like cards that haven't woken up yet.

**Copy:** One line above the grid, mist grey, centred:

> *Reading the deck.*

Fades out when cards arrive. No announcement.

---

### Journal — entries loading

**When:** Journal archive fetching on entry.

**Visual:** Two or three entry panel skeletons. Same grain texture as the Codex skeletons. Slightly taller panels. Canal reflection quality — that blue-grey water light in the placeholder surface.

**Copy:** None. The skeletons are enough. The Journal is quiet.

---

### Profile — data loading

**When:** Profile surface fetching birth card data or reading history on first load.

**Visual:** Card panel placeholders where the birth cards would be — two portrait shapes, mist wash, very faint. No skeleton for the resonance section — it simply doesn't appear until data arrives.

**Copy:** One line, mist grey, below the header:

> *Your foundation is being read.*

Fades out when data arrives.

---

### Image loading — card art

**When:** Individual card art images loading within the Codex detail view or reading screen.

**Visual:** Card frame visible immediately — the brushed metal border, the arch, the element bar. Inside the illustration window: the avatar gradient wash at full opacity with a slow shimmer. The frame arrives before the art. The art loads into the frame.

**Copy:** None. The frame holding space is the visual.

---

### Network error / offline state

**When:** Data fetch fails or user is offline.

**Visual:** Existing screen content remains visible (cached). A minimal toast-style notice slides in from the top — not a full-screen error. `#1E1E2E` background, thin avatar accent border.

**Copy:**
> *The signal dropped. Still here.*

One line. Montserrat, bone white. Auto-dismisses after 4 seconds. If persistent, a small retry icon appears inline — no "Try Again" button, just a circular signal icon at avatar accent colour. Tapping retries silently.

---

## 03 — EMPTY STATES

### Codex — before any card drawn (edge case)

Full grid in undiscovered state — all 78 cards visible at 30% opacity. One line at the top of the screen:

> *The deck is waiting.*

Montserrat, mist grey, centred below the filter bar. That is all. No CTA. No illustration. No prompt to go draw.

---

### Journal — no entries yet

Blank feed. Avatar emblem at 20% opacity, centred, mid-screen. One line below it:

> *Nothing here yet. It will come.*

Montserrat, mist grey, centred. The compose button is visible at bottom right — present but not called out. The Journal does not ask to be filled.

---

### Journal — search returns no results

> *Nothing found.*

One line, mist grey. No suggestions. No "try a different search." Clean.

---

### Journal — filter returns no entries

When a filter (e.g. "Readings") has no saved entries yet:

> *No readings saved yet.*

One line, mist grey. No CTA.

---

### Profile — resonance section (no recurring cards yet)

Section does not appear. Nothing. No placeholder, no "draw more cards to unlock." The Profile only says things when it has something to say.

---

### Codex — search returns no results

> *Nothing found. Try another name.*

One line, mist grey. Simple.

---

### Reading screen — between readings (if navigated to directly without initiating)

This should not be reachable in normal flow — the reading screen only opens when a reading is initiated. If somehow reached:

> *No reading in progress.*

One line. Avatar emblem at 30% opacity behind it.

---

## 04 — COPY RULES FOR ALL EMPTY & LOADING STATES

- Never more than one line of copy
- Never a call to action embedded in the copy itself ("tap here", "start by", "go to")
- Present tense, atmospheric, world-register
- Never corporate filler ("No data available", "Content not found", "Error 404")
- Never apologetic ("Sorry, we couldn't load...")
- Copy should feel like the world noticing, not the app explaining

---

# TASK #131 — AVATAR SWITCHING — FULL UI FLOW

---

## 01 — PRINCIPLE

Switching avatar is crossing into a different part of the same city. Not changing apps. Not rebooting. The world persists. The light changes.

The transition belongs to the user — it is a conscious choice, not an incidental setting. The 1500ms total duration is long enough to feel intentional without feeling slow. Every millisecond of it is doing something.

---

## 02 — ENTRY POINTS

Avatar switching can be initiated from two places:

**1. Profile surface** — *"Switch companion"* link in the Current Companion section. Tap opens the avatar selection modal.

**2. Navigation — avatar emblem** — The active avatar's emblem sits in the bottom navigation bar (or header, TBC with Luke based on nav implementation). Long press on the emblem opens the avatar selection modal. A short press does nothing — this prevents accidental switches.

No other entry points in v1. Avatar switching is not accessible from the daily draw screen, reading screen, or Codex. It is a deliberate action, not a reactive one.

---

## 03 — AVATAR SELECTION MODAL

Opens as a full-screen modal — not a bottom sheet. This is a significant enough choice to deserve the full screen.

**Background:** `#0D0D14` — obsidian, deepest background. The world has gone quiet. The choice is foregrounded.

**Layout:** Four avatar panels arranged in a 2×2 grid. Each panel:
- Avatar portrait — living circle portal, 120px, neutral state
- Avatar name in Cinzel, displayXS, bone white
- Avatar element label — FIRE / WATER / AIR / EARTH in tracked uppercase, current avatar's accent colour
- Currently active avatar panel has a thin signal-line border in its accent colour. The others are borderless.

**Header:** *"Choose your companion."* — Cinzel, displaySM, bone white, centred. No back button visible — swipe down to dismiss without switching. Standard iOS/Android gesture.

**On tap of a different avatar:**
- The selected panel gets a brief accent pulse — the new avatar's accent colour blooms on the border for 200ms
- Confirmation appears (see section 04)

**On tap of the current avatar:**
- Nothing happens. No confirmation. No response. The user is already there.

---

## 04 — CONFIRMATION BEAT

After tapping a new avatar — before the transition fires — a single confirmation line from the new avatar appears below the grid. One second. Their voice. Their first word.

| Avatar | Confirmation line |
|--------|-----------------|
| Casper | *Right. Let's go.* |
| Olivia | *Good. We'll figure it out together.* |
| Eli | *There's a lot to explore.* |
| Destiny | *I'm glad you're here.* |

These are the locked first-words from onboarding. Reused here intentionally — the avatar greets the user the same way every time they choose them. Consistency builds character.

After 1000ms, the transition fires automatically. No confirm button required — the selection and the line are enough.

---

## 05 — TRANSITION SEQUENCE (1500ms total)

### Phase 1 — Fade out (0–400ms)

Current avatar accent fades. Particles dissolve. Glows cool. The accent colour drains from the UI — borders return to world neutral, emblem goes monochrome, particle motion slows and stops.

The world itself does not change — the background, the panels, the typography all remain. Only the accent layer drains.

**Timing:** 400ms, ease-out curve.

---

### Phase 2 — World neutral beat (400–700ms)

A brief moment of pure Threshold City. No avatar accent. No particles. Just the world at rest — `#1A1A2E`, grain, atmospheric haze. The living signal layer at absolute minimum.

This beat is intentional. It is the crossing between one part of the city and another. The user is between avatars for 300ms. The world is holding its breath.

**Duration:** 300ms. No copy. No motion. Just the world.

---

### Phase 3 — New accent blooms (700–1500ms)

The new avatar's accent arrives. Not instantly — it bleeds in:

- Emblem recolours first — 100ms, the new avatar's primary accent fills the emblem
- Border states shift — 150ms, thin signal-line borders take on the new accent
- Particles begin — 200ms, first particle appears in the new elemental motion skin
- Full particle motion — 350ms, elemental motion skin at full ambient presence
- Background wash — very subtle tint shift toward the new avatar's world at 4% opacity, completes at 800ms

**Total bloom duration:** 800ms, ease-in-out curve.

---

### Phase 4 — Avatar arrival (fires at 1200ms, overlaps bloom)

At 1200ms — while the bloom is still completing — the new avatar's portal appears. Living circle, 80px, neutral state. Fades in over 300ms. By 1500ms the transition is complete and the avatar is present.

The modal has already dismissed at the start of Phase 1. The transition happens on the underlying screen — the user sees their current surface (Profile, or whatever launched the switch) now in the new avatar's world.

---

## 06 — WHAT CHANGES AFTER THE SWITCH

**Changes immediately:**
- All accent colours across the entire app — borders, emblems, aura states, particles
- Avatar emblem in navigation
- Elemental motion skin — particle behaviour, motion direction, timing
- Avatar voice — all future avatar lines, companion lines, notification language

**Does not change:**
- World environment — backgrounds, grain, atmospheric haze
- Typography
- Panel structure and layout
- Card art
- Any content the user has already saved (Journal entries, Codex lore, Profile birth cards)

**Note:** Reading history in the Journal shows which avatar was active at the time of each reading. Historical entries are not retroactively reassigned to the new avatar. The Journal is a record of what actually happened.

---

## 07 — EDGE CASES

**Switching during a daily draw in progress:**
Avatar switching is not accessible from the daily draw screen. The user cannot switch mid-reading. Entry points are Profile and navigation emblem long-press only.

**Switching back to current avatar:**
Tapping the currently active avatar in the selection modal does nothing. No transition fires. Modal dismisses on swipe down.

**First-time switch (user switching for the first time after onboarding):**
No special treatment. Same flow. The transition is always the same regardless of how many times it has been done.

---

## 08 — IMPLEMENTATION NOTES FOR LUKE

The transition is implemented across three layers:

**Layer 1 — CSS token swap** (already scaffolded in `avatarStore.ts`)
On avatar switch, update `activeAvatar` in Zustand store. All accent tokens reference this value. The token swap is instantaneous — the animation is handled in layers 2 and 3.

**Layer 2 — Reanimated transition** (#102 in progress)
The fade-out and bloom are Reanimated shared value animations. The timing curve per phase is defined above. Luke has full discretion on the specific easing functions as long as the phase durations are respected.

**Layer 3 — Particle system** (#106)
The elemental motion skin swap fires at the same time as the bloom. The current motion skin dissolves (particles stop emitting, existing particles fade over 200ms), the new skin initialises (first particle at 200ms into Phase 3). No hard cut.

**Token structure** (from Avatar Accent System v1.0):
```
--accent-primary
--accent-secondary
--accent-tertiary
--accent-particle-start
--accent-particle-end
--motion-skin
```

---

*Majestic — Empty States, Loading States & Avatar Switching — v1.0*
*Tasks #130 and #131 — Complete*
*Your adventure. But Majestic.*
