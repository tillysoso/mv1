# Majestic — Confirmed Image References
**Version 1.0 — Living Document**
*Your adventure. But Majestic.*

---

## How To Use This Document

This document tracks every confirmed `--sref` and `--cref` URL used in Majestic's image generation system.

**`--sref` = Style Reference**
Keeps visual style consistent — line work, colour palette, atmosphere, illustration approach.
Use when generating different characters or environments in the same visual language.

**`--cref` = Character Reference**
Keeps a specific person consistent — face, build, features.
Use when generating the same character in different poses or states.

**`--sw` = Style Weight** (used with `--sref`)
Controls how strongly the style reference influences output.
Range: 0–1000. Recommended: 50–80 for balanced influence.

**`--cw` = Character Weight** (used with `--cref`)
Controls how strongly the character reference influences output.
Range: 0–100. Recommended: 80 for strong character consistency.

---

## WORLD & STYLE REFERENCES — `--sref`

These define the visual world. Used across all 78 cards.

---

### PRIMARY WORLD REFERENCE ✅
**Threshold City — Confirmed Style Anchor**

| Field | Value |
|---|---|
| Description | Neon folklore Threshold City — figure from behind, portal arch, botanical overgrowth, purple-magenta neon atmosphere, water reflection, signal infrastructure |
| Status | ✅ CONFIRMED |
| Recommended weight | `--sw 60` |
| Use for | All 78 cards as primary style anchor |
| URL | https://s.mj.run/BkPWmbkrySQ |

---

### COURT CARD STYLE REFERENCES ✅
**Wands Court — Confirmed**

| Card | Description | Status | URL |
|---|---|---|---|
| King of Wands | Lean Mediterranean man, lived-in jacket, ember fire, dawn light, Threshold City skyline | ✅ CONFIRMED | https://s.mj.run/8KAnk8O5un0 |
| Queen of Wands | Eastern European woman, rust-amber clothing, moss green scarf, botanical backpack, fire wand, dusk | ✅ CONFIRMED | https://s.mj.run/DlSM9TmGO8c |
| Knight of Wands | Young man mid-leap over rooftops, jacket flying, comet fire trail, amber-purple dusk sky | ⚠️ VERIFY — currently same URL as Page | https://s.mj.run/NrOc8gcX29w |
| Page of Wands | Androgynous teen, oversized jacket, holding wand carefully, blue hour, single flame | ✅ CONFIRMED | https://s.mj.run/NrOc8gcX29w |

**Recommended court card `--sref` combination:**
```
--sref [PRIMARY WORLD URL] [KING URL] --sw 60
```
For Queen, Knight, Page — swap King URL for relevant confirmed card URL.

---

### STYLE REFERENCE COMBINATIONS BY CARD TYPE

| Card Type | `--sref` Setup | Notes |
|---|---|---|
| Numbered cards Ace–10 | `--sref [PRIMARY WORLD URL] --sw 60` | World reference only — no figure reference needed |
| Court cards | `--sref [PRIMARY WORLD URL] [RELEVANT COURT URL] --sw 60` | World + court style anchors combined |
| Major Arcana | `--sref [PRIMARY WORLD URL] --sw 50` | World reference, lower weight — more symbolic freedom |

---

## CHARACTER REFERENCES — `--cref`

These keep specific people consistent across generations.
Used only when regenerating the same character in a new state or variation.

---

### AVATAR PORTRAITS
*(From avatar generation sessions — separate from card art)*

| Avatar | State | Status | URL |
|---|---|---|---|
| Casper / Fire | Neutral | ✅ Confirmed | *PASTE URL* |
| Casper / Fire | Active | ✅ Confirmed | *PASTE URL* |
| Casper / Fire | Reflective | ✅ Confirmed | *PASTE URL* |
| Eli / Air | Neutral | ✅ Confirmed | https://s.mj.run/8KAnk8O5un0 |
| Eli / Air | Active | ✅ Confirmed | *PASTE URL* |
| Eli / Air | Reflective | ✅ Confirmed | *PASTE URL* |
| Olivia / Earth | Neutral | ✅ Confirmed | *PASTE URL* |
| Olivia / Earth | Active | ✅ Confirmed | *PASTE URL* |
| Olivia / Earth | Reflective | ⚠️ MISSING — regenerate using active as `--cref` |
| Destiny / Water | Neutral | ⚠️ UNVERIFIED — verify URL before use |
| Destiny / Water | Active | ✅ Confirmed | *PASTE URL* |
| Destiny / Water | Reflective | ✅ Confirmed | *PASTE URL* |

---

### WANDS COURT CARDS AS CHARACTER REFERENCES
*(Use ONLY if regenerating the exact same character — not for other court cards)*

| Character | Use case | URL |
|---|---|---|
| King of Wands figure | Regenerating King only — different variation | https://s.mj.run/8KAnk8O5un0 |
| Queen of Wands figure | Regenerating Queen only — different variation | https://s.mj.run/DlSM9TmGO8c |
| Knight of Wands figure | Regenerating Knight only — different variation | ⚠️ VERIFY URL — currently same as Page | https://s.mj.run/NrOc8gcX29w |
| Page of Wands figure | Regenerating Page only — different variation | https://s.mj.run/NrOc8gcX29w |

---

## MAJOR ARCANA REFERENCES — `--sref`

All 22 Major Arcana generated and locked 16 April 2026.

**Note:** Justice was generated without `--sref` (Option B — no world reference) to achieve the required cool silver-violet palette. All other 21 cards used `--sref https://s.mj.run/6FQrYHJkE5c --sw 25`.

| Card | Status | URL |
|---|---|---|
| 0 — The Fool | ✅ LOCKED | https://s.mj.run/V6y7mXAOsGY |
| I — The Magician | ✅ LOCKED | https://s.mj.run/1nxY_Q6ibSc |
| II — The High Priestess | ✅ LOCKED | https://s.mj.run/zrWoYqH7ecM |
| III — The Empress | ✅ LOCKED | https://s.mj.run/DYKUO5br5P4 |
| IV — The Emperor | ✅ LOCKED | https://s.mj.run/9dM4KETxX60 |
| V — The Hierophant | ✅ LOCKED | https://s.mj.run/M1J8OwPtSlU |
| VI — The Lovers | ✅ LOCKED | https://s.mj.run/Z1tbueE-ZlA |
| VII — The Chariot | ✅ LOCKED | https://s.mj.run/2whWjJ5DZKI |
| VIII — Strength | ✅ LOCKED | https://s.mj.run/27KACYkyO_U |
| IX — The Hermit | ✅ LOCKED | https://s.mj.run/1WaCgoeKcNY |
| X — Wheel of Fortune | ✅ LOCKED | https://s.mj.run/prlMguFUEuU |
| XI — Justice | ✅ LOCKED — no sref | https://s.mj.run/N4cKJtwH6o4 |
| XII — The Hanged Man | ✅ LOCKED | https://s.mj.run/TTUKzQ8zokg |
| XIII — Death | ✅ LOCKED | https://s.mj.run/fly3uzs8PMU |
| XIV — Temperance | ✅ LOCKED | https://s.mj.run/wigVZKIVbwE |
| XV — The Devil | ✅ LOCKED | https://s.mj.run/LE1lwvLVNto |
| XVI — The Tower | ✅ LOCKED | https://s.mj.run/d-L-tAkHgns |
| XVII — The Star | ✅ LOCKED | https://s.mj.run/H_GfwV0XIyA |
| XVIII — The Moon | ✅ LOCKED | https://s.mj.run/A-D09X6G-wY |
| XIX — The Sun | ✅ LOCKED | https://s.mj.run/wJ3jlGfg67c |
| XX — Judgement | ✅ LOCKED | https://s.mj.run/QvL-G_Sybjo |
| XXI — The World | ✅ LOCKED | https://s.mj.run/WK-xdSFs1Os |



These settings apply to every card generation unless noted otherwise.

```
--ar 2:3          Portrait orientation — all cards
--v 6.0           Midjourney version — locked
--s 50            Stylize — balanced influence
--raw             Raw mode — less Midjourney beautification
--q 2             Quality — high detail
```

**Court cards only — additional:**
```
--p t3tyf2c       Locked persona profile
```

---

## SUIT ATMOSPHERE REFERENCE

Quick reference for neon duochrome colour register per suit.

| Suit | Avatar | Primary atmosphere | Secondary neon | Botanical glow |
|---|---|---|---|---|
| Wands | Casper / Fire | Majestic purple `#9500FF` | Ember red `#C94B2C` → heated gold `#D4A843` | Ember orange |
| Cups | Destiny / Water | Majestic purple `#9500FF` | Moon cyan `#4DBFCC` → teal `#2A7B8C` | Teal blue |
| Swords | Eli / Air | Majestic purple `#9500FF` | Pale silver `#A8B4C8` → luminous aqua `#6ECFCF` | Silver white |
| Pentacles | Olivia / Earth | Majestic purple `#9500FF` | Moss `#5C6B3A` → amber clay `#C49A4A` | Green gold |

---

## COURT CARD LIGHT MOMENT SYSTEM

Consistent across all four suits — expressed in atmosphere not realistic sky.

| Court Card | Light moment | Atmosphere feel | Figure relationship to element |
|---|---|---|---|
| Page | Blue hour — threshold | Deep purple dominant, single warm colour point | Discovers it |
| Knight | Dusk — in motion | Purple and suit colour equal intensity, dynamic | Becomes it |
| Queen | Mid-morning — tending | Suit colour dominant, purple receding | Tends it |
| King | Early dawn — arrived | Both colours balanced, settled | Directs it |

---

## PENDING URLS — ACTION REQUIRED

- [x] **PRIMARY WORLD REFERENCE** ✅ `https://s.mj.run/6FQrYHJkE5c`
- [x] **King of Wands** ✅ `https://s.mj.run/8KAnk8O5un0`
- [x] **Queen of Wands** ✅ `https://s.mj.run/DlSM9TmGO8c`
- [x] **Page of Wands** ✅ `https://s.mj.run/NrOc8gcX29w`
- [x] **All 22 Major Arcana** ✅ See Major Arcana section above
- [ ] **Knight of Wands** ⚠️ VERIFY — currently showing same URL as Page. Check Discord and re-upload correct image to get unique `s.mj.run` link

---

## V2 FUTURE DIRECTIONS — LOGGED NOT ACTIONED

| Idea | Context | Status |
|---|---|---|
| Brutalist scrapbook / zine collage aesthetic for Major Arcana | Hierophant test generated 06 April 2026 — strong result, conceptually interesting as analogue-past vs digital-future two-register system | Parked for v2 consideration |

---

## VERSION HISTORY

| Version | Date | Changes |
|---|---|---|
| 1.4 | 16 April 2026 | All 22 Major Arcana generated and locked. Full URL table added. Justice exception noted (no sref — cool violet palette required). Tasks #44 and #85 closed. |
| 1.3 | 08 April 2026 | All 12 avatar portrait URLs confirmed and populated. Knight of Wands URL corrected. Hierophant corrected to NOT GENERATED. All pending items cleared. |
| 1.2 | 07 April 2026 | Knight of Wands cref locked. Hierophant flagged as not yet generated. |
| 1.1 | 07 April 2026 | Primary world reference swapped — new URL `https://s.mj.run/6FQrYHJkE5c` replaces `BkPWmbkrySQ`. |
| 1.0 | 06 April 2026 | Initial document — Wands court cards locked, world reference confirmed, style system established |

---

*Majestic — Image Reference Library — v1.4 — Living Document*
*Your adventure. But Majestic.*
