"use client";
import type { Brand, SectionKey } from "@/lib/brands";
import { MOTION_SCALE, type DesignVariantId } from "@/lib/design-variants";
import { DesignProvider } from "@/lib/design-context";
import { Navbar } from "./Navbar";
import { BrandHero } from "./BrandHero";
import { ServicesBento } from "./ServicesBento";
import { Gallery } from "./Gallery";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CtaFooter } from "./CtaFooter";
import { Pourquoi } from "./Pourquoi";
import { Process } from "./Process";

const NAV_LABELS: Record<SectionKey, string> = {
  services: "Shërbimet",
  pourquoi: "Pse Ne",
  process: "Procesi",
  gallery: "Galeria",
  testimonials: "Dëshmitë",
  faq: "Pyetje",
};

export function BrandPage({
  brand,
  variant,
  simplified,
}: {
  brand: Brand;
  /** Explicit override used by /preview routes; production pages use the brand's own vibe. */
  variant?: DesignVariantId;
  /**
   * Forces Services/Process onto the plain card treatment regardless of
   * variant. Only the dossier variant (Torre di Umbria) actually drew the
   * "too complicated" complaint — its ledger-table/dotted-TOC formatting.
   * The other three brands' own treatments (banded rows, split timeline,
   * offset list) are a different kind of visual, not that density problem,
   * and stay live in production. Defaults per-variant; /preview passes
   * false explicitly so it always shows every variant's full treatment.
   */
  simplified?: boolean;
}) {
  const t = brand.theme;
  const activeVariant = variant ?? brand.vibe;
  const resolvedSimplified = simplified ?? activeVariant === "dossier";

  // Section numbering (used by the dossier variant's "§ 01" markers, and available
  // to any future variant that numbers sections) reflects this brand's actual
  // sectionOrder rather than a fixed per-component constant — otherwise a brand
  // with a non-default order shows its sections out of sequence.
  const sectionIndex = (key: SectionKey) => brand.sectionOrder.indexOf(key);

  const sections: Record<SectionKey, React.ReactNode> = {
    services: <ServicesBento key="services" brand={brand} index={sectionIndex("services")} simplified={resolvedSimplified} />,
    pourquoi: <Pourquoi key="pourquoi" brand={brand} index={sectionIndex("pourquoi")} />,
    process: <Process key="process" brand={brand} index={sectionIndex("process")} simplified={resolvedSimplified} />,
    gallery: <Gallery key="gallery" brand={brand} index={sectionIndex("gallery")} />,
    testimonials: <Testimonials key="testimonials" brand={brand} index={sectionIndex("testimonials")} />,
    faq: <Faq key="faq" brand={brand} index={sectionIndex("faq")} />,
  };

  // Nav mirrors the page's actual placement; gallery link only when there are images.
  const navLinks = brand.sectionOrder
    .filter((key) => key !== "gallery" || (brand.gallery?.length ?? 0) > 0)
    .filter((key) => key !== "testimonials")
    .map((key) => ({ label: NAV_LABELS[key], href: `#${key}` }));

  return (
    <DesignProvider variant={activeVariant}>
      <div
        data-variant={activeVariant}
        data-motion={brand.motion}
        style={{
          "--t-bg": t.bg,
          "--t-bg-alt": t.bgAlt,
          "--t-surface": t.surface,
          "--t-fg": t.fg,
          "--t-muted": t.muted,
          "--t-border": t.border,
          "--t-accent": t.accent,
          "--t-accent-fg": t.accentFg,
          "--t-nav-bg": t.navBg,
          "--t-hero-bg": t.heroBg,
          // Scales every duration token, so one brand can run cinematic while
          // another runs subtle without duplicating any component logic.
          "--motion-scale": MOTION_SCALE[brand.motion],
          background: t.bg,
          color: t.fg,
          minHeight: "100vh",
        } as React.CSSProperties}
      >
        <Navbar brandName={brand.name} accentHsl={brand.accentHsl} theme={t} links={navLinks} />
        <main>
          <BrandHero brand={brand} />
          {brand.sectionOrder.map((key) => sections[key])}
        </main>
        <CtaFooter brand={brand} />
      </div>
    </DesignProvider>
  );
}
