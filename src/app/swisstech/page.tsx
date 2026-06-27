import { BrandPage } from "@/components/BrandPage";
import { BRANDS } from "@/lib/brands";

export const metadata = {
  title: "SWISSTECH — Dritare & Fasada",
  description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane.",
};

export default function SwissTechPage() {
  const brand = BRANDS.find((b) => b.id === "swisstech")!;
  return <BrandPage brand={brand} />;
}
