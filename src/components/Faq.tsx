"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Brand } from "@/lib/brands";

function Item({ item, accent, fg, muted, border }: {
  item: { q: string; a: string }; accent: string; fg: string; muted: string; border: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${border}` }}>
      <button
        className="w-full flex items-start justify-between py-5 text-left gap-6"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span
          className="text-[15px]"
          style={{ color: open ? accent : fg, transition: "color 0.2s", lineHeight: 1.4 }}
        >
          {item.q}
        </span>
        <span className="shrink-0 mt-0.5">
          {open ? <Minus size={14} style={{ color: accent }} /> : <Plus size={14} style={{ color: muted }} />}
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed" style={{ color: muted, maxWidth: "56ch" }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq({ brand }: { brand: Brand }) {
  const t = brand.theme;

  return (
    <section id="faq" className="py-20 md:py-32" style={{ background: t.bgAlt }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-14 lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="block text-[11px] tracking-[0.18em] uppercase mb-6" style={{ color: t.accent }}>
              Pyetje të Shpeshta
            </span>
            <h2 className="mb-5" style={{ fontSize: "clamp(24px, 3vw, 42px)", color: t.fg }}>
              Pyetje me Përgjigje.
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: t.muted }}>
              Nuk gjeni përgjigjen? Kontaktoni ekipin tonë direkt.
            </p>
            <a
              href="#contact"
              className="text-[13px] font-medium no-underline"
              style={{ color: t.accent, borderBottom: `1px solid ${t.accent}40`, paddingBottom: "2px" }}
            >
              Na kontaktoni →
            </a>
          </div>
          <div>
            {brand.faqs.map((item, i) => (
              <Item key={i} item={item} accent={t.accent} fg={t.fg} muted={t.muted} border={t.border} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
