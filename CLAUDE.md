# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev      # Start development server at localhost:3000
bun build    # Build for production
bun start    # Start production server
bun lint     # Run ESLint
```

## Architecture

This is a Next.js 16 website using the App Router with Fumadocs for documentation.

### Key Technologies
- **Next.js 16** with App Router (`app/` directory)
- **Fumadocs** for MDX-based documentation
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Bun** as the package manager

### Documentation System
- `source.config.ts` - Fumadocs MDX configuration, defines docs collection from `content/docs/`
- `lib/source.ts` - Creates the documentation source loader with `/docs` base URL
- `content/docs/` - MDX/MD documentation files
- `.source/` - Generated Fumadocs collection output (gitignored build artifact)

### Path Aliases
- `@/*` maps to project root
- `fumadocs-mdx:collections/*` maps to `.source/*` (generated collections)
