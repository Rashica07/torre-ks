import { fact, type Division } from "./types";

const FROM_SITE = "Client-supplied service scope from the live brand page / brands.ts (names only; descriptions withheld).";

/**
 * The four companies. Only names, scope and place — no prices, warranties, timelines,
 * statistics or testimonials (docs/content.md §2 withholds them).
 */
export const divisions: Division[] = [
  {
    id: "magfa",
    name: "MAGFA GROUP",
    surface: "light",
    category: { sq: "Ndërtim shtëpish", en: "Home building" },
    summary: fact(
      {
        sq: "MAGFA GROUP ndërton shtëpi private dhe rezidenciale në Kosovë.",
        en: "MAGFA GROUP builds private and residential homes in Kosovo.",
      },
      "client",
      FROM_SITE
    ),
    services: [
      fact({ sq: "Ndërtim shtëpish private", en: "Private home construction" }, "client", FROM_SITE),
      fact({ sq: "Dizajn arkitekturor", en: "Architectural design" }, "client", FROM_SITE),
      fact({ sq: "Renovim dhe rinovim", en: "Renovation" }, "client", FROM_SITE),
      fact({ sq: "Dizajn interiori", en: "Interior design" }, "client", FROM_SITE),
      fact({ sq: "Mbikëqyrje e ndërtimit", en: "Construction supervision" }, "client", FROM_SITE),
      fact({ sq: "Konsultim fillestar", en: "Initial consultation" }, "client", FROM_SITE),
    ],
    areas: fact(
      ["Prishtinë", "Ferizaj", "Prizren", "Gjakovë", "Pejë", "Mitrovicë"],
      "client",
      "Client-supplied: commit f0e42a3 body (\"6 real cities served\")."
    ),
  },
  {
    id: "swisstech",
    name: "SWISSTECH",
    surface: "dark",
    category: { sq: "Dritare dhe fasada", en: "Windows and facades" },
    summary: fact(
      {
        sq: "SWISSTECH prodhon dhe monton dritare e dyer PVC dhe alumini në Ferizaj.",
        en: "SWISSTECH manufactures and installs PVC and aluminium windows and doors in Ferizaj.",
      },
      "client",
      "Client-supplied; manufacturing business in Bibaj, Ferizaj corroborated by the ARBK Open record of Swisstech KS SH.P.K. (NACE 2223), 2026-11-07."
    ),
    services: [
      fact({ sq: "Dritare PVC", en: "PVC windows" }, "client", FROM_SITE),
      fact({ sq: "Dritare alumini", en: "Aluminium windows" }, "client", FROM_SITE),
      fact({ sq: "Dyer PVC dhe alumini", en: "PVC and aluminium doors" }, "client", FROM_SITE),
      fact({ sq: "Montim", en: "Installation" }, "client", FROM_SITE),
      fact({ sq: "Fasada dhe xham strukturor", en: "Facades and structural glazing" }, "client", FROM_SITE),
      fact({ sq: "Servisim dhe riparim", en: "Servicing and repair" }, "client", FROM_SITE),
    ],
    address: fact("Rr. Engjëll Zefi, Bibaj, 70000 Ferizaj", "client", "Client-supplied factory address (commit f0e42a3). Registry shows only \"Bibaj, Ferizaj\" — confirm wording."),
  },
  {
    id: "torre-umbria",
    name: "TORRE DI UMBRIA",
    surface: "dark",
    category: { sq: "Zhvillim rezidencial", en: "Residential development" },
    summary: fact(
      {
        sq: "TORRE DI UMBRIA zhvillon ndërtesa rezidenciale në Kosovë.",
        en: "TORRE DI UMBRIA develops residential buildings in Kosovo.",
      },
      "client",
      FROM_SITE
    ),
    services: [
      fact({ sq: "Zhvillim ndërtesash", en: "Building development" }, "client", FROM_SITE),
      fact({ sq: "Menaxhim projekti", en: "Project management" }, "client", FROM_SITE),
      fact({ sq: "Arkitekturë dhe inxhinieri", en: "Architecture and engineering" }, "client", FROM_SITE),
      fact({ sq: "Infrastrukturë dhe rrjete", en: "Infrastructure and utilities" }, "client", FROM_SITE),
      fact({ sq: "Hapësira të përbashkëta", en: "Common areas" }, "client", FROM_SITE),
      fact({ sq: "Leje dhe dokumentacion", en: "Permits and documentation" }, "client", FROM_SITE),
    ],
  },
  {
    id: "torrehome",
    name: "TORRE HOME",
    surface: "light",
    category: { sq: "Banesa në Ferizaj", en: "Apartments in Ferizaj" },
    summary: fact(
      {
        sq: "TORRE HOME ndërton ndërtesa banimi në rrugën Emin Duraku në Ferizaj dhe shet banesat në to.",
        en: "TORRE HOME builds residential buildings on Emin Duraku street in Ferizaj and sells the apartments in them.",
      },
      "corroborated",
      "Client-supplied; project, address and apartment sales corroborated by third-party listings (Facebook, TikTok, Instagram, MerrJep) and the ARBK Open record of Torre Home SH.P.K., 2026-11-07."
    ),
    services: [
      fact({ sq: "Banesa në shitje", en: "Apartments for sale" }, "corroborated", "Third-party listings, 2026-11-07."),
    ],
    address: fact("Rruga Emin Duraku, Ferizaj", "corroborated", "Client-supplied; listings name \"Rruga Emin Duraku\" (2026-11-07)."),
  },
];

export function getDivision(id: Division["id"]): Division {
  const d = divisions.find((x) => x.id === id);
  if (!d) throw new Error(`Unknown division ${id}`);
  return d;
}
