import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "MAGFA GROUP — Excellence in Construction",
  description: "Architecture and construction at the highest institutional level. From master plan to final handover.",
};

export default function MagfaPage() {
  const brand = BRANDS.find((b) => b.id === "magfa")!;
  return <BrandPage brand={brand} />;
}
