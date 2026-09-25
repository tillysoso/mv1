# MAJESTIC — SPREAD PATTERN LIBRARY

## Template / Placeholder — v0.1

*This is a working template, not locked content. Replace this doc once the real repository has entries in it. Working title only, rename freely.*

-----

## 00 — WHAT THIS IS

A growing repository of cross-card, whole-spread interpretive patterns — the "reads the room" knowledge an experienced tarot reader has that a card-by-card lookup can't produce. Sits between the raw card/position/aura data and the avatar voice layer in the synthesis pipeline: it detects structure in the spread before the LLM ever writes a word.

**In scope:** user-led, user-requested readings only (3-card now, 5-card when built). Upright cards only, no reversals.

**Out of scope:** onboarding (birth card, birth + soul card), daily draw.

**Not the same thing as journal pattern tracking:** This document is about patterns detected *within one spread* — the relationships between cards drawn together in a single reading. It has nothing to do with patterns detected *across multiple readings over time* (e.g. "you've drawn shadow cards for two weeks"). That's a longitudinal concept, it lives in the journal domain (tracked as #143), and it's explicitly out of scope for journal v1 per `majestic-journal-spec.md` Section 12. Keep the two separate on purpose — this repository should never quietly grow into cross-entry tracking just because both use the word "pattern."

-----

## 01 — THE FILTER

Every candidate entry gets run against this before it's logged as anything other than a raw note. If it fails any of these, it doesn't graduate, no matter how good the vibe.

1. Does it describe a pattern **in the cards**, not a claim about the user's life?
2. Would it survive being said about a spread with no submitted question? (No "reading about a man," no assumed relationship context.)
3. Is the reasoning structural (traceable to suit/number/aura/position) or symbolic (inherited tradition, no mechanism)? Tag it either way. Don't blur the two.
4. Would Casper, Olivia, Eli, or Destiny actually say the conclusion this produces? If it reads like fortune-telling, it fails regardless of how clean the trigger condition is.

-----

## 02 — TWO KINDS OF PATTERN

| Type | What it is | Risk | Sign-off needed |
|---|---|---|---|
| **Structural** | Computable from data already in the spread — suit counts, aura clustering, repeated numbers, arcana ratio | Low. Falsifiable, testable in code. | None beyond the filter above |
| **Symbolic** | Traditional/lore-based pairings — specific cards read together carry inherited meaning | High. Easy to slide into fortune-telling. This is where tarot-tok contamination lives. | 🔶 Luke's sign-off required per entry — creative authority per ways-of-working |

-----

## 03 — CAPTURE FORMAT (raw notes — start here, low friction)

Use this for anything you or Luke jot down before it's been tested against the filter. This is what "trolling through Luke's document" should get sorted into first.

```
Cards involved: 
What I notice: 
Where this comes from: [gut/experience] or [traditional source] or [structural logic]
Spread example (if any): 
```

-----

## 04 — PROMOTION FORMAT (graduated entries — dev-ready)

Only entries that pass Section 01 move here. This is the shape a developer builds against.

```
id: 
trigger: [condition, e.g. "3+ cards share a suit"]
type: structural | symbolic
observation: [what to surface — phrased as observation, never prediction]
source: [reasoning or provenance]
status: draft | approved | rejected
rejection_reason: [required if status = rejected]
```

-----

## 05 — WORKED EXAMPLES

*Two approved, two rejected, so the filter is modeled, not just described. Rejected examples pulled from tarot-tok material Oso reviewed 25 Sep 2026.*

**APPROVED**

```
id: pattern-suit-clustering-swords
trigger: 2+ of 3 cards share the suit of Swords
type: structural
observation: this spread leans heavily analytical/mental — worth naming as a texture of the reading, not a verdict on the user's thinking style
source: elemental suit-balance logic, same principle as an astrological stellium
status: approved
```

```
id: pattern-card-orientation-facing
trigger: cards in adjacent positions depict figures facing toward each other
type: structural
observation: name the visual connection between the two positions as a relationship in the spread
source: standard reader technique — reading composition/gaze direction across a layout
status: draft
rejection_reason: n/a — draft only because it requires new per-card metadata (facing direction) not yet in cardData.ts
```

**REJECTED**

```
id: pattern-repeating-cards-fate
trigger: same card or number repeats across positions
type: symbolic
observation: [rejected before drafting]
source: tarot-tok material, 25 Sep 2026
status: rejected
rejection_reason: predictive claim ("persistence of fate"). Violates A02 — not a predictive tool.
```

```
id: pattern-high-priestess-hidden-woman
trigger: High Priestess + Moon/3 of Cups/3 of Swords/7 of Swords
type: symbolic
observation: [rejected before drafting]
source: tarot-tok material, 25 Sep 2026
status: rejected
rejection_reason: assumes relationship context and a specific person the user never submitted. Violates A05 — no context assumption.
```

-----

## 06 — OPEN QUESTIONS 🔶

- Facing/gaze-direction patterns need a new metadata field per card (`faces: left/right/center` or similar) that doesn't exist in `minorArcana-cardData.ts` today. That's production work, not a docs task — flag for whoever owns card data.
- Should every symbolic entry require Luke's individual sign-off before "approved," or can a batch go to him at once? Given his creative authority is per-decision in `ways-of-working.md`, leaning toward individual — confirm with him.
- Journal save behavior for spread-level pattern observations is unscoped. Needs a decision, not an assumption, before it's built. Don't let it leak into v1 by default.
- Interpretation engine build-out (how detected patterns actually get computed and passed into the orchestration edge function) is not designed yet — this document defines the content and filter, not the runtime implementation. Separate task.

-----

## 07 — COMPANION DOCUMENTS

| Document | Relationship |
|---|---|
| `majestic-dig-deeper-spec-v2.md` | A01–A08 rules this filter is built to protect. Section 04 lists this library as a pending LLM input. |
| `majestic-avatar-llm-seeds.md` | Voice layer this content ultimately has to sound like |
| `majestic-journal-spec.md` | Boundary reference — cross-entry pattern tracking (#143) lives there and is out of scope v1, not here |
| `majestic-prd-v4.md` | Section 07, "Spread-Level Interpretation" — architecture status tracked here |

-----

*Majestic — Spread Pattern Library — v0.1 (template)*
*Your adventure. But Majestic.*
