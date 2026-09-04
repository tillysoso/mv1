# Majestic — Architecture Essentials

Condensed architecture outline for agents, plus an honest read on risk. Everything below is grounded in what's actually in the repo as of this pass (commit-by-commit, this file's own diff shows what changed) — not speculation about intent.

## Outline (30-second version)

- Expo/React Native app, file-based routing (`app/`), Zustand state (`src/stores/`), Supabase backend (`src/lib/supabase/v2/`).
- One world (Threshold City), four avatar accent themes swapped via `avatarStore.activeAvatar` — never separate layouts.
- Onboarding (11 screens) → daily draw (Home tab) → initiated readings (1-card/3-card) → (planned, not shipped) Journal + Codex.
- Card/companion copy is TypeScript data, not database rows. Schema for what *is* in the database: `supabase/migrations/`.
- Full detail: `ARCHITECTURE.md`. Product intent: `PRD.md` → `docs/01-product-strategy/majestic-prd-v4.md`.

---

## What was actually broken (found and fixed in this pass)

Before this pass, **at least 11 files failed to even parse or ran corrupted logic**, all from what looks like the same accidental-duplication event (a bad merge or copy/paste), not deliberate code:

| File | What was wrong |
|---|---|
| `app/_layout.tsx` | Duplicate `import`/`function`/`if` — `SyntaxError: Identifier already declared`. The entire app's root layout wouldn't build. |
| `app/(tabs)/index.tsx`, `app/(tabs)/reading.tsx` | Two full competing implementations spliced into one file, including **two `export default function`** in `reading.tsx` — also a hard `SyntaxError`. |
| `app/(onboarding)/{confirm,personality,quiz,soul,name,recommendation,calculating}.tsx` | Duplicate imports, a duplicate `Pressable` with two `style`/`onPress` props on the same element (JSX silently keeps only the last — meaning the intended "disabled while selected" behaviour was dead code), an object literal missing a closing brace (`personality.tsx`, `soul.tsx` — genuine `SyntaxError`), an `if (currentQ === ...)` and a `handleSelect(...)` reference to state variables (`confirming`, `confirmOpacity`, `confirmStyle`) that were never declared (`confirm.tsx` — `ReferenceError` at runtime). |
| `src/features/daily-draw/useDailyDraw.ts` | `draw()` called `saveReading()` and the streak `upsert()` **twice per draw** — every daily draw was double-writing to the database. |
| `package.json` | Three conflicting `expo-font` version entries, two conflicting `expo-splash-screen` entries (JS object literals silently keep the last, so this wasn't a hard error, but it was non-deterministic which version actually installed). |
| `.github/workflows/webpack.yml` | Duplicate YAML keys (`name`, `jobs.build`/`jobs.check`, matrix values, steps) — undefined behaviour in the CI parser, and the file was misleadingly named for a webpack build the repo doesn't use. |

All of the above are fixed in this pass. **If you (the reader) find another instance of this same pattern** — two `import` lines from one module, two `export default function` in a file, a repeated JSX prop, a repeated statement inside an `async` function — it's the same bug class. Don't assume it's intentional.

This means: **run `npm run typecheck` and `npm test` right now**, before writing anything new, to confirm the fixes hold in your environment. `node_modules` wasn't present when this pass ran, so none of the fixes here were verified against a real `expo`/`tsc` install — they were verified by hand (reading every changed file fully, tracing every symbol reference) and by two repo-wide scripted sweeps for duplicate imports/exports and brace-balance, but a real compiler pass is still owed.

---

## What will probably break next

1. **Streak logic has no timezone handling.** `useDailyDraw.ts`'s `todayString()` uses the device's local date. A user who travels, or whose device clock shifts across a DST boundary near midnight, can have their streak reset (or not reset) incorrectly. `streaks.last_draw_date` is a plain `date` column — there's no stored timezone to reconcile against.
2. **No debounce/guard on the daily-draw button.** `app/(tabs)/index.tsx`'s idle-state button is only hidden by `!hasDrawnToday && !isLoading` — nothing disables it while `drawing` is `true` mid-async. A fast double-tap before the first `draw()` resolves can fire two draws (which, now that the double-write bug above is fixed, means two *distinct* reading rows and two streak upserts racing each other).
3. **Errors are swallowed silently almost everywhere they touch Supabase.** Streak lookups, reading saves, avatar-preference syncs — all wrapped in `try/catch` that only does `console.error`. There is no user-facing "something went wrong, try again" path anywhere in the data layer. Fine for a prototype; not fine to ship with.
4. **The RLS policy gap on subscription columns is real, not hypothetical.** `supabase/migrations/0002_subscription_and_journal.sql` adds `subscription_active`/`subscription_tier`/`subscription_expires_at` to `profiles`, but the existing "update own profile" policy from `0001_init.sql` would let a signed-in user set `subscription_active = true` on themselves via the Supabase client, once that migration is applied and before a server-side write path replaces the client-writable policy. This is flagged in both the migration file and `supabase/README.md` — don't apply `0002` to a real project without addressing it first.
5. **`package.json`'s dependency versions look hand-edited, not `expo install`-managed.** Now that the duplicates are gone, it's worth running `npx expo install --check` before relying on this dependency set — nothing here confirms every version is actually compatible with Expo SDK 54.
6. **Web-only analytics on a native-first app.** `src/lib/analytics/index.ts`'s `gtag()` wrapper hard-returns on `Platform.OS !== 'web'`. Every `trackNavigationClick`/`trackQuizAnswer`/etc. call site fires silently into nothing on iOS/Android. If product decisions are meant to be informed by onboarding funnel data, that data currently only exists for web sessions.

## What edge cases are missing

- **Offline/network-failure handling.** "Prototype mode" (`isSupabaseConfigured === false`) is the only fallback path in the data layer. A configured app that loses network mid-session has no distinct handling from a genuine server error — both just log and move on.
- **Reading-credit reset.** The subscription spec (`majestic-subscription-tier-spec.md` §06) specifies resetting `profiles.readings_today` by comparing `readings_reset_at` on app open. Nothing in `src/` implements this yet — it's schema-only (`0002_subscription_and_journal.sql`).
- **Codex "expanded layer" eligibility** is explicitly `TBD` in the PRD itself (§06) — subscription, streak milestone, or a combination. Don't build toward one without the product decision; `src/types/codex.ts`'s `CodexUnlockRule` is left as a function type, deliberately unimplemented.
- **Account deletion / data export.** Auth is Apple/Google Sign-In per the PRD (`majestic-auth-monetisation-spec.md`), which typically obligates an in-app account-deletion path under both platforms' review guidelines. Nothing in this repo touches it.
- **Master-number handling in numerology** (11, 22 not reducing further in some tarot numerology systems) — `birthCardCalculator` reduces straight to a 0–21 range; whether that's the intended v1 behaviour or a gap wasn't verifiable from the spec docs read for this pass. Worth a direct product-owner check before treating it as settled.
- **Bottom nav is missing 2 of its 4 locked destinations** (Codex, Journal — see `ARCHITECTURE.md`). This isn't a bug, it's unfinished scope, but it means every "Journal spec" and "Codex spec" document in `docs/03-experience-and-feature-specs/` currently describes screens a user cannot reach.
- **Two navigation models disagree in the docs themselves**, not just docs-vs-code: `majestic-prd-v4.md` (§06, §13, most recent/authoritative per its own reference-priority rule) locks the bottom nav as Home/Codex/Reading/Journal, while `majestic-journal-spec.md` (§03) says the Journal "lives in the bottom navigation bar alongside Daily Draw, Codex, and **Profile**" — a fourth destination set that matches neither the PRD nor the currently-shipped tabs. Worth a deliberate resolution rather than each future contributor picking whichever doc they read first. The scaffolded `codex.tsx`/`journal.tsx` in this pass follow the PRD's version since it's the one that explicitly claims priority.

## What's overengineered (or under-consolidated)

- **Two parallel Supabase client layers.** `src/lib/supabase/{auth,profile,readings}.ts` (v1) is completely unreferenced by anything in `app/` — confirmed by a repo-wide grep before this pass. It's dead code sitting next to the `v2/` layer that replaced it. Delete it, or finish whatever migration left it half-done — right now it's just a trap for the next person who imports from the wrong path.
- **`birthCardCalculator` split across a `.ts` wrapper and a `.js` implementation**, joined by an `@ts-ignore`'d import of a same-named file (`src/features/birth-card/birthCardCalculator.ts:1-2`). This exists, per its own comment, so the Node test runner (which wants plain `.js`/`.mjs`) and TypeScript (which wants `.ts`) can both be happy. It works, but it's an indirection a single well-typed `.ts` file plus `ts-node`/`tsx` for the test run wouldn't need. Low priority, but it's exactly the kind of thing that quietly breaks the next time module resolution rules change.
- **Documentation investment is far ahead of implementation.** `docs/` holds ~35 detailed specs across 8 categories (navigation, brand voice, avatar visual rules, subscription tiers, altar rituals, Pixel Elder lore...) for a codebase where, before this pass, more than half the onboarding/tab screens didn't compile and no database migration had ever been written down. That's not automatically wrong — thorough product thinking up front is a legitimate choice — but it means the accurate mental model going into "coding weekend" is *not* "polish an app that mostly works," it's *"catch the implementation up to specs that were already locked."* Prioritise accordingly: the specs aren't the risk, the gap between them and working code is.
- **CI (post-fix) is now appropriately sized** — install, typecheck, test, build, on two Node versions. Nothing to trim there.
