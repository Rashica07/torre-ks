# Implementation plan

> **Status (2026-11-07): Gate 0 PASSED — the owner approved "Fasada", Anton + Instrument Sans, the palette and the typographic wordmark.** M0 ✅, M1 engineering ✅, **M2 (shell + Home) ✅ and M3 (Companies, four company pages, About) ✅ IMPLEMENTED and merged (PR #9)**; OG images and per-company JSON-LD from M4/M5 are also done. Still open: the contact request form (M4, needs a delivery mailbox — D-006), projects index, English review/approval (D-020), Lighthouse/real-device pass (M6). Dates are intentionally absent; effort is given as S / M / L.
> Last updated: 2026-11-07

## 1. Objectives

1. Replace five thin one-screen sites with **one coherent, multi-page corporate presence** that explains TORRE Group and its four companies and makes contact effortless.
2. Communicate the company first (verified facts only), impress second (monumental type, grid, real imagery), convert third (real contact flow).
3. Be fast, accessible (designed and tested to WCAG 2.2 AA), search-engine optimised, and maintainable (typed content with provenance).
4. Preserve company identity and existing infrastructure; change them only with recorded decisions.

## 2. Existing website assessment (summary — full in `research/existing-site-audit.md`)

- **Is:** a Kosovo family group (1999, per the client) of four companies; Albanian-only today; five one-page sites on one Next.js deployment; legal pages are placeholders; contact ends in `mailto:`.
- **Works:** honest hub copy, token system, reveal hook idea, security headers, Vercel + Next stack.
- **Weak:** no real pages; hub has no nav/contact/imagery/projects; four unrelated identities; stock-photo heroes; placeholder icon logos; unverified prices/warranties/tax statements/testimonials in code and on `/llms`; content hidden until JS runs; four font families; every route dynamic; apex/www mismatch.
- **Baseline:** `tsc` clean, `next build` clean (Next 16.2.12, React 18.3.1). No Lighthouse baseline (network-blocked).

## 3. Proposed architecture (summary — full in `architecture.md`, `sitemap.md`)

One domain `torre-ks.com` (D-001, decided), Albanian + English (D-002), each company with its own design inside one shared system (D-004, D-019): `/`, `/kompania`, `/kompanite`, `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome`, `/projektet[/slug]`, `/kontakti`, legal. SSG everywhere; typed content with a verification-tier guard; hand-rolled validated contact endpoint; 301s from the old subdomains.

## 4. Page-by-page scope

| Page | Scope | Depends on | Milestone |
|---|---|---|---|
| Shell: header, footer, skip link, mobile nav, 404 | Tokens, type, layout primitives | D-001, D-004, D-005 | M1 |
| **Home** | 9 sections per `design.md` §6 | Copy approval; one image (TORRE HOME render interim) | M2 |
| **Kompania** | Editorial story + relationships between companies | Client answers (`content.md` §4.2–3) — **blocks full version**; ships a short factual version if not supplied | M3 |
| **Kompanite** | Index of four | — | M3 |
| **MAGFA, SWISSTECH, TORRE DI UMBRIA, TORRE HOME** | Four distinct compositions (`design.md` §7), services as scope lists, no unverified claims | Verified service wording; photography (interim stock labelled decorative or omitted) | M3 |
| Projects rail prototype (native vs pinned) | Decision per D-008 | — | M3 |
| **Projektet + project template + `torre-home-ferizaj`** | Index; template; one project | Client approval of renders, building status | M4 |
| **Kontakti** + `/api/contact` | Form, validation, states, spam control, email delivery | D-006 | M4 |
| **Legal ×3** | Rewrite with real text | Counsel/client | M4 (text) — publish when approved |
| SEO/AEO/GEO layer | Metadata, JSON-LD, sitemap, robots, llms, redirects, analytics | D-001, D-014, D-016 | M5 |
| QA, performance, a11y, report | `docs/qa-report.md` | Deployed preview | M6 |

Not built (no content): news, careers, partners, certifications, industries, team, standalone FAQ, per-service detail pages.

## 5. Milestones, deliverables, acceptance criteria

Every milestone ends with a **review gate**: a draft PR, a preview deployment (when possible), updated docs (status lines flipped from PROPOSED to IMPLEMENTED for what shipped), and a written list of what was tested and what was not. The next milestone does not start until the owner says so.

### M0 — Research and documentation ✅ (this PR)
Deliverables: `docs/*`, `docs/research/*`, README. **Accepted:** the owner replied "go on" after the review and answered D-001/002/004/007. D-001, D-002, D-004 and D-007 were answered on 2026-11-07 and are folded in.

### M1 — Foundation (effort M) ✅ engineering IMPLEMENTED; ⚠ visual layer SUPERSEDED (see Gate 0). The result block below is accurate for the engineering and for the old-pattern shell that is now to be replaced
- Close D-005/D-011; **glyph test** for Geist (ë ç, and English) → font decision final.
- Routing for `[lang]` (`sq` default, `en` gated), per-division `data-division` theming (D-019).
- Tokens (`styles/tokens.css`), Tailwind mapping, type scale, layout primitives, motion tokens, global reduced-motion rules.
- Header, footer, skip link, mobile nav; interim wordmark.
- Remove `/preview/**`, variants system, testimonials, `framer-motion`, `ContactIntake` (replaced in M4); rename `middleware.ts` → `proxy.ts`; investigate and fix all-routes-dynamic; fix the `.reveal` no-JS defect; raise `engines.node`.
- Set up tests (Vitest, Playwright, axe, ESLint jsx-a11y) and CI.

**Acceptance:** `npm run typecheck`, `lint`, `build` clean; shell pages render statically (route table shows ○/● not ƒ); axe: 0 serious/critical on the shell at 390 and 1440; keyboard-complete header/nav; Albanian glyph test passes; no horizontal scroll at 320 px; content visible with JS disabled.

**M1 result (2026-11-07, measured, not assumed):**

| Acceptance criterion | Result |
|---|---|
| `typecheck`, `lint`, `build` clean | ✅ all three clean (Next 16.2.12) |
| Shell pages render statically (○/● not ƒ) | ✅ every content route is SSG (●) and the 404 is static (○). The old all-dynamic output is gone — cause was the old root `not-found.tsx` calling `headers()`; removed with the old structure |
| axe: 0 serious/critical on the shell at 390 and 1440 | ✅ **0 violations of any severity** on all 17 pages + the 404, at both widths (36 runs, WCAG 2.0/2.1/2.2 A+AA rule set). Two real findings were fixed first (WCAG 2.5.3 Label-in-Name on the logo link and the division rows) |
| Keyboard-complete header/nav | ✅ scripted tests: skip link is the first Tab stop; companies disclosure opens/closes with Enter/Esc and returns focus; mobile menu is a modal `<dialog>` — focus never reaches the page behind it, Esc closes and restores focus |
| Albanian glyph test | ✅ **passed** — fontTools inspection of the built Geist and Geist Mono files: ë Ë ç Ç and all 92 required Albanian/English characters present (only the arrow glyphs → ← are absent; arrows are SVG icons) |
| No horizontal scroll at 320 px | ✅ 17/17 pages |
| Content visible with JS disabled | ✅ tested with JavaScript off; `.reveal` content is visible (the old defect is fixed) |
| Reduced motion | ✅ nothing hidden or transformed |
| Unit tests | ✅ 29 passing (contrast of every token pair in 14 scopes — 135 checks; provenance guard; route-registry ↔ app-directory parity; metadata uniqueness/length/canonical; proxy routing; sitemap) |
| End-to-end tests | ✅ 104 passing against the production build (~50 s) |

Delivered beyond the original list: per-company theming (`data-division`), `[lang]` routing with gated English, typed content with the provenance guard, generated sitemap, per-route metadata and Organization/WebSite JSON-LD, permanent redirects for the four old subdomains, CI workflow.

**Deviations from the plan (all recorded in `decisions.md`):** the redirects are **308**, not 301 (Next's `permanent: true`; Google treats both as permanent); 404s use Next 16's **experimental `globalNotFound`** because the root layout lives under `[lang]` (a plain `not-found.tsx` rendered an empty server shell — verified and replaced); `Kompania` and `Projektet` are not in the navigation yet because their pages arrive in M3/M4 (no dead links); the Pulse CMS code was left untouched pending D-009; the old privacy/terms/accessibility text is carried over unchanged (still placeholder, still `noindex`).

**Not done in M1 / known gaps:** no Lighthouse or real-device test (needs a deployed preview); the apex/`www` direction is unchanged (platform setting); the home hero has no image yet (M2); company pages are skeletons with the right accent and surface but not yet their distinct compositions (M3); contact is phone + WhatsApp only until the form ships (M4); English is built but gated and unreviewed.

### Gate 0 — Approve the new direction (NOW — nothing is rebuilt until this passes)

Ready for review: `research/m1-audit.md` (what was wrong), `research/references-visual.md` (the five references, actually viewed), `design.md` ("Fasada"), `page-designs.md` (every page), `design/wireframes/` (desktop + mobile), `design/concept/` (hi-fi static board + previews).
**Decisions requested from the owner:** (1) approve the concept; (2) approve **Anton + Instrument Sans** (D-025) and the **concrete / paper / ink / bronze** palette (D-026); (3) approve the **typographic TORRE wordmark** as the primary mark in place of the generic icon tile (D-005) — or supply official logos; (4) commit to supplying **photography** (`content.md` §5), since the design is photograph-led; (5) the standing content questions (`content.md` §4).

### M2 — Identity, shell and Home (effort L)
- Delete the M1 visual layer (`m1-audit.md` §4). New tokens (`design.md` §2), self-hosted Anton + Instrument Sans, SVG wordmark window with the build-time luminance test, floor rail, menu overlay, plate, Four Towers, status elevation, staggered row, monoliths, bronze contact plane, title-block footer — and the **Home page** in Albanian and (gated) English.
- Rewrite the e2e/axe assertions against the new components.

**Acceptance:** owner reviews the built Home **side by side with the concept board and the references** and signs off the *look* before M3; axe 0 violations (390/1440); keyboard-complete rail + menu; scroll-driven effects have a verified static fallback; no hidden-until-JS content; reduced-motion and JS-off pass; 320 px reflow; wordmark letters ≥ 3:1 against ink; hero image weight within budget (target ≤ 250 KB AVIF at 1600 w, to be measured); Lighthouse on a preview if reachable.

### M3 — Companies index, four company pages, About (effort L)
Companies (elevation + schedule), MAGFA ("house in section"), SWISSTECH ("window schedule"), TORRE DI UMBRIA ("layers"), TORRE HOME ("two buildings"), About ("1999 → sot"). **Acceptance:** each page passes the distinctness matrix (`page-designs.md` §0) — no shared composition; no unverified claim (build guard); each page reviewed against its wireframe.

### M4 — Projects, Contact (form), legal, 404, OG images (effort M–L)
As `page-designs.md` §6–§10; contact endpoint per `architecture.md` §7 and D-006. **Acceptance:** form tested end to end (success, validation, honeypot, rate limit, provider failure); stamped success state accessible; legal pages `noindex` until counsel approves.

### M5 — SEO, AEO, GEO, redirects, measurement (effort M)
Unchanged scope: metadata for every route, JSON-LD validation, generated sitemap/robots/llms, redirect checks, analytics, hreflang once English is approved. **Acceptance:** as before.

### M6 — Quality assurance and launch (effort M)
Unchanged: functional, SEO, performance, visual, accessibility passes; `docs/qa-report.md`; final summary.

## 6. Global acceptance criteria

| Area | Criterion |
|---|---|
| Truth | No `unverified` content in any output (build guard); renders labelled; no stock-as-own |
| Contact | Every CTA works; form works end to end; `tel:`/WhatsApp work |
| Links | 0 broken internal links; external links open safely (`rel="noopener"`) |
| SEO | §6 of `seo.md` all green; validators clean |
| Performance (targets) | Lab, mobile, throttled: LCP ≤ 2.5 s, CLS ≤ 0.1, TBT low (INP ≤ 200 ms in field); route JS small and measured; hero image ≤ ~200 KB AVIF at 1600 w *(target to be validated)*; ≤ 2 font files; no layout shifts from fonts/images |
| Accessibility | axe 0 serious/critical; manual keyboard + screen-reader pass; contrast per tokens; reduced-motion honoured |
| Responsive | 320–1920 px with no horizontal scroll or clipped content; touch targets ≥ 44 px |
| Security | Headers present; CSP valid; no secrets client-side; endpoint validated server-side |
| Docs | Every `docs/` file matches the shipped code; status lines updated |

## 7. Performance plan

LCP: one `priority` image per page, AVIF/WebP with `sizes`, intrinsic dimensions; no render-blocking third-party; SSG + CDN caching. INP: near-zero client JS, no heavy handlers; animation limited to transform/opacity/clip-path. CLS: reserved image/font space, no late-injected UI. Fonts: one superfamily, `display: swap`, adjusted fallbacks. Images: re-encode the existing JPEGs (largest are 330–360 KB) to AVIF/WebP at needed widths. JS: server components by default; GSAP (if any) lazy-loaded only where used. Verification: Lighthouse CI + Vercel Speed Insights real-user data; **no performance claim is made until measured**.

## 8. Testing strategy

| Layer | What | Tool |
|---|---|---|
| Static | Types, lint (incl. jsx-a11y), contrast of tokens | `tsc`, ESLint, extended `scripts/check-contrast.mjs` |
| Unit | Contact validator, JSON-LD builders (required/forbidden fields), `publish()` guard, sitemap/route registry parity, meta length/uniqueness | Vitest |
| Functional (e2e) | All routes 200 (and 404 true); nav at desktop/mobile; skip link; internal-link crawl; form success/error/honeypot/rate-limit (mock provider); redirects with host headers; language switch if shipped | Playwright |
| Accessibility | axe on every route × {390, 1440}; tab-through scripts; reduced-motion and no-JS runs; manual VoiceOver/NVDA | `@axe-core/playwright`, manual |
| SEO | Titles/descriptions/canonicals/OG; robots.txt rules; sitemap XML validity; JSON-LD validity; hreflang reciprocity if shipped | Scripts + Rich Results Test + Schema.org validator |
| Performance | Lab per template; real-user after launch | Lighthouse CI, PageSpeed Insights, Speed Insights |
| Visual | Screenshots at 320/390/768/1024/1440/1920 reviewed for overflow, crops, spacing, type, animation glitches; real iOS + Android device | Playwright screenshots + manual |
| Security | Header check; attempt injection/oversize/malformed bodies against `/api/contact`; secret scan of the build output | Scripts, manual |

Defects found are fixed, then the test is re-run — not merely listed.

## 9. Dependencies on the client (blocking items)

| Item | Blocks |
|---|---|
| ~~D-001, D-002, D-004, D-007~~ answered 2026-11-07 · D-005 logos · D-011 glyph test | M1 (D-005 interim wordmark exists) |
| Human review/approval of the English translation (D-020) | Enabling `/en` (M5) |
| Answers to `content.md` §4.14 (SWISSTECH phone, registrations, TORRE HOME status) | M2 copy |
| Official logos (D-005) | M2 polish (interim wordmark exists) |
| Photography; portfolio; building status (`content.md` §4) | Quality of M2–M4 (not their completion) |
| Claim re-approvals (`content.md` §2) | Any claim reappearing |
| Mailboxes + provider (D-006) | M4 |
| Legal text / counsel | M4 publish |
| Search Console + DNS access | M5 cutover |

## 10. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Too little verified content to make pages feel substantial | High | Medium | Design for restraint (strength of ref. C); omit rather than pad; ask for portfolio/photography early |
| Stock imagery or renders mistaken for TORRE work | Medium | High | Label renders; never present stock as work; request real photography |
| Subdomain consolidation harms current search presence | Medium | Medium | 301s, keep subdomain DNS, monitor Search Console, option A remains available |
| Albanian copy quality | Medium | High | Native review gate per release |
| Geist lacks a needed glyph (Albanian or English) | Low | Low | Glyph test in M1; Inter fallback |
| Pinned-rail interaction degrades UX/performance | Medium | Low | Native rail is default; pinned variant optional and gated |
| Legal pages unreviewed at launch | Medium | Medium | Ship minimal accurate text; keep `noindex` until counsel signs off |
| Unverified claims creep back via content edits | Medium | High | Typed `Tier` + build guard; claims register |
| Email deliverability / spam abuse of the form | Medium | Medium | Verified sending domain; honeypot + rate limit + monitoring |
| Reference analysis misses an important detail (network-blocked pixels) | Medium | Low | D-010 pixel pass if allowed |
| Scope creep into pages with no content | Medium | Medium | "Pages we will not create" list; re-evaluate only with real material |

## 11. Working agreements

Milestones are reviewed before moving on; consequential decisions go through `decisions.md`; minor ones are stated as assumptions and proceed; docs are updated in the same PR as the code they describe; nothing is declared complete before it is tested.


## Delivery log — M2/M3 (2026-11-07)

**Shipped:** new tokens and surfaces; self-hosted Anton + Instrument Sans; SVG wordmark window; floor rail; native-`<dialog>` MENU; Home; Companies (towers + schedule table); MAGFA (house in section, legend, city skyline); SWISSTECH (window types W1–W6 + schedule); TORRE DI UMBRIA (scope slabs, stated as illustration, not timeline); TORRE HOME (sticky status elevation, plates, floor-plan viewer); About (`/kompania`, 1999 → sot); Contact (phone, WhatsApp, factory address); 404 (`global-not-found`); restyled legal pages (per-brand mailboxes removed — unverified); redesigned OG images; Organization + BreadcrumbList JSON-LD per company.

**Verified:** 29 unit tests, 118 browser tests (axe 0 violations at 390/1440 on every page, keyboard + dialog focus, no-JS, reduced motion, 320 px reflow, redirects, SEO, wordmark luminance), 174 contrast role checks, build, lint, typecheck.

**Deviations:** the Cormack-style pinned track was not built (D-008 stays native scroll); scroll-driven plate-open and slab-in are CSS-only progressive enhancements (slabs move but never fade, because faded text fails contrast while animating); the footer ghost wordmark is an SVG so it is not text.

**Not done:** contact form and `/api/contact` (no verified mailbox/provider); projects index/template; English not approved; no Lighthouse or real-device run (needs a deployed preview); no photography beyond TORRE HOME renders.
