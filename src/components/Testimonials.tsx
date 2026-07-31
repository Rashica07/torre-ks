"use client";
import { useState } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import type { Brand, Testimonial, BrandTheme } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

function Stars({ rating, accent, border }: { rating: number; accent: string; border: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} nga 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < rating ? accent : "none"}
          style={{ color: i < rating ? accent : border }}
        />
      ))}
    </div>
  );
}

export function Testimonials({ brand, index }: { brand: Brand; index: number }) {
  const t = brand.theme;
  const d = useDesign();
  const style = d.sectionStyle.testimonials;

  return (
    <Section id="testimonials" background={d.id === "architectural" ? t.bg : t.bgAlt}>
      <SectionHeader
        eyebrow="Dëshmitë"
        title="Çfarë Thonë Klientët Tanë."
        theme={t}
        index={index}
        align={style === "offset" ? "center" : "left"}
      />
      <div style={{ marginTop: "var(--space-8)" }}>
        {style === "offset" && <PullQuotes items={brand.testimonials} t={t} />}
        {style === "banded" && <QuoteTable items={brand.testimonials} t={t} />}
        {style === "dossier" && <ExhibitCarousel items={brand.testimonials} t={t} />}
        {(style === "stacked" || style === "split") && <QuoteGrid items={brand.testimonials} t={t} />}
      </div>
    </Section>
  );
}

/* ── Editorial: masonry-ish columns, borderless, large serif quotes ── */
function PullQuotes({ items, t }: { items: Testimonial[]; t: BrandTheme }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8" style={{ columnFill: "balance" }}>
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 60}>
          <figure
            className="break-inside-avoid mb-8"
            style={{ borderTop: `1px solid ${t.border}`, paddingTop: "var(--space-5)" }}
          >
            <Stars rating={item.rating} accent={t.accent} border={t.border} />
            <blockquote
              className="my-4"
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "var(--step-1)",
                lineHeight: 1.5,
                color: t.fg,
              }}
            >
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="text-step--1" style={{ color: t.muted }}>
              <span style={{ color: t.fg }}>{item.name}</span> — {item.role}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Architectural: dense rows, mono attribution, hard rules ── */
function QuoteTable({ items, t }: { items: Testimonial[]; t: BrandTheme }) {
  return (
    <div style={{ borderTop: `2px solid ${t.fg}` }}>
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 50}>
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4 md:gap-10 items-start"
            style={{
              borderBottom: `1px solid ${t.border}`,
              paddingBlock: "var(--space-5)",
              background: i % 2 === 0 ? "transparent" : t.surface,
              paddingInline: "var(--space-4)",
            }}
          >
            <p className="text-step-0" style={{ color: t.fg, lineHeight: 1.6 }}>
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex md:flex-col gap-3 md:gap-1.5 items-center md:items-start">
              <Stars rating={item.rating} accent={t.accent} border={t.border} />
              <span className="font-mono text-step--1 uppercase" style={{ color: t.fg }}>
                {item.name}
              </span>
              <span className="font-mono text-[11px]" style={{ color: t.muted }}>
                {item.role}
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Minimal: card grid with hover elevation ── */
function QuoteGrid({ items, t }: { items: Testimonial[]; t: BrandTheme }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <Reveal key={i} delay={i * 60}>
          <figure
            className="h-full flex flex-col gap-4 transition-transform duration-base ease-out hover:-translate-y-1"
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "var(--radius)",
              padding: "var(--space-6)",
            }}
          >
            <Quote size={20} style={{ color: t.accent, opacity: 0.35 }} />
            <Stars rating={item.rating} accent={t.accent} border={t.border} />
            <blockquote className="text-step-0 flex-1" style={{ color: t.muted, lineHeight: 1.7 }}>
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: `1px solid ${t.border}` }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0"
                style={{ background: t.bgAlt, color: t.fg }}
                aria-hidden
              >
                {item.name.charAt(0)}
              </span>
              <span>
                <span className="block text-step--1 font-medium" style={{ color: t.fg }}>
                  {item.name}
                </span>
                <span className="block text-[11px]" style={{ color: t.muted }}>
                  {item.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

/* ── Dossier: one exhibit at a time — a cited statement, not a wall of cards ── */
function ExhibitCarousel({ items, t }: { items: Testimonial[]; t: BrandTheme }) {
  const [index, setIndex] = useState(0);
  const item = items[index];

  function step(delta: number) {
    setIndex((i) => (i + delta + items.length) % items.length);
  }

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      <div
        className="font-mono text-[11px] uppercase tracking-[0.14em] flex items-center justify-between"
        style={{ color: t.muted, paddingBottom: "var(--space-4)", borderBottom: `1px solid ${t.border}` }}
      >
        <span>
          Dëshmia {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <Stars rating={item.rating} accent={t.accent} border={t.border} />
      </div>

      <div style={{ padding: "var(--space-8) 0" }} aria-live="polite">
        <blockquote className="text-step-2" style={{ color: t.fg, lineHeight: 1.45, maxWidth: "70ch" }}>
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <div className="mt-6 font-mono text-step--1" style={{ color: t.muted }}>
          <span style={{ color: t.fg }}>{item.name}</span> — {item.role}
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ paddingTop: "var(--space-4)", borderTop: `1px solid ${t.border}` }}>
        <div className="flex gap-1" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className="h-1"
              style={{
                width: i === index ? "20px" : "8px",
                background: i === index ? t.accent : t.border,
                transition: "width var(--dur-base) var(--ease-out), background var(--dur-base)",
              }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => step(-1)}
            aria-label="Dëshmia e mëparshme"
            className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ border: `1px solid ${t.border}`, color: t.fg }}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Dëshmia tjetër"
            className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
            style={{ border: `1px solid ${t.border}`, color: t.fg }}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
