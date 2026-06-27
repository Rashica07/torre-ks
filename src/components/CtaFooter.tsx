import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";

const FOOTER_LINKS = [
  { label: "Privacy Policy",   href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Careers",          href: "#" },
  { label: "Press",            href: "#" },
];

export function CtaFooter() {
  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: "hsl(var(--background))" }}>
      {/* CTA block */}
      <div className="relative py-32 md:py-48">
        {/* Cinematic gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 100%, hsl(35 50% 18% / 0.6) 0%, transparent 70%),
              hsl(240 10% 3%)
            `,
          }}
        />
        {/* Top fade */}
        <div className="absolute top-0 inset-x-0 h-40 gradient-fade-t" style={{ zIndex: 1 }} />

        <div className="relative z-10 max-w-[var(--max)] mx-auto px-[var(--gutter)] flex flex-col items-center text-center">
          <div
            className="liquid-glass inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium mb-8"
            style={{ color: "hsl(var(--primary))", fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
          >
            START A PROJECT
          </div>

          <BlurText
            text="LET'S BUILD SOMETHING EXTRAORDINARY."
            as="h2"
            className="font-display uppercase mb-8 max-w-[18ch] mx-auto"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 96px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            } as React.CSSProperties}
          />

          <p
            className="mb-12 text-base md:text-lg max-w-lg leading-relaxed"
            style={{ color: "hsl(var(--foreground) / 0.65)", fontFamily: "var(--font-body)" }}
          >
            Every landmark begins with a conversation. Tell us about your project — we respond within 24 hours.
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="mailto:hello@magfa.group"
              className="inline-flex items-center rounded-full px-8 py-4 text-base font-medium transition-colors"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.01em",
              }}
            >
              Start a Conversation <ArrowUpRight className="ml-2 size-4" />
            </a>
            <a
              href="tel:+41000000000"
              className="liquid-glass-strong inline-flex items-center rounded-full px-8 py-4 text-base font-normal transition-colors"
              style={{
                color: "hsl(var(--foreground))",
                fontFamily: "var(--font-body)",
                letterSpacing: "-0.01em",
              }}
            >
              +41 000 000 000
            </a>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        className="relative z-10 w-full border-t"
        style={{ borderColor: "hsl(var(--border) / 0.20)" }}
      >
        <div
          className="max-w-[var(--max)] mx-auto px-[var(--gutter)] py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <span
            className="text-xs"
            style={{ color: "hsl(var(--foreground) / 0.40)", fontFamily: "var(--font-body)" }}
          >
            &copy; {new Date().getFullYear()} MAGFA GROUP — SWISSTECH, TORRE UMBRIA, TORRE HOME. All rights reserved.
          </span>
          <nav className="flex items-center gap-6">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs transition-colors"
                style={{ color: "hsl(var(--foreground) / 0.40)", fontFamily: "var(--font-body)" }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
