# Audit of the Milestone 1 frontend

> **Status: COMPLETE.** Written after the owner's "Independent Redesign" directive (2026-11-07): *"You have largely reused the previous website's pages, layouts, components and visual structure. That is not a redesign."* This audit confirms that criticism, itemises it, and decides what survives.
> Evidence: the M1 code at commit `16dcca4`, the pre-redesign code at `f0e42a3`, and screenshots of both.

## 1. Verdict

The owner is right. M1 replaced fonts, colours, file names and the routing, and added tests — but the **visual structure of the site is the old site's structure**, re-skinned. I treated "preserve information" as "preserve the arrangement of the information", which the brief forbids. M1's engineering is sound and mostly stays; **its entire visual/compositional layer is discarded.**

## 2. Every reused old pattern (the honest list)

| # | Old pattern (pre-redesign `f0e42a3`) | Where it survived in M1 | Why it's not a redesign |
|---|---|---|---|
| 1 | Hub masthead: small mono eyebrow → huge bold headline → muted paragraph (old `page.tsx`) | `HomePage` hero: label + `.display` H1 + lead | Same three-step stack; only the typeface changed |
| 2 | **Four numbered ruled rows with company name, descriptor and "Vizito →"** (old hub list) | `DivisionIndex`: `01–04` rows, hairlines, "Shiko →" | A direct port. The single most reused element — it *is* the old homepage's body |
| 3 | Mono uppercase eyebrow labels with numerals (`§ 01`, `01 — …`) | `.label` + `01 — …` everywhere | Same device, same job |
| 4 | **Hairline-ruled lists as the universal container** (old `Proof` numbered facts, `ServicesBento` banded rows, FAQ rows) | Service list on every company page, contact rows | Cards were swapped for rules; the "list of rows" layout is unchanged |
| 5 | Company page = hero → proof → services → contact (old `BrandPage` order) | `DivisionPage`: eyebrow, H1, lead, CTA, ruled services, ruled areas, contact band | Same sequence and hierarchy for all four companies |
| 6 | Two-column "label left, content right" sections (old masthead grid 1.35fr / 1fr) | `grid-12` label column + content column everywhere | Same section grammar on every page |
| 7 | Dark closing contact block with heading + short text + call/WhatsApp buttons (old `CtaFooter` / `ContactBlock`) | `ContactBand` | Same component |
| 8 | Footer: description · links · contact · legal row (old `CtaFooter` footer) | `Footer` | Same four-part layout |
| 9 | Conventional bar: logo left, links, button right (old `Navbar`) | `Header` | Standard; nothing distinctive. The "companies" disclosure is a dropdown |
| 10 | Fade-up reveal on every block (old `.reveal`) | `Reveal` on every section | Same effect on the same elements |
| 11 | One look for all pages: the same eyebrow/H1/lead/rule rhythm on Home, Companies, Contact, each company | Every page | **No page has its own composition** — which the brief explicitly requires |
| 12 | Light-theme neutrals with a single dark band; restrained, "minimal" feel | `tokens.css` | Different hex values, same idea: pale page + one dark section |

Net: of 12 structural traits of the old site, **all 12** are present in M1. What changed was typography, colour values and per-company accent hues.

## 3. What genuinely is new in M1 (and survives)

These are engineering, not design, and the brief allows reusing "technically useful code" and "functional integrations":

| Keep | Reason |
|---|---|
| `src/proxy.ts`, `src/lib/i18n/*` (language routing, route registry, gated English) | Needed by any design; tested (29 unit tests) |
| `src/content/*` (typed facts, provenance tiers, `publish()` guard, withheld claims) | The anti-fabrication mechanism; design-independent |
| `src/lib/seo/*`, `sitemap.ts`, `global-not-found.tsx` mechanics, OG route plumbing | SEO/AEO layer; its visuals (OG artwork, 404 look) get redesigned |
| `next.config.js` redirects + security headers | Integration/infrastructure |
| Test infrastructure: Vitest, Playwright + axe, `check-contrast.mjs` (generalised), ESLint jsx-a11y, CI | Applies to any frontend; the *assertions about specific layouts* get rewritten |
| Mechanics inside `MobileNav` (native `<dialog>` focus trap), `Reveal` (progressive enhancement) | Behaviour is right; presentation is replaced |
| `scripts/`, Pulse code untouched (D-009) | Out of scope |

## 4. What is deleted or rewritten

| Item | Fate |
|---|---|
| `src/styles/tokens.css`, `tailwind.css` (base layer), `motion.css`, `tailwind.config.js` theme | **Rewritten** for the new system (`docs/design.md`) |
| `Header`, `CompaniesMenu`, `HeaderBorder`, `Wordmark` | **Replaced** by the floor rail + full-screen menu + SVG wordmark |
| `Footer`, `ContactBand`, `ContactPanel` | **Replaced** by the title-block footer and the bronze contact plane |
| `DivisionIndex` | **Deleted.** Replaced by the Four Towers section |
| `DivisionPage` | **Deleted.** Four distinct company pages (`docs/page-designs.md`) |
| `LegalPage` | Rewritten (quiet, new type) |
| All page files' markup under `src/app/[lang]/**` | **Rewritten**; routing/metadata exports kept |
| `Geist` / `Geist Mono` | **Replaced** by Anton + Instrument Sans (self-hosted) |
| E2E tests that assert M1-specific markup (e.g. `#companies-title`, `.nav-sheet`) | Rewritten against the new components |

## 5. Why it happened (so it doesn't repeat)

1. I started from the existing page as the baseline and asked "what is wrong with it?" instead of "what would a TORRE built from nothing look like?".
2. The reference analysis was **text-only** — the sandbox blocked the reference sites and image hosts, so I described structure, not visual decisions, and then designed from my description. That is the root cause. It is now fixed (see `references-visual.md`: all five references were viewed).
3. I optimised for restraint and verified facts (good), which, with too little photography, collapsed into typographic lists (bad).

## 6. Rules adopted for the rebuild

1. **No page may be composed of the M1 patterns above.** Each page gets its own composition (`docs/page-designs.md`).
2. **Each page has one signature device** that no other page uses.
3. **Design with the references open** — every screen cites which reference principle it translates, and what it deliberately does not copy.
4. **The owner reviews the direction (wireframes, concept board, design.md, page plan) before any rebuild.**
5. **Reuse code only after asking: does this serve the new design?**
