import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo/metadata";
import { DivisionPage } from "@/sections/DivisionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMetadata("torrehome", isLang(lang) ? lang : "sq");
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <DivisionPage id="torrehome" lang={lang} />;
}
