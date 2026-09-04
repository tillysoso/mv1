# Supabase

This project has no Supabase CLI project scaffold yet (no `supabase/config.toml`) — these are hand-written SQL migrations, not `supabase db diff` output. If you install the Supabase CLI later, run `supabase init` in this folder and it will pick these up as long as they stay in `migrations/` with the numeric prefix.

## Applying migrations

Against a real project (via the [SQL editor](https://supabase.com/dashboard) or `psql`), run in order:

1. `migrations/0001_init.sql` — `profiles`, `readings`, `streaks`. Matches what `src/lib/supabase/v2/*.ts` already reads and writes.
2. `migrations/0002_subscription_and_journal.sql` — subscription columns on `profiles`, `journal_entries` table. Nothing in `src/` uses these yet; see the comments at the top of that file before building against it.

## What's deliberately not here

- **`card_content` table** — v1 card copy is TS files (`src/features/onboarding/cardInterpretations.ts`, `cardOneliners.ts`), not database rows. `0002` explains why a DB-backed version is referenced in the subscription spec but not created.
- **Codex unlock tracking** — the eligibility rule for the Codex "expanded layer" is an open product decision (PRD v4 §06), not a schema detail. Don't build a table for it until that decision is made.
- **RevenueCat webhook handler** — `subscription_active`/`subscription_tier`/`subscription_expires_at` on `profiles` are meant to be written only by a Supabase Edge Function receiving RevenueCat webhooks. That function doesn't exist in this repo yet, and the RLS policy from `0001_init.sql` currently lets a signed-in user overwrite those columns themselves — tighten that before subscriptions go live (see the comment in `0002_subscription_and_journal.sql`).

## Environment

`src/lib/supabase/client.ts` reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). Without them it falls back to a placeholder client and the app runs in "prototype mode" — `isSupabaseConfigured` is `false`, `app/_layout.tsx` skips the auth-gated routing entirely, and everything reads/writes local Zustand state only. That's the fastest path to running the UI without a Supabase project.
