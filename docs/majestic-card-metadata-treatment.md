# MAJESTIC — CARD TITLE & METADATA TREATMENT
## Typography & Layout Rules — Task #91
*Your adventure. But Majestic.*

---

## Overview

Every card in Majestic carries three layers of metadata visible to the user: the card title, the suit/category indicator, and the number or court rank. These elements must communicate clearly without competing with the card art. The typography is ceremonial — it earns its position.

This spec covers: card title typography, suit indicator treatment, element bar, number display, and layout rules for all card types across Major and Minor Arcana.

---

## Card Type Matrix

| Card Type | Title Treatment | Number Display | Suit Indicator |
|-----------|----------------|----------------|----------------|
| Major Arcana | Cinzel Bold 700, all caps | Roman numeral (I–XXI) or 0 for The Fool | None — Major Arcana has no suit |
| Minor Arcana — Pip (Ace–10) | Cinzel SemiBold 600, all caps | Arabic numeral, avatar emblem micro | Element bar — avatar accent colour |
| Minor Arcana — Court (Page–King) | Cinzel SemiBold 600, title case | Court rank text, no numeral | Element bar — avatar accent colour |

---

## 01 — Card Title

### Major Arcana

**Font:** Cinzel Bold 700
**Case:** All caps
**Size:** 28–32px (mobile) / 34–38px (tablet)
**Tracking:** 0.15em
**Colour:** `#F0EDE8` bone white
**Position:** Bottom of card, centred, above the element bar zone
**Max width:** 80% of card width — never full bleed

**Examples:**
```
THE FOOL
THE HIGH PRIESTESS
THE WHEEL OF FORTUNE
```

Long titles (The Wheel of Fortune, The High Priestess) should not reduce font size — allow natural wrap to two lines at the same size. Two-line titles stack centred, 1.2 line height.

---

### Minor Arcana — Pip Cards

**Font:** Cinzel SemiBold 600
**Case:** All caps
**Size:** 22–26px (mobile)
**Tracking:** 0.12em
**Colour:** `#F0EDE8` bone white
**Position:** Bottom of card, centred

**Format:** `[NUMBER] OF [SUIT]`

```
ACE OF WANDS
FIVE OF CUPS
TEN OF SWORDS
```

---

### Minor Arcana — Court Cards

**Font:** Cinzel SemiBold 600
**Case:** Title case — this is the one exception to all-caps in display type
**Size:** 22–26px (mobile)
**Tracking:** 0.12em
**Colour:** `#F0EDE8` bone white
**Position:** Bottom of card, centred

**Format:** `[Rank] of [Suit]`

```
Page of Wands
Knight of Cups
Queen of Swords
King of Pentacles
```

**Rationale for title case on court cards:** Court cards name people. All-caps removes the personhood. Title case makes them feel like characters rather than categories — consistent with how they function in the Majestic reading experience.

---

## 02 — Number Display

### Major Arcana — Roman Numerals

Major Arcana cards carry a Roman numeral in the upper-left corner of the card face. This is ceremonial, not functional — it signals the card's position in the sequence.

**Font:** Cinzel Regular 400
**Size:** 16–18px
**Colour:** `#A8A8B8` secondary (mist grey) at rest — pulls to `#F0EDE8` on active/selected state
**Position:** Upper-left, 12px inset from card edge, 12px from top
**Case:** Roman numeral — I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII, XIII, XIV, XV, XVI, XVII, XVIII, XIX, XX, XXI
**Exception:** The Fool carries 0 (Arabic zero), not a Roman numeral. The Fool is before the sequence, not in it.

**Full mapping:**
```
0  — The Fool
I  — The Magician
II — The High Priestess
III — The Empress
IV — The Emperor
V  — The Hierophant
VI — The Lovers
VII — The Chariot
VIII — Strength
IX — The Hermit
X  — Wheel of Fortune
XI — Justice
XII — The Hanged Man
XIII — Death
XIV — Temperance
XV — The Devil
XVI — The Tower
XVII — The Star
XVIII — The Moon
XIX — The Sun
XX — Judgement
XXI — The World
```

---

### Minor Arcana — Arabic Numerals

Pip cards (Ace through 10) carry an Arabic numeral in the upper-left corner.

**Font:** Cinzel Regular 400
**Size:** 16–18px
**Colour:** Avatar accent primary — this is one of the allowed accent-on-card uses
**Position:** Upper-left, 12px inset, 12px from top — same grid position as Major Arcana numeral
**Ace:** Displays as `A`, not `1` — Ace carries special status as origin card

**Court cards do not carry a numeral.** The rank is communicated through the title only.

---

## 03 — Suit Indicator — Avatar Emblem Micro

Minor Arcana cards carry a micro version of the suit's avatar emblem in the upper-right corner of the card face. This is the visual suit shorthand — immediately recognisable to users who know the avatars.

**Asset:** Avatar emblem PNG at 24px size
**Colour state:** Accent — filled with the avatar's primary accent colour
**Position:** Upper-right, 12px inset from card edge, 12px from top — mirrors the numeral position
**Opacity:** 70% at rest, 100% on active/selected state

**Suit → Avatar → Emblem mapping:**
| Suit | Avatar | Emblem | Accent primary |
|------|--------|--------|----------------|
| Wands | Casper | Ignition Crest | `#C94B2C` ember red |
| Cups | Destiny | Resonance Spiral | `#2A7B8C` teal |
| Swords | Eli | Broadcast Arc | `#A8B4C8` pale silver |
| Pentacles | Olivia | Foundation Mark | `#5C6B3A` moss |

**Major Arcana:** No emblem in upper-right. That corner is empty. Major Arcana belong to no suit and no avatar.

---

## 04 — Element Bar

A thin horizontal line below the card title that carries the elemental accent colour. This is the most restrained use of accent on the card surface — it frames the title without overwhelming it.

**Height:** 1.5px — signal-line weight, not a band
**Width:** Matches the width of the card title text — not full card width
**Colour:** Avatar accent primary — full opacity
**Position:** 6px below the bottom of the card title text
**Animation:** On card reveal, the element bar draws in from left to right over 200ms — a brief trace moment

**Major Arcana element bar:** Majestic purple `#9500FF` — the brand colour stands in for elemental accent on Major Arcana cards, as they belong to the full sequence not a specific element.

---

## 05 — Codex View — Metadata Treatment

When cards appear in the Codex (deck browser), the metadata treatment shifts to accommodate a grid or list context rather than the full card face view.

### Grid view (default)

Card title appears below the card thumbnail, not overlaid.

**Font:** Cinzel Regular 400
**Size:** 11–12px
**Tracking:** 0.2em
**Case:** All caps
**Colour:** `#A8A8B8` mist grey — secondary text
**Max lines:** 2 (most titles fit in 1, long titles like The Wheel of Fortune wrap to 2)
**Position:** Centred below card, 6px gap from card bottom edge

The Roman/Arabic numeral does not appear in grid view — card identity is conveyed through art and title only at this scale.

The emblem micro does appear in grid view — upper-right of the thumbnail at 16px, at 60% opacity. Acts as a quick suit filter cue.

### List view (Codex detail row)

**Card title:** Cinzel SemiBold 600, 16px, all caps (Major/pip) or title case (court), `#F0EDE8`
**Number:** Cinzel Regular 400, 13px, right-aligned, `#A8A8B8`
**Suit/element:** Montserrat Regular 400, 11px, `#A8A8B8` — text label, not emblem, at this size
**Element bar:** 1px line, full width of row, avatar accent colour, below the row not above

---

## 06 — Reading Screen — Metadata Treatment

On the reading screen (daily draw, full card reveal), metadata is present but secondary to the art and interpretation.

**Card title:** Cinzel Bold 700 (Major) or SemiBold 600 (Minor), 28px, `#F0EDE8`, centred below card art
**Element bar:** Present, drawn on reveal (200ms left-to-right trace)
**Roman/Arabic numeral:** Not displayed on reading screen — the number belongs to the card frame, not the reading surface. Remove visual clutter during interpretation.
**Suit emblem:** Not displayed on reading screen — the avatar companion's presence makes the suit identity redundant

**Rationale:** The reading screen is about meaning, not classification. Strip metadata to title + element bar only. The interpretation speaks. The card speaks. Everything else is quiet.

---

## 07 — Aura Context — Visual Modifier

The card's `auraContext` value (`breakthrough` / `shadow` / `neutral`) does not modify the typography — it modifies the atmospheric treatment of the card face on the reading screen only.

| auraContext | Title colour | Element bar | Background atmosphere |
|-------------|-------------|-------------|----------------------|
| breakthrough | `#F0EDE8` bone white | Avatar accent, full opacity | Gradient wash pulls warm/bright |
| shadow | `#A8A8B8` mist grey | Avatar accent, 60% opacity | Gradient wash pulls cool/deep |
| neutral | `#F0EDE8` bone white | Avatar accent, 80% opacity | Standard Threshold City base |

Typography rules (font, size, tracking, case) are constant regardless of aura context. Only colour and opacity shift.

---

## 08 — Rules Summary

| Rule | Value |
|------|-------|
| Major Arcana title font | Cinzel Bold 700 |
| Minor Arcana title font | Cinzel SemiBold 600 |
| Major + pip case | All caps |
| Court card case | Title case |
| Numeral position | Upper-left, 12px inset |
| Emblem position | Upper-right, 24px, 70% opacity at rest |
| Element bar height | 1.5px signal-line weight |
| Element bar width | Matches title text width |
| Element bar — Major Arcana | `#9500FF` Majestic purple |
| Element bar — Minor Arcana | Avatar accent primary |
| Element bar animation | Left-to-right trace, 200ms |
| Reading screen numerals | Hidden — reading context, not classification |
| Codex grid title | Cinzel Regular 400, 11–12px, all caps, mist grey |

---

*Majestic — Card Title & Metadata Treatment — v1.0 — Task #91*
*Your adventure. But Majestic.*
