import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "TORRE HOME — Apartamente në Kosovë",
  description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë.",
};

export default function TorreHomePage() {
  const brand = BRANDS.find((b) => b.id === "torre-home")!;
  return <BrandPage brand={brand} />;
}
