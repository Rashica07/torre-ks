# Existing website audit — torre-ks.com

> **Status: COMPLETE (Milestone 0).** Evidence labels are defined in [`README.md`](./README.md).
> Audited: 2026-11-07. Repository commit: `f0e42a3`.

## 1. What TORRE actually is

**TORRE Group is not a single company with a single service list. It is a Kosovo-based family group of four companies**, each with its own brand, subdomain, colour and offer. The name "TORRE" does not tell you what any of them do — which is exactly why the redesign cannot start from a generic "engineering company" template.

| # | Brand | What it does (as published) | Legal name / address (if any) | Host |
|---|---|---|---|---|
| 01 | **MAGFA GROUP** | Private and residential home construction; architectural design; renovation; interior design; site supervision; free initial consultation. Builds in Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë, Mitrovicë. | Legal name **MAGFA SH.P.K.** (Client-supplied). No street address published. | `magfa.torre-ks.com` |
| 02 | **SWISSTECH** | Manufacture and installation of PVC and aluminium windows and doors, structural-glass facades, servicing. Describes "German profile, local production". | Address **Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj** (Client-supplied, "real factory address"). | `swisstech.torre-ks.com` |
| 03 | **TORRE DI UMBRIA** | Residential building development: project management, architecture & engineering, infrastructure, common areas, permits and documentation. | None published. | `torre-umbria.torre-ks.com` |
| 04 | **TORRE HOME** | Sale of apartments in two buildings on Emin Duraku street, Ferizaj ("Building 1", "Building 2", near the new city park). | None published beyond the street. | `torrehome.torre-ks.com` |

Group-level facts (Fetched from `torre-ks.com`):

- Positioning line: "Katër kompani. Një themel." (*Four companies. One foundation.*)
- Story: "Nisëm në 1999, si vëllezër të rinj që donim të ndërtonim shtëpi." (*We started in 1999, as young brothers who wanted to build houses.*) Commit `39daa78` ("honest 1999 founding story") and `84aeec8` (removed a fabricated 1950 date and a "four generations" claim) show this is the client-confirmed version. **Client-supplied.**
- Phone `+383 49 599 405` appears on every brand. Emails are `info@<brand>.torre-ks.com`. **Client-supplied** (commit `486daed` "real contact block"); mailbox existence/deliverability is **unverified**.
- Language: Albanian only (`<html lang="sq">`, `og:locale=sq_AL`).

**Previously removed by the client's own corrections:** a 1950 founding date, a "four generations" story. Anything of that kind that re-appears is a regression.

## 2. Property map (Fetched)

| URL | Status | What it is |
|---|---|---|
| `https://torre-ks.com/` (redirects to `www.torre-ks.com`) | 200 | Group hub: masthead, 2-line timeline, four numbered links to the brand sites, 3 legal links. **No header, no navigation, no photography, no contact details, no projects.** |
| `https://magfa.torre-ks.com/` | 200 | Single-page brand site: hero (stock photo), 3 "proof" facts, 6 services, 3 FAQs, contact footer. |
| `https://swisstech.torre-ks.com/` | 200 | Same template, dark theme. Services show **per-unit prices** (see §5). |
| `https://torre-umbria.torre-ks.com/` | 200 | Same template, dark theme, green accent. |
| `https://torrehome.torre-ks.com/` | 200 | Same template plus an 8-image gallery (renders, floor plans, parking). Services show **sale prices**. |
| `/politika-e-privatesise`, `/kushtet-e-sherbimit`, `/deklarata-e-qasshmerise` | 200 | Legal pages, served on **every** hostname (duplicate URLs across 5 hosts). All three carry `robots: noindex` — the privacy policy's own comment says it is "templated placeholder text pending legal review". |
| `/llms` (via `llms.torre-ks.com`) | 200 | HTML dump of all brand data **including every price, statistic and warranty claim** — i.e. unverified claims, formatted for AI crawlers. |
| `/preview/**` | 200 (noindex) | Internal design-comparison routes (4 variants × 4 brands + "minimal" concepts). Render the **testimonials** data (six named testimonials per brand). Publicly reachable. |
| `/api/og`, `/api/og/[brand]` | 200 | Dynamic Open Graph images (edge runtime). |
| `/api/revalidate` | POST, secret | CMS revalidation hook (Novus Pulse). |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/manifest.webmanifest` | 200 | See §6. |

Brand pages exist **only at `/` of each subdomain**. There are no sub-routes: no About, Services, Projects or Contact pages. "Contact" is an in-page footer anchor.

## 3. What currently works (preserve)

- **Honest copy discipline.** The hub copy and the hero/"proof" lines were already purged of the fabricated history. The `proofFacts` pattern ("three specific, brand-true facts") is the right instinct.
- **Hub composition.** Large mixed-weight headline, hairline rules, numbered list, generous whitespace. Directionally close to the Massive Forms / MEYERTON register (see `references.md`). Keep the *idea* (numbered divisions, hairlines, monumental type); the redesign upgrades execution, adds imagery and structure.
- **Token approach.** HSL-triplet CSS variables, fluid type scale (`--step-*`), 8 px spacing scale, motion tokens, `prefers-reduced-motion` handled in CSS. Reuse and tighten rather than replace.
- **Reveal hook.** `useReveal` uses `IntersectionObserver` and falls back to visible when unsupported — the correct no-JS-delay behaviour.
- **Security headers** in `next.config.js` (CSP, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`). Keep; update CSP for any approved analytics/form host.
- **Infrastructure:** Next.js App Router, Tailwind 3, Vercel, Vercel Speed Insights, `next/font`, per-brand OG images, JSON-LD scaffolding, `robots.ts`-style discipline. The brief says preserve infrastructure unless there is a clear reason; there is not.
- **Real assets:** the TORRE HOME renders and floor plans (the only project-specific imagery in the repo).

## 4. What is outdated, weak or missing

| Area | Finding | Evidence |
|---|---|---|
| **Structure** | Five one-screen sites; no real pages. Nothing for a visitor to *explore*: no company story page, no project pages, no dedicated contact page. | §2 |
| **Group credibility** | The hub, the most important URL, has no photograph, no project, no contact, no nav. A visitor cannot call or write from it. | Screenshot, `home-d` |
| **Brand fragmentation** | Four unrelated visual identities (blue/white, teal/dark, green/dark, navy/light) with four different font treatments. The group reads as four unrelated sites, not one established company. | `brands.ts` themes; screenshots |
| **Imagery** | MAGFA, SWISSTECH and TORRE DI UMBRIA heroes are **stock photographs** (code comments say so: "not a MAGFA project"). Only TORRE HOME has project imagery, and it is **3D renders**, not photographs of completed work. There are **no photographs of finished TORRE work, the factory, the team or the sites**. | `brands.ts`; image inspection |
| **Logos** | The "logos" are generic rounded-square icon tiles (house glyph, window glyph, skyline, two towers, gold "T"), not wordmarks. They read as placeholders. There is no group wordmark. | `public/logos/*` |
| **Contact** | The "form" and the chat-style `ContactIntake` both end in a `mailto:` link: nothing is sent, nothing is stored, no spam protection, fails for webmail users, no confirmation/error states. WhatsApp and `tel:` links are fine. | `ContactBlock.tsx`, `ContactIntake.tsx` |
| **Legal** | Privacy policy is templated placeholder text (noindexed). No cookie policy, no consent mechanism (none needed *today* only because no non-essential cookies are set; Vercel Speed Insights is currently the only third party). | `politika-e-privatesise/page.tsx` |
| **Unverified claims** | Prices, warranties, payment schedules, tax advice, "A+ energy class", "100% legalised", testimonials. Full register in [`../content.md`](../content.md). | §5 |
| **Performance** | Four font families load on every page (Inter, Outfit, Instrument Serif, JetBrains Mono). `socket.io-client` and `PulseSyncProvider` are present but not used by any page. | `layout.tsx`, `package.json`, grep |
| **Rendering** | `next build` reports **every route as dynamic (ƒ)**, including the static legal pages. Cause **not identified** (no `force-dynamic` found); investigate in Milestone 1 — affects caching and TTFB. | Baseline build |
| **Convention** | Next.js 16 warns that the `middleware` file convention is deprecated in favour of `proxy`. | Baseline build |
| **Content hidden until JS runs** | `.reveal` in `globals.css` sets `opacity: 0; transform: translateY(…)` unconditionally; only `useReveal` (IntersectionObserver) flips `data-visible="true"`. If JS fails, is blocked, or the observer never fires, the content stays invisible. The text is in the server HTML (crawlers see it) but users see nothing — and this is why below-the-fold sections were blank in the full-page screenshots. Violates "never delay access to content". | `globals.css` L118–129, `useReveal.ts` |
| **Duplicate content** | Legal pages (and any non-root path) resolve on all five hostnames with no cross-host canonical. | `middleware.ts` |

## 5. Claims on the live site that cannot be verified

(Summary — authoritative register is in `docs/content.md`.)

- **Prices published:** SWISSTECH `€85/m²`, `€120/m²`, `€350/copë`, `€15/m²`, `€30`; TORRE HOME `€55,000`, `€75,000`, `€80/muaj`. Commit history marks only "from €85/m²", the 10-year warranty and the factory address as real; everything else is **Unverified**.
- **Warranties:** MAGFA 5-year structure / 2-year interior; SWISSTECH 10/5/2 years; TORRE DI UMBRIA 10/5/2 years; "CE-certified German profile".
- **Process/finance:** MAGFA payment schedule (20/30/30/20 %); TORRE HOME "0 % advance with bank partners", "finance up to 80 % over 30 years".
- **Tax/legal statements** on TORRE HOME FAQ (0 % VAT first home / 8 % second purchase; notary and registry fees). These are regulated facts a visitor may act on — **highest risk**; do not republish without counsel.
- **Statistics:** "100 % projects legalised", "A+ energy class", "10–15 working days", "48 h offer", "6 cities".
- **Testimonials:** 24 named testimonials (6 × 4 brands) exist in `brands.ts` and render in `/preview/**`. No evidence they are real. They are filtered out of the production nav/sections but remain in a public route.

## 6. SEO state (Fetched + repo)

| Item | State | Notes |
|---|---|---|
| Titles / descriptions | Present, unique per brand page | Hub title "TORRE GROUP — Ndërtim & Dizajn" is generic; no page for long-tail topics. |
| Canonicals | Set on the four brand pages (self, absolute) | Hub has none; legal pages have none. |
| **Apex vs www** | Fetching `https://torre-ks.com` returned final URL `https://www.torre-ks.com/` (apex → www), yet `og:url`, JSON-LD, `metadataBase` and every hub entry in `sitemap.xml` use the **apex** `https://torre-ks.com`. | Every hub sitemap/canonical-style signal points at a URL that redirects. Pick one host, redirect the other, and make all signals agree (verify the Vercel domain settings — D-001). |
| Open Graph / Twitter | Present, `summary_large_image`, dynamic `/api/og*` | Alt text is just the brand name. |
| Headings | One `h1` per page (verified by script) | Fine, but pages are too thin to need more. |
| Image alt | 1 empty-alt image per brand page, 4 on the hub (verified by script) | Hub tiles: the four brand images need descriptive alt or explicit decorative treatment. |
| `robots.txt` | Allows all; per-bot repeated `Disallow: /preview`; blocks Ahrefs/Semrush/MJ12/DotBot/etc.; references sitemap | Functional. Verbose; the repeated per-bot blocks add nothing for compliant bots. Blocking SEO-tool crawlers also blocks the team's own audits. |
| `sitemap.xml` | Generated by `src/app/sitemap.ts`; lists the hub, four subdomain roots, legal pages and `llms.torre-ks.com` in **one file served from every hostname**; sets `priority`/`changefreq`; `lastModified = new Date()` | Google ignores `priority`/`changefreq`, and uses `lastmod` only when consistently accurate — a build-time "now" is not. Cross-host entries and noindexed pages (legal) should not be listed. |
| `llms.txt` | Present; points to `llms.torre-ks.com` | Content mixes verified and unverified claims. |
| JSON-LD | `Organization` (hub, emitted on every page) + `HomeAndConstructionBusiness` per brand | Type is wrong for a window manufacturer, a developer and an apartment seller; `areaServed: "Kosovo"` string only; no `BreadcrumbList`/`WebSite`/`Service`. |
| Multilingual | None | Albanian only; no hreflang needed today. |
| Indexed pages | Not checkable (no Search Console access, search egress blocked) | Ask the client for Search Console access (see `content.md`). |

## 7. Forms and integrations (Fetched + repo)

| Integration | State |
|---|---|
| Contact form (`ContactBlock`) | Client-only; on submit sets `window.location.href = mailto:…`. |
| Chat-style intake (`ContactIntake`) | Client-only state machine; ends in a `mailto:` link. |
| WhatsApp | `https://wa.me/<digits>` link — works. |
| Phone | `tel:` link — works. |
| Vercel Speed Insights | Installed (`@vercel/speed-insights`). Only third-party script. |
| Novus Pulse CMS | `src/lib/pulse.ts`, `PulseSyncProvider.tsx`, `/api/revalidate`, `socket.io-client` dependency, `package.json#novusPulse`. **No page consumes it.** Treat as dormant client infrastructure: preserve the revalidate route and the `package.json` tenant block; do not build on it without confirming it is wanted (D-009). |

No server-side validation, rate limiting or spam control exists because nothing is submitted server-side.

## 8. Mobile experience (Playwright, local build, 390 × 844 @2x)

- **No horizontal overflow** on any of the five pages (`scrollWidth == clientWidth == 390`).
- Hub and brand heroes stack correctly (text then image); brand navbar collapses to a hamburger.
- Hub list wraps long names ("TORRE DI / UMBRIA") acceptably.
- Not reviewed visually: sections below the hero on brand pages (reveal-on-scroll timing in the capture). Tap-target sizes, form usability and scroll performance on a real device are untested.

## 9. Technical baseline (Fetched)

```
node 22.23.4 · npm ci: 126 packages
next 16.2.12 (Turbopack) · react 18.3.1 · tailwindcss 3.4.x · framer-motion 11 (Navbar, OdometerDigits only)
npm run typecheck → clean
npm run build     → clean; "Generating static pages 32/32"; yet all app routes are reported ƒ (dynamic) in the route table
Warning: middleware → proxy convention deprecated
```

Dependencies present but unused by any page: `socket.io-client` (only imported by `PulseSyncProvider`, itself unused).

## 10. Opportunities

1. **Be the company first.** Today's hub explains the *structure* of the group but not its *credibility* (no work, no people, no place). The redesign's single biggest lever is giving the hub the substance Flintco-style corporate sites lead with — using only verified material and asking the client for the rest.
2. **One system, four divisions.** A single typographic/colour system with numbered divisions is more "established group" than four independent palettes.
3. **A real contact path.** Replace `mailto:` with a validated, server-handled form with success/error states, while keeping `tel:` and WhatsApp.
4. **Real pages.** Company, divisions, projects, contact — each a distinct SEO and AEO target.
5. **Trust through restraint.** Removing unverifiable numbers will make the site *more* credible, not less.
6. **Vertical integration, if true.** A window factory, a builder, a developer and a sales arm under one family is a genuine structural differentiator — but only if the client confirms how the companies work together (do MAGFA/TORRE DI UMBRIA buildings use SWISSTECH windows? are TORRE HOME apartments built by MAGFA?). **Unverified; asked in `content.md`.**
