import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { pathFor } from "@/lib/i18n/routes";
import { ui } from "@/lib/i18n/dictionary";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { company } from "@/content/company";
import { pages } from "@/content/pages";
import { publish } from "@/content/types";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { IconArrow } from "@/components/Icons";
import { DivisionIndex } from "@/sections/DivisionIndex";
import { ContactBand } from "@/sections/ContactBand";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("home", isLang(lang) ? lang : "sq");
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  return (
    <>
      <JsonLd data={organizationJsonLd(lang)} />
      <JsonLd data={websiteJsonLd(lang)} />
      <main id="main">
        <section aria-labelledby="home-title" className="container-page pt-16 md:pt-24 pb-[var(--section-space)]">
          <p className="label mb-8 md:mb-12">{pages.home.eyebrow[lang]}</p>
          <h1 id="home-title" className="display max-w-[14ch] md:max-w-[12ch]">
            {publish(company.tagline)[lang]}
          </h1>
          <div className="grid-12 mt-10 gap-y-8 md:mt-16">
            <p className="lead col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-3">{publish(company.description)[lang]}</p>
            <div className="col-span-4 flex flex-col gap-3 sm:flex-row md:col-span-8 lg:col-span-7 lg:col-start-3">
              <Link href={pathFor("contact", lang)} className="btn btn-primary">
                {ui.contactCta[lang]} <IconArrow />
              </Link>
              <Link href={pathFor("companies", lang)} className="btn btn-secondary">
                {ui.viewCompanies[lang]}
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="companies-title" className="container-page pb-[var(--section-space)]">
          <Reveal>
            <div className="grid-12 mb-10 gap-y-4">
              <p className="label col-span-4 md:col-span-8 lg:col-span-2">
                <span className="text-accent">01</span> — {pages.home.companiesLabel[lang]}
              </p>
              <h2 id="companies-title" className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
                {pages.home.companiesHeading[lang]}
              </h2>
            </div>
          </Reveal>
          <DivisionIndex lang={lang} />
        </section>

        <ContactBand lang={lang} />
      </main>
    </>
  );
}
