import { notFound } from "next/navigation";
import { MinimalConcept } from "@/components/MinimalConcept";
import { MINIMAL_CONCEPTS } from "@/lib/minimal-concepts";
import { BRANDS, BRAND_IDS } from "@/lib/brands";
import type { Metadata } from "next";

// Comparison surface only — keep it out of search results, same as
// /preview/[variant]/[brand]. Not wired into DesignProvider/BrandPage at
// all: this concept is structurally different (one hero screen, no
// section-per-topic architecture), so forcing it through the variant
// system would fight the brief it's built from rather than honor it.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return BRAND_IDS.map((brand) => ({ brand }));
}

export default async function MinimalConceptPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand: brandId } = await params;
  const brand = BRANDS.find((b) => b.id === brandId);
  const config = MINIMAL_CONCEPTS[brandId as keyof typeof MINIMAL_CONCEPTS];
  if (!brand || !config) notFound();

  return <MinimalConcept brand={brand} config={config} />;
}
