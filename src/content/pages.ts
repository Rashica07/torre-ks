import type { L } from "@/lib/i18n";

/**
 * Page copy for the Milestone 1 skeleton. Albanian is the source; English is a DRAFT pending human
 * review (docs/decisions.md D-020). Facts come from ./company and ./divisions; nothing here asserts
 * a number, price, warranty or timeline.
 */
export const pages = {
  home: {
    eyebrow: { sq: "TORRE Group — ndërtim në Kosovë që nga 1999", en: "TORRE Group — building in Kosovo since 1999" },
    companiesLabel: { sq: "Katër kompani", en: "Four companies" },
    companiesHeading: { sq: "Një grup. Katër specializime.", en: "One group. Four specialisms." },
    contactHeading: { sq: "Na tregoni projektin.", en: "Tell us about your project." },
    contactBody: {
      sq: "Telefononi ose shkruani në WhatsApp dhe ju përgjigjemi.",
      en: "Call or message us on WhatsApp and we will get back to you.",
    },
  },
  companies: {
    title: { sq: "Kompanitë e TORRE Group", en: "The companies of TORRE Group" },
    lead: {
      sq: "Katër kompani, secila me specializimin e vet. Zgjidhni atë që i përshtatet projektit tuaj.",
      en: "Four companies, each with its own specialism. Pick the one that fits your project.",
    },
  },
  contact: {
    title: { sq: "Kontakti", en: "Contact" },
    lead: {
      sq: "Na tregoni çfarë keni në mendje: një shtëpi, dritare, një ndërtesë apo një banesë. Telefononi ose shkruani në WhatsApp.",
      en: "Tell us what you have in mind: a house, windows, a building or an apartment. Call or write on WhatsApp.",
    },
    phoneLabel: { sq: "Telefon dhe WhatsApp", en: "Phone and WhatsApp" },
    factoryLabel: { sq: "Fabrika SWISSTECH", en: "SWISSTECH factory" },
  },
} satisfies Record<string, Record<string, L>>;
