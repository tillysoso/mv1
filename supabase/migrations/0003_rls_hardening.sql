-- Majestic — RLS hardening (tracker #145)
-- Run after 0001_init.sql. Safe to run before or after 0002: it only names
-- 0001 columns, and everything below is idempotent (revoke/grant/alter).
--
-- Why this exists: the RLS policies in 0001 are row-scoped ("you may update
-- YOUR row"), not column-scoped. RLS can't restrict which columns a client
-- writes, so on its own it lets a signed-in user set any column on their own
-- profile — including subscription_active once 0002 adds it. Postgres column
-- privileges are the tool for that: revoke table-wide INSERT/UPDATE from the
-- client roles, then grant back only the columns the app actually writes.
-- RLS policies still apply on top of these grants; nothing here replaces them.
--
-- Any column added later (e.g. by 0002) is NOT client-writable until it's
-- explicitly granted here. That is the intended default: server-owned fields
-- are written by Edge Functions using the service role, which bypasses both
-- grants and RLS.

-- ─── anon: no direct table access at all ───────────────────────────────────
-- Every policy is keyed on auth.uid(), which is null for anon, so this
-- changes no behaviour — it removes the dependency on policies being right.

revoke all on profiles, readings, streaks from anon;

-- ─── profiles ──────────────────────────────────────────────────────────────
-- Client-writable: onboarding fields only. Matches the payloads in
-- src/lib/supabase/v2/profile.ts (saveProfile, updateAvatar). `id` needs
-- UPDATE as well as INSERT because PostgREST upserts emit
-- `on conflict (id) do update set id = excluded.id, ...`; the
-- "profiles: update own" policy stops it being changed to anyone else's id.
--
-- Server-only (no client grant): created_at, updated_at, and from 0002
-- readings_today, readings_reset_at, subscription_active, subscription_tier,
-- subscription_expires_at. See supabase/README.md for the open decision on
-- readings_today / readings_reset_at.

revoke insert, update on profiles from authenticated;

grant insert (
  id,
  date_of_birth_day, date_of_birth_month, date_of_birth_year,
  personality_card_number, personality_card_name,
  soul_card_number, soul_card_name,
  same_card,
  active_avatar
) on profiles to authenticated;

grant update (
  id,
  date_of_birth_day, date_of_birth_month, date_of_birth_year,
  personality_card_number, personality_card_name,
  soul_card_number, soul_card_name,
  same_card,
  active_avatar
) on profiles to authenticated;

-- ─── streaks ───────────────────────────────────────────────────────────────
-- Client-writable: the draw record only (src/lib/supabase/v2/streaks.ts,
-- recordDraw). current_streak / longest_streak stay server-only: 0002 notes
-- they may gate the Codex expanded layer, and a client-computed counter would
-- be trivially spoofable. Nothing computes them yet — see supabase/README.md.

revoke insert, update on streaks from authenticated;

grant insert (user_id, last_draw_date, last_card_id) on streaks to authenticated;
grant update (user_id, last_draw_date, last_card_id) on streaks to authenticated;

-- ─── readings ──────────────────────────────────────────────────────────────
-- Unchanged: insert + select own only (0001). No UPDATE/DELETE policy exists,
-- so those are already denied — a saved reading is an immutable record.

-- ─── set_updated_at() ──────────────────────────────────────────────────────
-- Pin search_path so the trigger function can't be hijacked by objects in a
-- caller-controlled schema (Supabase advisor: function_search_path_mutable).
-- now() lives in pg_catalog, which is always searched, so the body still works.

alter function set_updated_at() set search_path = '';
