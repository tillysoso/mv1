# Majestic — Raw Code Quality Issues
Generated: 2026-05-01

---

## ISSUE-01
- **File:** src/theme/tokens.ts:63
- **Type:** TYPE_INCONSISTENT
- **Description:** `AvatarId` exported as `keyof typeof avatarAccents` — a second definition alongside the union type in src/types/avatar.ts. Two sources of truth that can drift if avatars are added.
- **Fix:** Remove export from tokens.ts; import `AvatarId` from `../types/avatar` internally if needed.

## ISSUE-02
- **File:** src/features/daily-draw/minorArcanaPrompts.ts:8
- **Type:** DUPLICATE / TYPE_INCONSISTENT
- **Description:** `Suit` redefined without `'major'`, duplicating src/types/tarot.ts which defines it as `'major' | 'wands' | 'cups' | 'swords' | 'pentacles'`.
- **Fix:** Import `Suit` from `../../types/tarot` and define `MinorArcanaSuit = Exclude<Suit, 'major'>` if a subset is needed.

## ISSUE-03
- **File:** src/features/daily-draw/minorArcanaPrompts.ts:18
- **Type:** TYPE_INCONSISTENT
- **Description:** `avatar` field typed as capitalized `"Casper" | "Destiny" | "Eli" | "Olivia"` while `AvatarId` across the codebase uses lowercase `'casper' | 'destiny' | 'eli' | 'olivia'`.
- **Fix:** Import `AvatarId` from `../../types/avatar` and lowercase the literal values.

## ISSUE-04
- **File:** src/components/avatar/AvatarAura.tsx:9
- **Type:** TYPE_INCONSISTENT (wrong import — likely a TS compile error)
- **Description:** `AuraContext` imported from `../../types/avatar` but it is not exported there; it is defined in `../../types/tarot`. This is a broken import.
- **Fix:** Change import to `import type { AuraContext } from '../../types/tarot';`

## ISSUE-05
- **File:** src/components/avatar/AvatarAura.tsx:12-18
- **Type:** TYPE_MISSING
- **Description:** Skia canvas primitives (Canvas, Path, Skia, BlurMask) all typed as `any` via dynamic require.
- **Fix:** Import types from `@shopify/react-native-skia`; use conditional type guards or typed wrapper.

## ISSUE-06
- **File:** src/components/avatar/AvatarAura.tsx:28
- **Type:** TYPE_MISSING
- **Description:** `INTENSITY: Record<string, number>` — key should be `AuraContext | 'gathering'` to match the prop type and prevent silent misses.
- **Fix:** Change to `Record<AuraContext | 'gathering', number>`.

## ISSUE-07
- **File:** src/components/avatar/AvatarPortrait.tsx:8
- **Type:** TYPE_MISSING
- **Description:** `IMAGES: Record<AvatarId, Record<string, any>>` — inner `any` should be `Record<'neutral' | 'active' | 'reflective', ImageSourcePropType>`.
- **Fix:** Import `ImageSourcePropType` from `react-native` and use specific key union.

## ISSUE-08
- **File:** src/components/cards/CardBack.tsx:5-16
- **Type:** TYPE_MISSING
- **Description:** All Skia imports (Canvas, Path, Skia, LinearGradient, Rect, vec, Circle, BlurMask) typed as `any`.
- **Fix:** Same pattern as ISSUE-05; type from `@shopify/react-native-skia`.

## ISSUE-09
- **File:** src/components/cards/CardPlaceholder.tsx:7-15
- **Type:** TYPE_MISSING
- **Description:** All Skia imports (Canvas, LinearGradient, Rect, vec) typed as `any`.
- **Fix:** Type from `@shopify/react-native-skia`.

## ISSUE-10
- **File:** src/lib/supabase/auth.ts:25
- **Type:** TYPE_MISSING
- **Description:** `callback: (user: any) => void` — `any` should be `User | null` (the Supabase User type is already imported in authStore.ts).
- **Fix:** Import `User` from `@supabase/supabase-js` and type the callback.

## ISSUE-11
- **File:** src/features/daily-draw/useDailyDraw.ts:54-57
- **Type:** ERROR_SILENT
- **Description:** Supabase `streaks` query error is caught and silently discarded in the `check()` function. Comment says "fall through" but no error is logged.
- **Fix:** Add `console.warn` or pass error to an error boundary / store.

## ISSUE-12
- **File:** src/features/daily-draw/useDailyDraw.ts:95-98
- **Type:** ERROR_SILENT
- **Description:** `readings.insert` and `streaks.upsert` errors swallowed in `draw()`. Failures are invisible and won't appear in any monitoring.
- **Fix:** Log errors with `console.warn` at minimum; wire to Sentry when task #146 is done.

## ISSUE-13
- **File:** src/features/daily-draw/useDailyDraw.ts:63
- **Type:** PERF_RERENDER
- **Description:** `useEffect` has deps `[user?.id]` but the effect body references `todaysCard`, `birthCards`, and `setTodaysCard` from the store — stale closure risk.
- **Fix:** Add missing deps or use `useRef` to snapshot values; alternatively use `useProfileStore.getState()` inside the effect.

## ISSUE-14
- **File:** src/features/daily-draw/useDailyDraw.ts:76
- **Type:** PERF_RERENDER
- **Description:** `draw()` function is recreated on every render and returned from the hook. Consumers that pass it as a prop trigger unnecessary renders.
- **Fix:** Wrap in `useCallback` with appropriate deps.

## ISSUE-15
- **File:** src/components/cards/CardBack.tsx:29-33
- **Type:** DUPLICATE
- **Description:** `buildArcPath(cx, cy, r)` in CardBack duplicates the arc-drawing logic of `buildLivingCirclePath(cx, cy, r)` in AvatarAura.tsx — same Skia API calls, same arc parameters.
- **Fix:** Extract to `src/lib/skia/paths.ts` and import in both files.

## ISSUE-16
- **File:** src/components/onboarding/OnboardingScreen.tsx:2-3
- **Type:** IMPORT_UNUSED (duplicate import)
- **Description:** `SafeAreaView` imported in a separate `import { SafeAreaView } from 'react-native'` statement on line 3, while line 2 already imports from `react-native`. Two separate import statements from the same module.
- **Fix:** Merge into a single destructure on line 2.

## ISSUE-17
- **File:** src/components/onboarding/OnboardingScreen.tsx:44
- **Type:** CONST_MAGIC
- **Description:** `backgroundColor: '#0D0D14'` is `colors.obsidian` — hardcoded instead of referencing the token.
- **Fix:** Import `colors` from `../../theme/tokens` and use `colors.obsidian`.

## ISSUE-18
- **File:** src/components/onboarding/OnboardingScreen.tsx:54
- **Type:** CONST_MAGIC
- **Description:** `backgroundColor: '#1A1A2E'` is `colors.bg.primary` — hardcoded.
- **Fix:** Use `colors.bg.primary`.

## ISSUE-19
- **File:** src/components/onboarding/TerminalInput.tsx:47
- **Type:** CONST_MAGIC
- **Description:** `placeholderTextColor="#3A3A4A"` is `colors.ash` — hardcoded.
- **Fix:** Import `colors` and use `colors.ash`.

## ISSUE-20
- **File:** src/components/onboarding/TerminalInput.tsx:66
- **Type:** CONST_MAGIC
- **Description:** `color: '#F0EDE8'` is `colors.bone` — hardcoded.
- **Fix:** Use `colors.bone`.

## ISSUE-21
- **File:** src/stores/profileStore.ts:3
- **Type:** IMPORT_UNUSED
- **Description:** `AvatarId` is imported but never referenced in the `ProfileStore` interface or any implementation in this file.
- **Fix:** Remove the import.

## ISSUE-22
- **File:** src/lib/supabase/auth.ts:21-22
- **Type:** SUPABASE_PATTERN
- **Description:** `getCurrentUser()` destructures `{ data: { user } }` from `supabase.auth.getUser()` without checking the `error` field. All other Supabase calls in this codebase check for errors.
- **Fix:** Destructure `error` and throw if present, matching the established pattern.

## ISSUE-23
- **File:** src/components/avatar/AvatarAura.tsx:36-55 (render path)
- **Type:** PERF_RERENDER
- **Description:** `buildLivingCirclePath` and `buildArchPath` allocate new Skia Path objects on every render. These depend only on `size` and `shape` which don't change per-frame.
- **Fix:** Memoize path creation with `useMemo([size, shape])`.

## ISSUE-24
- **File:** src/components/cards/CardFace.tsx:13, CardBack.tsx:24, CardPlaceholder.tsx:26
- **Type:** DUPLICATE / TYPE_MISSING
- **Description:** `size: 'full' | 'daily' | 'thumb'` defined inline in three separate files. No shared `CardSize` type exists.
- **Fix:** Add `export type CardSize = 'full' | 'daily' | 'thumb'` to `src/types/tarot.ts` and import it in all three files.

## ISSUE-25
- **File:** app/(onboarding)/confirm.tsx:57
- **Type:** ERROR_SILENT
- **Description:** `updateAvatar(user.id, activeAvatar).catch(() => {})` — empty catch silently swallows Supabase save failures.
- **Fix:** Add logging: `.catch((e) => console.warn('[confirm] updateAvatar failed', e))`.

## ISSUE-26
- **File:** app/(onboarding)/recommendation.tsx:30
- **Type:** TYPE_MISSING
- **Description:** `AVATAR_IMAGES: Record<AvatarId, any>` — `any` should be `ImageSourcePropType` from react-native.
- **Fix:** Import `ImageSourcePropType` and use it.

## ISSUE-27
- **File:** app/(onboarding)/quiz.tsx:79
- **Type:** CONST_MAGIC
- **Description:** Tiebreaker encodes avatar order as magic index values `0,1,2,3` in `_tiebreaker`. This is brittle: if `tiebreakerMap` in recommendation.tsx changes order, the mapping silently breaks.
- **Fix:** Store the tiebreaker as the `AvatarId` string directly, not a positional index.

## ISSUE-28
- **File:** src/components/cards/CardBack.tsx:1
- **Type:** TYPE_INCONSISTENT
- **Description:** Uses `TouchableOpacity` (deprecated in RN 0.81) while `CardFace.tsx` uses `Pressable` for the same press interaction pattern.
- **Fix:** Replace `TouchableOpacity` with `Pressable` to match the codebase pattern.

## ISSUE-29
- **File:** src/stores/authStore.ts:22
- **Type:** ERROR_UNHANDLED
- **Description:** `onAuthStateChange(...)` in `initAuthListener()` is not wrapped in try/catch. If the Supabase client throws synchronously, the exception is unhandled.
- **Fix:** Wrap in try/catch or add `.catch()` handling.

## ISSUE-30
- **File:** src/features/birth-card/birthCardCalculator.ts:1
- **Type:** CONST_MAGIC (code smell)
- **Description:** `// @ts-ignore` suppresses a TS error from importing a `.js` file with the same base name as the `.ts` file. This is fragile and hides a structural issue.
- **Fix:** Rename `birthCardCalculator.js` to `birthCardCalculatorImpl.js` (or move logic into the `.ts` file directly) to eliminate the name collision.

## ISSUE-31
- **File:** app/(onboarding)/quiz.tsx:156
- **Type:** CONST_MAGIC
- **Description:** `backgroundColor: '#ffffff08'` — magic semi-transparent white. Should reference a design token or be extracted as a named constant.
- **Fix:** Use `colors.bone + '08'` or define a `colors.pressedOverlay` token.

## ISSUE-32
- **File:** app/(onboarding)/recommendation.tsx:207
- **Type:** CONST_MAGIC
- **Description:** `recommendedText` style has `color: '#fff'` — hardcoded white outside the token system.
- **Fix:** Use `colors.bone` (which is `#F0EDE8`) or `'#FFFFFF'` if pure white is intentional, as a named constant.

---
**Total issues: 32**
- TYPE_MISSING: 6 (05, 06, 07, 08, 09, 10, 26)
- TYPE_INCONSISTENT: 4 (01, 03, 04, 28)
- DUPLICATE: 4 (02, 15, 24, and 02 also)
- CONST_MAGIC: 8 (17, 18, 19, 20, 27, 30, 31, 32)
- ERROR_SILENT: 3 (11, 12, 25)
- ERROR_UNHANDLED: 1 (29)
- IMPORT_UNUSED: 2 (16, 21)
- PERF_RERENDER: 3 (13, 14, 23)
- SUPABASE_PATTERN: 1 (22)
