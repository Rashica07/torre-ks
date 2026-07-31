import { BrandPage } from "@/components/BrandPage";
import { JsonLd } from "@/components/JsonLd";
import { BRANDS } from "@/lib/brands";
import { brandSchema } from "@/lib/schema";

import type { Metadata, Viewport } from "next";

const brand = BRANDS.find((b) => b.id === "swisstech")!;

export const viewport: Viewport = { themeColor: brand.theme.accent };

export const metadata: Metadata = {
  title: "SWISSTECH — Dritare & Fasada",
  description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
  alternates: { canonical: "https://swisstech.torre-ks.com" },
  icons: { icon: "/icons/swisstech.svg", shortcut: "/icons/swisstech.svg", apple: "/icons/swisstech.svg" },
  openGraph: {
    title: "SWISSTECH — Dritare & Fasada",
    description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
    url: "https://swisstech.torre-ks.com",
    siteName: "SWISSTECH",
    locale: "sq_AL",
    type: "website",
    images: [{ url: "/api/og/swisstech", width: 1200, height: 630, alt: "SWISSTECH" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SWISSTECH — Dritare & Fasada",
    description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
    images: ["/api/og/swisstech"],
  },
};

export default function SwissTechPage() {
  return (
    <>
      <JsonLd data={brandSchema(brand)} />
      <BrandPage brand={brand} />
    </>
  );
}
