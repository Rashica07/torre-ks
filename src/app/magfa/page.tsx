import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata, Viewport } from "next";

const brand = BRANDS.find((b) => b.id === "magfa")!;

export const viewport: Viewport = { themeColor: brand.theme.accent };

export const metadata: Metadata = {
  title: "MAGFA GROUP — Ndërtim Rezidencial",
  description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
  alternates: { canonical: "https://magfa.torre-ks.com" },
  icons: { icon: "/icons/magfa.svg", shortcut: "/icons/magfa.svg", apple: "/icons/magfa.svg" },
  openGraph: {
    title: "MAGFA GROUP — Ndërtim Rezidencial",
    description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
    url: "https://magfa.torre-ks.com",
    siteName: "MAGFA GROUP",
    locale: "sq_AL",
    type: "website",
    images: [{ url: "/api/og/magfa", width: 1200, height: 630, alt: "MAGFA GROUP" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAGFA GROUP — Ndërtim Rezidencial",
    description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
    images: ["/api/og/magfa"],
  },
};

export default function MagfaPage() {
  return <BrandPage brand={brand} />;
}
