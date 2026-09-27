# Supabase

This project has no Supabase CLI project scaffold yet (no `supabase/config.toml`) — these are hand-written SQL migrations, not `supabase db diff` output. If you install the Supabase CLI later, run `supabase init` in this folder and it will pick these up as long as they stay in `migrations/` with the numeric prefix.

## Applying migrations

Against a real project (via the [SQL editor](https://supabase.com/dashboard) or `psql`), run in order:

1. `migrations/0001_init.sql` — `profiles`, `readings`, `streaks`. Matches what `src/lib/supabase/v2/*.ts` already reads and writes.
2. `migrations/0002_subscription_and_journal.sql` — subscription columns on `profiles`, `journal_entries` table. Nothing in `src/` uses these yet; see the comments at the top of that file before building against it.
3. `migrations/0003_rls_hardening.sql` — column-level write grants on `profiles` and `streaks`, so a signed-in user can only write the columns the app actually sends. Idempotent, and safe before or after `0002`, but **never apply `0002` without it**: RLS alone is row-scoped and would let users set `subscription_active` on themselves.

`0001` and `0002` use plain `create policy`, so they fail if re-run against a database that already has those policy names. If the live project was set up by hand, compare its policies (`select * from pg_policies where schemaname = 'public'`) before running them.

All client data access goes through `src/lib/supabase/v2/`. Feature code shouldn't call `supabase.from(...)` directly. A column the client writes has to be in a `v2/` payload **and** in the grants in `0003`, or the write fails with `permission denied`.

## What's deliberately not here

- **`card_content` table** — v1 card copy is TS files (`src/features/onboarding/cardInterpretations.ts`, `cardOneliners.ts`), not database rows. `0002` explains why a DB-backed version is referenced in the subscription spec but not created.
- **Codex unlock tracking** — the eligibility rule for the Codex "expanded layer" is an open product decision (PRD v4 §06), not a schema detail. Don't build a table for it until that decision is made.
- **RevenueCat webhook handler** — `subscription_active`/`subscription_tier`/`subscription_expires_at` on `profiles` are meant to be written only by a Supabase Edge Function receiving RevenueCat webhooks (service role, which bypasses grants and RLS). That function doesn't exist in this repo yet. `0003` already makes those columns client-read-only.
- **Profile auto-create trigger on `auth.users`** — tracker #111 says one was added by hand in the dashboard; no migration creates it. The client doesn't depend on it (`saveProfile` and `updateAvatar` both upsert). Don't add one here without first checking the live project: a second trigger inserting the same `profiles.id` would make every signup fail.

## Open decisions (need a human, not a migration)

- **Who writes `readings_today` / `readings_reset_at`?** The subscription tier spec offers Option A (client resets on app open) or Option B (scheduled server function). `0003` treats them as server-only, which fits B and any server-enforced credit limit. Choosing A means granting the client `update (readings_today, readings_reset_at)`, which also lets a user refill their own credits.
- **Who computes `current_streak` / `longest_streak`?** Nothing does yet. `0003` keeps them server-only because they may gate the Codex expanded layer. The likely answer is a trigger on `streaks`, but the streak rules (and timezone handling, see `ARCHITECTURE-ESSENTIALS.md`) are a product call.

## Environment

`src/lib/supabase/client.ts` reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). Without them it falls back to a placeholder client and the app runs in "prototype mode" — `isSupabaseConfigured` is `false`, `app/_layout.tsx` skips the auth-gated routing entirely, and everything reads/writes local Zustand state only. That's the fastest path to running the UI without a Supabase project.
