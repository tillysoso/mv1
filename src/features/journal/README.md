# Journal feature

Status: scaffolded, not built. Spec: `docs/03-experience-and-feature-specs/majestic-journal-spec.md`.

What exists:
- `src/types/journal.ts` — `JournalEntry` type
- `src/lib/supabase/v2/journal.ts` — `saveJournalEntry`/`getJournalEntries`, matching `journal_entries` (`supabase/migrations/0002_subscription_and_journal.sql`)
- `app/(tabs)/journal.tsx` — placeholder screen, not wired to the data layer above yet

What's not started:
- The archive feed (spec §04): reading-linked vs. standalone entry rendering, avatar accent glow per entry
- The standalone write flow (spec §05): intention field, compose button, save
- The desk-scene environmental layer (spec §02A) — Lottie book-opening animation, avatar-specific backgrounds
- Auto-save from a reading's "Keep this" action (spec §06)
