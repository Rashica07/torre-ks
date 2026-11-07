import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { DIVISION_IDS, pathFor } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/content/company";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { TowerTimeline } from "@/components/Drawings";
import { IconArrowUR } from "@/components/Icons";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("about", isLang(lang) ? lang : "sq");
}

/** Kompania — "1981 → sot": only client-confirmed history (founding year, the family story, the four companies). */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const a = pages.about;
  return (
    <main id="main">
      <section className="dhero" data-surface="paper" aria-labelledby="t">
        <div className="wrap">
          <p className="cap muted">{a.rail[lang]}</p>
          <h1 id="t" style={{ margin: "14px 0 20px" }}>{a.h1[lang]}</h1>
          <p className="lead">{publish(company.story)[lang]}</p>
        </div>
      </section>

      <section className="section" data-surface="concrete" aria-labelledby="tl">
        <div className="wrap tlgrid">
          <h2 id="tl" className="sr-only">{a.h1[lang]}</h2>
          <TowerTimeline alt={a.tlAlt[lang]} />
          <ol className="tl">
            <li>
              <span className="tl__n">{a.tlStart[lang]}</span>
              <p>{a.tlStartText[lang]}</p>
            </li>
            <li>
              <span className="tl__n">{a.tlNow[lang]}</span>
              <p>{a.tlNowText[lang]}</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" data-surface="ink" aria-labelledby="blocks">
        <div className="wrap">
          <h2 id="blocks">{a.blocksTitle[lang]}</h2>
          <ul className="plaques">
            {DIVISION_IDS.map((id, i) => {
              const d = getDivision(id);
              return (
                <li key={id}>
                  <Link href={pathFor(id, lang)} className="plaque" data-division={id} data-surface="plane">
                    <span className="plaque__n" aria-hidden="true">{i + 1}</span>
                    <span className="plaque__name">{d.name}</span>
                    <span className="plaque__p">{a.blocks[id][lang]}</span>
                    <span className="plaque__go" aria-hidden="true"><IconArrowUR /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactPlane lang={lang} title={a.ctaTitle[lang]} />
    </main>
  );
}
