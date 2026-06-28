import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MAGFA GROUP — Ndërtim Rezidencial",
  description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
  alternates: { canonical: "https://magfa.torre-ks.com" },
  openGraph: {
    title: "MAGFA GROUP — Ndërtim Rezidencial",
    description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
    url: "https://magfa.torre-ks.com",
    siteName: "MAGFA GROUP",
    locale: "sq_AL",
    type: "website",
  },
};

export default function MagfaPage() {
  const brand = BRANDS.find((b) => b.id === "magfa")!;
  return <BrandPage brand={brand} />;
}
