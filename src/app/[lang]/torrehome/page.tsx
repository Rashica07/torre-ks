import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, divisionJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { Elevation } from "@/components/Elevation";
import { Plate } from "@/sections/Plate";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("torrehome", isLang(lang) ? lang : "sq");
}

/** TORRE HOME — "Dy komplekse": sticky status elevation beside scrolling render plates, then the supplied floor plan. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDivision("torrehome");
  const t = pages.home4;
  const h = pages.home;
  // exteriors first, then interiors/parking; the small corner crop is used on the home page only
  const plates = t.plates.filter((p) => !p.src.includes("terrace-corner"));
  return (
    <>
    <JsonLd data={divisionJsonLd("torrehome", lang)} />
    <JsonLd data={breadcrumbJsonLd("torrehome", lang)} />
    <main id="main" data-division="torrehome">
      <section className="split" data-surface="paper">
        <div className="split__side">
          <div className="split__sticky">
            <p className="cap muted">{d.category[lang]}</p>
            <h1 style={{ margin: "14px 0 20px", fontSize: "var(--text-h2)" }}>{d.name}</h1>
            <p className="lead">{publish(d.summary)[lang]}</p>
            <Elevation alt={h.elevAlt[lang]} b1={h.b1[lang]} b2={h.b2[lang]} />
            <ul className="dlist">
              <li><span>{h.dl.place[lang]}</span>{publish(d.address!)}</li>
              <li><span>{h.dl.status[lang]}</span>{publish(d.status!)[lang]}</li>
            </ul>
          </div>
        </div>
        <div className="split__plates">
          {plates.map((p, i) => (
            <Plate key={p.src} src={p.src} alt={p.alt[lang]} kicker={pages.common.render[lang]} name={p.cap[lang]} priority={i === 0} />
          ))}
        </div>
      </section>

      <section className="section" data-surface="concrete" aria-labelledby="plan">
        <div className="wrap">
          <h2 id="plan">{t.plan.title[lang]}</h2>
          <figure className="planview">
            <div className="planview__scroll" role="region" aria-label={t.plan.title[lang]} tabIndex={0}>
              <Image src="/images/torrehome/floorplan-a2.jpg" alt={t.plan.alt[lang]} width={1096} height={775} sizes="(max-width: 900px) 900px, 1096px" />
            </div>
            <figcaption className="cap muted" style={{ marginTop: 12 }}>{t.plan.cap[lang]}</figcaption>
          </figure>
        </div>
      </section>

      <ContactPlane lang={lang} title={t.ctaTitle[lang]} />
    </main>
    </>
  );
}
