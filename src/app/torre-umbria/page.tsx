import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "TORRE UMBRIA — Luxury Real Estate Development",
  description: "Landmark residential development across Italy's most coveted addresses.",
};

export default function TorreUmbriaPage() {
  const brand = BRANDS.find((b) => b.id === "torre-umbria")!;
  return <BrandPage brand={brand} />;
}
