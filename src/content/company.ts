import { fact } from "./types";
import type { L } from "@/lib/i18n";

/** Group-level facts. Every entry carries its provenance (docs/content.md §1, §1b). */
export const company = {
  name: "TORRE Group",
  founded: fact("1999", "client", "Client-supplied: commit 39daa78 (honest 1999 founding story). No independent trace; use only as the family's history."),
  phone: fact(
    "+383 49 599 405",
    "corroborated",
    "Client-supplied (commit 486daed); matches the ARBK Open registry record of Torre Home SH.P.K. (2026-11-07)."
  ),
  whatsappDigits: fact("38349599405", "corroborated", "Same number as the phone; WhatsApp availability confirmed by the existing wa.me link."),
  tagline: fact<L>(
    { sq: "Ndërtojmë në Kosovë që nga 1999.", en: "Building in Kosovo since 1999." },
    "client",
    "Derived from the client-confirmed founding year."
  ),
  description: fact<L>(
    {
      sq: "TORRE Group është grup familjar me katër kompani: ndërtim shtëpish, dritare dhe fasada, zhvillim rezidencial dhe banesa.",
      en: "TORRE Group is a family group of four companies: home building, windows and facades, residential development and apartments.",
    },
    "client",
    "Live hub copy (client-confirmed structure)."
  ),
  story: fact<L>(
    {
      sq: "Nisëm në 1999, si vëllezër të rinj që donim të ndërtonim shtëpi. Sot jemi katër kompani, secila me specializimin e vet.",
      en: "We started in 1999 as young brothers who wanted to build houses. Today we are four companies, each with its own specialism.",
    },
    "client",
    "Live hub copy; commits 39daa78, 84aeec8."
  ),
};

export const PHONE_HREF = `tel:${company.phone.value.replace(/\s/g, "")}`;
export const WHATSAPP_HREF = `https://wa.me/${company.whatsappDigits.value}`;
