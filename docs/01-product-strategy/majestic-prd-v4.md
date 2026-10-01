# Majestic — Product Requirements Document

**Version 4.1 — Working Document** — adds Feature Index (§06), Zen Mode draft, and missing spec references
*Your adventure. But Majestic.*

-----

## Reference Documents

This PRD should be read alongside the following documents. In all cases of conflict the referenced documents take priority over this PRD.

|Document                                           |Purpose                                                                                                                      |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
|Design System — Future-Mythic Companion Framework  |Visual language, colour system, composition rules, avatar framework, component template, AI generation rules                 |
|Design Brief Handoff                               |Motion system, card states, elemental motion skins, transformation flip stages, AR direction, theme variations               |
|Avatar Visual Rule Sheet                           |Avatar appearance principles, visual balance ratio, element-specific visual notes, naming language                           |
|Brand Voice Document                               |Brand line, voice personality, voice by surface, full avatar personas — appearance, lifestyle, aesthetic, voice, sample lines|
|Threshold City World Spec                          |Base UI world — light quality, environment grammar, colour system, typography, motion, component behaviour                   |
|Avatar Accent System                               |Four accent colour sets, what changes per avatar, what stays constant, switching behaviour, token structure                  |
|Design System v1.0                                 |Spacing scale, component library (12 components), icon system — all UI tokens                                                |
|Onboarding Narrative v2                            |Three-phase onboarding — 12 screens, birth card system, quiz, avatar selection, post-onboarding flows                        |
|Altar & Ritual Spec v2.0                           |Avatar altars, talisman system, 4-layer visual hierarchy, breath mechanic, Pixel Elder lamp sequence                         |
|Navigation Architecture Spec v1.0                  |Three-state spatial navigation, bottom nav system, portal transitions, environmental state definitions                       |
|Home Screen Spec v1.0                              |Command center ground state, Co-Star content system, pop culture reference framework, daily directive spec                   |
|Pixel Elder Addendum v1.0                          |Lamp sequence, isekai mechanic, reading initiation role, easter egg transition                                               |
|Reading Screen, Card Animation & Aura Spec v1.0    |Reading screen layout, card animation choreography, aura glow rules, Zen Mode (Part 04 — draft)                              |
|Aura Treatment & App States v1.0                   |Aura states by card context, aura during reading flow, avatar appearance and scale in every app state                        |
|Empty States, Loading States & Avatar Switching    |Loading and empty state visuals and copy (#130), avatar switching entry points and 1500ms transition (#131)                  |
|Ritual & Notification Copy                         |Daily draw arrival and reflection ritual (#122), notification and reminder language (#129)                                   |
|Accessibility Copy Rules                           |Alt text, screen reader logic, reduced motion, colour contrast (#93)                                                         |
|Card Title & Metadata Treatment                    |Card title, number, suit indicator, element bar — Codex and reading screen (#91)                                             |
|Avatar Voice Engine PID v1.0                       |Four-layer interpretation architecture — Persona, Synthesis Philosophy, Domain Adapter, Orchestration                        |
|Avatar LLM Seed Prompts                            |Per-avatar voice seeds for runtime companion lines (being split into Persona seeds under the Voice Engine PID)               |
|Avatar One-Liners — Final                          |Per-avatar one-liners for all 22 Major Arcana — reading screen, daily draw, LLM seed (#136)                                  |
|Dig Deeper Content — Master Doc                    |Lore resonance, extended readings and angle content for all 78 cards                                                        |
|Quarter Deck Fan Selection & Jumping Card Spec v2.0|Fan selection (initiated readings only), jumping card phenomenon, trigger logic, 3-card adaptation                           |
|Codex Spec                                         |Codex surface — grid, card detail, discovery model, Dig Deeper content                                                       |
|Journal Spec                                       |Journal surface — reading archive and standalone writing                                                                     |
|Profile Spec                                       |Profile surface — birth cards, companion, reading history, resonance tracking                                                |
|Dig Deeper Spec v2.0                               |Content tiers, subscription gating, upgrade UX, dev implementation notes                                                     |
|Subscription Tier Spec v1.0                        |Monetisation — tiers, pricing, gating logic, RevenueCat, upgrade copy                                                        |
|Auth & Monetisation Positioning v1.0               |Auth timing, value-before-ask principles, paid feature discovery                                                             |
|Avatar Midjourney Prompt Library                   |Locked prompts for all four avatars — three states each, generation settings                                                 |
|Avatar Emblem System                               |Five signal crests — geometry, scale behaviour, rendering rules, production requirements                                     |
|Pixel Elder Character Spec                         |Hidden pixel art Easter egg — trigger moments, prop system, animation states, dev integration                                |
|Major Arcana Interpretations — Final               |Full personality and soul card interpretations for all 22 Major Arcana                                                       |
|Major Arcana One-Liners — Final                    |One-line personality and soul summaries for all 22 Major Arcana                                                              |
|Spread Pattern Library — v0.1 (template)           |Cross-card pattern detection feeding spread-level synthesis — new architecture layer, not yet populated, 🔶 pending Luke     |
|Content Integrity Scorecard v1.0                   |Manipulation and rabbit-hole check for all content and copy (`majestic-content-guardrails.md`)                               |

-----

## 01 — Vision

### What Majestic Is

Majestic is an intuition coaching tool that uses the ancient symbolic system of tarot to help users shift their thinking and trust their gut instincts.

It is not a fortune-telling app. It is not a wellness platform. It is not a personality test with mystical branding.

Majestic is built for people who think in systems, escape into worlds, and have spent years trusting everyone else’s read of a situation. It gives them a symbolic framework — guided by four interpretive companions — to finally trust their own.

*Your adventure. But Majestic.*

This line is not a call to action. It is an invitation. It assumes the user already has a story, already has instincts, already has something worth trusting. Majestic does not position itself as the answer. It is the quality that was always possible inside their own journey.

### Brand Line Variations

The line flexes across touchpoints:

- Your next move. But Majestic.
- Your instincts. But Majestic.
- Your read. But Majestic.
- Your decision. But Majestic.

-----

## 02 — Mission

### Why This Exists

Majestic was built from a real story. A man who had presence, charisma, and decades of professional achievement — and quietly, privately, did not listen to himself for most of it. Until he did. And everything changed.

That story is not unique. It belongs to anyone who has ever been highly capable on the outside while quietly disconnected from their own instincts on the inside.

The mission of Majestic is to pass that experience forward — not as a single person’s guidance, but as a system that gives users the space and the symbolic tools to do the work themselves.

The avatars will be there. Majestic will always be there. But the insight and the work belongs to the user.

-----

## 03 — Core Value Proposition

### What Makes This Different

Unlike traditional tarot apps that focus on fortune-telling or passive card definitions, Majestic positions tarot as a symbolic coaching tool. It builds confidence in decision-making through guided self-reflection and interpretive companionship.

Unlike wellness apps that speak in soft affirmations, Majestic respects the user’s intelligence. It is emotionally honest without being soft. It is spiritually serious without being inaccessible.

The differentiating factors are:

- Four interpretive companions with distinct communication styles, appearances, backstories, and emotional functions — not a single universal reader voice
- Tarot as a symbolic thinking system, not a source of predetermined answers
- A Majestic Profile built from each user’s birth cards — personal and permanent from day one
- A coherent world aesthetic that supports narrative immersion and repeat engagement
- A design system and product experience built for an audience that has never seen themselves in a spiritual app before
- A hidden Easter egg character — the Pixel Elder — who rewards attention and loyalty without ever being announced

-----

## 04 — Target Audience

### Who Majestic Is For

Majestic is not built for three separate markets. It is built for three overlapping entry points into one broader mindset.

The shared trait across all three is this: they are people who are exceptionally good at reading patterns in fictional and external systems — and significantly less practised at applying that same intelligence inward.

### Audience Clusters

|Cluster                |What Draws Them In                                                         |What Keeps Them                                                 |Design Priority                                                 |
|-----------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------|
|Anime-spiritual        |Transformation arcs, sacred atmosphere, symbolic characters, liminal worlds|Emotional resonance, identity reflection, narrative immersion   |Atmosphere, world-entry, emotional premise, narrative hooks     |
|Occult / tarot-esoteric|Archetypes, ritual, intuition, symbolic interpretation, spiritual self-work|Interpretive depth, personal relevance, trust in the guide voice|Archetypal gravity, intimacy, readable symbolism                |
|Tabletop / lore-driven |Systems, codex logic, factions, collection, mastery, immersive myth-worlds |Structured progression, discoverability, taxonomy, repeat use   |Information hierarchy, recurring emblems, world-consistent logic|

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

-----

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

-----

## 06 — Product Strategy

### How the App Works

Majestic uses tarot as a symbolic coaching framework delivered through four interpretive companions — Casper, Olivia, Eli, and Destiny — each of whom reads the same card through a different emotional and cognitive lens.

The user selects a companion based on how they want guidance delivered in that moment. The same draw can therefore feel catalytic through Casper, grounding through Olivia, reframing through Eli, or holding through Destiny.

This is the core product mechanic: not one answer, but four modes of arriving at the user’s own truth.

### The Four Companions

|Name   |Element|Mode     |What They Give the User                                                         |
|-------|-------|---------|--------------------------------------------------------------------------------|
|Casper |Fire   |Catalytic|Permission to act. Clarity without comfort. Someone who will not let them stall.|
|Olivia |Earth  |Grounding|Translation of insight into real life. Practical next steps. Someone steady.    |
|Eli    |Air    |Reframing|A new way of seeing. Pattern recognition. Distance from the immediate feeling.  |
|Destiny|Water  |Holding  |To be seen and not rushed. Emotional validation. Someone who will sit with them.|

Full character definitions — appearance, heritage, backstory, lifestyle, aesthetic, voice, signature prop, and sample lines — are defined in the Brand Voice Document.

### The Majestic Profile

Every user receives a Majestic Profile during onboarding — two tarot cards calculated from their date of birth using a numerological system.

- **Personality Card** — who they are. Their shadow, their essence, the archetype they carry. The given.
- **Soul Card** — their purpose. Who they are here to become. The becoming.

The Majestic Profile is permanent from day one. It becomes the user’s first codex entry, influences their daily draws, and is acknowledged whenever either card appears in a reading. It is the foundation everything else is read in light of.

### The Quiz and Companion Selection

After the Majestic Profile is revealed, users complete a four-question world scenario quiz before selecting their companion. Questions are externally framed — the user solves world problems, not self-assessments. Their answers surface a companion recommendation which is presented as a suggestion not a result. The user always makes the final conscious choice.

**Quiz skip option:** Users who prefer to choose directly can skip the quiz via a text link below the primary quiz CTA: *“Rather choose for yourself? Skip ahead.”* Skipping routes to the companion selection screen with all four avatars shown equally — no highlighted recommendation. Quiz score stays null. Analytics and insight generation begin from avatar selection onwards. The quiz is a guide, not a gate.

Avatar selection determines the UI accent theme and tone of voice across all readings and prompts. Companions can be switched at any time.

### The Pixel Elder

A hidden pixel art character — tiny, never named, never announced — who appears at specific moments throughout the app. She is the oldest signal in the world. She shows up when something worth noticing is happening.

She appears during the surprise card mechanic, at loyalty milestones with prop variants (birthday cake, handmade picket signs), on the user’s birthday, during full moons, when personality or soul cards appear in readings, and during rare card draws. She is never mentioned in official communications. She spreads because users need someone else to believe them.

Full spec defined in the Pixel Elder Character Spec document.

### Narrative Architecture

The app tells its story in four layers:

1. **Pre-entry myth** — app store, landing surfaces, and promo visuals suggest a larger world without explaining it
1. **Onboarding revelation** — the user discovers why the companions exist, receives their Majestic Profile, and chooses their companion
1. **Progressive world unlock** — readings, journal entries, and lore fragments gradually reveal more of the world over time
1. **Personal continuity** — the user’s own reading history becomes part of the living narrative memory of the app

*Backstory attracts. Consistency retains. Reflection personalises.*

### Codex — Two-Tier Expansion System

The Codex operates across two layers from the user perspective it is always one Codex. It simply grows.

**Base layer** — available to all authenticated users. The full 78-card deck, card meanings, world lore unlocked on first draw, avatar-voiced interpretation line, draw history.

**Expanded layer** — unlocks when eligible. Avatar-specific card interpretations, avatar lore and backstories, gamified unlock content archive. Eligibility trigger TBD (subscription, streak milestone, or combination — pending decision). Content appears within the existing Codex structure — no new section, no new tab.

This makes the Codex the primary reason users subscribe and the primary reason they stay. It is a living record of how far they have come into the world. Full spec: Codex Spec (updated Section 12).

### Feature Index

Every user-facing feature and the one spec that owns it. This table is an index only. It does not restate spec detail. Where the PRD and a spec disagree, the spec wins (see Reference Documents).

|Feature                          |What it is                                                                                                   |Owning spec                                                    |
|---------------------------------|-------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
|Onboarding                       |Three-phase, 12-screen flow: terminal entry, Majestic Profile reveal, quiz, companion selection, first draw  |Onboarding Narrative v2                                        |
|Quiz skip                        |Bypass the quiz but still choose a companion; all four shown with no recommendation (#157)                   |Altar & Ritual Spec v2.0 §07                                   |
|Home — ground state              |Command center window, daily directive, pop culture reference, observational prompts                         |Home Screen Spec v1.0                                          |
|Navigation                       |Three-state spatial system, four-destination bottom nav, portal and door transitions                         |Navigation Architecture Spec v1.0                              |
|Daily draw & ritual              |Talisman hold → direct reveal, with an arrival and reflection ritual. No fan, no jumping card                |Ritual & Notification Copy (#122), Altar & Ritual Spec v2.0    |
|Altar, talisman & breath         |Per-avatar altar, talisman interaction, breath beat before every reading                                     |Altar & Ritual Spec v2.0                                       |
|Pixel Elder                      |Hidden Easter egg character, plus the lamp sequence that initiates every reading                             |Pixel Elder Character Spec, Pixel Elder Addendum v1.0          |
|Initiated readings               |1-card and 3-card spreads with fan selection and the jumping card                                            |Reading Screen, Card Animation & Aura Spec; Quarter Deck Fan & Jumping Card Spec v2.0|
|Aura system                      |World atmosphere responding to card context and reading state                                                |Aura Treatment & App States v1.0; Reading Screen Spec Part 03  |
|Dig Deeper                       |Post-reading lore resonance, extended reading, synthesis and Love/Career/Life angles                         |Dig Deeper Spec v2.0; Dig Deeper Content — Master Doc          |
|Spread-level interpretation 🔶   |Cross-card patterns (suit, aura, structure) feeding multi-card Dig Deeper synthesis. Template only, not yet populated; symbolic patterns need Luke review|Spread Pattern Library — v0.1 (template)                       |
|Zen Mode 🔶                      |Optional full-screen focus view after the main card reading (not Dig Deeper). **Draft, not locked.** See open items below|Reading Screen, Card Animation & Aura Spec Part 04             |
|Codex                            |78-card deck browser, card detail, lore unlocks, two-tier expansion                                          |Codex Spec                                                     |
|Journal                          |Reading archive plus standalone writing surface. No streaks, no habit tracking                               |Journal Spec                                                   |
|Profile & resonance              |Birth cards, current companion, reading history snapshot, "Cards that keep finding you"                      |Profile Spec                                                   |
|Avatar switching                 |Deliberate switch from Profile or a long press on the nav emblem, with a 1500ms transition (#131)            |Empty States, Loading States & Avatar Switching                |
|Empty & loading states           |Every wait or empty screen is a world beat with one line of brand-voice copy (#130)                          |Empty States, Loading States & Avatar Switching                |
|Notifications & reminders        |Avatar-voiced prompts. Never streak anxiety, never naming what the user hasn't done (#129). Draft for review |Ritual & Notification Copy                                     |
|Subscription & auth              |Free daily draw, reading credits, subscription angles; Apple/Google sign-in at Screen 11                     |Subscription Tier Spec v1.0; Auth & Monetisation Positioning v1.0|
|Accessibility                    |Alt text, screen reader labels, reduced motion fallbacks, contrast (#93)                                     |Accessibility Copy Rules                                       |
|Sound design                     |Reading audio events (shuffle, deal, select, reveal). Spec #158 not yet written                              |— (see §12)                                                    |
|Avatar Voice Engine              |The architecture behind every companion-voiced LLM output (Dig Deeper synthesis, angles, Minor Arcana companion lines). Invisible to users|Avatar Voice Engine PID v1.0                                   |

**Zen Mode — open items (🔶 require Oso/Luke sign-off):**

- **Center visual** — a pulsing orb or an alternative. Not decided. Nothing should be built for this slot until sign-off.
- **Zen Mode vs Reflection Mode** — whether Zen Mode replaces Reflection Mode (v2, see §11), brings part of it into v1, or sits alongside it.

The full open-item list is in Reading Screen Spec §04.8.

-----

## 07 — Content

### Card Interpretation Copy

All card interpretation content is written in the Majestic parent voice — present-tense, emotionally intelligent, specific enough to feel personal. Companion-voiced lines are either locked, pre-written copy (Major Arcana) or produced at read time by the Avatar Voice Engine from structured card data (Minor Arcana, Dig Deeper synthesis and angles). The parent voice copy is the source of truth.

**Major Arcana — Status: Complete and Locked**

Two content layers exist for all 22 Major Arcana cards:

**Full Interpretations** — `majestic-arcana-interpretations-final.md`
Each card has two full interpretations: a personality card reading (who they are — shadow, essence, archetype) and a soul card reading (who they are here to become). These are the primary content layer. Used in:

- Onboarding birth card reveal (screens 05 and 06) — displayed in full after tap
- Majestic Profile codex entry — accessible at any time
- Reading screen — when a Major Arcana card appears in a draw
- Avatar Voice Engine input — passed as structured domain data (e.g. Dig Deeper synthesis), never as prose to be rewritten

**One-Line Summaries** — `majestic-arcana-oneliners-final.md`
Each card has two one-line summaries: one for the personality card, one for the soul card. These are the surface content layer. Used in:

- Onboarding birth card reveal — displayed immediately on card flip, before read more
- Majestic Profile summary screen (screen 07) — at-a-glance view of both cards
- Avatar Voice Engine input — compact essence line, passed as structured domain data

**Content Rules**

- Parent voice interpretations are never displayed with avatar attribution — they belong to Majestic, not to a companion
- Major Arcana companion lines are pre-written and locked: 88 lines, 4 avatars × 22 cards (Avatar One-Liners — Final, #136). They are not generated at runtime
- Minor Arcana companion lines, Dig Deeper synthesis, and angle outputs are generated at read time through the Avatar Voice Engine Orchestration layer (#205, #208–#210). Card data is always passed as structured data, never freeform prose. The LLM voices Majestic-authored content and synthesises provided signals. It never authors what a card means (Avatar Voice Engine PID v1.0)
- When personality or soul cards appear in a reading, the resonance mechanic triggers — the avatar acknowledges the card using their own voice lines, not the parent interpretation
- Full interpretation copy must never be modified without locking a new version — treat as a content asset, not a working draft

**Minor Arcana — Status: Partial**

Already in place:

- Aura context mapping for all 56 cards, locked (#92)
- Image generation prompt libraries for all four suits (`majestic-minor-arcana-prompt-libraries.md`)
- Dig Deeper content (lore resonance, extended reading, angles) for all 78 cards (Dig Deeper Content — Master Doc)

Still out of scope for v1: dedicated parent-voice interpretation copy, the Minor Arcana equivalent of the Major Arcana full interpretations. The card frame and suit system must be locked before that content is written. Scope and format to be confirmed in Phase 08. Companion lines for Minor Arcana draws come from runtime generation (#210), not stored copy.

**Spread-Level Interpretation — Status: Architecture Defined, Content Pending**
Multi-card readings (Dig Deeper synthesis) draw on a Spread Pattern Library in addition to individual card content — a growing repository of cross-card relational patterns (suit clustering, aura clustering, structural composition) that an experienced reader notices but a card-by-card lookup can’t produce. Structural patterns (computable from existing card data) require no additional sign-off; symbolic/traditional patterns require Luke’s individual review before use, per the synthesis philosophy rules in Dig Deeper Spec v2.0. Applies to user-requested multi-card readings only — not daily draw, not onboarding. Not the same mechanic as journal cross-entry pattern tracking (#143, out of scope for v1) — see Spread Pattern Library for the distinction. Template exists; repository not yet populated.

-----

### Home Screen Daily Content — Co-Star Register

The home screen speaks to the user in a direct, second-person voice informed by their daily card. This is not fortune-telling. Not generic affirmation. It is an awareness frame the user carries through their day.

**Voice register:** Co-Star coded. Second person singular. Fragment sentences. Present tense observation. No hedging. No softening. Feels like it already knows something. This is the neutral Majestic world voice — not avatar-voiced. The avatar lives in Dig Deeper and the altar; the home screen is the world speaking directly.

**Daily content structure:**

1. **Directive line** — one to two sentences, card-informed. *“The pause isn’t failure. Stop trying to outrun it today.”*
1. **Pop culture reference** — one tangible hook that unlocks the card meaning through something the user already knows. Rotates across five types: film, song, historical moment, artwork, quote. Avatar-filtered: Destiny pulls music/neo-soul; Olivia pulls literature/cultural movements; Eli pulls film/anime; Casper pulls sport/performance history.
1. **Observational prompts** — two to three lines, present tense, no checkboxes. *Watch for / Be mindful of / Notice today.* These are not tasks. They are carried.

**Freshness system:** 5–6 references per card per avatar, 30-day no-repeat rotation, moon phase modifier shifts framing language (waxing: lean in; waning: release). 78 cards × 4 avatar filters × 5–6 reference types = ~1,500–1,800 reference units for full deck coverage.

Full spec: Home Screen Spec v1.0.

-----

## 08 — Design Direction

### Visual and Interaction Principles

The full design direction, visual system, component philosophy, motion system, and AI image generation rules are defined in the reference documents listed at the top of this PRD. Those documents take priority over any conflicting direction here.

### World Direction

**Threshold City** — future-mythic luminous eco-tech folklore. A near-future symbolic world where urban systems, environmental regrowth, and spiritual pattern-reading coexist. One world for all users. What changes per avatar is the accent colour system only.

The cyberpunk DNA is present but never announced. The world carries it through behaviour and detail — signal line borders, reflective surfaces, pre-dawn urban light quality — not through aesthetic declaration.

### Navigation Architecture — Three-State Spatial System

The app’s navigation is spatial, not hierarchical. The user moves between three environmental layers of a single world. The metaphor is a window — the user is always looking through it.

**Ground Level (Home):** The user is inside a command center looking out through a panoramic window at Threshold City at eye level. HUD elements overlay the glass. A console hardware frame sits at the bottom edge. This is the operational state — daily draw, daily directive, avatar presence, moon phase.

**Outer Realm (Codex):** A portal or wormhole opens upward and pulls the user through into a cosmic environment. The Codex lives here.

**Self State (Reading + Journal):** A door opens and pulls the user downward into a private interior — a desk, a room. The reading altar sits slightly right; the journal/book sits slightly left. A lateral pan within this state transitions between them. Environments are avatar-specific: Destiny/seascape, Olivia/field, Eli/cityscape, Casper/high-rise.

These states are **nameless to users**. The bottom navigation bar shows four destinations: Home, Codex, Reading, Journal. The environmental states are the world the user moves through — not labelled UI sections.

Full spec: Navigation Architecture Spec v1.0.

### Ground State — Command Center

The Home screen POV is a command center window looking out at Threshold City. HUD corner brackets, sector coordinates (THRESHOLD CITY — SEC.7), AURA LINK ACTIVE pulse, a moving scan line, console LED hardware at the bottom. City skyline with neon crowns in avatar accent colours. Rain, atmospheric haze, moon visible in sky.

The home screen UI floats as a HUD layer over the glass — semi-transparent panels, glassmorphism blur, the city reading through beneath. The user is at the threshold, not inside it.

**Why it works across all three audience clusters:** tabletop/lore-driven reads the sector grid and HUD as world-building system; anime-spiritual reads the rain on glass and atmospheric light as Makoto Shinkai visual language; occult/tarot-esoteric reads the liminal position (at the edge, looking in, preparing) as the threshold before ritual begins.

Full spec: Home Screen Spec v1.0.

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

-----

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
- Daily draw — the recurring ritual touchpoint that drives retention. Talisman hold → direct card reveal. No fan selection. No jumping card. This is intentional and permanent.
- Reading screen — the core product surface where meaning, motion, companion voice, and card imagery converge. Initiated readings (1-card and 3-card spreads) use fan selection for card draw. The quarter deck fan and jumping card phenomenon apply only here.

### Priority 3 — Build lore continuity early

Do not leave the codex and story surfaces for a later release. Even a light early version of lore continuity supports the trust of tabletop and lore-driven users from the start. The world needs to feel like it has rules and memory before it is fully revealed.

### Priority 4 — Card design

- Lock the card frame system — the single most important visual decision
- Build the AI prompt library for Major and Minor Arcana
- Generate and approve card backs

-----

## 10 — Success Criteria

### What Good Looks Like

Majestic succeeds when a user who would never have described themselves as spiritual opens the app and thinks: this was made for me.

It succeeds when someone from the anime, tabletop, or sci-fi subcultures finds the world compelling enough to return to daily — not because they need a reading, but because the ritual itself has become part of how they process their life.

It succeeds when a user screenshots the tiny pixel grandmother in the corner of their reading screen and sends it to a friend saying *did you see this* — and that friend downloads the app to find her.

It succeeds when the user, after a decision they have been avoiding, looks back and feels they trusted themselves. And remembers where that happened.

*You trusted yourself. Remember this.*

-----

## 11 — What Is Not In Scope for First Release

- Full environmental variation per avatar — one world, four accents only
- AR features
- Seasonal or time-based world shifts
- Expanded codex surfaces beyond the first lore fragment
- Avatar clothing marketplace
- Community or social features
- Full 78-card deck on launch — prioritise Major Arcana and one complete suit
- Fan selection in onboarding or daily draw — fan applies to initiated readings only, always
- Jumping card phenomenon in onboarding or daily draw — same scope restriction as fan selection
- Reflection Mode — altar perspective animation, meditative prompts, ambient audio layer (v2). Overlaps with Zen Mode. Relationship pending 🔶 (see Feature Index)
- Journal moodboard mode — canvas editor (#138)
- Alternative card decks (#139)
- Pattern tracking and insight summaries across Journal entries (#143)
- Annual subscription tier — monthly and PAYG only for v1
- Per-avatar Dig Deeper angle interpretations on reading screen — parent voice only in v1
- Automatic journal saves for Dig Deeper synthesis — manual save only in v1

## 12 — Decisions Locked Post-v3.1

The following decisions were made after PRD v3.1 and are recorded here for completeness. Full specs in the referenced documents.

|Decision          |Detail                                                                                                                                                                     |Spec                                     |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
|Subscription model|Daily draw free forever. 3 initiated readings/day free. Dig Deeper AI = reading credit. Love/Career/Life angles = subscription. ~$14.99 AUD/month, ~$2.99 PAYG.            |Subscription Tier Spec v1.0              |
|Auth timing       |Authentication fires at Screen 11 (Companion Confirmed), after avatar first words. Apple + Google Sign In only. No email/password.                                         |Auth & Monetisation Positioning v1.0     |
|Talisman system   |Each avatar has a unique talisman object (Casper: iron prayer beads; Eli: tuning fork; Olivia: stone vessel; Destiny: sea glass). Hold gesture fires on talisman, not card.|Altar & Ritual Spec v2.0                 |
|Pixel Elder lamp  |Pixel Elder initiates every reading via lamp sequence. Isekai lamp → screen dims → radial glow → talisman foregrounded → breath beat.                                      |Pixel Elder Addendum v1.0                |
|Fan scope         |Fan selection and jumping card apply to initiated readings only. Not daily draw. Not onboarding. Permanent.                                                                |Quarter Deck Fan & Jumping Card Spec v2.0|
|Sound design scope|Ambient audio for 1-card and 3-card readings. Events: shuffle, deal, select, reveal. No daily draw audio. Spec (#158) to be written before assets sourced.                 |—                                        |
|Dig Deeper access |Avatar lore resonance + extended reading: free. Love/Career/Life angles: subscription only. Reading-screen synthesis: uses reading credit.                                 |Dig Deeper Spec v2.0                     |

-----

## 13 — Decisions Locked Post-v3.2

The following decisions were made after PRD v3.2 and are recorded here for completeness. Full specs in the referenced documents.

|Decision                     |Detail                                                                                                                                                                                                                                                                                                |Spec                                                     |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|
|Navigation architecture      |Three-state spatial system: Ground (Home), Outer Realm (Codex), Self State (Reading + Journal). States nameless to users. Bottom nav: 4 destinations, icon-only, avatar accent active state. Portal up to Outer Realm. Door down to Self State. Reading ↔ Journal direct fade.                        |Navigation Architecture Spec v1.0                        |
|Ground state — command center|Home screen POV is a command center window looking out at Threshold City. HUD layer over glass. Console hardware frame. City skyline with avatar-accent neon, rain, atmospheric haze.                                                                                                                 |Home Screen Spec v1.0                                    |
|Home screen content system   |Co-Star voice register: second person, direct, fragment, no hedging. Daily directive (card-informed, world voice). Pop culture reference card (avatar-filtered across film/song/history/artwork/quote). Observational prompts: Watch for / Be mindful of / Notice today. No to-do list. No checkboxes.|Home Screen Spec v1.0                                    |
|Codex two-tier expansion     |Base layer: all users, 78 cards. Expanded layer: avatar lore, backstories, avatar-specific interpretations, gamified unlock content. One Codex that grows. Eligibility trigger TBD (Luke decision).                                                                                                   |Codex Spec — Section 12                                  |
|Self state desk scene        |Animated desk stage (Lottie, not GIF). Two orientations: altar right (readings, drink pour animation), journal left (book opening animation). Lateral pan within Self State. Avatar-specific backgrounds: Destiny/seascape, Olivia/field, Eli/cityscape, Casper/high-rise.                            |Navigation Architecture Spec v1.0, Journal Spec (updated)|
|Portal visual treatment      |TBD — Luke decision required. Blocker for portal system build (#109).                                                                                                                                                                                                                                 |Navigation Architecture Spec v1.0                        |
|Avatar colour temperature    |Whether city neon at ground state shifts per active avatar — pending Luke confirmation.                                                                                                                                                                                                               |Navigation Architecture Spec v1.0                        |

-----

*Majestic — PRD v4.1 — Working Document*
*Design System, Brand Voice, and all reference documents take priority where direction conflicts.*
*Your adventure. But Majestic.*