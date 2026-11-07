# TORRE — Design system: "Fasada"

> **Status: PROPOSED — awaiting the owner's approval. Nothing here is implemented.** This **replaces the Milestone 1 visual layer completely** (see `research/m1-audit.md`): no M1 layout, component, spacing system or hierarchy is carried over. What *is* built and stays is engineering (routing, i18n, provenance guard, SEO helpers, tests) — see §12.
> Companion documents: [`page-designs.md`](./page-designs.md) (every page) · [`research/references-visual.md`](./research/references-visual.md) (what the references actually do) · [`design/wireframes/`](./design/wireframes) · [`design/concept/`](./design/concept) (hi-fi static board: open `index.html`; previews in `previews/`).
> Numbers marked *computed* were calculated (WCAG 2.x luminance formula, or Anton's real font metrics); everything else is a design proposal. Last updated: 2026-11-07.

## 1. The idea

**TORRE means tower.** The group builds things made of facades, windows, concrete and glass, and it owns one real, finished building. The site should therefore be **built like a facade**, not decorated like a brochure:

1. **The wordmark is a window.** The hero is the word TORRE at architectural scale, each letter an opening onto the real TORRE HOME building (Meyerton's full-width wordmark + Massive Forms' photograph-as-canvas, translated).
2. **The photograph is the page.** Plates run full-bleed; text sits *in* them on two strict vertical axes; framed like a printed sheet (Nikken).
3. **Planes, not cards.** Rhythm comes from flat planes of colour and material — ink, paper, concrete, one bronze plane, four company planes (Flintco) — separated by hard edges, never boxes with rounded corners.
4. **Drawing conventions as the only ornament.** Title blocks, sheet numbers (*Fleta 01/07*), floor numerals, schedules, elevations — things a construction company actually makes. Hairlines exist only inside these, not as a universal container.
5. **Floors.** The group is a building; the four companies are floors (G, 1–4). A vertical elevator-style rail is the signature navigation.
6. **One signal colour, once.** Anodised bronze (the group mark's gold — also the colour of aluminium window profiles) appears as one plane or marker per page (Meyerton's single yellow).
7. **Honest imagery.** Renders are captioned *Vizualizim*; stock is never shown as TORRE's work; facts come only from `content.md` §1.

Why this is not a re-skin: the old site (and M1) was a pale list of numbered rows under a mono eyebrow. Fasada shares **no layout, section order, component or hierarchy** with it.

### How each reference is translated (and what is not copied)

| Reference | Translated into | Deliberately not copied |
|---|---|---|
| **Meyerton** — full-width condensed wordmark with the photo in the letters; one yellow; stepped tags | SVG wordmark hero filled with the TORRE HOME photograph; bronze as the one signal | Yellow; steelwork imagery; the stepped tag (ours is angled) |
| **Massive Forms** — photograph as canvas, two axes, huge numerals, tiny labels, a human for scale | Full-bleed plates, text on two axes, monolith numerals for verified facts, tiny tracked captions | The all-black cold palette; brutalist content; the Helvetica clone |
| **Nikken** — aperture, plate frame, image-in-type, staggered image row | A rectilinear *window* aperture (not a circle), 36 px plate frame, an inline image inside the statement sentence, staggered native-scroll row | The circle; insights/news modules; the wide light type |
| **Flintco** — colour planes, rotated margin labels, angled caption plate | Planes as section rhythm, rotated labels, an angled caption tab, stat-block logic | Red; serif/uppercase-tracked headings; podcast/news |
| **Cormack** — panels of different kinds, caption plaques, scattered editorial placement, separately-designed mobile | Photo / type / colour panels, an overlapping caption tab, editorial About layout, mobile restacked not shrunk | **Lenis smooth scroll and a pinned page-wide track** (replaces native scroll — rejected), olive, slanted logo |

## 2. Colour (all *computed*)

The M1 neutrals (`#F4F3EF` / `#202326`) are retired. New surfaces:

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#15171A` | Hero, footer, dark planes |
| `--ink-2` | `#202326` | Raised dark panels |
| `--paper` | `#EFECE6` | Light plane |
| `--concrete` | `#CFCAC1` | Mid plane (towers section, schedules) |
| `--bronze` | `#C4954A` | The signal: one plane or marker per page; the group mark's colour |
| `--plane-magfa` | `#006A9E` | MAGFA plane |
| `--plane-swisstech` | `#006F71` | SWISSTECH plane |
| `--plane-umbria` | `#3A6845` | TORRE DI UMBRIA plane |
| `--plane-home` | `#27496D` | TORRE HOME plane |
| `--on-dark-magfa` / `-swisstech` / `-umbria` / `-home` | `#5BB0DC` / `#00A0A2` / `#6FA67A` / `#8FB0D6` | Company colour as text/lines on ink |

Company colours stay (D-004); each company *plane* uses the AA-corrected shade, and its on-dark shade is for text on ink.

**Contrast (computed):**

| Pair | Ratio | Use |
|---|---|---|
| ink on paper / on concrete | **15.23 / 11.01** | Body, headings |
| `#4B4F52` (muted) on paper / concrete | **7.01 / 5.07** | Captions, secondary text. *(M1's `#5E6160` is 3.84 on concrete — it fails; replaced)* |
| paper on ink / on ink-2 | **15.23 / 13.39** | Dark-plane text |
| `#A3A6A4` (muted-dark) on ink / ink-2 | **7.31 / 6.43** | Dark-plane secondary text |
| bronze on ink / ink-2 | **6.62 / 5.82** | Signal text/markers on dark |
| **ink on bronze** | **6.62** | Text on the bronze plane — **paper on bronze is 2.30 and is forbidden** |
| white on magfa / swisstech / umbria / home plane | **5.91 / 5.98 / 6.47 / 9.29** | Text on company planes |
| border-strong `#6C6F6D` on paper / concrete | **4.31 / 3.11** | Form and control boundaries (≥ 3) |
| border-strong-dark `#8A8D8B` on ink | **5.36** | Same, on dark |
| focus: ink on paper / bronze on ink / ink on bronze / white on company plane | **15.23 / 6.62 / 6.62 / 5.91+** | Focus ring (2 px, 3 px offset) per surface |

Decorative only (exempt): hairlines (`paper @ 28 %` on ink ≈ 2.1), ghost footer wordmark (`#23262A` on ink ≈ 1.2).

**Rules:** a page uses at most its own company-plane family (the Four Towers and the menu are the exceptions); the bronze plane appears at most once per page; no gradients except the single 0→55 % ink scrim under plate captions; no shadows; radius 0 (the MENU pill is the only rounded element).

## 3. Typography

**Anton** (display) + **Instrument Sans** (text, variable 400–700). Both are self-hosted from npm (`@fontsource/anton`, `@fontsource-variable/instrument-sans`) — no runtime Google request. **Glyph gate passed (computed with fontTools):** ë Ë ç Ç é É and all required Albanian/English characters are present in both families. Replaces Geist (M1).

| Role | Face | Spec |
|---|---|---|
| **Wordmark** | Anton | SVG text, uppercase, fitted by measurement (below), never live CSS text |
| H1 / H2 (display) | Anton, uppercase | H1 `clamp(3.5rem, 2rem + 8vw, 9.5rem)`, leading .9, tracking −.005 em; H2 `clamp(2.5rem, 1.5rem + 5vw, 6.5rem)`, leading .92 |
| Numerals (floors, monoliths, phone) | Anton | Sized from real metrics: `1999` is 1.813 em wide, the phone number is 6.494 em wide |
| Statement | Instrument Sans 500 | `clamp(2rem, 1rem + 5vw, 5.25rem)`, leading 1.02, tracking −.03 em |
| H3 / item titles | Instrument Sans 600 | 1.5–2 rem, leading 1.15 |
| Lead | Instrument Sans 400 | `clamp(1.125rem, 1rem + .6vw, 1.5rem)`, leading 1.35 |
| Body | Instrument Sans 400 | 1.0625 rem (17 px) / 1.55, measure ≤ 66 ch |
| Caption / label | Instrument Sans 600 | 12 px, tracking .14 em, uppercase |

**Anton metrics (computed):** cap height 0.859 em; `TORRE` 2.247 em wide; `TOR` 1.358 em; `RE` 0.888 em. Wordmark fit: *font-size = (container width − 4 × gap) ÷ 2.247* with gap 24–30 px, applied through SVG `textLength`; on mobile it restacks to `TOR / RE` (font-size ≈ 240 px at 354 px width).
Rules: Anton is never used below 24 px or for body text; uppercase only; no italics; Albanian hyphenation off; rotated text (`writing-mode`) is decorative or duplicated in accessible text, never the only carrier of meaning.

## 4. Grid and layout

| Token | Value |
|---|---|
| Rail | 56 px fixed on the left (≥ 1280 px); content margin 36 px; mobile margin 18 px |
| Grid | 12 columns ≥ 1024 (the facade *bays*), 8 at 768, 4 below; gutter 24 / 16 px |
| Plate | full-bleed, min-height `max(640px, 100svh)`, inset frame 36 px (18 px on mobile) |
| Section spacing | `clamp(72px, 9vw, 150px)` |
| Image ratios | Plate 16:10 desktop / 4:5 mobile; row images 4:5, 3:2, 21:9; plans natural |
| Alignment | Two axes: copy column at bays 1–4, display at bays 5–12 (Massive Forms); display type may bleed to the page edge |
| Section transitions | **Hard plane change** (ink → plate → paper → concrete → ink → paper → ink → bronze → ink); no fades, no borders |

**No cards.** Nothing is a rounded or boxed container. Tables and title blocks use 1 px hairlines because that is how drawings are drawn.

## 5. Signature components

Each exists in the hi-fi board (`design/concept/index.html`) and the wireframes (`design/wireframes/`).

1. **Wordmark window (hero).** `<h1>` is visually-hidden text ("TORRE Group — ndërtojmë në Kosovë që nga 1999"); the visible wordmark is an `aria-hidden` SVG with `<text fill="url(#pattern)">` over a pattern `<image>` (solid `#9AA3AD` fallback). **Requirement:** the image crop behind the letters must be high-key so letters read at ≥ 3:1 against ink (large display text) — verified per image by a build-time luminance test. Desktop one row; mobile two rows. Four hairline "bay" lines sit behind. A **title block** (5 cells) sits under it: latest project · founded · companies · floors · sheet.
2. **Floor rail.** `<nav aria-label="Katet">` with an `<ol>`: **G** (home), **1 MAGFA**, **2 SWISSTECH**, **3 TORRE DI UMBRIA**, **4 TORRE HOME**; the active stop is bronze; rotated "TORRE GROUP" and "1999" are decorative. Visible ≥ 1280 px; below that the same list lives in the menu. Accessible names contain the visible numeral (WCAG 2.5.3).
3. **Menu overlay.** Native `<dialog>` full-screen in ink: huge Anton links (the four floors with giant numerals, Projektet, Kompania, Kontakti), the phone at display size, WhatsApp, the factory address, the language switch when English is live. The top bar is only: small place line · phone · MENU pill.
4. **Plate.** Full-bleed photograph, 36 px inset frame, **angled caption tab** (clip-path) with category and name, optional status line. Expands from the letter-windows on scroll (CSS scroll-driven `clip-path`; static full-bleed fallback).
5. **Four Towers.** Four flat colour planes, bottom-aligned at different heights (72 / 84 / 78 / 94 %) — a skyline. Each is one link: Anton floor numeral, square arrow cell, rotated company name, category + one line of verified text. At ≥ 1024 px the focused/hovered tower widens (flex 1 → 1.6, 280 ms); on touch and mobile there is no expansion — four full-width slabs. *Replaces the old numbered list entirely.*
6. **Status elevation.** An SVG drawing of the two TORRE HOME buildings: Building 1 solid (complete), Building 2 solid with a hatched top (near completion) — **status supplied by the client (2026-11-07); no invented percentages**. `role="img"` with a text alternative.
7. **Staggered row.** Native `overflow-x: auto` + `scroll-snap`, images at different heights/offsets, tiny numbered captions; a labelled region with arrow-key scrolling and 44 px prev/next buttons; no pinned scroll.
8. **Monoliths.** Verified numbers at display scale on unequal columns (1.8 / 1 / 1 / 1.2 fr); static (no count-up).
9. **Bronze contact plane.** Heading and the **phone number as the headline** (Anton, tappable), ink on bronze; buttons ink fill / ink outline.
10. **Title-block footer.** A five-cell drawing title block (company, companies, contact, factory, legal) plus a ghost wordmark.
11. **Schedule table** (SWISSTECH, Companies page): a real `<table>` with caption, styled like a door/window schedule.
12. **Buttons.** Rectangular, 56 px, label + a **square arrow cell** (1 px divider). Primary = bronze on ink surfaces / ink on paper; secondary = outline. No radius.
13. **Enquiry sheet (Contact).** Form fields as title-block cells; labels above; errors in text + icon + rule.

## 6. Photography direction

Because the page *is* the photograph, imagery is the main deliverable the client must supply (`content.md` §5). Direction: **tall verticals and strong lines**; low angles on facades; **blue-hour/dusk** with lit windows; sunlit **high-key** crops for the wordmark; concrete and aluminium **details**; **people at work for scale** (Massive Forms' figure, Meyerton's welder) — SWISSTECH factory, MAGFA sites; one consistent grade (cool shadows, warm windows). Masters ≥ 3600 px wide, 3:2 plus 4:5 and 21:9 crops, delivered as AVIF/WebP with responsive sizes. Until real photography exists the TORRE HOME renders (captioned *Vizualizim*) carry the hero and plates; MAGFA, TORRE DI UMBRIA and SWISSTECH use **drawing graphics** (`page-designs.md`) — never stock photographs presented as their work.

## 7. Motion (authority: `animation.md`)

CSS only: the letters' photograph drifts slowly (scroll-driven `translateY` inside the SVG pattern); the plate expands from the letter-windows; towers widen on focus/hover; the rail marker follows the section (IntersectionObserver); the menu overlay slides. **No Lenis, no pinned page-wide track, no scroll hijack, no count-up numbers.** Everything is off under `prefers-reduced-motion`; hidden-until-JS states are forbidden. Scroll-driven CSS is a progressive enhancement (static fallback verified in Playwright).

## 8. Accessibility constraints specific to this direction

- **Image-filled wordmark:** real `<h1>` text for AT; SVG `aria-hidden`; luminance test for the crop; solid-fill fallback.
- **Rotated text:** never carries unique information; the same content exists in the DOM as normal text.
- **Rail and menu:** real `<nav>` + `<ol>`/links, keyboard-complete, focus visible on ink (bronze) and paper (ink); 44 px targets.
- **Towers:** each plane is one link with an accessible name equal to its visible text; expansion also on `:focus-within`; no hover-only content.
- **Bronze plane:** ink text only (paper on bronze = 2.30:1 fails).
- **Staggered row:** keyboard-scrollable region, plus buttons for non-drag operation (WCAG 2.5.7).
- Target remains WCAG 2.2 AA (`accessibility.md`); axe is re-run on every rebuilt page.

## 9. Responsive

Mobile is **designed** (wireframe `home-mobile.svg`): the wordmark restacks `TOR / RE`; the rail becomes the menu; towers become four 230 px slabs; status and monoliths reflow 2-up; the phone number splits over two lines at display size; the plate becomes 4:5. Test widths: 320 / 390 / 768 / 1024 / 1440 / 1920.

## 10. Anti-patterns

Rounded cards · numbered ruled lists as the main body (the M1/old-hub pattern) · mono eyebrow + big heading + lead as every page's opening · fade-up on everything · gradients · shadows · stock photography as TORRE's work · invented numbers or counters · pinned/smooth-scroll hijack · text over unscrimmed images · paper-on-bronze · more than one bronze plane per page · Anton below 24 px or for body text.

## 11. What each page must not look like

No page may be built from the patterns audited in `research/m1-audit.md` §2. Each page has its own composition and one signature device (`page-designs.md`).

## 12. Technical layer retained from M1

`src/proxy.ts`, `src/lib/i18n/*`, `src/content/*` (provenance guard), `src/lib/seo/*`, `sitemap.ts`, redirects and headers in `next.config.js`, `global-not-found` mechanics, the dialog and reveal *behaviours*, and Vitest + Playwright/axe + the contrast script + CI. Tokens, fonts, components and every page's markup are rebuilt.
