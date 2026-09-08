import { notFound } from "next/navigation";
import { BrandPage } from "@/components/BrandPage";
import { VariantSwitcher } from "@/components/VariantSwitcher";
import { BRANDS, BRAND_IDS } from "@/lib/brands";
import { DESIGN_VARIANTS, isDesignVariant } from "@/lib/design-variants";

import type { Metadata } from "next";

// Comparison surface only — keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return DESIGN_VARIANTS.flatMap((variant) =>
    BRAND_IDS.map((brand) => ({ variant, brand }))
  );
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ variant: string; brand: string }>;
}) {
  const { variant, brand: brandId } = await params;

  if (!isDesignVariant(variant)) notFound();
  const brand = BRANDS.find((b) => b.id === brandId);
  if (!brand) notFound();

  return (
    <>
      <VariantSwitcher activeVariant={variant} activeBrand={brand.id} />
      {/* This comparison tool is the living backup of every variant's full
          treatment (ledger/TOC/banded/offset, services/pourquoi/process/
          testimonials, etc.) — production pages default to the short
          hero->proof->gallery->contact skeleton, this route opts out of both. */}
      <BrandPage brand={brand} variant={variant} simplified={false} sectionOrder={brand.previewSectionOrder} />
    </>
  );
}
