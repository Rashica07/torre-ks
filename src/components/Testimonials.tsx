"use client";
import { Star } from "lucide-react";
import type { Brand } from "@/lib/brands";
import { motion } from "framer-motion";

function Card({ quote, name, role, rating, accent }: { quote: string; name: string; role: string; rating: number; accent: string }) {
  return (
    <div
      className="flex flex-col gap-5 shrink-0 w-[300px] md:w-[340px] p-6 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} style={{ width: "12px", height: "12px", fill: `hsl(${accent})`, color: `hsl(${accent})` }} />
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--foreground) / 0.72)", lineHeight: 1.75, flex: 1 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
          style={{ background: `hsl(${accent} / 0.12)`, color: `hsl(${accent})`, fontFamily: "var(--font-display)" }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 500, color: "hsl(var(--foreground))" }}>{name}</div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "hsl(var(--foreground) / 0.38)", letterSpacing: "0.03em" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ brand }: { brand: Brand }) {
  const t = brand.testimonials;
  const row1 = [...t, ...t];
  const row2 = [...t.slice(3), ...t.slice(0, 3), ...t.slice(3), ...t.slice(0, 3)];
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="testimonials" className="py-24 md:py-36 overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)] mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="accent-line" style={{ background: accent }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
            Testimonials
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 3.8vw, 58px)",
            lineHeight: 0.93,
            letterSpacing: "-0.022em",
            color: "hsl(var(--foreground))",
          }}
        >
          What Our Clients Say.
        </h2>
      </div>

      <div
        className="relative flex flex-col gap-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div
          className="flex gap-4 w-max animate-marquee"
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
        >
          {row1.map((t, i) => <Card key={i} {...t} accent={brand.accentHsl} />)}
        </div>
        <div
          className="flex gap-4 w-max animate-marquee-rev"
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
        >
          {row2.map((t, i) => <Card key={i} {...t} accent={brand.accentHsl} />)}
        </div>
      </div>
    </section>
  );
}
