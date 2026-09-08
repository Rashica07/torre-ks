import { LegalPage, LegalSection } from "@/components/LegalPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika e Privatësisë — TORRE GROUP",
  description: "Si TORRE GROUP mbledh, përdor dhe mbron të dhënat tuaja personale.",
  // Templated placeholder text — pending legal review before this is treated as
  // authoritative, so kept out of search results for now.
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Politika e Privatësisë" updated="31 Korrik 2026">
      <p>
        Kjo politikë shpjegon si TORRE GROUP dhe kompanitë e saj — MAGFA GROUP, SWISSTECH,
        TORRE DI UMBRIA dhe TORRE HOME — mbledhin, përdorin dhe mbrojnë të dhënat tuaja
        personale kur vizitoni faqet tona ose na kontaktoni.
      </p>

      <LegalSection heading="1. Kush jemi">
        <p>
          TORRE GROUP është një grup familjar kompanish ndërtimi dhe zhvillimi me seli në
          Kosovë, që operon nën katër marka: MAGFA GROUP (ndërtim rezidencial), SWISSTECH
          (dritare & fasada), TORRE DI UMBRIA (zhvillim ndërtesash) dhe TORRE HOME
          (apartamente premium).
        </p>
      </LegalSection>

      <LegalSection heading="2. Të dhënat që mbledhim">
        <p>Kur plotësoni formularin e kontaktit ose asistentin tonë të bisedës, mbledhim:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Emrin tuaj</li>
          <li>Adresën e email-it dhe/ose numrin e telefonit</li>
          <li>Llojin e interesit tuaj dhe afatin kohor që na tregoni vullnetarisht</li>
        </ul>
        <p>Nuk mbledhim të dhëna financiare ose pagesa përmes faqes.</p>
      </LegalSection>

      <LegalSection heading="3. Si i përdorim të dhënat">
        <p>
          Përdorim informacionin ekskluzivisht për t&apos;iu përgjigjur kërkesës suaj — për t&apos;ju
          kontaktuar rreth shërbimeve, ofertave ose apartamenteve që keni shprehur interes.
          Nuk i përdorim të dhënat tuaja për qëllime marketingu pa pëlqimin tuaj të qartë.
        </p>
      </LegalSection>

      <LegalSection heading="4. Ndarja me palë të treta">
        <p>
          Nuk i shesim dhe nuk i ndajmë të dhënat tuaja me palë të treta, përveç kur kërkohet
          nga ligji ose kur është e nevojshme për ofrimin e shërbimit që keni kërkuar (p.sh.
          bashkëpunim me bankën tuaj në rast financimi me kredi).
        </p>
      </LegalSection>

      <LegalSection heading="5. Ruajtja e të dhënave">
        <p>
          Ruajmë të dhënat tuaja vetëm për aq kohë sa është e nevojshme për të përmbushur
          qëllimin për të cilin u mblodhën, ose sa kërkohet nga ligji kosovar.
        </p>
      </LegalSection>

      <LegalSection heading="6. Të drejtat tuaja">
        <p>
          Keni të drejtë të kërkoni qasje, korrigjim ose fshirje të të dhënave tuaja personale
          në çdo kohë, duke na kontaktuar në adresën më poshtë.
        </p>
      </LegalSection>

      <LegalSection heading="7. Cookies">
        <p>
          Faqja jonë përdor cookie minimale, të nevojshme për funksionimin bazë të faqes.
          Nuk përdorim cookie gjurmuese për reklamim të palëve të treta.
        </p>
      </LegalSection>

      <LegalSection heading="8. Ndryshimet në këtë politikë">
        <p>
          Mund ta përditësojmë këtë politikë herë pas here. Data e përditësimit të fundit
          shfaqet në krye të kësaj faqeje.
        </p>
      </LegalSection>

      <LegalSection heading="9. Na kontaktoni">
        <p>
          TORRE GROUP nuk ka një adresë email të përbashkët — çdo markë ka të vetën. Për çdo
          pyetje rreth privatësisë, na shkruani në adresën e markës me të cilën keni
          komunikuar:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>
            MAGFA GROUP —{" "}
            <a href="mailto:info@magfa.torre-ks.com" style={{ color: "hsl(var(--fg))" }}>
              info@magfa.torre-ks.com
            </a>
          </li>
          <li>
            SWISSTECH —{" "}
            <a href="mailto:info@swisstech.torre-ks.com" style={{ color: "hsl(var(--fg))" }}>
              info@swisstech.torre-ks.com
            </a>
          </li>
          <li>
            TORRE DI UMBRIA —{" "}
            <a href="mailto:info@torre-umbria.torre-ks.com" style={{ color: "hsl(var(--fg))" }}>
              info@torre-umbria.torre-ks.com
            </a>
          </li>
          <li>
            TORRE HOME —{" "}
            <a href="mailto:info@torrehome.torre-ks.com" style={{ color: "hsl(var(--fg))" }}>
              info@torrehome.torre-ks.com
            </a>
          </li>
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
