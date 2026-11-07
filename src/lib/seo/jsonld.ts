import { SITE_URL, type Lang } from "@/lib/i18n";
import { company, } from "@/content/company";
import { publish } from "@/content/types";
import { divisions } from "@/content/divisions";
import type { Division } from "@/content/types";
import { absoluteUrl, getRoute, pathFor, type RouteId } from "@/lib/i18n/routes";

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

/** Per-company Organization node. Only published facts: scope, areas (MAGFA), factory address (SWISSTECH). */
export function divisionJsonLd(id: Division["id"], lang: Lang) {
  const d = divisions.find((x) => x.id === id)!;
  const url = absoluteUrl(pathFor(id, "sq"));
  const out: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#org`,
    name: d.name,
    url,
    description: publish(d.summary)[lang],
    parentOrganization: { "@id": ORG_ID },
    knowsAbout: d.services.map((s) => publish(s)[lang]),
  };
  if (d.areas) out.areaServed = publish(d.areas).map((name) => ({ "@type": "City", name }));
  if (d.id === "swisstech" && d.address) {
    // client-supplied factory address: "Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj"
    out.address = {
      "@type": "PostalAddress",
      streetAddress: "Rr. Engjëll Zefi, Bibaj",
      postalCode: "70000",
      addressLocality: "Ferizaj",
      addressCountry: "XK",
    };
  }
  return out;
}

export function breadcrumbJsonLd(id: RouteId, lang: Lang) {
  const home = { "@type": "ListItem", position: 1, name: getRoute("home").label[lang], item: absoluteUrl(pathFor("home", lang)) };
  const page = { "@type": "ListItem", position: 2, name: getRoute(id).label[lang], item: absoluteUrl(pathFor(id, lang)) };
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [home, page] };
}
