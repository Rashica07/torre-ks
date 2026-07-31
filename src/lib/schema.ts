import type { Brand } from "./brands";

/**
 * JSON-LD builders. No physical street address is included anywhere here —
 * none has been provided yet, and a business's registered address is not
 * something to guess at. Add `address` to both builders once a real one
 * exists; until then this is deliberately incomplete rather than wrong.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Torre Group",
    url: "https://torre-ks.com",
    description:
      "Grup familjar kompanish ndërtimi dhe zhvillimi në Kosovë, operuar nën katër marka.",
    subOrganization: BRAND_NAMES_URLS.map(({ name, url }) => ({
      "@type": "Organization",
      name,
      url,
    })),
  };
}

const BRAND_NAMES_URLS = [
  { name: "MAGFA GROUP", url: "https://magfa.torre-ks.com" },
  { name: "SWISSTECH", url: "https://swisstech.torre-ks.com" },
  { name: "TORRE DI UMBRIA", url: "https://torre-umbria.torre-ks.com" },
  { name: "TORRE HOME", url: "https://torrehome.torre-ks.com" },
];

export function brandSchema(brand: Brand) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: brand.name,
    description: brand.description,
    url: brand.externalUrl,
    telephone: brand.phone,
    email: brand.email,
    image: brand.heroImage ? `${brand.externalUrl}${brand.heroImage}` : undefined,
    areaServed: "Kosovo",
    parentOrganization: {
      "@type": "Organization",
      name: "Torre Group",
      url: "https://torre-ks.com",
    },
  };
}
