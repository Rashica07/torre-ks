# Content register

> **Status: PROPOSED — requirements and registers, not final copy.**
> Last updated: 2026-11-07. Evidence tiers: **Corroborated** (client-supplied *and* matched by an independent public source — added after D-007) · **Verified** (checked against a primary document) · **Client-supplied** (stated in repo history as confirmed by the client; not independently checked) · **Unverified** (no provenance) — see `research/README.md`.

Rule (non-negotiable): nothing is published at **Unverified** tier. Every Albanian text drafted by us needs a native-speaker review before launch.

## 1. Facts we can publish today

| Fact | Tier | Source | Where used |
|---|---|---|---|
| TORRE Group is a Kosovo-based family group of four companies | Client-supplied | live hub; commit `84aeec8` | Hub, About, JSON-LD |
| Started in 1999 by young brothers building houses | Client-supplied | commit `39daa78` ("honest 1999 founding story") | About, hero eyebrow, JSON-LD `foundingDate` |
| MAGFA GROUP (legal name MAGFA SH.P.K.) — private/residential home building, architectural design, renovation, interior design, site supervision, free initial consultation | Client-supplied | `brands.ts`, commit `486daed` | `/magfa` |
| MAGFA builds in Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë, Mitrovicë | Client-supplied | commit `f0e42a3` body ("6 real cities served") | `/magfa`, `areaServed` |
| SWISSTECH — PVC & aluminium windows/doors, facades, servicing; factory at Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj; factory open to visits by appointment | Client-supplied (address, factory) | commit "real factory address" | `/swisstech`, contact, `LocalBusiness` |
| SWISSTECH 10-year profile warranty | Client-supplied (stated "real" in commit message) — **confirm exact scope and wording** | commit message | `/swisstech` only if re-confirmed |
| TORRE DI UMBRIA — residential building development, project management, architecture & engineering, infrastructure, common areas, permits | Client-supplied (as service scope) | `brands.ts` | `/torre-umbria` |
| TORRE HOME — two buildings, Emin Duraku street, Ferizaj, near the new city park | Client-supplied | live site; image set | `/torrehome`, project page |
| **TORRE HOME status: Building 1 is completed; Building 2 is nearly complete** | **Client-supplied (2026-11-07, direct statement)** — consistent with undated third-party listings ("objekti në përfundim") | owner message | Home plate/status, TORRE HOME page, project page, JSON-LD project description |
| Phone `+383 49 599 405` | Client-supplied | commit `486daed` | Header CTA, contact, footer, JSON-LD |
| WhatsApp on the same number | Client-supplied (link exists) | `ContactBlock.tsx` | Contact |
| Emails `info@magfa.torre-ks.com` etc. | **Unverified deliverability** | `brands.ts` | Do not publish until D-006 confirms mailboxes |

## 1b. Independent corroboration — web research, 2026-11-07 (D-007)

Method: web search plus the Kosovo business registry as mirrored by **ARBK Open** (`arbk.org`, a third-party mirror of the public ARBK register; its pages are `noindex`). **The official ARBK portal was not queried; confirm any legal data against it before publishing.** Social-media and classified-ad results are *leads*, not proof. Personal names of owners/directors appear in the registry; they are deliberately **not** reproduced in this repository and must not go on the site without the person's consent.

| Finding | Source | Effect |
|---|---|---|
| **Torre Home SH.P.K.** exists: NUI 812247220, registered **11 Feb 2025**, status "Regjistruar", activity "construction of residential and non-residential buildings", 4 employees, address "Bibaj, Ferizaj", phone **+383 49 599 405** | ARBK Open | **Corroborates** the phone number and the existence of the company. Note the phone is the *TORRE HOME* company's number — the "group" number used on all four brands |
| **Swisstech KS SH.P.K.** exists: NUI 810058116, registered **21 Sep 2017**, activity NACE 2223 "manufacture of plastic builders' ware", 3 employees, address "Bibaj, Ferizaj", registry phone **044-717-985**; two owners listed | ARBK Open | **Corroborates** a plastics-for-construction manufacturer in Bibaj, Ferizaj (consistent with the factory address). **Phone differs** from the site's +383 49 599 405 |
| A "Swisstech KS Sh.p.k, Ferizaj" Facebook page lists a **third** phone (+383 49 461 600), PVC + aluminium doors/windows and mentions the aluminium-systems brand *Alumil* (a Greek manufacturer) | Facebook search excerpt | **Lead only.** Suggests different phone numbers in circulation and that the aluminium system may not be German. Do **not** say "German profile" or "CE" without the supplier's documents |
| TORRE HOME apartments are **advertised for sale by third parties**: "Objekti Torre Home, Rruga Emin Duraku", examples on floors 4, 6 and 7 (areas 134.5, 98.3, 104.5 m²), one listing "Investitori: TORRE HOME"; one listing says the building is "në përfundim" (nearing completion) — **undated** | Facebook group, TikTok, Instagram, MerrJep excerpts | **Corroborates** the project, address and that units are being sold; building has ≥ 7 floors. **Building status stays unconfirmed** (listings are undated) — ask the client |
| **MAGFA SH.P.K.**, **TORRE DI UMBRIA** and any **TORRE GROUP** entity: **no registry or independent hit found** in these searches | ARBK Open search; web search | Not evidence they don't exist — the search tools are weak. Ask the client for registration documents/NUI. Do not publish MAGFA's legal name beyond what the client confirms |
| The **1999** group history has **no independent trace**; the two registered entities found date from **2017** and **2025** | ARBK Open | Not a contradiction (a family business can predate its current legal entities) but it means "active since 1999" must be worded as the **family's** history and **never** attributed to each company. TORRE HOME as a company dates from 2025 |
| Kosovo tax authority (ATK) material lists VAT categories of **8 % and 18 %**; nothing found supports or refutes the site's "0 % VAT first home / 8 % second purchase" | atk-ks.org excerpt | The claim is **unconfirmed and probably oversimplified** — withheld; tax statements need a notary/accountant |
| No independent source found for: prices, warranties (10/5/2 yr), payment schedules, bank financing terms, energy class, "100 % legalised", turnaround times | web search | **Withheld** unless the client supplies documents |

**What this changes**

- **Publishable (Corroborated):** TORRE HOME apartments on Emin Duraku, Ferizaj; the group phone +383 49 599 405 (registered to Torre Home SH.P.K.); SWISSTECH as a Ferizaj-area PVC/construction-plastics manufacturer at Bibaj; SWISSTECH's registered name *Swisstech KS SH.P.K.* (to be shown as the legal name once the client confirms).
- **Needs a client answer before publishing:** SWISSTECH's correct public phone; whether the group number should keep appearing as the single contact line; the street address wording ("Rr. Engjëll Zefi, Bibaj" vs registry "Bibaj"); MAGFA's and TORRE DI UMBRIA's legal details; TORRE HOME building status.
- **JSON-LD:** `legalName` and `identifier` (NUI) only for entities the client confirms; never from our guess.

## 2. Claims register — everything else currently on the site

Handling under D-007 (strict). "Re-approve" means the client can send written confirmation + who maintains it.

| # | Claim | Where it appears today | Tier | Handling |
|---|---|---|---|---|
| 1 | SWISSTECH prices: PVC `€85/m²`, aluminium `€120/m²`, doors `€350/copë`, installation `€15/m²`, service `€30` | `swisstech`, `/llms`, preview | `€85/m²` Client-supplied; others Unverified | Remove prices; "Kërkoni ofertë". Re-approve with a price-validity statement if wanted. |
| 2 | TORRE HOME: apartments from `€55,000` / `€75,000`; property management from `€80/muaj` | `torrehome`, `/llms` | Unverified | Remove. |
| 3 | TORRE HOME: "0 % paradhënie me kredi, sipas bankave partnere"; "finance up to 80 % over 30 years" | `torrehome` | Unverified | Remove (financial promise; bank names/terms needed). |
| 4 | TORRE HOME FAQ: 0 % VAT first home / 8 % second purchase; notary €200–400; registry €30–50 | `torrehome` | Unverified — **regulated/tax facts** | Remove; replace with "ask us / consult your notary" unless counsel signs off. |
| 5 | TORRE HOME "A+ energy class"; "every apartment ≥1 parking space, 3-room units 2 spaces"; "24/7 security system" | `torrehome` | Unverified | Remove unless supported by documents (energy certificate; unit schedule). |
| 6 | MAGFA warranty 5-year structure / 2-year interior; payment schedule 20/30/30/20 %; "8–14 months for 150–200 m²" | `magfa` FAQ | Unverified | Remove. |
| 7 | SWISSTECH warranty 5-year mechanisms / 2-year installation; glass 6–8 yr; "CE-certified German profile"; "10–15 working days"; "48 h offer"; "7-day express" | `swisstech` | Unverified | Remove (CE and "German profile" need supplier certificates and profile-system name). |
| 8 | TORRE DI UMBRIA: 10/5/2-year warranties; "100 % projects legalised"; "5–8 floors in 18–30 months"; "free pre-feasibility study" | `torre-umbria` | Unverified | Remove. |
| 9 | "Konsultimi fillestar është falas" (MAGFA initial consultation free) | `magfa` | Presented as proof fact; no provenance | Keep **only** on client confirmation (cheap to confirm). |
| 10 | 24 named testimonials (6 per brand) | `brands.ts`, `/preview/**` | Unverified — appear fabricated | **Delete from the repo.** Never publish without named, consenting, real clients. |
| 11 | "Materiale premium", "Dorëzim në kohën e caktuar" (MAGFA hero) | `magfa` | Unverified marketing claim | Rephrase to describable facts or remove. |
| 12 | "Pjesë e TORRE GROUP, aktiv në ndërtim që nga 1999" repeated on each brand | all | Client-supplied; registry shows entities from **2017** (SWISSTECH) and **2025** (TORRE HOME) | Keep only as the **family/group** history. Never imply each company is 26 years old. Rephrase on division pages (e.g. "pjesë e TORRE Group"). |
| 13 | "Dy ndërtesa reale, jo një koncept" (TORRE HOME) | `torrehome` | Images are **3D renders**; status now supplied by the client: **Building 1 completed, Building 2 nearly complete** | Replace with the status statement; keep renders captioned *Vizualizim* until photographs of the finished building exist. **Ask for completion photographs of Building 1.** |

## 3. Page content requirements

Owner column: **C** = client supplies · **T** = we draft, client approves · **D** = developer.

| Page | Must contain | Source / status | Owner |
|---|---|---|---|
| **Home** | Statement of what TORRE is (4 companies, since 1999, Kosovo); division list; one verified project; credibility facts; contact CTA | Facts in §1; project = TORRE HOME renders | T |
| **Kompania (About)** | Founding story (brothers, 1999); how four companies relate; what each does; where they are | Needs: who founded, how the companies were established (years), whether they work together, certificates, team (if any) | **C** |
| **MAGFA / SWISSTECH / TORRE DI UMBRIA / TORRE HOME** | What it does (in plain Albanian), services list, where it operates, contact | Service lists exist (unverified descriptions — rewrite to what is verifiable) | T + C review |
| **Projektet** | Real projects with name, place, year, category, description, photos | **None verified except TORRE HOME (renders).** Need portfolio — see §4 | **C** |
| **Kontakti** | Phone, WhatsApp, verified email, address(es), form, privacy notice, business details (legal name, business number if the client wants it public) | Phone Client-supplied; email unverified; addresses: only SWISSTECH factory | C + D |
| **Legal** | Real privacy policy, terms, accessibility statement, cookie policy if needed | Currently templated placeholder (noindex) | C + counsel |
| **404** | Helpful links | Exists; restyle | D |

Pages we will **not** create now (no content, would be empty): News, Careers, Partners, Certifications, Industries, standalone FAQ, Team. Each is re-evaluated when the client supplies real material (§4).

## 4. Missing content — requests to the client (checklist)

**Company**
1. [ ] Official logo files (vector) for TORRE Group and the four companies; brand guidelines if any. *(D-005)*
2. [ ] Who founded the group; year each company was established; legal names and business registration numbers (publish only if wanted).
3. [ ] How the four companies relate: do MAGFA / TORRE DI UMBRIA / TORRE HOME buildings use SWISSTECH windows? Who builds TORRE HOME? *(Only then can we say "vertically integrated".)*
4. [ ] Registered office / head-office address; opening hours (optional); official email addresses and who answers them. *(D-006)*
5. [ ] Certifications, memberships, licences, insurance, awards — with documents. (None are published; none will be invented.)
6. [ ] Team: names, roles, photos (optional, with consent).

**Work**
7. [ ] Portfolio: for each project — name, location, year, category, role (built/developed/supplied), size, photos (own photography, with permission to publish), brief description. Completed work only, or clearly labelled "in progress".
8. [x] TORRE HOME status — **answered 2026-11-07: Building 1 completed, Building 2 nearly complete.** [ ] Still needed: photographs of the finished Building 1; which renders are final; availability/pricing policy (publish or enquire); building names/numbers; expected completion of Building 2 (only if the client wants it shown).
9. [ ] Photography of: finished houses (MAGFA), the SWISSTECH factory and installations, completed buildings (TORRE DI UMBRIA), the team and sites. **Current heroes for MAGFA, SWISSTECH, TORRE DI UMBRIA are stock photos.**

**Claims (tick to re-approve, with written source and an owner who keeps it current)**
10. [ ] Prices (which, valid until when) · [ ] Warranties (scope, duration, document) · [ ] "CE / German profile" (certificate, supplier) · [ ] Payment schedule · [ ] Free consultation · [ ] Bank financing terms (which banks) · [ ] Energy class (certificate) · [ ] Parking/security spec.

**Legal / technical**
11. [ ] Legal review of privacy policy, terms, cookie approach (Kosovo Law 06/L-082; GDPR relevance).
12. [ ] Google Search Console and Bing Webmaster access (indexed pages, queries) and the domain registrar/DNS access for apex/www and subdomain redirects.
13. [ ] Decision D-006 (contact handling). D-001, D-002, D-004, D-007 were answered on 2026-11-07 (see `decisions.md`).
14. [ ] **From the web research (§1b):** which phone number should each company publish (SWISSTECH's registry number is different)? Registration documents / NUI for MAGFA, TORRE DI UMBRIA and any TORRE GROUP entity. (TORRE HOME status answered — see item 8.) Who supplies SWISSTECH's PVC and aluminium profiles (brand, certificates).
15. [ ] Someone fluent in English to review the English translation (D-020).

## 5. Image requirements

**Inventory (Fetched from `public/images`):**

| File | Size | Nature | Status |
|---|---|---|---|
| `magfa/hero.jpg` | 1900×1267 | Stock — worker on timber frame | Replace with MAGFA's own work; usable as interim only if labelled decorative |
| `swisstech/hero.jpg` | 1900×1425 | Stock — mirrored-glass facade | Replace with factory/installation photography |
| `torre-umbria/hero.jpg` | 1267×1900 (portrait) | Stock — white residential block | Replace with the developer's own building |
| `torrehome/hero-day.jpg` | 1512×1440 | 3D render, building by day | Usable as project imagery, **labelled as render** |
| `torrehome/exterior-night.jpg`, `exterior-alt.jpg` | 1800×1327 | 3D renders | Same |
| `torrehome/duplex-lower.jpg`, `duplex-upper.jpg`, `penthouse-layout.jpg` | 1600×1067 | 3D interior/plan renders | Same |
| `torrehome/floorplan-a2.jpg` | 1096×775 | Floor plan, type A2, 132.39 m² | Use as a plan figure; verify area |
| `torrehome/parking.jpg` | 1600×1067 | Parking visual (render/photo unconfirmed) | Confirm nature before use |
| `torrehome/terrace-detail.jpg` | 1123×756 | Composite marketing slide with baked-in text | Not usable as photography |

**Specification for new photography:** landscape 3:2 masters ≥ 3000 px wide (hero, project), plus portrait 4:5 crops; sRGB; no baked-in text; we deliver AVIF/WebP with responsive `srcset`; every image has meaningful alt text written by us from the caption the client gives.

**Shot list for the Fasada direction (the design is photograph-led; this is the main deliverable it needs):** (a) **TORRE HOME Building 1, finished** — a sunlit high-key facade crop (used *inside the TORRE wordmark*), a blue-hour/dusk view with lit windows, details of balconies/cladding/entrance, a street-level view with a person for scale; Building 2 progress; (b) **SWISSTECH** — factory floor with people at work (Meyerton's welder as the reference), a profile/frame detail, windows installed in a facade, the exterior in Bibaj; (c) **MAGFA** — finished houses (exterior + one interior each), a site with people at work; (d) **TORRE DI UMBRIA** — a completed building exterior and a site; (e) **founders/team** (optional, with consent). All 3:2 masters ≥ 3600 px plus 4:5 and 21:9 crops.

**Earlier minimum shot list (superseded by the above):** MAGFA — 3 finished houses exterior + 1 interior each, 1 construction-stage; SWISSTECH — factory floor, profile cutting/welding, installed window in situ, showroom if any; TORRE DI UMBRIA — completed building exterior, site progress; TORRE HOME — construction progress photos of both buildings (to sit beside the renders); Group — founders/team portrait (optional).

## 6. Content ownership

| Content | Owner | Update trigger |
|---|---|---|
| Facts in §1, claims in §2 | Client (named person TBD) | Any change of price/warranty/address/phone |
| Albanian copy | Drafted by developer, approved by client; native review | Each release |
| Project pages | Client supplies material, developer builds | New completed project |
| Legal pages | Client + counsel | Law/practice change; at least yearly |
| `llms-full.txt`, sitemap, JSON-LD | Generated from content data (cannot drift) | Automatic on build |

## 7. Translation requirements

Albanian (`sq`) is the source language. **English is approved as a launch language (D-002), but** it must be a human-reviewed translation approved by the client before it ships (D-020): nav, metadata, headings, body, alt text, form labels/errors, legal pages. Slugs: Albanian for `sq`; English slugs under `/en/`. No machine-translated placeholders at any point.

## 8. Voice

Plain, specific, concrete. Say what the company does and where. No superlatives that cannot be demonstrated ("premium", "world-class"). Numbers only from §1. Short sentences. Albanian copy avoids calques from English marketing language.
