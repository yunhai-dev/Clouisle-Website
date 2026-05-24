# English Documentation Design Document

## Background & Goals

- Problem to solve: `/en/docs` is unavailable because Fumadocs is configured for English and Chinese directory-based i18n, but only `content/docs/zh` exists.
- Intended outcome: `/en/docs` and all English docs slugs render real English documentation, while `/zh/docs` remains Chinese.
- Success criteria:
  - `content/docs/en` mirrors every Chinese docs slug.
  - Fumadocs generates both English and Chinese static docs routes.
  - Navbar docs links and language switching are locale-aware.
  - Metadata and sitemap URLs do not double-prefix locales.

## High-Level Design

- Content layer: add `content/docs/en` as a translated mirror of `content/docs/zh` with identical filenames and page ordering.
- Routing layer: rely on Fumadocs `source.generateParams()` and `source.getPage(slug, lang)` instead of temporary Chinese fallback logic.
- Navigation layer: make the Docs link and language switcher preserve locale and docs slug.
- SEO layer: use Fumadocs `page.url` directly because it is already locale-prefixed.

## Implementation Plan

### Stage 1: Implementation tracking

- **Files modified**: `docs/IMPLEMENTATION_PLAN.md`, `docs/plan/english-docs.md`
- **Specific logic**: Record scope, stages, validation, and status for the complex docs work.
- **Validation**: Confirm both files exist and match the implementation scope.

### Stage 2: English docs content

- **Files modified**: `content/docs/en/meta.json`, `content/docs/en/*.mdx`
- **Specific logic**: Translate every Chinese docs page from `content/docs/zh`, preserving frontmatter keys, icons, image paths, slug filenames, and document structure.
- **Validation**: Run file parity and Han-character checks against `content/docs/en`.

### Stage 3: Localized routing cleanup

- **Files modified**: `app/[lang]/docs/layout.tsx`, `app/[lang]/docs/[[...slug]]/page.tsx`, `lib/i18n.ts`
- **Specific logic**: Remove Chinese fallback behavior, use requested locale trees/pages directly, restore `source.generateParams()`, and disable silent fallback.
- **Validation**: `bun run build` should generate `/en/docs` and `/zh/docs` routes.

### Stage 4: Navigation and SEO

- **Files modified**: `components/navbar.tsx`, `app/sitemap.ts`, `app/[lang]/docs/[[...slug]]/page.tsx`
- **Specific logic**: Make Docs links locale-aware, preserve docs slugs when switching languages, and compose metadata/sitemap URLs from `page.url` without adding an extra locale prefix.
- **Validation**: Check built output for no `/en/en/docs` or `/zh/zh/docs` URLs.

### Stage 5: End-to-end verification

- **Files modified**: `docs/IMPLEMENTATION_PLAN.md`, `docs/plan/english-docs.md`
- **Specific logic**: Mark completed stages and record validation results.
- **Validation**: Run parity check, Han-character check, `bun run lint`, `bun run build`, static export file checks, and local route checks.

## Testing Strategy

- Happy path tests:
  - `/en/docs` renders English documentation.
  - `/en/docs/getting-started` renders English documentation.
  - `/zh/docs` still renders Chinese documentation.
  - Navbar Docs link points to the active locale docs route.
- Negative/regression checks:
  - No English docs files are missing relative to Chinese docs.
  - No Han characters remain in English docs content.
  - No double-prefixed docs URLs are emitted in `out`.
- Regression scope:
  - Static export docs generation.
  - Search source generation.
  - Sitemap alternates.
  - Docs light/dark theme background.

## Risks & Mitigation

- Translation drift: preserve the Chinese structure and translate sentence-by-sentence where practical.
- Slug mismatch: copy filenames exactly from `content/docs/zh`.
- Hidden fallback: set strict i18n fallback and remove fallback page helpers.
- SEO URL regressions: use `page.url` directly and grep built output for double prefixes.
- Existing uncommitted changes: keep homepage loader removal and docs theme fix intact; do not overwrite unrelated files.
