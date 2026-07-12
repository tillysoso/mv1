# Majestic — Visual Identity Brief

**Version 1.0 — Designer Handoff**
*Everything a designer needs to build Majestic.*

---

## What This Document Is

This is the consolidation document for the Majestic visual identity. It does not replace the detailed reference documents — it points to them and summarises what matters most from each.

A designer picking up this brief should be able to understand the full visual system from this document and use it to locate the detailed spec for any specific decision.

---

## The Brand in One Paragraph

Majestic is a future-mythic intuition coaching app built for people who think in systems, escape into worlds, and have never trusted anything they can't explain — until now. It uses tarot as a symbolic coaching tool delivered through four interpretive companions in a near-future world called Threshold City. The visual identity communicates premium, world-specific depth to an audience that overlaps across anime-spiritual, tabletop-lore, and occult-esoteric subcultures. It never announces its references. It simply speaks the visual language those audiences already live in.

*Your adventure. But Majestic.*

---

## 01 — Brand Constant

**Majestic purple: `#9500FF`**

This colour is non-negotiable. It belongs to Luke — the founder — and to the brand. It appears as the base layer beneath every elemental gradient wash. The brand is always present underneath the world.

The wordmark is Luke's chosen script font — locked and non-negotiable. It appears as the brand name only. Never for any other copy purpose.

**Reference:** Brand Voice Document, PRD v3.0

---

## 02 — The World

**Threshold City — future-mythic luminous eco-tech folklore.**

A near-future city that never fully severed itself from water, weather, plant life, ritual, or memory. Technology is woven into the environment — signal systems, circuit infrastructure, shrine-like terminals, botanical overgrowth pushing through concrete and glass.

**Light quality:** Pre-dawn or dusk — the threshold hour. Never full dark. Never full day. The specific light where deep blue still holds in the sky and amber warmth has begun at the horizon. Intuition lives in threshold moments. The world reflects that.

**Cyberpunk DNA:** Present but never announced. It lives in the signal line borders, the reflective surfaces, the circuit trace language. Not in heavy neon saturation or obvious genre signalling.

**Core motifs:** Rain on glass, canal reflections, rooftop pools, botanical overgrowth integrated into architecture, signal lines and wayfinding marks, shrine-like architectural thresholds, pre-dawn amber and deep blue.

**Reference:** Threshold City World Spec

---

## 03 — Colour System

**Full hex values, gradient wash system, CSS tokens:** Majestic Colour System v1.0

### Key values

| Role | Hex |
|------|-----|
| Majestic purple | `#9500FF` |
| Primary background | `#1A1A2E` |
| Secondary surface | `#16213E` |
| Primary text | `#F0EDE8` |
| Secondary text | `#A8A8B8` |

### The gradient wash system

Luke's gradient wash sits over card art and portal surfaces as a photographic filter — always edge-weighted, never obscuring the focal point. The Majestic purple base is always present at 8% opacity. The elemental accent washes over it per avatar.

### The four elemental accents

| Avatar | Primary | Secondary | Tertiary |
|--------|---------|-----------|----------|
| Casper / Fire | `#C94B2C` | `#E8603A` | `#D4A843` |
| Destiny / Water | `#2A7B8C` | `#4DBFCC` | `#5B6FA8` |
| Eli / Air | `#A8B4C8` | `#6ECFCF` | `#9B8FBF` |
| Olivia / Earth | `#5C6B3A` | `#A85C3A` | `#C49A4A` |

---

## 04 — Typography

**Full type scale, usage contexts, implementation code:** Majestic Typography System v1.0

### The four registers

| Register | Font | Role |
|----------|------|------|
| Wordmark | Luke's script (locked) | Brand name only |
| Display | Cinzel | Card titles, headers, ceremonial moments |
| Body | Montserrat | All reading copy, interface text, avatar voice |
| Terminal | Space Mono | Onboarding command-line sequence only |

### Key principle

Cinzel and the wordmark script are in contrast — the script is warm and personal, Cinzel is precise and architectural. Montserrat bridges them. The three fonts coexist because each knows its role.

---

## 05 — Avatar System

**Full visual rules, Loish painterly style, three states per avatar:** Avatar Visual Rule Sheet, Avatar Midjourney Prompt Library

### The four companions

| Avatar | Element | Heritage | Accent | Prop |
|--------|---------|----------|--------|------|
| Casper | Fire | Mediterranean / South American | Ember red | Saga by Brian K. Vaughan — margins full of arguments |
| Eli | Air | East Asian | Pale silver | Tiny Rider Waite Fool card — edges worn soft |
| Olivia | Earth | Eastern European, warm olive skin | Moss | A locket — worn hinge, never explained |
| Destiny | Water | Black, natural hair | Teal | Tablet — always lit, always within reach |

### Visual principle

70% human and lived-in / 20% ethereal / 10% unmistakably divine. World-made not heaven-made. Their power comes from what they have been through, not from perfection.

### The Pixel Elder

A hidden pixel art character — 16-bit style, approximately 48×64px, deliberately incongruous with the Loish world. She is Majestic made visible. Never named. Never announced. Appears at specific trigger moments. Full spec in Pixel Elder Character Spec.

---

## 06 — Portal System

**Full portal states, motion behaviour, aura rules:** Avatar Motion & Presence Rules, Aura Treatment Rules & App States

### Two states

**Threshold** — the full portal arch. User is crossing into the avatar's world. Used for avatar selection, reading initiation, milestone reveals, onboarding.

**Signal** — ambient presence. Arc fragment at screen edge. Used for daily draw, reading screen, journal, navigation.

### The arch geometry

Directly echoes the Majestic master emblem threshold form. Two vertical signal traces rising, connected by a curved bridge at the top. The card frame arch uses the same geometry. One visual language across the entire system.

---

## 07 — Emblem System

**Full geometry, scale behaviour, rendering rules, production requirements:** Avatar Emblem System v1.0, Emblem & Glyph Production Brief v1.0

### The five emblems

| Emblem | Avatar | Geometry |
|--------|--------|----------|
| Ignition Crest | Casper / Fire | Upward arrow/flame — 3 nodes |
| Broadcast Crest | Eli / Air | Broadcast rings — 5 nodes |
| Foundation Crest | Olivia / Earth | Root system downward — 6 nodes |
| Resonance Crest | Destiny / Water | Wave arcs with bridges — 4 nodes |
| Convergence Crest | Majestic master | Threshold gateway — 5 nodes, all four avatar accents |

### Shared rules

Circular boundary, circuit trace aesthetic, consistent stroke weight and node size. Must read at 24px. Monochrome base — colour applied on top.

---

## 08 — Card Frame System

**Full anatomy, production requirements, elemental variants:** Card Frame System v1.0

### The frame in one sentence

Brushed metal rectangle with a subtle Majestic purple iridescence, inner circuit trace border with eight node points, an arch threshold at the top, illustration window with elemental gradient wash, and information zones for card name, number, suit indicator, and element bar.

### Key decisions locked

- Outer boundary: 12–16px brushed metal, `#3A3A4A` base with `#9500FF` at 12% overlay
- Corner radius: 8px
- Arch: inside the frame, 70% card width, directly echoes the portal system
- Illustration: contained inside the arch — never full bleed
- Element bar: the one fully saturated line in the frame — avatar accent colour
- Card back: master emblem centred, Majestic purple gradient wash, no elemental accent

---

## 09 — Motion System

**Full motion rules, card states, timing, elemental skins:** Design Brief Handoff, Avatar Accent System, Avatar Motion & Presence Rules

### Core principle

Motion is ritualistic, not decorative. Every animated moment supports anticipation, reveal, or emotional tone. Never novelty alone.

### The living signal layer

Subtle animated overlay — emblem pulse, reflection sweep, atmospheric particles, card lift, glyph trace. Makes the deck feel alive without competing with the art.

### The anticipation build

Shuffle gather → jump card spike → hold state peak → reveal release → card context aura settle. One continuous gesture across the reading ritual.

---

## 10 — The Glyph System

**Full categories, production requirements, naming convention:** Emblem & Glyph Production Brief v1.0

Three categories: elemental seals (four, used in card art and codex), signal markers (UI micro-detail), Major Arcana sigils (22, one per card, abstractly readable).

---

## Reference Document Index

| Document | What it defines |
|----------|----------------|
| PRD v3.0 | Product vision, audience, strategy, success criteria |
| Brand Voice Document | Brand line, voice personality, avatar personas, sample lines |
| Design System — Future-Mythic Companion Framework | Visual language, composition rules, AI generation rules |
| Design Brief Handoff | Motion system, card states, elemental motion skins, AR direction |
| Avatar Visual Rule Sheet | Avatar appearance principles, what to avoid |
| Threshold City World Spec | Base UI world — full environment, motion, component behaviour |
| Avatar Accent System | Four accent sets, switching behaviour, CSS token structure |
| Colour System & Hex Confirmation | All hex values, gradient wash system, CSS tokens |
| Typography System | Four registers, full type scale, Google Fonts implementation |
| Onboarding Narrative v2 | Three-phase onboarding — 12 screens, all copy, motion notes |
| Avatar Midjourney Prompt Library | Locked prompts for all four avatars — three states each |
| Avatar Emblem System | Five signal crests — geometry, scale, rendering rules |
| Emblem & Glyph Production Brief | Production file requirements, naming convention, delivery structure |
| Avatar Motion & Presence Rules | Two portal states, four avatar motion vocabularies |
| Aura Treatment Rules & App States | Card context aura shifts, avatar presence across all surfaces |
| Card Frame System | Full frame anatomy, production requirements, elemental variants |
| Pixel Elder Character Spec | Hidden Easter egg character — trigger moments, prop system, dev integration |

---

## What a Designer Needs to Begin

### Immediately actionable
Everything in this brief is defined and ready to build. A designer can begin:

- Avatar portrait generation — prompts in Avatar Midjourney Prompt Library
- Emblem design — geometry in Avatar Emblem System, production spec in Emblem & Glyph Brief
- Card frame design — full spec in Card Frame System
- Typography implementation — full spec in Typography System
- Colour system implementation — full spec in Colour System & Hex Confirmation
- Onboarding screen design — full spec in Onboarding Narrative v2

### Pending designer input
- Avatar reference illustration approval — Midjourney renders need to be run and approved before card generation begins
- Luke's script font file — needs to be supplied in WOFF2 format for web implementation
- Final card frame visual — the spec is defined, the designer produces the actual frame artwork

### Not in scope for first release
- Full environmental variation per avatar — one world, four accents only
- AR features
- Avatar clothing marketplace
- Full 78-card deck on day one — prioritise Major Arcana and one complete suit
- Avatar Easter egg emblems — v2 scope

---

*Majestic — Visual Identity Brief — v1.0 — Designer Handoff*
*Your adventure. But Majestic.*
