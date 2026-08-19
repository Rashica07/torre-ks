import type { BrandId } from "@/lib/brands";

/**
 * Small navbar logomark, one per brand — a literal geometric reference to
 * what that company actually builds, not generic clip art. Line style
 * matches the lucide-react icons used everywhere else on the site.
 */
export function BrandMark({
  id,
  size = 20,
  color = "currentColor",
}: {
  id: BrandId;
  size?: number;
  color?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    // Roofline — home construction.
    case "magfa":
      return (
        <svg {...common}>
          <path d="M4 13 L12 6 L20 13" />
          <path d="M7 13 V19 H17 V13" />
        </svg>
      );
    // Four-pane window — window & facade manufacturing.
    case "swisstech":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M12 4 V20 M4 12 H20" />
        </svg>
      );
    // Skyline of three — multi-building residential development.
    case "torre-umbria":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="4" height="9" />
          <rect x="10" y="6" width="4" height="13" />
          <rect x="16" y="13" width="4" height="6" />
          <path d="M3 19 H21" />
        </svg>
      );
    // Two adjacent buildings — the two real Torre Home buildings in Ferizaj.
    case "torrehome":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="7" height="11" />
          <rect x="13" y="5" width="7" height="15" />
        </svg>
      );
  }
}
