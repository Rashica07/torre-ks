"use client";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/brands";

const SIBLINGS: Record<string, { name: string; url: string }[]> = {
  magfa: [
    { name: "SWISSTECH", url: "https://swisstech.torre-ks.com" },
    { name: "TORRE DI UMBRIA", url: "https://torre-umbria.torre-ks.com" },
    { name: "TORRE HOME", url: "https://torrehome.torre-ks.com" },
  ],
  swisstech: [
    { name: "MAGFA GROUP", url: "https://magfa.torre-ks.com" },
    { name: "TORRE DI UMBRIA", url: "https://torre-umbria.torre-ks.com" },
    { name: "TORRE HOME", url: "https://torrehome.torre-ks.com" },
  ],
  "torre-umbria": [
    { name: "MAGFA GROUP", url: "https://magfa.torre-ks.com" },
    { name: "SWISSTECH", url: "https://swisstech.torre-ks.com" },
    { name: "TORRE HOME", url: "https://torrehome.torre-ks.com" },
  ],
  torrehome: [
    { name: "MAGFA GROUP", url: "https://magfa.torre-ks.com" },
    { name: "SWISSTECH", url: "https://swisstech.torre-ks.com" },
    { name: "TORRE DI UMBRIA", url: "https://torre-umbria.torre-ks.com" },
  ],
};

type Props = { brand: Brand };

export function BrandHero({ brand }: Props) {
  const siblings = SIBLINGS[brand.id] || [];
  const t = brand.theme;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ background: t.heroBg }}
    >
      <div className="flex-1 flex items-center mx-auto w-full px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 pt-32 pb-20">
          <div className="flex flex-col justify-center animate-[fadeUp_0.7s_ease_both]">
            <span
              className="block text-[11px] tracking-[0.18em] uppercase mb-8"
              style={{ color: t.accent }}
            >
              {brand.category}
            </span>

            <h1
              className="mb-6"
              style={{
                fontSize: "clamp(40px, 7vw, 88px)",
                color: t.fg,
                maxWidth: "12ch",
              }}
            >
              {brand.heroHeadline}
            </h1>

            <p
              className="text-[15px] leading-relaxed mb-10"
              style={{ color: t.muted, maxWidth: "44ch" }}
            >
              {brand.heroSub}
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full text-sm font-medium no-underline px-6 py-3 transition-opacity duration-200 hover:opacity-85"
                style={{ background: t.accent, color: t.accentFg }}
              >
                Shikoni Shërbimet <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full text-sm no-underline px-6 py-3 transition-opacity duration-200 hover:opacity-75"
                style={{ border: `1px solid ${t.border}`, color: t.muted }}
              >
                Na Kontaktoni
              </a>
            </div>
          </div>

          {/* RIGHT — stats panel */}
          <div className="hidden lg:flex flex-col justify-center animate-[fadeUp_0.7s_0.15s_ease_both]">
            <div
              className="rounded-xl p-8 flex flex-col"
              style={{ background: t.surface, border: `1px solid ${t.border}` }}
            >
              {brand.stats.map((stat, i) => (
                <div key={stat.label}>
                  {i > 0 && <div className="h-px my-5" style={{ background: t.border }} />}
                  <div style={{ fontSize: "clamp(28px, 3vw, 40px)", color: t.fg, marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: t.muted, letterSpacing: "0.03em" }}>
                    {stat.label}
                  </div>
                </div>
              ))}

              <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${t.border}` }}>
                <div className="text-[10px] tracking-[0.14em] uppercase mb-3" style={{ color: t.muted }}>
                  Pjesë e TORRE GROUP
                </div>
                <div className="flex flex-col gap-2">
                  {siblings.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      className="flex items-center gap-2 text-xs no-underline transition-opacity duration-200 hover:opacity-60"
                      style={{ color: t.muted }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: t.border }} />
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px" style={{ background: t.border }} />
    </section>
  );
}