import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, divisionJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/JsonLd";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { WindowSchedule } from "@/components/WindowSchedule";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("swisstech", isLang(lang) ? lang : "sq");
}

/** SWISSTECH — "Orari i dritareve": a facade of drawn window types mapped to a real schedule table. No prices, no certifications. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getDivision("swisstech");
  const t = pages.swisstech;
  const s = d.services.map((x) => publish(x)[lang]);
  // services: 0 PVC windows · 1 aluminium windows · 2 doors · 3 installation · 4 facades · 5 servicing → W1…W6
  const order = [0, 1, 2, 4, 3, 5];
  const kinds = [t.product, t.product, t.product, t.product, t.service, t.service];
  const rows = order.map((idx, i) => ({ type: `W${i + 1}`, what: s[idx], kind: kinds[i][lang] }));
  const factory = d.address ? publish(d.address) : null;
  return (
    <>
    <JsonLd data={divisionJsonLd("swisstech", lang)} />
    <JsonLd data={breadcrumbJsonLd("swisstech", lang)} />
    <main id="main" data-division="swisstech" data-surface="ink">
      <section className="dhero" aria-labelledby="t">
        <div className="wrap">
          <p className="cap accent">{d.category[lang]}</p>
          <h1 id="t" style={{ margin: "14px 0 20px" }}>{d.name}</h1>
          <p className="lead">{publish(d.summary)[lang]}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="sched">
        <div className="wrap">
          <h2 id="sched" style={{ marginBottom: "clamp(24px,4vw,56px)" }}>{t.scheduleTitle[lang]}</h2>
          <WindowSchedule alt={t.elevAlt[lang]} title={t.scheduleTitle[lang]} th={{ type: t.th.type[lang], what: t.th.what[lang], kind: t.th.kind[lang] }} rows={rows} note={pages.common.illustration[lang]} />
        </div>
      </section>

      {factory ? (
        <section className="section" data-surface="concrete" aria-labelledby="factory">
          <div className="wrap">
            <h2 id="factory">{t.factoryTitle[lang]}</h2>
            <p className="lead" style={{ marginTop: 24, maxWidth: "46ch" }}>{t.factoryBody[lang]}</p>
            <address className="addr">{factory}</address>
            <p>
              <a className="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(factory)}`} target="_blank" rel="noopener noreferrer">
                {pages.common.mapOpen[lang]}
                <span className="sr-only"> ({pages.common.newTab[lang]})</span>
              </a>
            </p>
          </div>
        </section>
      ) : null}

      <ContactPlane lang={lang} title={t.ctaTitle[lang]} />
    </main>
    </>
  );
}
