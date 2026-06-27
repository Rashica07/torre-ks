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
  return (
    <div style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))", minHeight: "100vh" }}>
      <Navbar brandName={brand.name} accentHsl={brand.accentHsl} />
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
