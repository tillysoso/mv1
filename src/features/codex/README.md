# Codex feature

Status: scaffolded, not built. Spec: `docs/03-experience-and-feature-specs/majestic-codex-spec.md`. PRD summary: `PRD.md` and PRD v4 §06.

What exists:
- `src/types/codex.ts` — `CodexEntry`, `CodexExpandedContent`, `CodexUnlockRule` (deliberately unimplemented — see below)
- `app/(tabs)/codex.tsx` — placeholder screen

What's not started:
- The card grid / discovery model (spec) — which cards are "discovered" (per PRD, first draw unlocks a card into the Codex) vs. locked
- Card detail view — avatar lore resonance, extended reading, Dig Deeper content
- The two-tier base/expanded split. **Do not build the expanded-layer unlock rule** without a product decision first — PRD v4 §06 leaves it explicitly TBD (subscription vs. streak milestone vs. combination). `CodexUnlockRule` in `src/types/codex.ts` is typed but has no implementation for this reason.
