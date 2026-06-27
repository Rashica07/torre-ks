import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "MAGFA GROUP — Ndërtim Rezidencial",
  description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi.",
};

export default function MagfaPage() {
  const brand = BRANDS.find((b) => b.id === "magfa")!;
  return <BrandPage brand={brand} />;
}
