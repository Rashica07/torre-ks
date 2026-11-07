import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { pages } from "@/content/pages";
import { DivisionIndex } from "@/sections/DivisionIndex";
import { ContactBand } from "@/sections/ContactBand";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("companies", isLang(lang) ? lang : "sq");
}

export default async function CompaniesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <main id="main">
      <div className="container-page pt-16 md:pt-24 pb-12">
        <h1 className="max-w-[18ch]">{pages.companies.title[lang]}</h1>
        <p className="lead mt-8 max-w-[40ch]">{pages.companies.lead[lang]}</p>
      </div>
      <div className="container-page pb-[var(--section-space)]">
        <DivisionIndex lang={lang} />
      </div>
      <ContactBand lang={lang} />
    </main>
  );
}
