import { LegalPage, LegalSection } from "@/components/LegalPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kushtet e Shërbimit — TORRE GROUP",
  description: "Kushtet që rregullojnë përdorimin e shërbimeve të TORRE GROUP.",
  // Templated placeholder text — pending legal review before this is treated as
  // authoritative, so kept out of search results for now.
  robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Kushtet e Shërbimit" updated="31 Korrik 2026">
      <p>
        Këto kushte rregullojnë përdorimin e faqeve dhe shërbimeve të TORRE GROUP dhe
        kompanive të saj — MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA dhe TORRE HOME. Duke
        përdorur faqen tonë ose duke na kontaktuar, pranoni këto kushte.
      </p>

      <LegalSection heading="1. Shërbimet tona">
        <p>Nën markën TORRE GROUP ofrojmë:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Ndërtim shtëpish private dhe rezidenciale (MAGFA GROUP)</li>
          <li>Prodhim dhe montim dritaresh e dyersh (SWISSTECH)</li>
          <li>Zhvillim ndërtesash rezidenciale (TORRE DI UMBRIA)</li>
          <li>Shitje apartamentesh premium (TORRE HOME)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. Ofertat dhe çmimet">
        <p>
          Çmimet e shfaqura në faqe janë orientuese (&ldquo;nga&rdquo;) dhe mund të ndryshojnë
          sipas specifikave të projektit. Asnjë ofertë e shfaqur në faqe nuk përbën detyrim
          kontraktual derisa të nënshkruhet një kontratë e veçantë ndërmjet palëve.
        </p>
      </LegalSection>

      <LegalSection heading="3. Kontratat dhe pagesat">
        <p>
          Çdo marrëveshje financiare, plan pagesash dhe afat dorëzimi përcaktohet në
          kontratën individuale të nënshkruar për projektin tuaj specifik — jo në këtë faqe.
          Kushtet e pagesës të referuara në pyetjet e shpeshta (p.sh. faza pagese sipas
          avancimit të punimeve) janë tipike, jo finale, deri në nënshkrimin e kontratës.
        </p>
      </LegalSection>

      <LegalSection heading="4. Garancitë">
        <p>
          Garancitë specifike (kohëzgjatja, mbulimi) përcaktohen për çdo shërbim dhe janë
          pjesë e kontratës përfundimtare. Detajet orientuese gjenden në seksionin &ldquo;Pyetje
          të Shpeshta&rdquo; të secilës markë.
        </p>
      </LegalSection>

      <LegalSection heading="5. Kufizimi i përgjegjësisë">
        <p>
          Bëjmë çmos që informacioni në këtë faqe të jetë i saktë dhe i përditësuar, por nuk
          garantojmë mungesën e gabimeve. TORRE GROUP nuk mban përgjegjësi për vendime të
          marra vetëm në bazë të informacionit të përgjithshëm në këtë faqe, pa një kontratë
          përkatëse.
        </p>
      </LegalSection>

      <LegalSection heading="6. Prona intelektuale">
        <p>
          Përmbajtja e kësaj faqeje — tekstet, imazhet dhe dizajni — i përket TORRE GROUP
          ose përdoret me licencë përkatëse, dhe nuk mund të riprodhohet pa leje.
        </p>
      </LegalSection>

      <LegalSection heading="7. Ligji i zbatueshëm">
        <p>
          Këto kushte rregullohen nga ligjet e Republikës së Kosovës. Çdo mosmarrëveshje do
          të zgjidhet përpara gjykatave kompetente të Kosovës.
        </p>
      </LegalSection>

      <LegalSection heading="8. Ndryshimet e kushteve">
        <p>
          Mund t&apos;i përditësojmë këto kushte herë pas here. Data e përditësimit të fundit
          shfaqet në krye të kësaj faqeje.
        </p>
      </LegalSection>

      <LegalSection heading="9. Na kontaktoni">
        <p>
          TORRE GROUP nuk ka një adresë email të përbashkët — çdo markë ka të vetën. Për çdo
          pyetje rreth këtyre kushteve, na shkruani në adresën e markës me të cilën keni
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
