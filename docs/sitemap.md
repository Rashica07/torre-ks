# Sitemap — human-readable website architecture

> **Status: PROPOSED.** Reflects the owner's decisions of 2026-11-07: **D-001 one domain, four company sections** (each with its own design — D-019) and **D-002 Albanian + English** (English enabled only after human-approved translation — D-020). §6 lists the alternatives that were not chosen. Existing routes are marked *(exists)*; everything else is *(new)*.
> Last updated: 2026-11-07

## 1. Route tree (option B)

```
torre-ks.com/                              Home                      (exists as hub; rebuilt)
├── /kompania                              About / Company           (new)
├── /kompanite                             The four companies index  (new)
│   ├── /magfa                             MAGFA GROUP               (new route; content exists at magfa.torre-ks.com)
│   ├── /swisstech                         SWISSTECH                 (new route; content exists at swisstech.torre-ks.com)
│   ├── /torre-umbria                      TORRE DI UMBRIA           (new route; content exists at torre-umbria.torre-ks.com)
│   └── /torrehome                         TORRE HOME                (new route; content exists at torrehome.torre-ks.com)
├── /projektet                             Projects index            (new)
│   └── /projektet/torre-home-ferizaj      Project page              (new; only when content approved)
├── /kontakti                              Contact                   (new)
├── /politika-e-privatesise                Privacy policy            (exists; rewrite; indexable after counsel review)
├── /kushtet-e-sherbimit                   Terms                     (exists; rewrite)
├── /deklarata-e-qasshmerise               Accessibility statement   (exists; rewrite after M6)
├── /politika-e-cookies                    Cookie policy             (only if a non-essential cookie is introduced)
├── /robots.txt · /sitemap.xml             (exists / regenerated)
├── /llms.txt · /llms-full.txt             (exists / regenerated)
└── (custom 404)                           (exists; restyle)
```
URL slugs stay Albanian and ASCII (existing legal slugs set the precedent). The division URLs `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome` already exist as internal route names in the app.

**Not created (no real content; would be empty):** `/lajme` (news), `/karriera` (careers), `/partneret`, `/certifikimet`, `/industrite`, `/pyetje-te-shpeshta`, `/ekipi`. Each is re-evaluated when `content.md` §4 material arrives. Service *detail* pages (`/magfa/ndertim-shtepish` …) are deferred: today's service descriptions are generic and partly unverified, so they would not carry distinct information or search value.

## 2. Page purposes

| Route | Purpose (one job) | Primary action | Parent |
|---|---|---|---|
| `/` | Say what TORRE is and send each visitor to the right company or to contact | Contact / choose a company | — |
| `/kompania` | Establish identity: who, since when, how four companies fit together | Contact | `/` |
| `/kompanite` | Compare the four companies at a glance; entry point for "which one do I need?" | Open a company | `/` |
| `/magfa` | Convert home-building enquiries | Contact | `/kompanite` |
| `/swisstech` | Convert window/door/facade enquiries; show the factory | Request an offer | `/kompanite` |
| `/torre-umbria` | Convert developer/investor/land-owner enquiries | Contact | `/kompanite` |
| `/torrehome` | Convert apartment buyers | Enquire about an apartment | `/kompanite` |
| `/projektet` | Prove experience with real work | Open a project | `/` |
| `/projektet/<slug>` | Present one project fully | Contact about a similar project | `/projektet` |
| `/kontakti` | Convert visitors into enquiries | Submit form / call / WhatsApp | `/` |
| Legal | Meet legal obligations | — | `/` (footer) |

## 3. Navigation hierarchy

**Header (primary):** Kompania · Kompanitë (disclosure: MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA, TORRE HOME, "Të gjitha") · Projektet · Kontakti · [phone ≥ 1280 px] · **Na kontaktoni** (button → `/kontakti`).
**Footer:** Group description · Navigation (as above) · The four companies · Contact block (phone, WhatsApp, verified email, SWISSTECH factory address) · Legal (Privacy, Terms, Accessibility, Cookies if applicable).
**Breadcrumbs:** on `/kompanite/*` equivalents and project pages — `Kryefaqja › Kompanitë › MAGFA GROUP`; mirrored in JSON-LD `BreadcrumbList`. (The four division URLs are top-level paths but breadcrumb through `Kompanitë`.)
**Cross-links:** each division page links to its sibling divisions in a "Kompanitë e tjera të grupit" strip; project pages link to the involved company; contact form pre-selects the company when arriving from a division page (`?kompania=magfa`, validated server-side against an allow-list).

## 4. Indexability

| Route | Index | Canonical | In sitemap |
|---|---|---|---|
| `/`, `/kompania`, `/kompanite`, 4 divisions, `/projektet`, project pages, `/kontakti` | yes | self (absolute, `https://torre-ks.com/...`) | yes |
| Legal pages | yes **once** real text is approved (today `noindex`); low value | self | yes after approval |
| `/api/*` | n/a | — | no (robots disallows contact and revalidate endpoints) |
| 404 | `noindex` + HTTP 404 | — | no |
| Redirects | — | — | no |

## 5. Redirects (301, permanent)

| From | To |
|---|---|
| `https://www.torre-ks.com/*` | `https://torre-ks.com/*` *(host direction is D-001; today it is the opposite)* |
| `https://magfa.torre-ks.com/` (+ paths) | `https://torre-ks.com/magfa` |
| `https://swisstech.torre-ks.com/` | `https://torre-ks.com/swisstech` |
| `https://torre-umbria.torre-ks.com/` | `https://torre-ks.com/torre-umbria` |
| `https://torrehome.torre-ks.com/` | `https://torre-ks.com/torrehome` |
| `https://llms.torre-ks.com/`, `/llms` | `https://torre-ks.com/llms-full.txt` |
| `/preview/**` | 404 (410 if the platform allows) — routes removed (D-015) |

Subdomain DNS stays pointed at the project so the redirects keep working indefinitely.

## 6. Alternatives

- **Option A (keep subdomains) — NOT chosen (D-001):** the tree above is built **per host** (each division gets its own `/`, `/kompania`-style subpages as needed); the hub keeps `/`, `/kompania`, `/kompanite`, `/projektet`, `/kontakti`; each host has its own sitemap and canonical; cross-host links are plain links; the legal pages exist once (hub) with the other hosts linking to them.
- **Language variations (D-002: Albanian + English — decided):** the whole tree is mirrored under `/en/`; Albanian stays un-prefixed.

  | Albanian (default) | English |
  |---|---|
  | `/` | `/en` |
  | `/kompania` | `/en/about` |
  | `/kompanite` | `/en/companies` |
  | `/magfa`, `/swisstech`, `/torre-umbria`, `/torrehome` | `/en/magfa`, `/en/swisstech`, `/en/torre-umbria`, `/en/torrehome` (proper names unchanged) |
  | `/projektet`, `/projektet/torre-home-ferizaj` | `/en/projects`, `/en/projects/torre-home-ferizaj` |
  | `/kontakti` | `/en/contact` |
  | `/politika-e-privatesise`, `/kushtet-e-sherbimit`, `/deklarata-e-qasshmerise` | `/en/privacy-policy`, `/en/terms`, `/en/accessibility` |

  Every page declares `hreflang` `sq`, `en` and `x-default` (→ Albanian) in `<link>` tags and in the sitemap; self-referencing canonicals; a header language switcher made of real links to the equivalent page. **Gate (D-020):** until the English text is human-reviewed and approved, `/en/**` is built but `noindex`, absent from the sitemap/hreflang/nav, so nothing half-translated is exposed.

## 7. Routes removed

`/preview`, `/preview/[variant]/[brand]`, `/preview/minimal`, `/preview/minimal/[brand]` (testimonial/unverified content; D-015). `/llms` HTML page (replaced by `llms-full.txt`). Per-brand subdomain "one-page" sites (replaced by the division pages). `/api/og/[brand]` stays (generates OG images).
