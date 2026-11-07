# TORRE — Design system

> **Status: PROPOSED. Nothing in this document is implemented yet.** It becomes authoritative for implementers once the open items in `decisions.md` that it depends on (D-001, D-004, D-005, D-011) are closed. Every number below that is a contrast ratio was computed (WCAG 2.x relative-luminance formula); typography and spacing values are design proposals, not measurements.
> Last updated: 2026-11-07 · Evidence for the references: `docs/research/references.md`

## 1. Brand direction

**TORRE is a Kosovo family group of four building-sector companies, active since 1999.** The site must read as an *established industrial and architectural group* — confident, exact, quiet — and **communicate the company first, impress second, make contact effortless.**

| Principle | Meaning in practice |
|---|---|
| **Say what we do** | The first screen states, in plain Albanian, what TORRE is and does. No slogan that could belong to any company. |
| **Monumental, then quiet** | Type scale and empty space do the impressing (ref. C). Few elements per screen. |
| **One system** | One grid, one type system, one palette, one component set for the group and the four divisions (ref. E consistency). |
| **Honest imagery** | Real work only. Renders are labelled as renders. Stock photography is never presented as TORRE's work. |
| **Facts, not claims** | Only verified facts appear as numbers, warranties, prices (see `content.md`). |
| **Contact is always one step away** | Persistent header CTA, `tel:`/WhatsApp everywhere, a dedicated contact page, a closing contact section on every page. |

Sources of influence: **Flintco** for communication order and discipline (A) · **Massive Forms** for scale/grid/negative space (C) · **MEYERTON** for industrial rigour (D) · **NIKKEN** for editorial consistency (E) · **Cormack** for curated project browsing (B). Original contribution: the **four numbered divisions as a system**.

## 2. Colour

### 2.1 Findings that shaped the palette

- The brief's candidate palette is a good base but **fails WCAG AA in three places** (computed): `#777A79` muted text on `#F4F3EF` = **3.90 : 1** (needs 4.5); on `#E9E8E3` = **3.53 : 1**; accent `#A34D3C` on charcoal `#202326` = **2.77 : 1**.
- The brief's border `#D8D7D1` on `#F4F3EF` = 1.30 : 1 — fine for **decorative** hairlines, **not** for form-control boundaries (WCAG 1.4.11 needs 3 : 1).
- The current group mark is gold `#c4954a` on charcoal `#14171a`. Gold on warm white = 2.44 : 1 (unusable for text on light). Accent choice is **D-004 (open)**; tokens below assume **Option 1 (red)**; Option 2 (gold) swaps only the `accent-*` tokens.

### 2.2 Semantic tokens (light theme — default)

| Token | Hex | Purpose | Contrast / notes |
|---|---|---|---|
| `--color-bg` | `#F4F3EF` | Page background (warm architectural white) | — |
| `--color-surface` | `#E9E8E3` | Secondary neutral bands | text on it 12.87 : 1 |
| `--color-raised` | `#FBFAF7` | Form fields, popovers | text on it 15.13 : 1 |
| `--color-text` | `#202326` | Primary text, charcoal | on bg **14.22 : 1** |
| `--color-text-muted` | `#5E6160` | Secondary text (**changed from `#777A79`**) | on bg **5.64**, surface **5.10**, raised 6.00 |
| `--color-text-disabled` | `#8E918F` | Disabled labels (exempt from AA; paired with `aria-disabled` + a visual cue other than colour) | on surface 2.59 |
| `--color-border` | `#D8D7D1` | Decorative hairlines and dividers only | 1.30 (decorative) |
| `--color-border-strong` | `#7A7D7B` | Input/control boundaries | on bg **3.75**, on surface **3.39** (≥ 3) |
| `--color-accent` | `#A34D3C` | Links, primary action, focus accents, numerals | on bg **5.13**, surface 4.65, raised 5.46 |
| `--color-accent-hover` | `#8C3F30` | Hover/pressed accent | on bg **6.59** |
| `--color-on-accent` | `#FFFFFF` | Text on accent fills | on accent **5.70**, on hover 7.32 |
| `--color-focus` | `#202326` | Focus ring on light surfaces (2 px, 3 px offset) | on bg 14.22 |

### 2.3 Dark sections (hero-adjacent bands, contact, footer)

| Token | Hex | Notes |
|---|---|---|
| `--color-dark-bg` | `#202326` | Same as `--color-text`; sections invert, not a separate theme |
| `--color-dark-surface` | `#2A2E31` | Raised panels on dark |
| `--color-dark-text` | `#F4F3EF` | on dark-bg **14.22**, on dark-surface 12.33 |
| `--color-dark-muted` | `#A3A6A4` | on dark-bg **6.43**, on dark-surface 5.57 |
| `--color-dark-border` | `#4A4E51` | Decorative hairlines (1.88; decorative) |
| `--color-dark-border-strong` | `#8A8D8B` | Input borders on dark: on dark-bg **4.71**, on dark-surface **4.08** |
| `--color-accent-on-dark` | `#D2806E` | Accent as **text** on dark: **5.30** on dark-bg, 4.60 on dark-surface. (The light-theme accent is 2.77 on dark — never use it for text there.) |
| `--color-accent-on-dark-hover` | `#E09A8A` | 6.89 on dark-bg |
| `--color-focus-on-dark` | `#F4F3EF` | Focus ring on dark (14.22) |

### 2.4 State rules

- **Hover:** links darken to `accent-hover` and the underline thickens (1 → 2 px); primary buttons use `accent-hover`; ruled rows invert (see §5.4). Hover never conveys information alone.
- **Focus:** `:focus-visible` 2 px solid ring, 3 px offset, `--color-focus`/`--color-focus-on-dark`; never removed; never clipped by `overflow: hidden` (use padding on the container). Sticky header must not cover a focused element (WCAG 2.4.11) → `scroll-padding-top: var(--header-h)`.
- **Disabled:** `aria-disabled="true"` + `--color-surface` fill + `--color-text-disabled` + `cursor: not-allowed` + no hover transform.
- **Error:** no extra colour is introduced. Error text uses `--color-accent-hover` (6.59 : 1 on bg), **plus** an icon, the word "Gabim:" before the message and a 2 px left rule on the field, so meaning never rests on colour alone. (On dark sections the same tokens remap to `--color-accent-on-dark-hover`.)
- **Selection:** `::selection` charcoal bg, warm-white text.

### 2.5 Restraint rules

One accent only. No gradients, except the single scrim used behind text-over-image (see §5.9). No per-section colours. Dark sections invert the same palette. Division identity = number + name, never colour (D-004 option 1).

### 2.6 Token implementation (proposed CSS)

```css
:root {
  --color-bg:#F4F3EF; --color-surface:#E9E8E3; --color-raised:#FBFAF7;
  --color-text:#202326; --color-text-muted:#5E6160; --color-text-disabled:#8E918F;
  --color-border:#D8D7D1; --color-border-strong:#7A7D7B;
  --color-accent:#A34D3C; --color-accent-hover:#8C3F30; --color-on-accent:#fff;
  --color-focus:#202326;
  --color-dark-bg:#202326; --color-dark-surface:#2A2E31; --color-dark-text:#F4F3EF;
  --color-dark-muted:#A3A6A4; --color-dark-border:#4A4E51; --color-dark-border-strong:#8A8D8B;
  --color-accent-on-dark:#D2806E; --color-accent-on-dark-hover:#E09A8A; --color-focus-on-dark:#F4F3EF;
}
[data-surface="dark"] { /* remap semantic tokens once; components never branch on theme */
  --color-bg:var(--color-dark-bg); --color-surface:var(--color-dark-surface);
  --color-text:var(--color-dark-text); --color-text-muted:var(--color-dark-muted);
  --color-border:var(--color-dark-border); --color-border-strong:var(--color-dark-border-strong);
  --color-accent:var(--color-accent-on-dark); --color-accent-hover:var(--color-accent-on-dark-hover);
  --color-on-accent:#202326; --color-focus:var(--color-focus-on-dark);
}
```

(The existing tokens are HSL triplets consumed as `hsl(var(--bg))`. Migration to hex-valued semantic tokens is a Milestone-1 task; Tailwind's config maps them.)

## 3. Typography

**Typeface (D-011, assumed, gated):** **Geist** (sans, variable) for everything; **Geist Mono** only for small labels and numerals. Self-hosted via `next/font`, `display: swap`, subsets `latin` + `latin-ext` (Albanian needs `ë ç`). *Gate:* M1 renders Ë ë Ç ç at 400/500/600 and fails over to **Inter + IBM Plex Mono** if any glyph falls back.

| Evaluated | Verdict |
|---|---|
| **Geist** | Tight, neutral grotesk that holds up at very large sizes (monumental headings) and small sizes; variable; OFL. **Chosen.** |
| Inter | Excellent and safe; **fallback.** Slightly softer/more generic at display size. |
| Manrope | Rounded terminals soften the "exact, cold, honest" tone (ref. C). Rejected. |
| IBM Plex Sans | Strong engineering character, but wide metrics hurt large Albanian headlines; Plex Mono is the mono fallback. |
| Neue Montreal | Commercial licence (not procured). Rejected. |

Replaces the four families currently loaded on every page (Inter, Outfit, Instrument Serif, JetBrains Mono) → two files of one superfamily.

### Scale (fluid; desktop value is at ≥1440 px, mobile at 390 px)

| Role | Tag | Size (clamp) | ≈ Desktop / Mobile | Weight | Line-height | Tracking |
|---|---|---|---|---|---|---|
| Display (home hero only) | `h1` | `clamp(3rem, 1.5rem + 7.5vw, 10rem)` | ~132 px / ~53 px | 600 | 0.92 | −0.035em |
| Page title | `h1` | `clamp(2.5rem, 1.2rem + 5vw, 6rem)` | ~91 px / ~39 px | 600 | 0.98 | −0.03em |
| Section heading | `h2` | `clamp(1.875rem, 1.1rem + 3vw, 3.75rem)` | ~60 px / ~30 px | 600 | 1.02 | −0.025em |
| Sub-heading | `h3` | `clamp(1.375rem, 1rem + 1.2vw, 2rem)` | ~32 px / ~22 px | 500 | 1.15 | −0.015em |
| Item title | `h4` | `1.25rem` | 20 px | 500 | 1.3 | −0.01em |
| Lead | `p.lead` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | ~22 / 18 px | 400 | 1.45 | 0 |
| Body | `p` | `clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)` | ~17 / 16 px | 400 | 1.6 | 0 |
| Small | `.small` | `0.875rem` | 14 px | 400 | 1.5 | 0.005em |
| Label | `.label` | `0.75rem` mono, uppercase | 12 px | 500 | 1.3 | +0.12em |

Rules: max measure **66 ch** for body, **22 ch** for display headings (they break by design; use `text-wrap: balance`); minimum text size 12 px (labels only, never body); sentence case for headings; uppercase only for labels; numerals tabular in mono; Albanian hyphenation off (`hyphens: manual`) for headings; never fake bold/italic; no italics-serif pairing (the current hub's Instrument Serif italic is dropped for system consistency).

Heading hierarchy: exactly one `h1` per page; `h2` for sections; `h3` for items; no skipped levels (a11y, not SEO — see `research/resources.md` §1).

## 4. Layout system

| Token | Value |
|---|---|
| Content max width | `1320px` (centred) inside page margin; full-bleed images may exceed |
| Page margin | `clamp(20px, 4vw, 64px)` |
| Grid | **12 columns ≥ 1024 px · 8 columns 768–1023 px · 4 columns < 768 px**; gutter 24 px (≥ 768) / 16 px |
| Breakpoints | `480` · `768` · `1024` · `1280` · `1600` |
| Spacing scale (4 px base) | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 |
| Section spacing | `clamp(80px, 10vw, 160px)` top/bottom; related blocks inside a section 48–64 px |
| Header height | 72 px desktop / 60 px mobile (`--header-h`) |
| Radius | **0** for buttons, inputs, images, panels (architectural). One exception token `--radius-focus: 2px` for focus ring corners. |
| Image ratios | Hero 16:9 desktop / 4:5 mobile · Project 3:2 and 4:5 · Division 4:5 · Plan/figure: natural ratio, never cropped · Avatar n/a |
| Alignment | Text left-aligned. Section labels and numerals hang in columns 1–2; content starts at column 3 (≥ 1024 px). No centred body copy. |
| Vertical rhythm | Section label → 24 px → heading → 32 px → body; hairline (`--color-border`) between repeated rows; rows 24–40 px padding. |

Not everything is a container: sections are separated by space and hairlines. **No rounded cards.** Panels (form, featured project meta) may use `--color-surface` bands, square-cornered.

## 5. Components (proposed set)

### 5.1 Header & navigation
- Left: interim wordmark "TORRE" (D-005). Right (≥ 1024): `Kompania · Kompanitë ▾ · Projektet · Kontakti`, phone link (≥ 1280), primary button **"Na kontaktoni"**.
- "Kompanitë" opens a menu listing the four divisions (a real `<ul>` of links; also works with JS off — it is a link to `/kompanite`, with the menu as enhancement).
- Sticky, solid `--color-bg`, 1 px bottom border appears after 8 px scroll. **No hide-on-scroll** (keeps the contact CTA reachable; avoids motion).
- Mobile: hamburger (44 × 44 target) → full-screen sheet; `aria-expanded`, focus trap, `Esc` closes, `inert` background, 48 px link rows, large phone + WhatsApp buttons at the bottom of the sheet.
- Skip link first in DOM; `<nav aria-label="Kryesore">`; current page `aria-current="page"`.

### 5.2 Buttons & links
| Variant | Spec |
|---|---|
| Primary | `--color-accent` fill, `--color-on-accent` text, min-height 48 px, padding 0 28 px, 15–16 px weight 500, square, trailing arrow glyph |
| Secondary | 1 px `--color-text` border, transparent fill, same size |
| Text link | accent colour, 1 px underline offset 4 px → 2 px on hover; arrow `→` aligned to baseline |
| Icon button | 44 × 44 px minimum target, visible focus, accessible name |

All buttons are real `<a>`/`<button>`; target size ≥ 44 px (above WCAG 2.2's 24 px minimum). One primary per view.

### 5.3 Section label
`01 — Kush jemi`: mono 12 px, uppercase, `--color-text-muted`, numeral in accent. Numbering restarts per page and matches DOM order.

### 5.4 Division index (home, `/kompanite`)
Four full-width ruled rows: numeral (mono) · name (h2 size) · one-line description · "Shiko →". Desktop hover: row fills `--color-dark-bg` (CSS `clip-path`/background-size transition, 280 ms), text swaps to `--color-dark-text`, an image preview appears at the right (images lazy-loaded). Touch/keyboard: same invert on `:focus-visible`; image shown inline below the row on < 1024 px. Each row is one link (single tab stop) with an accessible name "MAGFA GROUP — ndërtim shtëpish".

### 5.5 Project rail & tiles
Native `overflow-x: auto` + `scroll-snap-type: x proximity`; tile 3:2 or 4:5 image + name + place + year + category; prev/next buttons (44 px) control scroll position; the track is a labelled region reachable by keyboard (`tabindex="0"`, arrow keys scroll); "N / M" counter. If < 4 verified projects exist, render a **featured block** instead of a rail (never a rail of one).

### 5.6 Facts row
Up to four items, each a large figure/word + one-line label, hairline-separated. **Only §1 facts of `content.md`:** `1999 — themelimi`, `4 — kompani`, `6 — qytete ku ndërton MAGFA`, factory in Ferizaj (SWISSTECH). Counters do not animate (they would hide the value from non-JS crawlers; Flintco's counters start at `0` in the served HTML).

### 5.7 Forms
Labels above fields (never placeholder-as-label); 48 px height; 1 px `--color-border-strong`; focus = 2 px ring; required marked with text "(e detyrueshme)", not just `*`; field-level errors beneath, linked with `aria-describedby`, plus a summary at the top (`role="alert"`, focus moved to it) listing links to invalid fields; success replaces the form with a confirmation (`role="status"`) and preserves what was typed on error. Honeypot field removed from the accessibility tree. Privacy line: "Duke dërguar pranoni politikën e privatësisë" linking to the real policy. Autocomplete tokens (`name`, `tel`, `email`).

### 5.8 Footer
Dark section. Wordmark; one-sentence description; navigation; four divisions; contact block (phone, WhatsApp, verified email, SWISSTECH factory address); legal links (privacy, terms, accessibility, cookies if applicable); © year generated at build, not `new Date()` in a client component; social links only if they exist (none known today).

### 5.9 Image treatment
Full-strength colour, no wash/overlay (the old hero bug washed photos to ghosts — commit `f0e42a3`). Text over image only with a **single scoped linear scrim** limited to the text zone and verified at 4.5 : 1. Renders carry a visible caption "Vizualizim" (render). Hairline 1 px `--color-border` frames only for plans/figures. Reveal: clip-path inset mask (see `animation.md`). Always `next/image` with `sizes`, AVIF/WebP, explicit dimensions (CLS = 0), `priority` only on the LCP image. Alt text states what is shown, not "image of".

### 5.10 Other
- **Breadcrumbs** on depth ≥ 2 (also emitted as JSON-LD).
- **Pull-quote** only for real client-approved quotes (none exist; component built only when content arrives).
- **Cookie notice** only if a non-essential cookie is introduced (none planned — D-016).

## 6. Homepage art direction (proposed)

| # | Section | Composition |
|---|---|---|
| 01 | Header | §5.1. |
| 02 | **Hero** | Light. Display headline spans ~10 of 12 columns: **"Ndërtojmë në Kosovë që nga 1999."** (specific, true, client-supplied). Beneath, in columns 3–8, a lead: *TORRE Group është grup familjar me katër kompani: ndërtim shtëpish, dritare dhe fasada, zhvillim rezidencial dhe banesa.* Two CTAs: **"Na kontaktoni"** (primary), **"Shiko kompanitë"** (secondary). One full-width image band below (TORRE HOME render, captioned, until real photography arrives — see `content.md`). A hairline grid and numerals "01–04" echo the system. |
| 03 | Introduction | Section label `01 — Kush jemi` hangs in cols 1–2; 2 short paragraphs in cols 3–8 (founding story, how the four relate — **needs client answers, `content.md` §4.2–3**); text link to `/kompania`. |
| 04 | **Companies / capabilities** | The division index (§5.4). This replaces a generic "services" grid: each company *is* a service line. Each row lists 3–4 verified service names inline (e.g. MAGFA: *ndërtim shtëpish · dizajn arkitekturor · renovim · mbikëqyrje*). |
| 05 | Projects | One **featured project** (TORRE HOME, Ferizaj): large image, meta strip (place, category, status [needs client], companies involved), link to the project page. A compact grid/rail appears only when ≥ 3/≥ 4 verified projects exist. |
| 06 | Experience & credibility | Facts row (§5.6) + "Ku ndërtojmë" (six cities, from MAGFA). Certifications block is **omitted** until documents exist (no empty placeholders). |
| 07 | Why TORRE | Three differentiators drawn only from verified structure: *katër specializime në një familje* · *fabrikë e vet në Ferizaj (SWISSTECH)* · *një numër për katër kompanitë* (one phone/WhatsApp line). Longer claims wait for client answers. |
| 08 | Contact | Dark band. Left: heading **"Na tregoni projektin."** + form. Right: phone, WhatsApp, verified email, factory address with "Hap në hartë" link (no map embed). |
| 09 | Footer | §5.8. |

**Mobile:** hero headline stacks in 3–4 lines at ~53 px; the image band becomes 4:5; division rows keep numerals on the left; facts row becomes a 2 × 2 grid; the form stacks; header CTA collapses into the sheet but a persistent bottom "Telefono" bar is **not** used (it would cover content and focus targets) — the phone button sits in the header at all widths.

## 7. Page-level diversity

Consistent system, different character per page type (no repeated "hero + three cards").

| Page | Hero | Body character |
|---|---|---|
| Home | Typographic, monumental + image band | Numbered division rows, featured project, facts row, contact band |
| Kompania | Short statement + long-form two-column text | Editorial timeline (1999 → sot, extended with client facts), principles list, photo pairs when available |
| MAGFA | Image-led full-bleed (finished-house photography when supplied) | Services as numbered list; cities as a typographic list; contact CTA |
| SWISSTECH | Spec-sheet typographic hero (product lines as a ruled table, **no prices**) | Process of ordering/measuring/installation *only if verified*; factory address & visit-by-appointment block |
| TORRE DI UMBRIA | Typographic with building geometry | Scope-of-work ledger (project management, architecture, infrastructure, common areas, permits) — presented as scope, **not** as durations/warranties |
| TORRE HOME | Gallery-led (renders, plans, parking) | Building 1 / Building 2 columns; floor-plan viewer; enquiry CTA |
| Projects index | Ruled list with thumbnails (rail when ≥ 4) | Filter by company when there are enough projects |
| Project page | Large image + meta strip | Narrative, captioned gallery, plans, related company, CTA |
| Contact | Split: direct info left, form right (dark) | Address(es), hours (if given), privacy notice |
| Legal | Plain, 72 ch column | Sticky table of contents |
| 404 | Typographic | Links to the four companies and contact |

## 8. Motion (summary — authority is `animation.md`)

CSS for hover, reveals, header and nav; GSAP only for the hero line-mask and the optional pinned rail. Durations 160 / 280 / 560 / 900 ms; `cubic-bezier(0.22, 1, 0.36, 1)` out, `cubic-bezier(0.65, 0, 0.35, 1)` in-out. Nothing delays content; everything off under `prefers-reduced-motion`; no scroll hijack by default.

## 9. Responsive rules

- Design **mobile first**, then enhance at 768 / 1024 (not shrink-to-fit).
- Hero image crops are authored (4:5 mobile, 16:9 desktop), not left to `object-fit` luck; art direction via `<picture>`/`sizes`.
- Tap targets ≥ 44 px; spacing between adjacent targets ≥ 8 px.
- No horizontal page scroll at 320 px; horizontal scrolling lives only inside the labelled project rail.
- Forms: single column < 768 px; keyboard type per field (`inputmode`, `type=tel/email`).
- Tables become stacked key/value lists < 768 px.
- Test widths: 320, 390, 768, 1024, 1440, 1920.

## 10. Accessibility rules (summary — authority is `accessibility.md`)

WCAG 2.2 AA. Contrast per §2 (computed). Keyboard-complete. Visible focus. One `h1`. Landmarks `header/nav/main/footer`. Reduced motion honoured. Forms announce errors. No information by colour alone. No drag-only interaction (2.5.7). Targets ≥ 44 px (2.5.8 asks 24 px).

## 11. Anti-patterns (do not build)

Rounded-card grids · "icon in a circle + title + sentence" feature rows · three equal cards as a default section · gradient fills or blue-gradient "corporate" looks · glassmorphism · per-section accent colours · centred body copy · autoplay audio/video · infinite marquees · parallax on text · animated counters over unverified numbers · full-bleed text on unscrimmed photos · stock photos or AI imagery presented as TORRE work · testimonials without a real, consenting source · prices/warranties/tax statements without client sign-off · placeholder lorem or dead buttons · modal pop-ups · cookie banners when no non-essential cookies exist · keyword-stuffed headings · slogans that fit any company · hijacking scroll · `outline: none` · icon-only buttons without names.

## 12. Reference-to-decision map

| Decision | Because |
|---|---|
| Hero states the business + two CTAs | Flintco (A) |
| Display type as the main graphic | Massive Forms (C) |
| Rigorous 12-col grid, numerals, hairlines | Meyerton (D), Massive Forms (C) |
| One system across pages, consistent image ratios | Nikken (E) |
| Curated project rail, question-led FAQ | Cormack (B) |
| Square corners, one accent | Flintco (A), Massive Forms (C) |
| No slogans, no invented stats, no stock-as-own, no keyword stuffing | Brief + what A/B do that we reject |
