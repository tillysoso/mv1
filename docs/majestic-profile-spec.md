# MAJESTIC — PROFILE SURFACE
## Component Spec — Task #128
*Your adventure. But Majestic.*

---

## 01 — NARRATIVE ROLE

The Profile is the user's permanent foundation. It was established in onboarding before they drew a single card — two birth cards calculated from their date of birth, a personality card and a soul card, uniquely theirs. Everything that has happened in the app since has been read in light of this.

The Profile surface is where the user returns to see that foundation. Not to change it — it is permanent. Not to be coached through it — that happened in onboarding. Just to see it. To hold it. To understand themselves a little more clearly each time they look.

It is also where the user's ongoing relationship with the deck becomes visible at a glance — which cards keep appearing, which ones haven't arrived yet, which patterns are forming.

**This surface is not settings.** Settings live elsewhere. The Profile is identity, not configuration.

**Retention mechanic:** The Profile becomes richer over time as the resonance mechanic surfaces recurring cards and reading patterns. Users return not because the app asks them to but because their own story is deepening here. It is the most personal surface in the app.

---

## 02 — SURFACE ATMOSPHERE

**Threshold City — minimal register. World present but restrained. Content leads.**

The Profile should feel like a quiet, considered space. Not cold — personal. The world is always there but it knows to step back when something important is on the table.

- Background: `#1A1A2E` — Threshold deep
- Atmospheric grain at 4% opacity — the quietest surface in the app alongside the Journal
- No rain-on-glass layer — this surface is dry, still, interior
- Avatar accent in the structural details only — thin borders on card panels, emblem in the header
- Cinzel for card names, section headers, the user's name. Montserrat for all body copy, metadata, labels.
- Bone white primary text throughout. Mist grey for metadata and secondary labels.

---

## 03 — ENTRY POINT & NAVIGATION

The Profile is a primary navigation tab. Lives in the bottom navigation bar alongside Daily Draw, Codex, and Journal.

Tab label: **PROFILE**
Tab icon: The user's personality card suit emblem at 24px — or the Majestic master emblem if Major Arcana. Monochrome at rest, accent colour on active. This is the only nav tab with a personalised icon — it belongs to the user.

On entry the Profile opens directly to the full profile view. No loading ritual. The surface arrives.

---

## 04 — PROFILE HEADER

Top of the screen. Clean, spare.

**User name** — Cinzel, displaySM, bone white. The name entered during onboarding. First name only.
**Member since** — Montserrat, caption, mist grey. *"In Threshold City since [month year]."*
**Avatar emblem** — active avatar's emblem at 48px, accent colour, top right of header. Tapping it opens avatar switching — but that is #131 scope, not this spec.

Thin signal-line divider below the header. Avatar accent colour at 40% opacity.

---

## 05 — MAJESTIC PROFILE SECTION

### The foundation

The centrepiece of the Profile surface. The two birth cards side by side, exactly as they were revealed in onboarding — but now permanent, accessible, quietly present.

**Layout**
Two card panels side by side. Each panel contains:
- Card art — portrait, framed, with avatar gradient wash
- Card name in Cinzel, displayXS, bone white
- Card type label — **PERSONALITY CARD** or **SOUL CARD** in tracked uppercase, mist grey, very small
- One-line summary from the locked one-liners doc — Montserrat, bone white, italic

Below the two cards — a single tap target: **Read your full profile** in Montserrat, avatar accent colour. This expands to show the full Major Arcana interpretations for both cards (personality and soul readings from `majestic-arcana-interpretations-final.md`). Expands inline — no modal, no new screen. The content arrives below the cards.

**If personality and soul cards are the same:**
Both panels show the same card. A quiet note below: *"You carry your purpose as your nature."* — Montserrat, mist grey, italic. No further explanation. The user was told in onboarding. This is just the reminder.

### Section label
**YOUR MAJESTIC PROFILE** in tracked uppercase, mist grey, above the card panels.

---

## 06 — RESONANCE SECTION

Below the Majestic Profile section, separated by a thin signal-line divider.

### What it shows

The resonance section surfaces cards that keep appearing in the user's readings — the cards that seem to find them. It is not a frequency chart. It is not a statistics panel. It is just the cards that have shown up more than once, presented quietly as a pattern worth noticing.

**Trigger:** A card appears in this section once it has been drawn 2 or more times across all reading types. The first draw is discovery. The second draw is the beginning of a pattern.

**Layout**
Horizontal scroll row of card thumbnails — portrait, 64px wide. Most-drawn cards first, left to right. No numbers, no percentages, no labels beyond the card name below each thumbnail in Cinzel, caption size.

Tapping a card thumbnail opens the Codex detail view for that card — same modal behaviour as the Codex surface. Seamless.

**If no cards have been drawn twice yet:**
Section is not shown. The Profile only shows sections that have something to say. An empty resonance section is not shown with a placeholder — it simply isn't there yet.

### Section label
**CARDS THAT KEEP FINDING YOU** in tracked uppercase, mist grey, above the row.

A very quiet subline below the label: *"The ones that come back tend to have something to say."* — Montserrat, mist grey, caption. Only shows when there is at least one resonance card to display.

---

## 07 — CURRENT COMPANION SECTION

Below resonance, separated by a signal-line divider.

Shows which avatar the user is currently with. Simple, restrained. Not a feature highlight — just context.

**Layout**
- Avatar portrait thumbnail — living circle portal, 80px, neutral state
- Avatar name in Cinzel, displayXS, bone white
- One-line avatar essence — pulled from brand voice doc, Montserrat, mist grey, italic
- *"Switch companion"* — Montserrat, mist grey, small — tap triggers avatar switching flow (#131)

### Section label
**YOUR COMPANION** in tracked uppercase, mist grey.

---

## 08 — READING HISTORY SNAPSHOT

Below current companion. The lightest section on the Profile — just a glance, not a deep view. The Journal is where the full archive lives. This is the summary.

**Layout**
Three metadata stats in a row, equal width:

| Stat | Label |
|------|-------|
| Total readings saved | **READINGS** |
| Current streak (days) | **STREAK** |
| Days in Threshold City | **DAYS** |

Numbers in Cinzel, displaySM, bone white. Labels in tracked uppercase, mist grey, caption.

A tap anywhere on this section navigates to the Journal — the reading archive is there, not here.

No streak celebration UI on this surface. No milestone badges. The number speaks for itself.

### Section label
**YOUR RECORD** in tracked uppercase, mist grey.

---

## 09 — SETTINGS ACCESS

At the very bottom of the Profile surface. Not a section — just a link. Quiet.

*"Settings"* — Montserrat, mist grey, right-aligned. Tap navigates to a separate settings screen (out of scope for this spec — #128 is the Profile surface only, not settings).

Settings is not part of the user's identity. It lives below everything else on this surface and does not compete for attention.

---

## 10 — AVATAR PRESENCE

The avatar is present on the Profile as the living companion section and as the accent colour throughout — borders, emblems, the thin signal-line dividers. Their world is felt in every detail without being announced.

No portal on this surface. The avatar portrait in the companion section uses the living circle format at 80px — intimate, not theatrical. The arch portal is reserved for significant moments (onboarding, milestones). The Profile is permanent, not a moment.

---

## 11 — DATA REQUIREMENTS

Requires the following from Supabase (#111):

- `profiles` table — userId, name, dateOfBirth, personalityCardId, soulCardId, activeAvatarId, createdAt (already scaffolded per tracker #133)
- `user_card_draws` table — for resonance card calculation (shared with Codex)
- `journal_entries` table — for reading count and streak calculation (shared with Journal)

Streak calculation: consecutive days with at least one saved reading. Calculated at read time from `journal_entries.createdAt`. No separate streak table needed in v1.

---

## 12 — OUT OF SCOPE FOR V1

- Editing birth cards or recalculating profile
- Sharing profile cards
- Profile card "deep dive" expanded view beyond the locked interpretation copy
- Extended resonance analytics (card frequency charts, pattern summaries)
- Milestone badges or achievement display
- Settings surface (separate task)

---

*Majestic — Profile Surface Spec — v1.0*
*Task #128 — Complete*
*Your adventure. But Majestic.*
