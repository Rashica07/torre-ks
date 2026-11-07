# Decision log

> **Status: LIVE.** Open decisions block the milestones named beside them. "Assumed" decisions are minor/reversible: work proceeds on the stated assumption and the owner can overrule at any time.
> Last updated: 2026-11-07

Legend: **OPEN** = needs the client/owner · **ASSUMED** = proceeding on this unless told otherwise · **DECIDED** = confirmed.

| ID | Decision | Status | Blocks |
|---|---|---|---|
| D-001 | Site architecture: one domain vs. five hosts | **DECIDED** — one domain (2026-11-07) | — |
| D-002 | Languages | **DECIDED** — Albanian + English (2026-11-07); English text needs approval before publish | M1 (routing), M5 |
| D-003 | Redesign order: hub + system first, then divisions | ASSUMED | — |
| D-004 | Identity: shared system, accent colour, per-brand colours | **DECIDED** — keep per-company colours (2026-11-07) | — |
| D-005 | Wordmark / official logo files | **OPEN** (content request) | M2 |
| D-006 | Contact handling: provider, recipients, spam control | **OPEN** | M4 |
| D-007 | Policy for unverified claims | **DECIDED (interpreted)** — keep client-confirmed claims, verified by web research; withhold the rest | M2 |
| D-008 | Horizontal browsing approach | ASSUMED | M3 |
| D-009 | Novus Pulse CMS: keep dormant or build on it | **OPEN** (low urgency) | — |
| D-010 | Allow reference/CDN hosts for a pixel-level reference pass | **OPEN** (optional) | — |
| D-011 | Typeface | **DECIDED** — Geist + Geist Mono; glyph gate passed 2026-11-07 | — |
| D-012 | Preserve stack (Next.js 16, Tailwind 3, Vercel) | DONE in M1 (`middleware.ts` → `proxy.ts`; engines `>=20.9.0`) | — |
| D-013 | Animation libraries | `framer-motion` removed (M1); GSAP not installed (conditional, M3) | M3 |
| D-014 | Generated vs. static `sitemap.xml`, `robots.txt`, `llms*.txt` | ASSUMED | M5 |
| D-015 | Remove `/preview/**`, variants system and testimonial data from production | DONE in M1 (testimonials survive only as `unverified` entries in `claims.ts`, imported by nothing but a test) | — |
| D-016 | Analytics | ASSUMED | M5 |
| D-017 | Docs describe *proposed* state until implemented | DECIDED | — |
| D-019 | Division design freedom: one codebase, shared system, per-company theme | DECIDED (follows D-001 + D-004) | M1 |
| D-020 | English content process | ASSUMED | M3 |
| D-021 | 404 via Next 16 experimental `globalNotFound` | DECIDED (M1; see below) | — |
| D-022 | Permanent redirects are HTTP 308 | DECIDED (M1) | — |
| D-018 | Keep the existing `robots.txt` blocks on SEO-tool crawlers (Ahrefs, Semrush, MJ12, DotBot, Rogerbot, MegaIndex, BLEXBot) | ASSUMED (keep) | M5 |

---

## D-001 — Site architecture (DECIDED 2026-11-07)

> **Owner answer:** *"i would want each to be their own and they do get their own design but i wouldn't want you to rewrite 5 different pages so we could do one domain??"*
> **Recorded as:** option B — one domain, **one codebase**, four company sections at `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome`; each company keeps its **own design** within a shared component system (D-019). Old subdomains 301 to the new paths. Apex vs `www` direction still to confirm at cutover (all metadata already uses apex).

*Original analysis follows.*

**Context.** Today: five hostnames (`torre-ks.com` hub + four brand subdomains), each a one-screen page, tied together by `middleware.ts`. The brief calls for About / Services / Projects / Contact pages and strong SEO. The client's earlier work deliberately gave each brand its own subdomain ("rebuild site family per client spec", commit `486daed`), so this is a **brand-identity** decision, not a purely technical one.

| Option | What it means | Pros | Cons |
|---|---|---|---|
| **A — Keep subdomains** | Hub at `torre-ks.com`; each brand keeps `magfa.`/`swisstech.`/… and grows its own pages. | Brand independence; no URL changes. | Authority split across five hosts; four separate sitemaps/Search Console properties; 4× the pages to build and keep consistent; duplicate legal pages; cross-host linking; weaker group story. |
| **B — One domain, four divisions (recommended)** | Everything under `torre-ks.com`: `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome`, plus `/kompania`, `/projektet`, `/kontakti`. Old subdomains 301 to the matching path. | One site to rank, measure and maintain; group authority consolidates; one sitemap, one canonical host; consistent system; much simpler hreflang. | Changes URLs (mitigated by 301s); brands lose standalone-domain feel unless they keep logo/wordmark lockups. |
| C — Merge into one undifferentiated company | No brand pages. | Simplest. | **Rejected:** erases four real, separately-branded companies — a silent change of company identity. |

**Recommendation: B**, with each division keeping its name and logo lockup, and the old subdomains kept as 301s (not dropped) so existing links and any indexed URLs carry over. We cannot see Search Console, so we cannot say how many subdomain URLs are indexed today.

**Needs from owner:** pick A or B; confirm whether the apex or `www` host is preferred (today apex → www, but all metadata says apex).

## D-002 — Languages (DECIDED 2026-11-07: Albanian + English)

> **Owner answer:** Albanian + English. **Recorded as:** `sq` default (un-prefixed), `en` under `/en/`. The brief forbids machine-translated placeholders, so **no `/en` URL goes live until the English text is human-reviewed and approved by the owner** (D-020). Routing, hreflang, metadata and JSON-LD are built for both languages from M1.

*Original analysis follows.*

Current: Albanian only. Kosovo audiences also use English (diaspora, suppliers, investors) and Serbian.

- **Recommendation:** ship Albanian (`sq`) as the default at un-prefixed URLs; build routing so `/en/…` can be added later; add English **only when the client supplies or approves a real translation** (the brief forbids machine-translated placeholders). Do not assume Serbian.
- If English is approved: hreflang `sq`, `en`, `x-default`; translated nav, metadata, JSON-LD `inLanguage`; language switcher with links (not JS-only).

## D-003 — Redesign order (ASSUMED)

M1 foundation → M2 hub + shared system → M3 divisions → M4 projects/contact/legal → M5 SEO/AEO/GEO → M6 QA. Reversible.

## D-004 — Identity: system, accent, per-brand colour (DECIDED 2026-11-07: keep per-company colours)

> **Owner answer:** keep per-company colours (option 3). **Recorded as:** shared grid, type, components and neutrals; each company keeps its accent hue and its own page design (D-019). The group level (home, About, Contact, footer) uses neutrals with the gold of the existing `T` mark on dark only — no group hue accent. **Accessible per-company tokens were computed** — the original accents fail AA as text on one surface or the other (teal 2.89 : 1 and green 3.29 : 1 on warm white; blue 2.98 : 1 and navy 1.70 : 1 on charcoal); see `design.md` §2.7. The earlier red-accent recommendation is retired.

*Original analysis follows.*

**Findings.** The only group-level identity element is the `T` mark: gold `#c4954a` on charcoal `#14171a`. The four divisions use blue `#0072a7`, teal `#00a0a2`, green `#5f9169`, navy `#27496d`. The brief proposes charcoal + warm white + industrial red `#A34D3C` and says to investigate existing identity first.

**Contrast facts (computed, WCAG 2.x):** gold on warm-white `#F4F3EF` = **2.44 : 1** (fails even large text); gold on charcoal = 6.64 : 1. Red `#A34D3C` on warm-white = **5.13 : 1** (passes AA body); red on charcoal = 2.77 : 1 (fails — a lighter red `#D2806E` = 5.30 : 1 is needed on dark).

| Option | Description |
|---|---|
| **1 — Unified system + red accent (recommended)** | Charcoal + warm white (both already in the identity family) + restrained industrial red. Divisions share the system and are told apart by number and name, not colour. Red works for links, focus rings and text on light. |
| 2 — Unified system + gold accent | Continuity with the current `T` mark. Gold only on dark sections/fills (fails on light as text). Needs a darker bronze for light-background text. |
| 3 — Unified shell, per-division accent | One layout system but each division page keeps its own accent (blue/teal/green/navy). Most faithful to current brands; weakest "one established company" read, and four accents is the "random accent colours" the brief warns against. |

Neutral palette adjustments recommended regardless of option (the brief's candidates fail AA in places — see `design.md` §2): `muted` `#777A79` → `#5E6160` on light (3.90 → 5.64 : 1); add on-dark muted `#A3A6A4` (6.43 : 1).

## D-005 — Wordmark and logo files (OPEN content request)

The existing "logos" are generic icon tiles. Request official vector logos (SVG/AI/PDF) and any brand guidelines for the group and the four divisions. **Until supplied:** interim typographic wordmark "TORRE" in the chosen typeface for the header (clearly documented as interim); the existing tiles are retained only as favicons/app icons. We do not invent a logo.

## D-006 — Contact handling (OPEN, blocks M4)

Today nothing is submitted (`mailto:`). Proposed: `POST /api/contact` (Next.js route handler), server-side validation, honeypot + minimum-fill-time check + rate limit, accessible success/error states, privacy notice, delivery by email.

**Needs from owner:** which mailbox(es) receive enquiries (the per-brand `info@…` addresses are unverified); preferred sender service (assumption: Resend, which needs a verified sending domain and an API key set as an environment variable, never in the repo); whether leads should be stored (default: **no** — email only, minimum data); whether to add Cloudflare Turnstile (third-party script, needs CSP change) or rely on honeypot + rate limit (default).

## D-007 — Unverified claims (DECIDED 2026-11-07, interpreted)

> **Owner answer:** *"both and researched from web".* **Interpreted as:** keep what the client confirms **and** check it against independent web sources before publishing (this combines both options offered). A new evidence tier **Corroborated** (independent public source, e.g. the Kosovo business registry) is added. Web research was done on 2026-11-07 — results in `content.md` §1b. Anything neither client-confirmed-and-corroborated nor otherwise verified stays withheld, and tax/VAT/finance statements and testimonials stay out regardless. *If this interpretation is wrong, tell me and I'll adjust.*

*Original (strict) policy text follows.*

Default: **only publish what is Verified or Client-supplied.** Remove or replace: published prices (→ "Kërkoni ofertë"), warranty terms, payment schedules, tax/VAT/notary statements, "A+ energy class", "100 % legalised", turnaround promises, all testimonials. The client can re-approve any item via the checklist in `content.md` §4; approved items must also state who maintains them. Rationale: the client has already corrected fabricated history twice; prices/warranties/tax statements are claims a visitor will rely on.

## D-008 — Horizontal browsing (ASSUMED)

Native `overflow-x: auto` + `scroll-snap` rail (keyboard, touch, screen-reader safe, no hijack) is the default for the projects rail. A pinned vertical-to-horizontal GSAP variant is an opt-in prototype for `(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)`, judged against the native rail in M3; shipped only if it is clearly better. Never applied elsewhere.

## D-009 — Novus Pulse CMS (OPEN, low urgency)

`src/lib/pulse.ts`, `PulseSyncProvider.tsx`, `/api/revalidate`, `socket.io-client` and `package.json#novusPulse` form a CMS integration that **no page uses**. Default: leave the revalidate route and the `package.json` block untouched, do not build on it, and flag `socket.io-client` + `PulseSyncProvider` as removal candidates. Ask whether editors need a CMS (changes where content lives: code vs CMS).

## D-010 — Network access for pixel-level reference pass (OPEN, optional)

The sandbox blocks the reference hosts and image CDNs (see `research/README.md`). A pixel-level pass of MEYERTON, NIKKEN, Massive Forms, Cormack motion and Flintco visuals needs those hosts allowed for the session (an environment-settings change the owner approves). Without it the reference analysis stays text-based; no design decision currently depends on the missing evidence being *different*, but two (horizontal mechanism, editorial grid detail) would be sharper.

## D-011 — Typeface (ASSUMED, gated)

**Geist** (sans) + **Geist Mono** (labels/numerals), self-hosted via `next/font`. Replaces four families (Inter, Outfit, Instrument Serif, JetBrains Mono). **Gate:** a rendering test in M1 must show correct Albanian glyphs (ë, Ë, ç, Ç) at all weights; if it fails, fall back to Inter + IBM Plex Mono. Rejected: Neue Montreal (commercial licence), Manrope (rounder terminals soften the "exact" tone), IBM Plex Sans as primary (wide metrics; kept as fallback). See `design.md` §3.

## D-012 — Preserve stack (ASSUMED)

Keep Next.js 16 (App Router), Tailwind 3, Vercel, Speed Insights, the token approach. Rename `middleware.ts` → `proxy.ts` (deprecation). No React 19 upgrade unless a dependency requires it.

## D-013 — Animation libraries (ASSUMED)

CSS for transitions/reveals/hover; GSAP + ScrollTrigger (+ SplitText) only for the hero text mask reveal and the projects rail prototype; remove `framer-motion` (used by `Navbar` and `OdometerDigits` only) once those are rewritten in CSS. GSAP is free including commercial use (Fetched; re-check at install).

## D-014 — Generated vs static SEO files (ASSUMED)

The brief's structure lists `public/sitemap.xml`. A static copy would go stale and would collide with Next's generated `/sitemap.xml`. **Decision:** `app/sitemap.ts` generates `/sitemap.xml` from the same route registry that drives navigation; `public/robots.txt` stays static; `public/llms.txt` stays static (short); `llms-full.txt` is generated from content data at build so it cannot drift. `docs/architecture.md` §8.

## D-015 — Remove preview system and testimonial data (ASSUMED)

`/preview/**`, `design-variants.ts`, `minimal-concepts.ts` and the `testimonials` field render unverified content on public URLs. Remove from production at M1; keep git history as the archive.

## D-016 — Analytics (ASSUMED)

Vercel Web Analytics (cookieless) alongside the existing Speed Insights; no third-party cookies, so no consent banner needed for analytics. Search Console + Bing Webmaster Tools for search measurement. Revisit if the client wants GA4 (would require consent handling).

## D-018 — SEO-tool crawler blocks (ASSUMED: keep)

The current `robots.txt` blocks several third-party SEO-tool crawlers "to save bandwidth". That was an explicit prior choice with no ranking effect, so it is preserved. It also means the team's own backlink/audit tools (if any use those bots) cannot crawl the site; the owner can reverse this at any time.

## D-017 — Documentation status (DECIDED)

Every document in `docs/` starts with a status line. Until a feature exists the document says **PROPOSED**; as each milestone lands, its documents are updated to **IMPLEMENTED** with the commit reference. No document may describe an unimplemented feature as present.

## D-019 — Division design freedom (DECIDED, follows D-001 + D-004)

One Next.js codebase. Shared: grid, type, spacing, buttons, forms, header/footer, motion, accessibility rules. Per company: accent tokens, base surface (light or dark), hero composition and imagery, section order and layout (`design.md` §7). Implemented as a `data-division="magfa|swisstech|torre-umbria|torrehome"` attribute on the page wrapper that remaps a small token set (`design.md` §2.7) — never by copying components. This is how "each has its own design" and "don't rewrite five sites" are both satisfied.

## D-020 — English content process (ASSUMED)

English is drafted from the **approved** Albanian copy, then reviewed by a fluent human (the owner or a translator) before `/en` pages are enabled. Until approved, the `/en` routes are built but excluded from the sitemap, hreflang and navigation (and `noindex`), so a half-translated site never ships. Slugs: English slugs under `/en/` (`/en/about`, `/en/companies`, `/en/projects`, `/en/contact`).

## D-021 — 404 via `experimental.globalNotFound` (DECIDED, M1)

The root layout lives under `src/app/[lang]` (the `<html lang>` must follow the language). With that layout, `notFound()` from a catch-all page plus a nested `not-found.tsx` produced a server response with an **empty body** (`<html id="__next_error__">`, content only after client-side recovery) — verified in dev and in production. Next 16's `experimental.globalNotFound` with `src/app/global-not-found.tsx` renders a complete document server-side (real 404 status, header, footer, skip link, `h1`) and is covered by Playwright tests. Trade-offs: the flag is experimental (re-check on Next upgrades — a test fails if the 404 stops rendering the shell), and the 404 is Albanian-only for now.

## D-022 — Redirect status 308 (DECIDED, M1)

`permanent: true` in Next.js emits HTTP **308**. Google treats 301 and 308 as permanent redirects; no ranking difference is documented. Documents that said "301" now say "permanent (308)".

