import type { BrandId } from "./brands";
import type { MinimalConceptConfig } from "@/components/MinimalConcept";

// Per-brand copy/content for the pure-minimalism concept pages
// (src/app/preview/minimal/[brand]). Every fact here is real — pulled from
// or consistent with the same brand.ts data the production sites use, not
// invented separately for this exercise.
export const MINIMAL_CONCEPTS: Record<BrandId, MinimalConceptConfig> = {
  magfa: {
    headline: "Shtëpia Juaj, e Ndërtuar Saktë.",
    subcopy: "Ndërtim shtëpish private dhe rezidenciale në Kosovë. Konsultimi fillestar është falas.",
    photoSrc: "/images/magfa/hero.jpg",
    photoAlt: "Punëtor ndërtimi mbi strukturën e një shtëpie në ndërtim e sipër",
    photoWidth: 720,
    photoHeight: 480,
    facts: [
      { label: "Ndërtojmë", value: "Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë, Mitrovicë" },
      { label: "Çmimi", value: "Kërkoni ofertë" },
      { label: "Konsultimi", value: "Falas, pa asnjë detyrim" },
      { label: "Grupi", value: "Pjesë e TORRE GROUP, që nga 1999" },
    ],
    closingHeadline: "Gati të filloni projektin tuaj?",
  },
  swisstech: {
    headline: "Dritaret e Cilësisë Evropiane.",
    subcopy: "Prodhim vendor, profil gjerman. Nga €85/m², me garanci 10-vjeçare.",
    photoSrc: "/images/swisstech/hero.jpg",
    photoAlt: "Fasadë moderne me xham strukturor që reflekton qiellin",
    photoWidth: 720,
    photoHeight: 540,
    facts: [
      { label: "Prodhimi", value: "Lokal, me profil gjerman certifikuar CE" },
      { label: "Çmimi", value: "Nga €85/m²" },
      { label: "Garancia", value: "10 vjet, për çdo profil" },
      { label: "Adresa", value: "Rr. Engjëll Zefi, Bibaj, Ferizaj" },
    ],
    closingHeadline: "Gati për një ofertë?",
  },
  "torre-umbria": {
    headline: "Ndërtesa Moderne. Cilësi e Garantuar.",
    subcopy: "Zhvillojmë ndërtesa rezidenciale, nga koncepti deri te dorëzimi final.",
    photoSrc: "/images/torre-umbria/hero.jpg",
    photoAlt: "Ndërtesë moderne rezidenciale e bardhë me ballkone",
    photoWidth: 373,
    photoHeight: 560,
    facts: [
      { label: "Zhvillimi", value: "Nga koncepti deri te dorëzimi final" },
      { label: "Garancia", value: "10 vjet, për strukturën dhe fondamentin" },
      { label: "Lejet", value: "Menaxhojmë çdo leje, urbanistike dhe ndërtimore" },
      { label: "Grupi", value: "Pjesë e TORRE GROUP, që nga 1999" },
    ],
    closingHeadline: "Gati të diskutojmë projektin tuaj?",
  },
  torrehome: {
    headline: "Apartamente Reale në Ferizaj.",
    subcopy: "Dy ndërtesa në Rr. Emin Duraku. Çmimet nisin nga €55,000, me 0% paradhënie.",
    photoSrc: "/images/torrehome/hero-day.jpg",
    photoAlt: "Fasada e Ndërtesës TORRE HOME, pamje dite",
    photoWidth: 720,
    photoHeight: 686,
    facts: [
      { label: "Ndërtesa", value: "2 reale, Rr. Emin Duraku, Ferizaj" },
      { label: "Çmimi", value: "Nga €55,000" },
      { label: "Financimi", value: "0% paradhënie me kredi" },
      { label: "Grupi", value: "Pjesë e TORRE GROUP, që nga 1999" },
    ],
    closingHeadline: "Gati të shihni apartamentin?",
  },
};
