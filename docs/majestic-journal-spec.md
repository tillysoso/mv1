# MAJESTIC — JOURNAL & REFLECTION SURFACE
## Component Spec — Task #127
*Your adventure. But Majestic.*

---

## 01 — NARRATIVE ROLE

The Journal is personal continuity. It is the surface where the user's relationship with themselves becomes visible over time.

It does two jobs simultaneously and neither one diminishes the other:

**As an archive** — every reading the user chooses to keep lives here. Daily draws, single-card readings, three-card spreads. The card, the avatar's line, the reflection prompt, and anything the user wrote. The reading happened. This is where it stays.

**As a writing surface** — the Journal is also a standalone space. The user does not need to have drawn a card to write here. They can open the Journal and write directly — with or without an intention, with or without a card. Their words are enough.

The Journal does not track habits. It does not show streaks. It does not ask the user to write more or write regularly. It simply holds what they bring to it. The continuity builds on its own.

**Retention mechanic:** The Journal creates a reason to return that is entirely personal. Users come back not because the app prompted them but because their own history is here. Past readings resurface patterns. Old notes feel different three weeks later. The Journal becomes the place where the user's story with the deck lives.

---

## 02 — SURFACE ATMOSPHERE

**Threshold City — quieter register. Mist and water quality.**

Of all the surfaces, the Journal is the most interior. The world is present but pulled back. Rain-on-glass texture more present than on other surfaces. The ambient light is cooler, more reflective. It should feel like somewhere private.

- Background: `#1A1A2E` — Threshold deep, primary background
- Grain texture at 6% opacity — slightly more present than other surfaces
- Rain-on-glass layer at low opacity in the background — not animated, just atmospheric
- Canal reflection quality in surface panels — that specific blue-grey of still water
- Avatar accent present but very ambient — emblem only, no borders, no pulse
- Cinzel for entry headers and dates. Montserrat for body text, notes, prompts.
- No bold UI chrome. No cards. No strong colour. This is the quietest surface in the app.

---

## 03 — ENTRY POINT & NAVIGATION

The Journal is a primary navigation tab. Lives in the bottom navigation bar alongside Daily Draw, Codex, and Profile.

Tab label: **JOURNAL**
Tab icon: A simple quill or signal-line pen mark at 24px — monochrome at rest, accent colour on active. Final icon to be confirmed with Luke / visual identity system.

On entry the Journal opens to the archive feed — most recent entry first. If the Journal is empty, the empty state is shown (see section 09).

---

## 04 — ARCHIVE FEED

### Layout

Vertical scroll feed. Full width. Each entry is a card-like panel — contained, readable, distinct from the surrounding world.

Entry panels sit on `#16213E` — Threshold mid — with soft grain. No hard borders. A very subtle inner glow at the top edge of each panel in the avatar accent colour — just enough to indicate which companion was present for this entry.

### Entry types in the feed

**Saved reading — daily draw**
- Card thumbnail (left, small — 48px wide, portrait)
- Card name in Cinzel, small
- Date + time in tracked uppercase, mist grey
- Avatar companion line — Montserrat italic, bone white
- Reflection prompt used — mist grey, smaller
- User note (if written) — Montserrat, bone white, indented slightly — notebook quality
- Intention (if set) — appears above the note with a subtle label: **INTENTION** in tracked uppercase, avatar accent colour, very small

**Saved reading — 1-card spread**
Same as daily draw entry. Label indicates: **1-CARD READING** in tracked uppercase, mist grey.

**Saved reading — 3-card spread**
- Three card thumbnails in a row (Past / Present / Future)
- Each card name below its thumbnail in Cinzel, very small
- Avatar companion line for the spread
- User note (if written)
- Intention (if set)
- Label: **3-CARD READING** in tracked uppercase, mist grey

**Standalone journal entry** (written without a card draw)
- No card thumbnail
- Date + time
- User note — full width, Montserrat, bone white
- Intention (if set) — appears above note
- Label: **JOURNAL** in tracked uppercase, mist grey
- Avatar emblem micro (24px) in the corner — shows which avatar was active when written. Very quiet — this is the user's space, the avatar is just there.

### Tapping an entry

Opens the entry in a full detail view — modal sheet rising from the bottom, same gesture as Codex. Shows all content in full. Allows the user to edit their note (see section 07). Swipe down to dismiss.

---

## 05 — STANDALONE WRITE FLOW

The user initiates a standalone journal entry from the Journal surface via a compose button — a simple `+` or pen icon, avatar accent colour, bottom right of the screen. Minimal. Not a FAB with shadow. Just present.

### Write flow

1. Tap compose button
2. A blank entry panel rises from the bottom — same modal behaviour as Codex detail view
3. **Intention field** appears first — one line, notebook margin style. Placeholder: *"What's moving through you right now?"* Low contrast, no border, disappears on first tap. Optional — skip by tapping the writing area below.
4. **Note field** — the main writing area. Full width. Montserrat. Bone white on `#16213E`. Minimum 5 lines visible, expands as the user types. Keyboard-aware — content sits above keyboard naturally.
5. **Avatar emblem micro** sits quietly in the top right corner of the entry. Tapping it does nothing in v1 — it simply shows which avatar's world the user is in. Future: could allow avatar switch from within the Journal.
6. **Save** — single button. *"Keep this"* — Montserrat, avatar accent colour. No secondary cancel button. Swipe down to discard without saving (standard iOS / Android gesture).

### After save

Entry appears at the top of the archive feed. No animation, no celebration. It just arrives. The continuity is the reward.

---

## 06 — SAVE FLOW FROM READINGS

When a user saves a reading from the daily draw or reading screen, it arrives in the Journal automatically. No additional steps required from the user beyond tapping *"Keep this"* in the reading flow.

**What gets saved automatically:**
- Card(s) drawn
- Avatar companion line(s)
- Reflection prompt used
- Date and time
- Reading type (daily draw / 1-card / 3-card)

**What the user can optionally add at save time:**
- A note — short text field appears as part of the save confirmation. Same notebook-margin style. Optional. Placeholder: *"Anything you want to hold onto?"*
- This is the only moment the note field is surfaced in the reading flow. If the user skips it, they can still add a note later by tapping the entry in the Journal.

**Intention note:** If the user set an intention before the draw, it is stored and surfaced in the Journal entry alongside the reading. It is never editable after saving — it was what it was at the time.

---

## 07 — EDITING & NOTES

Users can edit their written note on any entry at any time. The intention and the card data are never editable — they belong to the moment they were captured.

**Edit flow:**
Tap the entry to open detail view. Tap the note area directly to enter edit mode. Keyboard appears. Save with *"Done"* or the keyboard dismiss gesture. Auto-saves on dismiss — no explicit save button needed in edit mode.

No delete flow in v1. If the user wants to remove an entry, that is a future scope item. The Journal is designed to hold, not to erase.

---

## 08 — FILTER & SEARCH

### Filter bar
Horizontally scrollable pill filters above the feed. Default: All.

- **All** — full archive, most recent first
- **Daily draw** — daily draw saves only
- **Readings** — 1-card and 3-card saves
- **Journal** — standalone written entries only

No date filter in v1. The feed is chronological and that is sufficient.

### Search
Search icon in the header. Searches note text and intention text only — not card names. This is a personal archive, not a card lookup tool. That's what the Codex is for.

Results show matching entries with the search term highlighted in the note text. Mist grey highlight — not bright yellow, not jarring.

Empty search state: *"Nothing found."* One line. No suggestions. No drama.

---

## 09 — EMPTY STATE

When the Journal has no entries — either because the user is new or has not yet saved anything:

No illustration. No prompt to draw a card. Just:

*"Nothing here yet. It will come."*

Montserrat, mist grey, centred, mid-screen. Avatar emblem at 20% opacity behind it — very faint, just world texture.

The Journal does not push the user toward action. It simply waits.

---

## 10 — AVATAR PRESENCE

Same principle as the Codex — the avatar is a voice and an ambient presence, not a visual one. No portal, no living circle. The avatar accent colour tints the entry panel tops. The emblem micro sits quietly in standalone entries. The avatar's companion line is part of saved readings.

The Journal belongs to the user. The avatar is witness, not host.

---

## 11 — DATA REQUIREMENTS

Requires the following from Supabase (#111):

- `journal_entries` table — userId, entryType (daily_draw / one_card / three_card / standalone), cardIds[], avatarId, companionLine, reflectionPrompt, intention, userNote, createdAt, updatedAt
- Reading saves write to `journal_entries` directly from the reading save flow — not a separate step
- Standalone entries write to `journal_entries` with entryType: standalone, no cardIds

Note: `userNote` is the only mutable field after creation. All other fields are write-once.

---

## 12 — OUT OF SCOPE FOR V1

- Pattern tracking or insight summaries across entries (e.g. "You've been drawing shadow cards for 2 weeks")
- Card frequency analysis
- Export or share journal entries
- Entry deletion
- Reminders to write
- Tagging or categorisation
- Search by card name within Journal (use Codex for card lookup)

---

*Majestic — Journal & Reflection Surface Spec — v1.0*
*Task #127 — Complete*
*Your adventure. But Majestic.*
