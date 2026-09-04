# Majestic — Architecture

Complete technical reference. For the condensed, opinionated version (what will break, what's missing, what's overengineered), see `ARCHITECTURE-ESSENTIALS.md`. For product context, see `PRD.md` and `docs/01-product-strategy/majestic-prd-v4.md`.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Expo 54, React Native 0.81, React 19 | `newArchEnabled: true` in `app.json` |
| Routing | Expo Router 6 (file-based) | route groups `app/(onboarding)/`, `app/(tabs)/` |
| Language | TypeScript, strict mode | `tsconfig.json` extends `expo/tsconfig.base` |
| Styling | NativeWind 4 (Tailwind for RN) | layout utilities only — colour/type come from `src/theme/` tokens, not Tailwind classes |
| Animation | React Native Reanimated 4 | all transitions, shared values, entrance animations |
| Graphics | `@shopify/react-native-skia` 2 | card gradients, avatar aura arcs |
| State | Zustand 5 | three stores, no context providers, no Redux |
| Backend | Supabase (Postgres + Auth) | see Data layer below |
| Payments | RevenueCat | **not integrated** — see Gaps |
| Web deploy | Vercel | `vercel.json`, static export via `expo export --platform web` |
| Web analytics | Google Analytics 4 (`gtag`) | **web-only**, no-ops on iOS/Android — see Gaps |

## Folder structure

```
app/
  _layout.tsx               root layout: font loading, auth-gated routing, error boundary
  (onboarding)/              11 screens, 3 phases — see docs/03-experience-and-feature-specs/majestic-navigation-architecture-spec.md
  (tabs)/                    _layout.tsx (tab bar) + index/reading/profile[/codex/journal]
src/
  features/
    birth-card/               numerology calculator (see Data model → birth cards)
    daily-draw/                useDailyDraw hook, card data, streak persistence
    onboarding/                card interpretation/oneliner content lookups
    reading/                   interpretation placeholder content
    journal/, codex/, subscription/, dig-deeper/   scaffolded, not yet built (see below)
  components/
    avatar/                    AvatarPortrait (routing), AvatarAura (Skia+Reanimated)
    cards/                     CardFace, CardPlaceholder, CardReveal, CardBack, CardAura
    onboarding/                OnboardingScreen (shell), TerminalInput, CTAButton, NumberCardPlaceholder
  stores/                      authStore, avatarStore, profileStore (Zustand)
  lib/
    supabase/v2/                current data layer: auth.ts, profile.ts, readings.ts (+ *.test.mjs)
    supabase/{auth,profile,readings,client}.ts   client.ts is current; the other three are superseded v1, unused
    analytics/                  GA4 wrapper + useScrollDepth hook
  theme/                        tokens.ts (colours, avatarAccents), typography.ts, cssVars.ts, theme.css
  types/                        tarot.ts, avatar.ts, streak.ts, subscription.ts, journal.ts, codex.ts — barrel: index.ts
  constants/                    AVATAR_IDS, AURA_CONTEXT, SUIT, TABLE, SPREAD_TYPE, PORTAL_SHAPE, AVATAR_STATE, PRESENCE_LEVEL, ROUTE
  hooks/, utils/                 useEntranceAnimation; roman numerals, onboarding helpers, handleError
supabase/
  migrations/                    0001_init.sql (profiles/readings/streaks), 0002_subscription_and_journal.sql (draft)
docs/                            00-08 numbered folders — see docs/README.md; Google Drive is editorial source of truth
```

## Navigation & routing

Expo Router's file system defines routes. `app/_layout.tsx` owns global concerns:

- Loads all fonts (Cinzel, Montserrat, Space Mono + local assets) before rendering anything.
- `useAuthRouting()` redirects based on auth state: no user → `(onboarding)`; user but no `birthCards` → onboarding profile step; both present → `(tabs)`. **Entirely skipped when `isSupabaseConfigured` is false** (prototype mode) — the router just falls through to whatever route Expo Router resolves by default.
- Wraps everything in a class-based `ErrorBoundary` that renders the raw error + stack instead of a blank screen — deliberate, for dev visibility, not a production-polished crash screen.

Per PRD, navigation is conceptually three spatial states (Ground/Outer Realm/Self State — see `docs/03-experience-and-feature-specs/majestic-navigation-architecture-spec.md`) surfaced as 4 bottom-nav destinations (Home, Codex, Reading, Journal). **Currently shipped:** `app/(tabs)/_layout.tsx` defines 3 tabs — Today (`index`), Reading, Profile. No Codex or Journal tab exists in the tab bar yet.

## State management

Three Zustand stores, no middleware, no persistence layer (nothing is written to AsyncStorage — a fresh app launch has to re-derive everything from Supabase or start onboarding over):

- **`authStore`** — `user`, `initialised`; `initAuthListener()` wires Supabase's `onAuthStateChange` in on mount.
- **`avatarStore`** — `activeAvatar`, `avatarState` (neutral/active/reflective), `auraContext`, and the portal accent/particle intensity the aura context drives. `setAuraState()` runs a timed hold (1.5s standard, 3s for `recognition` context) before decaying back to neutral — see the `AURA_PORTAL_RESPONSE` table in `avatarStore.ts`.
- **`profileStore`** — onboarding-collected data: name, DOB, `birthCards`, quiz scores/tiebreaker, `todaysCard`, `onboardingComplete`.

## Data model

Full schema in `supabase/migrations/`, human-readable summary in `supabase/README.md`. Three tables exist and are wired to app code (`0001_init.sql`): `profiles` (1:1 with `auth.users`, birth cards, active avatar), `readings` (denormalised card snapshot per reading, RLS'd to owner), `streaks` (daily-draw streak, keyed by `user_id`). Two more (`0002_subscription_and_journal.sql`) are drafted from the product specs but not yet consumed by any code: subscription columns on `profiles`, a `journal_entries` table.

**Birth card calculation** (`src/features/birth-card/birthCardCalculator.{ts,js}`): numerology from DOB digit-sum, reduced to a 0–21 Major Arcana index for both a "personality card" and a "soul card." Implemented as a `.js` file with a thin `.ts` wrapper that re-exports it via `@ts-ignore` (see the comment at the top of the `.ts` file) — TypeScript resolves the `.ts`, the bundler resolves the real `.js` at runtime. Tested via `node --test` (`birthCardCalculator.test.mjs`).

## Avatar & aura system

`AvatarPortrait` (`src/components/avatar/AvatarPortrait.tsx`) is the only sanctioned avatar rendering surface — it routes to `AvatarAura` (Skia canvas, aura arcs) and the correct portrait image based on `presenceLevel` (hero/presence/signal/mark/none, each with its own canvas/image size and portal shape) and `imageState` (neutral/active/reflective). Full contract documented in `.claude/skills/avatar-system.md`. Known asset gap: Olivia and Destiny have no `neutral.png` yet — the component falls back to `active` for both (don't special-case this in new code, it's handled centrally).

## Card rendering

`CardFace` wraps `CardPlaceholder` (Skia gradient + Roman numeral + name, no real card art yet) and optionally a `Pressable`. Three sizes (`full`/`daily`/`thumb`), gradient colours driven by the active avatar's accent set. Full contract in `.claude/skills/tarot-cards.md`.

## Theming

`src/theme/tokens.ts` — world palette (`colors`) + four avatar accent sets (`avatarAccents`, each with primary/secondary/tertiary/particleStart/particleEnd). `src/theme/typography.ts` — font family map + a type scale. NativeWind/Tailwind config (`tailwind.config.js`) exists for layout utilities; colour and type values should never be hardcoded outside `tokens.ts`/`typography.ts`.

## Testing

Node's built-in test runner (`node:test`), not Jest/Vitest — no config file for either exists, don't add one without reason. `npm test` (added in this pass) runs every `*.test.mjs` under `src/`: `birthCardCalculator.test.mjs` plus three `v2` "contract tests" (`auth.test.mjs`, `profile.test.mjs`, `readings.test.mjs`) that test the *shape* of what those functions return by testing extraction helpers that mirror the real implementation — none of them hit a real or mocked Supabase client. There is no component/screen-level test coverage at all.

## CI/CD

`.github/workflows/webpack.yml` — despite the filename (misleading, no webpack is used or referenced by any command in it) — runs on push/PR to `main`: install, `npm run typecheck`, `npm test`, `npm run build:web`, across Node 20.x and 22.x.

Vercel deploys `dist/` from `EXPO_OFFLINE=1 expo export --platform web` (`vercel.json`, `package.json`'s `build:web` script). No native (iOS/Android) build or release pipeline exists in this repo — those are presumably manual/EAS, outside version control here.

## Environment & config

`.env.example` lists four vars: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `REVENUECAT_API_KEY_IOS`, `REVENUECAT_API_KEY_ANDROID`. Only the first two are read anywhere in code (`src/lib/supabase/client.ts`) — the RevenueCat keys are placeholders for integration work that hasn't started (no `react-native-purchases` or similar dependency in `package.json`).

## What's scaffolded but not built

`src/features/{journal,codex,subscription,dig-deeper}/` and `app/(tabs)/{codex,journal}.tsx` were added in this pass as barely-drafted starting points, matching the data models above and the PRD's locked navigation model. They are intentionally minimal — see the file headers in each for what's assumed vs. still open. Don't treat their presence as "this feature is designed," only "this is where it goes."
