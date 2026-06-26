# Public Contact Form (Consultation API) Design Document

## Background & Goals

- **Problem**: The marketing site has no public form for prospects to leave
  contact information. The only path today is a `mailto:` link in the home
  page's Final CTA, which loses context and depends on the user having a
  mail client configured.
- **Available backend**: A Cloudflare Workers + D1 (SQLite) Consultation API
  at `https://consultation.clouisle.asia` is now live. It exposes
  `POST /api/inquiries` to record a consultation lead, gated by an
  `X-API-Key` header.
- **Goal**: Add a new `/[lang]/contact` page (en/zh) with a four-field form
  that submits directly to the API from the browser. Only the create
  endpoint is wired up — list / detail / patch / delete (admin) are out of
  scope for this iteration.
- **Success criteria**:
  - A prospect can navigate to `/en/contact` or `/zh/contact`, fill in the
    four fields, and have the inquiry land in the D1 database.
  - The form is fully accessible (`aria-invalid`, `aria-describedby`,
    `<form onSubmit>`).
  - Validation mirrors the server's rules exactly.
  - Failures surface a localized banner with the server's own message
    (Chinese per the API spec, wrapped in `lang="zh-CN"`).
  - A 30-second post-success cooldown (in `localStorage`) deters casual
    double-submits.

## High-Level Design

Static-export, browser-to-API direct call (no server proxy).

```
[ User Browser ]
     │  POST + X-API-Key (baked at build time)
     ▼
[ consultation.clouisle.asia /api/inquiries ]
     │
     ▼
[ Cloudflare D1 (SQLite) ]
```

Three layers in the Next.js codebase:

1. **Pure logic** (`lib/consultation-api.ts`) — types, `validateInquiry()`,
   `submitInquiry()`. Browser-safe, no Node imports. Always returns a
   `SubmitResult` discriminated union; never throws.
2. **Env guard** (`lib/consultation-env.ts`) — `getConsultationEnv()` reads
   `NEXT_PUBLIC_CONSULTATION_API_BASE` and `NEXT_PUBLIC_CONSULTATION_API_KEY`,
   throws at build time if either is empty.
3. **UI** (`components/contact/consultation-form.tsx`, `'use client'`) —
   `useState` for `values` / `errors` / `touched` / `status` / `banner` /
   `cooldownRemaining`; receives `copy` and `lang` as props from the
   server-rendered page; never imports `lib/seo.ts` directly.

Data flow:

```
page.tsx (server)
  ├─ getContactCopy(lang)               ← from lib/seo.ts
  ├─ getConsultationEnv()               ← throws on missing env at build time
  ├─ generateMetadata()                 ← title, description, OG, alternates, JSON-LD
  └─ <ConsultationForm copy={...} lang={lang} />
        │ (props, no server import)
        ▼
       form state → validate → submitInquiry
        ▼
       { ok: true, data } | { ok: false, error: { code, message } }
```

## Implementation Plan

### Stage 1: API module + env guard

- **Files**: `lib/consultation-api.ts`, `lib/consultation-env.ts`
- **Logic**:
  - `Inquiry`, `CreateInquiryPayload`, `InquiryErrorCode`, `SubmitResult`
    types match the API spec exactly.
  - `validateInquiry(values)` — pure function, returns
    `Record<keyof CreateInquiryPayload, string | undefined>`. Rules: `appellation`
    trim+1-64; `content` trim+1-2000; `contact` trim+1-64+(`^1[3-9]\d{9}$` |
    `^[\w.-]{6,}$`); `company` trim+1-128.
  - `submitInquiry({ payload, honeypot })` — honeypot short-circuits to a
    generic `NETWORK` error; otherwise `try { fetch(...) }` parses the
    unified error envelope, normalises error codes, and never throws.
  - `getConsultationEnv()` reads the two `NEXT_PUBLIC_*` vars and throws a
    helpful error if either is empty. Cached after first read.
- **Validation**: open the file and confirm regex strings match the API
  doc byte-for-byte. `bun run lint` clean.

### Stage 2: i18n copy + UI primitives

- **Files**: `components/ui/input.tsx`, `components/ui/textarea.tsx`,
  `components/ui/label.tsx`, `lib/seo.ts` (add `getContactCopy`)
- **Logic**:
  - `getContactCopy(lang)` mirrors `getHomeSeoCopy`; returns
    `{ title, description, keywords, jsonLd, form: { ... } }` with en/zh
    branches. Form copy includes labels, placeholders, hints, success
    message, cooldown string, and error prefix.
  - `Input` / `Textarea` follow `components/ui/button.tsx`'s
    forwardRef + `cva` pattern (no `asChild`/`Slot` — inputs have no
    children). `aria-invalid` styling via `aria-[invalid=true]:...`.
  - `Label` is a plain forwardRef wrapper, `text-sm font-medium text-zinc-200`.
- **Validation**: type-check passes. `bun run lint` clean.

### Stage 3: Form component + CSS

- **Files**: `components/contact/consultation-form.tsx`,
  `app/globals.css` (add `cl-contact-*` and `cl-form-*` classes)
- **Logic**:
  - 5 useState slices: `values`, `errors`, `touched`, `status` (`'idle' |
    'submitting' | 'success' | 'error'`), `banner`, plus `honeypot` and
    `cooldownRemaining`.
  - Field-level validation: on `blur`, run `validateInquiry(values)` and
    slice out the one field's error. Don't show errors until first
    interaction.
  - On submit: full validation → if any error, set all `touched[field] =
    true` and bail → check `localStorage` cooldown → `submitInquiry` →
    on `ok` write cooldown, render success card → on `!ok` build
    `BannerError` (Chinese message in `<span lang="zh-CN">`, English
    prefix, generic fallback for empty `error.message`).
  - Accessibility: `id` on each field, `<Label htmlFor>` pairs, `aria-invalid`
    + `aria-describedby` chains to `<p id="...-error">` error nodes.
  - Honeypot: `<input type="text" name="website" tabIndex={-1}
    autoComplete="off" aria-hidden="true" />` positioned off-screen
    (`position: absolute; left: -9999px`) — never `display: none`.
  - Cooldown: 30s `localStorage` cooldown, countdown visible in the
    success card, "Send another" button disabled while active.
  - Submit button: `cl-btn-primary` (reused from existing CSS), shows
    `Loader2` spinner + `copy.submitting` while in flight.
- **Validation**:
  - Manually exercise the four invalid-input paths in the browser.
  - Confirm `aria-invalid` / `aria-describedby` produce the expected
    accessibility tree (Chrome devtools accessibility inspector).

### Stage 4: Page + nav + sitemap

- **Files**: `app/[lang]/(home)/contact/page.tsx`, `components/navbar.tsx`,
  `app/sitemap.ts`
- **Logic**:
  - Page is a server component under `(home)` so it inherits `<Navbar />`
    from `app/[lang]/(home)/layout.tsx`.
  - `generateStaticParams` returns `[{ lang: 'en' }, { lang: 'zh' }]`.
  - `generateMetadata` builds title/description/OG/twitter/alternates
    following `app/[lang]/(home)/page.tsx` lines 25–67 structure.
  - `getConsultationEnv()` is called once at module top so the static
    export fails loudly if the env vars are missing.
  - JSON-LD: `ContactPage` schema (name, description, url, inLanguage).
  - Navbar: add `contact: 'Contact' | '联系我们'` to `labels`; add a
    `{ href: `/${lang}/contact`, text: t.contact, docs: false }` entry
    after the Docs link; append `t.contact` to the `useMemo` dep array.
  - Sitemap: add `/en/contact` and `/zh/contact` entries with
    `changeFrequency: 'monthly'`, `priority: 0.8`, full alternates +
    `x-default`.
- **Validation**:
  - `bun run build` produces `out/en/contact/index.html` and
    `out/zh/contact/index.html`.
  - `bun run lint` clean.
  - Manual click-through: home → Contact link in nav → form renders →
    fill all four fields → submit → success card → `localStorage` has
    `lastSubmitAt` → "Send another" disabled.
  - `out/sitemap.xml` contains the two new contact entries.

### Stage 5: Docs + env example

- **Files**: `docs/IMPLEMENTATION_PLAN.md` (update index), `.env.example`
  (new), `docs/plan/consultation-api.md` (this file).
- **Validation**: both files exist and reference each other.

## Testing Strategy

### Happy path

1. `bun dev` with `.env.local` populated.
2. `/en/contact` renders the form with English labels.
3. Submit empty → field-level errors show, no API call fires.
4. Fill all four fields with valid values → submit → success card with
   "Send another" disabled.
5. Reload page → form clears.
6. `localStorage` contains `clouisle.contact.lastSubmitAt`.
7. Wait 30 s → "Send another" enables → click → form resets.
8. Switch language to `zh` via globe icon → URL becomes `/zh/contact`,
   all labels translate.
9. `bun run build && bun run start` → `http://localhost:3000/en/contact`
   behaves identically on the static export.

### Negative / error paths

1. **Invalid contact** (`contact="abc"`) → onBlur → field error
   "Enter a valid phone number (1[3-9]xxxxxxxxx) or WeChat ID (6+ characters)".
2. **Server `INVALID_BODY`**: payload that passes client validation but
   fails server (e.g. 2001-char `content`) → error banner shows the
   server's Chinese message inside `<span lang="zh-CN">` with English
   prefix "Submission failed: ".
3. **Network failure**: temporarily point
   `NEXT_PUBLIC_CONSULTATION_API_BASE` to a non-existent host, rebuild,
   submit → banner shows "Network error, please try again".
4. **Honeypot**: in devtools, unhide `name="website"`, type a value,
   submit → `submitInquiry` short-circuits, no network call, banner
   shows generic error.
5. **Build-time env check**: `rm .env.local && bun run build` → build
   fails with the helpful env-missing error.
6. **Cooldown**: fill form, submit success → click "Send another"
   immediately → button disabled, success card shows
   "(you can submit again in Ns)".

### Regression scope

- Existing home, slides, docs routes still render.
- Navbar links (Platform / Architecture / Security / Use Cases / Docs)
  still work and active state is unaffected.
- Mobile menu shows the new Contact link in the same order.
- Sitemap still includes all existing entries + the two new contact
  entries.
- Dark theme forced by `(home)/layout.tsx` is unaffected.
- `ClouisleChat` widget appears on contact page (default behaviour;
  out of scope to suppress in v1).

## Risks & Mitigation

### Security model

The build is `output: 'export'` (static). `NEXT_PUBLIC_*` vars are baked
into the JS bundle at build time. The API key is therefore visible to
anyone who downloads the bundle. This is an accepted tradeoff because:

1. The build is static — any alternative architecture (Next.js Route
   Handler proxy) would also expose the key, since the static export
   has no server runtime to hide it behind.
2. The API key is expected to be scoped to `create` only and rate-limited
   upstream. The list / detail / patch / delete endpoints (when added
   later) should use a *different* key with admin scope, never the
   public one.
3. Rotation is one `wrangler deploy` after editing the env.

The client `localStorage` cooldown and honeypot deter casual bots only.
The real defence is upstream: per-IP rate limit, referer restriction to
`https://clouisle.asia` / `https://www.clouisle.asia`, and bot scoring
at the Workers layer.

A "runtime fetch a public JSON to get the latest key" approach was
considered and rejected: the JSON URL would itself be a build-time
secret-adjacent value, and any key published there would have the same
exposure surface — plus an extra round-trip on every submit.

### Other risks

- **Server returns Chinese error messages in en pages**: displayed inside
  `<span lang="zh-CN">` with an English prefix. Acceptable because the
  API is internal and the message is truthful. Future work can add a
  code-to-message map if this becomes a UX complaint.
- **Static-export env handling**: `getConsultationEnv()` throws at
  build time on missing vars. This will break any CI that doesn't set
  them — operators must set `NEXT_PUBLIC_CONSULTATION_API_KEY=<placeholder>`
  for preview deploys. Documented in `.env.example`.
- **Unrelated uncommitted changes** (`.source/browser.ts`,
  `.source/server.ts`, `app/[lang]/layout.tsx`, `components/clouisle-chat.tsx`,
  three slide PNGs): leave them alone. The contact form sits in net-new
  files plus surgical additions to `lib/seo.ts`, `components/navbar.tsx`,
  `app/sitemap.ts`, and `app/globals.css`.
- **Pre-existing `(home)/beta/` empty directory**: leave it alone; this
  plan does not address the public beta page.
