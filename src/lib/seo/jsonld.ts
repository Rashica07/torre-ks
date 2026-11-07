import { SITE_URL, type Lang } from "@/lib/i18n";
import { company, } from "@/content/company";
import { publish } from "@/content/types";
import { divisions } from "@/content/divisions";
import { absoluteUrl, pathFor } from "@/lib/i18n/routes";

/**
 * JSON-LD builders (docs/seo.md §5). Verified/client/corroborated facts only — everything goes through
 * publish(). Never emitted: ratings, reviews, offers/prices, opening hours, certifications, invented addresses.
 * The page-level division schemas arrive in Milestone 5.
 */
export const ORG_ID = `${SITE_URL}/#org`;

export function organizationJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: company.name,
    url: SITE_URL,
    foundingDate: publish(company.founded),
    description: publish(company.description)[lang],
    telephone: publish(company.phone),
    areaServed: { "@type": "Country", name: "Kosovo" },
    subOrganization: divisions.map((d) => ({
      "@type": "Organization",
      name: d.name,
      url: absoluteUrl(pathFor(d.id, "sq")),
    })),
  };
}

export function websiteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.name,
    url: SITE_URL,
    inLanguage: lang,
    publisher: { "@id": ORG_ID },
  };
}
