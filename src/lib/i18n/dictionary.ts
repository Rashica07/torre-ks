import type { L } from "./index";

/** UI strings. English text is a draft pending human review (docs/decisions.md D-020). */
export const ui = {
  skipToContent: { sq: "Kalo te përmbajtja", en: "Skip to content" },
  navPrimary: { sq: "Kryesore", en: "Primary" },
  navFooter: { sq: "Navigimi në fund të faqes", en: "Footer" },
  openMenu: { sq: "Hap menunë", en: "Open menu" },
  closeMenu: { sq: "Mbyll menunë", en: "Close menu" },
  companiesMenu: { sq: "Shfaq kompanitë", en: "Show companies" },
  contactCta: { sq: "Na kontaktoni", en: "Contact us" },
  callUs: { sq: "Telefononi", en: "Call" },
  whatsapp: { sq: "WhatsApp", en: "WhatsApp" },
  language: { sq: "Gjuha", en: "Language" },
  viewCompanies: { sq: "Shiko kompanitë", en: "See the companies" },
  seeMore: { sq: "Shiko", en: "View" },
  otherCompanies: { sq: "Kompanitë e tjera të grupit", en: "Other companies in the group" },
  servicesHeading: { sq: "Çfarë bën", en: "What it does" },
  whereHeading: { sq: "Ku ndërton", en: "Where it builds" },
  factoryHeading: { sq: "Fabrika", en: "Factory" },
  openOnMap: { sq: "Hap në hartë", en: "Open in maps" },
  footerDescription: {
    sq: "TORRE Group është grup familjar me katër kompani ndërtimi në Kosovë.",
    en: "TORRE Group is a family group of four building-sector companies in Kosovo.",
  },
  footerCompanies: { sq: "Kompanitë", en: "Companies" },
  footerLegal: { sq: "Ligjore", en: "Legal" },
  footerContact: { sq: "Kontakt", en: "Contact" },
  legalSqOnly: { sq: "", en: "(in Albanian)" },
  rights: { sq: "Të gjitha të drejtat e rezervuara.", en: "All rights reserved." },
  notFoundTitle: { sq: "Faqja nuk u gjet", en: "Page not found" },
  notFoundBody: {
    sq: "Adresa që kërkuat nuk ekziston ose është zhvendosur. Zgjidhni një nga kompanitë ose na kontaktoni.",
    en: "The address you asked for does not exist or has moved. Pick one of the companies or contact us.",
  },
} satisfies Record<string, L>;

export type UiKey = keyof typeof ui;
