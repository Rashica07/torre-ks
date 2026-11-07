# Page-by-page design plan

> **Status: PROPOSED — awaiting the owner's approval.** Companion to [`design.md`](./design.md) ("Fasada"). Every page has its own purpose, composition and hierarchy; **none reuses an M1 pattern** (`research/m1-audit.md` §2). English mirrors every page under `/en` (gated until the translation is approved, D-020).
> Facts used are only those in `content.md` §1, including the client's update of 2026-11-07: **TORRE HOME Building 1 is completed; Building 2 is nearly complete.**
> Last updated: 2026-11-07.

## 0. Distinctness matrix

| Page | Signature device (used nowhere else) | Opening composition | Plane scheme | Own interaction |
|---|---|---|---|---|
| **Home** | Wordmark window (TORRE letters filled with the building) | Giant SVG wordmark on ink + title block | ink → plate → paper → concrete → ink → paper → ink → bronze | Letter-photo drift; plate expands from letters |
| **Companies** | Building elevation + window-style schedule table | Four full-height towers as an elevation, then a schedule | concrete + company planes → paper | Tower widens on focus/hover |
| **MAGFA** | Line-drawn house in section (hero artwork) | Blue plane, white section drawing, huge title | MAGFA plane → paper → ink | Drawing lines draw in on load |
| **SWISSTECH** | Window-elevation grid + "orari i dritareve" schedule | Dark grid of drawn windows, types W1–W6 | ink + teal | Hover/focus highlights a window type and its schedule row |
| **TORRE DI UMBRIA** | "Shtresat": six scope slabs stacked as a building section | Vertical stack revealing from the foundation up | ink + green | Slabs slide in on scroll |
| **TORRE HOME** | Sticky status elevation beside scrolling plates | Split: sticky left, plates right | paper + navy → ink | Plan viewer |
| **About (Kompania)** | Vertical tower timeline with scattered editorial blocks | Statement over timeline | paper + concrete | — |
| **Projects** | Staggered plate wall; project = "set of sheets" | Variable-size plates | ink + paper | Sheet counter (1/8) |
| **Contact** | "Fleta e kërkesës": enquiry as a title block | Phone at display size beside the sheet | bronze plane + ink sheet | Form states; stamped success |
| **Legal** | "Dokument": quiet, narrow, sticky contents | Plain paper | paper | — |
| **404** | "Ky kat nuk ekziston" | Anton line + four towers | ink | — |

## 1. Global shell

- **Top bar:** only a small place line (*TORRE Group · Ferizaj, Kosovë*), the phone, and a MENU pill — no link row, no CTA pair. On company pages the bar adopts that company's base surface.
- **Floor rail (≥ 1280 px):** G · 1 · 2 · 3 · 4, active stop in bronze (home: tracks the section in view; company pages: that floor).
- **Menu overlay:** full-screen ink; giant Anton links (four floors with numerals, Projektet, Kompania, Kontakti); phone at display size, WhatsApp, factory address, language switch (when English is live).
- **Footer:** the title-block footer with a ghost wordmark.
- **404:** see below. **Skip link** first in DOM.

## 2. Home — "Fasada"

Wireframes: `design/wireframes/home-desktop.svg`, `home-mobile.svg`. Hi-fi: `design/concept/index.html`.

| # | Section | Composition | Content (verified) |
|---|---|---|---|
| 00 | Wordmark window | SVG TORRE filled with the TORRE HOME photograph, on ink; one line + one sentence at left; title block under it | *Ndërtojmë në Kosovë që nga 1999.* · four-company sentence · latest project TORRE HOME · 1999 · 4 · floors · sheet 01/07 |
| 01 | Plate | Full-bleed night image, 36 px frame, angled caption tab | TORRE HOME, Ferizaj, rr. Emin Duraku · *Ndërtesa 1 e përfunduar. Ndërtesa 2 në përfundim.* · *Vizualizim* |
| 02 | Statement | Large sentence; second half grey; inline image in the sentence; three small columns | The founding story; Ferizaj facts; MAGFA's six cities |
| 03 | Four Towers | Skyline of four company planes, each one link | Name, category, one verified line each |
| 04 | Project status | Sticky title + SVG elevation of the two buildings + data list | Building 1 complete, Building 2 nearly; place; developer |
| 05 | Image row | Native scroll, staggered images | The 8 supplied TORRE HOME assets, captioned |
| 06 | Monoliths | Four numerals on unequal columns | 1999 · 4 · 6 · 2 |
| 07 | Contact plane | The one bronze plane; phone as the headline | Phone, WhatsApp |
| 08 | Footer | Title block | Contact, factory address, legal |

*Needs from the client:* high-key facade photograph for the letters (render used until then); real project photographs for the plate and row.

## 3. Companies (index)

**Signature:** a building elevation + a schedule.
Top: the four towers at full viewport height as a facade elevation (taller, with the *expanded* state shown by default for the first), each with its photograph or drawing graphic. Below: a **schedule table** in drawing style — *Kati · Kompania · Çfarë bën · Ku · Kontakti* — one row per company, each row a link. Closing: the bronze contact plane.
*Reference:* Flintco colour planes + the drawing convention. *Content:* one-sentence definitions, cities (MAGFA), factory address (SWISSTECH), Emin Duraku (TORRE HOME).

## 4. Company pages (four different pages)

All keep their company's plane/accent and base surface (D-004/D-019) but differ in composition.

### 4.1 MAGFA GROUP — "Shtëpia në prerje" (blue plane)
Hero: a full-bleed MAGFA-blue plane with a **large white line drawing of a house in section** (graphic, no claim of being a MAGFA project) and the title at display size. Then: services as a horizontal **legend** (six numbered callouts: *ndërtim shtëpish private · dizajn arkitekturor · renovim dhe rinovim · dizajn interiori · mbikëqyrje e ndërtimit · konsultim fillestar*); **six cities** as a giant typographic skyline (Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë, Mitrovicë) with bronze dots; a full-bleed photograph plate **only when MAGFA photography exists** (never stock); contact. *Needs:* MAGFA finished-house photography, registration details.

### 4.2 SWISSTECH — "Orari i dritareve" (ink + teal)
Hero: a dark **elevation of window types** drawn as a grid (W1–W6) mapped to the product list (*PVC windows · aluminium windows · PVC and aluminium doors · installation · facades and structural glazing · servicing*). Hover/focus on a window highlights its row in the **window schedule** below (a real table: *Tipi · Çfarë · Materiali*). Then the **factory plate**: address (Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj), map link, and — when supplied — craft photography of the factory floor (Meyerton's welder as the reference). CTA "Kërkoni ofertë" (phone/WhatsApp). **No prices, no "German profile/CE" claims** until documents exist. *Needs:* factory photographs, correct public phone (registry shows a different number), profile supplier documents.

### 4.3 TORRE DI UMBRIA — "Shtresat" (ink + green)
Hero: a **vertical stack of six slabs**, each a scope item, ordered as a building section from foundations up — *infrastrukturë dhe rrjete* at the base, *zhvillim ndërtesash* at the top (*hapësira të përbashkëta · leje dhe dokumentacion · arkitekturë dhe inxhinieri · menaxhim projekti* between). Slabs slide in on scroll. The order is a metaphor for the scope list, **not a process or timeline claim**. Beside it, two short paragraphs and the contact action. *Needs:* a photograph of a completed building by the developer; registration details; what it has developed (projects).

### 4.4 TORRE HOME — "Dy ndërtesa" (paper + navy)
Editorial **sticky split**: left column holds the status elevation and the facts (Building 1 completed, Building 2 nearly complete, Rruga Emin Duraku, Ferizaj); right column scrolls full-height plates (exteriors, duplex and penthouse renders, parking), each with the angled caption tab and *Vizualizim*. Then a **plan viewer** for the supplied floor plan (type A2, 132.39 m² as printed on the asset). Close with the enquiry action ("Pyesni për banesat në shitje"). **Availability, prices, bank terms are not published.** *Needs:* construction/completion photographs, availability policy, building names/numbers confirmation.

## 5. About — Kompania ("1999 → sot")
A **vertical tower timeline** (levels = milestones) on the left; on the right, small text blocks and images scattered on the grid at different sizes (Cormack's About). The story in the client's words (*Nisëm si vëllezër që ndërtonin shtëpi…*), how the four companies relate, the companies as small plaques, and **team** when supplied. **Honest constraint:** only 1999 and "today" are verified; the page ships with extra levels only as the client supplies milestones/people — it does not pad the timeline. *Needs:* milestones with years, founders/team (with consent), photographs, relationship between the companies.

## 6. Projects and project template
**Index:** a wall of plates at deliberately different sizes and offsets (Nikken staggered row, as a grid), each with an angled caption tab (*name · place · status*); company filter chips appear only when ≥ 3 projects exist; TORRE HOME first.
**Project page — "set of sheets":** a title block (place · status · companies · year/size where verified), then numbered plates (*Fleta 1/8*), a plan viewer, a related-company link, the enquiry action. No empty project pages are generated.

## 7. Contact — "Fleta e kërkesës"
Left: the phone number at display size (tappable), WhatsApp, the SWISSTECH factory address with a map link. Right: the **enquiry form built as a title block** — cells for name, phone or e-mail, company (allow-list), message; honesty line about data use; accessible errors; on success the sheet is replaced by an **"E pranuar" stamp** and a reassurance line. Server validation, honeypot, rate limit (D-006). Until the form ships (M4) the page shows only the phone/WhatsApp/address.

## 8. Legal — "Dokument"
Quiet paper plane, narrow measure, sticky contents list, small Anton title. Stays `noindex` until counsel approves the text.

## 9. 404 — "Ky kat nuk ekziston"
An Anton line, one sentence, the four towers as links, the phone. Server-rendered with a real 404 status.

## 10. Open Graph images
Redesigned to match: ink plane with the image-filled wordmark (home) / company plane with Anton name (companies).

## 11. Order of rebuild (once the direction is approved)
M2 identity + shell + Home → M3 Companies index + four company pages + About → M4 Projects + Contact (form) + legal + 404 → M5 SEO/AEO/GEO → M6 QA (`planning.md`).
