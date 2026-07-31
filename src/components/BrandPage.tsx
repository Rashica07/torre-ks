"use client";
import type { Brand } from "@/lib/brands";
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

export function BrandPage({
  brand,
  variant = "minimal",
}: {
  brand: Brand;
  variant?: DesignVariantId;
}) {
  const t = brand.theme;

  const navLinks = [
    { label: "Shërbimet", href: "#services" },
    { label: "Pse Ne", href: "#pourquoi" },
    { label: "Procesi", href: "#process" },
    ...(brand.gallery?.length ? [{ label: "Galeria", href: "#gallery" }] : []),
    { label: "Pyetje", href: "#faq" },
  ];

  return (
    <DesignProvider variant={variant}>
      <div
        data-variant={variant}
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
          <ServicesBento brand={brand} />
          <Pourquoi brand={brand} />
          <Process brand={brand} />
          <Gallery brand={brand} />
          <Testimonials brand={brand} />
          <Faq brand={brand} />
          <CtaFooter brand={brand} />
        </main>
      </div>
    </DesignProvider>
  );
}
