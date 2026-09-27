# Majestic — Threshold City World Spec

**Version 1.0 — First Release UI**
*Your adventure. But Majestic.*

---

## Overview

Threshold City is the singular UI world for Majestic's first release. Every user lives inside it regardless of which avatar they choose. It is the visual and atmospheric foundation the entire app is built on.

What changes per avatar is the accent system only. The world itself — its light, its grammar, its motion, its surfaces — stays constant.

---

## World Philosophy

Threshold City is a near-future city that never fully severed itself from water, weather, plant life, ritual, or memory. Technology exists but it is woven into the environment — signal systems, reflective surfaces, transit infrastructure, shrine-like terminals, botanical overgrowth pushing through concrete and glass.

The cyberpunk DNA is present but never announced. A user who knows the genre will feel it immediately. A user who doesn't will simply feel like the world has a particular energy they can't quite name. That is the intent.

Intuition lives in threshold moments. The light of this world reflects that — always caught between states. Never full dark. Never full day.

---

## Light & Time

### Primary light quality
Dusk or pre-dawn. The specific threshold hour where the city is not yet fully awake or not yet fully asleep. Deep blue still present in the upper sky. Amber and ember warmth at the horizon line and in reflected surfaces below.

This light quality is non-negotiable. It communicates:
- Liminal state — between knowing and not knowing
- Safety — not darkness, not exposure
- Possibility — the day or night is about to shift

### Light behaviour
- Surfaces catch and hold light — wet pavement logic, glass and water reflections
- Light sources are ambient and environmental, not harsh or clinical
- Neon-adjacent warmth exists at distance — signal lights, transit markers, shrine lanterns — never dominating the foreground
- Avatar accent colour is the only saturated light source in the immediate UI layer

### What this is not
- Full darkness or gothic night atmosphere
- Harsh clinical bright white
- Midday clarity
- Golden hour warmth — too soft, too resolved

---

## Environment & World Grammar

### Core motifs present in all surfaces
- Rain on glass — background texture, loading states, ambient atmosphere
- Canal and rooftop pool reflections — card backs, reading screen backgrounds
- Signal lines and wayfinding markers — UI borders, glyph traces, navigation
- Botanical overgrowth integrated into architecture — vines, moss, roots pushing through surfaces
- Shrine-like terminal interfaces — framing system for cards and reading panels
- Transit infrastructure — platforms, passages, threshold architecture

### Surface texture
- Soft grain and noise on dark backgrounds — never flat black
- Mist and atmospheric haze at depth
- Reflective layer beneath primary content — subtle, like looking through glass at something below
- Botanical intrusion as a recurring detail — a root at the corner of a panel, moss at the edge of a frame

### What belongs in background layers
- Environmental world — rain, mist, botanical elements, distant city light
- Avatar emblem — present but peripheral, never competing with content

### What belongs in foreground layers
- Cards
- Reading content
- Avatar presence
- Navigation and interaction elements

---

## Colour System

### Base neutrals — universal across all avatar themes

| Role | Description | Usage |
|------|-------------|-------|
| Obsidian | Near-black with blue undertone | Primary background |
| Charcoal graphite | Dark mid-tone | Secondary surfaces, panels |
| Ash stone | Mid grey | Tertiary surfaces, dividers |
| Mist grey | Light grey | Inactive states, metadata |
| Bone white | Warm off-white | Primary text, card titles |

### Atmospheric constants — universal across all avatar themes

| Name | Description | Usage |
|------|-------------|-------|
| Moon silver | Cool luminous silver | Ambient glow, inactive emblems, moon phase markers |
| Rain blue | Desaturated blue | Background mist, water reflection layer |
| Moss green | Muted organic green | Botanical detail, environmental texture |
| Brass gold | Warm tarnished gold | Threshold architectural details, shrine elements |

### Avatar accent — the only element that changes per user
One dominant accent colour per avatar. Applied to:
- Selected card borders
- Active navigation states
- Glyph traces and signal lines
- Avatar emblem
- Particle effects and elemental motion
- Interaction confirmation moments

Full accent system defined in the companion document: **Majestic — Avatar Accent System.**

---

## Typography

### Principles
- Titles: ceremonial, precise, literary — weighted and intentional
- Body: clear, grounded, mobile-optimised — never decorative
- System labels: codex-like — tracked uppercase, small caps energy
- Terminal register: monospace — used exclusively for the onboarding command-line sequence

### Type roles

| Role | Style | Usage |
|------|-------|-------|
| Display | Refined serif or semi-serif, heavier weight | Card titles, Major Arcana names, section headers |
| Body | Highly legible sans-serif | Interpretations, avatar copy, interface text |
| Label | Tracked uppercase sans | Metadata, codex markers, suit labels, system states |
| Terminal | Monospace | Onboarding entry screens only |

### Type colour
- Primary text: Bone white on dark surfaces
- Secondary text: Mist grey
- Accent text: Avatar accent colour — used sparingly, for moments of significance only
- Never pure white — always warm or cool off-white that sits inside the world

### What to avoid
- Faux-archaic or calligraphic fonts
- Anything that reads as overtly mystical or occult-coded
- Fonts that belong to a specific franchise or genre

---

## Motion System

### Core principle
Motion is ritualistic, not decorative. Every animated moment supports anticipation, reveal, or emotional tone. Never novelty alone.

### The living signal layer
The signature motion system. A subtle animated overlay across all card surfaces and key UI moments:
- Faint emblem pulse at rest
- Reflection or glow sweep on interaction
- Small atmospheric particles — element-specific per avatar accent
- Slight card lift or settle on selection
- One directional glyph trace or signal line on hold

### Transition philosophy
Screen transitions feel like threshold crossings — doors opening, not pages sliding. The world persists across transitions. Content arrives into the world rather than replacing it.

### Motion timing

| Moment | Duration |
|--------|----------|
| Touch feedback | 120–180ms |
| Card wake-up | 220–320ms |
| Reveal transition | 350–500ms |
| Ambient loops | 3–8 seconds, asymmetrical |
| Screen transitions | 400–600ms |

### Card states

| State | Behaviour |
|-------|-----------|
| Rest | Faint ambient shimmer, breathing pulse — card feels alive |
| Touch-down | Small lift, emblem wake-up, localised avatar accent glow |
| Hold | Atmosphere intensifies, particles gather, glyph trace forms |
| Reveal | Card expands with continuous signal path into reading screen |
| Settled | Motion softens into quiet pulse or stillness |

### Where motion appears
Motion is reserved for ritual moments only:
- Daily draw
- Card selection
- Avatar switching
- Reading reveal
- Milestone unlocks
- Significant reflection completions
- Onboarding threshold crossings

### What motion never does
- Animates for novelty
- Competes with card art or reading content
- Loops visibly and repetitively in a way that draws attention to itself
- Feels like a game UI or notification system

---

## UI Component Behaviour

### Cards
- Dark neutral base with one dominant avatar accent
- Border fires on selection — thin signal line in avatar accent colour
- Thumbnail readable at mobile scale — composition and silhouette take priority
- Card back universal — world motif only, no element or suit reveal

### Panels and reading surfaces
- Framed like codex panels or shrine tablets — not generic app containers
- Soft glow dividers rather than hard borders
- Layered surfaces — fog, reflection, subtle grain beneath content
- Environmental world cue visible in background — rain glass, mist, rooftop atmosphere

### Navigation
- Minimal chrome — the world should not be obscured by UI furniture
- Elemental tabs for avatar switching — avatar emblem in accent colour
- Active states fire in avatar accent colour
- Inactive states in mist grey

### Avatar presence
- Avatar emblem is always present — small, peripheral, never dominating
- Full avatar figure appears only on reading screen, onboarding reveal, and milestone moments
- Avatar presence scales: emblem only / partial silhouette / full presence
- Never competes with card content

### Empty states and loading
- Not dead screens — every loading moment is a world-building beat
- Rain on glass, signal pulse, botanical detail, atmospheric haze
- Brief copy in brand voice — atmospheric, never corporate
- Examples: *The signal is finding you.* / *The pattern is forming.* / *Almost there.*

---

## Surfaces & Theme Application

| Surface | Primary atmosphere | Notes |
|---------|--------------------|-------|
| App store and marketing | Threshold City — world entry | Pre-entry myth layer — implies world, does not explain product |
| Onboarding Phase 1 | Threshold City — terminal register | Command-line aesthetic, monospace, signal energy |
| Onboarding Phase 2 | Threshold City — deeper, richer | World opens as profile is revealed |
| Onboarding Phase 3 | Threshold City — avatar accent blooms | Avatar world bleeds in during companion confirmation |
| Daily draw | Threshold City — ambient | Avatar emblem present, world-state background |
| Reading screen | Threshold City — immersive | Full world presence, avatar more visible, living signal layer active |
| Deck browser and codex | Threshold City — archival | Cooler, more structural, codex logic |
| Journal and reflection | Threshold City — quieter | Mist and water quality, Folklore Signal influence |
| Profile and settings | Threshold City — minimal | World present but restrained, content leads |

---

## What Threshold City Is Not

- Full cyberpunk saturation — no heavy neon grids, no scan lines, no Blade Runner imitation
- Gothic or dark — never conveys darkness as a mood, only as a time of day
- Generic fantasy — no stars, moons, or celestial clichés as primary motifs
- Wellness app — no soft gradients, pastel tones, or affirmation-coded visual language
- Game UI — no health bars, XP meters, or obviously gamified chrome

---

## First Release Scope

For first release, Threshold City is implemented as the complete and only world. The four avatar themes exist as accent variations within this world — not as separate environments.

What ships in v1:
- Full Threshold City base world
- Four accent colour sets — one per avatar
- Living signal layer with four elemental motion skins
- Universal card frame system
- Core ritual surfaces — onboarding, daily draw, reading screen, deck browser, profile

What is scoped for future releases:
- Full environmental variation per avatar theme
- AR features
- Seasonal or time-based world shifts
- Expanded codex surfaces

---

*Majestic — Threshold City World Spec — v1.0*
*Your adventure. But Majestic.*

---

## Avatar Portal System

Avatar presence in the app is delivered through portals — thresholds between the user's world and the avatar's. The user is never looking at an avatar placed on a screen. They are looking through an opening into where the avatar exists.

Two portal shapes are used in different contexts:

**The Arch** — significant moments. Avatar selection, reading initiation, milestone reveals, first session. Echoes the gateway geometry of the Majestic master emblem.

**The Living Circle** — daily presence. Daily draw, reading screen ambient, post-reading reflection. Intimate, not theatrical.

Portal edges carry the avatar's elemental accent — particles, glow, and circuit trace boundary in the avatar's colour set. They are never perfectly still.

Avatar presence scales across three states:
- **Emblem only** — navigation, streak counters, metadata
- **Portrait crop through living circle** — daily draw, reading screen ambient
- **Full portrait through arch** — onboarding reveal, avatar selection, milestone moments

Full portal system, edge treatments per avatar, arrival and exit animations, and presence by app state are defined in the Avatar Motion Rules & Presence Spec document.

