import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata, Viewport } from "next";

const brand = BRANDS.find((b) => b.id === "torre-umbria")!;

export const viewport: Viewport = { themeColor: brand.theme.accent };

export const metadata: Metadata = {
  title: "TORRE DI UMBRIA — Zhvillim Rezidencial",
  description: "Ndërtim dhe zhvillim i ndërtesave rezidenciale moderne në Kosovë.",
  alternates: { canonical: "https://torre-umbria.torre-ks.com" },
  icons: { icon: "/icons/torre-umbria.svg", shortcut: "/icons/torre-umbria.svg", apple: "/icons/torre-umbria.svg" },
  openGraph: {
    title: "TORRE DI UMBRIA — Zhvillim Rezidencial",
    description: "Ndërtim dhe zhvillim i ndërtesave rezidenciale moderne në Kosovë.",
    url: "https://torre-umbria.torre-ks.com",
    siteName: "TORRE DI UMBRIA",
    locale: "sq_AL",
    type: "website",
    images: [{ url: "/api/og/torre-umbria", width: 1200, height: 630, alt: "TORRE DI UMBRIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TORRE DI UMBRIA — Zhvillim Rezidencial",
    description: "Ndërtim dhe zhvillim i ndërtesave rezidenciale moderne në Kosovë.",
    images: ["/api/og/torre-umbria"],
  },
};

export default function TorreUmbriaPage() {
  return <BrandPage brand={brand} />;
}
