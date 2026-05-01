# Majestic — Typography System

**Version 1.0 — First Release**
*Your adventure. But Majestic.*

---

## Overview

The Majestic type system uses four distinct typographic registers. Each belongs to a specific context and carries a specific emotional quality. They do not compete — they form a hierarchy that serves the world.

---

## The Four Registers

| Register | Font | Use |
|----------|------|-----|
| Wordmark | Luke's script (locked, non-negotiable) | Brand name only — Majestic wordmark |
| Display | Cinzel | Card titles, Major Arcana names, section headers, ceremonial moments |
| Body | Montserrat | All reading copy, interpretation text, avatar voice, interface text |
| Terminal | Space Mono | Onboarding command-line sequence only |

---

## 01 — Wordmark — Luke's Script

**Status:** Locked. Non-negotiable.

The handwritten script Luke selected for the Majestic wordmark. Warm, personal, human. Carries Luke's story and presence.

**Usage:**
- The Majestic wordmark — always and only
- Never used for any other copy in the app
- Never used for card titles, navigation, or body copy
- The one place the brand voice is literally handwritten

**Colour:** `#9500FF` Majestic purple on dark backgrounds. Bone white `#F0EDE8` on purple or coloured backgrounds.

---

## 02 — Display — Cinzel

**Google Fonts:** Available free — `font-family: 'Cinzel', serif`

**Why Cinzel for this audience:**
Cinzel is geometric and architectural — built on classical Roman proportion but with a precision that reads as designed not ancient. It lives in the visual vocabulary of the tabletop and lore audience already — present in game titles, rulebooks, and world-building materials they already love. The anime-spiritual audience reads it as ceremonial and world-specific. The occult-esoteric audience finds it credible and serious.

It does not try too hard. It simply exists with confidence.

**Weights used:**
- Cinzel Regular (400) — card subtitles, section labels, secondary display
- Cinzel SemiBold (600) — card titles, Major Arcana names
- Cinzel Bold (700) — hero moments, section headers, milestone reveals

**Letter spacing:** Always tracked. Minimum 0.05em, typically 0.1–0.15em for display use. Cinzel breathes with space.

**Usage contexts:**

| Context | Weight | Size | Tracking | Case |
|---------|--------|------|----------|------|
| Major Arcana card title | Bold 700 | 28–32px | 0.15em | All caps |
| Minor Arcana card title | SemiBold 600 | 22–26px | 0.12em | All caps |
| Court card title | SemiBold 600 | 22–26px | 0.12em | Title case |
| Section header | SemiBold 600 | 18–20px | 0.1em | All caps |
| Avatar name in UI | Regular 400 | 16–18px | 0.15em | All caps |
| Codex labels | Regular 400 | 12–14px | 0.2em | All caps |
| Milestone reveal | Bold 700 | 36–44px | 0.1em | All caps |

**What Cinzel never does:**
- Body copy — it is not legible at small sizes for running text
- Navigation labels — too ceremonial for functional UI
- Error messages or system copy — wrong register entirely

---

## 03 — Body — Montserrat

**Google Fonts:** Available free — `font-family: 'Montserrat', sans-serif`

**Why Montserrat for this audience:**
Montserrat is clean, modern, and carries a subtle warmth that geometric sans-serifs often lack. It shares the humanist quality of Luke's script wordmark — which means the three registers feel like they belong to the same brand rather than fighting each other. It is broadly legible at mobile sizes, which is the primary use case.

For the demographic: it reads as quality without announcing itself. Chill but considered.

**Weights used:**
- Montserrat Light (300) — supporting body copy, long-form reading text
- Montserrat Regular (400) — standard body, interface copy
- Montserrat Medium (500) — emphasis within body, avatar voice lines
- Montserrat SemiBold (600) — UI labels, navigation, button text
- Montserrat Bold (700) — strong emphasis, notification copy, pull quotes

**Usage contexts:**

| Context | Weight | Size | Line height | Notes |
|---------|--------|------|-------------|-------|
| Card interpretation — full | Light 300 | 16px | 1.7 | Long-form reading — needs room to breathe |
| Card interpretation — summary | Regular 400 | 17px | 1.6 | The first layer of reveal |
| Avatar voice lines | Medium 500 | 16–17px | 1.6 | Slight weight increase distinguishes voice from narration |
| Reflection prompts | Regular 400 | 16px | 1.65 | Conversational and open |
| Navigation labels | SemiBold 600 | 12px | — | Tracked 0.05em, functional |
| Button text | SemiBold 600 | 14–15px | — | Never all caps in buttons |
| Notification copy | Medium 500 | 15px | 1.5 | Avatar-voiced, needs slight presence |
| Metadata and labels | Regular 400 | 11–12px | — | Mist grey `#A8A8B8` |
| Empty state copy | Light 300 | 15px | 1.7 | Atmospheric, gentle |
| Onboarding body | Regular 400 | 17px | 1.65 | Generous — these screens need to breathe |

---

## 04 — Terminal — Space Mono

**Google Fonts:** Available free — `font-family: 'Space Mono', monospace`

**Why Space Mono:**
Space Mono is a monospace font with a slightly designed quality — it does not look like a default terminal font. It carries the signal-system, tech-adjacent energy of the Threshold City world without feeling like an old command prompt. The name and date of birth input screens in onboarding use this register exclusively.

**Weight:** Regular 400 only

**Usage:** Onboarding screens 02 and 03 only — the command-line terminal entry sequence for name and date of birth. Nowhere else in the app.

**Size:** 16–18px
**Colour:** `#F0EDE8` bone white — with a blinking cursor element in the avatar accent colour
**Letter spacing:** 0.05em — slightly open, feels like typed output

---

## Type Scale — Mobile First

All sizes defined for mobile base (375px viewport). Scale up proportionally for tablet and larger screens.

| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display XL | Cinzel | 44px | 700 | Milestone reveals, hero moments |
| Display L | Cinzel | 32px | 700 | Major Arcana titles |
| Display M | Cinzel | 26px | 600 | Minor Arcana titles, section headers |
| Display S | Cinzel | 18px | 400 | Avatar names, codex labels |
| Body L | Montserrat | 18px | 400 | Onboarding, key moments |
| Body M | Montserrat | 16px | 400 | Standard body, interpretation |
| Body S | Montserrat | 14px | 400 | Supporting copy |
| Label | Montserrat | 12px | 600 | Navigation, buttons, metadata |
| Micro | Montserrat | 11px | 400 | Timestamps, streak counters |
| Terminal | Space Mono | 17px | 400 | Onboarding terminal only |

---

## Typographic Principles

### Hierarchy first
The three-font system works because each font knows its role. Cinzel never descends to body copy. Montserrat never ascends to card titles. The wordmark never appears anywhere except as the brand name.

### Tracking as atmosphere
Cinzel should always be tracked — the letterforms need space to read as ceremonial rather than compressed. Montserrat at body sizes should be at default tracking — legibility is the priority.

### Line height as breathing room
The Majestic reading experience should feel unhurried. Body copy line heights are deliberately generous — 1.6–1.7. Cards are being interpreted, not skimmed.

### Colour and type together
- Display type (Cinzel) in `#F0EDE8` bone white on dark — or in avatar accent colour for highlighted moments
- Body type (Montserrat) always in `#F0EDE8` primary or `#A8A8B8` secondary — never in accent colour
- Terminal type (Space Mono) in `#F0EDE8` with cursor in avatar accent
- Wordmark in `#9500FF` Majestic purple or `#F0EDE8` bone white only — never in avatar accent colours

### What the type system never does
- Mixes more than two fonts on a single screen
- Uses decorative or script fonts beyond the wordmark
- Uses Cinzel at body size
- Uses all-caps for Montserrat body copy
- Uses accent colour for running text
- Uses the wordmark font for anything except the Majestic brand name

---

## Google Fonts Implementation

All three variable fonts are available via Google Fonts CDN:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600;700&family=Space+Mono&display=swap" rel="stylesheet">
```

```css
--font-display: 'Cinzel', serif;
--font-body: 'Montserrat', sans-serif;
--font-terminal: 'Space Mono', monospace;
```

The wordmark font file to be supplied separately by Luke — format requirements: OTF or TTF, web-optimised WOFF2 for production.

---

*Majestic — Typography System — v1.0*
*Your adventure. But Majestic.*
