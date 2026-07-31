"use client";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import type { Brand, BrandId } from "@/lib/brands";
import { useDesign } from "@/lib/design-context";
import { useReveal } from "@/lib/useReveal";
import { Section, SectionHeader } from "./SectionHeader";

const PILLARS_BY_BRAND: Record<
  BrandId,
  { icon: React.ElementType; title: string; body: string }[]
> = {
  magfa: [
    { icon: ShieldCheck, title: "E Siguruar Plotësisht", body: "Çdo projekt mbulohet nga sigurimi i plotë ndërtimor. Investimi juaj është i mbrojtur në çdo fazë." },
    { icon: Clock, title: "Dorëzim në Kohë", body: "Dorëzojmë në datën e kontratës. Programi ynë është angazhim, jo vlerësim." },
    { icon: Leaf, title: "Materiale Cilësore", body: "Përdorim vetëm materiale të certifikuara — çimento, hekur, tulla dhe izolime sipas standardeve evropiane." },
    { icon: Award, title: "Ekip i Licencuar", body: "Të gjithë inxhinierët dhe arkitektët tanë janë të licencuar nga Ministria e Infrastrukturës e Kosovës." },
  ],
  swisstech: [
    { icon: ShieldCheck, title: "Garanci 10-Vjeçare", body: "Profilet tona PVC dhe alumini garantohen 10 vjet. E mbështetur nga fondi ynë i garancisë." },
    { icon: Clock, title: "Prodhim i Shpejtë", body: "Prodhojmë lokalisht — koha e dorëzimit është 10–15 ditë pune. Urgjente: 7 ditë." },
    { icon: Leaf, title: "Izolim Termik Superior", body: "Dritaret tona reduktojnë humbjen e nxehtësisë me deri 40% krahasuar me dritaret standarde." },
    { icon: Award, title: "Profile Gjermane CE", body: "Përdorim profile gjermane të certifikuara CE me ndërprerje termike — standardi europian i garantuar." },
  ],
  "torre-umbria": [
    { icon: ShieldCheck, title: "Konstruksion i Fortë", body: "Ndërtojmë me beton armé cilësor dhe metodologji moderne ndërtimi sipas standardeve sizmike." },
    { icon: Clock, title: "Afate të Garantuara", body: "Çdo projekt ka afat kohor të kontraktuar. Transparencë totale gjatë gjithë procesit të ndërtimit." },
    { icon: Leaf, title: "Arkitekturë Moderne", body: "Dizajni ynë bashkëkohor kombinon funksionalitetin me estetikën — ndërtesa që qëndrojnë me kohën." },
    { icon: Award, title: "Lejet në Rregull", body: "Të gjitha projektet tona legalizohen plotësisht. Certifikata e pronësisë brenda 30 ditësh pas dorëzimit." },
  ],
  torrehome: [
    { icon: ShieldCheck, title: "Kontratë me Çmim Fiks", body: "Pa kosto të fshehura. Çmimi i kontratës është çmimi final. Nëse nënvlerësohet, ne absorbojmë diferencën." },
    { icon: Clock, title: "Gatishmëri e Menjëhershme", body: "Apartamentet janë gati për t'u banuar. Nuk prisni — hyni direkt." },
    { icon: Leaf, title: "Klasa Energjetike A+", body: "Izolim i plotë, dritare me xham të dyfishtë dhe sisteme ngrohje efikase — kurseni në energji." },
    { icon: Award, title: "Garancie 5-Vjeçare", body: "Të gjitha punimet strukturore garantohen 5 vjet. Instalimet elektrike dhe hidraulike 2 vjet." },
  ],
};

export function Pourquoi({ brand }: { brand: Brand }) {
  const pillars = PILLARS_BY_BRAND[brand.id];
  const t = brand.theme;
  const d = useDesign();
  const banded = d.sectionStyle.pourquoi === "banded";

  return (
    <Section id="pourquoi" background={d.id === "minimal" ? t.bgAlt : t.bg}>
      <div
        className={
          banded ? "" : "grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-20"
        }
      >
        <div className={banded ? "" : "lg:sticky lg:top-28 lg:self-start"}>
          <SectionHeader
            eyebrow="Pse Ne"
            title="Besimi Ndërtohet Para Gurit të Parë."
            lead={`Katër standarde të palëvizshme në çdo projekt të ${brand.name}.`}
            theme={t}
            index={1}
          />
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${banded ? "lg:grid-cols-4" : ""} gap-5`}
          style={{ marginTop: banded ? "var(--space-8)" : undefined }}
        >
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <Pillar key={title} delay={i * 70}>
              <div
                className="h-full flex flex-col gap-4 transition-transform duration-base ease-out hover:-translate-y-1"
                style={
                  d.cardStyle === "ruled"
                    ? { borderTop: `1px solid ${t.border}`, paddingTop: "var(--space-5)" }
                    : {
                        background: t.surface,
                        border: `1px solid ${t.border}`,
                        borderRadius: d.radius,
                        padding: "var(--space-6)",
                      }
                }
              >
                <div
                  className="w-10 h-10 flex items-center justify-center shrink-0"
                  style={{
                    background: d.cardStyle === "ruled" ? "transparent" : `${t.accent}14`,
                    borderRadius: d.radius === "0px" ? "0px" : "var(--radius-sm)",
                    marginLeft: d.cardStyle === "ruled" ? "-2px" : undefined,
                  }}
                >
                  <Icon size={18} style={{ color: t.accent }} />
                </div>
                <div>
                  <h3 className="text-step-1 mb-2" style={{ color: t.fg, fontWeight: 600 }}>
                    {title}
                  </h3>
                  <p className="text-step--1" style={{ color: t.muted, lineHeight: 1.7 }}>
                    {body}
                  </p>
                </div>
              </div>
            </Pillar>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Pillar({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal h-full" style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
