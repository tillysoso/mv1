# MAJESTIC — DECK BROWSER & CODEX
## Component Spec — Task #126
*Your adventure. But Majestic.*

**Updated — Dig Deeper access model:** Avatar lore resonance and extended card reading remain free for all authenticated users. Love / Career / Life angle interpretations (previously labelled “General") are now subscription only — "Dig Even Deeper" tier. Angle pills render at 50% opacity for free users; tapping surfaces an inline upgrade prompt. Full updated access model, gating logic, upgrade copy, and dev implementation notes in `majestic-dig-deeper-spec-v2.md`.

---

## 01 — NARRATIVE ROLE

The Codex is not a reference tool. It is a record of what the world has revealed to you.

Every card in the deck exists in the Codex from day one — visible, browsable, real. But the world inside each card only opens when that card has been drawn. Until then it is present but quiet. After the first draw, something shifts. World lore surfaces. The avatar speaks. Personal history begins to accumulate.

For the tabletop audience, this is the surface they will return to between readings — not to look things up, but to see what they have discovered, what patterns are forming, and what is still waiting to be found. It is the living archive of their relationship with the deck.

**Retention mechanic:** The Codex creates a pull back into the app that is not dependent on the daily draw. Users return to browse, to read lore they unlocked, to notice which cards keep appearing in their history. It is the surface that turns a daily habit into a world.

---

## 02 — SURFACE ATMOSPHERE

**Threshold City — archival register.**

Cooler and more structural than the reading screen. Less warmth, more depth. The world is present but restrained — this is a library, not a ritual space.

- Background: `#16213E` — Threshold mid, slightly cooler than the main app background
- Surface grain: soft noise texture at 5% opacity — never flat
- Avatar accent present but minimal — signal lines and emblem only, no particle motion
- Botanical detail at the margins — a root at the panel edge, moss at a corner — world is always alive but not foregrounded
- Cinzel for card names and section headers. Montserrat for body, lore text, metadata.
- Tracked uppercase labels for suit markers, filter states, system text

---

## 03 — ENTRY POINT & NAVIGATION

The Codex is a primary navigation tab. It lives in the bottom navigation bar alongside Daily Draw, Journal, and Profile.

Tab label: **CODEX**
Tab icon: The Majestic master emblem (Convergence Crest) at 24px — monochrome at rest, accent colour on active.

On entry the Codex opens to the full deck grid. No splash, no loading ritual — it arrives cleanly. The world atmosphere is already present.

---

## 04 — DECK GRID VIEW

### Layout
- Card grid: 3 columns, consistent gutter, full-width scroll
- Card aspect ratio: matches the card frame system — portrait, 2:3
- Each card shows: card art (or locked state), card name in Cinzel below

### Card states in the grid

**Undiscovered** — card art visible at 30% opacity with a subtle mist layer over it. Card name visible. No lore, no avatar line. The card is there — just not yet awake. This is not a lock icon or a padlock. It is simply quieter. The world has not opened yet.

**Discovered** — card art at full opacity. Avatar accent border, signal-line weight. Card name in full bone white. Lore fragment indicator present (see section 06).

**Active / selected** — brief accent pulse on tap. Card expands to detail view.

### Visual principle
The grid should feel like looking at a city from above at pre-dawn — some windows lit, most still dark. Not frustrating. Atmospheric.

---

## 05 — FILTER & SEARCH

### Filter bar
Sits above the grid. Horizontally scrollable pill filters. Default: All.

Filter options:
- **All** — full 78-card deck
- **Major Arcana** — 22 cards
- **Wands** — 14 cards, Fire / Casper accent
- **Cups** — 14 cards, Water / Destiny accent
- **Swords** — 14 cards, Air / Eli accent
- **Pentacles** — 14 cards, Earth / Olivia accent

When a suit filter is active, the grid background takes on a very subtle wash of that suit's avatar accent — barely perceptible, 8% opacity. The world knows which element you're in.

### Search
Search icon in the header. Expands to a full-width input on tap. Searches by card name only. Results filter the grid in real time. Empty state: *"Nothing found. Try another name."* — plain, no drama.

### Sort options (secondary — accessible via header icon)
- Default: by number (Major Arcana 0–21, then suits Ace–King)
- By aura: groups breakthrough / shadow / neutral
- By discovery: most recently drawn first — only relevant cards surface, undiscovered cards fall to bottom

---

## 06 — CARD DETAIL VIEW

Triggered by tapping any card in the grid. Opens as a modal sheet rising from the bottom — the card comes up into the user's space. Background dims to `#0D0D14` at 70% opacity. The world recedes. The card is the focus.

### Layout — top to bottom

**Card art**
Full card illustration at the top of the sheet. Avatar gradient wash applied. Card frame visible. Aura state present as a soft ambient glow at the card edges — breakthrough / shadow / neutral colour per the aura mapping.

**Card name + metadata bar**
- Card name: Cinzel, displayMD size, bone white
- Suit + element indicator: avatar emblem micro (24px) + suit name in tracked uppercase, mist grey
- Number: Roman numerals for Major Arcana, Arabic for Minor — Montserrat, secondary text colour
- Aura badge: small pill — BREAKTHROUGH / SHADOW / NEUTRAL in tracked uppercase, avatar accent colour

**Avatar companion line**
One line. Avatar-voiced. Pulled from locked #136 lines for Major Arcana, LLM-generated for Minor Arcana using the seed from #137. Displayed in Montserrat italic, bone white, slight left indent.

Avatar emblem micro sits inline left of the line — the user always knows whose voice this is.

**World lore fragment** *(unlocks on first draw — see section 07)*
3–5 sentences. Threshold City register — atmospheric, world-building, specific to this card's place in the world. Separated from the avatar line by a thin signal-line divider, avatar accent colour at 40% opacity.

Label above: **THRESHOLD CITY** in tracked uppercase, mist grey, small.

**Personal lore layer** *(unlocks progressively — see section 07)*
Sits below world lore, separated by another divider. Contains:
- First encounter note (unlocks on first draw)
- Pattern note (unlocks at 3+ draws of this card)

Label above: **YOUR RECORD** in tracked uppercase, mist grey, small.

**Close gesture**
Swipe down to dismiss. Tap dimmed background to dismiss. No close button needed.

---

## 07 — LORE UNLOCK SYSTEM

### World lore — first draw reveal

When a card is drawn for the first time anywhere in the app (daily draw or reading screen), world lore is revealed as part of the post-draw experience — not in the Codex. It surfaces in the reading flow itself, as a moment.

**How it appears on first draw:**
After the avatar companion line settles, a brief transition — the card's detail view expands slightly, a soft signal line traces around the frame, and the lore fragment fades in below. One appearance. It feels like the world just opened a door.

A small indicator appears: *"Added to your Codex"* — Montserrat, mist grey, fades after 2 seconds.

After this moment, the lore lives permanently in the Codex card detail view. It is never surfaced in the draw flow again. If the user misses it — it is in the Codex waiting.

**Undiscovered card lore state in Codex:**
Where lore would appear, instead: a mist-grey placeholder line — *"Draw this card to unlock."* No lock icon. No gamification chrome. Just a quiet suggestion.

### Personal lore — progressive unlock

**First encounter note** — triggers on first draw of any card.

Appears in the Codex card detail under YOUR RECORD after the first draw. Never surfaced in the draw flow — it is a Codex-only layer. Quietly adds itself.

Format:
```
First drawn — [date]
```
Simple. No commentary. The record speaks for itself.

**Pattern note** — triggers when the same card has been drawn 3 or more times.

On the third draw, a one-line note surfaces in the reading flow — after the avatar line, before the close. It is the avatar noticing. One line, in their voice.

Example (Casper, Five of Wands):
> *this one keeps showing up. worth asking why.*

Example (Destiny, The Moon):
> *three times now. something in you keeps coming back to this.*

After surfacing in the draw flow once, the pattern note moves permanently to the Codex card detail under YOUR RECORD. It does not repeat in future draw flows.

**Pattern note format in Codex:**
```
Drawn 3 times — [most recent date]
[avatar pattern line]
```

---

## 08 — AVATAR PRESENCE

Avatar is present in the Codex as voice, not as visual. The living circle portal does not appear here. The arch does not appear here. The Codex belongs to the user — the avatar is a voice inside it, not a presence presiding over it.

Avatar accent colour is present throughout — filter pill active states, aura badges, signal line dividers, emblem micro on companion lines. The avatar's world is always felt. They are just not in the room.

---

## 09 — EMPTY STATE

If somehow the user reaches the Codex before any card has ever been drawn (edge case — only possible if onboarding first draw is skipped):

Full grid shows in undiscovered state. No alert, no prompt. One line at the top of the screen in Montserrat, mist grey, centred:

*"The deck is waiting."*

That is all.

---

## 10 — CODEX PROGRESS INDICATOR (OPTIONAL — v1 scope TBC with Luke)

A subtle progress bar or counter in the Codex header showing discovered vs total cards. Not gamified. Purely informational.

Format: **23 / 78** in tracked uppercase, mist grey, right-aligned in the header.

No percentage. No celebration state. No XP. Just the number.

If this adds build complexity without clear retention value, descope for v1. The lore unlock mechanic is the retention driver — the counter is a nice-to-have.

---

## 11 — DATA REQUIREMENTS

Requires the following from Supabase (#111):

- `cards` table — all 78 cards with id, name, suit, number, element, avatar, auraContext, worldLore
- `user_card_draws` table — userId, cardId, drawnAt, readingType — used to calculate discovery state and draw count
- `user_codex_unlocks` table — userId, cardId, worldLoreUnlocked (bool), firstDrawDate, drawCount, patternNoteUnlocked (bool)

Pattern note generation: triggered server-side when drawCount reaches 3. Avatar line generated via LLM seed (#137) at trigger time, stored as string in user_codex_unlocks.

---

## 12 — OUT OF SCOPE FOR V1

- Card-specific reflection prompts (Phase 08)
- Lore expansion beyond 3–5 sentences per card
- Shareable card detail views
- Social / community features
- Seasonal or time-based lore variations
- Full environmental variation per avatar theme in Codex

---

*Majestic — Deck Browser & Codex Spec — v1.0*
*Task #126 — Complete*
*Your adventure. But Majestic.*
