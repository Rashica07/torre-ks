# TORRE Group — website

Source for **torre-ks.com**: the public website of TORRE Group, a Kosovo family group of four companies — **MAGFA GROUP** (home building), **SWISSTECH** (windows, doors, facades), **TORRE DI UMBRIA** (residential development) and **TORRE HOME** (apartments in Ferizaj).

> **Status: redesign in progress — Milestone 1 (foundation) is implemented on this branch.** The site is now one Next.js app on one domain with a shared design system, per-company theming and gated English. The home page, company pages and contact page are **skeletons** built on verified facts only; their full designs, the project pages, the enquiry form and the SEO/AEO layer follow in milestones M2–M6 (see [`docs/planning.md`](./docs/planning.md)). This README describes only what exists today.

## What's here today (after Milestone 1)

- Next.js **16** (App Router, Turbopack), React 18, TypeScript, Tailwind CSS 3; deployed on Vercel.
- **One domain, one codebase.** Pages: `/` (home), `/kompanite`, the four companies `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome`, `/kontakti`, and the three legal pages (placeholder text, `noindex`, Albanian only). Unknown URLs return a real, fully rendered 404.
- **Albanian is live** (un-prefixed). **English** exists under `/en/*` with English slugs (`/en/companies`, `/en/contact`, …) but is **gated**: `noindex`, not in the sitemap, no language switcher — until the owner approves the translation (`ENGLISH_APPROVED` in `src/lib/i18n/index.ts`).
- Each company keeps its own accent colour and base surface (`data-division`), inside a shared system: tokens in `src/styles/tokens.css`, Geist + Geist Mono, 12-column grid.
- Content lives in `src/content/` as typed facts with a verification tier; `publish()` refuses unverified claims, so prices, warranties, statistics and testimonials cannot reach a page by accident (`src/content/claims.ts` documents what is withheld).
- The old brand subdomains (`magfa.`, `swisstech.`, `torre-umbria.`, `torrehome.`, `llms.torre-ks.com`) permanently redirect (HTTP 308) to their sections on `torre-ks.com` (`next.config.js`).
- Generated `sitemap.xml`, per-route metadata and canonicals, Organization/WebSite JSON-LD, dynamic OG images (`/api/og`, `/api/og/[brand]`).
- **Not built yet:** About page, projects, the enquiry form (contact is `tel:` + WhatsApp), new `robots.txt`/`llms.txt`, analytics, official logos (an interim text wordmark is used).

## Requirements

- Node.js **>= 20.9** (Next.js 16's declared engine requirement; verified on Node 22). `.npmrc` sets `legacy-peer-deps=true`.

## Develop

```bash
npm ci
npm run dev        # http://localhost:3005
```

## Check, test, build

```bash
npm run typecheck        # tsc --noEmit
npm run lint             # ESLint (Next + jsx-a11y as errors)
npm run check:contrast   # WCAG contrast of every design-token pair (135 checks)
npm test                 # Vitest unit tests
npm run build
npm run test:e2e         # Playwright + axe against the production build (starts `npm run start` on :5000)
```

The end-to-end suite needs the browsers Playwright manages: `npx playwright install chromium` (already present in the Claude Code cloud image). CI (`.github/workflows/ci.yml`) runs all of the above.

## Environment variables

| Name | Used by | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute URLs for canonicals, sitemap, OG (defaults to `https://torre-ks.com`) | No |
| `REVALIDATE_SECRET` | `POST /api/revalidate` (on-demand revalidation hook) | Only if that hook is used |
| `NEXT_PUBLIC_PULSE_URL`, `NEXT_PUBLIC_PULSE_TENANT` | `src/lib/pulse.ts` (CMS client; **not used by any page**) | No |

No secrets belong in the repository or the client bundle.

## Deploy

Vercel. `vercel.json` sets the Next.js preset; build command `npm run build`. Keep `www`, the apex and the four old brand subdomains pointed at the project: the subdomains redirect to the main domain (see `next.config.js`). Security headers (CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.js`.

## Documentation

| Document | Purpose |
|---|---|
| [`docs/planning.md`](./docs/planning.md) | Objectives, scope, milestones, acceptance criteria, testing, risks |
| [`docs/design.md`](./docs/design.md) | Design system: palette, type, grid, components, homepage direction |
| [`docs/architecture.md`](./docs/architecture.md) | Current state and target architecture |
| [`docs/sitemap.md`](./docs/sitemap.md) | Planned routes, navigation, redirects |
| [`docs/seo.md`](./docs/seo.md) | SEO, AEO and GEO strategy |
| [`docs/content.md`](./docs/content.md) | Verified facts, claims register, missing content, image needs |
| [`docs/animation.md`](./docs/animation.md) | Motion system |
| [`docs/accessibility.md`](./docs/accessibility.md) | WCAG 2.2 AA requirements and test plan |
| [`docs/decisions.md`](./docs/decisions.md) | Decision log — **open questions for the owner are here** |
| [`docs/research/`](./docs/research) | Existing-site audit, reference analyses, verified resources |

Every document begins with a status line. Until a feature exists, its document says **PROPOSED**.
