"use client";
import { Star, Quote } from "lucide-react";
import type { Brand, Testimonial } from "@/lib/brands";

function Stars({ rating, accent, border }: { rating: number; accent: string; border: string }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < rating ? accent : "none"}
          style={{ color: i < rating ? accent : border }}
        />
      ))}
    </div>
  );
}

function Card({
  item, surface, border, fg, muted, bgAlt, accent,
}: {
  item: Testimonial;
  surface: string; border: string; fg: string; muted: string; bgAlt: string; accent: string;
}) {
  return (
    <div
      className="relative flex flex-col gap-5 p-7 rounded-xl h-full"
      style={{ background: surface, border: `1px solid ${border}` }}
    >
      <Quote size={22} style={{ color: accent, opacity: 0.35 }} />
      <Stars rating={item.rating} accent={accent} border={border} />
      <p className="text-[14px] leading-relaxed flex-1" style={{ color: muted }}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-1" style={{ borderTop: `1px solid ${border}` }}>
        <div
          className="w-8 h-8 mt-4 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
          style={{ background: bgAlt, color: fg }}
        >
          {item.name.charAt(0)}
        </div>
        <div className="mt-4">
          <div className="text-[13px] font-medium" style={{ color: fg }}>{item.name}</div>
          <div className="text-[11px]" style={{ color: muted }}>{item.role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <section id="testimonials" className="py-20 md:py-32" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <span className="block text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: t.accent }}>
          Dëshmitë
        </span>
        <h2 className="mb-14" style={{ fontSize: "clamp(26px, 3.5vw, 48px)", color: t.fg }}>
          Çfarë Thonë Klientët Tanë.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brand.testimonials.map((item, i) => (
            <Card
              key={i}
              item={item}
              surface={t.surface}
              border={t.border}
              fg={t.fg}
              muted={t.muted}
              bgAlt={t.bgAlt}
              accent={t.accent}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
