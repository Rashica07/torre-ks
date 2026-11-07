import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("torre-umbria", isLang(lang) ? lang : "sq");
}

/**
 * TORRE DI UMBRIA — "Shtresat": the scope list stacked as a building section. The stack illustrates scope,
 * it is NOT a process or timeline (stated on the page). Services in source order: 0 development · 1 project
 * management · 2 architecture · 3 infrastructure · 4 common areas · 5 permits.
 */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDivision("torre-umbria");
  const t = pages.umbria;
  const s = d.services.map((x) => publish(x)[lang]);
  const topDown = [0, 1, 2, 5, 4, 3]; // visual top → base
  return (
    <main id="main" data-division="torre-umbria" data-surface="ink">
      <section className="dhero" aria-labelledby="t">
        <div className="wrap">
          <p className="cap accent">{d.category[lang]}</p>
          <h1 id="t" style={{ margin: "14px 0 20px" }}>{d.name}</h1>
          <p className="lead">{publish(d.summary)[lang]}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="layers">
        <div className="wrap">
          <h2 id="layers">{t.layersTitle[lang]}</h2>
          <p className="muted" style={{ marginTop: 16 }}>{t.layersNote[lang]}</p>
          <ol className="slabs" aria-label={t.layersAlt[lang]}>
            {topDown.map((idx, i) => (
              <li key={idx} className="slab" data-surface="plane" style={{ "--i": i } as React.CSSProperties}>
                <span className="slab__n" aria-hidden="true">{String(topDown.length - i).padStart(2, "0")}</span>
                <span className="slab__t">{s[idx]}</span>
              </li>
            ))}
          </ol>
          <p className="cap muted" style={{ marginTop: 14 }}>{pages.common.illustration[lang]}</p>
        </div>
      </section>

      <ContactPlane lang={lang} title={t.ctaTitle[lang]} />
    </main>
  );
}
