# MAJESTIC — DESIGN SYSTEM
## Spacing, Components & Icons
*Version 1.0 — Your adventure. But Majestic.*

---

## 00 — HOW TO USE THIS DOCUMENT

This spec extends the existing locked documents (Colour System v1.0, Typography System v1.0, Brand Guidelines v1.0). It defines the three missing layers needed for consistent UI production:

- **Spacing** — the 8pt grid, all scale values, when to use each
- **Components** — every reusable UI element, all states, exact values
- **Icons** — every icon in the app, size rules, style principles

Where a value was previously scattered across surface specs, it is now consolidated here. This document wins over older scattered references.

---

## 01 — SPACING SYSTEM

### Base unit

**8pt grid.** All spacing values are multiples of 8. The single exception is the 4pt micro unit for tight internal component spacing (e.g. emblem-to-text gaps, metadata rows).

### Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-2` | 2px | Visual breathing room between micro elements (e.g. aura bar to card name). Rarely used — treat as a last resort. |
| `space-4` | 4px | Tight internal component spacing. Gap between emblem micro and label. Gap between aura badge and card number. |
| `space-8` | 8px | Standard internal padding within components. Section label margin below. Signal-line divider margin top and bottom. |
| `space-12` | 12px | Card thumbnail gap in grids. Gap between avatar line and divider. |
| `space-16` | 16px | Standard content margin from screen edge. Internal panel padding horizontal. Avatar companion line left indent. |
| `space-20` | 20px | Primary content horizontal padding across all surfaces. Section-to-section gap inside modals. |
| `space-24` | 24px | Spacing between major sections on surfaces (Profile, Journal). Bottom nav bar internal padding vertical. |
| `space-32` | 32px | Between surface-level sections on full-page views. Generous internal spacing for ceremonial moments (birth card reveal). |
| `space-40` | 40px | Onboarding vertical rhythm between major beats. |
| `space-48` | 48px | Top margin on surface headers (Codex, Journal, Profile header blocks). |
| `space-64` | 64px | Large atmospheric breathing room — hero card vertical centring offsets. |
| `space-80` | 80px | Bottom nav bar safe area clearance. Bottom of scrollable content before nav. |

### Layout constants

| Element | Value |
|---------|-------|
| Screen width (base) | 390px |
| Horizontal content margin | 20px left / 20px right |
| Content width | 350px |
| Bottom navigation bar height | 72px (includes safe area on iPhone) |
| Modal border radius (top corners only) | 16px |
| Card frame corner radius | 8px |
| Surface panel corner radius | 8px |
| Component corner radius (pills, badges) | 4px |
| Surface grain opacity | 5–6% noise texture — never flat |

---

## 02 — COMPONENT LIBRARY

### 02.1 — BOTTOM NAVIGATION BAR

The primary navigation. Present on all post-onboarding screens. Never visible during onboarding.

**Structure:** 4 tabs — Daily Draw, Codex, Journal, Profile.

**Dimensions:**
- Height: 72px (includes 16px safe area padding bottom)
- Tab touch target: 87.5px wide × 56px tall
- Icon size: 24px
- Label size: Montserrat 10px, weight 600, tracked uppercase
- Gap between icon and label: 4px

**States:**

| State | Icon | Label | Background |
|-------|------|-------|------------|
| Default / inactive | Monochrome `#A8A8B8` at 60% | `#A8A8B8` | Transparent |
| Active | Avatar accent primary, full opacity | `#F0EDE8` | Accent colour at 8% opacity as a soft pill behind the icon+label |
| Pressed | Scale 0.92, 80ms ease-out | — | — |

**Bar surface:** `#1A1A2E` with 1px top border in `#3A3A4A` at 60% opacity. Grain texture present.

**Active indicator:** Not an underline. A soft pill: 56px wide × 36px tall, avatar accent at 8% opacity, 18px border radius, centred behind the active icon and label vertically.

---

### 02.2 — SIGNAL-LINE DIVIDER

The thinnest element in the system. Used to separate content sections within modals, cards, and surface panels.

**Dimensions:**
- Height: 1px
- Width: 100% of container (minus horizontal padding)
- Colour: Avatar accent primary at 40% opacity (default)
- Quiet variant: Avatar accent primary at 20% opacity — used in undiscovered card states, empty sections
- Margin: 8px top, 8px bottom

**Never use as:** A decorative element. It separates content that belongs to different logical layers.

---

### 02.3 — FILTER PILL

Horizontally scrollable row of filters. Used in Codex (card filtering) and Journal (entry type filtering).

**Dimensions:**
- Height: 32px
- Horizontal padding: 14px left / 14px right
- Border radius: 4px (not fully rounded — rectangular with softened corners)
- Gap between pills: 8px

**Typography:** Montserrat 12px, weight 600, tracked uppercase (0.08em)

**States:**

| State | Background | Border | Text |
|-------|-----------|--------|------|
| Default | `#16213E` | 1px `#3A3A4A` | `#A8A8B8` |
| Active | Avatar accent at 12% opacity | 1px avatar accent primary, full opacity | `#F0EDE8` |
| Pressed | Avatar accent at 20% opacity | Same as active | `#F0EDE8` |

**Scroll behaviour:** `showsHorizontalScrollIndicator={false}`. No fade edge — pills simply disappear off screen edge. World doesn't explain itself.

---

### 02.4 — AURA BADGE

Appears on card detail views. Communicates breakthrough / shadow / neutral aura context.

**Dimensions:**
- Height: 22px
- Horizontal padding: 8px left / 8px right
- Border radius: 4px
- Gap from adjacent element: 4px

**Typography:** Montserrat 10px, weight 600, tracked uppercase (0.1em)

**Colour by aura context:**

| Aura | Background | Border | Text |
|------|-----------|--------|------|
| Breakthrough | `#D4A843` at 10% opacity | 1px `#D4A843` at 60% | `#D4A843` |
| Shadow | `#5B4E8C` at 15% opacity | 1px `#9B8FBF` at 60% | `#C8C0E8` |
| Neutral | `#3A3A4A` at 80% opacity | 1px `#A8A8B8` at 40% | `#A8A8B8` |

**Note:** Breakthrough uses Casper's gold tertiary — it reads as warm achievement across all avatars. Shadow uses a desaturated purple — evocative without being alarming. These are system-wide colours, not avatar-specific.

---

### 02.5 — TEXT INPUT FIELD

Used in onboarding (name, birth date) and Journal (intention field, note field). Two visual registers.

**Terminal register** (onboarding screens 02–03 only):
- Background: transparent
- Border: none — no field chrome, just the cursor
- Font: Space Mono 17px, `#F0EDE8`
- Cursor: 2px wide, avatar accent colour (defaults to `#9500FF` pre-avatar-selection), blinking at 500ms interval
- Placeholder: none — the world's copy sets context before the input appears
- Padding: 0 — full bleed to left content margin

**Notebook register** (Journal intention field, note field):
- Background: `#16213E` at 60% opacity
- Border: none — no hard chrome
- Font: Montserrat 16px, `#F0EDE8`, line height 1.7
- Placeholder text: Montserrat 16px, `#A8A8B8` at 50% opacity, italic
- Padding: 16px all sides
- Border radius: 8px
- Active/focused state: A single signal-line (1px, avatar accent, 40% opacity) appears at the bottom edge of the field. No outline ring. No border flash.

---

### 02.6 — ENTRY PANEL (Journal)

The card-like container that holds each journal entry in the archive feed.

**Dimensions:**
- Width: full content width (350px)
- Min height: 80px — expands with content
- Padding: 16px all sides
- Corner radius: 8px
- Gap between panels: 12px

**Surface:**
- Background: `#16213E` (Threshold mid)
- Grain texture at 6% opacity
- No hard border
- Top edge: 1px inner glow in avatar accent colour at 20% opacity — a whisper of which avatar was present

**Content layout (top to bottom):**
1. Entry type label — DAILY DRAW / 1-CARD READING / 3-CARD READING / JOURNAL in tracked uppercase, `#A8A8B8`, 10px, Montserrat 600
2. Date + time — Montserrat 11px, `#A8A8B8`, right-aligned on same row as label
3. Card thumbnail (if applicable) — 48px wide, 2:3 ratio, 8px right margin, floated left
4. Card name — Cinzel 14px, `#F0EDE8`, beside thumbnail
5. Avatar companion line — Montserrat italic 14px, `#F0EDE8`, full width below
6. Intention label + text — INTENTION in tracked uppercase, avatar accent, 10px / Montserrat 13px `#A8A8B8` italic below
7. User note — Montserrat 14px, `#F0EDE8`, line height 1.6, indented 4px left

---

### 02.7 — SECTION LABEL

Reusable label element that heads each section within a surface (Profile, Codex card detail, Journal entries).

**Typography:** Montserrat 10px, weight 600, tracked uppercase (0.12em), `#A8A8B8`
**Bottom margin:** 8px before content begins
**Top margin:** 24px from previous section (or from signal-line divider)

**Variants:**
- Default: `#A8A8B8` — standard metadata label
- Quiet: `#A8A8B8` at 50% opacity — used in undiscovered states, sections without content yet

**Never use:** Cinzel for section labels. Cinzel is for card names and ceremonial display only. Montserrat tracked uppercase is the codex/archive register.

---

### 02.8 — AVATAR EMBLEM MICRO

The small version of the avatar's circular signal crest. Appears inline with content to indicate avatar presence and attribution.

**Sizes:**
- 16px — Codex grid view, upper-right of card thumbnail (60% opacity)
- 20px — Avatar companion line attribution inline left
- 24px — Navigation tab icon, filter pill avatar indicator, Codex card detail metadata row
- 80px — Profile current companion section, avatar switching modal

**States:**
- Default: Monochrome `#A8A8B8`
- Active (navigation): Avatar accent primary, full opacity
- Attribution (companion line): Avatar accent primary at 80% opacity
- Decorative (grid thumbnail): `#A8A8B8` at 60% opacity

---

### 02.9 — CARD THUMBNAIL

The small card representation used in grids, journal entries, and profile resonance rows.

**Aspect ratio:** 2:3 (portrait) — always

**Sizes by context:**
- Codex grid: calculated from 3-column layout with 8px gutters → approximately 106px wide × 159px tall
- Journal entry: 48px wide × 72px tall
- Profile resonance row: 64px wide × 96px tall
- Avatar switching modal: 120px wide × 180px tall

**States:**
- Discovered: Full opacity art, avatar accent border (1px, 60% opacity)
- Undiscovered: Art at 30% opacity, mist layer (`#1A1A2E` at 50%), no border
- Selected/active: Brief accent pulse (scale 1.02, 150ms, ease-out), then return

---

### 02.10 — MODAL SHEET

The bottom-rising modal used for card detail (Codex), journal entry detail, and compose flow.

**Dimensions:**
- Width: full screen (390px)
- Height: 85% of screen height
- Top corner radius: 16px left and right — bottom corners are 0 (flush with screen edge)

**Surface:**
- Background: `#16213E` with grain texture at 5% opacity
- Swipe handle: 40px wide × 4px tall, `#A8A8B8` at 30%, centred, 12px from top edge
- No close button

**Overlay behind modal:** `#0D0D14` at 70% opacity

**Entry animation:** Slides up from bottom, 300ms, ease-out curve. Background overlay fades in simultaneously.
**Exit gesture:** Swipe down to dismiss. Tap overlay to dismiss. 250ms ease-in.

---

### 02.11 — SKELETON / LOADING PLACEHOLDER

Used when content is loading from Supabase. Never a spinner. Never a grey box.

**Card skeleton (Codex grid):**
- Same dimensions as card thumbnail
- Background: `#16213E` with grain texture
- Majestic purple wash at 6% opacity
- Slow breathing animation: opacity oscillates 60%→80% over 1800ms, ease-in-out, loop — unless reduced motion is enabled, in which case static at 70%

**Panel skeleton (Journal):**
- Same dimensions as entry panel
- Same grain + purple wash treatment
- Canal reflection quality — very subtle cool blue hue

**Never:** Generic grey placeholder rectangles. The world is always present, even during loading.

---

### 02.12 — STAT BLOCK (Profile)

Three equal-width stat cells in a row. Used in Profile reading history section.

**Dimensions:**
- Row width: full content width (350px)
- Cell width: 116px (350 ÷ 3, no gaps — cells sit flush)
- Cell height: 56px
- Dividers between cells: 1px `#3A3A4A`

**Content (per cell):**
- Number: Cinzel 24px, weight 700, `#F0EDE8`, centred
- Label: Montserrat 10px, weight 600, tracked uppercase, `#A8A8B8`, centred, 4px below number

---

## 03 — ICON SYSTEM

### Philosophy

No standard iOS/Material icons. Every icon is derived from the Majestic visual language: signal lines, circuit traces, threshold arches, elemental geometry. Icons should feel like they belong to Threshold City's wayfinding system — functional but world-made.

**Base style:** 2px stroke weight. No fill. Rounded line joins. Minimalist — each icon reads in 3 strokes or fewer where possible.

**Grid:** All icons drawn on a 24×24px grid with 2px padding on all sides (20×20px active area).

**Colour rule:** Icons inherit the colour of their context — never hardcoded. They are always monochrome single-colour at their usage size.

---

### 03.1 — NAVIGATION ICONS

| Icon | Name | Description |
|------|------|-------------|
| Daily Draw | `icon-daily-draw` | A single card face — portrait rectangle with an arch at the top echoing the card frame arch. Minimal: just the outer rectangle + arch line inside. No details. |
| Codex | `icon-codex` | The Majestic master emblem (Convergence Crest) at 24px. This is the only navigation icon that uses an emblem rather than a drawn icon. Monochrome. |
| Journal | `icon-journal` | A minimal open book — two pages, a centre spine. Not a notebook spiral. Not a feather. Two rectangles at an angle with a vertical centre line. Clean. |
| Profile | `icon-profile` | A circle (head) above a partial arc (shoulders). The minimal universal person glyph — but stroke-only, no fill, slightly thinner arc than standard. |

---

### 03.2 — SURFACE ICONS

| Icon | Name | Context | Description |
|------|------|---------|-------------|
| Search | `icon-search` | Codex header | Circle + line at 45°. 14px circle, 8px handle. Standard but stroke-weight matched to system. |
| Sort | `icon-sort` | Codex header | Three horizontal lines, left-aligned, descending length: 16px, 12px, 8px. Not a hamburger — the lines are spaced wider (6px gap) and vary in length. |
| Compose / Write | `icon-compose` | Journal surface | A diagonal pen stroke — single angled line with a small nib point at the bottom-left and a small tail at top-right. Minimal. Not a feather quill — a signal pen. |
| Close / Dismiss | `icon-close` | Modals (if needed) | Not used — modals dismiss via swipe gesture. If ever needed: two 16px lines crossing at 45°, centred on 24px grid. |
| Back | `icon-back` | Not used in v1 | Modal surfaces swipe to dismiss. No back navigation in v1 app flows. |
| Settings | `icon-settings` | Profile surface link | Not an icon — text link only: "Settings" in Montserrat mist grey. No gear icon. Gears belong to the wrong world. |
| Switch companion | `icon-switch` | Profile companion section | Two horizontal arrows — one pointing right, one pointing left — stacked with 4px gap. Signal exchange. Not a rotation circle. |
| Add / New | `icon-add` | Journal compose button | A simple + mark. 16px wide, 2px stroke, centred. Accent colour (not white). Not a FAB. No shadow. |

---

### 03.3 — CARD STATE ICONS

| Icon | Name | Context | Description |
|------|------|---------|-------------|
| Lore indicator | `icon-lore-dot` | Codex grid discovered card | A 4px circle in avatar accent colour, positioned bottom-right of card thumbnail. Indicates world lore has been unlocked. No tooltip, no label. Just the dot. |
| Pattern indicator | `icon-pattern-dot` | Codex grid cards drawn 3+ times | Same 4px circle but in `#D4A843` (breakthrough gold). Positioned bottom-left. Indicates a pattern note exists. |

**Never use:** Lock icons. Padlock icons. Any icon that communicates restriction or gatekeeping. Undiscovered states communicate through opacity and silence, not locks.

---

### 03.4 — AVATAR SWITCHING MODAL ICONS

| Icon | Name | Description |
|------|------|-------------|
| Recommended indicator | `icon-signal-pulse` | A small radiating signal mark — two concentric arcs at the top-right of the recommended avatar panel. Like the Wi-Fi signal icon but single-side, 3 arcs, avatar accent colour. Communicates "the world is pointing here" without text. 16px. |

---

### 03.5 — ICON SIZE RULES

| Context | Size |
|---------|------|
| Navigation tab | 24px |
| Surface header actions (search, sort) | 24px |
| Inline with text (compose, switch) | 20px |
| Card state indicators (lore dot, pattern dot) | 4px circle — not a standard icon |
| Avatar switching recommended indicator | 16px |

**Touch target rule:** All tappable icons must have a minimum touch target of 44×44px regardless of visual size. Invisible padding around the icon achieves this — not a larger visual icon.

---

## 04 — COMPONENT TOKEN REFERENCE

Quick-reference token block for use in design tool prompts or developer handoff.

```
/* Spacing */
--space-4: 4px
--space-8: 8px
--space-12: 12px
--space-16: 16px
--space-20: 20px
--space-24: 24px
--space-32: 32px
--space-40: 40px
--space-48: 48px
--space-64: 64px
--space-80: 80px

/* Layout */
--screen-width: 390px
--content-margin-h: 20px
--content-width: 350px
--nav-height: 72px
--modal-radius: 16px
--card-radius: 8px
--panel-radius: 8px
--pill-radius: 4px

/* Component heights */
--nav-tab-height: 56px
--filter-pill-height: 32px
--aura-badge-height: 22px
--stat-block-height: 56px

/* Borders */
--signal-line: 1px solid var(--accent-primary) at 40% opacity
--signal-line-quiet: 1px solid var(--accent-primary) at 20% opacity
--panel-border-subtle: 1px solid #3A3A4A

/* Icon sizes */
--icon-nav: 24px
--icon-surface: 24px
--icon-inline: 20px
--icon-touch-target: 44px
```

---

## 05 — WHAT IS DELIBERATELY NOT IN THIS SYSTEM

To keep this clear: the following are **out of scope** for this spec and live in other documents.

- Colour values and CSS tokens → **Colour System v1.0**
- Typography scale and font rules → **Typography System v1.0**
- Avatar accent sets and switching behaviour → **Avatar Accent System v1.0**
- Motion timing and animation specs → **Design Brief Handoff / Avatar Motion & Presence Rules**
- Card frame anatomy → **Card Frame System v1.0**
- Emblem geometry and production → **Avatar Emblem System / Emblem & Glyph Production Brief**
- Surface-level layout specs (Codex, Journal, Profile, etc.) → **Component Specs #126–#131**

---

*Majestic — Design System v1.0 — Spacing, Components & Icons*
*Your adventure. But Majestic.*
