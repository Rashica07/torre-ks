"use client";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import type { Brand } from "@/lib/brands";

const PILLARS_BY_BRAND: Record<
  string,
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
  "torre-home": [
    { icon: ShieldCheck, title: "Kontratë me Çmim Fiks", body: "Pa kosto të fshehura. Çmimi i kontratës është çmimi final. Nëse nënvlerësohet, ne absorbojmë diferencën." },
    { icon: Clock, title: "Gatishmëri e Menjëhershme", body: "Apartamentet janë gati për t'u banuar. Nuk prisni — hyni direkt." },
    { icon: Leaf, title: "Klasa Energjetike A+", body: "Izolim i plotë, dritare me xham të dyfishtë dhe sisteme ngrohje efikase — kurseni në energji." },
    { icon: Award, title: "Garancie 5-Vjeçare", body: "Të gjitha punimet strukturore garantohen 5 vjet. Instalimet elektrike dhe hidraulike 2 vjet." },
  ],
};

export function Pourquoi({ brand }: { brand: Brand }) {
  const pillars = PILLARS_BY_BRAND[brand.id] || PILLARS_BY_BRAND.magfa;
  const t = brand.theme;

  return (
    <section id="pourquoi" className="py-20 md:py-32" style={{ background: t.bgAlt }}>
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: "var(--max)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="block text-[11px] tracking-[0.18em] uppercase mb-6" style={{ color: t.accent }}>
              Pse Ne
            </span>
            <h2 className="mb-5" style={{ fontSize: "clamp(26px, 3.2vw, 44px)", color: t.fg }}>
              Besimi Ndërtohet Para Gurit të Parë.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: t.muted }}>
              Katër standarde të palëvizshme në çdo projekt të {brand.name}.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden"
            style={{ border: `1px solid ${t.border}` }}
          >
            {pillars.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-7 flex flex-col gap-5"
                style={{ background: t.surface }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${t.accent}12` }}
                >
                  <Icon style={{ width: "16px", height: "16px", color: t.accent }} />
                </div>
                <div>
                  <h3 className="text-base mb-2" style={{ color: t.fg }}>{title}</h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: t.muted }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
