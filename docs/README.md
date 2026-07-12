# Majestic documentation

Google Drive is the editorial source of truth. This repository mirrors approved canonical documents for implementation and version control.

## Folder map

| Folder | Purpose |
|---|---|
| `00-index-and-governance` | Documentation rules, indexes, and contributor guidance |
| `01-product-strategy` | Product requirements, commercial model, authentication, and monetisation |
| `02-brand-world-and-design` | Brand, visual system, avatars, typography, colour, and Threshold City |
| `03-experience-and-feature-specs` | User journeys, interaction rules, screens, rituals, and feature specifications |
| `04-content-and-tarot` | Canonical tarot copy, card datasets, and content libraries |
| `05-ai-and-conversation` | LLM seeds, interpretation source material, and prompt libraries |
| `06-engineering-and-analytics` | Analytics, code-adjacent references, renderers, and data modules |
| `07-delivery-and-tracking` | Delivery plans, trackers, audits, and status artefacts |
| `08-research-and-prototypes` | Research, experiments, prototypes, and reference implementations |
| `99-archive` | Superseded material retained only for history |

## Naming convention

Use lower-case kebab-case:

`majestic-[domain]-[artifact][-vN].[extension]`

Examples:

- `majestic-prd-v4.md`
- `majestic-navigation-architecture-spec.md`
- `majestic-major-arcana-content-library.xlsx`

Rules:

1. Prefix project-owned documents with `majestic-`.
2. Use nouns that identify the subject before the artefact type, such as `navigation-architecture-spec`.
3. Add `vN` only when the version is part of the document's formal identity. Git history handles routine revisions.
4. Avoid spaces, underscores, copy numbers, dates, `final-final`, and personal names in canonical filenames.
5. Keep one canonical active copy. Move superseded copies to `99-archive`.
6. Preserve extensions that reflect the source format. Markdown is preferred for textual specifications mirrored in GitHub.
7. Reference documents using repository-relative links, not bare filenames, when editing content.

## Source-of-truth workflow

1. Approve editorial changes in Google Drive.
2. Update the matching canonical file in this repository.
3. Keep the same folder and filename on both platforms.
4. Review changes through a pull request.
5. Archive superseded versions rather than leaving numbered duplicates beside canonical files.

## Canonical additions retained from GitHub

These files are part of the source-of-truth set and should remain in Google Drive:

- `02-brand-world-and-design/majestic-visual-identity-brief.md`
- `05-ai-and-conversation/majestic-avatar-llm-seeds.md`
- `06-engineering-and-analytics/majestic-analytics-reference.md`
- `04-content-and-tarot/majestic-major-arcana-content-library.xlsx`
