import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { HouseSection } from "@/components/Drawings";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("magfa", isLang(lang) ? lang : "sq");
}

/** MAGFA GROUP — "Shtëpia në prerje": blue plane, a house drawn in section, services as a numbered legend. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDivision("magfa");
  const t = pages.magfa;
  return (
    <main id="main" data-division="magfa">
      <section className="dhero" data-surface="plane" aria-labelledby="t">
        <div className="wrap">
          <p className="cap">{d.category[lang]}</p>
          <h1 id="t" style={{ margin: "14px 0 20px" }}>{d.name}</h1>
          <p className="lead">{publish(d.summary)[lang]}</p>
          <figure className="drawfig">
            <HouseSection alt={t.drawingAlt[lang]} />
            <figcaption className="cap">{t.drawingNote[lang]}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" data-surface="paper" aria-labelledby="legend">
        <div className="wrap">
          <h2 id="legend">{t.legendTitle[lang]}</h2>
          <ol className="legend">
            {d.services.map((s, i) => (
              <li key={i}><span className="legend__n" aria-hidden="true">{i + 1}</span>{publish(s)[lang]}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" data-surface="ink" aria-labelledby="cities">
        <div className="wrap">
          <h2 id="cities">{t.citiesTitle[lang]}</h2>
          <ul className="skyline">
            {publish(d.areas!).map((c) => (
              <li key={c}><span className="skyline__dot" aria-hidden="true" />{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContactPlane lang={lang} title={t.ctaTitle[lang]} />
    </main>
  );
}
