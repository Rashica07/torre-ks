import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata, Viewport } from "next";

const brand = BRANDS.find((b) => b.id === "torrehome")!;

export const viewport: Viewport = { themeColor: brand.theme.accent };

export const metadata: Metadata = {
  title: "TORRE HOME — Apartamente në Kosovë",
  description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
  alternates: { canonical: "https://torrehome.torre-ks.com" },
  icons: { icon: "/icons/torrehome.svg", shortcut: "/icons/torrehome.svg", apple: "/icons/torrehome.svg" },
  openGraph: {
    title: "TORRE HOME — Apartamente në Kosovë",
    description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
    url: "https://torrehome.torre-ks.com",
    siteName: "TORRE HOME",
    locale: "sq_AL",
    type: "website",
    images: [{ url: "/api/og/torrehome", width: 1200, height: 630, alt: "TORRE HOME" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TORRE HOME — Apartamente në Kosovë",
    description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
    images: ["/api/og/torrehome"],
  },
};

export default function TorreHomePage() {
  return <BrandPage brand={brand} />;
}
