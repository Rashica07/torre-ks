import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "SWISSTECH — Precision Window & Facade Systems",
  description: "Swiss-engineered window systems, curtain walls, and facade solutions for luxury architecture.",
};

export default function SwissTechPage() {
  const brand = BRANDS.find((b) => b.id === "swisstech")!;
  return <BrandPage brand={brand} />;
}
