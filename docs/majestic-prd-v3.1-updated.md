# Majestic — Product Requirements Document

**Version 3.1 — Working Document**
*Your adventure. But Majestic.*

---

## Reference Documents

This PRD should be read alongside the following documents. In all cases of conflict the referenced documents take priority over this PRD.

| Document | Purpose |
|----------|---------|
| Design System — Future-Mythic Companion Framework | Visual language, colour system, composition rules, avatar framework, component template, AI generation rules |
| Design Brief Handoff | Motion system, card states, elemental motion skins, transformation flip stages, AR direction, theme variations |
| Avatar Visual Rule Sheet | Avatar appearance principles, visual balance ratio, element-specific visual notes, naming language |
| Brand Voice Document | Brand line, voice personality, voice by surface, full avatar personas — appearance, lifestyle, aesthetic, voice, sample lines |
| Threshold City World Spec | Base UI world — light quality, environment grammar, colour system, typography, motion, component behaviour |
| Avatar Accent System | Four accent colour sets, what changes per avatar, what stays constant, switching behaviour, token structure |
| Onboarding Narrative v2 | Three-phase onboarding — 12 screens, birth card system, quiz, avatar selection, post-onboarding flows |
| Avatar Midjourney Prompt Library | Locked prompts for all four avatars — three states each, generation settings, consistency method |
| Avatar Emblem System | Five signal crests — geometry, scale behaviour, rendering rules, production requirements |
| Pixel Elder Character Spec | Hidden pixel art Easter egg character — trigger moments, prop system, animation states, dev integration |
| Major Arcana Interpretations — Final | Full personality and soul card interpretations for all 22 Major Arcana — locked copy for onboarding, profile, readings, and LLM seed |
| Major Arcana One-Liners — Final | One-line personality and soul summaries for all 22 Major Arcana — for onboarding reveal, profile summary screen, and LLM avatar translation seed |

---

## 01 — Vision

### What Majestic Is

Majestic is an intuition coaching tool that uses the ancient symbolic system of tarot to help users shift their thinking and trust their gut instincts.

It is not a fortune-telling app. It is not a wellness platform. It is not a personality test with mystical branding.

Majestic is built for people who think in systems, escape into worlds, and have spent years trusting everyone else's read of a situation. It gives them a symbolic framework — guided by four interpretive companions — to finally trust their own.

*Your adventure. But Majestic.*

This line is not a call to action. It is an invitation. It assumes the user already has a story, already has instincts, already has something worth trusting. Majestic does not position itself as the answer. It is the quality that was always possible inside their own journey.

### Brand Line Variations

The line flexes across touchpoints:

- Your next move. But Majestic.
- Your instincts. But Majestic.
- Your read. But Majestic.
- Your decision. But Majestic.

---

## 02 — Mission

### Why This Exists

Majestic was built from a real story. A man who had presence, charisma, and decades of professional achievement — and quietly, privately, did not listen to himself for most of it. Until he did. And everything changed.

That story is not unique. It belongs to anyone who has ever been highly capable on the outside while quietly disconnected from their own instincts on the inside.

The mission of Majestic is to pass that experience forward — not as a single person's guidance, but as a system that gives users the space and the symbolic tools to do the work themselves.

The avatars will be there. Majestic will always be there. But the insight and the work belongs to the user.

---

## 03 — Core Value Proposition

### What Makes This Different

Unlike traditional tarot apps that focus on fortune-telling or passive card definitions, Majestic positions tarot as a symbolic coaching tool. It builds confidence in decision-making through guided self-reflection and interpretive companionship.

Unlike wellness apps that speak in soft affirmations, Majestic respects the user's intelligence. It is emotionally honest without being soft. It is spiritually serious without being inaccessible.

The differentiating factors are:

- Four interpretive companions with distinct communication styles, appearances, backstories, and emotional functions — not a single universal reader voice
- Tarot as a symbolic thinking system, not a source of predetermined answers
- A Majestic Profile built from each user's birth cards — personal and permanent from day one
- A coherent world aesthetic that supports narrative immersion and repeat engagement
- A design system and product experience built for an audience that has never seen themselves in a spiritual app before
- A hidden Easter egg character — the Pixel Elder — who rewards attention and loyalty without ever being announced

---

## 04 — Target Audience

### Who Majestic Is For

Majestic is not built for three separate markets. It is built for three overlapping entry points into one broader mindset.

The shared trait across all three is this: they are people who are exceptionally good at reading patterns in fictional and external systems — and significantly less practised at applying that same intelligence inward.

### Audience Clusters

| Cluster | What Draws Them In | What Keeps Them | Design Priority |
|---------|-------------------|-----------------|-----------------|
| Anime-spiritual | Transformation arcs, sacred atmosphere, symbolic characters, liminal worlds | Emotional resonance, identity reflection, narrative immersion | Atmosphere, world-entry, emotional premise, narrative hooks |
| Occult / tarot-esoteric | Archetypes, ritual, intuition, symbolic interpretation, spiritual self-work | Interpretive depth, personal relevance, trust in the guide voice | Archetypal gravity, intimacy, readable symbolism |
| Tabletop / lore-driven | Systems, codex logic, factions, collection, mastery, immersive myth-worlds | Structured progression, discoverability, taxonomy, repeat use | Information hierarchy, recurring emblems, world-consistent logic |

### Primary Persona — The Guidance Chaser

**Jordan, 24**

Recently graduated, first real job, first city move. High-functioning but quietly overwhelmed. Has a Discord server for their favourite anime, a half-finished tabletop campaign, and a notes app full of thoughts they have never shared with anyone.

- **Tech profile:** High proficiency. Discovers apps through community recommendation not advertising. Drops anything with poor onboarding or condescending UX.
- **Goals:** Clarity on a decision they already know the answer to. Permission to trust their own read.
- **Pain points:** Mainstream wellness feels coded for someone else. Traditional tarot feels inaccessible or performative.
- **Behaviour:** Short daily sessions. Deep engagement with lore and collectible content. Will become a vocal advocate if the world feels real and consistent.

### Secondary Persona — The Analytical Seeker

**Alex, 31**

Mid-career pivot or stall. Analytically strong, emotionally intelligent but privately uncertain. Reads speculative fiction, plays strategy games, has been quietly curious about symbolic systems for years without finding one that respects their intelligence.

- **Tech profile:** Very high proficiency. Builds side projects. Sceptical of anything that feels like fluff.
- **Goals:** A structured framework for self-reflection that does not require buying into spiritual doctrine.
- **Pain points:** Overthinks decisions. Will disengage immediately if the product feels dishonest or inconsistent.
- **Behaviour:** Deep research before download. Asynchronous and private engagement. Will use the codex and lore surfaces extensively.

---

## 05 — Brand Position

### How Majestic Is Positioned

Future-mythic guidance — a symbolic system from a near-future world where technology, nature, and intuition coexist. This is not a wellness app. It is not a game. It is not a traditional occult product.

It occupies the space between those things — and that space is currently empty.

*A mobile oracle from a near-future world where the city never fully severed itself from water, weather, plant life, ritual, or memory.*

### What Majestic Is Not

- Not a fortune-telling or prediction app
- Not a wellness platform with spiritual branding
- Not coded for one gender or one subculture
- Not a personality test
- Not a social platform or community tool
- Not a replacement for professional support
- Not a direct imitation of any anime, tabletop, or occult franchise

---

## 06 — Product Strategy

### How the App Works

Majestic uses tarot as a symbolic coaching framework delivered through four interpretive companions — Casper, Olivia, Eli, and Destiny — each of whom reads the same card through a different emotional and cognitive lens.

The user selects a companion based on how they want guidance delivered in that moment. The same draw can therefore feel catalytic through Casper, grounding through Olivia, reframing through Eli, or holding through Destiny.

This is the core product mechanic: not one answer, but four modes of arriving at the user's own truth.

### The Four Companions

| Name | Element | Mode | What They Give the User |
|------|---------|------|------------------------|
| Casper | Fire | Catalytic | Permission to act. Clarity without comfort. Someone who will not let them stall. |
| Olivia | Earth | Grounding | Translation of insight into real life. Practical next steps. Someone steady. |
| Eli | Air | Reframing | A new way of seeing. Pattern recognition. Distance from the immediate feeling. |
| Destiny | Water | Holding | To be seen and not rushed. Emotional validation. Someone who will sit with them. |

Full character definitions — appearance, heritage, backstory, lifestyle, aesthetic, voice, signature prop, and sample lines — are defined in the Brand Voice Document.

### The Majestic Profile

Every user receives a Majestic Profile during onboarding — two tarot cards calculated from their date of birth using a numerological system.

- **Personality Card** — who they are. Their shadow, their essence, the archetype they carry. The given.
- **Soul Card** — their purpose. Who they are here to become. The becoming.

The Majestic Profile is permanent from day one. It becomes the user's first codex entry, influences their daily draws, and is acknowledged whenever either card appears in a reading. It is the foundation everything else is read in light of.

### The Quiz and Companion Selection

After the Majestic Profile is revealed, users complete a four-question world scenario quiz before selecting their companion. Questions are externally framed — the user solves world problems, not self-assessments. Their answers surface a companion recommendation which is presented as a suggestion not a result. The user always makes the final conscious choice.

Avatar selection determines the UI accent theme and tone of voice across all readings and prompts. Companions can be switched at any time.

### The Pixel Elder

A hidden pixel art character — tiny, never named, never announced — who appears at specific moments throughout the app. She is the oldest signal in the world. She shows up when something worth noticing is happening.

She appears during the surprise card mechanic, at loyalty milestones with prop variants (birthday cake, handmade picket signs), on the user's birthday, during full moons, when personality or soul cards appear in readings, and during rare card draws. She is never mentioned in official communications. She spreads because users need someone else to believe them.

Full spec defined in the Pixel Elder Character Spec document.

### Narrative Architecture

The app tells its story in four layers:

1. **Pre-entry myth** — app store, landing surfaces, and promo visuals suggest a larger world without explaining it
2. **Onboarding revelation** — the user discovers why the companions exist, receives their Majestic Profile, and chooses their companion
3. **Progressive world unlock** — readings, journal entries, and lore fragments gradually reveal more of the world over time
4. **Personal continuity** — the user's own reading history becomes part of the living narrative memory of the app

*Backstory attracts. Consistency retains. Reflection personalises.*

---

## 07 — Content

### Card Interpretation Copy

All card interpretation content is written in the Majestic parent voice — present-tense, emotionally intelligent, specific enough to feel personal. Avatar-specific translations are generated from this base content at the LLM layer. The parent voice copy is the source of truth.

**Major Arcana — Status: Complete and Locked**

Two content layers exist for all 22 Major Arcana cards:

**Full Interpretations** — `majestic-arcana-interpretations-final.md`
Each card has two full interpretations: a personality card reading (who they are — shadow, essence, archetype) and a soul card reading (who they are here to become). These are the primary content layer. Used in:
- Onboarding birth card reveal (screens 05 and 06) — displayed in full after tap
- Majestic Profile codex entry — accessible at any time
- Reading screen — when a Major Arcana card appears in a draw
- LLM seed content — passed to avatar translation layer to generate companion-voiced interpretations

**One-Line Summaries** — `majestic-arcana-oneliners-final.md`
Each card has two one-line summaries: one for the personality card, one for the soul card. These are the surface content layer. Used in:
- Onboarding birth card reveal — displayed immediately on card flip, before read more
- Majestic Profile summary screen (screen 07) — at-a-glance view of both cards
- LLM seed content — compact essence line passed to avatar for voice translation

**Content Rules**
- Parent voice interpretations are never displayed with avatar attribution — they belong to Majestic, not to a companion
- Avatar translations are generated dynamically from the parent content at read time — they are not pre-written or stored
- When personality or soul cards appear in a reading, the resonance mechanic triggers — the avatar acknowledges the card using their own voice lines, not the parent interpretation
- Full interpretation copy must never be modified without locking a new version — treat as a content asset, not a working draft

**Minor Arcana — Status: Not Started**
Minor Arcana interpretation copy is out of scope for v1 content. The card frame and suit system must be locked before content is written. Scope and format to be confirmed in Phase 08.

---

## 08 — Design Direction

### Visual and Interaction Principles

The full design direction, visual system, component philosophy, motion system, and AI image generation rules are defined in the reference documents listed at the top of this PRD. Those documents take priority over any conflicting direction here.

### World Direction

**Threshold City** — future-mythic luminous eco-tech folklore. A near-future symbolic world where urban systems, environmental regrowth, and spiritual pattern-reading coexist. One world for all users. What changes per avatar is the accent colour system only.

The cyberpunk DNA is present but never announced. The world carries it through behaviour and detail — signal line borders, reflective surfaces, pre-dawn urban light quality — not through aesthetic declaration.

### Avatar Visual System

Four companions illustrated in Loish painterly style — soft luminous rendering, emotionally expressive, world-made not heaven-made. Each avatar exists in three states: neutral, active, reflective.

- **Casper** — Mediterranean or South American heritage. Fire avatar. Carries Saga by Brian K. Vaughan, margins full of arguments. Circuit emblem on left collar in ember red.
- **Eli** — East Asian heritage. Air avatar. Carries a tiny worn Rider Waite Fool card. Circuit emblem on left chest in pale silver.
- **Olivia** — Eastern European heritage, warm olive skin. Earth avatar. Carries a locket, worn hinge, never explained. Circuit emblem on left wrist in moss green.
- **Destiny** — Black heritage, natural hair. Water avatar. Always has a tablet within reach. Circuit emblem on left wrist in moon cyan.

### Emblem System

Five circular signal crests — one per avatar, one Majestic master emblem. Circuit trace aesthetic. Consistent boundary, stroke weight, and node size across all five. Designed to read at 24px and reward inspection at 200px.

The Majestic master emblem contains a threshold gateway at centre with four cardinal nodes — one per avatar in their accent colour when rendered in full colour. All signals converge here.

### Interaction Philosophy

Interactions should feel ritualistic, not transactional. The app should behave like entering a space, not opening a notification. Motion is restrained and meaningful. Every animated moment supports anticipation, reveal, or emotional tone — never novelty alone.

---

## 09 — First Release Priorities

### One World. Four Accents.

For first release Threshold City is implemented as the complete and only world. The four avatar themes exist as accent variations within this world — not as separate environments. This is a deliberate decision for a small design and development team. Ship one world beautifully.

### Priority 1 — Complete character and world foundations

- Avatar reference illustrations — three states per avatar, approved before generation begins
- Avatar motion rules — gesture, posture, and physical vocabulary per avatar
- Avatar appearance in app states — small, medium, large
- Final typography selections — one ceremonial serif, one legible sans
- Colour hex confirmation — lock all palette values

### Priority 2 — Prototype the three core ritual surfaces

- Onboarding — three-phase flow including terminal entry, Majestic Profile reveal, and companion selection
- Daily draw — the recurring ritual touchpoint that drives retention
- Reading screen — the core product surface where meaning, motion, companion voice, and card imagery converge

### Priority 3 — Build lore continuity early

Do not leave the codex and story surfaces for a later release. Even a light early version of lore continuity supports the trust of tabletop and lore-driven users from the start. The world needs to feel like it has rules and memory before it is fully revealed.

### Priority 4 — Card design

- Lock the card frame system — the single most important visual decision
- Build the AI prompt library for Major and Minor Arcana
- Generate and approve card backs

**New specs added post-v3.1 (May 2026):** - Subscription and monetisation model fully defined →  `majestic-subscription-tier-spec.md` - Authentication timing and positioning defined →  `majestic-auth-monetisation-spec.md`- Altar, talisman, and ritual system defined →  `majestic-altar-ritual-spec-v2.md` - Pixel Elder lamp sequence and reading initiation role defined → `majestic-pixel-elder-addendum.md` - Dig Deeper access model updated for subscription gating →  `majestic-dig-deeper-spec-v2.md` - Design system (spacing, components, icons) defined →  `majestic-design-system.md`

---

## 10 — Success Criteria

### What Good Looks Like

Majestic succeeds when a user who would never have described themselves as spiritual opens the app and thinks: this was made for me.

It succeeds when someone from the anime, tabletop, or sci-fi subcultures finds the world compelling enough to return to daily — not because they need a reading, but because the ritual itself has become part of how they process their life.

It succeeds when a user screenshots the tiny pixel grandmother in the corner of their reading screen and sends it to a friend saying *did you see this* — and that friend downloads the app to find her.

It succeeds when the user, after a decision they have been avoiding, looks back and feels they trusted themselves. And remembers where that happened.

*You trusted yourself. Remember this.*

---

## 11 — What Is Not In Scope for First Release

- Full environmental variation per avatar — one world, four accents only
- AR features
- Seasonal or time-based world shifts
- Expanded codex surfaces beyond the first lore fragment
- Avatar clothing marketplace
- Community or social features
- Full 78-card deck on launch — prioritise Major Arcana and one complete suit
- Avatar Easter egg emblems — v2 scope

---

*Majestic — PRD v3.1 — Working Document*
*Design System, Brand Voice, and all reference documents take priority where direction conflicts.*
*Your adventure. But Majestic.*
