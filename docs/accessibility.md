# Accessibility

> **Status: requirements and test plan; Milestone 1 shell tested.** After M1: axe (WCAG 2.0/2.1/2.2 A+AA rule set) reports **0 violations on all 17 pages plus the 404 at 390 px and 1440 px**; scripted keyboard tests, 320 px reflow, no-JS and reduced-motion tests pass; ESLint jsx-a11y runs as errors. Automated tools catch only a minority of issues — **manual screen-reader (VoiceOver/NVDA), real-device and 200/400 % zoom passes have NOT been done** (M6). Axe found two real defects during M1 (WCAG 2.5.3 Label in Name), both fixed. The `/deklarata-e-qasshmerise` statement is still templated placeholder text (noindexed) and is not evidence of conformance.
> Target: **WCAG 2.2 Level AA.** Last updated: 2026-11-07.

## 1. Requirements by success criterion (the ones this design actually stresses)

| SC | Requirement | Where it bites | Design response |
|---|---|---|---|
| 1.1.1 Non-text content | Meaningful alt on informative images; empty alt on decorative | Division images, renders, plans | Alt written per image from client caption; renders say "Vizualizim…"; decorative = `alt=""`. The hub's four tiles currently have empty alt — fixed or declared decorative with adjacent text. |
| 1.3.1 Info & relationships | Semantic headings, lists, landmarks, tables | Division rows, facts row, forms | One `h1`/page, `ul` for lists, `<dl>` for facts, `header/nav/main/footer`, `<table>` only for real tabular data |
| 1.3.5 Identify input purpose | `autocomplete` on form fields | Contact form | `name`, `tel`, `email` tokens |
| 1.4.3 Contrast (min) | 4.5 : 1 text / 3 : 1 large | Palette | Computed in `design.md` §2; muted text changed to `#5E6160`; accent on dark uses `#D2806E`; CI contrast check extends the existing `scripts/check-contrast.mjs` to the new tokens |
| 1.4.10 Reflow | No 2-D scroll at 320 px | Whole site | Mobile-first; horizontal scroll only inside the labelled rail |
| 1.4.11 Non-text contrast | 3 : 1 for UI boundaries and focus | Inputs, buttons, focus ring | `--color-border-strong` 3.75 / 3.39 : 1; focus ring 14.22 : 1 |
| 1.4.12 Text spacing | No loss under user spacing overrides | Fixed-height components | No fixed heights on text containers |
| 1.4.13 Content on hover/focus | Dismissible, hoverable, persistent | Nav dropdown, row preview | `Esc` dismisses; pointer can move into the panel; no hover-only information |
| 2.1.1 / 2.1.2 Keyboard / no trap | All functions by keyboard; no traps | Nav sheet, rail, form | Focus trap only inside the modal nav sheet, released by `Esc`/close |
| 2.2.2 Pause, stop, hide | Moving content > 5 s needs control | Motion | No auto-playing/looping motion exists (Ken Burns removed) |
| 2.3.1 Three flashes | None | Motion | None |
| 2.4.1 Bypass blocks | Skip link | Layout | First focusable element: "Kalo te përmbajtja" |
| 2.4.3 Focus order | Logical | Rail, nav | DOM order = visual order; rail tiles in order |
| 2.4.7 Focus visible | Always | Everything | 2 px ring, 3 px offset, never removed |
| **2.4.11 Focus not obscured (min)** *(2.2)* | Focused element not hidden by sticky header | Sticky header | `scroll-padding-top: var(--header-h)` + `scroll-margin-top` on anchors/targets |
| **2.5.7 Dragging movements** *(2.2)* | Any drag action has a single-pointer alternative | Project rail | Prev/next buttons and native scroll; no drag-only control |
| **2.5.8 Target size (min)** *(2.2)* | ≥ 24 × 24 CSS px | Buttons, links in lists | We use ≥ 44 × 44 px for controls; inline text links exempt |
| 3.1.1 / 3.1.2 Language | `lang` on `<html>`; `lang` on foreign passages | Site | `lang="sq"` on Albanian routes, `lang="en"` on `/en/**`; language-switcher links carry `hreflang` and `lang`; company names are proper nouns and unchanged |
| **3.2.6 Consistent help** *(2.2)* | Help/contact in the same place | Header/footer | Phone and "Na kontaktoni" in the same header and footer position on every page |
| 3.3.1 / 3.3.3 Error identification & suggestion | Describe errors in text with suggestions | Form | "Gabim: shkruani një numër telefoni, p.sh. +383 49 000 000" |
| 3.3.2 Labels or instructions | Visible labels | Form | Labels above fields; required stated in text |
| **3.3.7 Redundant entry** *(2.2)* | Don't ask twice | Form | Single contact method field set; no re-asking |
| **3.3.8 Accessible authentication** *(2.2)* | No cognitive-test authentication | Spam control | **No CAPTCHA image/puzzle.** Honeypot + timing + rate limit; if Turnstile is approved (D-006) use its non-interactive mode only |
| 4.1.2 Name, role, value | Custom controls expose them | Nav toggle, rail, dropdown | Native elements first (`button`, `a`, `dialog`); ARIA only where HTML cannot express it |
| 4.1.3 Status messages | Announce without focus | Form success | `role="status"`; error summary `role="alert"` with focus moved to it |

## 2. Component rules

**Navigation.** Desktop: real `<nav aria-label="Kryesore">` with a link list; the "Kompanitë" menu is a disclosure (`button aria-expanded` + `ul`), not `role="menu"`. Mobile: `<dialog>`-style sheet or `inert`ed background; focus enters on open, returns to the toggle on close; `Esc` closes.
**Project rail.** Region with `role="region"` and `aria-label="Projektet"`, `tabindex="0"`, arrow-key scrolling, live "3 / 8" text hidden from AT (`aria-hidden`) because the DOM order is already the reading order; buttons "Para"/"Pas" with `aria-controls`.
**Division rows.** One link per row; accessible name composed from visible text; the preview image is decorative (`alt=""`).
**Forms.** Described in `design.md` §5.7. Error summary links to the invalid field IDs; success message is announced; submit button remains enabled (disabled-on-invalid hides the reason); the honeypot input is `aria-hidden="true" tabindex="-1" autocomplete="off"` and visually off-screen.
**Images of text.** None. Headlines are live text.
**Tables.** Only for tabular data (e.g., plan schedules), with `<caption>` and header scope.
**Documents/PDFs.** None planned. If brochures are added they must be tagged PDFs or HTML alternatives.

## 3. Content rules

Plain language; descriptive link text ("Shiko projektin TORRE HOME", never "kliko këtu"); no meaning by colour alone (errors have icon + text + rule); abbreviations expanded on first use; Albanian text correctly marked up; headings describe the section.

## 4. Testing strategy

| Layer | Tool | When |
|---|---|---|
| Static | `eslint-plugin-jsx-a11y` (added in M1); `scripts/check-contrast.mjs` extended to the new tokens | Every commit / CI |
| Automated | `@axe-core/playwright` against every route at 390 px and 1440 px, light and dark surfaces; fail build on serious/critical | CI per PR from M2 |
| Lighthouse | Accessibility score target ≥ 95 (a gate), 100 (a goal) — **note: automated tools catch only a minority of issues** | CI + M6 |
| Keyboard | Scripted Playwright tab-through for nav, rail, form; manual pass for focus order and visibility | M2–M6 |
| Screen reader | VoiceOver (macOS/iOS) and NVDA (Windows) on home, a division page, contact form (error + success) | M6 |
| Zoom/reflow | 200 % and 400 % zoom; 320 px width | M6 |
| Motion | Playwright `reducedMotion: "reduce"`; JavaScript disabled | M2, M6 |
| Real devices | One iOS and one Android phone | M6 |

Findings are fixed, not just reported; the QA report (`docs/qa-report.md`, created in M6) lists what was tested, results, and known gaps. We will not claim "WCAG 2.2 AA conformant" — only that it was **designed and tested to** that target, with the test evidence.

## 5. Accessibility statement

The existing `/deklarata-e-qasshmerise` page will be rewritten after M6 to state the real target, the date tested, known gaps and a contact route. (Kosovo-specific legal requirements for the statement: confirm with counsel — `content.md` §4.11.)

## 6. Patterns introduced by the "Fasada" direction (requirements; none built yet)

| Pattern | Risk | Requirement | Test |
|---|---|---|---|
| **Image-filled wordmark** (SVG text with an image pattern) | Text-as-image; low contrast where the photograph is dark; no real text | Real visually-hidden `<h1>` text; SVG `aria-hidden`; solid-colour fallback; crop must be high-key so letters are ≥ 3:1 vs ink (large text) | Build-time luminance check of the crop; axe; screenshot diff |
| **Rotated margin labels** (`writing-mode`) | Unreadable or lost to AT | Decorative or duplicated as normal text; never the only carrier of meaning | Manual + axe |
| **Floor rail** | Fixed navigation covering content; unclear names | `<nav aria-label="Katet">` + `<ol>`; visible numeral ⊆ accessible name; `scroll-padding-left` for the rail; hidden < 1280 px (list lives in the menu) | Playwright tab-through; WCAG 2.4.11/2.5.3 checks |
| **Menu overlay** | Focus loss, background interaction | Native `<dialog>`; focus returns to the opener; Esc closes (already tested pattern from M1) | Playwright |
| **Four Towers** | Hover-only content; rotated name | One link per tower; name and category in DOM as normal text; expansion also on `:focus-within`; mobile slabs show all text | Playwright + axe |
| **Bronze plane** | Paper-on-bronze = 2.30:1 | Ink text only; focus ring ink (6.62:1) | `check:contrast` pair list |
| **Scroll-driven effects** | Content missing when unsupported; motion sickness | Static fallback verified; off under `prefers-reduced-motion` | Playwright with `reducedMotion` and with `animation-timeline` unsupported |
| **Status elevation SVG** | Information only in a graphic | `role="img"` + text alternative stating the status; the status is also in text beside it | axe + manual |
| **Staggered row** | Drag-only, keyboard trap | Labelled region, arrow-key scroll, prev/next buttons, no pinned scroll (WCAG 2.5.7) | Playwright |
| **Anton display type** | Poor legibility small / in long text | Never < 24 px, never body, uppercase headings only, ≤ 3 lines | Visual review + lint rule for font-size |

The axe suite, the contrast script (new token pairs) and the keyboard tests are rewritten for the new components in M2.

