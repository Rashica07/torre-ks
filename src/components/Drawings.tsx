/**
 * Line drawings (docs/design.md §5.8). Illustrations of scope, never claims of work done: each carries a visible
 * "illustration" note on its page. Stroke uses currentColor so the surface decides contrast.
 */
const S = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

function Callout({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill="var(--bg)" stroke="currentColor" strokeWidth="2" />
      <text x={x} y={y + 6} textAnchor="middle" fontFamily="var(--font-display)" fontSize="18" fill="currentColor">{n}</text>
    </g>
  );
}

/** MAGFA: a house in section. Numbers 1–6 match the legend on the page. */
export function HouseSection({ alt }: { alt: string }) {
  return (
    <svg className="draw house" viewBox="0 0 900 560" role="img" aria-label={alt}>
      <g {...S}>
        <path pathLength={1} d="M20 480 H880" />
        <path pathLength={1} d="M120 480 V470 H780 V480" />
        <path pathLength={1} d="M150 470 V190 H750 V470" />
        <path pathLength={1} d="M150 330 H750" />
        <path pathLength={1} d="M110 200 L450 50 L790 200" />
        <path pathLength={1} d="M130 190 H770" />
        <path pathLength={1} d="M640 120 V80 H690 V160" />
        <path pathLength={1} d="M180 240 H300 V300 H180 Z M240 240 V300" />
        <path pathLength={1} d="M520 240 H640 V300 H520 Z M580 240 V300" />
        <path pathLength={1} d="M180 380 H300 V440 H180 Z" />
        <path pathLength={1} d="M600 470 V372 H690 V470" />
        <path pathLength={1} d="M330 330 V470 M330 340 H380 V380 H430 V420 H470 V470" />
        <path pathLength={1} d="M380 190 V150 H520 V190" />
        <path pathLength={1} d="M20 520 H880 M20 510 V530 M880 510 V530 M450 510 V530" />
      </g>
      <Callout n={1} x={450} y={260} />
      <Callout n={2} x={450} y={100} />
      <Callout n={3} x={240} y={270} />
      <Callout n={4} x={410} y={440} />
      <Callout n={5} x={450} y={500} />
      <Callout n={6} x={645} y={420} />
    </svg>
  );
}

/** SWISSTECH: window and door types W1–W6 drawn as a facade elevation. */
export function WindowTypes({ alt, active, onPick }: { alt: string; active: number | null; onPick?: (i: number | null) => void }) {
  const cell = (i: number) => ({ x: 20 + (i % 3) * 300, y: 20 + Math.floor(i / 3) * 280 });
  const common = (i: number) => ({
    onMouseEnter: onPick ? () => onPick(i) : undefined,
    onMouseLeave: onPick ? () => onPick(null) : undefined,
    className: active === i ? "wt is-active" : "wt",
  });
  return (
    <svg className="draw wintypes" viewBox="0 0 920 580" role="img" aria-label={alt}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const { x, y } = cell(i);
        return (
          <g key={i} transform={`translate(${x} ${y})`} {...common(i)}>
            <rect width="280" height="260" className="wt__bg" />
            <g {...S}>
              {i === 0 && (<><rect x="50" y="40" width="180" height="180" /><rect x="64" y="54" width="152" height="152" /><path d="M64 206 L140 54 L216 206" /></>)}
              {i === 1 && (<><rect x="30" y="50" width="220" height="160" /><path d="M140 50 V210 M30 130 H250" /><rect x="40" y="60" width="90" height="60" /><rect x="150" y="60" width="90" height="60" /></>)}
              {i === 2 && (<><rect x="70" y="20" width="140" height="220" /><rect x="84" y="34" width="112" height="192" /><circle cx="186" cy="132" r="5" /></>)}
              {i === 3 && (<><rect x="20" y="30" width="240" height="200" /><path d="M20 80 H260 M20 130 H260 M20 180 H260 M100 30 V230 M180 30 V230" /></>)}
              {i === 4 && (<><rect x="30" y="20" width="220" height="220" /><rect x="70" y="60" width="140" height="140" /><path d="M30 20 L70 60 M250 20 L210 60 M30 240 L70 200 M250 240 L210 200" /></>)}
              {i === 5 && (<><rect x="50" y="40" width="180" height="180" /><circle cx="140" cy="130" r="48" /><path d="M140 130 L172 98 M126 144 L100 170" /></>)}
            </g>
            <text x="14" y="248" fontFamily="var(--font-display)" fontSize="22" fill="currentColor">W{i + 1}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** TORRE DI UMBRIA is drawn from HTML slabs (see UmbriaLayers); About uses this tower: ground = 1981, four floors = the companies. */
export function TowerTimeline({ alt }: { alt: string }) {
  return (
    <svg className="draw tower-tl" viewBox="0 0 360 620" role="img" aria-label={alt}>
      <g {...S}>
        <path d="M0 580 H360" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="80" y={40 + i * 120} width="200" height="120" />
            <path d={`M80 ${100 + i * 120} H280 M140 ${40 + i * 120} V${160 + i * 120} M200 ${40 + i * 120} V${160 + i * 120} M260 ${40 + i * 120} V${160 + i * 120}`} opacity="0.5" />
          </g>
        ))}
        <path d="M80 540 H280" />
        <path d="M30 580 V520" />
      </g>
      <text x="14" y="610" fontFamily="var(--font-display)" fontSize="26" fill="currentColor">1981</text>
      <text x="300" y="70" fontFamily="var(--font-display)" fontSize="20" fill="currentColor">4</text>
    </svg>
  );
}
