-- Majestic — subscription gating + journal
-- DRAFT. Nothing in src/ reads or writes these yet — this migration exists so
-- the schema the product docs already commit to is in the repo before
-- engineering starts wiring it up, per PRD v4 section 12/13 and:
--   docs/01-product-strategy/majestic-subscription-tier-spec.md (section 06)
--   docs/03-experience-and-feature-specs/majestic-journal-spec.md (sections 04-06)

-- ─── profiles: subscription + reading-credit columns ──────────────────────
-- Column set and naming taken verbatim from majestic-subscription-tier-spec.md
-- section 06 ("SUPABASE SCHEMA ADDITIONS"). Do not rename without updating
-- that doc too.

alter table profiles add column if not exists readings_today integer not null default 0;
alter table profiles add column if not exists readings_reset_at timestamptz not null default now();
alter table profiles add column if not exists subscription_active boolean not null default false;
alter table profiles add column if not exists subscription_tier text
  check (subscription_tier in ('monthly', 'payg') or subscription_tier is null);
alter table profiles add column if not exists subscription_expires_at timestamptz;

-- subscription_active / subscription_tier / subscription_expires_at are set
-- ONLY by the RevenueCat webhook → Supabase Edge Function (spec section 06).
-- The existing "profiles: update own" policy from 0001_init.sql would let a
-- signed-in user overwrite these client-side — once the webhook function
-- exists, split this into a column-scoped policy or a security-definer RPC
-- so the client can update onboarding fields but never subscription fields.

-- ─── journal_entries ───────────────────────────────────────────────────────
-- Two shapes in one table, matching majestic-journal-spec.md section 04:
--   - reading-linked entry: reading_id set, card content lives on the
--     referenced `readings` row, this row carries the user's note/intention
--   - standalone entry: reading_id null, note is the entry itself
-- spread_label mirrors readings.spread_type for entries that came from a
-- draw, so the feed doesn't need to join readings just to render the label.

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  reading_id uuid references readings (id) on delete set null,
  avatar_id text check (avatar_id in ('casper', 'olivia', 'eli', 'destiny')),
  intention text,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint journal_entries_has_content check (
    reading_id is not null or note is not null
  )
);

create index if not exists journal_entries_user_id_created_at_idx
  on journal_entries (user_id, created_at desc);

alter table journal_entries enable row level security;

create policy "journal_entries: select own" on journal_entries
  for select using (auth.uid() = user_id);

create policy "journal_entries: insert own" on journal_entries
  for insert with check (auth.uid() = user_id);

create policy "journal_entries: update own" on journal_entries
  for update using (auth.uid() = user_id);

create policy "journal_entries: delete own" on journal_entries
  for delete using (auth.uid() = user_id);

create trigger journal_entries_set_updated_at
  before update on journal_entries
  for each row execute function set_updated_at();

-- ─── card_content — NOT created here ───────────────────────────────────────
-- majestic-subscription-tier-spec.md section 06 references
-- "ALTER TABLE card_content RENAME COLUMN interp_general TO interp_life"
-- as if a DB-backed card_content table already exists. It does not — v1
-- card copy lives entirely in TS (src/features/onboarding/cardInterpretations.ts,
-- cardOneliners.ts, src/features/daily-draw/minorArcanaPrompts.ts). Deciding
-- whether angle-gated content (Love/Career/Life) moves into a real table is
-- a real decision, not a schema detail — see ARCHITECTURE-ESSENTIALS.md.

-- ─── codex unlock tracking — deliberately not created ─────────────────────
-- PRD v4 section 06 leaves the Codex "expanded layer" eligibility trigger as
-- "TBD (subscription, streak milestone, or combination — pending decision)".
-- Don't invent a codex_unlocks table ahead of that decision; profiles.
-- subscription_active plus streaks.current_streak (0001_init.sql) are
-- probably sufficient inputs once the rule is picked.
