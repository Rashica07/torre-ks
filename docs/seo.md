# SEO, AEO and GEO strategy

> **Status: PROPOSED. No SEO work below is implemented yet.** Evidence: `research/resources.md` (Google documentation, verified 2026-11-07) and `research/existing-site-audit.md` §6. Assumes D-001 option B and Albanian-only launch (D-002); deltas in §9.
> Last updated: 2026-11-07

## 0. Honest constraints

- **No keyword volume data.** The SEO tool integrations failed to connect and Search Console access has not been granted. Section 2 therefore lists *intent themes in Albanian with no volumes, rankings or difficulty*. Validate with Search Console (queries, after launch) and Google Keyword Planner before investing in any single term. We will not report invented numbers.
- **No ranking, citation or AI-recommendation promises.** Google states there are "no additional technical requirements" for AI Overviews/AI Mode beyond being indexed and snippet-eligible. `llms.txt` is not mentioned in that documentation; we ship it as a low-cost courtesy and make no visibility claim.
- **Native-speaker review** is required for every Albanian title, description and heading (e.g. confirm "banesa" vs "apartamente" usage by region).

## 1. What Google says we should do (and what we therefore drop)

Do: unique descriptive titles; unique, accurate meta descriptions; descriptive anchor text; meaningful alt text; readable URLs; structured data that matches visible text; indexable, snippet-eligible pages; people-first content. Drop: keyword meta tags (unused), word-count targets (no minimum or maximum), heading-order tricks (irrelevant to ranking — keep correct order for accessibility only), "E-E-A-T optimisation" as a ranking tactic (not a ranking factor). Remove from the current sitemap: `priority`, `changefreq` (ignored) and the build-time `lastModified: now`.

## 2. Keyword and intent themes (Albanian) — no volumes

| Page | Searcher intent | Candidate phrases (to validate) |
|---|---|---|
| Home | Navigational + "who is this company" | `TORRE Group`, `torre-ks`, `grup ndërtimi Kosovë`, `ndërtim Ferizaj` |
| MAGFA | Commercial/local: hire a house builder | `ndërtim shtëpish Kosovë`, `firmë ndërtimi Prishtinë`, `ndërtues shtëpish Ferizaj`, `renovim shtëpie`, `dizajn arkitekturor shtëpi` |
| SWISSTECH | Commercial/product: buy windows | `dritare PVC Ferizaj`, `dritare alumini Kosovë`, `dyer alumini`, `fasada xhami`, `fabrikë dritaresh` |
| TORRE DI UMBRIA | B2B: find a developer/partner | `zhvillues ndërtesash Kosovë`, `ndërtesa rezidenciale`, `menaxhim projekti ndërtimor` |
| TORRE HOME | Transactional: buy an apartment | `banesa në shitje Ferizaj`, `apartamente Ferizaj`, `banesa rruga Emin Duraku` |
| Kompania | Trust/informational | `TORRE Group histori`, `kush është TORRE Group` |
| Kontakti | Navigational/transactional | `TORRE Group kontakt`, `TORRE Group telefon` |
| English (if approved) | Diaspora/foreign | `construction company Kosovo`, `PVC windows Kosovo`, `apartments for sale Ferizaj` |

Use these as *vocabulary for natural, specific copy* — never as repeated strings (the Cormack site's suburb-list repetition is the pattern we reject).

## 3. Titles and meta descriptions (drafts; lengths counted)

Targets: title ≤ ~60 characters, description ≤ ~155 (Google truncates by pixel width; these are guidelines). All unique; all pending native review and client approval of the facts they state.

| Route | Title (chars) | Description (chars) |
|---|---|---|
| `/` | TORRE Group — Ndërtim, dritare dhe banesa në Kosovë (51) | Grup familjar ndërtimi në Kosovë që nga 1999: shtëpi (MAGFA), dritare e fasada (SWISSTECH), zhvillim rezidencial (TORRE DI UMBRIA) dhe banesa (TORRE HOME). (155) |
| `/kompania` | Kompania — TORRE Group, ndërtues në Kosovë që nga 1999 (54) | Historia e TORRE Group: nga ndërtimi i shtëpive në 1999 te katër kompani me specializime të ndara — ndërtim, dritare, zhvillim dhe banesa. (138) |
| `/magfa` | MAGFA GROUP — Ndërtim shtëpish në Kosovë \| TORRE (48) | MAGFA GROUP ndërton shtëpi private dhe rezidenciale në Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë dhe Mitrovicë. Kërkoni ofertë ose konsultim. (142) |
| `/swisstech` | SWISSTECH — Dritare dhe fasada PVC e alumini, Ferizaj (53) | SWISSTECH prodhon dhe monton dritare e dyer PVC dhe alumini në Ferizaj, Kosovë. Fabrikë e hapur për vizitë me takim paraprak. (125) |
| `/torre-umbria` | TORRE DI UMBRIA — Zhvillim ndërtesash rezidenciale (50) | TORRE DI UMBRIA zhvillon ndërtesa rezidenciale në Kosovë, nga koncepti dhe lejet deri te dorëzimi. Pjesë e TORRE Group. (119) |
| `/torrehome` | TORRE HOME — Banesa në Ferizaj, rr. Emin Duraku (47) | TORRE HOME ndërton dy ndërtesa banimi në rrugën Emin Duraku, Ferizaj. Shihni pamjet, planimetritë dhe kontaktoni për banesat në shitje. (135) |
| `/projektet` | Projektet — TORRE Group (23) | Projektet e TORRE Group në Kosovë: ndërtesat e banimit TORRE HOME në Ferizaj dhe punë të tjera, me vend dhe pamje. (≈115) |
| `/projektet/torre-home-ferizaj` | TORRE HOME Ferizaj — projekt banimi, rr. Emin Duraku (52) | Projekti TORRE HOME në Ferizaj: dy ndërtesa banimi në rrugën Emin Duraku, pranë parkut të ri të qytetit. Pamje, planimetri dhe kontakt. (135) |
| `/kontakti` | Kontakti — TORRE Group, Ferizaj (31) | Kontaktoni TORRE Group: telefon +383 49 599 405, email dhe formular. Na tregoni projektin tuaj dhe ju përgjigjemi. (114) |

Notes: "Kërkoni ofertë ose konsultim" and "dorëzim" language depends on client confirmation of the free consultation (`content.md` §2 #9). Legal pages: `Politika e Privatësisë — TORRE Group` etc. Title template: `%s` (page-specific, already brand-bearing on division pages), with `| TORRE` only where room remains.

## 4. Headings, internal linking, canonicals

- **Headings:** one `h1` per page that states the page's subject plainly (`MAGFA GROUP — ndërtim shtëpish në Kosovë`), `h2` per section, `h3` per item. Correct order is for accessibility; Google says order does not matter for ranking.
- **Internal links:** descriptive anchors ("Shiko projektin TORRE HOME", not "më shumë"). Every page is reachable in ≤ 2 clicks from `/`. Home → each division and `/projektet`, `/kontakti`; each division → siblings, related project, `/kontakti?kompania=…`; project → its company; footer carries the full set. All navigation is real `<a href>` (crawlable without JS).
- **Canonical URLs:** every indexable page declares an absolute self-canonical on one host (apex proposed — D-001). Query-string variants (`?kompania=`) canonicalise to the clean URL. Redirects per `sitemap.md` §5. Fix the present apex-vs-www contradiction (`research/existing-site-audit.md` §6).
- **Duplicate legal pages** across subdomains disappear under option B.

## 5. Structured data (JSON-LD) — verified facts only

Rendered server-side, in the HTML, matching visible text (Google: "structured data matches the visible text on the page"). Each builder is unit-tested and validated with Google's Rich Results Test and the Schema.org validator in M6. **Never emitted:** `aggregateRating`, `review`, `offers`/prices, `openingHours`, certifications, `hasCredential`, fabricated `address`.

| Page | Types | Properties (all sourced from `content.md` §1) |
|---|---|---|
| Every page | `WebSite` (+ `Organization` reference via `@id`) | `name`, `url`, `inLanguage: "sq"`; **no `SearchAction`** (no site search) |
| Home, About | `Organization` (id `https://torre-ks.com/#org`) | `name: "TORRE Group"`, `url`, `logo` (only when an official logo exists), `foundingDate: "1999"`, `description`, `telephone: "+383 49 599 405"`, `areaServed` (`Country` Kosovo), `subOrganization` → the four division `@id`s |
| `/magfa` | `Organization` (+ `GeneralContractor` only if a physical business address is confirmed) | `legalName: "MAGFA SH.P.K."`, `parentOrganization`, `areaServed` = six `City` entries, `makesOffer`→`Service` (names only, no price) |
| `/swisstech` | `LocalBusiness` (has a confirmed address) — manufacturer; `address` = Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj, XK | `parentOrganization`, `telephone`; **no hours** (not provided) |
| `/torre-umbria` | `Organization` | `parentOrganization`, `Service` names |
| `/torrehome` | `Organization` | `parentOrganization`; project referenced via `subjectOf` |
| Project page | `ApartmentComplex`/`Place` for the building(s) + `WebPage` | `name`, `address` (street + Ferizaj, XK), `image` (renders captioned as such); **no `Offer`/price** |
| Depth ≥ 2 | `BreadcrumbList` | mirrors visible breadcrumbs |
| Q&A sections | `FAQPage` only for genuine, client-approved Q&As. *Rich-result eligibility for FAQ is limited (to be verified at implementation); it is still harmless and aids machine reading.* | |

`LocalBusiness` is used **only** for SWISSTECH (verified address); it is not applied to a business without a verified premises. The current `HomeAndConstructionBusiness` on all four brands is replaced because it misdescribes a manufacturer, a developer and a property seller.

## 6. Technical SEO checklist

- Unique title + description per route (above). Next.js Metadata API (`generateMetadata`), `metadataBase` set once.
- Canonicals; OG/Twitter cards with dynamic `/api/og` images (alt text = meaningful description, not just the brand name); `theme-color`.
- Semantic HTML; skip link; landmarks; descriptive alt on every image.
- Correct status codes: 200, 301 (redirects), real 404 with `noindex`, 500 handled; no soft-404s.
- Mobile-first responsive; viewport meta; no horizontal scroll; tap targets ≥ 44 px.
- Static (SSG) rendering for all content routes so HTML is complete without JS and cacheable at the edge (current build reports every route dynamic — cause to be found in M1).
- Performance per `planning.md` §7 (LCP/INP/CLS targets).
- HTTPS everywhere; HSTS at the platform level; security headers kept.
- No indexable duplicate hosts; redirects as in `sitemap.md` §5.

## 7. robots.txt, sitemap.xml, llms.txt

**robots.txt (proposed):**
```
User-agent: *
Allow: /
Disallow: /api/contact
Disallow: /api/revalidate

# Preserved from the current file (D-018): third-party SEO-tool crawlers
User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: MJ12bot
User-agent: DotBot
User-agent: Rogerbot
User-agent: MegaIndex.ru
User-agent: BLEXBot
Disallow: /

Sitemap: https://torre-ks.com/sitemap.xml
```
- Allows all legitimate crawling, including AI and search bots (the current explicit AI-bot allow-list is redundant with `User-agent: *` and is dropped — the effect is identical). The current blocks on AhrefsBot/SemrushBot/MJ12bot/DotBot/Rogerbot/MegaIndex/BLEXBot are an explicit prior client decision; keep or drop is **D-018** (assumed: keep; dropping would let the team's own audit tools crawl the site; no ranking effect either way).
- `/preview` rules disappear with the routes. CSS/JS/images are not blocked. `Disallow` is not security: the API endpoints enforce their own validation and rate limits. Pages that must not be indexed use `noindex`, never robots.
- Verification (M6): fetch `/robots.txt`, test representative URLs against the rules, confirm `Sitemap:` is absolute.

**sitemap.xml (generated, `app/sitemap.ts`):** canonical, indexable, absolute URLs on one host; `lastmod` only from real per-page content dates (a `updated` field in the content data); no `priority`/`changefreq`; excludes 404s, redirects, noindexed pages, API. If `/en` ships: each `<url>` carries `xhtml:link rel="alternate" hreflang` entries for every variant including itself plus `x-default`. One file is ample (limit is 50 MB / 50,000 URLs; we will have ~12). Validated with an XML parser and compared with the route registry in a test (build fails if they diverge).

**llms.txt (static, short) / llms-full.txt (generated):** follow the llmstxt.org layout (H1 name, blockquote summary, link lists). Content: who TORRE Group is, the four companies in one sentence each, official site URL, key page links, contact (phone; email once verified; SWISSTECH factory address), date generated, and a plain statement "Facts here mirror https://torre-ks.com; prices and warranty terms are not published — contact the company." `llms-full.txt` is built from the same typed content as the pages, so it cannot drift, and it **never exports `unverified` content** (build-time guard, `architecture.md` §5). No claim that these files influence AI search.

## 8. AEO and GEO

**AEO — answer real questions directly.** Each division page opens with a two-sentence plain answer to *what is this and where does it operate*, followed by question-led sections whose answers are specific and verifiable. We do not have the client's real customer questions; **request the 10 questions customers actually ask by phone/WhatsApp** (`content.md` §4). Provisional question set to validate, not to publish blindly:

- *Çfarë është TORRE Group dhe çfarë bën?* — Home/About (answerable now).
- *Në cilat qytete ndërton MAGFA?* — six cities (answerable now).
- *Ku ndodhet fabrika e SWISSTECH dhe a mund ta vizitoj?* — Rr. Engjëll Zefi, Bibaj, Ferizaj; by appointment (answerable now, pending reconfirmation).
- *Ku ndodhen ndërtesat e TORRE HOME?* — Emin Duraku street, Ferizaj (answerable now).
- *Si e kontaktoj TORRE Group?* — phone/WhatsApp/form (answerable now).
- Cost, timeline, warranty, financing, permit questions — **not answered until the client supplies verified answers** (these are the questions most likely to be asked and most dangerous to guess).

**GEO — be easy to discover, interpret and cite.** Consistent entity naming everywhere (`TORRE Group`, `MAGFA GROUP`, `SWISSTECH`, `TORRE DI UMBRIA`, `TORRE HOME` — same spelling, same capitalisation, same address and phone in the header, footer, contact page, JSON-LD, `llms.txt` and any directory listings); one factual definition sentence per entity reused verbatim; static, crawlable HTML; project pages with specifics (place, year when known, what was built); strong internal topical links; accurate, unique metadata. **Off-site (client actions, not ours to fabricate):** a verified Google Business Profile for the SWISSTECH factory and any other premises; consistent business listings; real press or partner mentions if they exist. We will not create reviews, testimonials, directory spam or backlinks.

## 9. Multilingual (conditional on D-002)

Albanian only → no hreflang. If English is approved: `/en/…` mirror, `hreflang` `sq`, `en`, `x-default` (Albanian) on every page and in the sitemap, self-referencing canonicals, each page lists itself **and** all variants and links reciprocally (Google: non-reciprocal annotations are ignored), human-translated metadata and JSON-LD `inLanguage`, no automatic language redirects (a visible switcher instead). Language codes ISO 639-1 (`sq`, `en`), regions only if needed.

## 10. Measurement and validation

| Tool | Use | Prerequisite |
|---|---|---|
| Google Search Console | Add the property for the final host (domain property covers all subdomains and the old redirects); submit `sitemap.xml`; monitor indexing, queries, Core Web Vitals report; Inspect URL on the 301'd subdomain roots | Client grants access / verifies DNS |
| Bing Webmaster Tools | Same; import from Search Console | Client |
| Vercel Web Analytics + Speed Insights | Cookieless traffic and real-user CWV (D-016) | Already on Vercel; CSP update |
| PageSpeed Insights / Lighthouse | Lab + field per template (home, division, project, contact) | Deployed preview URL |
| Rich Results Test, Schema.org validator | Every JSON-LD block | M5/M6 |
| Link checker + sitemap-vs-routes test | Internal/external links, redirect map | CI |
| Manual `site:`/URL Inspection after launch | Index coverage; compare before/after of the old subdomain URLs | After launch |

We will not publish or imply ranking or traffic results; baseline and post-launch numbers come only from these tools.

## 11. Risks

| Risk | Mitigation |
|---|---|
| Consolidating subdomains drops indexed URLs/rankings | 301 each subdomain root to its new path; keep subdomains resolving; submit sitemap; monitor in Search Console for 8–12 weeks |
| Thin pages (few verified facts) | Merge/omit rather than pad; add pages only when content exists |
| Unverified claims repeated by AI engines (the current `/llms` page publishes them) | Build-time guard; strict claims policy (D-007) |
| Albanian copy errors | Native review gate before each release |
