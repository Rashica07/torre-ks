import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "TORRE HOME — Premium Residential Living",
  description: "Thoughtfully designed homes, renovations, and interiors for discerning buyers.",
};

export default function TorreHomePage() {
  const brand = BRANDS.find((b) => b.id === "torre-home")!;
  return <BrandPage brand={brand} />;
}
