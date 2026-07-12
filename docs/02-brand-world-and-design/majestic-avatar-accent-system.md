# Majestic — Avatar Accent System

**Version 1.0 — First Release**
*Your adventure. But Majestic.*

---

## Overview

All users live inside the same Threshold City world. What changes per avatar is the accent system — a single dominant colour set applied to specific interaction and identity moments in the UI.

The accent is the user's elemental signature inside the world. It should feel personal and specific without requiring a separate visual environment to be built and maintained.

---

## Core Principle

**One world. Four accents.**

The accent fires on:
- Selected card borders
- Active navigation states
- Glyph traces and signal lines
- Avatar emblem colour
- Particle effects and elemental motion skins
- Interaction confirmation moments
- Onboarding avatar reveal

Everything else — backgrounds, typography, panels, world atmosphere — remains constant across all four avatars.

---

## What Changes Per Avatar

| Element | Changes | Stays constant |
|---------|---------|----------------|
| Card selected border | Avatar accent colour | Border weight and style |
| Active navigation | Avatar accent colour | Navigation structure |
| Avatar emblem | Avatar accent colour | Emblem shape and position |
| Particles and motion | Elemental motion skin | Timing and motion grammar |
| Glyph traces | Avatar accent colour | Glyph system and logic |
| Interaction confirmation | Avatar accent colour pulse | Animation duration |
| Onboarding reveal | Avatar accent colour bloom | Reveal sequence structure |

---

## The Four Accent Sets

---

### Casper — Fire

**Element:** Fire
**UI Theme:** Threshold City — ember register
**Light quality:** Ember warmth at the horizon, the city not yet awake

| Accent Role | Colour | Notes |
|-------------|--------|-------|
| Primary accent | Ember red | `#C94B2C` — primary interactive moments |
| Secondary accent | Electric coral | `#E8603A` — hover states, secondary glows |
| Tertiary accent | Heated gold | `#D4A843` — emblem detail, milestone moments |
| Particle colour | Ember red to heated gold | Upward drift, spark motion |

**Elemental motion skin:**
- Ember sparks drifting upward
- Flare pulse on card wake-up
- Upward current on hold state
- Heat shimmer at card edges at rest

**Environment cue in Casper UI:**
- Amber horizon warmth visible at background edges
- Signal lights in warm ember tones at distance
- Slight heat distortion on card surfaces at rest

**Character in the UI:**
Casper's accent fires fast and precisely. Interactions feel immediate and decisive — the border completes quickly, the glow is tight not diffuse, the particle motion goes upward with purpose. The UI reflects his mode: catalytic, direct, no lingering.

---

### Destiny — Water

**Element:** Water
**UI Theme:** Threshold City — reflective register
**Light quality:** Pre-dawn canal light, mist on still water, cool luminescence

| Accent Role | Colour | Notes |
|-------------|--------|-------|
| Primary accent | Teal | `#2A7B8C` — primary interactive moments |
| Secondary accent | Moon cyan | `#4DBFCC` — hover states, surface glows |
| Tertiary accent | Reflective blue-violet | `#5B6FA8` — depth moments, soul card register |
| Particle colour | Moon cyan to blue-violet | Drifting, ripple motion |

**Elemental motion skin:**
- Ripple rings expanding outward from touch points
- Refracted light shimmer on card surface
- Mist bloom on hold state — particles drift and dissolve
- Slow luminescent pulse at rest

**Environment cue in Destiny UI:**
- Canal reflection quality in background surfaces
- Cool moisture in the air — mist layer at screen depth
- Water light — that specific blue-white that bounces off still water in low light

**Character in the UI:**
Destiny's accent moves slowly and with depth. Interactions feel like dropping something into still water — the response radiates outward rather than firing immediately. The glow is diffuse and cool. Nothing rushes. The UI reflects her mode: holding, patient, emotionally present.

---

### Eli — Air

**Element:** Air
**UI Theme:** Threshold City — signal register
**Light quality:** Pre-dawn luminescence, the specific clarity before the city wakes, silver at the edges of things

| Accent Role | Colour | Notes |
|-------------|--------|-------|
| Primary accent | Pale silver | `#A8B4C8` — primary interactive moments |
| Secondary accent | Luminous aqua | `#6ECFCF` — hover states, signal glows |
| Tertiary accent | Soft lilac | `#9B8FBF` — depth moments, pattern register |
| Particle colour | Silver to luminous aqua | Drifting, directional, glyph-like |

**Elemental motion skin:**
- Signal arcs tracing directional paths
- Glyph fragments assembling and dissolving
- Soft luminous drift on hold state
- Subtle asymmetrical shimmer at rest — like interference in a signal

**Environment cue in Eli UI:**
- Silver light at the edges of panels — the quality of light before dawn fully breaks
- Signal line details more visible than in other accent sets — Eli's world has more visible information architecture
- Slight luminous haze — the air itself seems to carry data

**Character in the UI:**
Eli's accent is the most precise and the most layered. Interactions reveal information — a glyph traces, a pattern assembles, a signal line draws itself. The motion feels intelligent rather than emotional. The UI reflects his mode: interpretive, pattern-aware, always a step ahead.

---

### Olivia — Earth

**Element:** Earth
**UI Theme:** Threshold City — grounded register
**Light quality:** Early dusk warmth, the amber quality of light that makes things look solid and real

| Accent Role | Colour | Notes |
|-------------|--------|-------|
| Primary accent | Moss | `#5C6B3A` — primary interactive moments |
| Secondary accent | Rust | `#A85C3A` — hover states, worn detail |
| Tertiary accent | Amber clay | `#C49A4A` — warmth moments, milestone register |
| Particle colour | Moss to amber clay | Grounded, settling downward motion |

**Elemental motion skin:**
- Root-line growth tracing outward from touch points
- Dust motes settling on hold state
- Grounded pulse at rest — like a slow heartbeat in the earth
- Botanical detail emerging on significant moments — a leaf edge, a root curl

**Environment cue in Olivia UI:**
- Botanical overgrowth more present and visible than in other accent sets
- Warmer amber quality in the background light
- Surfaces feel more textured — the grain and wear of the world is more evident

**Character in the UI:**
Olivia's accent is the warmest and the most grounded. Interactions feel like something settling into place rather than firing. The motion is slower and more deliberate. The botanical details emerge with purpose. The UI reflects her mode: steady, practical, patient, durable.

---

## Accent Application Rules

### Where accent colour appears
- Selected card border — thin, precise, signal-line weight
- Active navigation element — emblem and tab indicator
- Avatar emblem — fills with accent on active state
- Glyph trace — draws in accent colour during hold state
- Particle effects — elemental motion skin in accent palette
- Interaction confirmation — brief accent pulse on significant actions
- Onboarding reveal — accent colour blooms for first time on screen 06

### Where accent colour never appears
- Background surfaces — always world neutrals
- Typography — always bone white, mist grey, or neutral tones
- Panel borders — always world neutrals unless specifically selected state
- Loading states — world atmosphere only, accent does not intrude

### Accent intensity rules
- Never saturated to full opacity in the UI layer — always slightly atmospheric, as if the colour exists inside the world not on top of it
- Cards can carry more saturated accent in their art — the UI accent is the restrained version of the same colour
- On dark backgrounds accent reads warmer and more present — calibrate per surface

---

## Switching Between Accents

When a user switches avatar the accent transition should feel like crossing into a different part of the same city — not like changing apps.

**Transition behaviour:**
- Current accent fades — particles dissolve, glows cool
- World atmosphere briefly returns to neutral — a beat of pure Threshold City base
- New accent blooms in — particles gather in new elemental motion skin, emblem recolours, borders shift
- Duration: 600–800ms total — unhurried but not slow

**What stays constant during switch:**
- World environment — no change to backgrounds or atmosphere
- Typography — no change
- Panel structure — no change
- Card art — no change
- Motion grammar — timing and interaction logic stays constant, only the elemental skin changes

---

## Accessibility Considerations

- All four accent colours must meet WCAG AA contrast ratio against the obsidian background
- Accent colour alone should never be the only signal of an interactive state — always paired with shape, position, or motion cue
- Reduced motion setting: elemental particle effects and ambient shimmer disabled, accent colour and border states remain
- Colour blind consideration: accent sets should be distinguishable by hue and temperature difference as well as saturation — test all four in greyscale

---

## First Release Scope

All four accent sets ship with v1. The technical implementation is a single theme variable set — one colour token swap per avatar. No separate component builds required.

**Token structure per avatar:**
- `--accent-primary`
- `--accent-secondary`
- `--accent-tertiary`
- `--accent-particle-start`
- `--accent-particle-end`
- `--motion-skin` — references the elemental motion skin preset

---

*Majestic — Avatar Accent System — v1.0*
*Your adventure. But Majestic.*
