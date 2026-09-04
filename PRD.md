# Majestic — PRD (engineering pointer)

This is a short, engineering-facing summary. The canonical, full PRD is **`docs/01-product-strategy/majestic-prd-v4.md`** — Google Drive is the editorial source of truth for it (see `docs/README.md`); this repo mirrors the approved version. When this file and the canonical PRD disagree, the canonical PRD wins. When any of the ~25 referenced spec documents listed at the top of the canonical PRD disagree with the PRD body, the spec document wins (the PRD says so explicitly).

## What it is, in one paragraph

Majestic is an intuition-coaching app that uses tarot as a symbolic framework, delivered through four interpretive companions — Casper (fire, catalytic), Olivia (earth, grounding), Eli (air, reframing), Destiny (water, holding) — each reading the same card differently. Every user gets a permanent two-card "Majestic Profile" (Personality + Soul card) from their date of birth at onboarding. It is explicitly *not* fortune-telling, not a wellness app, not a personality test.

## The core mechanic

Same card draw → four different companion interpretations depending on which avatar is active. The avatar choice only changes accent colour and voice, never layout or world — "One World. Four Accents." (PRD §09) is a deliberate v1 scope decision.

## World model

Threshold City, navigated as three spatial states, not a tab hierarchy the user is told about:

- **Ground (Home)** — command-center window looking out at the city. Daily draw lives here.
- **Outer Realm (Codex)** — reached via a portal transition. Full 78-card deck, world lore, discovery.
- **Self State (Reading + Journal)** — reached via a door transition, a desk scene the user pans laterally between altar (Reading) and book (Journal).

These three states are nameless to the user; the bottom nav shows four destinations: **Home, Codex, Reading, Journal** (PRD §06, §13). **As of this repo's current state, the shipped bottom nav has 3 tabs (Today, Reading, Profile) with no Codex or Journal tab** — see `ARCHITECTURE-ESSENTIALS.md` for what that gap means and what's been scaffolded toward closing it.

## v1 scope (PRD §09, §11)

**In:** avatar illustrations (3 states each), onboarding (11 screens, 3 phases), daily draw (talisman hold → direct reveal, no fan/jumping-card), initiated 1-card/3-card readings (fan selection + jumping card apply *only* here), early Codex/lore continuity, Major Arcana content (locked/complete) + one Minor Arcana suit.

**Out:** AR, seasonal world shifts, avatar clothing marketplace, social/community features, full 78-card deck at launch, annual subscription tier, Reflection Mode, per-avatar Dig Deeper angle interpretations on the reading screen.

## Monetisation (`docs/01-product-strategy/majestic-subscription-tier-spec.md`)

Free: unlimited daily draw, 3 initiated readings/day, full Codex browsing, full Journal. Gated: 4th+ reading/day, Dig Deeper AI synthesis beyond the 3 free/day, Love/Career/Life angle interpretations. ~$14.99 AUD/month subscription or ~$2.99 AUD pay-as-you-go per reading, via RevenueCat. **Not implemented in code yet** — see `supabase/migrations/0002_subscription_and_journal.sql` for the schema this scaffolds toward, and `src/types/subscription.ts`.

## Where the data model lives

`supabase/migrations/` (see `supabase/README.md`) and `src/types/`. No migrations existed in this repo before this pass — the schema had only ever been implied by the TypeScript calling code (`src/lib/supabase/v2/*.ts`).

## Read next

`ARCHITECTURE.md` for how this is actually built, `ARCHITECTURE-ESSENTIALS.md` for a blunt read on what's fragile, missing, or over-built right now.
