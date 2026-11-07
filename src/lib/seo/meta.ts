import type { L } from "@/lib/i18n";
import type { RouteId } from "@/lib/i18n/routes";

/**
 * Titles and descriptions (docs/seo.md §3). Unique per route. Albanian pending native review;
 * English is a draft (D-020). Lengths are enforced by tests/unit/meta.test.ts.
 */
export const routeMeta: Partial<Record<RouteId, { title: L; description: L }>> = {
  home: {
    title: { sq: "TORRE Group — Ndërtim, dritare dhe banesa në Kosovë", en: "TORRE Group — Building, windows and apartments in Kosovo" },
    description: {
      sq: "Grup familjar ndërtimi në Kosovë që nga 1999: shtëpi (MAGFA), dritare e fasada (SWISSTECH), zhvillim rezidencial (TORRE DI UMBRIA) dhe banesa (TORRE HOME).",
      en: "A family building group in Kosovo since 1999: homes (MAGFA), windows and facades (SWISSTECH), residential development (TORRE DI UMBRIA) and apartments (TORRE HOME).",
    },
  },
  companies: {
    title: { sq: "Kompanitë — katër kompani të TORRE Group", en: "Companies — the four companies of TORRE Group" },
    description: {
      sq: "MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA dhe TORRE HOME: katër kompani ndërtimi në Kosovë, secila me specializimin e vet.",
      en: "MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA and TORRE HOME: four building-sector companies in Kosovo, each with its own specialism.",
    },
  },
  magfa: {
    title: { sq: "MAGFA GROUP — Ndërtim shtëpish në Kosovë | TORRE", en: "MAGFA GROUP — Home building in Kosovo | TORRE" },
    description: {
      sq: "MAGFA GROUP ndërton shtëpi private dhe rezidenciale në Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë dhe Mitrovicë. Na kontaktoni për projektin tuaj.",
      en: "MAGFA GROUP builds private and residential homes in Prishtina, Ferizaj, Prizren, Gjakova, Peja and Mitrovica. Contact us about your project.",
    },
  },
  swisstech: {
    title: { sq: "SWISSTECH — Dritare dhe fasada PVC e alumini, Ferizaj", en: "SWISSTECH — PVC and aluminium windows and facades, Ferizaj" },
    description: {
      sq: "SWISSTECH prodhon dhe monton dritare e dyer PVC dhe alumini në Ferizaj, Kosovë. Fabrika ndodhet në Bibaj, Ferizaj.",
      en: "SWISSTECH manufactures and installs PVC and aluminium windows and doors in Ferizaj, Kosovo. The factory is in Bibaj, Ferizaj.",
    },
  },
  "torre-umbria": {
    title: { sq: "TORRE DI UMBRIA — Zhvillim ndërtesash rezidenciale", en: "TORRE DI UMBRIA — Residential building development" },
    description: {
      sq: "TORRE DI UMBRIA zhvillon ndërtesa rezidenciale në Kosovë: projektim, menaxhim projekti, leje dhe dokumentacion. Pjesë e TORRE Group.",
      en: "TORRE DI UMBRIA develops residential buildings in Kosovo: design, project management, permits and documentation. Part of TORRE Group.",
    },
  },
  torrehome: {
    title: { sq: "TORRE HOME — Banesa në Ferizaj, rr. Emin Duraku", en: "TORRE HOME — Apartments in Ferizaj, Emin Duraku street" },
    description: {
      sq: "TORRE HOME ndërton ndërtesa banimi në rrugën Emin Duraku, Ferizaj dhe shet banesat në to. Kontaktoni për banesat në shitje.",
      en: "TORRE HOME builds residential buildings on Emin Duraku street, Ferizaj, and sells the apartments in them. Contact us about apartments for sale.",
    },
  },
  contact: {
    title: { sq: "Kontakti — TORRE Group, Ferizaj", en: "Contact — TORRE Group, Ferizaj" },
    description: {
      sq: "Kontaktoni TORRE Group: telefononi ose shkruani në WhatsApp në +383 49 599 405 dhe na tregoni projektin tuaj.",
      en: "Contact TORRE Group: call or message us on WhatsApp at +383 49 599 405 and tell us about your project.",
    },
  },
};
