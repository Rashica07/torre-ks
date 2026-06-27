"use client";
import { ArrowRight, Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf } from "lucide-react";
import type { Brand } from "@/lib/brands";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, HardHat, Sparkles, Layers, TrendingUp, Star, Square, Building, Sun, Wrench, ShieldCheck, Home, Briefcase, MapPin, Zap, Leaf,
};

type Props = { brand: Brand };

export function ServicesBento({ brand }: Props) {
  const t = brand.theme;

  return (
    <section id="services" className="py-20 md:py-32" style={{ background: t.bg }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <div className="mb-16">
          <span className="block text-[11px] tracking-[0.18em] uppercase mb-5" style={{ color: t.accent }}>
            Shërbimet
          </span>
          <h2 className="mb-4" style={{ fontSize: "clamp(28px, 4vw, 52px)", color: t.fg }}>
            Çfarë Ofrojmë.
          </h2>
          <p className="text-sm" style={{ color: t.muted, maxWidth: "40ch" }}>
            Gjashtë shërbime. Çdo projekt i realizuar me standarde të larta.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl overflow-hidden"
          style={{ border: `1px solid ${t.border}` }}
        >
          {brand.services.map((service) => {
            const Icon = ICON_MAP[service.icon] || Building2;
            return (
              <div
                key={service.title}
                className="p-7 flex flex-col gap-5"
                style={{ background: t.surface }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${t.accent}12` }}
                >
                  <Icon style={{ width: "16px", height: "16px", color: t.accent }} />
                </div>

                <div className="flex-1">
                  <h3 className="mb-2" style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: t.fg }}>
                    {service.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: t.muted }}>
                    {service.description}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid ${t.border}` }}
                >
                  <span className="text-xs font-medium" style={{ color: t.accent }}>
                    {service.price}
                  </span>
                  <ArrowRight size={14} style={{ color: t.border }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
