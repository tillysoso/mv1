# Dig Deeper feature

Status: not started — no types, no components, no screen. Spec: `docs/03-experience-and-feature-specs/majestic-dig-deeper-spec-v2.md`.

This is the least-scaffolded feature in the repo on purpose: it's an LLM-driven synthesis feature (avatar-voiced angle interpretations — Love/Career/Life) gated by the subscription/reading-credit system in `src/features/subscription/`, which itself has no working implementation yet (see that folder's README). Building Dig Deeper's UI or types ahead of the credit-gating logic would just create another thing to rewire later — start with `src/features/subscription/` first.

Per PRD v4 §11 (out of scope for first release): "Per-avatar Dig Deeper angle interpretations on reading screen — parent voice only in v1." Confirm current scope against the PRD before starting this feature; it may have narrowed further since v4.
