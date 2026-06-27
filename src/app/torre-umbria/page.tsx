import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "TORRE DI UMBRIA — Zhvillim Rezidencial",
  description: "Ndërtim dhe zhvillim i ndërtesave rezidenciale moderne në Kosovë.",
};

export default function TorreUmbriaPage() {
  const brand = BRANDS.find((b) => b.id === "torre-umbria")!;
  return <BrandPage brand={brand} />;
}
