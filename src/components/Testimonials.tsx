"use client";
import { Star } from "lucide-react";
import { BlurText } from "./BlurText";
import type { Brand } from "@/lib/brands";

function Card({ quote, name, role, rating, accent }: { quote: string; name: string; role: string; rating: number; accent: string }) {
  return (
    <div className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 shrink-0 w-[300px] md:w-[360px]">
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} style={{ width: "13px", height: "13px", fill: `hsl(${accent})`, color: `hsl(${accent})` }} />
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.78)", lineHeight: 1.7, flex: 1 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
          style={{ background: `hsl(${accent} / 0.15)`, color: `hsl(${accent})`, fontFamily: "var(--font-display)" }}>
          {name.charAt(0)}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "hsl(var(--foreground))" }}>{name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(var(--muted-foreground))" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ brand }: { brand: Brand }) {
  const t = brand.testimonials;
  const row1 = [...t, ...t];
  const row2 = [...t.slice(3), ...t.slice(0, 3), ...t.slice(3), ...t.slice(0, 3)];

  return (
    <section id="testimonials" className="py-24 md:py-36 overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-16">
        <div className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-6"
          style={{ color: `hsl(${brand.accentHsl})`, fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}>
          TESTIMONIALS
        </div>
        <BlurText text="WHAT OUR CLIENTS SAY." as="h2"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.5vw, 56px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: "hsl(var(--foreground))" }} />
      </div>
      <div className="relative flex flex-col gap-5"
        style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
        <div className="flex gap-5 w-max animate-marquee"
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}>
          {row1.map((t, i) => <Card key={i} {...t} accent={brand.accentHsl} />)}
        </div>
        <div className="flex gap-5 w-max animate-marquee-rev"
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}>
          {row2.map((t, i) => <Card key={i} {...t} accent={brand.accentHsl} />)}
        </div>
      </div>
    </section>
  );
}
