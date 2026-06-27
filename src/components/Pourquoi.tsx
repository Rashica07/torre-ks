"use client";
import { ShieldCheck, Clock, Leaf, Award } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand } from "@/lib/brands";

const PILLARS_BY_BRAND: Record<string, { icon: React.ElementType; title: string; body: string }[]> = {
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
  const accent = `hsl(${brand.accentHsl})`;

  return (
    <section id="pourquoi" className="py-24 md:py-36" style={{ background: "hsl(var(--bg-alt))" }}>
      <div className="max-w-[var(--max)] mx-auto px-[var(--gutter)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-3 mb-8">
              <span className="accent-line" style={{ background: accent }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.18em", color: accent, textTransform: "uppercase" }}>
                Pse Ne
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 54px)",
                lineHeight: 0.93,
                letterSpacing: "-0.022em",
                color: "hsl(var(--foreground))",
                marginBottom: "20px",
              }}
            >
              Besimi Ndërtohet Para Gurit të Parë.
            </h2>
            <p style={{ color: "hsl(var(--muted-fg))", fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7 }}>
              Katër standarde të palëvizshme në çdo projekt të {brand.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map(({ icon: Icon, title, body }, i) => (
              <motion.div
                key={title}
                className="rounded-2xl p-7 flex flex-col gap-5"
                style={{
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `hsl(${brand.accentHsl} / 0.08)`, border: `1px solid hsl(${brand.accentHsl} / 0.18)` }}
                >
                  <Icon style={{ width: "17px", height: "17px", color: accent }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                      color: "hsl(var(--foreground))",
                      marginBottom: "8px",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "hsl(var(--muted-fg))", lineHeight: 1.7 }}>
                    {body}
                  </p>
                </div>
                <div className="h-px mt-auto" style={{ background: `linear-gradient(to right, hsl(${brand.accentHsl} / 0.3), transparent)` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
