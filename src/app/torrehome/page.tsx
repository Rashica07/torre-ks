import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TORRE HOME — Apartamente në Kosovë",
  description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
  alternates: { canonical: "https://torrehome.torre-ks.com" },
  openGraph: {
    title: "TORRE HOME — Apartamente në Kosovë",
    description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
    url: "https://torrehome.torre-ks.com",
    siteName: "TORRE HOME",
    locale: "sq_AL",
    type: "website",
  },
};

export default function TorreHomePage() {
  const brand = BRANDS.find((b) => b.id === "torrehome")!;
  return <BrandPage brand={brand} />;
}
