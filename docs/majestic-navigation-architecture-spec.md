# MAJESTIC — NAVIGATION ARCHITECTURE
## Three-State Spatial System — Task #169
*Your adventure. But Majestic.*

**Version:** 1.0
**Status:** LOCKED — confirmed with Luke via decision brief, June 2026
**Depends on:** #102 (avatar theme switcher), #109 (portal system)

---

## 01 — CORE CONCEPT

Majestic's navigation is spatial, not hierarchical. The user does not move between tabs — they move between layers of a world. The metaphor is a window. The user is always looking through it. The three states are three different views from that same position:

- **Looking straight ahead** → Ground Level (Home) — Threshold City at eye level
- **Traveling up** → The Outer Realm (Codex) — the cosmos beyond the city
- **Traveling down** → The Self State (Reading + Journal) — a private interior space

These states are **nameless to the user**. They are never labelled as "Outer Realm" or "Self State" in the UI. The user simply navigates to Home, Codex, Reading, or Journal. The world feeling comes from the transitions and the environments — not from being told where they are.

The concept that binds all three states: **threshold**. A threshold is a liminal space — between worlds, between states, between who you were and who you're becoming. The home screen is not inside the city. It is at the edge of it, watching, preparing to move. That framing is the app's identity.

---

## 02 — THE THREE STATES

### STATE 1 — GROUND LEVEL (Home)

**Navigation destination:** Home
**POV:** Looking straight ahead through a panoramic command center window at Threshold City.

The user is inside. They are an observer at the edge of the world. The city is alive outside the glass — deep navy buildings, neon glow in avatar accent colours, atmospheric haze, rain. This is the operational state: what do I need today?

**Environment:**
- Full-bleed background: Threshold City skyline through glass
- HUD elements on the glass: corner brackets, sector coordinates (`THRESHOLD CITY — SEC.7`), `AURA LINK ACTIVE` pulse
- Moving scan line across the window
- Console hardware edge at the bottom (LEDs, system status readout)
- City skyline: CSS/illustrated buildings, neon crowns in purple (#9500FF), teal (#2A7B8C), rust (#C94B2C)
- Atmospheric: rain falling across glass, moon visible in sky, purple and teal glow halos
- Avatar colour temperature: city neon subtly shifts toward active avatar accent — open question, pending Luke confirmation

**Content lives here:** Daily draw, daily directive (Co-Star coded), moon phase, avatar selector, settings.

**Portal hints:** Subtle upward arrow indicator at top of screen hints at outer realm. No hint toward self state from home.

---

### STATE 2 — THE OUTER REALM (Codex)

**Navigation destination:** Codex
**POV:** Traveled up through a portal/wormhole, emerged into the cosmos.

**Transition:** A portal or wormhole opens upward and pulls the user through it. Rings expand from centre, flash of light, environment changes. **The portal visual treatment is TBD — this is a live design decision that must be confirmed with Luke before build. It is the single most important visual element in the product.**

**Environment:**
- Deep cosmic background — near-black with purple haze
- Stars active (twinkling, layered depth)
- Radial purple glow at mid-screen
- No city, no console — fully otherworldly
- Avatar accent present in star colour temperature

**Content lives here:** The Codex — all 78 cards. Avatar lore and expanded content (locked until eligible).

**Transition back to Ground:** Portal re-opens, user travels down-through and lands at Home.

---

### STATE 3 — THE SELF STATE (Reading + Journal)

**Navigation destination:** Reading or Journal
**POV:** A door opens, user travels inward and downward into a private room at desk level.

**Transition:** A door opens and pulls the user downward through it into personal space.

**Environment — the desk stage:**
A persistent animated bottom panel showing a desk from a slight overhead angle. This is the environmental stage for both Reading and Journal within the Self State. It uses Lottie animation (NOT GIF — performance requirement).

The desk has two orientations within the Self State, separated by a lateral pan:

**→ Slightly right: Altar (Reading)**
The desk shifts right to reveal the altar. The animation that signals a reading beginning: a drink being poured on the table — ritualistic, grounding. See `majestic-altar-ritual-spec-v2.md` for full altar spec.

**→ Slightly left: Journal/Book**
The desk pans left. A book opens — animated, real book-opening feel. Once open, the journal is a scrollable page of saved entries.

**The lateral pan** between altar and journal is a subtle camera movement within the Self State. Reading ↔ Journal is a direct fade (no portal) because both live in the same state.

**Avatar-specific environments:** The self state background is avatar-specific. The desk exists within each avatar's personal world:
- Destiny → seascape visible behind the desk
- Olivia → a field or natural landscape
- Eli → an urban cityscape
- Casper → a high-rise interior

**Idle/default state:** When the user first enters the Self State before selecting Reading or Journal, the desk sits at a neutral resting position — neither altar nor book is in focus. **TBD — default idle visual to be defined.**

**Animation states (Lottie):**
1. Book opening → journal entry
2. Drink pouring → reading/altar activation

**Decision pending Luke:** Should the drink pour be universal or avatar-specific? (e.g. Destiny pours something oceanic, Casper pours coffee/whisky.) Four animation variants vs one.

---

## 03 — NAVIGATION SYSTEM

### Bottom Navigation Bar

**Structure:** 4 destinations, persistent, icon-only, floating above the environment.

| Position | Destination | Icon | Active Accent |
|----------|-------------|------|---------------|
| 1 | Home | ⌂ (home glyph) | Destiny teal `#2A7B8C` |
| 2 | Codex | ✦ (convergence crest) | Eli slate `#A8B4C8` |
| 3 | Reading | ◈ (card/altar glyph) | Casper rust `#C94B2C` |
| 4 | Journal | ◻ (book/page glyph) | Olivia moss `#5C6B3A` |

Note: Active accent defaults to the active avatar's colour when on Home. For Codex, Reading, and Journal, the accent is fixed to the suite avatar's colour (Eli, Casper, Olivia respectively) regardless of active avatar. This reinforces the elemental/avatar world mapping. **Confirm this behaviour with Luke.**

**Active state:** Icon background takes avatar accent at 14% opacity. Icon box shadow in avatar accent. Small dot indicator below icon in avatar accent with glow. Label text in avatar accent colour. Icon lifts 2px on active.

**Visual treatment:** Background `rgba(8,9,18,0.94)`, backdrop blur 24px, top border `rgba(149,0,255,0.1)`. Sits 90px tall including safe area. Never overlaps content.

**Rationale for bottom nav over left rail:** Portrait mobile screens do not have horizontal space for a left rail without cramping content and breaking the immersive environment aesthetic. Bottom nav handles 4 destinations cleanly and is the standard mobile pattern the user already knows. Left rail is a desktop pattern.

---

## 04 — PORTAL / TRANSITION SYSTEM

### Travel to Outer Realm (up)
**Trigger:** Tap Codex in bottom nav
**Animation:** Portal rings expand from screen centre, purple glow flash, environment crossfades to cosmic
**Label during transition:** `ENTERING THE OUTER REALM` (Space Mono, small caps, fades in)
**Duration:** ~1 second total
**Skippable:** After first use, transition can be interrupted by tap. First use always plays in full.

### Travel to Self State (down)
**Trigger:** Tap Reading or Journal in bottom nav (from Home or Codex)
**Animation:** Door opens (visual TBD — Luke decision required), environment crossfades to self state desk
**Label during transition:** `DESCENDING INTO SELF`
**Duration:** ~1 second total
**Skippable:** After first use

### Reading ↔ Journal (lateral, within Self State)
**Trigger:** Tap Reading or Journal when already in Self State
**Animation:** Direct fade + lateral desk pan (no portal)
**Duration:** ~400ms

### Return to Home
**Trigger:** Tap Home in bottom nav from any state
**Animation:** Portal re-opens (reverse direction), city window fades in
**Duration:** ~1 second

### Cross-section linking (unchanged)
Cross-navigation between surfaces remains intact regardless of environmental state:
- Journal entry → Codex card detail
- Codex card → Journal reflection
- Reading result → Codex card
- These navigate directly without triggering full state transition animations

---

## 05 — DEMOGRAPHIC ALIGNMENT

The three-state navigation was designed to work across all three primary audience clusters:

**Tabletop/lore-driven:** The command center, sector coordinates, HUD readouts, and Threshold City as a navigable world with layers all read as TTRPG world-building. The city has a grid reference. The desk has objects with in-world names (see `majestic-altar-ritual-spec-v2.md`). The world feels systematic and inhabitable.

**Anime-spiritual:** The portal/wormhole travel mechanic is the isekai moment — the threshold before the other world begins. The POV window looking out at Threshold City references the classic isekai framing of the protagonist on the boundary between worlds. The atmospheric poetry (rain on glass, moon, haze) is Makoto Shinkai visual language.

**Occult/tarot-esoteric:** The Self State altar is reverential and ritual-focused. The command center ground state reads as liminal — between worlds, at the threshold, before the work begins. The reading experience carries this audience. The home screen must not feel cold; the poetic atmospheric elements (rain, moon, haze, the city's breathing quality) bridge the gap between tech and spirit.

**Unifying concept:** Threshold. Not inside the city. At the edge of it. Watching. Preparing.

---

## 06 — OPEN DECISIONS (REQUIRE LUKE INPUT)

1. **Portal visual treatment** — What does the wormhole/portal look like? Reference image, mood, mechanic. **BLOCKER for #109 and #177.**
2. **Avatar colour temperature at ground state** — Does the city neon shift subtly per active avatar, or is it always universal Threshold City? Recommendation: shift. One line of CSS per avatar.
3. **Active nav accent on Codex/Reading/Journal** — Fixed to suite avatar or always active avatar? Recommendation: fixed.
4. **Drink pour — universal or avatar-specific?** Four Lottie variants vs one.
5. **Desk idle state** — What does the desk show before Reading or Journal is selected?
6. **Codex expansion eligibility trigger** — Subscription, streak milestone, or both? Affects RevenueCat integration.

---

*Document owner: Oso. Confirmed with Luke via decision brief June 2026.*
*Related specs: majestic-altar-ritual-spec-v2.md, majestic-codex-spec.md, majestic-journal-spec.md, majestic-home-screen-spec.md*
