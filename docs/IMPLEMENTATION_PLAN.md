# Implementation Plan

## English Documentation Completion

See `docs/plan/english-docs.md`.

- [x] Document implementation scope
- [x] Translate Chinese docs into `content/docs/en`
- [x] Clean localized docs routing and SEO
- [ ] Validate English and Chinese docs output

## Public Contact Form (Consultation API)

See `docs/plan/consultation-api.md`.

- [x] Build API client + env guard (`lib/consultation-api.ts`, `lib/consultation-env.ts`)
- [x] Add `getContactCopy` to `lib/seo.ts` and create `input` / `textarea` / `label` UI primitives
- [x] Build `ConsultationForm` client component + add `cl-contact-*` / `cl-form-*` classes to globals.css
- [x] Add `/[lang]/contact` page, `Contact` link in navbar, and sitemap entries
- [x] Track work in `docs/plan/consultation-api.md` and ship `.env.example`
