# TORRE Group — website

Source for **torre-ks.com**: the public website of TORRE Group, a Kosovo family group of four companies — **MAGFA GROUP** (home building), **SWISSTECH** (windows, doors, facades), **TORRE DI UMBRIA** (residential development) and **TORRE HOME** (apartments in Ferizaj).

> **Status: redesign in planning.** The code in this repository is the *current* site (five one-page sites served from one Next.js deployment). The redesign — research, design system, architecture, SEO strategy and implementation plan — is documented in [`docs/`](./docs) and **has not been implemented yet**. This README describes only what exists today.

## What's here today

- Next.js **16** (App Router, Turbopack), React 18, TypeScript, Tailwind CSS 3, deployed on Vercel.
- Albanian-only content (`lang="sq"`).
- One group page (`/`) and four brand pages served on subdomains via `src/middleware.ts`:
  `magfa.torre-ks.com`, `swisstech.torre-ks.com`, `torre-umbria.torre-ks.com`, `torrehome.torre-ks.com`.
- Legal pages: `/politika-e-privatesise`, `/kushtet-e-sherbimit`, `/deklarata-e-qasshmerise` (templated placeholder text, currently `noindex`).
- Internal design-comparison routes under `/preview/**` (`noindex`).
- Generated `sitemap.xml`, dynamic Open Graph images (`/api/og`), static `robots.txt` and `llms.txt`, an HTML `/llms` page.
- Content lives in `src/lib/brands.ts`.

## Requirements

- Node.js **>= 20.9** (Next.js 16's declared engine requirement; verified on Node 22). Note `package.json` still declares `>=18`, which is stale.
- npm. `.npmrc` sets `legacy-peer-deps=true`.

## Develop

```bash
npm ci
npm run dev        # http://localhost:3005
```

In development the subdomain middleware is disabled, so every brand is reachable by path:
`/`, `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome`.

## Check and build

```bash
npm run typecheck        # tsc --noEmit
npm run check:contrast   # WCAG contrast check of the brand palettes in src/lib/brands.ts
npm run build
npm run start            # production server on http://localhost:5000
```

There is no automated test suite yet (planned — see `docs/planning.md` §8).

## Environment variables

| Name | Used by | Required |
|---|---|---|
| `REVALIDATE_SECRET` | `POST /api/revalidate` (on-demand revalidation hook) | Only if that hook is used |
| `NEXT_PUBLIC_PULSE_URL`, `NEXT_PUBLIC_PULSE_TENANT` | `src/lib/pulse.ts` (CMS client; **not used by any page today**) | No |

No secrets belong in the repository or the client bundle.

## Deploy

Vercel. `vercel.json` sets the Next.js framework preset; build command `npm run build`. Production serves the apex/`www` host and the four brand subdomains from the same deployment. Security headers (CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) are set in `next.config.js`.

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
