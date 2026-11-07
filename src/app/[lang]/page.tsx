import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n/routes";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { company } from "@/content/company";
import { getDivision } from "@/content/divisions";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { Wordmark } from "@/components/Wordmark";
import { Elevation } from "@/components/Elevation";
import { ScrollRow } from "@/components/ScrollRow";
import { IconArrowUR } from "@/components/Icons";
import { Plate } from "@/sections/Plate";
import { Towers } from "@/sections/Towers";
import { ContactPlane } from "@/sections/ContactPlane";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("home", isLang(lang) ? lang : "sq");
}

const OFFSETS = [0, 64, 18, 96, 36, 74, 8, 52];
const WIDTHS = [560, 520, 520, 440, 500, 500, 500, 500];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;
  const h = pages.home;
  const home = getDivision("torrehome");

  return (
    <>
      <JsonLd data={organizationJsonLd(lang)} />
      <JsonLd data={websiteJsonLd(lang)} />
      <main id="main">
        {/* 1 · Hero: the wordmark is a window onto TORRE HOME */}
        <section className="hero" data-surface="ink" aria-labelledby="home-title">
          <div className="hero__bays" aria-hidden="true" />
          <div className="wrap" style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", width: "100%" }}>
            <div className="hero__copy">
              <h1 id="home-title" className="sr-only">{h.h1[lang]}</h1>
              <p className="lead">{h.lead[lang]}</p>
              <p>{publish(company.description)[lang]}</p>
            </div>
            <div style={{ marginTop: "auto" }}>
              <Wordmark />
              <dl className="titleblock">
                <div><dt className="cap">{h.tb.latest[lang]}</dt><dd>{h.tb.latestValue[lang]}</dd></div>
                <div><dt className="cap">{h.tb.founded[lang]}</dt><dd>{publish(company.founded)}</dd></div>
                <div><dt className="cap">{h.tb.companies[lang]}</dt><dd>4</dd></div>
                <div><dt className="cap">{h.tb.floors[lang]}</dt><dd>G + 4</dd></div>
                <div><dt className="cap">{h.tb.sheet[lang]}</dt><dd>01</dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* 2 · Plate: the latest project */}
        <Plate src="/images/torrehome/exterior-night.jpg" alt={h.plateAlt[lang]} kicker={h.plateCap[lang]} name="TORRE HOME" position="50% 60%" />

        {/* 3 · Statement */}
        <section className="statement section" data-surface="paper" aria-labelledby="statement-title">
          <div className="wrap">
            <p className="cap muted" style={{ marginBottom: 28 }}>{h.statementLabel[lang]}</p>
            <h2 id="statement-title" className="statement__big" style={{ textTransform: "none", fontFamily: "var(--font-text)" }}>
              {h.statementA[lang]}
              <span className="inline-img" aria-hidden="true">
                <Image src="/images/torrehome/terrace-corner.jpg" alt="" fill sizes="210px" />
              </span>
              <em> {h.statementB[lang]}</em>
            </h2>
            <div className="bays statement__cols">
              {h.cols.map((c) => (
                <div key={c.h.sq}>
                  <h3 className="cap">{c.h[lang]}</h3>
                  <p>{c.p[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · Four towers: the companies */}
        <Towers lang={lang} id="towers-title" title={h.towersTitle[lang]} hint={h.towersHint[lang]} />

        {/* 5 · Status: two buildings */}
        <section className="status section" data-surface="concrete" aria-labelledby="status-title">
          <div className="wrap">
            <p className="cap muted" style={{ marginBottom: 12 }}>{h.statusLabel[lang]}</p>
            <h2 id="status-title">{h.statusTitle[lang]}</h2>
            <div className="bays status__grid" style={{ marginTop: "clamp(32px,5vw,64px)" }}>
              <div style={{ gridColumn: "1 / -1" }} className="status__elev">
                <Elevation alt={h.elevAlt[lang]} b1={h.b1[lang]} b2={h.b2[lang]} />
              </div>
              <ul className="dlist" style={{ gridColumn: "1 / -1" }}>
                <li><span>{h.dl.place[lang]}</span>{publish(home.address!)}</li>
                <li><span>{h.dl.developer[lang]}</span>TORRE HOME</li>
                <li><span>{h.dl.status[lang]}</span>{publish(home.status!)[lang]}</li>
                <li><Link href={pathFor("torrehome", lang)}>{h.dl.view[lang]} <IconArrowUR /></Link></li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6 · Renders: native-scroll staggered row */}
        <section className="section" data-surface="paper" aria-labelledby="row-title" style={{ paddingBottom: "calc(var(--section-space) * 0.6)" }}>
          <div className="wrap">
            <h2 id="row-title" style={{ marginBottom: 28 }}>{h.rowTitle[lang]}</h2>
          </div>
          <ScrollRow region={h.rowRegion[lang]} prev={h.rowPrev[lang]} next={h.rowNext[lang]}>
            {pages.home4.plates.map((p, i) => (
              <figure
                key={p.src}
                style={{ "--w": WIDTHS[i % WIDTHS.length], "--off": OFFSETS[i % OFFSETS.length], "--ar": `${p.w} / ${p.h}` } as React.CSSProperties}
              >
                <div>
                  <Image src={p.src} alt={p.alt[lang]} fill sizes="(max-width: 700px) 82vw, 560px" />
                </div>
                <figcaption className="cap">{p.cap[lang]}</figcaption>
              </figure>
            ))}
          </ScrollRow>
        </section>

        {/* 7 · Monoliths: verified facts only */}
        <section className="section" data-surface="concrete" aria-labelledby="facts-title">
          <div className="wrap">
            <h2 id="facts-title" className="sr-only">{h.factsTitle[lang]}</h2>
            <dl className="mono">
              {h.facts.map((f) => (
                <div key={f.n}>
                  <dt className="cap">{f.cap[lang]}</dt>
                  <dd><span className="mono__n">{f.n}</span><p>{f.p[lang]}</p></dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 8 · Contact: the page's single bronze plane */}
        <ContactPlane lang={lang} title={h.contactTitle[lang]} body={h.contactBody[lang]} />
      </main>
    </>
  );
}
