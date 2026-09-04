# Majestic — weekend build plan

One scope, in order. Everything not listed under "In scope" is explicitly **not this weekend** — don't open those docs, don't think about them, don't let them guilt you. This is deliberate: `ARCHITECTURE-ESSENTIALS.md` already flagged that the documentation is way ahead of the code, and the fix for that isn't reading faster, it's ignoring most of it on purpose until the core loop is real.

## Why this scope

PRD v4 §09 ("First Release Priorities") already names the three core ritual surfaces for v1, in order: **Onboarding → Daily draw → Reading screen**. That's not my opinion, that's the product owner's own locked priority list — and conveniently, it's also the part of the codebase that's furthest along and (as of this branch) actually compiles and builds end to end. So: follow the PRD's own order.

## Day 0 — reproduce the green baseline (10 minutes, do this first)

```
npm install
npm run typecheck    # should be clean
npm test              # should be 35 passing
npm run web            # opens the app in a browser
```

If any of these fail on your machine and didn't fail in this session, stop and figure out why before writing new code — better to know now than after three hours of building on top of a broken assumption.

## Day 1 — walk the onboarding flow, screen by screen

Not "does it look right" — actually tap through it as a first-time user, on the web build, start to finish:

- [ ] Entry (`(onboarding)/index`) → Name → DOB → Calculating → Personality reveal → Soul reveal → Profile summary → Quiz (4 questions) → Recommendation → Confirm → First Draw → lands in `(tabs)`
- [ ] Back navigation works at every step without corrupting state (the quiz specifically undoes score on back — worth checking by eye)
- [ ] Refresh the page mid-onboarding (web) — see what happens. There's no persistence layer (`ARCHITECTURE.md` → State management), so this will currently lose all progress. Decide if that's acceptable for now or a Day 1 fix.

This is the highest-value use of a few hours: every screen in this flow was hand-verified and compiler-verified in this session, but "compiles" and "feels right to use" are different bars. You're the first person to actually click through the fixed version.

## Day 1–2 — the daily draw loop (Home tab)

- [ ] Fresh onboarding → land on Home → draw today's card → interpretation shows → re-open the app → today's card persists (this exercises `useDailyDraw`'s streak lookup — the thing that had the double-write bug, now fixed, worth specifically confirming it's a single row per day)
- [ ] Decide now: are you testing against a real Supabase project this weekend, or staying in prototype mode (no `.env` → `isSupabaseConfigured` is `false`, everything is local-only, no persistence across reloads)? Prototype mode is faster for pure UI work; a real project is the only way to actually exercise `supabase/migrations/0001_init.sql` and catch RLS issues before they're a surprise later. If you go real, `supabase/README.md` has the two migration files to run, in order.

## Day 2 — the reading screen (1-card / 3-card)

- [ ] Reading tab → single card spread → reveal → reflection prompt
- [ ] Reading tab → three-card spread (Past/Present/Future) → all three reveal independently
- [ ] Birth-card resonance: if a personality/soul card comes up in a reading, it should get the `recognition` aura context (see `pickCards()` in `app/(tabs)/reading.tsx`) — worth actually seeing this fire once rather than trusting the code read

## Explicitly not this weekend

Codex, Journal, Subscription, Dig Deeper — all scaffolded (`src/features/{codex,journal,subscription,dig-deeper}/README.md`) specifically so you don't have to think about them yet. RevenueCat, real card art, Pixel Elder, notifications, avatar illustration polish. If you find yourself reading a spec doc for any of these this weekend, that's the overwhelm talking — close it and come back to the three surfaces above.

## When this list is actually done

Don't add scope to this file. When onboarding → daily draw → reading all feel solid, that's a good moment to open a fresh planning pass (new weekend, new doc, same folder) rather than letting this one grow.
