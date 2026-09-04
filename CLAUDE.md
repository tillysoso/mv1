# Majestic — Claude Code context

Majestic is a tarot-based intuition-coaching app: Expo/React Native, targeting iOS, Android, and web. Read `ARCHITECTURE-ESSENTIALS.md` before touching anything non-trivial — it names what's fragile and what's still undecided.

There is an older, narrower context file at `docs/00-index-and-governance/CLAUDE.md`. It predates this one and points at `../_discovery/_source-of-truth/`, a path that does not exist anywhere in this repo (verified — `find . -iname _discovery` returns nothing). Don't follow that path. This file (root `CLAUDE.md`) and `docs/01-product-strategy/majestic-prd-v4.md` are the real sources of truth now.

## Stack

- Expo 54 + React Native 0.81 + Expo Router (file-based routing, route groups `(onboarding)` / `(tabs)`)
- TypeScript (strict), NativeWind 4 (Tailwind for RN, layout utilities only)
- React Native Reanimated 4 + `@shopify/react-native-skia` — all animation and gradient/aura rendering
- Supabase — auth, Postgres, storage
- Zustand — state (`src/stores/`)
- RevenueCat — subscriptions (not integrated yet — see below)
- Vercel — web deployment (`vercel.json`, `npm run build:web`)

## Commands

```
npm install
npm start              # expo start
npm run web             # expo start --web
npm run typecheck       # tsc --noEmit
npm test                # node --test src  (runs every *.test.mjs under src/)
npm run build:web       # what CI and Vercel both run
```

Node's built-in test runner is used on purpose — there's no Jest/Vitest config in this repo, don't add one without reason. `npm test` and `npm run typecheck` didn't exist before this file was added (see git history) — CI previously hardcoded one test file. Run both before pushing.

## Repo map

```
app/                  expo-router routes — (onboarding)/ and (tabs)/ route groups
src/
  features/           one folder per product feature (birth-card, daily-draw, onboarding, reading, journal, codex, subscription, dig-deeper)
  components/         shared UI (avatar/, cards/, onboarding/)
  stores/             zustand: authStore, avatarStore, profileStore
  lib/
    supabase/v2/      current Supabase data layer — use this
    supabase/*.ts     (auth.ts, profile.ts, readings.ts at this level) — SUPERSEDED, unused, see ARCHITECTURE-ESSENTIALS.md
    analytics/
  theme/              tokens.ts (colors, avatarAccents), typography.ts — no logic here
  types/               shared TS interfaces, barrel-exported from types/index.ts
supabase/
  migrations/         hand-written SQL — see supabase/README.md
docs/                 the real PRD and every design spec — see docs/README.md for the folder map and naming rules
```

## Non-obvious rules worth knowing before you edit

- **Two Supabase client layers exist.** `src/lib/supabase/{auth,profile,readings}.ts` (v1) and `src/lib/supabase/v2/*` (v2, upsert-based). Everything currently imported from `app/` uses v2. Don't add new v1 imports — the v1 files are dead code (v2 replaced them and nothing references v1 anymore, confirmed by repo-wide grep).
- **"Prototype mode."** If `EXPO_PUBLIC_SUPABASE_URL` isn't set, `isSupabaseConfigured` (`src/lib/supabase/client.ts`) is `false` and `app/_layout.tsx` skips all auth-gated routing — the app just opens straight to `(tabs)`. This is the fastest way to run the UI without a Supabase project.
- **One world, four accent themes.** Threshold City is the only environment; `activeAvatar` (Zustand) only swaps colour tokens (`avatarAccents` in `src/theme/tokens.ts`), never layout or copy. Don't build avatar-specific screens — build accent-aware ones.
- **Aura triggers only after the card face resolves**, never on draw/anticipation — see the comment in `src/stores/avatarStore.ts` and the `03.6` references throughout `docs/03-experience-and-feature-specs/`.
- **Card copy lives in TypeScript, not the database** (`src/features/onboarding/cardInterpretations.ts`, `cardOneliners.ts`). No `card_content` table exists. The subscription spec (`docs/01-product-strategy/majestic-subscription-tier-spec.md` §06) references one — that's a future decision, not current state.
- **Bottom navigation currently ships 3 tabs** (Today, Reading, Profile — `app/(tabs)/_layout.tsx`) while the PRD's locked navigation model calls for 4 (Home, Codex, Reading, Journal — PRD §06/§13). Barely-drafted `codex.tsx` / `journal.tsx` screens exist as a starting point; they are not feature-complete.

## Canonical docs (read before building a feature, not after)

`docs/README.md` explains the folder map and naming convention. The single most important file is `docs/01-product-strategy/majestic-prd-v4.md` — it lists every other spec document and states explicitly that those specs override the PRD on conflict. Root `PRD.md` is a shorter, engineering-oriented pointer into that structure, not a replacement for it.

Repo-specific implementation conventions (avatar rendering, card rendering, onboarding screen patterns, design tokens) are already written up as Claude Code skills in `.claude/skills/` (`avatar-system.md`, `tarot-cards.md`, `onboarding-screens.md`, `frontend-design.md`) and load automatically by trigger — read them instead of re-deriving conventions from scratch.
