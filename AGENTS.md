# AGENTS.md

Instructions for any coding agent (Claude Code, Copilot, Cursor, Codex, etc.) working in this repo. See `CLAUDE.md` for Claude-Code-specific context; this file is the tool-agnostic subset.

## Setup

```
npm install
```

## Commands

| Command | What it does | Run it |
|---|---|---|
| `npm run typecheck` | `tsc --noEmit` | before every push |
| `npm test` | `node --test src` — runs every `*.test.mjs` under `src/` | before every push |
| `npm run web` | `expo start --web` — fastest way to see a change | while iterating on UI |
| `npm start` | `expo start` (Metro, for device/simulator) | for native testing |
| `npm run build:web` | production web build, what CI and Vercel run | before claiming a change is deploy-safe |

There is no lint script configured. There is no Jest/Vitest — tests are plain Node's built-in `node:test`, one `.test.mjs` file per module under test (see `src/lib/supabase/v2/*.test.mjs` for the pattern: pure-function unit tests, no network, no mocking framework).

## Before you open a PR / hand off work

1. `npm run typecheck` clean.
2. `npm test` clean.
3. If you touched anything under `app/`, actually run `npm run web` and click through the screen you changed. Several screens in this repo have previously shipped with fatal duplicate-declaration syntax errors that `git diff` alone wouldn't catch — see the note below.

## Known repo hazard: duplicate-declaration corruption

As of this writing, a systematic bug pattern was found and fixed across ~11 files: accidental duplicated `import` lines, duplicated `function`/`export default function` declarations, duplicated JSX props, and one `useState`/`Promise.all` block that ran twice per invocation. Each instance made its file fail to parse or silently double-write data. The likely cause was a bad merge or copy/paste, not intentional code.

If you see two `import` lines from the same module, two `export default function` in one file, or a JSX element with the same prop twice — that's this pattern, not a stylistic choice. Fix by removing the redundant half, not by keeping both.

## Conventions

- TypeScript strict mode is on (`tsconfig.json`). Don't add `// @ts-ignore` to work around a type error — fix the type, or ask why the existing `birthCardCalculator.ts` needs one (`src/features/birth-card/birthCardCalculator.ts:1` — a `.ts` file re-exporting a `.js` file of the same name, one of the things worth cleaning up rather than copying).
- Design tokens (`src/theme/tokens.ts`, `typography.ts`) are the only source of colour/type values. Never hardcode a hex value in a component.
- `src/lib/supabase/v2/` is the current data layer. Don't import from `src/lib/supabase/{auth,profile,readings}.ts` (no `v2/` in the path) — those are superseded and unused.
- One world, four accent themes — see `CLAUDE.md`. Don't build per-avatar screen variants.
- Card and product copy (interpretations, one-liners, avatar voice lines) is content, not code. Don't invent new copy to fill a gap — flag the gap and use the nearest existing placeholder pattern (see `src/features/reading/interpretationPlaceholder.ts` for what "clearly a placeholder" looks like).
