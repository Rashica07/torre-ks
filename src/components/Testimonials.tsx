"use client";
import type { Brand } from "@/lib/brands";

function Card({
  quote, name, role, surface, border, fg, muted, bgAlt,
}: {
  quote: string; name: string; role: string;
  surface: string; border: string; fg: string; muted: string; bgAlt: string;
}) {
  return (
    <div
      className="flex flex-col gap-5 shrink-0 w-[280px] md:w-[320px] p-6 rounded-xl"
      style={{ background: surface, border: `1px solid ${border}` }}
    >
      <p className="text-[13px] leading-relaxed flex-1" style={{ color: muted }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0"
          style={{ background: bgAlt, color: fg }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <div className="text-[13px] font-medium" style={{ color: fg }}>{name}</div>
          <div className="text-[11px]" style={{ color: muted }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ brand }: { brand: Brand }) {
  const t = brand.theme;
  const items = brand.testimonials;
  const row1 = [...items, ...items];
  const row2 = [...items.slice(3), ...items.slice(0, 3), ...items.slice(3), ...items.slice(0, 3)];

  return (
    <section id="testimonials" className="py-20 md:py-32 overflow-hidden" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)] mb-14" style={{ maxWidth: "var(--max)" }}>
        <span className="block text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: t.accent }}>
          Dëshmitë
        </span>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 48px)", color: t.fg }}>
          Çfarë Thonë Klientët Tanë.
        </h2>
      </div>

      <div
        className="relative flex flex-col gap-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex gap-4 w-max animate-marquee">
          {row1.map((item, i) => (
            <Card key={i} {...item} surface={t.surface} border={t.border} fg={t.fg} muted={t.muted} bgAlt={t.bgAlt} />
          ))}
        </div>
        <div className="flex gap-4 w-max animate-marquee-rev">
          {row2.map((item, i) => (
            <Card key={i} {...item} surface={t.surface} border={t.border} fg={t.fg} muted={t.muted} bgAlt={t.bgAlt} />
          ))}
        </div>
      </div>
    </section>
  );
}
