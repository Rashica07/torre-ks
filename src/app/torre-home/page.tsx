import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TORRE HOME — Apartamente në Kosovë",
  description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
  alternates: { canonical: "https://torre-home.torre-ks.com" },
  openGraph: {
    title: "TORRE HOME — Apartamente në Kosovë",
    description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
    url: "https://torre-home.torre-ks.com",
    siteName: "TORRE HOME",
    locale: "sq_AL",
    type: "website",
  },
};

export default function TorreHomePage() {
  const brand = BRANDS.find((b) => b.id === "torre-home")!;
  return <BrandPage brand={brand} />;
}
