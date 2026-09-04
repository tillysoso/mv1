# Subscription feature

Status: scaffolded, not built. Spec: `docs/01-product-strategy/majestic-subscription-tier-spec.md`.

What exists:
- `src/types/subscription.ts` — `SubscriptionState`, `ReadingCreditState`, `FREE_DAILY_READING_CREDITS`
- `profiles` columns in `supabase/migrations/0002_subscription_and_journal.sql` (`subscription_active`, `subscription_tier`, `subscription_expires_at`, `readings_today`, `readings_reset_at`)

What's not started — in dependency order:
1. RevenueCat SDK integration (no `react-native-purchases` or equivalent in `package.json` yet; `.env.example` has placeholder keys)
2. The Supabase Edge Function that receives RevenueCat webhooks and writes `subscription_active`/`subscription_tier`/`subscription_expires_at` — **required before `0002`'s RLS gap is safe to rely on**, see `supabase/README.md`
3. Reading-credit tracking and reset (spec §02, §06 — "Option A" reset-on-app-open is the spec's own v1 recommendation)
4. The upgrade-prompt UI at the three entry points the spec names (reading credit exhausted, Codex angle pills, Profile surface)

Don't build the UI ahead of step 2 — a client that can flip its own `subscription_active` to `true` before the webhook path exists is a real (if low-stakes pre-launch) exploit, not just an ordering nicety.
