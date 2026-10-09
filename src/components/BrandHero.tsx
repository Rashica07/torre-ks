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
  const hasPhoto = Boolean(brand.heroImage);

  return (
    <section id="hero" className="relative flex flex-col md:flex-row min-h-screen overflow-hidden" style={{ background: t.bg }}>
      {/* Text panel — solid background, no photo behind it. Previously the
          headline sat on top of the full-bleed photo under a near-opaque
          gradient wash (heroBg at up to 95% alpha), which made light-themed
          brands' photos read as a barely-visible ghost. Splitting text and
          photo into their own panels means the photo needs zero wash to
          keep the text legible — it can run at full clarity. */}
      <div
        className="relative flex flex-col justify-center px-[var(--gutter)]"
        style={{ width: hasPhoto ? undefined : "100%", flex: hasPhoto ? "0 0 46%" : "1 1 auto" }}
      >
        <div className="w-full max-w-xl mx-auto md:mx-0 pt-28 pb-16 md:pt-0 md:pb-0">
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

      {/* Photo panel — full strength, no overlay. */}
      {hasPhoto && (
        <div className="relative flex-1 min-h-[45vh] md:min-h-screen">
          <Image
            src={brand.heroImage!}
            alt={brand.heroImageAlt || brand.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 54vw"
            className={`object-cover ${cinematic ? "animate-kenburns" : ""}`}
          />
        </div>
      )}

      {/* Nav-height scrim only, not a full photo wash. The navbar is a
          transparent fixed overlay until scrolled; once the hero photo runs
          at full strength, plain-text nav links crossing the panel boundary
          (or bright photo content) lose contrast. This band is just tall
          enough to cover the navbar and fades out well before the photo's
          midpoint. */}
      {hasPhoto && (
        <div
          className="absolute top-0 left-0 right-0 h-[140px] pointer-events-none"
          style={{ background: `linear-gradient(180deg, ${t.bg}e6 0%, ${t.bg}00 100%)` }}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: t.border }} />
    </section>
  );
}