type P = { className?: string };
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export const IconPhone = ({ className }: P) => (
  <svg {...base} className={className}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const IconMenu = ({ className }: P) => (
  <svg {...base} className={className}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);
export const IconClose = ({ className }: P) => (
  <svg {...base} className={className}><path d="M5 5l14 14M19 5L5 19" /></svg>
);
export const IconChevron = ({ className }: P) => (
  <svg {...base} width={16} height={16} className={className}><path d="M6 9l6 6 6-6" /></svg>
);
export const IconArrow = ({ className }: P) => (
  <svg {...base} width={18} height={18} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
