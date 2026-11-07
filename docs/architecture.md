# Architecture

> **Status: PROPOSED target architecture.** §1 records the **current** state (Fetched from the repository at commit `f0e42a3`); everything from §2 on is the plan and is **not implemented**. Assumes D-001 option B, D-002 Albanian-only at launch.
> Last updated: 2026-11-07

## 1. Current state (as built today)

| Aspect | Today |
|---|---|
| Framework | Next.js **16.2.12** (App Router, Turbopack), React **18.3.1**, TypeScript, Tailwind **3.4**, PostCSS |
| Hosting | Vercel (`vercel.json`: framework nextjs); five hostnames served by one deployment |
| Routing | `src/middleware.ts` (deprecated convention in Next 16 → `proxy`) rewrites `/` on `magfa.`, `swisstech.`, `torre-umbria.`, `torrehome.`, `llms.` subdomains to `/magfa`… and **redirects** `/magfa`… on the apex to the subdomains |
| Content | Hard-coded in `src/lib/brands.ts` (one `Brand` object per company: copy, services, stats, FAQs, **testimonials**, theme) |
| Styling | CSS custom properties in `globals.css` (HSL triplets, fluid type scale, spacing scale, motion tokens) + per-brand inline `--t-*` theme variables + `design-variants.ts` (4 layout "variants") |
| Fonts | `next/font/google`: Inter, Outfit, Instrument Serif, JetBrains Mono (all loaded in the root layout) |
| Components | `src/components/*` (Navbar, BrandHero, Proof, ServicesBento, Gallery, Faq, Testimonials, CtaFooter, ContactBlock, ContactIntake, …) |
| SEO | Per-brand `metadata` + `alternates.canonical`; `sitemap.ts`; static `robots.txt`; static `llms.txt` + HTML `/llms`; JSON-LD in `src/lib/schema.ts`; dynamic OG images (`/api/og*`, edge runtime) |
| Forms | Client-only; end in `mailto:` (nothing is sent or stored) |
| Third parties | Vercel Speed Insights; Novus Pulse CMS code present but unused by any page |
| Security | CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` set in `next.config.js` |
| Rendering | `next build` lists every route as dynamic (ƒ); reason unidentified |
| Tests | None. Only `tsc --noEmit` (`npm run typecheck`) and `scripts/check-contrast.mjs` (`npm run check:contrast`) |

## 2. Principles

1. **Preserve the infrastructure** (Next.js, Tailwind, Vercel, headers, OG images, the token approach) unless there is a documented reason (D-012).
2. **Content is data, with provenance.** Pages render typed content; every fact carries a verification tier; unverified facts cannot reach the build output (§5).
3. **Static by default.** All content routes are statically generated; only the contact endpoint is dynamic.
4. **One system.** One token set, one component library, one layout grid for the group and all four companies.
5. **Few dependencies**; each addition justified in §10.

## 3. Project structure (adapted to the existing repo)

The brief's tree lists `src/pages`. **This is a Next.js App Router project; `src/app` *is* the pages layer. Creating a `src/pages` directory would silently switch on the legacy Pages Router and conflict with `src/app`**, so it is deliberately not created.

```
torre-ks/
├── docs/                          design · planning · architecture · sitemap · seo · content · animation · accessibility · decisions · research/
├── public/
│   ├── robots.txt                 static (kept)
│   ├── llms.txt                   static, short (kept, rewritten)
│   ├── logos/ icons/              brand marks, favicons (kept; official logos replace interim ones — D-005)
│   └── images/                    originals only if not imported from src/assets
├── src/
│   ├── app/                       ← "pages": routes, layouts, metadata, route handlers
│   │   ├── layout.tsx page.tsx not-found.tsx sitemap.ts manifest.ts
│   │   ├── kompania/ kompanite/ kontakti/ projektet/ projektet/[slug]/
│   │   ├── magfa/ swisstech/ torre-umbria/ torrehome/
│   │   ├── politika-e-privatesise/ kushtet-e-sherbimit/ deklarata-e-qasshmerise/
│   │   ├── llms-full.txt/route.ts           generated from content
│   │   └── api/ contact/route.ts  og/…  revalidate/route.ts
│   ├── components/                primitives: Button, TextLink, Label, Field, SkipLink, Header, Footer, MobileNav, Breadcrumbs, ProjectRail, Figure, Reveal …
│   ├── sections/                  page compositions: HomeHero, Introduction, DivisionIndex, FeaturedProject, FactsRow, WhyTorre, ContactBand, DivisionHero (×4 variants), ProjectMeta …
│   ├── content/                   typed content + provenance: company.ts divisions.ts projects.ts claims.ts legal/*.ts
│   ├── styles/                    tokens.css base.css motion.css (imported once from layout)
│   ├── assets/                    statically-imported images (intrinsic size, blur placeholders) and SVG
│   ├── lib/                       seo/ (metadata, jsonld) · contact/ (validate, mail, rate) · a11y/ · utils.ts
│   └── proxy.ts                   renamed from middleware.ts (host redirects until moved to vercel.json)
├── tests/                         unit/ (vitest) · e2e/ (Playwright + axe) 
├── scripts/                       check-contrast.mjs (extended), validate-jsonld.mjs, check-sitemap.mjs
└── README.md
```

**Removed:** `src/app/preview/**`, `src/lib/design-variants.ts`, `src/lib/minimal-concepts.ts`, `src/lib/design-context.tsx`, `src/components/{VariantSwitcher,MinimalConcept,Testimonials,OdometerDigits,ContactIntake,Pourquoi,Process,ServicesBento,Proof,BrandHero,BrandPage}.tsx` (replaced by `sections/`), testimonials data, `app/llms/page.tsx`, per-brand theme objects, `framer-motion`, `socket.io-client`/`PulseSyncProvider` (pending D-009).
**Preserved:** `next.config.js` security headers (CSP updated), `api/og` routes, `api/revalidate`, `manifest.ts`, `useReveal` pattern (fixed), `scripts/check-contrast.mjs` (extended), Speed Insights, `vercel.json`, `.agents/` (ignored by git).

## 4. Routing and rendering

| Route group | Rendering | Notes |
|---|---|---|
| All content pages (`/`, `/kompania`, `/kompanite`, 4 divisions, `/projektet`, `/projektet/[slug]`, `/kontakti`, legal) | **SSG** at build; `dynamicParams = false` for `[slug]` with `generateStaticParams` from `content/projects.ts` | Full HTML without JS; CDN-cacheable; `export const dynamic = "error"` on content routes so an accidental dynamic API fails the build. The current all-ƒ output is investigated first (M1) — likely a dynamic API reaching the root layout/proxy |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Static (generated at build from content/route registry) | |
| `/api/contact` | Dynamic, **Node runtime** (email SDK) | POST only |
| `/api/og/*` | Dynamic, edge | Existing |
| `/api/revalidate` | Dynamic | Existing; secret in env |
| Host redirects (subdomains, www) | `vercel.json` `redirects` with `has: [{ type: "host", value: … }]` (preferred, platform-level, no function invocation) or `proxy.ts` | Per `sitemap.md` §5 |
| 404 | `not-found.tsx`, HTTP 404, `noindex` | Existing, restyled |

Language: Albanian is default and un-prefixed. If D-002 approves English the structure becomes `src/app/[lang]/…` with `generateStaticParams` over `["sq","en"]` and `sq` served at un-prefixed paths via rewrites; designed now, built only when approved. No `/en` route exists until then.

## 5. Content and data structures

```ts
// content/types.ts  (sketch — proposed)
export type Tier = "verified" | "client" | "unverified";

export interface Fact<T = string> {
  value: T;
  tier: Tier;
  source: string;          // e.g. "commit 39daa78", "client email 2026-11-10", "document: …"
  updated: string;         // ISO date; also drives sitemap lastmod and llms-full.txt
}

export interface Division {
  id: "magfa" | "swisstech" | "torre-umbria" | "torrehome";
  name: string;                    // "MAGFA GROUP"
  legalName?: Fact;
  slug: string;                    // "magfa"
  summary: Fact;                   // one-sentence answer (AEO/GEO definition sentence)
  services: Fact[];                // names only unless verified descriptions exist
  areas?: Fact<string[]>;
  address?: Fact<PostalAddress>;   // only SWISSTECH today
  images: ImageRef[];              // with alt, caption, kind: "photo" | "render" | "plan"
}
```
**Guard:** a `publish()` helper that renders/serialises a `Fact` throws at build time when `tier === "unverified"`. All outputs — pages, JSON-LD builders, `llms-full.txt`, OG images — read through it, so an unverified claim cannot ship by accident (this is what the current `/llms` page lacks). `claims.ts` holds the withheld claims with their tier and handling so they stay documented but unrendered.

Images carry `kind` so renders are always captioned "Vizualizim". `projects.ts` lists only approved projects; a project missing required fields fails type-check.

## 6. SEO implementation

- `generateMetadata` per route from a single `seo/metadata.ts` that reads titles/descriptions from content (drafts in `seo.md` §3); `metadataBase` once; `alternates.canonical` absolute on one host; Open Graph/Twitter with `/api/og` images whose alt is descriptive.
- `lib/seo/jsonld.ts`: pure builder functions (`organization()`, `website()`, `division()`, `project()`, `breadcrumbs()`), unit-tested, rendered by a `<JsonLd>` server component; validated in CI with a script that parses every emitted block and asserts required fields and the absence of forbidden ones (`aggregateRating`, `review`, `offers`, `openingHours`).
- `app/sitemap.ts` iterates the same **route registry** used for navigation and the footer, so nav, sitemap and `llms-full.txt` cannot disagree; a test compares the registry with the app directory's page files.
- `public/robots.txt` static (per `seo.md` §7).
- hreflang helper present but inactive until D-002.

## 7. Contact endpoint design (D-006)

`POST /api/contact` (Node runtime)
1. Reject non-JSON / oversized bodies (> 8 KB).
2. Hand-rolled validator (no schema library): `name` 2–100 chars; `contact` must be an email or a phone (normalised to digits/+); `company` ∈ allow-list (`general|magfa|swisstech|torre-umbria|torrehome`); `message` 10–2000 chars; `consent === true`; strip control characters.
3. Spam: honeypot field `website` must be empty; client-set `startedAt` must be ≥ 3 s old (cheap, spoofable); platform rate limit (Vercel firewall rule, e.g. 5 requests / 10 min / IP) is the primary control; an in-memory limiter is only defence-in-depth because serverless instances do not share memory. No CAPTCHA puzzle (WCAG 3.3.8).
4. Send a plain-text email via the approved provider (assumed Resend) from `CONTACT_FROM` to `CONTACT_TO`, `reply-to` = the visitor's email if given. Content is never interpolated into HTML.
5. Responses: `200 {ok:true}`; `400 {errors:{field:message}}`; `429`; `500 {message:"generic"}` — no stack traces, no echo of secrets; logs contain no personal data.
6. No database; enquiries live in the recipients' mailboxes (privacy policy says so).

Environment variables (names only — values live in Vercel, never in the repo or the client bundle):
`CONTACT_TO`, `CONTACT_FROM`, `RESEND_API_KEY`, `REVALIDATE_SECRET` (exists), `NEXT_PUBLIC_SITE_URL`. `NEXT_PUBLIC_PULSE_*` stay only if D-009 keeps Pulse.

## 8. Security and privacy

- Keep existing headers; update CSP only for approved origins: Vercel Analytics/Speed Insights load from the same origin (`/_vercel/…`), so `script-src 'self'` should suffice (verify at M5); no third-party script is planned. `form-action 'self'`, `frame-ancestors 'none'`, `base-uri 'self'` stay.
- `unsafe-inline` for scripts/styles exists today for Next hydration; tightening with nonces is optional (M6 stretch).
- Add `Strict-Transport-Security` (platform-managed on Vercel; verify), `X-Content-Type-Options` (exists).
- No secrets in client code; the Pulse public URL/tenant are public identifiers, not secrets.
- Privacy: minimum data (name, contact, message, company, consent); purpose and retention stated in a real policy reviewed by counsel (Kosovo Law 06/L-082). No cookies are set today besides whatever Vercel infrastructure adds; analytics are cookieless (D-016) so no consent banner is built.

## 9. Components and styling

- Tailwind config maps semantic tokens from `styles/tokens.css` (`design.md` §2.6). No inline per-brand theme objects.
- Server Components by default; Client Components only for: `MobileNav`, `ProjectRail` (buttons), `Reveal` observer, `ContactForm`, and (conditionally) the pinned-rail GSAP island. Targeted bundle: pages ship near-zero JS besides these.
- `Figure` wraps `next/image` with required `alt`, `sizes`, intrinsic dimensions and an optional "Vizualizim" caption; hero `priority` only on the LCP image.
- Fonts via `next/font` (Geist + Geist Mono; fallback plan in D-011) with `display: swap` and metric-adjusted fallbacks (`adjustFontFallback`).

## 10. Dependencies

| Action | Package | Why |
|---|---|---|
| **Keep** | `next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`, `typescript`, `@vercel/speed-insights`, `clsx`, `tailwind-merge`, `lucide-react` | Existing infrastructure; `lucide-react` is tree-shaken (replace by inline SVG later if the icon set stays tiny) |
| **Remove** | `framer-motion` | Used only by `Navbar` and `OdometerDigits`; replaced by CSS (D-013) |
| **Remove** (pending D-009) | `socket.io-client` | Only imported by unused `PulseSyncProvider` |
| **Add** | `@vercel/analytics` | Cookieless analytics (D-016) |
| **Add** | `resend` (or chosen provider) | Contact delivery (D-006) |
| **Add (dev)** | `@playwright/test`, `@axe-core/playwright`, `vitest`, `eslint`, `eslint-config-next`, `eslint-plugin-jsx-a11y`, `@lhci/cli` | Test strategy (`planning.md` §8) |
| **Conditional** | `gsap` | Only if the pinned rail prototype is approved (`animation.md` §1) |
| **Not added** | Smooth-scroll libraries, CSS-in-JS, UI kits, schema/validation libraries, CMS SDKs | Avoid unnecessary dependencies |

Engines: raise `engines.node` from `>=18` to `>=20.9.0` — Next.js 16.2.12 declares exactly that in its own `package.json` (Fetched). The baseline build here ran on Node 22.23.

## 11. Deployment requirements

1. **Vercel project** with domains: `torre-ks.com` (primary, D-001), `www.torre-ks.com` (301 → primary), and the four subdomains kept for 301 redirects.
2. **DNS** control for apex/www/subdomains and, for email, the sending domain's SPF/DKIM records (provider dependent).
3. **Environment variables** (§7) set in Vercel for Production and Preview; none committed.
4. **Redirects** in `vercel.json` (`has: host`) — tested on a Preview deployment with host-header overrides before cutover.
5. **Search Console / Bing** properties verified (DNS TXT) and the sitemap submitted after cutover.
6. **Rollback plan:** keep the previous production deployment promotable; cutover is DNS-neutral (domains already point at the project), so rollback = promote previous deployment.
7. **CI:** typecheck, lint, unit tests, build, Playwright + axe on a preview URL, Lighthouse CI against budgets (`planning.md` §7).
8. **Branches:** feature branches per milestone; draft PRs; nothing merges to `main` without review.
