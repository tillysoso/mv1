---
name: web-typography
description: Select, pair, and implement typefaces for web projects. Use when the user mentions "font pairing", "which typeface", "line height", "responsive typography", "web font loading", "type hierarchy", "variable fonts", or "typographic scale". Also trigger when choosing between system fonts and web fonts, or optimizing font loading performance.
metadata:
  author: wondelai
  version: "1.2.0"
---

# Web Typography

A practical guide to choosing, pairing, and implementing typefaces for the web. Typography serves communication — the best typography is invisible.

## Core Principle

**Typography is the voice of your content.** The "clear goblet" principle: typography should be like crystal-clear glass — the focus is on the wine (content), not the glass (type).

**Readers don't read, they scan.** Eyes jump 7–9 characters at a time (saccades). Good typography supports this natural pattern.

## Scoring

**Goal: 10/10.** Rate typography implementations 0-10 against these principles.

## Two Contexts for Type

| Context | Purpose | Priorities |
|---------|---------|------------|
| **Type for a moment** | Headlines, buttons, navigation | Personality, impact, distinctiveness |
| **Type to live with** | Body text, articles, documentation | Readability, comfort, endurance |

## Framework

### 1. Optimal Reading Measurements

Three measurements matter more than typeface choice:

- **Font size**: 16px minimum; prefer 18px for reading-heavy sites
- **Line length**: 45–75 characters ideal (65ch optimal) — use `max-width: 65ch`
- **Line height**: 1.4–1.8 for body text; 1.1–1.25 for headlines

```css
.prose {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  line-height: 1.6;
  max-width: 65ch;
}
```

### 2. Evaluating Typefaces

Before choosing, verify:
- **Adequate x-height** (larger = better screen readability)
- **Open counters** on a, e, c shapes
- **Distinct letterforms**: Il1 and O0 must be clearly different
- **Multiple weights**: at minimum regular, bold, italic
- **Test at actual use sizes** — never at specimen sizes only
- **Test with real content**, not Lorem ipsum

### 3. Choosing Typefaces

- Define the job first: body text, headlines, and UI may each need different faces
- Match tone to content — a financial report needs different type than a bakery menu
- Safe body text starting points: Georgia, Source Serif Pro, Charter (serif); Inter, Source Sans Pro, IBM Plex Sans (sans-serif)

### 4. Pairing Typefaces

Successful pairings create **clear contrast** — faces should be obviously different, not confusingly similar.

**Two fonts maximum**. Contrast types:
- Structure: serif + sans-serif (classic)
- Same designer: FF Meta + FF Meta Serif
- Superfamilies: Roboto + Roboto Slab

```css
h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }
body { font-family: 'Source Sans Pro', -apple-system, sans-serif; }
```

### 5. Type Scale (Modular)

Use a ratio (1.25 = Major Third, 1.333 = Perfect Fourth):

| Step | Size (1.25x) |
|------|-------------|
| xs | 0.64rem |
| sm | 0.8rem |
| base | 1rem (16px) |
| lg | 1.25rem |
| xl | 1.563rem |
| 2xl | 1.953rem |
| 3xl | 2.441rem |

### 6. Hierarchy

Three levers: **size, weight, color**. Vary one or two between adjacent levels.

```css
h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3rem); font-weight: 700; color: #111; }
h2 { font-size: clamp(1.5rem, 1.25rem + 1vw, 2rem); font-weight: 600; }
body { font-size: 1rem; font-weight: 400; color: #333; }
.secondary { font-size: 0.875rem; color: #666; }
```

### 7. Responsive Typography & Performance

```css
/* Fluid type */
body { font-size: clamp(1rem, 0.9rem + 0.5vw, 1.25rem); }
h1 { font-size: clamp(2rem, 1.5rem + 2vw, 3.5rem); }

/* Performant loading */
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF;
}
```

**Performance budget**: under 200KB total web font payload. Use WOFF2, subset aggressively, prefer variable fonts.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Text feels cramped | Increase line-height to 1.6+ |
| Lines too long | Add `max-width: 65ch` |
| Fonts loading slowly | Subset + `font-display: swap` + preload |
| Body text too small | Increase to 18px |
| Typefaces clash | Simplify to one family, or ensure structural contrast |

## Quick Diagnostic

| Question | If No → Action |
|----------|----------------|
| Is body text 16px or larger? | Increase to at least 16px |
| Is line length under 75 characters? | Add `max-width: 65ch` |
| Is line height 1.4+ for body? | Increase to 1.5–1.7 |
| Is total font payload under 200KB? | Subset, use WOFF2 |
| Are fallback fonts specified? | Add system font fallbacks |
| Does page work at 200% zoom? | Fix overflow and truncation |

## Reference

Based on *On Web Typography* by Jason Santa Maria. See also Refactoring UI for overall type hierarchy in UI design.
