# Research resources — verified findings

> **Status: COMPLETE (Milestone 0).** Each finding was read from the cited source on 2026-11-07 (Firecrawl extraction). Quotes are exact; paraphrases are marked.

| Resource | Purpose | URL |
|---|---|---|
| Google Search Central — SEO Starter Guide | Technical SEO fundamentals | https://developers.google.com/search/docs/fundamentals/seo-starter-guide |
| Google — AI features and your website | GEO / AI-search discoverability | https://developers.google.com/search/docs/appearance/ai-features |
| Google — Build and submit a sitemap | XML sitemaps | https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap |
| Google — Localized versions (hreflang) | Multilingual SEO | https://developers.google.com/search/docs/specialty/international/localized-versions |
| GSAP — ScrollTrigger docs | Animation | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| GSAP — Pricing / 3.13 release | Licensing | https://gsap.com/pricing/ · https://gsap.com/blog/3-13/ |
| Cormack Developments case study (emd:digital) | Interaction reference | https://www.emddigital.com.au/portfolio/cormack-developments |
| Kosovo Law No. 06/L-082 on Protection of Personal Data | Privacy / cookie obligations | see §6 |

## 1. Google — SEO Starter Guide

- Titles: "a good title is unique to the page, clear and concise, and accurately describes the contents of the page." Sources for title links include `<title>` and other headings.
- Descriptions: "A good meta description is short, unique to one particular page, and includes the most relevant points of the page." Snippets are sourced from page content.
- Headings: "Having your headings in semantic order is fantastic for screen readers, but from Google Search perspective, it doesn't matter if you're using them out of order." → we keep correct hierarchy for **accessibility**, not as a ranking lever.
- Links: "With appropriate anchor text, users and search engines can easily understand what your linked pages contain before they visit."
- Images: alt text "explains the relationship between the image and your content."
- URLs: include words useful to users; random identifiers are less helpful.
- Structured data: "Valid structured data… makes your pages eligible for many special features"; Google learns breadcrumbs from URL words but structured data can influence them.
- **Not used:** "Google Search doesn't use the keywords meta tag." No minimum or maximum content length ("no magical word count"). E-E-A-T: "Thinking E-E-A-T is a ranking factor? No, it's not."
- **Implication:** no keyword meta, no word-count padding, no keyword stuffing; invest in unique titles/descriptions, descriptive anchors, alt text, structured data matched to visible text.

## 2. Google — AI features and your website (GEO/AEO)

- "You can apply the same foundational SEO best practices for AI features as you do for Google Search overall… creating helpful, reliable, people-first content."
- "While specific optimization isn't required for AI Overviews and AI Mode, all existing SEO fundamentals continue to be worthwhile."
- Eligibility: "a page must be indexed and eligible to be shown in Google Search with a snippet, fulfilling the Search technical requirements. **There are no additional technical requirements.**"
- Structured data guidance on that page: "Making sure your structured data matches the visible text on the page."
- Controls: robots.txt directives for Googlebot are the crawl control; `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex` limit what is shown; `Google-Extended` limits some AI training/grounding in other Google systems.
- The page **does not mention `llms.txt` or any AI-specific file or markup.**
- **Implication:** GEO for Google = excellent, indexable, snippet-eligible, factual pages with matching structured data. `llms.txt` is optional, cheap, **and carries no documented Google benefit**; we implement it as a courtesy resource for other agents and never claim it improves visibility (per the brief).

## 3. Google — sitemaps

- Limits: "a single sitemap to 50MB (uncompressed) or 50,000 URLs" — we will be far below.
- "Use fully-qualified, absolute URLs"; "The sitemap file must be UTF-8 encoded."
- **"Google ignores `<priority>` and `<changefreq>` values."** The current `sitemap.ts` sets both → remove.
- "Google uses the `<lastmod>` value if it's consistently and verifiably… accurate." The current build-time `new Date()` is not → use real per-route content dates or omit.
- Submission: Search Console Sitemaps report, the API, or a `Sitemap:` line in robots.txt. Sitemap index optional.
- Localized variants may be provided in the sitemap via Google-supported extensions (details in §4).
- *Not verified from this page:* whether a sitemap may list URLs on **other hostnames**. The sitemaps.org protocol scopes a sitemap to its own location; cross-host listing requires cross-submission/ownership verification. The current single-sitemap-for-five-hosts design should not be preserved; under D-001 option B it disappears (one host), under option A each host serves its own.

## 4. Google — localized versions (hreflang)

- "Each language version must list itself **as well as** all other language versions."
- "If two pages don't both point to each other, the tags will be ignored."
- Fallback: `x-default` "especially on language/country selectors or auto-redirecting home pages."
- Codes: ISO 639-1 language, optional ISO 3166-1 Alpha-2 region.
- Sitemap method: one `<loc>` per URL with `<xhtml:link>` children listing every variant including itself.
- *The page does not discuss canonical interplay* — standard practice (self-referencing canonicals per language version) is documented in `seo.md` as our policy, not as a Google quote.
- Applies only if D-002 approves a second language.

## 5. GSAP and ScrollTrigger

- ScrollTrigger: "Scrub, pin, snap, or just trigger anything scroll-related". Pinning: "Setting `pin: true` will cause it to pin the `trigger` element"; padding is added automatically (disable with `pinSpacing: false`).
- Scrub: "Links the progress of the animation directly to the scrollbar… You can apply smoothing."
- Horizontal sections: "A popular effect is to create horizontally-moving sections that are tied to vertical scrolling but since that horizontal movement isn't a native scroll, a regular ScrollTrigger can't know when… an element comes into view horizontally, so you must tell ScrollTrigger… `containerAnimation: yourTween`."
- Responsive/accessibility hook: "**Responsive** - use the `matchMedia()` method to create different setups for various screen sizes using standard media queries." (We use it for `prefers-reduced-motion`, `pointer`, and width.)
- `normalizeScroll`: forces scrolling onto the JS thread — **we will not use it** (it is a scroll-hijacking technique).
- React: "Make sure to do proper cleanup" (use `useGSAP`/`gsap.context` and `ScrollTrigger.kill`).
- **Licensing (Fetched, gsap.com/pricing, gsap.com/blog/3-13 and webflow.com):** "GSAP is now 100% free for all users… including the previously paid Club plugins… We're also expanding the standard license to cover commercial use." SplitText, ScrollTrigger, Flip etc. are in the main npm package. → No licence cost or procurement step. (Terms may change; re-check at implementation.)
- The docs page itself carried a `googlebot: noindex,indexifembedded` robots meta — irrelevant to us.

## 6. Kosovo data protection

- **Law No. 06/L-082 on Protection of Personal Data** is Kosovo's applicable law (Fetched via DLA Piper and OneTrust DataGuidance summaries; entered into force in early 2019 — sources differ on the exact day, 13 Feb vs 12 Mar 2019, so we state only "2019"). A law-firm site in Pristina publishes a cookie policy citing it.
- The brief mentions GDPR "applicable to the business". GDPR applies by extraterritorial scope only if TORRE targets people in the EU/EEA; its audience is in Kosovo, and visitors from the diaspora do not by themselves trigger that. **This is a legal conclusion — confirm with counsel (open item in `content.md`).**
- **Plan:** treat the Kosovo law and EU-style principles as the baseline: collect minimum data, state purpose and retention, no non-essential cookies without consent, privacy-conscious analytics, a real (not templated) privacy policy.

## 7. Cormack case study (emd:digital)

See `references.md` §B for the full analysis. Key verified statements: the site is "Sophisticated, minimal, architecturally designed"; delivered "alongside a modern horizontal scrolling feature"; "competitor research phase" preceded design; built on Webflow; positioned for "both home owners and architects".
