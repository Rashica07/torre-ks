"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Brand } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";

type Props = { brand: Brand };

export function BrandHero({ brand }: Props) {
  const t = brand.theme;
  const d = useDesign();
  // Cinematic brands get a slow parallax drift on the hero image.
  const cinematic = brand.motion === "cinematic";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: t.heroBg }}
    >
      {brand.heroImage && (
        <>
          <Image
            src={brand.heroImage}
            alt={brand.heroImageAlt || brand.name}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${cinematic ? "animate-kenburns" : ""}`}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${t.heroBg}f2 0%, ${t.heroBg}cc 35%, ${t.heroBg}f2 100%)`,
            }}
          />
        </>
      )}
      <div className="relative flex-1 flex items-center mx-auto w-full px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <div className="w-full max-w-2xl pt-32 pb-20">
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
                fontSize: d.headingCase === "upper" ? "var(--step-4)" : "var(--step-5)",
                fontFamily: d.displayFont === "serif" ? "var(--font-serif), Georgia, serif" : undefined,
                fontWeight: d.id === "architectural" ? 700 : d.headingCase === "upper" ? 500 : d.displayFont === "serif" ? 400 : 600,
                letterSpacing: d.headingCase === "upper" ? "0.01em" : undefined,
                textTransform: d.headingCase === "upper" ? "uppercase" : undefined,
                lineHeight: d.displayFont === "serif" ? 1.02 : 1.1,
                color: t.fg,
                maxWidth: d.headingCase === "upper" ? "16ch" : "12ch",
              }}
            >
              {brand.heroHeadline}
            </h1>

            <p
              className="text-step-0 mb-10"
              style={{ color: t.muted, maxWidth: "44ch", lineHeight: 1.7 }}
            >
              {brand.heroSub}
            </p>

            <div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full text-sm font-medium no-underline px-6 py-3 transition-opacity duration-200 hover:opacity-85"
                style={{ background: t.accent, color: t.accentFg }}
              >
                Na Kontaktoni <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px" style={{ background: t.border }} />
    </section>
  );
}