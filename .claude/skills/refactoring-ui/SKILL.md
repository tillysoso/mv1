---
name: refactoring-ui
description: Apply visual design principles for professional UI without a designer. Use when reviewing frontend code, designing components, or advising on visual improvements. Trigger on questions about hierarchy, spacing, typography, color systems, shadows, or layout. Score UI designs 0-10 against these principles.
metadata:
  author: wondelai
  version: "1.0.0"
---

# Refactoring UI

A practical, opinionated approach to UI design. Apply these principles when generating frontend code, reviewing designs, or advising on visual improvements.

## Core Principle

**Design in grayscale first. Add color last.** This forces proper hierarchy through spacing, contrast, and typography before relying on color as a crutch.

**The foundation:** Great UI isn't about creativity or talent -- it's about systems. Constrained scales for spacing, type, color, and shadows produce consistently professional results. Start with too much white space, then remove.

## Scoring

**Goal: 10/10.** Rate UI designs 0-10 based on adherence to the principles below. Always provide the current score and specific improvements needed to reach 10/10.

## The 7 Principles

### 1. Visual Hierarchy

Not everything can be important. Create hierarchy through **size, weight, and color** — but use only one or two levers between adjacent levels.

- Labels are secondary — de-emphasize them (smaller, lighter, uppercase-small)
- Save "all three levers at max" for the single most important element
- Semantic color ≠ visual weight (a muted red secondary button is often better than screaming danger)

| Context | Technique |
|---------|-----------|
| Form fields | Small uppercase label above large value text |
| Navigation | Active link dark-gray-900, inactive gray-500 |
| Dashboards | Key metric large, context small |

### 2. Spacing & Sizing

Use a **constrained spacing scale**: 4, 8, 16, 24, 32, 48, 64px. Spacing between groups > spacing within groups.

- Start with too much white space, then remove
- Text blocks: `max-w-prose` (~65ch)
- Forms: max 300–500px wide
- Full-width is almost never right for content

### 3. Typography

Use a **modular type scale** (1.25 ratio): 12, 14, 16, 20, 24, 30, 36px.

- Headings: tight line height (1.0–1.25)
- Body text: relaxed line height (1.5–1.75)
- Two fonts maximum; avoid weights below 400 for body text
- Bold (600–700) for emphasis only

| Context | Rule |
|---------|------|
| Hero headline | 36px, line-height 1.1, bold |
| Body text | 16px, line-height 1.75, normal |
| Captions | 12–14px, medium gray |

### 4. Color

**Build a systematic palette** with 5–9 shades per color.

- The darkest shade ≠ pure black — use 900-level dark grays (#111827)
- Pure grays look lifeless — add subtle saturation (cool: blue tint; warm: brown tint)
- HSL adjustments: lighter = higher lightness + lower saturation; darker = lower lightness + higher saturation
- Body text minimum 4.5:1 contrast; large text (18px+) minimum 3:1
- Don't rely on color alone — always pair with text or icons

### 5. Depth & Shadows

Use a shadow scale to convey elevation — small for raised elements, large for floating.

- `shadow-sm`: buttons and cards — `0 1px 2px rgba(0,0,0,0.05)`
- `shadow-md`: clear separation — `0 4px 6px rgba(0,0,0,0.1)`
- `shadow-lg`: dropdowns — `0 10px 15px rgba(0,0,0,0.1)`
- `shadow-xl`: modals — `0 20px 25px rgba(0,0,0,0.15)`
- Don't overuse — if everything floats, nothing has depth

### 6. Images & Icons

- Icons must be sized relative to context — don't use the same size everywhere
- Images: always `object-fit: cover` with consistent aspect ratios
- Empty states: use illustrations + clear CTA, not just text

### 7. Layout & Composition

- Left-align text by default; center only for short headlines, hero sections, empty states
- Cards don't need to contain everything — let images bleed to edges
- Vary visual treatment in lists — feature some items, minimize others

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| "Looks amateur" | Add more white space, constrain content widths |
| "Feels flat" | Add subtle shadows, border-bottom on sections |
| "Text is hard to read" | Increase line-height, constrain width, boost contrast |
| "Colors clash" | Reduce saturation, use more grays, limit palette |
| Using arbitrary px values | Stick to 4/8/16/24/32/48/64px scale |

## Quick Diagnostic

| Question | If No → Action |
|----------|----------------|
| Does hierarchy read when squinting? | Increase contrast between primary and secondary |
| Does it work in grayscale? | Strengthen size/weight/spacing hierarchy |
| Is there enough white space? | Increase spacing, especially between groups |
| Are labels de-emphasized vs. their values? | Make labels smaller, lighter, or uppercase-small |
| Does spacing follow a consistent scale? | Use 4/8/16/24/32/48/64 only |
| Is text width constrained? | Apply `max-w-prose` (~65ch) |
| Do colors have sufficient contrast? | Use gray-700+ on white |

## Reference

Based on *Refactoring UI* by Adam Wathan & Steve Schoger. For dark mode and theming, see the theming-dark-mode reference.
