"use client";
import type { Brand } from "@/lib/brands";
import { Navbar } from "./Navbar";
import { BrandHero } from "./BrandHero";
import { ServicesBento } from "./ServicesBento";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CtaFooter } from "./CtaFooter";
import { Pourquoi } from "./Pourquoi";
import { Process } from "./Process";

export function BrandPage({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <div
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
        background: t.bg,
        color: t.fg,
        minHeight: "100vh",
      } as React.CSSProperties}
    >
      <Navbar brandName={brand.name} accentHsl={brand.accentHsl} theme={t} />
      <main>
        <BrandHero brand={brand} />
        <ServicesBento brand={brand} />
        <Pourquoi brand={brand} />
        <Process brand={brand} />
        <Stats brand={brand} />
        <Testimonials brand={brand} />
        <Faq brand={brand} />
        <CtaFooter brand={brand} />
      </main>
    </div>
  );
}
