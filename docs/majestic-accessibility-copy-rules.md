# MAJESTIC — ACCESSIBILITY COPY RULES
## Alt Text, Screen Reader Logic & Motion Accessibility — Task #93
*Your adventure. But Majestic.*

---

## Overview

Majestic is a visually intensive app. Card art, atmospheric animations, elemental motion skins, and avatar portraits all need to communicate meaning to users who rely on screen readers or who have reduced motion enabled. This spec defines the copy conventions, `accessibilityLabel` patterns, and motion fallback rules that apply before dev build.

Scope: card images, card metadata, avatar emblems, avatar portraits, loading/empty states, interaction confirmations, and reduced motion behaviour.

---

## 01 — Principles

**Describe function first, atmosphere second.**
Screen readers are navigating, not experiencing. The label `Ace of Wands — Breakthrough energy, Fire suit` is useful. A poetic line about ember sparks is not. Atmosphere lives in the visual layer. The accessibility layer is clear and direct.

**Never use aura context as the only differentiator.**
`auraContext` values (`breakthrough`, `shadow`, `neutral`) appear in accessibility labels only as supporting context — never as the primary identifier. Card name comes first, always.

**Majestic brand voice applies to copy-based accessibility moments.**
Loading state copy, empty state copy, and notification copy that reaches screen readers should still sound like Majestic. Alt text and aria labels are functional — they are not brand moments. The brand voice does not override functional clarity.

**Colour is never the only cue.**
Per WCAG AA requirements and the accent system spec: interactive states must always be communicated through shape, position, or copy — not colour alone. This applies to: selected card borders, active navigation states, aura context indicators.

---

## 02 — Card Image Alt Text

### Pattern

All card images use a consistent, generated `accessibilityLabel`. Build from `cardData.ts` fields:

```
[Card name] — [auraContext] energy, [element] / [suit] suit
```

**Examples:**

```
Ace of Wands — breakthrough energy, Fire / Wands suit
Five of Cups — shadow energy, Water / Cups suit
The Moon — Major Arcana, card XVIII
Knight of Swords — Air / Swords suit
The Fool — Major Arcana, card 0
```

### Rules by card type

**Major Arcana:**
```
[Card name] — Major Arcana, card [Roman numeral spelled as ordinal]
```
```
The High Priestess — Major Arcana, card II
The Wheel of Fortune — Major Arcana, card X
```
Note: Do not include aura context for Major Arcana in the image alt text — Major Arcana aura values are defined but the category is inherently complex. Keep the label factual.

**Minor Arcana — Pip cards:**
```
[Card name] — [auraContext] energy, [element capitalised] / [suit capitalised] suit
```
```
Three of Wands — breakthrough energy, Fire / Wands suit
Seven of Pentacles — neutral energy, Earth / Pentacles suit
```

**Minor Arcana — Court cards:**
```
[Card name] — [element capitalised] / [suit capitalised] suit
```
Court cards do not carry aura context labels — court cards are character archetypes, not energy states. Omit aura context for Page, Knight, Queen, King.
```
Queen of Cups — Water / Cups suit
King of Pentacles — Earth / Pentacles suit
```

**Ace cards:**
Ace is `number: 1` in `cardData.ts` but displays as `A` in UI. In alt text, write out "Ace of [Suit]" — do not use "A of Wands".
```
Ace of Pentacles — breakthrough energy, Earth / Pentacles suit
```

---

## 03 — Avatar Emblem Alt Text

The micro emblem that appears in the upper-right of Minor Arcana cards is decorative in context — the suit identity is already communicated by the card title. Treat as decorative when the card title is visible:

```jsx
accessibilityLabel=""
accessibilityRole="none"
```

In the Codex grid view where the emblem acts as a suit filter cue and the title may be truncated, give it a functional label:

```
[Avatar name] emblem — [Suit] suit indicator
```
```
Casper emblem — Wands suit indicator
Destiny emblem — Cups suit indicator
Eli emblem — Swords suit indicator
Olivia emblem — Pentacles suit indicator
```

---

## 04 — Avatar Portrait Alt Text

Avatar portraits appear in three states: neutral, active, reflective. The state is a visual change — screen readers need to communicate which avatar is present, not which state they're in (state is environmental, not informational).

```
[Avatar name], your [element] companion
```

```
Casper, your Fire companion
Destiny, your Water companion
Eli, your Air companion
Olivia, your Earth companion
```

**On the reading screen** where the avatar is actively delivering a reading, append the context:

```
Casper, your Fire companion — reading active
```

**During avatar switching transition:** Suppress accessibility announcements during the 600–800ms transition. Announce the new avatar after the transition completes:

```
[New avatar name] is now your active companion
```

---

## 05 — Navigation — Avatar Emblem Tab

The active navigation tab carries the user's selected avatar emblem. Screen reader label:

**Inactive state:**
```
[Avatar name] — switch to [element] companion
```

**Active state:**
```
[Avatar name] — active companion, [element]
```

The emblem shape is decorative in this context — the text label carries all functional information. Mark image as decorative:
```jsx
accessibilityLabel=""
accessibilityRole="none"
```
And place the functional label on the parent touchable/button element.

---

## 06 — Card Interaction States

### Card at rest (in Codex grid)
```
[Card name], [suit] card — double tap to open
```

### Card selected / highlighted
```
[Card name] — selected
```
Do not announce the accent border colour change — colour is not an accessibility signal. The "selected" state label is sufficient.

### Card flipping (reading screen reveal)
Suppress screen reader announcement during the flip animation. Announce once the card face is fully revealed:
```
[Card name] revealed
```

### Card hold state (glyph trace animation)
Suppress. The glyph trace is a visual atmospheric moment with no informational content.

---

## 07 — Loading State Copy — Screen Reader

Loading states in Majestic carry brand-voiced copy in the visual layer (see `majestic-states-and-switching.md`). Screen readers receive a simpler functional announcement instead of the brand-voiced line — the atmospheric copy is a visual moment, not a functional communication.

| Screen | Visual copy (sighted) | Screen reader announcement |
|--------|----------------------|---------------------------|
| App initialisation | "Threshold City is waking up" | Loading, please wait |
| Daily draw — shuffle | "Reading the signal..." | Your daily card is loading |
| Codex loading | "The Codex is opening..." | Card collection loading |
| Journal loading | "Your archive is opening..." | Journal entries loading |
| Profile loading | "Pulling your thread..." | Profile loading |
| Card art loading | (no text — atmospheric) | Card image loading |

**Rule:** Screen reader loading announcements are role `alert` with `aria-live="polite"` — they announce once when the loading state begins and once when content arrives. They do not loop.

---

## 08 — Empty State Copy — Screen Reader

Empty states carry atmospheric world copy in the visual layer. Screen readers receive a short functional label plus a clear call to action if one exists.

| Screen | Visual empty state copy | Screen reader label |
|--------|------------------------|---------------------|
| Journal — no entries | World atmospheric copy | No journal entries yet. Start your first entry. |
| Codex — no cards viewed | World atmospheric copy | You haven't opened any cards yet. |
| Streak — day 1 | World atmospheric copy | Your streak begins today. |
| Profile — no reading history | World atmospheric copy | No readings recorded yet. |

**Rule:** Empty state copy in the accessibility layer does not carry Majestic brand voice — it is direct and functional. The brand voice lives in the visual layer exclusively.

---

## 09 — Reduced Motion

When the system `prefers-reduced-motion` setting is enabled or the user has enabled reduced motion in Majestic settings:

### Disabled
- Elemental particle effects (ember sparks, ripple rings, signal arcs, root-line growth)
- Ambient card shimmer at rest
- Element bar draw-in trace animation (200ms left-to-right)
- Avatar switching transition (bloom, particle dissolve)
- Card flip animation
- Glyph trace on hold state
- Aura gradient pulse

### Retained (never disabled)
- Accent colour on selected card border
- Active navigation state indicator
- Avatar emblem colour change on active state
- Aura context modifier (colour/opacity shift on title and element bar)
- All typography and layout
- Avatar portrait images (static)

### Substitution behaviour
When motion is disabled, transitions that would use animation instead use instantaneous state change:
- Card flip → immediate face reveal with no animation
- Avatar switch → immediate accent and emblem recolour, no transition
- Element bar → appears instantly at full opacity, no draw-in
- Aura modifier → applies instantly on card reveal, no pulse

**Implementation flag:** `const prefersReducedMotion = useReducedMotion()` — check on mount and apply throughout. Reference Reanimated's `useReducedMotion` hook.

---

## 10 — Colour Contrast Requirements

All text and interactive elements must meet WCAG AA minimum contrast ratios. Confirmed from locked colour system:

| Element | Foreground | Background | Ratio required | Status |
|---------|-----------|-----------|----------------|--------|
| Primary body text | `#F0EDE8` | `#1A1A2E` | 4.5:1 | ✅ Passes |
| Secondary text | `#A8A8B8` | `#1A1A2E` | 4.5:1 | Verify at build |
| Navigation labels | `#F0EDE8` | `#1A1A2E` | 4.5:1 | ✅ Passes |
| Casper accent | `#C94B2C` | `#1A1A2E` | 3:1 (UI components) | Verify at build |
| Destiny accent | `#2A7B8C` | `#1A1A2E` | 3:1 (UI components) | Verify at build |
| Eli accent | `#A8B4C8` | `#1A1A2E` | 3:1 (UI components) | Verify at build |
| Olivia accent | `#5C6B3A` | `#1A1A2E` | 3:1 (UI components) | Verify at build — moss on deep may be close |

**Note on Olivia's accent:** Moss `#5C6B3A` against Threshold Deep `#1A1A2E` is the highest-risk pairing. Confirm contrast ratio at build — may require the secondary rust `#A85C3A` or amber clay `#C49A4A` for interactive elements where contrast is required. Card art can use moss freely — the contrast requirement applies to interactive UI elements only.

**Rule:** Accent colour alone must never be the sole signal of an interactive state. Always pair with shape, position, text, or icon. This applies to: selected card borders (pair with increased border weight), active navigation (pair with emblem fill + position indicator).

---

## 11 — Implementation Notes for Luke

**React Native / Expo accessibility props to use:**
- `accessibilityLabel` — primary text description for screen readers
- `accessibilityRole` — `"image"`, `"button"`, `"none"` (decorative)
- `accessibilityState` — `{ selected: true/false }` for card selected states
- `accessibilityLiveRegion` — `"polite"` for loading state announcements
- `accessible={false}` — mark decorative elements invisible to screen readers

**Reanimated:**
- `useReducedMotion()` — system preference detection
- Apply to all animated values — check on mount, apply throughout session

**Alt text generation:**
Alt text should be generated programmatically from `cardData.ts` fields — not hardcoded per card. Build a utility function:

```typescript
export function getCardAccessibilityLabel(card: CardData): string {
  if (card.suit === 'major') {
    return `${card.name} — Major Arcana, card ${card.romanNumeral}`;
  }
  const isCourt = ['page', 'knight', 'queen', 'king'].includes(card.rank ?? '');
  if (isCourt) {
    return `${card.name} — ${capitalise(card.element)} / ${capitalise(card.suit)} suit`;
  }
  return `${card.name} — ${card.auraContext} energy, ${capitalise(card.element)} / ${capitalise(card.suit)} suit`;
}
```

---

*Majestic — Accessibility Copy Rules — v1.0 — Task #93*
*Your adventure. But Majestic.*
