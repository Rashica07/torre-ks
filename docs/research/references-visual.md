# Visual study of the five references

> **Status: COMPLETE (2026-11-07). Supersedes the visual claims in `references.md`**, which were written from page text only. Everything below was observed in the actual artwork or the rendered site.
> How the evidence was obtained, and its limits, are in §0. The synthesis for TORRE is in §6 and in `docs/design.md`.

## 0. What was actually seen

The sandbox now allows the exact hosts the references need (environment `torre-ks-design-research`, owner-approved). Result:

| Ref | Material viewed | Not viewed / caveat |
|---|---|---|
| **A Flintco** | Rendered homepage in Chromium at 1440 px: eight viewport captures from hero to news | Webfonts did not load in the capture, so headings appear in a serif fallback; **typeface cannot be judged from it** (the fetched CSS names Stratum-2, Barlow Semi Condensed, Halyard). Nav and layout are real |
| **B Cormack** | The agency's case-study screens (desktop film-strip, mobile, About and Services pages, 4203×2322 px) and DOM inspection of the **live** site | The live page never left its olive preloader because its scripts load from CDNs outside the allowed hosts, so I could not scroll it myself. The mechanism below is read from the DOM and script list; the look is read from the case-study screens |
| **C Massive Forms** | The Dribbble artwork (1600×1080, 1600×900) | One crop of a larger concept |
| **D Meyerton** | The Behance cover module (1920×1170) | The Behance project page itself returns 403 to automated clients, so **only the cover was viewable**; the rest of the project is not seen |
| **E Nikken** | All 9 image modules (full-page comps up to 4654 px tall) | The Behance page is 403; modules were fetched straight from the image host |

## 1. Corrections to the earlier (text-only) analysis

| Earlier claim in `references.md` | What the artwork shows |
|---|---|
| Cormack horizontal scroll: "mechanism not determined; maybe pinned or native" | **Verified:** the *entire homepage* is one `position: sticky; top: 0` 100vh container holding a **14,616 px-wide track**; the page's 4,500 px of scroll height drives it. Built with **Lenis smooth-scroll + GSAP 3.12 (ScrollTrigger, Flip) + SplitType + a custom cursor follower**, images parallax inside frames (image box 1,080 px inside a 720 px mask) |
| Meyerton: "heavy grotesk headings, small tracked labels (hypothesis)" | Much stronger: a single **full-width ultra-condensed wordmark** with the photograph showing through the letterforms, and **stair-stepped yellow label tags** as the only colour |
| Nikken: "serif/sans pairing possible (hypothesis)" | Wrong. It is a **wide, light grotesk**; the signature is a **circle aperture** and thin outline geometry, with a printed-plate frame |
| Massive Forms: "single tight grotesk at very large sizes (hypothesis)" | Right, but the real idea is bigger: **the photograph is the entire page** and text lives *inside* it on two vertical axes |

## 2. A — Flintco (what the screen actually does)

- **Colour is architecture.** The first screen is a **flat, full-bleed brand-red plane** — no photograph above the fold. Below it the page alternates **cream**, **red**, **deep slate-teal** (the statistics block) and white. Sections are told apart by plane, not by borders.
- **Rotated side labels** ("OUR SERVICES", "EXPERIENCE", "NEWS", "PODCAST") run vertically in the left margin; the news block uses red/white vertical *tabs*.
- **Project showcase = one full-bleed photograph** with a **white angled-cut caption plate** (cut edge echoes the arrowhead of the logo) carrying the project name and city, and square arrow buttons.
- **Services** are stacked, underlined, uppercase tracked links, each with an arrow-in-a-box.
- **Statistics** sit right on the slate plane: huge numerals, small grey tracked labels.
- Headings are uppercase and tracked; nav is a small uppercase bar over the red plane with a utility row above it; buttons are square, outlined or filled — **no radius anywhere**.

**Principle to carry:** page rhythm made of confident flat planes; labels in the margin; a caption plate cut at an angle. **Not to copy:** red, the serif look in my capture (a font-loading artefact), the Flintco numbers, the news/podcast tabs.

## 3. B — Cormack (what the screens show)

- A **horizontal film-strip**: panels alternate full-bleed dark photograph → white typographic panel → photograph with a tiny caption (project name left, suburb right) → **olive-green colour panel** → photographs.
- Typography is a **light grotesk at very large size** ("Built with Distinction", "Projects", "Services") over small body copy; the logo is a **slanted parallelogram**.
- **Buttons**: an outlined text box joined to a **black square cell holding an arrow**; menu is a black circle.
- **Caption plaques** in the panel colour overlap the photograph's lower-left corner ("Design — Bringing to Life Architectural Designs").
- The **About** page scatters small text blocks and images at different sizes on a wide grid with generous white space; the **Services** page is a sidebar tab list + alternating text / photograph rows.
- **Mobile is a different layout**, not the strip squeezed: full-bleed vertical slides with a counter ("2/4 Cluden"), stacked panels, a circular menu button.

**Principle to carry:** panels of different *kinds* (photo / type / colour) in a rhythm; caption plaques overlapping photographs; scattered editorial placement; mobile designed separately. **Not to copy:** Lenis smooth scroll and a pinned page-wide track (it replaces native scroll — rejected by the brief), the olive palette, the slanted logo.

## 4. C — Massive Forms Studio

- **One monochrome photograph of monumental concrete is the page** — arches, a fog-white opening, a *tiny human figure for scale*. Nothing is boxed; all text lives on the image.
- **Two vertical axes**: a narrow left column of small copy; a right column at ~49% of the width carrying the huge headline ("Trusted to Deliver the Heavyweight Projects.") in a bold, tight, Helvetica-like grotesk, white, three lines at enormous size.
- A **single hairline** crosses the page under the headline.
- Secondary info is **tiny bold uppercase titles with grey one-line descriptions** ("MATERIAL FIRST — Concrete isn't a material — it's a medium.").
- A **giant "%" numeral** bottom-left is the statistic; the footer row (address, e-mail) sits *inside* the image at the bottom, aligned to the same two axes.
- Nav is a small uppercase row with an underlined active item.
- Palette (extracted): `#0A0A0A #40403E #81817E #9F9F9F #F6F6F6`.

**Principle to carry:** the photograph as the canvas; text placed on a strict two-axis grid; monumental scale contrast between a giant headline/numeral and tiny labels; the human figure for scale. **Not to copy:** all-black cold monochrome, the "Silo" brutalist content, the Helvetica clone.

## 5. D — Meyerton, E — Nikken

**D — Meyerton (cover only).** A black-and-white welding photograph fills the screen. **"MEYERTON" is set in one ultra-condensed heavy face spanning the full width and bleeding off both edges; its lower half shows the photograph through/over the letters (blend), so the wordmark and image are one object.** Small **yellow tags with stepped (stair-profile) edges** carry "CORPORATE WEBSITE" and the credit — yellow is the only colour. *Principle:* the brand name as the hero object at architectural scale; one signal colour; labels cut like steel profiles.

**E — Nikken (9 modules).** The cover is a **framed plate**: a thin white border, a dark title band with the wordmark in wide light caps, and a huge photograph of concrete with a **circular aperture** cut through it (a second photograph is visible inside the circle). The homepage comp has a **thin outline-circle geometry** meeting a photographic panel; **huge light caps ("MORE THAN CREATIVE") overlapped by image fragments**; section headings (PROJECTS, EXPERTISE, INSIGHTS, NEWS) as large light caps with a hairline under them and a small **outlined pill** ("Show all"); a **horizontally draggable project row with staggered image heights** and tiny captions plus a circular "Drag" cursor chip; an expertise list (small text, one active bullet) beside a carousel; pale grey paper `#F2F2F2`, all rules 1 px. *Principle:* a geometric aperture as the signature; type and image overlapping; staggered image sizes; document/plate framing. *Not to copy:* the circle itself (TORRE's equivalent must come from its own world — see §6), the content modules (insights/news).

## 6. Synthesis — what these five decisions become for TORRE

TORRE has **no existing visual identity to inherit** (the "logos" are generic icon tiles) and **three things to build from**: the name (*torre* = tower), the trade (facades, windows, concrete, glass, homes) and one real, finished building (TORRE HOME). So the new language is architectural *by subject*, not by decoration:

| Reference decision | Becomes at TORRE |
|---|---|
| Meyerton: giant wordmark with photograph in the letters | **The TORRE wordmark is the hero**, an SVG set in a tall condensed face, filled with the TORRE HOME photograph — each letter a window onto the building |
| Nikken: circular aperture, plate frame | A **rectilinear aperture** (a window/bay opening — TORRE's geometry), the image expanding from the letter-windows to a framed plate with a hairline border |
| Massive Forms: photograph as canvas, two axes, giant numerals | Full-bleed plates with text placed on two vertical axes; **monolith numerals** for verified facts; title-block micro-type |
| Flintco: colour planes, rotated labels, angled caption plate | Section rhythm in **planes** (ink / concrete / paper / one bronze plane / four company planes); rotated margin labels; an **angled caption tab** naming each plate |
| Cormack: panels of different kinds; caption plaques; mobile designed separately | Panels alternate photo / type / colour; staggered editorial row; **native** horizontal scroll (not pinned); mobile restacks the wordmark rather than shrinking it |
| Flintco + Cormack + Nikken: ruled hairlines, small caps | Reduced to a **drawing language** (title blocks, sheet numbers, floor numerals), not used as a universal container |
| Meyerton: one signal colour on stepped tags | **Anodised-bronze** (the group mark's gold) as the single signal, used once per page as a plane or a rail marker |

Original contribution: the **floor** concept — the group is a building; the four companies are four floors/towers; navigation is an elevator rail — derived from the name, which none of the references has.
