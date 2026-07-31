import { LegalPage, LegalSection } from "@/components/LegalPage";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deklarata e Qasshmërisë — TORRE GROUP",
  description: "Angazhimi i TORRE GROUP për qasshmëri dixhitale sipas WCAG 2.1.",
  robots: { index: false, follow: true },
};

export default function AccessibilityStatementPage() {
  return (
    <LegalPage title="Deklarata e Qasshmërisë" updated="31 Korrik 2026">
      <p>
        TORRE GROUP synon që faqet e saj — MAGFA GROUP, SWISSTECH, TORRE DI UMBRIA dhe TORRE
        HOME — të jenë të qasshme për të gjithë vizitorët, përfshirë ata që përdorin
        teknologji ndihmëse (lexues ekrani, navigim me tastierë, zmadhues ekrani).
      </p>

      <LegalSection heading="1. Standardi i synuar">
        <p>
          Synojmë përputhshmëri me nivelin AA të Udhëzimeve për Qasshmërinë e Përmbajtjes
          Web (WCAG) 2.1. Kjo është një deklaratë e angazhimit, jo një certifikim formal nga
          palë e tretë.
        </p>
      </LegalSection>

      <LegalSection heading="2. Çfarë kemi zbatuar">
        <ul className="list-disc pl-5 flex flex-col gap-1.5">
          <li>Kontrast ngjyrash i verifikuar programatikisht kundrejt pragut AA për çdo kombinim sfond/tekst në secilën markë.</li>
          <li>Tekst alternativ (alt) për çdo imazh të përmbajtjes dhe të galerisë.</li>
          <li>Strukturë semantike HTML — tituj (h1–h3), etiketa (label) të lidhura me fushat e formularit, dhe role ARIA aty ku nevojitet (p.sh. dialogu i galerisë, menyja mobile).</li>
          <li>Navigim i plotë me tastierë, përfshirë mbylljen e menysë mobile dhe galerisë me tastin Escape.</li>
          <li>Unazë fokusi (focus ring) e dukshme për çdo element të fokusueshëm.</li>
          <li>Respektim i preferencës së sistemit <code>prefers-reduced-motion</code> — animacionet reduktohen ose hiqen kur përdoruesi e ka aktivizuar këtë opsion në pajisjen e tij.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Kufizime të njohura">
        <p>
          Ky është një proces i vazhdueshëm. Nuk garantojmë përputhshmëri të plotë 100% në
          çdo faqe e në çdo kohë — disa komponentë të rinj mund të mos jenë testuar ende me
          çdo teknologji ndihmëse.
        </p>
      </LegalSection>

      <LegalSection heading="4. Na njoftoni">
        <p>
          Nëse hasni një pengesë qasshmërie në ndonjë prej faqeve tona, na njoftoni duke
          përdorur formularin e kontaktit ose numrin e telefonit të shfaqur në faqen e
          markës përkatëse — do të përpiqemi ta zgjidhim sa më shpejt të jetë e mundur.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
