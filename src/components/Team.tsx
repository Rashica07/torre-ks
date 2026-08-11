"use client";
import type { Brand } from "@/lib/brands";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

/**
 * Single consistent card grid, not a per-variant treatment like Services/
 * Testimonials — this section only exists on one brand so far and doesn't
 * need four different layouts to prove it's not a template.
 *
 * No stock photos: the old site's team photos were generic template
 * headshots (same asset pattern as its fabricated stats), so real names
 * get an initials avatar instead of a fake picture of someone else.
 */
export function Team({ brand, index }: { brand: Brand; index: number }) {
  const t = brand.theme;
  if (!brand.team?.length) return null;

  return (
    <Section id="team" background={t.bg}>
      <SectionHeader eyebrow="Ekipi" title="Kush Jemi." theme={t} index={index} />
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-5"
        style={{ marginTop: "var(--space-8)" }}
      >
        {brand.team.map((member, i) => (
          <Row key={member.name} delay={i * 60}>
            <div
              className="h-full flex flex-col items-center text-center gap-3"
              style={{ padding: "var(--space-5)" }}
            >
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center text-step-0 font-semibold"
                style={{ background: `${t.accent}14`, color: t.accent }}
                aria-hidden
              >
                {member.name.charAt(0)}
              </span>
              <div>
                <span className="block text-step--1 font-medium" style={{ color: t.fg }}>
                  {member.name}
                </span>
                <span className="block text-[11px]" style={{ color: t.muted }}>
                  {member.role}
                </span>
              </div>
            </div>
          </Row>
        ))}
      </div>
    </Section>
  );
}

function Row({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
