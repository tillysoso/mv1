-- Majestic — initial schema
-- Tables inferred from src/lib/supabase/v2/*.ts and src/features/daily-draw/useDailyDraw.ts.
-- No migration existed anywhere in the repo before this file — this is the first
-- time the shape the app code already assumes is written down. Review before
-- running against a real project; RLS policies below are the minimum viable
-- "users see only their own rows" set, not a full security audit.

-- ─── profiles ──────────────────────────────────────────────────────────────
-- One row per authenticated user. id == auth.users.id (1:1, not a separate PK).

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  date_of_birth_day smallint check (date_of_birth_day between 1 and 31),
  date_of_birth_month smallint check (date_of_birth_month between 1 and 12),
  date_of_birth_year smallint check (date_of_birth_year between 1900 and 2100),
  personality_card_number smallint check (personality_card_number between 0 and 21),
  personality_card_name text,
  soul_card_number smallint check (soul_card_number between 0 and 21),
  soul_card_name text,
  same_card boolean,
  active_avatar text check (active_avatar in ('casper', 'olivia', 'eli', 'destiny')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles: select own" on profiles
  for select using (auth.uid() = id);

create policy "profiles: upsert own" on profiles
  for insert with check (auth.uid() = id);

create policy "profiles: update own" on profiles
  for update using (auth.uid() = id);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

-- ─── readings ──────────────────────────────────────────────────────────────
-- One row per saved reading (daily draw or initiated 1-card/3-card spread).
-- `cards` stores the TarotCard[] snapshot at draw time (id, name, number,
-- suit, auraContext) — denormalised on purpose so historical readings don't
-- shift if card copy or aura rules change later.

create table if not exists readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  spread_type text not null check (spread_type in ('single', 'three_card')),
  avatar_id text check (avatar_id in ('casper', 'olivia', 'eli', 'destiny')),
  cards jsonb not null,
  reflection_note text,
  created_at timestamptz not null default now()
);

create index if not exists readings_user_id_created_at_idx
  on readings (user_id, created_at desc);

alter table readings enable row level security;

create policy "readings: select own" on readings
  for select using (auth.uid() = user_id);

create policy "readings: insert own" on readings
  for insert with check (auth.uid() = user_id);

-- ─── streaks ───────────────────────────────────────────────────────────────
-- One row per user. Tracks the daily-draw streak. last_draw_date is a plain
-- date (not timestamptz) because the app compares it to a local YYYY-MM-DD
-- string (see todayString() in useDailyDraw.ts) — this does NOT account for
-- timezone, see ARCHITECTURE-ESSENTIALS.md.

create table if not exists streaks (
  user_id uuid primary key references auth.users (id) on delete cascade,
  last_draw_date date not null,
  last_card_id text not null,
  current_streak integer not null default 1,
  longest_streak integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table streaks enable row level security;

create policy "streaks: select own" on streaks
  for select using (auth.uid() = user_id);

create policy "streaks: upsert own" on streaks
  for insert with check (auth.uid() = user_id);

create policy "streaks: update own" on streaks
  for update using (auth.uid() = user_id);

create trigger streaks_set_updated_at
  before update on streaks
  for each row execute function set_updated_at();

-- current_streak / longest_streak are declared but not yet computed anywhere
-- in application code — useDailyDraw.ts only writes last_draw_date and
-- last_card_id. Incrementing/resetting the streak counters needs either a
-- trigger here or client-side logic before this table is load-bearing.
