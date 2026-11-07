# Animation system

> **Status: PARTIALLY SUPERSEDED by the "Fasada" direction (2026-11-07) — see §0 below, which wins wherever it conflicts with §1–§9.** What exists in code today is the M1 motion (reveal fix, row invert, nav sheet, reduced-motion rules); the M1 visual layer it animates is being replaced. Nothing in §0 is implemented yet.
> Last updated: 2026-11-07 · Evidence: `research/resources.md` §5, `research/references.md` §A–B

## 0. Motion for "Fasada" (authority: `design.md` §7; supersedes §1–§5 where they differ)

**Dropped:** the pinned vertical-to-horizontal GSAP "rail" prototype (the staggered image row is native scroll), count-up numerals (none exist), the M1 fade-up-on-everything reveal, the division-row invert. **GSAP is not installed.** Cormack's technique (Lenis smooth scroll + a pinned page-wide 14,616 px track — verified from its DOM, `research/references-visual.md`) is explicitly rejected: it replaces native scroll.

| # | Interaction | Tech | Trigger | Timing | Fallback / reduced motion |
|---|---|---|---|---|---|
| 1 | Photograph drifts inside the TORRE letters | CSS scroll-driven `animation-timeline: scroll()` on the SVG `<image>` (`translateY`) | Page scroll over the hero | Linear with scroll, ≤ 60 px travel | Static image position |
| 2 | Plate expands from the letter-windows to full-bleed | CSS scroll-driven `clip-path: inset()` with `animation-timeline: view()` | Plate enters the viewport | Tied to scroll over ~60 % of its entry | Plate is simply full-bleed and visible |
| 3 | Tower widens | CSS `flex-grow` transition | `:hover`, `:focus-within` (≥ 1024 px, pointer: fine) | 280 ms `--ease-in-out` | No change in size; all text already visible |
| 4 | Floor-rail marker follows the section in view | IntersectionObserver sets `aria-current`; CSS colour transition | Section crosses 50 % | 160 ms | Instant |
| 5 | Menu overlay | Native `<dialog>` + CSS slide/fade | Button | 280 ms `--ease-out` | Instant |
| 6 | Company-page hero drawings (MAGFA house, SWISSTECH windows, UMBRIA slabs) | CSS stroke-draw / slab slide-in via `view()` timelines | Enter viewport | 560–900 ms | Drawn/final state, no motion |
| 7 | Button arrow cell nudge | CSS transform | `:hover`/`:focus-visible` | 160 ms | None |

**Rules (unchanged and still binding):** transform / opacity / clip-path only; never hide content behind JS (hidden states only inside `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`); no scroll hijack; reduced-motion removes all of the above; **scroll-driven CSS is progressive enhancement** — browsers without `animation-timeline` (feature-checked with `@supports`; support must be re-verified at build time) get the static state, and a Playwright test asserts the static fallback is complete.

## 1. Decision: CSS-first; GSAP only if the rail prototype earns it

The brief says to use CSS for simple interactions and GSAP "only where its capabilities materially improve the experience". Applying that honestly:

| Need | Best tool | Why |
|---|---|---|
| Hover, focus, header border, nav sheet, division-row invert | **CSS** | Transitions on `transform`/`opacity`/`clip-path`/colour. No JS. |
| Hero headline reveal | **CSS** (words split at build time; per-word `animation-delay: calc(var(--i) * 60ms)`) | Runs without JS, no flicker, no layout shift, works for Albanian diacritics. SplitText would only be needed to split by *rendered line*, which we do not need. |
| Section/image reveal on scroll | **CSS + IntersectionObserver** (existing `useReveal` pattern, fixed — see §4) with optional `animation-timeline: view()` enhancement under `@supports` | Cheap, no scroll listeners. |
| Image mask reveal | **CSS** `clip-path: inset()` transition | GPU-friendly. |
| Horizontal project browsing | **Native `overflow-x: auto` + `scroll-snap`** (default) | Keyboard/touch/AT-safe; no hijack. |
| Pinned vertical-to-horizontal project rail (optional) | **GSAP ScrollTrigger** (`pin`, `scrub`, `containerAnimation`) | The one thing CSS cannot do well. Prototype in M3 (D-008). |

**Therefore GSAP is a conditional dependency.** It is installed only if the M3 prototype is judged clearly better than the native rail by the owner. If not, GSAP is never added and `framer-motion` is removed (D-013). Licence is not a barrier: GSAP including ScrollTrigger and SplitText is free for commercial use (Fetched, `gsap.com/pricing`, `gsap.com/blog/3-13`).

## 2. Principles

1. **Never delay content.** Text and images are visible in the first paint. Animation may *enhance* arrival; nothing is hidden behind JS.
2. **Respect the user.** `prefers-reduced-motion: reduce` removes all movement (§6).
3. **No scroll hijacking.** Page scroll speed/direction/momentum are never altered. No `normalizeScroll`, no smooth-scroll libraries, no wheel interception. The pinned rail (if built) only maps *its own pinned section's* scroll distance to horizontal travel and is disabled on touch, small screens and reduced motion.
4. **Purposeful.** Each animation explains structure (what is new, what is related) — no decorative loops (the current Ken Burns image loop is removed).
5. **Cheap.** Animate only `transform`, `opacity`, `clip-path`. Never `width/height/top/left/margin`. No scroll event listeners; use IntersectionObserver or CSS scroll-driven animation.
6. **Touch-first.** Everything usable without hover; hover effects have `:focus-visible` equivalents.
7. **Quiet.** Ease-out, short, one thing at a time.

## 3. Motion tokens

```css
:root {
  --dur-instant: 80ms;   /* press feedback */
  --dur-fast:    160ms;  /* hover, focus, colour */
  --dur-base:    280ms;  /* panels, row invert, nav sheet */
  --dur-slow:    560ms;  /* reveals */
  --dur-hero:    900ms;  /* hero word mask (one-time) */
  --ease-out:    cubic-bezier(0.22, 1, 0.36, 1);   /* existing token, kept */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);   /* existing token, kept */
  --stagger:     60ms;   /* per word / per list item, max 8 steps */
  --reveal-distance: 12px;
}
```
GSAP defaults (only if installed): `gsap.defaults({ ease: "power3.out", duration: 0.56 })` (≈ `--ease-out`). Tokens are the single source: JS reads them via `getComputedStyle`, never re-declares numbers.

The existing `--motion-scale` per-brand multiplier is **removed** (one system; D-004).

## 4. Inventory

| # | Interaction | Tech | Trigger | Duration / easing | Reduced motion | Touch / mobile |
|---|---|---|---|---|---|---|
| 1 | Hero headline word-mask | CSS keyframes | Page load, once | `--dur-hero`, `--ease-out`, stagger `--stagger` (≤ 8 words animate; rest instant) | Static, fully visible | Same |
| 2 | Hero image band reveal | CSS `clip-path` | Load | `--dur-hero` | Static | Same |
| 3 | Section/label/text reveal | CSS + IO | Enters viewport (`rootMargin: 0 0 -10% 0`), once | `--dur-slow`, translate `--reveal-distance` + fade | No transform, no fade | Same |
| 4 | Division row hover/focus invert + preview image | CSS | `:hover`, `:focus-visible` | `--dur-base`, `--ease-in-out` | Instant colour swap, no motion | Hover absent; focus-visible and tap states; preview inline < 1024 px |
| 5 | Header border on scroll | CSS class via IO sentinel (no scroll listener) | 8 px scroll | `--dur-fast` | Instant | Same |
| 6 | Mobile nav sheet | CSS + `<dialog>`/inert | Button | `--dur-base` slide/fade | Fade only → instant | Same |
| 7 | Link/button states | CSS | Hover/focus/active | `--dur-fast` | Colour only | Active state on tap |
| 8 | Project rail (default) | Native scroll-snap + buttons (`scrollBy({behavior:"smooth"})` only when motion allowed) | User scroll/swipe/arrows | Browser-native | `behavior: "auto"` | Native swipe |
| 9 | Project rail (pinned prototype) | **GSAP ScrollTrigger** `pin`, `scrub: 0.5`, `containerAnimation` | Section reaches top; **only** `(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)` | Pin length = track overflow (capped at 2 × viewport height) | Not created | Not created (native rail) |
| 10 | Form success/error | CSS fade | Submit result | `--dur-base` | Instant | Same |

**Removed from current site:** Ken Burns infinite image loop; odometer counters (`OdometerDigits`, uses framer-motion); typing-dot chat bubbles (`ContactIntake`) — replaced by a standard form.

## 5. Scroll interaction detail

### 5.1 Reveal (fixing a present defect)
Today `.reveal` is `opacity: 0` in plain CSS; without JS the content never appears (see `research/existing-site-audit.md` §4). Target:

```css
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  .reveal { opacity: 0; transform: translateY(var(--reveal-distance)); transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out); }
  .reveal[data-visible="true"] { opacity: 1; transform: none; }
}
```
So the hidden state exists only when scripting is on **and** motion is allowed. The observer additionally sets everything visible after a 2 s safety timeout and when `IntersectionObserver` is missing. Above-the-fold content never uses `.reveal`.

### 5.2 Optional CSS scroll-driven enhancement
Under `@supports (animation-timeline: view())`, images may use `animation: reveal linear both; animation-timeline: view(); animation-range: entry 0% entry 60%;`. Where unsupported: nothing animates and the image is simply visible. (Browser support is checked at implementation time; it is an enhancement only.)

### 5.3 Pinned rail (conditional — D-008)
Behaviour if built: section pins at the top, track translates `x` from 0 to `-(trackWidth - viewportWidth)` scrubbed to scroll, `pinSpacing` on, `anticipatePin: 1`; per-tile reveals use `containerAnimation`. Guards: created inside `gsap.matchMedia()` with the exact media query above; torn down on change; `ScrollTrigger.refresh()` after fonts and images load; cleanup with `useGSAP`/`gsap.context().revert()`; keyboard users and AT use the same DOM (all tiles are links in DOM order, visible focus scrolls the tile into view and the pin position follows via `scrollIntoView` handler); a visible "Shiko të gjitha projektet" link bypasses the section. **Acceptance for shipping it:** no CLS, INP unaffected (Lighthouse + manual), no jank at 6× CPU throttle in DevTools, and owner prefers it to the native rail. Otherwise it is deleted.

## 6. Reduced motion

Global rule (kept from the current site, tightened):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```
Plus: GSAP only inside `matchMedia("(prefers-reduced-motion: no-preference)")`; `scrollBy` uses `behavior: "auto"`; no auto-advancing anything.

Also: no animation lasts > 5 s without a pause control (WCAG 2.2.2); nothing flashes (2.3.1).

## 7. Performance

- Budget (targets, not measurements): no long tasks > 50 ms caused by animation setup; no layout thrash; CLS contribution from motion = 0 (reserve space; `transform` only).
- `will-change` only on elements currently animating (set/removed by the reveal observer), never globally.
- Single IntersectionObserver per component class; unobserve after reveal.
- GSAP (if installed): dynamic `import()` in a client component rendered only on routes that need it, `ScrollTrigger` registered once; never in the root layout.
- Verify in M6 with Chrome Performance panel at 4× CPU throttle and Lighthouse INP/TBT.

## 8. Testing

- Playwright: with `reducedMotion: "reduce"` assert no element has non-zero `transform` after load and all `.reveal` are visible.
- Playwright with JavaScript disabled: all text content visible and all links usable.
- Manual: keyboard through the rail; VoiceOver/NVDA read order; throttled CPU; real Android and iOS device for scroll-snap behaviour.

## 9. Current state (for comparison)

**Before M1:** `useReveal` + `.reveal` (CSS-hidden until JS), `fadeUp` / `messageIn` / `typingDot` / `kenburns` keyframes, `framer-motion` in `Navbar` and `OdometerDigits`, per-brand `--motion-scale`. **After M1:** `Reveal` component + `motion.css` as described in §5.1; the listed old animations and `framer-motion` are gone; no GSAP.
