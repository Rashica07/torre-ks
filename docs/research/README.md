# Research folder

> **Status: COMPLETE for Milestone 0 (research). Findings only — nothing here is implemented.**
> Last updated: 2026-11-07

This folder holds the evidence behind every decision in `docs/`. Nothing in the other documents should contradict what is written here; if it does, this folder wins until the contradiction is resolved in `docs/decisions.md`.

| File | Contents |
|---|---|
| [`existing-site-audit.md`](./existing-site-audit.md) | What torre-ks.com and its four brand subdomains actually are today: pages, content, SEO, forms, mobile, stack, baseline build. |
| [`references-visual.md`](./references-visual.md) | **Current.** What the five references actually do visually, corrections to the earlier text-only study, and how each is translated into TORRE. |
| [`references.md`](./references.md) | *Superseded for visual claims.* The earlier text-based analysis, comparison matrix and homepage studies — kept for the structural notes. |
| [`m1-audit.md`](./m1-audit.md) | Audit of the Milestone 1 frontend: the 12 old patterns it reused and what is kept or deleted. |
| [`resources.md`](./resources.md) | Verified findings from Google Search Central, Google sitemap/hreflang docs, GSAP ScrollTrigger and GSAP licensing, plus Kosovo data-protection law. |

## Method and evidence labels

Every factual statement in this folder carries one of these labels, either inline or by section:

| Label | Meaning |
|---|---|
| **Fetched** | Read directly from the live page or document during this research (Firecrawl text extraction on 2026-11-07, or the repository on disk). |
| **Client-supplied** | Stated in the repository's own commit history as supplied/confirmed by the client (e.g. "real contact block", "honest 1999 founding story", "real factory address"). Not independently verifiable by us. |
| **Unverified** | Present on the current site or in the repo data but with no evidence of provenance. Must be confirmed before it is republished. |
| **Inferred** | A conclusion drawn from fetched material. Reasoning is shown. |

## Limitations (read before relying on the reference analysis)

0. **UPDATE 2026-11-07 — the owner approved network access to the reference hosts and the references were then actually viewed.** See `references-visual.md` for what was seen, the remaining limits (Flintco's webfonts did not load in the capture; the live Cormack page stayed on its preloader because its script CDNs are not allowed, so the agency's case-study screens and the DOM were used; Behance project pages return 403, so only the cover of Meyerton and the nine Nikken modules were viewable), and the corrections to `references.md`.
1. **(Historical — resolved above) No pixel-level inspection of the five reference sites or the Behance/Dribbble imagery.** The sandbox network policy blocks direct access to `flintco.com`, `cormackdevelopments.com.au`, `webflow.io`, `behance.net`/`mir-s3-cdn-cf.behance.net`, `dribbble.com` CDNs, `gsap.com` and `developers.google.com`. Firecrawl (text/markup extraction through a separate service) was the only channel. We did not route around the block. Consequences:
   - Flintco, Cormack and Massive Forms analyses rest on extracted page text, structure, branding metadata and the designers' own written case studies.
   - **MEYERTON and NIKKEN were not seen visually.** Behance pages returned only titles, descriptions, tags and image URLs (the images could not be downloaded). Their entries in `references.md` are limited to what the authors wrote plus what the brief says to study, and are labelled accordingly.
   - **How the Cormack horizontal scroll is built (pinned/scrubbed vs native overflow, which library) is not determined.** The agency states that it uses "a modern horizontal scrolling feature"; nothing more is verified.
   - Closing this gap requires allowing those hosts for the session (a user decision — see `docs/decisions.md` D-010) and a Playwright pass at 1440 px and 390 px.
2. **No keyword-volume data.** The marketing-plugin SEO tools (Ahrefs, Similarweb, Semrush-class) failed to connect in this session. `docs/seo.md` therefore lists *intent-based keyword themes*, not volumes, and says so.
3. **The existing site was screenshot locally** (Playwright against `next dev`, 1440 px and 390 px) rather than from production, because production hosts are blocked. Content equivalence with production was checked against the Firecrawl extraction of the live pages. Below-the-fold sections of the brand pages were not reliably captured (they reveal on scroll); only heroes and the group hub were reviewed visually.
4. **No Lighthouse / Core Web Vitals baseline** was taken (it needs the same network access or a deployed preview). Only `tsc` and `next build` were run. Do not quote performance numbers for the current site.
