import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { getDivision } from "@/content/divisions";
import { publish } from "@/content/types";
import { ui } from "@/lib/i18n/dictionary";
import { ContactPanel } from "@/sections/ContactPanel";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("contact", isLang(lang) ? lang : "sq");
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const factory = getDivision("swisstech").address;
  return (
    <main id="main">
      <div className="container-page pt-16 md:pt-24 pb-[var(--section-space)]">
        <h1>{pages.contact.title[lang]}</h1>
        <p className="lead mt-8 max-w-[40ch]">{pages.contact.lead[lang]}</p>

        <div className="grid-12 mt-16 gap-y-12 border-t border-border pt-10">
          <h2 className="label col-span-4 md:col-span-8 lg:col-span-3" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>
            {pages.contact.phoneLabel[lang]}
          </h2>
          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
            <ContactPanel lang={lang} />
          </div>

          {factory ? (
            <>
              <h2 className="label col-span-4 md:col-span-8 lg:col-span-3" style={{ fontSize: "var(--text-label)", letterSpacing: "0.12em" }}>
                {pages.contact.factoryLabel[lang]}
              </h2>
              <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
                <address className="text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] not-italic">{publish(factory)}</address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(publish(factory))}`}
                  className="text-link mt-3 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ui.openOnMap[lang]}
                  <span className="sr-only-text"> ({lang === "sq" ? "hapet në dritare të re" : "opens in a new tab"})</span>
                </a>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </main>
  );
}
