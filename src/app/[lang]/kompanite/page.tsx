import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { DIVISION_IDS, getRoute, pathFor } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { Towers } from "@/sections/Towers";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("companies", isLang(lang) ? lang : "sq");
}

/** Companies index: the four towers, then a drawing-style schedule (Kati · Kompania · Çfarë bën · Ku). */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = pages.companies;
  return (
    <main id="main">
      <section className="dhero" data-surface="concrete" aria-labelledby="t">
        <div className="wrap">
          <p className="cap muted">TORRE Group</p>
          <h1 id="t" style={{ margin: "14px 0 20px" }}>{c.h1[lang]}</h1>
          <p className="lead">{c.lead[lang]}</p>
        </div>
      </section>

      <Towers lang={lang} id="towers" title={pages.home.towersTitle[lang]} />

      <section className="section" data-surface="paper" aria-labelledby="schedule">
        <div className="wrap">
          <h2 id="schedule" style={{ marginBottom: "clamp(24px,4vw,56px)" }}>{c.scheduleTitle[lang]}</h2>
          <div className="tbl tbl--paper" role="region" aria-label={c.scheduleTitle[lang]} tabIndex={0}>
            <table>
              <caption className="sr-only">{c.scheduleTitle[lang]}</caption>
              <thead>
                <tr>
                  <th scope="col">{c.th.floor[lang]}</th>
                  <th scope="col">{c.th.company[lang]}</th>
                  <th scope="col">{c.th.what[lang]}</th>
                  <th scope="col">{c.th.where[lang]}</th>
                </tr>
              </thead>
              <tbody>
                {DIVISION_IDS.map((id, i) => {
                  const d = getDivision(id);
                  return (
                    <tr key={id}>
                      <td>{i + 1}</td>
                      <th scope="row"><Link href={pathFor(id, lang)}>{getRoute(id).label[lang]}</Link></th>
                      <td>{publish(d.summary)[lang]}</td>
                      <td>{c.where[id][lang]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ContactPlane lang={lang} title={pages.home.contactTitle[lang]} body={pages.home.contactBody[lang]} />
    </main>
  );
}
