import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { getDivision } from "@/content/divisions";
import { company, WHATSAPP_HREF } from "@/content/company";
import { publish } from "@/content/types";
import { ui } from "@/lib/i18n/dictionary";
import { Button } from "@/components/Button";
import { RequestForm } from "@/components/RequestForm";
import { divisions } from "@/content/divisions";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("contact", isLang(lang) ? lang : "sq");
}

/** Contact: phone and WhatsApp are the live channels; the request form arrives in Milestone 4 (docs/planning.md). */
export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = pages.contact;
  const factory = getDivision("swisstech").address;
  return (
    <main id="main" data-surface="paper">
      <div className="wrap opener">
        <p className="cap muted">{ui.footerContact[lang]}</p>
        <h1 style={{ margin: "14px 0 24px" }}>{c.h1[lang]}</h1>
        <p className="lead" style={{ maxWidth: "40ch" }}>{c.lead[lang]}</p>
      </div>
      <section className="section" style={{ paddingTop: 0 }} data-surface="paper">
        <div className="wrap">
          <RequestForm lang={lang} companies={divisions.map((d) => ({ id: d.id, name: d.name }))} />
        </div>
      </section>
      <section data-surface="bronze" className="contact section" aria-labelledby="phone-title">
        <div className="wrap">
          <h2 id="phone-title" className="cap" style={{ fontFamily: "var(--font-text)", fontSize: "var(--text-cap)", lineHeight: 1.3, letterSpacing: "0.14em" }}>{c.phone[lang]}</h2>
          <a href={WHATSAPP_HREF} className="contact__tel" target="_blank" rel="noopener noreferrer">
            <span className="sr-only">{ui.whatsapp[lang]} </span>
            {company.phone.value}
            <span className="sr-only"> ({pages.common.newTab[lang]})</span>
          </a>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <Button href={WHATSAPP_HREF} external srExtra={pages.common.newTab[lang]}>{ui.whatsapp[lang]}</Button>
          </div>
        </div>
      </section>
      {factory ? (
        <section className="section" data-surface="paper" aria-labelledby="factory-title">
          <div className="wrap">
            <h2 id="factory-title" className="cap" style={{ fontFamily: "var(--font-text)", fontSize: "var(--text-cap)", lineHeight: 1.3, letterSpacing: "0.14em" }}>{c.factory[lang]}</h2>
            <address className="lead" style={{ fontStyle: "normal", marginTop: 16 }}>{publish(factory)}</address>
            <p style={{ marginTop: 16 }}>
              <a
                className="link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(publish(factory))}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pages.common.mapOpen[lang]}
                <span className="sr-only"> ({pages.common.newTab[lang]})</span>
              </a>
            </p>
          </div>
        </section>
      ) : null}
    </main>
  );
}
