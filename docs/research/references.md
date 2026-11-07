# Reference analysis — A to E

> **Status: SUPERSEDED for visual claims by [`references-visual.md`](./references-visual.md) (2026-11-07).** This file was written from page text only, before the reference artwork could be viewed; several of its "hypothesis" rows were wrong (corrections in `references-visual.md` §1). Kept for the structural notes (page order, content patterns).
> Last updated: 2026-11-07. Evidence labels: see [`README.md`](./README.md).

## Evidence summary — what was actually seen

| Ref | Subject | What we could inspect | What we could not |
|---|---|---|---|
| **A** | flintco.com (live) | Full homepage text/structure, links, branding metadata (fonts, colours, button radius), meta tags. **Fetched.** | Visuals/screenshot, nav contents, motion behaviour, video. Nav items were not in the extracted markup. |
| **B** | Cormack Developments — agency case study (`emddigital.com.au`), Webflow showcase, and live site `cormackdevelopments.com.au` | Case-study text, live-site section order, copy, project/service naming, agency's statement about "horizontal scrolling". **Fetched.** | **How the horizontal scroll is built** (not stated anywhere we could read), typography, colours, motion timing. |
| **C** | Massive Forms Studio (Dribbble shot by Serhii Yurkovskyi) | The designer's written brief and the extracted five-colour palette. **Fetched.** | The artwork itself (CDN blocked). |
| **D** | MEYERTON ENGINEERING (Behance, Natalie Lebedeva) | Title, author description, tags, tools. **Fetched.** | **All imagery.** Design analysis below is author-stated intent plus hypotheses to confirm. |
| **E** | NIKKEN redesign (Behance, Anna Ivanova / UPROCK.DESIGN, 21 Apr 2022) | Title, tags, tools, ten image-module URLs. **Fetched.** | **All imagery** and any description (the page has none). |

Rows marked **(hypothesis)** are not observations. They must be confirmed in the pixel-level pass (D-010) before they drive a final decision.

---

## A — Flintco (corporate foundation)

Role: how TORRE *communicates its business*.

**Fetched homepage sequence:** Hero → Services → Experience (projects) → Credibility (stats) → News/Podcast → Careers → Closing CTA → Footer. Skip-to-content link present. GDPR cookie banner (WordPress plugin). Multilingual via Weglot.

1. **What makes it successful.**
   - The first screen answers *who and what* in one sentence and offers exactly two actions: "See Our Work" / "Join Our Team". Hero line: "All In. Always." followed by "Flintco provides comprehensive construction services for project owners who want more…".
   - The page runs in the order a project owner's questions arise: *what do you do → what have you built → can I trust you → how do I start.*
   - Services are presented as one short narrative ("Consider It Handled.") with four plain-named links (Preconstruction, Construction, Self-Perform, Real Estate Investment), not a card grid.
   - Projects are a plain list of **name + city, state** (nine items), not a gallery wall — dense and credible.
   - Proof is three large figures with units, each with a one-line meaning (e.g. repeat-client rate, safety rating), under the headline "YOU EXPECT CERTAINTY. WE DELIVER IT."
2. **What should influence TORRE.** The *order* and the *discipline*: business-first hero with one answer and two CTAs; services as a short narrative plus plain links; projects as name + place; a single credibility block; a direct closing CTA ("You Bring The Vision. We'll Make It Happen." → "Let's Get To Work").
3. **What should not be copied.** The slogan style ("All In. Always." tells you nothing about the business — the brief forbids this); US-specific metrics (EMR); the podcast/news machinery (TORRE has no content to feed it); and above all the **numbers** — Flintco's figures are its own. TORRE must not display a statistic it cannot source.
4. **Layout patterns.** Full-bleed hero; two-column inset image + narrative; ruled list for projects; centred statistic row; tabbed content module; full-bleed closing CTA over image.
5. **Animation patterns.** Statistic counters animate from zero (the extracted text shows `$0B+`, `0%`, `0.00` as initial states — **Fetched**, which also means the pre-animation markup is what a non-JS crawler sees). Hero offers "Click for sound" and "Press O for more options" (**Inferred**: a video hero with an audio toggle and a keyboard options menu).
6. **Typography.** Heading faces Stratum-2 and Barlow Semi Condensed (condensed, industrial); body Halyard Text. Extracted sizes: h1 60 px, h2 49 px, body 14 px (small). **Fetched (branding metadata).**
7. **Colour.** One strong red `#E71321`, off-white background `#F7FAFC`, cream-white text on dark surfaces `#FFFBF5`, dark teal links `#1E383F`. Square-cornered buttons (`border-radius: 0`). **Fetched.**
8. **Homepage structure takeaway.** Hero → what we do → what we built → proof → people/news → contact. Maps cleanly onto the proposed TORRE sequence in `design.md`; TORRE drops "news" and "careers" until real content exists.

---

## B — Cormack Developments (interaction and browsing)

Role: *how the site feels to move through.* Do not force horizontal scrolling everywhere.

**Fetched live-site sequence:** Hero ("Built with Distinction" / "Your Bayside Residential Builder", `SCROLL` cue) → intro paragraph → Projects (four, each client name + suburb: Durrant/Brighton, Cluden/Brighton, Crisp/Hampton, Victoria/Sandringham) → Services (four image cards linking to detail pages) → Why Choose Us (five principles) → FAQ (five, cost/approvals/timing/area/inclusions) → Contact (suburb, phone) → footer (nav, trade-body logo, agency credit).

1. **What makes it successful.** The agency's stated aim: "sophisticated, minimal, architecturally designed showcase" that works as "a digital extension of the brand" for both home owners and architects, built after competitor research. Four projects, quietly named, with images doing the work. A short FAQ answers real buyer questions directly (cost, approvals, timeline, service area).
2. **What should influence TORRE.** (a) A *curated* project rail of few items; (b) naming projects plainly (name + place); (c) question-led FAQ sections with direct answers (useful for AEO); (d) a small, unhurried number of sections.
3. **What should not be copied.** The live copy repeats suburb keyword lists ("Beaumaris builder, Black Rock builder, Hampton builder…") many times. That is keyword stuffing; the brief forbids it. Also: copying any imagery, layout or copy (the work is the agency's and client's).
4. **Layout patterns.** Image-led hero with a scroll cue; project tiles as image + name + place; service cards as image + title + one line; list-style "Why choose us".
5. **Animation patterns.** The agency states the site uses "a modern horizontal scrolling feature" that "creates a memorable experience". **How** — pinned vertical-to-horizontal mapping, native `overflow-x` rail, or a library — **is not determined by anything we could read.** The Webflow showcase tags the site `horizontal-scroll`, which suggests Webflow interactions (**Inferred**, low confidence).
6. **Typography.** *Not determinable.* (The agency's own site uses PP Neue Montreal — that is the agency's brand, not Cormack's.)
7. **Colour.** *Not determinable* from text.
8. **Homepage structure takeaway.** Short, confident, project-led. Horizontal movement is used for *browsing projects*, not as the page's organising principle.

**Design implication for TORRE (detail in `animation.md`):** horizontal browsing applies only to the projects rail. Because a pinned vertical-to-horizontal scroll is a form of scroll hijacking (the brief forbids it) the default is a native `overflow-x: auto` + `scroll-snap` rail, with the pinned variant an opt-in prototype for pointer-fine, motion-OK desktops.

---

## C — Massive Forms Studio (artistic direction)

Role: monumental typography, geometry, negative space, industrial atmosphere. **An important visual reference.**

**Fetched designer statement:** inspired by the series *Silo*, specifically "the scale, weight, and silence of massive concrete structures"; "strict minimalism and monumental presence"; focus on "negative space, visual balance, and grid precision — so the design feels like architecture: exact, cold, and honest. Minimal in form, heavy in tone." Built for a construction company specialising in large-scale concrete structures. Extracted palette: `#0A0A0A`, `#40403E`, `#9F9F9F`, `#F6F6F6`, `#81817E`.

1. **What makes it successful (author-stated).** A single idea carried through every decision: the site should feel as *permanent* as concrete. Restraint is the mechanism — few elements, large scale, rigorous grid.
2. **What should influence TORRE.** Type *scale* as the primary graphic element (huge headings against empty space); a visible, rigorous grid; near-monochrome neutrals; "exact and honest" as a tone; fewer elements per screen.
3. **What should not be copied.** The cold, black-heavy palette as-is (TORRE's brief is a *warm* architectural white with charcoal); any imagery-free approach — TORRE needs real photography to be credible; the concept's copy and layout. It is a design concept, not a live company with content obligations (forms, SEO, contact, accessibility). It must not be mistaken for a complete system.
4. **Layout patterns.** *(hypothesis — artwork not seen)* Oversized headline blocks offset on a column grid; ample empty fields; thin rules.
5. **Animation patterns.** *Not determinable.*
6. **Typography.** *(hypothesis)* A single tight grotesk at very large sizes with small uppercase labels. Confirm visually.
7. **Colour.** **Fetched palette:** near-black `#0A0A0A`, dark warm-grey `#40403E`, mid greys `#81817E` / `#9F9F9F`, off-white `#F6F6F6`. Useful as a *neutral ramp*; TORRE warms it (`#F4F3EF` background, `#202326` text — the brief's candidates).
8. **Homepage structure takeaway.** Few, huge, separated statements. Maps to the hero and the "numbered divisions" block.

---

## D — MEYERTON ENGINEERING (engineering-oriented corporate presentation)

Role: corporate identity, industrial language, information organisation, professional presentation.

**Fetched author description (Natalie Lebedeva):** Meyerton Engineering is "one of the largest carbon and stainless steel processing enterprises in South Africa… turnkey engineering projects under the motto 'MANUFACTURING EXCELLENCE'". The design is described as "a sleek interface, unconventional grid layout, bold typography and a restrained monochrome visual style". Tools: Figma, Photoshop, After Effects (motion), plus image-generation tools. It is a **concept**, not necessarily the company's live site.

**None of the imagery could be viewed.** Everything under points 4–8 is the author's description or a hypothesis.

1. **What makes it successful (author-stated).** A grid that is deliberately not the standard 12-column template, bold type and a monochrome palette that make heavy industry feel precise.
2. **What should influence TORRE.** (author-stated) An *unconventional but rigorous* grid; bold typography; restrained monochrome with one controlled accent; a motto-led identity ("MANUFACTURING EXCELLENCE") — i.e. one short, specific positioning line. TORRE's equivalent must be a *true* line, not a slogan.
3. **What should not be copied.** Any AI-generated imagery approach (the author lists Midjourney/Leonardo among tools) — TORRE must not use synthetic imagery to stand in for real projects; the motto; the layout or assets.
4. **Layout patterns.** *(hypothesis)* Asymmetric grid, large numerals/labels, image blocks cropped tightly against text.
5. **Animation patterns.** *(hypothesis)* After Effects use suggests motion studies; confirm what, if anything, animates.
6. **Typography.** *(hypothesis)* Heavy grotesk headings, small tracked labels.
7. **Colour.** Author: "restrained monochrome".
8. **Homepage structure takeaway.** *(hypothesis)* Hero with motto, capability blocks, project/plant imagery, contact. Confirm.

---

## E — NIKKEN corporate website redesign (refined corporate art direction)

Role: editorial composition, corporate visual language, typography, section organisation, image treatment, layout consistency.

**Fetched:** "NIKKEN — redesign corporate website", Anna Ivanova for UPROCK.DESIGN, 21 April 2022; fields: Web Design, Interaction Design, UI/UX; tags: *architectural design, branding, concept, corporate, logo design, redesign*; tools: Photoshop, XD, InDesign (InDesign suggests editorial/print-style layout thinking — **Inferred**). Ten image modules exist; the page carries **no written description**.

**No imagery viewed, no author narrative.** Treat every design claim below as a hypothesis to confirm.

1. **What makes it successful.** *(hypothesis)* Editorial composition: image and type treated as one layout, consistent margins and rhythm across sections.
2. **What should influence TORRE.** The *consistency* principle — one grid, one image-ratio set, one heading system across all pages — which is also the main defence against four brands drifting apart.
3. **What should not be copied.** Anything specific to the real NIKKEN company or to the designer's concept (logo, imagery, copy). It is a 2022 student/studio concept; treat it as inspiration only.
4–8. *(hypothesis)* Editorial grid; serif/sans pairing possible; quiet, high-quality photography; generous margins; section labels. **Confirm visually before use.**

---

## Reference comparison matrix

`✔` fetched · `~` author-stated · `?` hypothesis/unknown

| Dimension | A Flintco | B Cormack | C Massive Forms | D Meyerton | E Nikken |
|---|---|---|---|---|---|
| Type of artefact | Live corporate site ✔ | Live boutique-builder site ✔ | Design concept ✔ | Design concept ✔ | Design concept ✔ |
| Role for TORRE | Content & structure | Interaction | Art direction | Industrial identity | Editorial consistency |
| Hero | Statement + 2 CTAs + media ✔ | Statement + scroll cue ✔ | Monumental type ~ | Motto + grid ~ | ? |
| Business clarity in first screen | **High** ✔ | Medium–high ✔ | n/a (concept) | n/a | n/a |
| Colour mode | Light, one red accent ✔ | ? | Near-monochrome, cold ✔ | Monochrome ~ | ? |
| Accent | `#E71321` ✔ | ? | none ✔ | ? | ? |
| Typography | Condensed industrial + humanist body ✔ | ? | Large tight grotesk ? | Bold grotesk ? | Editorial ? |
| Content density | Medium; lists + stats ✔ | Low; few items ✔ | Very low ~ | Medium ? | Medium ? |
| Projects | Name + place list ✔ | 4 image tiles, name + suburb ✔ | n/a | ? | ? |
| Credibility | Numeric stats ✔ | Trade-body logo, text ✔ | n/a | Motto ~ | ? |
| Motion | Counters, video hero ✔/inferred | Horizontal scroll (mechanism unknown) ~ | ? | AE studies ? | ? |
| Mobile | Not assessed | Not assessed | n/a | n/a | n/a |
| Verification level | Medium (no visuals) | Medium (no mechanism) | Low–medium | **Low** | **Low** |
| **Take for TORRE** | Sequence, copy discipline, plain lists | Curated project rail, FAQ, naming | Scale, grid, negative space | One true positioning line, rigorous grid | One system across all pages |
| **Reject** | Slogans, invented stats, US metrics | Keyword stuffing | Cold palette, imagery-free | Synthetic imagery | Any specific asset |

---

## Homepage studies (opening → footer → mobile)

Each study records what was **Fetched** and what is **Not determinable**.

### 1 · Flintco homepage
- **Opening viewport:** H1 "All In. Always.", one-sentence descriptor, two CTAs, hero media; audio/keyboard hints. Skip-link first in DOM.
- **Navigation:** *Not determinable* from extracted markup (a keyboard "Press O for more options" overlay exists).
- **Hero composition:** statement left, full-bleed media (video suggested).
- **Typography:** condensed industrial headings, 60 px h1 / 49 px h2, 14 px body.
- **Content hierarchy:** eyebrow ("Our Services") → big H2 → italic-weight H3 subline → paragraph → links. Repeated across sections.
- **Image usage:** one inset image per narrative block; projects as a list.
- **Section transitions:** *Not determinable.* Counter animation on statistics.
- **Footer:** closing CTA band over image, logo mark, cookie preferences. Legal links not extracted.
- **Mobile adaptation:** *Not assessed.*

### 2 · Cormack Developments homepage
- **Opening viewport:** "Built with Distinction" eyebrow, "Your Bayside Residential Builder" H1, one-line descriptor, `SCROLL` cue.
- **Navigation:** Home · Projects · About · Services · Insights · Contact (Fetched).
- **Hero composition:** statement over image, scroll prompt.
- **Typography / colour:** *Not determinable.*
- **Content hierarchy:** hero → intro → projects → services → principles → FAQ → contact.
- **Image usage:** project and service images carry most of the page; high-quality architectural photography.
- **Section transitions:** horizontal movement is stated; mechanism unknown.
- **Footer:** nav repeat, Master Builders logo, copyright, agency credit.
- **Mobile adaptation:** *Not assessed.*

### 3 · Massive Forms Studio concept
- **Opening viewport / hero / nav / footer / mobile:** artwork not seen. The designer's text indicates a hero that is almost entirely scale + empty space.
- **Typography, hierarchy, transitions:** *(hypothesis)* see C above.
- **Image usage:** *not determinable*; the concept was designed for a concrete-structures builder so concrete/architectural photography is likely.

### 4 · MEYERTON Engineering homepage
- All fields **not determinable** (no imagery). Author-stated: unconventional grid, bold type, monochrome, "MANUFACTURING EXCELLENCE".

### 5 · NIKKEN homepage
- All fields **not determinable** (no imagery, no description).

---

## Synthesis → TORRE direction (summary; authoritative version is `docs/design.md`)

- **Foundation (A):** hero that states the business; sequence what-we-do → what-we-built → proof → contact; square-cornered, ruled lists; one restrained accent.
- **Art direction (C, D, E):** monumental type as the main graphic element; one rigorous grid for every page; neutrals warmed to "architectural white" and charcoal; numbered divisions; real photography, never synthetic.
- **Interaction (B):** a curated project rail; native horizontal browsing by default; no scroll hijack by default.
- **Original contribution:** four-division structure presented as a *system* (numbered 01–04 on a shared grid) — something none of the references needs but TORRE does.
