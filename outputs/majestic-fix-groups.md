# Majestic — Fix Groups
Generated: 2026-05-01
Source: majestic-code-issues-raw.md

---

## GROUP A — Type system cleanup

**Goal:** One shared types file, no `any` types, consistent union types across all avatar/card/aura references. Eliminate the dual `AvatarId` definition and broken `AuraContext` import.

**Issues covered:** 01, 03, 04, 05, 06, 07, 08, 09, 10, 21, 24, 26, 28

**Files affected:**
- `src/theme/tokens.ts` — remove AvatarId re-export
- `src/types/avatar.ts` — already correct; add AvatarState type usage
- `src/types/tarot.ts` — add `CardSize = 'full' | 'daily' | 'thumb'` export
- `src/features/daily-draw/minorArcanaPrompts.ts` — fix Suit type, fix avatar casing
- `src/components/avatar/AvatarAura.tsx` — fix AuraContext import (wrong file), type Skia vars, tighten INTENSITY key type
- `src/components/avatar/AvatarPortrait.tsx` — type IMAGES with ImageSourcePropType
- `src/components/cards/CardBack.tsx` — type Skia vars, use CardSize, replace TouchableOpacity
- `src/components/cards/CardPlaceholder.tsx` — type Skia vars, use CardSize
- `src/components/cards/CardFace.tsx` — use CardSize
- `src/lib/supabase/auth.ts` — type callback parameter
- `src/stores/profileStore.ts` — remove unused AvatarId import
- `app/(onboarding)/recommendation.tsx` — type AVATAR_IMAGES

**Estimated changes:** ~16 edits across 12 files

**Dependencies:** None — run this first. Group B depends on types being clean.

---

## GROUP B — Shared constants and config

**Goal:** All hardcoded colour values, spacing magic numbers, and fragile inline constants replaced with references to the token system. One tiebreaker encoding strategy.

**Issues covered:** 15, 17, 18, 19, 20, 27, 31, 32

**Files affected:**
- `src/components/onboarding/OnboardingScreen.tsx` — replace `'#0D0D14'` → `colors.obsidian`, `'#1A1A2E'` → `colors.bg.primary`
- `src/components/onboarding/TerminalInput.tsx` — replace `'#3A3A4A'` → `colors.ash`, `'#F0EDE8'` → `colors.bone`
- `app/(onboarding)/quiz.tsx` — replace magic tiebreaker index with `AvatarId` string; replace `'#ffffff08'`
- `app/(onboarding)/recommendation.tsx` — replace `'#fff'` with token
- `src/components/cards/CardBack.tsx` — extract shared Skia arc path to `src/lib/skia/paths.ts` (eliminates ISSUE-15 duplicate)

**Estimated changes:** ~9 edits across 5 files, 1 new utility file

**Dependencies:** Group A should run first (CardSize type used in cards).

---

## GROUP C — Error handling

**Goal:** Every async operation has explicit error handling. No silent failures. Consistent pattern: log at minimum, propagate where appropriate.

**Issues covered:** 11, 12, 22, 25, 29

**Files affected:**
- `src/features/daily-draw/useDailyDraw.ts` — add `console.warn` in both catch blocks (lines 54-57, 95-98)
- `src/lib/supabase/auth.ts` — destructure and handle error in `getCurrentUser()`
- `src/stores/authStore.ts` — wrap `onAuthStateChange` call in try/catch in `initAuthListener()`
- `app/(onboarding)/confirm.tsx` — replace empty `.catch` with logging

**Estimated changes:** ~6 edits across 4 files

**Dependencies:** None. Can run in parallel with Group A.

---

## GROUP D — Store and state integrity

**Goal:** Stores are the single source of truth. No stale closures accessing store values. Store access typed correctly.

**Issues covered:** 13 (stale closure in useDailyDraw), 21 (unused import in profileStore)

**Files affected:**
- `src/features/daily-draw/useDailyDraw.ts` — fix `useEffect` deps array (add `todaysCard`, `birthCards`, `setTodaysCard`, or restructure with `useProfileStore.getState()` inside effect)
- `src/stores/profileStore.ts` — remove unused `AvatarId` import (also in Group A)

**Estimated changes:** ~3 edits across 2 files

**Dependencies:** Group A (profileStore import fix overlaps). Can piggyback on Group A or run standalone.

---

## GROUP E — Performance and render optimisation

**Goal:** No unnecessary re-renders. Callbacks and expensive Skia path computations memoised. Hook return values stable.

**Issues covered:** 13, 14, 23

**Files affected:**
- `src/features/daily-draw/useDailyDraw.ts` — wrap `draw()` in `useCallback` (ISSUE-14); also addresses stale deps (ISSUE-13)
- `src/components/avatar/AvatarAura.tsx` — memoize `buildLivingCirclePath` / `buildArchPath` calls with `useMemo` keyed on `[size, shape]` (ISSUE-23)

**Estimated changes:** ~4 edits across 2 files

**Dependencies:** None. Run after Group C (error handling in same file) to avoid merge conflicts.

---

## GROUP F — Import cleanup

**Goal:** Clean dependency graph, no dead imports, no duplicate import statements.

**Issues covered:** 16, 21

**Files affected:**
- `src/components/onboarding/OnboardingScreen.tsx` — merge duplicate `SafeAreaView` import into single destructure (ISSUE-16)
- `src/stores/profileStore.ts` — remove unused `AvatarId` import (ISSUE-21; also in Group A/D)

**Estimated changes:** ~2 edits across 2 files

**Dependencies:** None. Simplest group — can run standalone or be folded into Group A.

---

## GROUP G — Null safety

**Goal:** No unchecked null/undefined access at system boundaries.

**Issues covered:** 22 (getCurrentUser error unchecked)

**Notes:** The codebase is broadly safe — optional chaining is used consistently, Supabase calls check errors, and the `?.` operator is applied where needed. The one gap is `getCurrentUser()` in auth.ts which doesn't check the error field. This is also covered in Group C.

**Files affected:**
- `src/lib/supabase/auth.ts` — check error in getCurrentUser (already in Group C)

**Estimated changes:** 1 edit (folded into Group C)

**Dependencies:** None.

---

## GROUP H — Test coverage

**Goal:** All calculators, mappers, and validators with meaningful logic have at least basic test coverage.

**Missing tests identified:**
- `getRecommendation()` in `app/(onboarding)/recommendation.tsx` — quiz score → avatar mapping logic including tiebreaker. This has 7+ branching paths with no tests.
- `resolveAuraContext()` in `src/features/daily-draw/useDailyDraw.ts` — recognition override logic has no tests.
- `useDailyDraw` hook — integration behaviour (today-check, draw flow) has no tests.

**Files to create:**
- `src/features/daily-draw/useDailyDraw.test.ts` (or `.mjs`) — test `resolveAuraContext` and draw logic
- `app/(onboarding)/recommendation.test.ts` — test `getRecommendation` with all tiebreaker paths

**Estimated changes:** 2 new test files, ~40 test cases

**Dependencies:** Group B (fix tiebreaker encoding first — ISSUE-27 — so tests don't test the broken pattern).

---

## Dependency order (recommended)

```
F (2 edits) ─┐
A (16 edits) ─┤── B (9 edits) ── H (tests)
C (6 edits) ─┤
D (3 edits) ─┘
E (4 edits) ── after C
G ── folded into C
```

Parallel runs possible: A + C + F + D can all run simultaneously (different files).
E runs after C to avoid conflicts in useDailyDraw.ts.
B runs after A (CardSize dependency).
H runs after B (tiebreaker fix).
