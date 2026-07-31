/**
 * Three design directions, compared side by side before one is adopted site-wide.
 *
 * A variant is deliberately more than a colour swap: `sectionStyle` drives
 * structurally different layouts per section so the three don't collapse into
 * the same repeated eyebrow -> heading -> card-grid rhythm.
 */

export const DESIGN_VARIANTS = ["editorial", "minimal", "architectural"] as const;
export type DesignVariantId = (typeof DESIGN_VARIANTS)[number];

export type MotionLevel = "minimal" | "subtle" | "cinematic";

/** How a section lays its content out. Components branch on this. */
export type SectionStyle = "stacked" | "split" | "offset" | "banded";

export type DesignVariant = {
  id: DesignVariantId;
  label: string;
  description: string;

  /** Display face for headings. */
  displayFont: "display" | "serif";
  /** Heading size token from the type scale. */
  headingSize: "step-3" | "step-4" | "step-5";
  /** Whether section headings keep the trailing period of the original design. */
  headingPeriod: boolean;
  /** Uppercase wide-tracked eyebrow, or sentence-case lead-in. */
  eyebrowStyle: "caps" | "numeral" | "none";

  /** Vertical rhythm between sections. */
  sectionPadding: string;
  /** Corner treatment. */
  radius: string;
  /** Card chrome: boxed borders, hairline rules, or elevation on hover. */
  cardStyle: "boxed" | "ruled" | "raised";
  /** Per-section layout treatment. */
  sectionStyle: Record<"services" | "pourquoi" | "process" | "testimonials" | "gallery", SectionStyle>;
};

export const VARIANTS: Record<DesignVariantId, DesignVariant> = {
  editorial: {
    id: "editorial",
    label: "Editorial luxury",
    description: "Asymmetric, serif display, generous whitespace, image-led.",
    displayFont: "serif",
    headingSize: "step-5",
    headingPeriod: false,
    eyebrowStyle: "caps",
    sectionPadding: "var(--space-10) 0",
    radius: "var(--radius-sm)",
    cardStyle: "ruled",
    sectionStyle: {
      services: "offset",
      pourquoi: "split",
      process: "stacked",
      testimonials: "offset",
      gallery: "banded",
    },
  },
  minimal: {
    id: "minimal",
    label: "Refined minimal",
    description: "Current structure, disciplined scale, soft elevation.",
    displayFont: "display",
    headingSize: "step-3",
    headingPeriod: true,
    eyebrowStyle: "caps",
    sectionPadding: "var(--space-9) 0",
    radius: "var(--radius)",
    cardStyle: "raised",
    sectionStyle: {
      services: "stacked",
      pourquoi: "split",
      process: "stacked",
      testimonials: "stacked",
      gallery: "stacked",
    },
  },
  architectural: {
    id: "architectural",
    label: "Bold architectural",
    description: "Heavy type, visible grid, full-bleed alternating blocks.",
    displayFont: "display",
    headingSize: "step-4",
    headingPeriod: false,
    eyebrowStyle: "numeral",
    sectionPadding: "var(--space-8) 0",
    radius: "0px",
    cardStyle: "boxed",
    sectionStyle: {
      services: "banded",
      pourquoi: "banded",
      process: "split",
      testimonials: "banded",
      gallery: "offset",
    },
  },
};

/** Multiplier applied to the CSS motion duration tokens. */
export const MOTION_SCALE: Record<MotionLevel, number> = {
  minimal: 0,
  subtle: 1,
  cinematic: 1.9,
};

export function isDesignVariant(value: string): value is DesignVariantId {
  return (DESIGN_VARIANTS as readonly string[]).includes(value);
}
