import type { Brand } from "./brands";

/**
 * JSON-LD builders. Physical street address is only included per-brand where
 * one has actually been provided (currently just SwissTech's factory) —
 * a business's registered address is not something to guess at, so brands
 * without a confirmed address simply omit the field rather than fake one.
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
    legalName: brand.legalName,
    description: brand.description,
    url: brand.externalUrl,
    telephone: brand.phone,
    email: brand.email,
    address: brand.address
      ? { "@type": "PostalAddress", streetAddress: brand.address, addressCountry: "XK" }
      : undefined,
    image: brand.heroImage ? `${brand.externalUrl}${brand.heroImage}` : undefined,
    areaServed: "Kosovo",
    parentOrganization: {
      "@type": "Organization",
      name: "Torre Group",
      url: "https://torre-ks.com",
    },
  };
}
