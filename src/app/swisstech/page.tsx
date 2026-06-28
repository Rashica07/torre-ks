import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SWISSTECH — Dritare & Fasada",
  description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
  alternates: { canonical: "https://swisstech.torre-ks.com" },
  openGraph: {
    title: "SWISSTECH — Dritare & Fasada",
    description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
    url: "https://swisstech.torre-ks.com",
    siteName: "SWISSTECH",
    locale: "sq_AL",
    type: "website",
  },
};

export default function SwissTechPage() {
  const brand = BRANDS.find((b) => b.id === "swisstech")!;
  return <BrandPage brand={brand} />;
}
