# Design direction artefacts ("Fasada")

> **Status: PROPOSED — for the owner's approval (Gate 0).** Static, not the website.

| Path | What it is |
|---|---|
| `wireframes/home-desktop.svg` · `.png` | Annotated low-fidelity homepage wireframe, desktop 1440 (scale 40 %). Open the `.svg` in a browser for sharp text |
| `wireframes/home-mobile.svg` · `.png` | Annotated mobile wireframe (390), designed rather than compressed |
| `concept/index.html` | **Hi-fi static concept board** with TORRE's real TORRE HOME renders and verified facts only. Open it in a browser (desktop and phone widths). Fonts are the self-hosted Anton + Instrument Sans in `concept/fonts/` |
| `concept/previews/*.jpg` | Pre-rendered screenshots of each section (01 hero · 02 plate · 03 statement · 04 four towers · 05 project status · 06 image row · 07 monoliths · 08 contact · 09 mobile) |

The concept board proves two technical ideas: an SVG text wordmark filled with an image (no clipping, scales with width, real `<h1>` text kept separately for assistive technology) and Anton's measured metrics driving the sizes. It is not production code. Text is Albanian; English follows once approved.
