# Implementation plan

> **Status: PROPOSED — awaiting approval. Milestone 0 (research and documentation) is complete; no website code has been changed.** Dates are intentionally absent (capacity unknown); effort is given as S / M / L.
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
Deliverables: `docs/*`, `docs/research/*`, README. **Accepted when:** the owner approves this plan. D-001, D-002, D-004 and D-007 were answered on 2026-11-07 and are folded in.

### M1 — Foundation (effort M)
- Close D-005/D-011; **glyph test** for Geist (ë ç, and English) → font decision final.
- Routing for `[lang]` (`sq` default, `en` gated), per-division `data-division` theming (D-019).
- Tokens (`styles/tokens.css`), Tailwind mapping, type scale, layout primitives, motion tokens, global reduced-motion rules.
- Header, footer, skip link, mobile nav; interim wordmark.
- Remove `/preview/**`, variants system, testimonials, `framer-motion`, `ContactIntake` (replaced in M4); rename `middleware.ts` → `proxy.ts`; investigate and fix all-routes-dynamic; fix the `.reveal` no-JS defect; raise `engines.node`.
- Set up tests (Vitest, Playwright, axe, ESLint jsx-a11y) and CI.

**Acceptance:** `npm run typecheck`, `lint`, `build` clean; shell pages render statically (route table shows ○/● not ƒ); axe: 0 serious/critical on the shell at 390 and 1440; keyboard-complete header/nav; Albanian glyph test passes; no horizontal scroll at 320 px; content visible with JS disabled.

### M2 — Home and shared sections (effort L)
- All nine home sections; `DivisionIndex`, `FeaturedProject`, `FactsRow`, `ContactBand` (form is a stub only if D-006 is not closed — **no dead buttons**: the button either works or is replaced by `tel:`/WhatsApp until M4).
- Hero word-mask animation (CSS), reveals, row hover.

**Acceptance:** copy approved by client and native-reviewed; only §1 facts of `content.md` appear as facts; LCP image identified and `priority`; Lighthouse mobile on a preview: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 (targets — will be measured, not assumed); axe clean; reduced-motion and no-JS Playwright tests pass; visual check at 320/390/768/1024/1440/1920.

### M3 — Companies, About, rail decision (effort L)
- Four division pages with distinct compositions; `/kompanite`; `/kompania`.
- Native project rail built; pinned GSAP variant prototyped behind a flag and compared (D-008).

**Acceptance:** each page has a distinct hero/layout (no repeated hero + three-card pattern); no unverified claim rendered (build guard green); internal links all resolve; rail passes keyboard and screen-reader checks; if pinned variant ships, CLS 0 and INP unaffected at 4× CPU throttle.

### M4 — Projects, contact, legal (effort M–L)
- Project template and `torre-home-ferizaj`; `/projektet`.
- `/api/contact` with validation, honeypot, rate limit, email delivery; accessible success/error states; privacy notice.
- Legal pages rewritten (text from the client/counsel), 404 restyled.

**Acceptance:** form tested end to end on a preview (success, validation errors, honeypot hit, rate-limit hit, provider failure); no stack traces or secrets in any response; email arrives at the approved mailbox; privacy text approved; Playwright + axe pass on the form including error summary focus.

### M5 — SEO, AEO, GEO, redirects, measurement (effort M)
- Metadata for every route; JSON-LD builders + validation; `sitemap.ts`; `robots.txt`; `llms.txt` + generated `llms-full.txt`; redirect map; analytics; hreflang for `sq`/`en` (active once the English text is approved, D-020).
- Cutover checklist (`architecture.md` §11).

**Acceptance:** titles/descriptions unique (script); canonical absolute and self-referencing; sitemap equals route registry (test) and parses as valid XML; robots rules verified against sample URLs; JSON-LD passes Rich Results Test and Schema.org validator with zero errors and contains none of the forbidden properties; redirects return 301 to the right targets on a preview with host overrides; 404 returns 404.

### M6 — Quality assurance and launch (effort M)
- Full functional, SEO, performance, visual and accessibility test pass per §8; fix defects found; write `docs/qa-report.md` (what was tested, results, known gaps); final summary (changed, preserved, implemented, tested, remaining issues, missing information, deployment requirements).

**Acceptance:** all gates in §6 met or the exceptions are written down and accepted by the owner; docs reflect the shipped code.

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
