/**
 * The TORRE wordmark window (docs/design.md §5.1): SVG text in Anton filled with the TORRE HOME photograph, so each
 * letter is a window onto the building. The visible wordmark is aria-hidden; the page's <h1> carries the real text.
 * Sizes come from Anton's measured metrics: "TORRE" is 2.247 em wide, cap height 0.859 em. Desktop: one row,
 * font-size 530 with the spacing distributed to a 1312-unit width. Mobile: two rows (TOR / RE).
 */
const IMG = "/images/torrehome/wordmark-fill.webp";

export function Wordmark() {
  return (
    <>
      <link rel="preload" as="image" href={IMG} type="image/webp" />
      <svg className="hero__wm" viewBox="0 0 1312 470" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="wm-d" patternUnits="userSpaceOnUse" width="1312" height="470">
            <rect width="1312" height="470" fill="#9aa3ad" />
            <image href={IMG} x="0" y="-300" width="1312" height="1250" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <text x="0" y="462" fontFamily="Anton, Impact, sans-serif" fontSize="530" textLength="1312" lengthAdjust="spacing" fill="url(#wm-d)">
          TORRE
        </text>
      </svg>
      <svg className="hero__wm hero__wm--m" viewBox="0 0 354 440" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="wm-m" patternUnits="userSpaceOnUse" width="354" height="440">
            <rect width="354" height="440" fill="#9aa3ad" />
            <image href={IMG} x="-30" y="-60" width="440" height="600" preserveAspectRatio="xMidYMid slice" />
          </pattern>
        </defs>
        <text x="0" y="206" fontFamily="Anton, Impact, sans-serif" fontSize="240" textLength="354" lengthAdjust="spacing" fill="url(#wm-m)">
          TOR
        </text>
        <text x="0" y="432" fontFamily="Anton, Impact, sans-serif" fontSize="240" textLength="228" lengthAdjust="spacing" fill="url(#wm-m)">
          RE
        </text>
      </svg>
    </>
  );
}
