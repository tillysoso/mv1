# Majestic — Claude Code Context

## What this is
Majestic is a tarot-based intuition coaching app.
Targets: iOS + Android + Web via Expo.
Source of truth: ../_discovery/_source-of-truth/

## Stack
- Expo (React Native) + Expo Router (file-based routing)
- TypeScript + NativeWind (Tailwind for RN)
- React Native Reanimated + Skia (UI motion + particle/aura system)
- Supabase (auth + database + storage — replaces Firebase + separate DB)
- RevenueCat (iOS + Android + Web subscriptions)
- Zustand (state management)
- Vercel (web deployment)

## Folder conventions
src/features/   — one folder per product feature, self-contained
src/components/ — shared UI used across features
src/theme/      — design tokens only, no logic
src/types/      — shared TypeScript interfaces
assets/         — static files only

## Design tokens
All colours in src/theme/tokens.ts
All typography in src/theme/typography.ts
Avatar accent sets in tokens.ts under avatarAccents
Source docs in ../_discovery/design-system/

## Key architecture notes
- One world (Threshold City), four avatar accent themes — token swap only
- Avatar presence uses two portal shapes: arch (significant) + livingCircle (daily)
- Aura system: neutral / breakthrough / shadow / recognition — triggered by card context
- Pixel Elder is a floating overlay — max 2 appearances per session
- Birth card calculator: src/features/birth-card/ — complete, tested

## What's built
- src/features/birth-card/birthCardCalculator.js — complete
- src/theme/tokens.ts — complete
- src/theme/typography.ts — complete
- src/types/avatar.ts — complete
- src/types/tarot.ts — complete
- src/lib/supabase/client.ts — Supabase client initialised
- src/stores/avatarStore.ts — active avatar state
- src/stores/profileStore.ts — birth cards + DOB state
- src/lib/supabase/auth.ts — sign up, sign in, sign out, auth listener
- src/lib/supabase/profile.ts — save/get profile, update avatar
- src/lib/supabase/readings.ts — save reading, get recent readings
- src/stores/authStore.ts — user auth state + listener

Onboarding flow — all 11 screens built
- Entry, name, DOB, calculating, personality, soul, profile,
  quiz, recommendation, confirm, first-draw
- Birth card calculator integrated and running
- Avatar selection wired to avatarStore
- Routing: (onboarding) → (tabs) on completion

## What's next
Check ../_discovery/_source-of-truth/majestic-current-status.md for current status.
