/**
 * Status elevation: two TORRE HOME buildings drawn from the client-supplied status (2026-11-07) —
 * Building 1 solid (completed), Building 2 solid with a hatched top (nearing completion). No percentages.
 */
export function Elevation({ alt, b1, b2 }: { alt: string; b1: string; b2: string }) {
  return (
    <svg className="elev" viewBox="0 0 640 480" preserveAspectRatio="xMinYMax meet" role="img" aria-label={alt}>
      <defs>
        <pattern id="win" width="30" height="34" patternUnits="userSpaceOnUse">
          <rect width="30" height="34" fill="var(--fg)" />
          <rect x="5" y="6" width="20" height="22" fill="var(--bg)" opacity="0.62" />
        </pattern>
        <pattern id="hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="12" height="12" fill="none" />
          <line x1="0" y1="0" x2="0" y2="12" stroke="var(--fg)" strokeWidth="1.2" />
        </pattern>
      </defs>
      <line x1="0" y1="420" x2="640" y2="420" stroke="var(--fg)" strokeWidth="1.5" />
      {/* Building 1: completed */}
      <rect x="20" y="70" width="250" height="350" fill="url(#win)" stroke="var(--fg)" strokeWidth="1.5" />
      {/* Building 2: top hatched, rest built */}
      <rect x="330" y="30" width="250" height="390" fill="none" stroke="var(--fg)" strokeWidth="1.5" />
      <rect x="330" y="30" width="250" height="120" fill="url(#hatch)" />
      <rect x="330" y="150" width="250" height="270" fill="url(#win)" stroke="var(--fg)" strokeWidth="1.5" />
      <text x="20" y="450" fill="var(--fg)" fontFamily="var(--font-text)" fontWeight="600" fontSize="12" letterSpacing="1.6">{b1.toUpperCase()}</text>
      <text x="330" y="450" fill="var(--fg)" fontFamily="var(--font-text)" fontWeight="600" fontSize="12" letterSpacing="1.6">{b2.toUpperCase()}</text>
    </svg>
  );
}
