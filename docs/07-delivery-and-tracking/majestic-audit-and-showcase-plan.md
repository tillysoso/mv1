# MAJESTIC — AUDIT & SHOWCASE PLAN
## Prompts, priorities and plans to close out Onboarding + Codex
*Generated: May 2026 — Your adventure. But Majestic.*

---

## HOW TO USE THIS DOCUMENT

Run these in order:

0. **STEP 0** — Document cleanup. Delete superseded files. Upload new master versions. Do this first.
0b. **STEP 0B** — Doc patch prompt. Adds cross-reference notes to five existing docs. Run after Step 0 uploads are complete.
1. **STEP 1** — Run the Chat Doc Audit in Claude chat. Confirm doc status verbally.
2. **STEP 2** — Run the Cowork Code Audit. Reads file system + extracts all Claude Code suggestions. Outputs reconciliation report + fix groups.
3. **STEP 2B** — Run each Fix Group prompt in Claude Code, one group at a time. Do not combine groups.
4. **STEP 3** — Cowork writes the reconciled tracker from the combined output.
5. **STEP 4** — Work the Onboarding + Codex Showcase Plan. This is your week.
6. **STEP 5** — Work the Asset + Decision TODO list in parallel (offline/Aseprite/Luke conversations).

**On Step 2B:** Each fix group is isolated by concern (types, stores, error handling, etc.). Run them sequentially. If one group fails or produces unexpected output, stop and resolve before moving to the next. Do not batch groups together — the context bleed will cause Claude Code to make assumptions about state that isn't confirmed yet.

---

## STEP 0 — DOCUMENT CLEANUP & PROJECT KNOWLEDGE SYNC

*Do this before anything else. The project knowledge is Claude's source of truth. If it contains stale or duplicate files, every subsequent session inherits the confusion.*

*Documents are managed in Claude project settings — upload and delete files there directly. This step cannot be done in chat or Cowork.*

---

### FILES TO DELETE FROM PROJECT KNOWLEDGE

| File | Reason to delete |
|------|-----------------|
| `majestic-dig-deeper-spec.md` | **Superseded by v2.0.** v1 says "not a subscription gate" — now wrong. Keeping it will confuse future sessions. |
| `majestic-task19-content-brief.md` | **Superseded.** Content is written and locked. Brief has no ongoing value. |
| `_flags.md` | **Stale.** Font flag resolved. All active flags now live in the tracker. Do not replace. |
| `Majestic_Elemental_Guardians_Summary_v3.docx` | **Verify first.** Check for anything not captured in brand voice or avatar specs. If fully captured elsewhere, delete. |
| `majestic-dig-deeper-complete.md` | **Check against PDF.** `majesticdigdeepercomplete.pdf` may be the master. Verify which is more complete — keep one, delete the other. |
| `majesticdigdeepercomplete.pdf` | **See above.** Keep whichever is the master complete content doc. |
| `export_emblems.py` | **Production script, not a spec.** Move to repo. Delete from project knowledge. |
| `1.svg`, `2.svg`, `3.svg`, `4.svg`, `5.svg` | **Production assets, not specs.** Move to repo asset folder. Claude cannot use SVGs as context. |

---

### FILES TO UPLOAD TO PROJECT KNOWLEDGE

| File | What it is | Supersedes |
|------|-----------|------------|
| `majestic-design-system.md` | Spacing, components, icons v1.0 | Nothing — new. |
| `majestic-altar-ritual-spec-v2.md` | Talisman framework, 4-layer hierarchy, breath mechanic | v1 (not in project — do not upload v1). |
| `majestic-pixel-elder-addendum.md` | Lamp sequence, isekai mechanic, reading initiation role | Addendum — keep alongside existing Pixel Elder spec. |
| `majestic-dig-deeper-spec-v2.md` | Updated spec with subscription gating, dev notes | `majestic-dig-deeper-spec.md` — delete that first. |
| `majestic-subscription-tier-spec.md` | Full monetisation model, tiers, pricing, RevCat, UX | Nothing — new. |
| `majestic-auth-monetisation-spec.md` | Auth timing, positioning, paid discovery sequence | Nothing — new. |
| `majestic-audit-and-showcase-plan.md` | This document | Nothing — new. |
| `majestic-tracker-master.jsx` (updated) | Reconciled tracker, tasks 154–164, updated flags | Replace existing tracker in project. |

---

### DOCS THAT NEED INTERNAL PATCHES (not replaced — add a cross-reference note)

| File | What to add |
|------|------------|
| `majestic-birth-card-spec.md` | At Screen 11: "Auth prompt fires here — see majestic-auth-monetisation-spec.md." |
| `majestic-ritual-and-notifications.md` | "Breath beat is now part of the talisman interaction — see majestic-altar-ritual-spec-v2.md." |
| `majestic-codex-spec.md` | "Dig Deeper access model updated — see majestic-dig-deeper-spec-v2.md. Love/Career/Life angles now subscription only." |
| `majestic-image-references.md` | Remove any note about Luke's WOFF2 being pending — font confirmed received. |
| `majestic-prd-v3-updated.md` | Add cross-references in Section 09 to subscription spec and auth spec. No full rewrite needed. |

---

### MASTER DOCUMENT REGISTER (post-cleanup, 31 docs)

Once cleanup is done, this is the complete and only document set in project knowledge.

| Document | Status |
|----------|--------|
| `majestic-prd-v3-updated.md` | Existing — patch only |
| `majestic-brand-guidelines.md` | Existing |
| `majestic-brand-voice.md` | Existing |
| `majestic-colour-system.md` | Existing |
| `majestic-typography.md` | Existing |
| `majestic-avatar-accent-system.md` | Existing |
| `majestic-threshold-city-spec.md` | Existing |
| `majestic-visual-identity-brief.md` | Existing |
| `majestic-design-system.md` | **Upload** |
| `majestic-birth-card-spec.md` | Existing — patch only |
| `majestic-altar-ritual-spec-v2.md` | **Upload** |
| `majestic-pixel-elder-addendum.md` | **Upload** |
| `majestic-codex-spec.md` | Existing — patch only |
| `majestic-journal-spec.md` | Existing |
| `majestic-profile-spec.md` | Existing |
| `majestic-states-and-switching.md` | Existing |
| `majestic-ritual-and-notifications.md` | Existing — patch only |
| `majestic-dig-deeper-spec-v2.md` | **Upload** (delete v1 first) |
| `majestic-dig-deeper-complete.md` OR `majesticdigdeepercomplete.pdf` | Keep one master — verify which |
| `majestic-subscription-tier-spec.md` | **Upload** |
| `majestic-auth-monetisation-spec.md` | **Upload** |
| `majestic-card-metadata-treatment.md` | Existing |
| `majestic-accessibility-copy-rules.md` | Existing |
| `majestic-emblem-prompt-library.md` | Existing |
| `majestic-image-references.md` | Existing — patch only |
| `majestic-avatar-llm-seeds.md` | Existing |
| `majestic-arcana-interpretations-final.md` | Existing |
| `majestic-arcana-oneliners-final.md` | Existing |
| `majestic-tracker-master.jsx` | **Replace with updated version** |
| `minorArcana-cardData.ts` | Existing |
| `majestic-audit-and-showcase-plan.md` | **Upload** |

---

## STEP 0B — DOC PATCH PROMPT

*Run this in Claude chat (this project) immediately after uploading the new docs and deleting the old ones. This adds cross-reference notes to five existing docs that are correct but don't yet point to the new specs.*

*Run after Step 0 uploads are complete — the new specs need to be in project knowledge before this prompt references them.*

```
I need you to write targeted patch notes for five existing Majestic documents. For each one, I'll tell you exactly what to add and where. Output each patched section as a clearly labelled block I can copy and paste into the document directly.

Do not rewrite these documents. Do not change anything outside the specified location. Each patch is a single short note — a cross-reference only.

---

PATCH 1 — majestic-birth-card-spec.md
Location: The section describing Screen 11 — Companion Confirmed.
Add this note immediately after the Screen 11 header or the description of what happens on that screen:

> **Auth note:** The authentication prompt fires at this screen — after the avatar's first words and a 1-second hold. Apple Sign In and Google Sign In only. No email/password. Full timing, copy, and dev implementation in `majestic-auth-monetisation-spec.md`.

---

PATCH 2 — majestic-ritual-and-notifications.md
Location: The Overview section at the top of Task #122 (Daily Draw Meditation & Reflection Ritual Spec).
Add this note after the overview paragraph:

> **Updated:** The breath beat is now integrated into the talisman interaction system. The Pixel Elder lamp sequence fires before the breath beat. Full updated spec including talisman framework, altar system, and Pixel Elder lamp mechanic in `majestic-altar-ritual-spec-v2.md`. The avatar arrival lines and reflection prompts in this document remain current.

---

PATCH 3 — majestic-codex-spec.md
Location: Any section that references Dig Deeper or describes who can access Dig Deeper content.
Add this note at the top of that section (or at the top of the document if Dig Deeper is referenced throughout):

> **Updated:** The Dig Deeper access model has changed. Avatar lore resonance and extended reading remain free for all authenticated users. Love / Career / Life angle interpretations (previously "General") are now subscription only — "Dig Even Deeper" tier. Full updated access model, gating logic, and dev notes in `majestic-dig-deeper-spec-v2.md`.

---

PATCH 4 — majestic-image-references.md
Location: Any note referencing Luke's WOFF2 script font file as pending or outstanding.
Replace that note with:

> **Resolved:** Remachine Script confirmed received. File at `app/assets/fonts/RemachineScript.woff2` (38KB). TTF + EOT also present. Wordmark token in `typography.ts`. No action needed.

If no such note exists in the document, skip this patch.

---

PATCH 5 — majestic-prd-v3-updated.md
Location: Section 09 — First Release Priorities (or the closest equivalent section that describes the product roadmap).
Add this note at the end of that section:

> **New specs added post-v3.1:** Subscription and monetisation model fully defined — see `majestic-subscription-tier-spec.md`. Authentication timing and positioning defined — see `majestic-auth-monetisation-spec.md`. Altar, talisman, and ritual system defined — see `majestic-altar-ritual-spec-v2.md`. Dig Deeper access model updated for subscription gating — see `majestic-dig-deeper-spec-v2.md`.

---

For each patch, output:
- The document name as a header
- The exact text to insert, formatted and ready to paste
- The precise location instruction (section name, before/after what)

Do not output anything else. These are copy-paste blocks, not a discussion.
```

---

## STEP 1 — CHAT DOC AUDIT PROMPT

*Run this in Claude chat (this project). Claude will cross-reference project knowledge against the tracker.*

```
I need you to do a documentation audit for Majestic. Cross-reference the project knowledge files against the tracker and tell me the status of every spec, doc, and content file.

For each item below, confirm:
- EXISTS and COMPLETE — file is in project knowledge, content matches what the tracker says is locked
- EXISTS but INCOMPLETE — file is present but content doesn't match the locked scope
- MISSING — tracker says it exists but it's not in project knowledge

Check these specifically:

SPECS & DESIGN DOCS:
- majestic-prd-v3-updated.md (PRD v3.1)
- majestic-brand-guidelines.md
- majestic-brand-voice.md
- majestic-colour-system.md
- majestic-typography.md
- majestic-avatar-accent-system.md
- majestic-threshold-city-spec.md
- majestic-visual-identity-brief.md
- majestic-birth-card-spec.md
- majestic-design-system.md (NEW — spacing, components, icons v1.0)
- majestic-altar-ritual-spec.md (check: should be v2.0 with talisman framework)
- majestic-pixel-elder-addendum.md (NEW — lamp sequence, isekai mechanic)
- majestic-codex-spec.md
- majestic-journal-spec.md
- majestic-profile-spec.md
- majestic-states-and-switching.md
- majestic-ritual-and-notifications.md
- majestic-dig-deeper-spec.md
- majestic-card-metadata-treatment.md
- majestic-accessibility-copy-rules.md
- majestic-emblem-prompt-library.md
- majestic-image-references.md

CONTENT FILES:
- majestic-arcana-interpretations-final.md (all 22 Major Arcana)
- majestic-arcana-oneliners-final.md (44 one-liners)
- majestic-avatar-llm-seeds.md (4 avatar LLM seed prompts)

CODE-ADJACENT:
- minorArcana-cardData.ts (aura mapping, all 78 cards)

Flag anything that's in the tracker as complete but missing from project knowledge. That's the gap list — things that exist somewhere but haven't been uploaded to the project yet.

Output format: a clean table — doc name / tracker status / actual status / notes.
```

---

## STEP 2 — COWORK CODE AUDIT PROMPT

*Run this in Cowork. It reads your actual file system, checks implementation status, AND extracts all code quality issues for Step 2B.*

```
I need you to do a full audit of the Majestic codebase. This has two parts: implementation status (what's built) and code quality (what needs fixing). The project is an Expo + React Native app using TypeScript, NativeWind, Reanimated, Skia, Supabase, Zustand, and RevenueCat.

---

PART 1 — FILE EXISTENCE CHECK
Check whether these files/folders exist. Report: exists / exists but empty / missing.

src/features/onboarding/
  - OnboardingScreen.tsx
  - TerminalInput.tsx
  - screens/ (list all files inside)

src/features/birth-card/
  - birthCardCalculator.ts
  - birthCardCalculator.test.mjs (or .ts)

src/features/daily-draw/
  - cardData.ts
  - minorArcana-cardData.ts (or equivalent)
  - useDailyDraw.ts (or hook file)

src/features/codex/ — list all files
src/features/profile/ — list all files
src/features/journal/ — list all files

src/components/
  - AvatarPortrait.tsx
  - AvatarAura.tsx
  - portal/ (list contents)
  - PixelElder/ (list contents)

src/stores/ — authStore.ts, avatarStore.ts, profileStore.ts
src/theme/ — tokens.ts, typography.ts
src/lib/supabase/ — list contents
src/lib/revenuecat/ — list contents

---

PART 2 — CONTENT SPOT CHECK
For files that exist, verify:

1. tokens.ts — all 4 avatar accent sets present (Casper/Eli/Olivia/Destiny)? Particle colour values present?
2. avatarStore.ts — has activeAvatar + setAvatar? Transition layer present or just the store?
3. profileStore.ts — has name, DOB, birthCards (personality + soul), quizScores, todaysCard?
4. onboarding/screens/ — individual route screens present, or just scaffold?
5. codex/ — grid layout? Card detail? Filter pills? Discovery model?
6. cardData.ts — aura context (breakthrough/shadow/neutral) per card present?

---

PART 3 — CODE QUALITY EXTRACTION
Read every file in src/ and extract ALL code quality issues. For each issue record:
- File path
- Line number(s) if applicable
- Issue type (from list below)
- Brief description of the problem
- Suggested fix (one line)

Issue types to look for:
- DUPLICATE — same logic, type, or constant defined in more than one place
- TYPE_MISSING — untyped props, any types, missing return types, untyped state
- TYPE_INCONSISTENT — same concept typed differently across files (e.g. AvatarId as string in one place, union type in another)
- ERROR_UNHANDLED — async calls with no try/catch, Supabase calls with no error check, promises with no .catch
- ERROR_SILENT — errors caught but swallowed (empty catch blocks, console.log only)
- IMPORT_CIRCULAR — circular dependency between modules
- IMPORT_UNUSED — imported but never used
- CONST_MAGIC — hardcoded string or number that should be a named constant
- NULL_UNSAFE — optional chaining missing where value could be null/undefined
- STATE_STALE — Zustand state accessed outside store in a way that could be stale
- PERF_RERENDER — missing useMemo/useCallback on expensive computations or callbacks passed as props
- SUPABASE_PATTERN — Supabase call not following established pattern in the codebase
- TEST_MISSING — function with no test coverage that has meaningful logic (calculators, mappers, validators)

Output this as a raw list — no grouping yet. We group in Part 4.

---

PART 4 — FIX GROUPING
Take every issue from Part 3 and sort them into these fix groups. Each group will be implemented as a separate Claude Code session.

GROUP A — Type system cleanup
All TYPE_MISSING, TYPE_INCONSISTENT issues. Goal: one shared types file, no any types, consistent union types across all avatar/card/aura references.

GROUP B — Shared constants and config
All CONST_MAGIC, DUPLICATE issues where the duplication is constants or config (avatar IDs, aura categories, card suits, screen names). Goal: one constants file, everything imports from it.

GROUP C — Error handling
All ERROR_UNHANDLED, ERROR_SILENT issues. Goal: every async operation has explicit error handling, no silent failures, consistent error pattern across all Supabase calls.

GROUP D — Store and state integrity
All STATE_STALE, DUPLICATE issues in stores, and any store-adjacent type issues. Goal: stores are the single source of truth, no state duplicated outside stores, all store access is typed.

GROUP E — Performance and render optimisation
All PERF_RERENDER issues. Goal: no unnecessary re-renders, callbacks and expensive computations memoised.

GROUP F — Import cleanup
All IMPORT_CIRCULAR, IMPORT_UNUSED issues. Goal: clean dependency graph, no dead imports.

GROUP G — Null safety
All NULL_UNSAFE issues. Goal: no unchecked null access, optional chaining consistent throughout.

GROUP H — Test coverage
All TEST_MISSING issues. Goal: all calculators, mappers, and validators have at least basic test coverage.

For each group, output:
- Group label and goal
- List of files affected
- Estimated number of changes
- Any dependencies between groups (e.g. "Group B should run before Group C")

---

PART 5 — RECONCILIATION TABLE
Based on Parts 1 + 2, produce:

| Task ID | Task | Tracker Status | Actual Status | Notes |
|---------|------|---------------|---------------|-------|

Task IDs: 102, 103, 104, 105, 106, 107, 108, 109, 110, 113, 114, 115, 133, 134, 99, 100, 101, 112

---

PART 6 — TRACKER UPDATE
Update /mnt/project/majestic-tracker-master.jsx:
- Tasks where Actual = COMPLETE but Tracker ≠ complete → mark complete, note what was verified
- Tasks where Actual = PARTIAL → update note with exactly what's done and what remains
- Do NOT mark anything complete you haven't verified in the file system

Export to /mnt/user-data/outputs/majestic-tracker-master.jsx

---

FINAL OUTPUT SUMMARY:
1. File existence table (Part 1)
2. Content spot check findings (Part 2)
3. Raw issue list (Part 3) — save as /mnt/user-data/outputs/majestic-code-issues-raw.md
4. Fix groups with affected files + estimates (Part 4) — save as /mnt/user-data/outputs/majestic-fix-groups.md
5. Reconciliation table (Part 5)
6. Tracker changes made (Part 6)
```

---

## STEP 2B — FIX GROUP PROMPTS

*Run each group as a separate Claude Code session. Run in dependency order. Do NOT combine groups.*

**Dependency order: A → B → C → D → E → F → G → H**
(Types first, then constants, then error handling, then stores, then perf, then imports, then null safety, then tests.)

---

### GROUP A — Type system cleanup

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group A items only.

Goal: establish a single shared type system across the Majestic codebase. No `any` types. Consistent union types for all core domain concepts.

Steps:
1. Create src/types/index.ts if it doesn't exist
2. Define or consolidate these core types — check existing files first, do not duplicate:
   - AvatarId: 'casper' | 'eli' | 'olivia' | 'destiny'
   - AuraContext: 'breakthrough' | 'shadow' | 'neutral'
   - CardSuit: 'wands' | 'cups' | 'swords' | 'pentacles' | 'major'
   - BirthCard: { id: string; name: string; arcana: 'major' }
   - MajesticProfile: { personalityCard: BirthCard; soulCard: BirthCard }
   - ReadingType: 'daily' | 'one-card' | 'three-card'
   - AvatarState: 'neutral' | 'active' | 'reflective'
   - Any other types found duplicated or missing in the raw issue list

3. For every TYPE_MISSING issue in Group A:
   - Add the correct type
   - Replace any `any` with the correct type
   - Add return type annotations to untyped functions

4. For every TYPE_INCONSISTENT issue:
   - Pick one canonical definition (prefer the union type over string)
   - Update all usages to match

5. Re-export all types from src/types/index.ts so imports stay clean

After each file change, verify TypeScript compiles: run `npx tsc --noEmit`

Report: every file changed, every type added or modified, final tsc output.
```

---

### GROUP B — Shared constants and config

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group B items only.
Prerequisite: Group A must be complete. Import from src/types/index.ts where relevant.

Goal: eliminate all magic strings and numbers. One constants file as the single source of truth.

Steps:
1. Create src/constants/index.ts if it doesn't exist
2. Extract and consolidate all CONST_MAGIC and DUPLICATE constant issues:
   - Avatar IDs (check for hardcoded 'casper', 'eli', 'olivia', 'destiny' strings)
   - Aura categories (breakthrough/shadow/neutral as magic strings)
   - Card suits
   - Screen/route names (any hardcoded navigation strings)
   - Supabase table names (any hardcoded 'profiles', 'readings', 'streaks' strings)
   - Animation timing values that appear in multiple files
   - Any other repeated literals from the raw issue list

3. For each constant:
   - Define once in src/constants/index.ts with a descriptive name
   - Replace every hardcoded usage with an import from constants

4. Update src/types/index.ts if any constants map to types (e.g. AVATAR_IDS array should match AvatarId union)

5. Run `npx tsc --noEmit` — fix any type errors introduced

Report: every constant extracted, every file updated, before/after for any complex changes.
```

---

### GROUP C — Error handling

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group C items only.
Prerequisites: Groups A and B complete.

Goal: no silent failures. Every async operation handled. Consistent error pattern throughout.

Steps:
1. First, establish the error handling pattern for this codebase. Check if there's an existing error utility in src/lib/ or src/utils/. If yes, use it. If no, create src/utils/handleError.ts with:
   - A typed AppError class or interface
   - A handleSupabaseError(error: unknown) utility that extracts message and code
   - A handleAsyncError wrapper for consistent try/catch boilerplate
   Do not over-engineer — keep it simple.

2. For every ERROR_UNHANDLED issue:
   - Wrap the async call in try/catch
   - Use the established pattern from step 1
   - Ensure the catch block does something meaningful (set error state, log to Sentry if available, return null/undefined gracefully — never crash silently)

3. For every ERROR_SILENT issue (empty catch or console.log only):
   - Add meaningful handling
   - If Sentry is integrated, call Sentry.captureException
   - Set appropriate error state for the UI to respond to

4. For Supabase calls specifically — establish this pattern and apply it everywhere:
   const { data, error } = await supabase.from(...).select(...)
   if (error) { handleSupabaseError(error); return null; }
   // proceed with data

5. Run `npx tsc --noEmit` after changes

Report: every file changed, the established error pattern, any cases where you couldn't determine the right handling and why.
```

---

### GROUP D — Store and state integrity

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group D items only.
Prerequisites: Groups A, B, C complete.

Goal: Zustand stores are the single source of truth. No state duplicated outside stores. All store slices typed correctly.

Steps:
1. Read all three stores: authStore.ts, avatarStore.ts, profileStore.ts
   Map their current shape exactly — what state, what actions, what types.

2. For every STATE_STALE issue:
   - Identify where state is being read or copied outside the store
   - Replace with a proper useStore hook call or selector
   - If the component is doing local state that should be in the store, move it

3. For every DUPLICATE store issue:
   - If the same state exists in two stores, pick one home and remove the other
   - Update all consumers

4. Verify store types match src/types/index.ts definitions from Group A:
   - avatarStore: activeAvatar should be typed as AvatarId (not string)
   - profileStore: birthCards should be typed as MajesticProfile
   - authStore: user should match Supabase User type

5. Check all store subscriptions and selectors — ensure no unnecessary full-store subscriptions that trigger re-renders

6. Run `npx tsc --noEmit`

Report: current store shapes, every change made, any state that was orphaned and where it was moved.
```

---

### GROUP E — Performance and render optimisation

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group E items only.
Prerequisites: Groups A–D complete. Do not optimise until the correctness issues are fixed.

Goal: no unnecessary re-renders. Expensive computations and callbacks memoised.

Steps:
1. For every PERF_RERENDER issue:
   - If a callback is being created inline in render and passed as a prop → wrap in useCallback
   - If a computation is expensive and its inputs don't change often → wrap in useMemo
   - If a component re-renders when its props haven't changed → consider React.memo

2. Specific things to check in Majestic:
   - Card grid in Codex — is the card list being recomputed on every render?
   - Avatar accent token object — is it being recreated on every render or memoised?
   - Birth card calculation — should be run once and stored, never on render
   - Filter state in Codex — does changing filter cause the whole grid to re-render or just the filtered slice?

3. Do NOT over-optimise. Only apply memo/callback where the issue list identifies a real problem. Premature optimisation here will make the code harder to read during the showcase build week.

4. Run `npx tsc --noEmit`

Report: every optimisation applied, reasoning for each, any cases where you chose not to optimise and why.
```

---

### GROUP F — Import cleanup

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group F items only.
Prerequisites: Groups A–E complete (import paths may have changed).

Goal: clean dependency graph. No dead imports. No circular dependencies.

Steps:
1. For every IMPORT_UNUSED issue: remove the import. Run tsc to confirm nothing breaks.

2. For every IMPORT_CIRCULAR issue:
   - Map the circular chain (A imports B imports A)
   - Extract the shared dependency into a new file that neither A nor B imports from each other for
   - Common pattern: move shared types or utils to a third file

3. After all changes, run: npx madge --circular src/ (install madge if not present: npx madge)
   Report the output — if circular deps remain, flag them.

4. Standardise import order across the codebase (React → RN → third party → internal). 
   Do NOT run a formatter on the whole codebase — only touch files you've already changed.

5. Run `npx tsc --noEmit`

Report: every import removed, every circular dep resolved, madge output.
```

---

### GROUP G — Null safety

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group G items only.
Prerequisites: Groups A–F complete.

Goal: no unchecked null access. Consistent optional chaining throughout.

Steps:
1. For every NULL_UNSAFE issue:
   - Add optional chaining (?.) where the value could be null/undefined
   - Add nullish coalescing (??) for fallback values where appropriate
   - If the null case represents a real error state (not just "not loaded yet"), add an explicit guard with a meaningful fallback

2. Pay particular attention to:
   - Supabase query results — data could be null even without an error
   - Zustand store values accessed before hydration
   - Avatar and profile data accessed before onboarding completes
   - Card data accessed by index (array out of bounds)

3. Do NOT use non-null assertion (!) to fix null issues unless you can prove the value is genuinely never null at that point. If you're unsure, use optional chaining.

4. Run `npx tsc --noEmit` — strict null checks should catch remaining issues.

Report: every file changed, every null access fixed, any cases where you used ! and why.
```

---

### GROUP H — Test coverage

```
Read /mnt/user-data/outputs/majestic-fix-groups.md and extract Group H items only.
Prerequisites: Groups A–G complete. Tests should run against the cleaned-up code.

Goal: meaningful logic has test coverage. Not exhaustive — just the things that would be catastrophic if they broke silently.

Priority order for Majestic:
1. birthCardCalculator — this drives the entire Majestic Profile. Must be fully tested.
   Check existing tests in birthCardCalculator.test.mjs — are edge cases covered?
   Edge cases: master numbers (11, 22), single-digit results, same personality + soul card, DOB at year boundaries.

2. Any aura mapping logic — if there's a function that assigns breakthrough/shadow/neutral, test it.

3. Any quiz → avatar recommendation mapping — if there's a scoring function, test it.

4. Any Supabase utility functions — mock Supabase, test that the right calls are made with the right data.

For each TEST_MISSING issue:
- Write the minimum tests that would catch a regression
- Use the existing test framework (check package.json for jest/vitest/bun test)
- Colocate tests with the file being tested (same folder, .test.ts suffix)

Do NOT write tests for React components yet — that's a longer investment. Focus on pure functions and data utilities.

Run all tests: check package.json for the test command and run it.

Report: every test file created or updated, test results, any tests that are failing and why.
```

---

## STEP 3 — COWORK TRACKER RECONCILIATION PROMPT

*Run this after Step 2, once you've confirmed any verbal/offline completions (assets, Luke decisions).*

```
Based on the audit output from the previous session, I need you to write the reconciled master tracker.

I will tell you verbally which offline/asset tasks are complete. Update these in addition to the code findings:

[FILL IN BEFORE RUNNING — e.g. "#78 app icon — done", "#77 card frame — still in progress"]

Then:
1. Update all confirmed-complete tasks in the tracker (status: "complete", done: true, note updated with what was confirmed)
2. Update all in-progress tasks with accurate notes on current state
3. Write a phase-by-phase summary at the top of the tracker as a comment block — what's done, what's outstanding, estimated remaining effort per phase
4. Export final tracker to /mnt/user-data/outputs/majestic-tracker-master.jsx

This tracker is the source of truth after this session. Every future session should start by reading it.
```

---

## STEP 4 — ONBOARDING + CODEX SHOWCASE PLAN

**Target: showcase-ready by end of next week. Both features prod-complete.**

This means: a real user can open the app, complete onboarding, and browse the Codex. No placeholder screens. No mock data hardcoded. Avatar theme active. Pixel Elder appears. Card reveal works.

### What "prod-complete" means for each feature

**Onboarding prod-complete:**
- [ ] Screen 01 — Signal (atmosphere, tap anywhere)
- [ ] Screen 02–03 — Terminal (name + DOB input, Space Mono, blinking cursor)
- [ ] Screen 04 — Threshold transition
- [ ] Screen 05–06 — Personality + Soul card reveal (birth card calculator live)
- [ ] Screen 07 — Profile summary
- [ ] Screen 08 — Quiz intro (with skip option — #157)
- [ ] Screen 09–10 — Quiz questions + avatar recommendation
- [ ] Screen 11 — Companion confirmed (avatar theme blooms)
- [ ] Screen 12 — First draw (Pixel Elder lamp sequence + talisman + breath beat + card reveal)
- [ ] Avatar accent theme fully applied on companion selection
- [ ] Data persisted to Supabase (name, DOB, birth cards, chosen avatar)

**Codex prod-complete:**
- [ ] Grid view — 3-column, all 78 cards, discovered/undiscovered states
- [ ] Filter pills — ALL / MAJOR / WANDS / CUPS / SWORDS / PENTACLES
- [ ] Card count — "X / 78" counter
- [ ] Card detail modal — discovered state (art, name, lore, avatar line, record)
- [ ] Card detail modal — undiscovered state (mist, "Draw this card to unlock")
- [ ] Discovery model live — cards unlock when drawn
- [ ] Avatar accent applied throughout

### Task sequence for the week

**Day 1 — Monday: Audit + unblock**
- Run Steps 1–3 (audit + tracker reconciliation)
- Confirm what's actually done vs what tracker says
- Identify any blockers — missing assets, missing specs, broken deps

**Day 2 — Tuesday: Onboarding Phases 1 + 2**
- Build all individual screen route files for Phase 1 (Screens 01–04)
- Build Phase 2 reveal screens (Screens 05–07) — birth card calculator already done
- Wire Supabase persistence for name, DOB, birth cards
- Relevant tasks: #103, #104

**Day 3 — Wednesday: Onboarding Phase 3**
- Quiz screens (Screens 08–10) with skip option
- Avatar recommendation logic
- Companion confirmation + UI theme bloom
- Wire avatarStore to Supabase
- Relevant tasks: #105, #102, #157

**Day 4 — Thursday: Onboarding Screen 12 + Pixel Elder lamp**
- First draw screen — talisman, breath beat, card reveal
- Pixel Elder lamp sequence (React Native layer — screen dim + radial glow)
- Note: Pixel Elder sprite (#61) may not be complete yet — use placeholder pixel square at correct dimensions. The React Native animation layer can be built and tested independently of the sprite.
- Relevant tasks: #107, #110 (partial — React Native layer only)

**Day 5 — Friday: Codex**
- Grid view, filter pills, discovery model
- Card detail modal — both states
- Avatar accent throughout
- Relevant tasks: #126 (spec done ✓)

**Weekend buffer / Day 6: Polish + integration**
- End-to-end run: onboarding → companion chosen → first draw → codex shows first card as discovered
- Fix anything broken in the flow
- Confirm avatar accent is consistent across both features
- Showcase run-through

### Hard dependencies to check before starting

| Blocker | Needed for | Status to confirm |
|---------|-----------|-----------------|
| Card frame artwork (#77) | Card reveal, Codex grid | Check in audit |
| Pixel Elder base sprite (#61) | Screen 12 lamp sequence | Placeholder OK for showcase |
| Avatar portrait images | Screen 11, reading screen | #54–59 all complete ✓ |
| minorArcana-cardData.ts | Codex all 78 cards | Check in audit |
| Supabase schema (#111) | All persistence | Complete ✓ |
| Auth (#112) | Onboarding completion | Complete ✓ |

---

## STEP 5 — ASSET + DECISION TODO PLAN

*These run in parallel. Do offline. They don't block the showcase build except where noted.*

### 🎨 ASSETS (Offline / Aseprite / Midjourney)

**BLOCKING showcase (needs resolution this week):**

| # | Asset | What's needed | How |
|---|-------|--------------|-----|
| #61 | Pixel Elder sprite | Minimum viable: base idle + lamp_flicker (4 frames) + lamp_hold (2 frames loop). step_back nice to have. look_up optional for showcase. | Aseprite |
| #77 | Card frame | Final artwork, at least one variant (Major Arcana or universal) for showcase | Your tool of choice |
| #90 | Card back | Needed for face-down card state in onboarding + daily draw | Depends #77 |

**Not blocking showcase (do after):**

| # | Asset | What's needed |
|---|-------|--------------|
| #64 | Emblem Lottie animations | 600–800ms trace draw-on + 220ms pulse per emblem |
| #66 | Aura layer tested on mockups | All 4 avatars × 3 scales |
| #67 | Portal tested at all 3 scales | 24px / 48px / 120px |
| #74 | World glyph set | 4 elemental seals, SVG + PNG |
| #76 | Major Arcana sigils | 22 sigils, SVG + PNG |
| #78 | App icon | Master emblem on Threshold Deep, 1024×1024px |

**Minor Arcana card generation** (not in tracker as a single task yet — needs adding):
Wands Six–Ten queued. Cups, Swords, Pentacles suits not started. Not blocking onboarding/codex showcase — Codex will show placeholder art for undiscovered cards.

---

### 📝 DOCS + COPY (Chat tasks)

| # | Task | Effort | Blocking? |
|---|------|--------|-----------|
| #155 | Altar world-names (4 Threshold City names for talisman objects) | 30 min chat | No |
| #157 | Quiz skip UX copy ("Skip straight to choosing." + Screen 10 rewrite) | 30 min chat | Yes — needed for Phase 3 build |
| #116 | App store copy | 2h chat | No — post-showcase |
| #118 | Landing page copy | 2h chat | No — post-showcase |
| #119 | Social presence strategy | 1h chat | No — post-showcase |
| #120 | Launch narrative | 1h chat | No — post-showcase |
| #148 | Privacy policy + ToS | 3h chat | No — pre-launch |
| #18/#19 | Avatar deep lore + coaching scripts | 4h+ chat | No — chatbot feature |

---

### 🤝 DECISIONS (Need Luke)

| # | Decision | Status | Blocking? |
|---|----------|--------|-----------|
| #156 | Sound design scope | ✅ LOCKED — ambient audio, 1-card + 3-card readings, 4 events (shuffle/deal/select/reveal) | Spec (#158) needed before assets sourced |
| — | Onboarding breath full vs compressed | ✅ LOCKED — exhale-only confirmed | No |
| — | Subscription tiers | ✅ LOCKED — see majestic-subscription-tier-spec.md | No |
| — | Luke's WOFF2 script font file | ✅ CONFIRMED — Remachine Script in repo | No |
| — | Nana's beads world-name | ⏳ OPEN — does the talisman hold gesture have a Threshold City name? | No — but worth a conversation |
| — | PAYG pricing confirmation | ⏳ OPEN — ~$2.99 AUD per reading, ~$14.99 AUD/month proposed. Luke to confirm. | Before RevCat build |

---

## SUMMARY: THE WEEK IN ONE SENTENCE PER DAY

- **Monday:** Know exactly where everything stands.
- **Tuesday:** Onboarding Phases 1 + 2 built and running.
- **Wednesday:** Onboarding Phase 3 done. Avatar theme working end-to-end.
- **Thursday:** Screen 12 complete. Pixel Elder lamp sequence running (placeholder sprite OK).
- **Friday:** Codex built. Discovery model live.
- **Weekend:** Polish. End-to-end flow. Showcase ready.

---

*Majestic — Audit & Showcase Plan*
*Your adventure. But Majestic.*
