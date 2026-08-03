export type BrandTheme = {
  bg: string;
  bgAlt: string;
  surface: string;
  fg: string;
  muted: string;
  border: string;
  accent: string;
  accentFg: string;       // text color on accent bg
  navBg: string;          // scrolled navbar bg
  heroBg: string;         // hero section bg (can differ from page bg)
};

import type { DesignVariantId, MotionLevel } from "./design-variants";

/** Page sections a brand can arrange. Gallery renders nothing without images. */
export const SECTION_KEYS = ["proof", "services", "pourquoi", "process", "gallery", "testimonials", "faq"] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const BRAND_IDS = ["magfa", "swisstech", "torre-umbria", "torrehome"] as const;

/** Union of the four brand ids. Keying per-brand content maps by this type makes a
 *  mistyped or missing key a compile error rather than a silent fallback. */
export type BrandId = (typeof BRAND_IDS)[number];

export type Brand = {
  id: BrandId;
  name: string;
  tagline: string;
  description: string;
  subdomain: string;
  externalUrl: string;
  path: string;
  phone: string;
  email: string;
  /** Animation intensity for this brand's page. */
  motion: MotionLevel;
  /** Design direction this brand's production page renders with. */
  vibe: DesignVariantId;
  /** Section placement for the production page — kept short by design. */
  sectionOrder: SectionKey[];
  /** Full section set for the /preview comparison route, so every variant's
   *  richer treatment (services/pourquoi/process/testimonials) stays
   *  demonstrable even though production doesn't render it anymore. */
  previewSectionOrder: SectionKey[];
  accentHsl: string;
  category: string;
  heroHeadline: string;
  heroSub: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** The "Proof" section — three specific, brand-true facts. Not a promise list. */
  proofEyebrow: string;
  proofTitle: string;
  proofFacts: string[];
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqIntro: string;
  faqs: Faq[];
  gallery?: GalleryImage[];
  theme: BrandTheme;
};

export type Service = { title: string; description: string; price: string; icon: string; };
export type Stat = { value: string; label: string };
export type Testimonial = { quote: string; name: string; role: string; rating: number };
export type Faq = { q: string; a: string };
export type GalleryImage = { src: string; alt: string; caption: string };

export const BRANDS: Brand[] = [
  {
    id: "magfa",
    name: "MAGFA GROUP",
    tagline: "Ndërtim Shtëpish me Cilësi",
    description: "Ndërtim shtëpish private dhe rezidenciale në Kosovë. Nga themeli deri te çelësi.",
    subdomain: "magfa.torre-ks.com",
    externalUrl: "https://magfa.torre-ks.com",
    path: "/",
    phone: "+383 49 599 405",
    email: "info@magfa.torre-ks.com",
    motion: "subtle",
    vibe: "minimal",
    sectionOrder: ["proof", "services", "faq"],
    previewSectionOrder: ["services", "pourquoi", "process", "faq"],
    accentHsl: "200 100% 45%",
    category: "Ndërtim Rezidencial",
    heroHeadline: "Shtëpia Juaj, e Ndërtuar Saktë.",
    heroSub: "MAGFA GROUP ndërton shtëpi private dhe rezidenciale. Materiale premium. Dorëzim në kohën e caktuar.",
    // Stock photography, used as decorative hero backdrop only — not a MAGFA project.
    heroImage: "/images/magfa/hero.jpg",
    heroImageAlt: "Punëtor ndërtimi mbi strukturën e një shtëpie në ndërtim e sipër",
    proofEyebrow: "Pse MAGFA",
    proofTitle: "Familje ndërtuesish, jo agjenci marketingu.",
    proofFacts: [
      "Pjesë e TORRE GROUP — familje ndërtuesish që nga 1950, Stubëll e Vitisë.",
      "Ndërtojmë në Prishtinë, Ferizaj, Prizren, Gjakovë, Pejë dhe Mitrovicë.",
      "Konsultimi fillestar është falas, pa asnjë detyrim.",
    ],
    services: [
      { title: "Ndërtim Shtëpish Private", description: "Ndërtim shtëpish individuale nga themeli deri te përfundimi. Çdo detaj i planifikuar dhe realizuar me kujdes.", price: "Kërkoni ofertë", icon: "Home" },
      { title: "Dizajn Arkitekturor", description: "Projektim arkitekturor i personalizuar sipas nevojave dhe dëshirave tuaja. Plani ideal për shtëpinë tuaj.", price: "Kërkoni ofertë", icon: "Building2" },
      { title: "Renovim & Rinovim", description: "Renovim i plotë ose i pjesshëm i shtëpive ekzistuese. Transformojmë hapësirën tuaj me cilësi dhe stil.", price: "Kërkoni ofertë", icon: "Wrench" },
      { title: "Dizajn Interiori", description: "Dizajn i brendshëm profesional — nga zgjedhja e ngjyrave deri te vendosja e mobiljeve dhe ndriçimit.", price: "Kërkoni ofertë", icon: "Sparkles" },
      { title: "Mbikëqyrje e Ndërtimit", description: "Mbikëqyrje profesionale e çdo faze të ndërtimit. Sigurohemi që gjithçka realizohet sipas standardeve.", price: "Kërkoni ofertë", icon: "HardHat" },
      { title: "Konsultim Fillestar", description: "Diskutojmë projektin tuaj, buxhetin dhe afatet kohore, pa detyrim.", price: "Falas", icon: "Star" },
    ],
    stats: [
      { value: "1950", label: "Origjina e Familjes" },
      { value: "4", label: "Kompani nën TORRE GROUP" },
      { value: "6", label: "Qytete ku Ndërtojmë" },
      { value: "0€", label: "Konsultimi Fillestar" },
    ],
    testimonials: [
      { quote: "MAGFA GROUP ndërtoi shtëpinë tonë saktësisht siç e imagjinonim. Cilësia e materialeve dhe punës është e jashtëzakonshme.", name: "Arben Krasniqi", role: "Klient, Prishtinë", rating: 5 },
      { quote: "Nga konsultimi i parë deri te çelësi — ekipi i MAGFA-s var var profesional dhe transparent gjatë gjithë procesit.", name: "Vjosa Berisha", role: "Klient, Prizren", rating: 5 },
      { quote: "Renovimi i shtëpisë sonë u krye brenda afatit dhe buxhetit. Rezultati tejkaloi çdo pritshmëri.", name: "Driton Morina", role: "Klient, Ferizaj", rating: 5 },
      { quote: "Ekipi i MAGFA-s është shumë profesional. Çdo pyetje u iu përgjigj me kujdes dhe transparencë.", name: "Liridon Hoxha", role: "Klient, Gjakovë", rating: 5 },
      { quote: "Shtëpia jonë është realizimi i ëndrrës. MAGFA GROUP e ktheu vizionin tonë në realitet.", name: "Shqipe Gashi", role: "Klient, Mitrovicë", rating: 5 },
      { quote: "Punë cilësore, njerëz të besueshëm. MAGFA GROUP është zgjedhja e duhur për çdo projekt ndërtimi.", name: "Mentor Aliu", role: "Klient, Pejë", rating: 5 },
    ],
    faqIntro: "Pyetjet më të shpeshta të klientëve tanë.",
    faqs: [
      { q: "Sa kohë zgjat ndërtimi i një shtëpie?", a: "Koha e ndërtimit varet nga madhësia dhe kompleksiteti i projektit. Mesatarisht, një shtëpi standarde (150–200m²) ndërtohet brenda 8–14 muajsh nga fillimi i punimeve." },
      { q: "A jepni garanci për punën e kryer?", a: "Po. Ofrojmë garanci 5-vjeçare për strukturën e ndërtimit dhe 2-vjeçare për punimet e brendshme (suvatime, bojëra, veshje). Çdo material vjen me garancitë e prodhuesit." },
      { q: "Si funksionon procesi i pagesës?", a: "Pagesat bëhen në faza sipas avancimit të punimeve: 20% në nënshkrimin e kontratës, 30% në përfundimin e strukturës, 30% në suvatim, dhe 20% në dorëzim final." },
    ],
    theme: {
      bg: "#faf8f6",
      bgAlt: "#f3efeb",
      surface: "#ffffff",
      fg: "#2c2420",
      muted: "#776a61",
      border: "#e0d6ce",
      accent: "#0072a7",
      accentFg: "#ffffff",
      navBg: "rgba(250, 248, 246, 0.92)",
      heroBg: "#faf8f6",
    },
  },
  {
    id: "swisstech",
    name: "SWISSTECH",
    tagline: "Fabrikë Dritaresh & Montim Professional",
    description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me profil gjerman, prodhim vendor.",
    subdomain: "swisstech.torre-ks.com",
    externalUrl: "https://swisstech.torre-ks.com",
    path: "/",
    phone: "+383 49 599 405",
    email: "info@swisstech.torre-ks.com",
    motion: "subtle",
    vibe: "architectural",
    sectionOrder: ["proof", "services", "faq"],
    previewSectionOrder: ["services", "process", "pourquoi", "faq"],
    accentHsl: "180 100% 30%",
    category: "Dritare & Fasada",
    heroHeadline: "Dritaret e Cilësisë Evropiane.",
    heroSub: "SWISSTECH prodhon dritare dhe dyer PVC e alumini. Profil gjerman, prodhim vendor.",
    // Stock photography, used as decorative hero backdrop only — not a SWISSTECH project.
    heroImage: "/images/swisstech/hero.jpg",
    heroImageAlt: "Fasadë moderne me xham strukturor që reflekton qiellin",
    proofEyebrow: "Pse SWISSTECH",
    proofTitle: "Fabrikë reale. Jo importues, jo ndërmjetës.",
    proofFacts: [
      "Prodhim lokal me profil gjerman të certifikuar CE.",
      "Garanci 10-vjeçare për çdo profil PVC dhe alumini.",
      "Fabrika jonë është e hapur për vizitë, me takim paraprak.",
    ],
    services: [
      { title: "Dritare PVC", description: "Dritare PVC me profil gjerman — izolim termik dhe akustik i shkëlqyer. Të disponueshme në të gjitha madhësitë dhe ngjyrat.", price: "Nga €85/m²", icon: "Square" },
      { title: "Dritare Alumini", description: "Dritare dhe fasada alumini me ndërprerje termike për ndërtesa residenciale dhe komerciale. Dizajn modern dhe i qëndrueshëm.", price: "Nga €120/m²", icon: "Layers" },
      { title: "Dyer PVC & Alumini", description: "Dyer hyrëse, ballkonesh dhe garazhesh me siguri të lartë dhe izolim të plotë. Sistemet tona plotësojnë standardet evropiane.", price: "Nga €350/copë", icon: "Building" },
      { title: "Montim Professional", description: "Ekipet tona të certifikuara montojnë çdo sistem me precizion. Montim i saktë = performancë maksimale dhe garanci e plotë.", price: "Nga €15/m²", icon: "HardHat" },
      { title: "Fasada & Xham Struktural", description: "Sisteme fasadash me xham për ndërtesa komerciale dhe rezidenciale. Dizajn arkitekturor me performancë energjetike superiore.", price: "Me kërkesë", icon: "Building2" },
      { title: "Servisim & Riparim", description: "Servisim periodik, rregullim dhe riparim i dritareve dhe dyerve ekzistuese. Zëvendësim xhami dhe guarnicionesh.", price: "Nga €30", icon: "Wrench" },
    ],
    stats: [
      { value: "10", label: "Vjet Garanci Profil" },
      { value: "CE", label: "Certifikim Gjerman" },
      { value: "10–15", label: "Ditë Pune, Porosi Standarde" },
      { value: "48h", label: "Dorëzim Oferte" },
    ],
    testimonials: [
      { quote: "Dritaret e SWISSTECH-ut janë të jashtëzakonshme — shtëpia jonë është shumë më e ngrohtë gjatë dimrit dhe ka reduktuar konsumin e ngrohjes.", name: "Burim Kastrati", role: "Klient, Prishtinë", rating: 5 },
      { quote: "Montimi u krye brenda dy ditëve pa asnjë problem. Ekipi ishte shumë profesional dhe i rregullt.", name: "Teuta Osmani", role: "Klient, Prizren", rating: 5 },
      { quote: "Çmime konkurruese dhe cilësi e lartë. SWISSTECH-u është kompania e duhur për dritare dhe dyer.", name: "Flamur Sejdiu", role: "Klient, Gjakovë", rating: 5 },
      { quote: "Prodhimi lokal me standard gjerman — kombinim perfekt. Oferta u dërgua brenda 24 orësh.", name: "Donika Rexhepi", role: "Arkitekte, Studio DR", rating: 5 },
      { quote: "Kemi punuar me SWISSTECH-un për disa projekte. Cilësia është konstante dhe montimi gjithmonë preciz.", name: "Agron Berisha", role: "Kontraktor, AB Ndërtim", rating: 5 },
      { quote: "Fasada e ndërtesës sonë u realizua nga SWISSTECH — rezultati është impresionues dhe klientët na pyesin çdo ditë.", name: "Nita Bajrami", role: "Pronare, Qendra Tregtare Nano", rating: 5 },
    ],
    faqIntro: "Pyetje teknike? Ja përgjigjet.",
    faqs: [
      { q: "Sa kohë duhet nga porosia deri te montimi?", a: "Prodhimi standard zgjat 10–15 ditë pune. Për porosi urgjente, ofrojmë shërbim të përshpejtuar brenda 7 ditësh (me tarifë shtesë)." },
      { q: "Çfarë garancish ofroni?", a: "Ofrojmë garanci 10-vjeçare për profilet PVC dhe alumini, 5-vjeçare për mekanizmat dhe aksesorët, dhe 2-vjeçare për montimin. Xhami garanton nga prodhuesi (6–8 vjet)." },
      { q: "A mund të vizitojmë fabrikën tuaj?", a: "Po. Fabrika jonë është e hapur për vizita me takim paraprak. Mund të shihni procesin e prodhimit dhe kampionët e materialeve direkt." },
    ],
    theme: {
      bg: "#0f1419",
      bgAlt: "#1a2028",
      surface: "#1e2630",
      fg: "#e8edf2",
      muted: "#808f9e",
      border: "#2a3642",
      accent: "#00a0a2",
      accentFg: "#111111",
      navBg: "rgba(15, 20, 25, 0.92)",
      heroBg: "#0f1419",
    },
  },
  {
    id: "torre-umbria",
    name: "TORRE DI UMBRIA",
    tagline: "Zhvillim i Ndërtesave Rezidenciale",
    description: "Zhvillim ndërtesash rezidenciale në Kosovë, nga koncepti deri te dorëzimi final.",
    subdomain: "torre-umbria.torre-ks.com",
    externalUrl: "https://torre-umbria.torre-ks.com",
    path: "/",
    phone: "+383 49 599 405",
    email: "info@torre-umbria.torre-ks.com",
    motion: "subtle",
    // Bespoke 4th variant, unique to this brand — see design-variants.ts. Was briefly
    // "minimal" (shared with Magfa) as a stopgap before this was built.
    vibe: "dossier",
    sectionOrder: ["proof", "services", "faq"],
    previewSectionOrder: ["pourquoi", "services", "process", "faq"],
    accentHsl: "132 21% 47%",
    category: "Zhvillim Rezidencial",
    heroHeadline: "Ndërtesa Moderne. Cilësi e Garantuar.",
    heroSub: "TORRE DI UMBRIA zhvillon ndërtesa rezidenciale në Kosovë. Nga koncepti deri te dorëzimi final.",
    // Stock photography, used as decorative hero backdrop only — not a TORRE DI UMBRIA project.
    heroImage: "/images/torre-umbria/hero.jpg",
    heroImageAlt: "Ndërtesë moderne rezidenciale e bardhë me ballkone",
    proofEyebrow: "Pse TORRE DI UMBRIA",
    proofTitle: "Zhvillues, jo ndërtues i rastësishëm.",
    proofFacts: [
      "Themeluar nga TORRE GROUP — familje ndërtuesish që nga 1950.",
      "Menaxhojmë çdo leje — urbanistike, ndërtimore dhe mjedisore.",
      "Garanci 10-vjeçare për strukturën dhe fondamentin.",
    ],
    services: [
      { title: "Zhvillim Ndërtesash", description: "Projektim dhe ndërtim ndërtesash rezidenciale moderne me arkitekturë bashkëkohore dhe materiale cilësore.", price: "Me kërkesë", icon: "Building2" },
      { title: "Menaxhim Projekti", description: "Menaxhim i plotë i projekteve të ndërtimit — planifikim, koordinim, mbikëqyrje dhe raportim periodik.", price: "Me kërkesë", icon: "HardHat" },
      { title: "Arkitekturë & Inxhinieri", description: "Shërbime të plota arkitekturore dhe inxhinierike — nga studimet paraprake deri te vizatimet e detajuara.", price: "Me kërkesë", icon: "Layers" },
      { title: "Infrastrukturë & Rrjete", description: "Realizim i rrjeteve të ujësjellësit, kanalizimit, energjisë elektrike dhe telekomunikacionit sipas standardeve moderne.", price: "Me kërkesë", icon: "Zap" },
      { title: "Hapësira të Përbashkëta", description: "Dizajn dhe realizim i hapësirave të përbashkëta — hyrje, ashensorë, kopshte dhe zona pushimi.", price: "Me kërkesë", icon: "Leaf" },
      { title: "Certifikim & Dokumentacion", description: "Trajtim i të gjitha lejeve, certifikatave dhe dokumenteve ligjore të nevojshme për legalizim dhe regjistrim.", price: "Me kërkesë", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "1950", label: "Origjina e Familjes" },
      { value: "10", label: "Vjet Garanci Strukture" },
      { value: "100%", label: "Projekte të Legalizuara" },
      { value: "1", label: "Pikë Kontakti, Nga Fillimi te Fundi" },
    ],
    testimonials: [
      { quote: "TORRE DI UMBRIA ndërtoi ndërtesën tonë sipas çdo specifikimi. Cilësia e punës dhe serioziteti i ekipit janë të jashtëzakonshëm.", name: "Kushtrim Gashi", role: "Investitor, Prishtinë", rating: 5 },
      { quote: "Koordinimi i projektit ishte impresionues — çdo fazë e dokumentuar dhe komunikimi me ekipin gjithmonë i hapur.", name: "Valdete Limani", role: "Investitore, Prizren", rating: 5 },
      { quote: "Ndërtesa jonë rezidenciale u dorëzua në kohë me të gjitha lejet në rregull. Procesi ishte shumë profesional.", name: "Rron Selimi", role: "Investitor, Ferizaj", rating: 5 },
      { quote: "Cilësia e materialeve të ndërtimit dhe preciziteti i punimeve janë standardet më të larta që kemi parë.", name: "Drita Mujaj", role: "Arkitekte, DM Studio", rating: 5 },
      { quote: "TORRE DI UMBRIA menaxhoi projektin tonë me efikasitet total. Asnjë surprizë, asnjë vonesë.", name: "Faton Kelmendi", role: "Investitor, Gjakovë", rating: 5 },
      { quote: "Punojmë me TORRE DI UMBRIA-n prej vitesh. Standartet e tyre janë konstante dhe rezultatet janë gjithmonë sipër pritshmërive.", name: "Shpend Canolli", role: "Zhvillues, SC Properties", rating: 5 },
    ],
    faqIntro: "Pyetjet e investitorëve tanë.",
    faqs: [
      { q: "Si fillon bashkëpunimi me TORRE DI UMBRIA-n?", a: "Procesi fillon me një takim konsultativ ku diskutojmë projektin, tokën/lokacionin, buxhetin dhe afatet. Pastaj ekipi ynë përgatit një studim parafizibiliteti falas." },
      { q: "Sa kohë zgjat ndërtimi i një ndërtese?", a: "Koha varet nga madhësia dhe kompleksiteti. Zakonisht, ndërtimi i një ndërtese 5–8 katësh zgjat 18–30 muaj nga marrja e lejeve deri te dorëzimi." },
      { q: "A ofrohet garanci pas dorëzimit?", a: "Po. Ofrojmë garanci 10-vjeçare për strukturën dhe fondamentin, 5-vjeçare për punimet e ndërtimit dhe 2-vjeçare për instalimet dhe punimet e brendshme." },
    ],
    theme: {
      // Deep warm charcoal, not clinical pure black — reads as a developer's
      // office, not a terminal. Same for the desaturated forest-green accent
      // below: still green (the brand differentiator), just not neon.
      bg: "#14171a",
      bgAlt: "#1b1f1e",
      surface: "#20241f",
      fg: "#e8ece6",
      muted: "#8a9a8a",
      border: "#2a2f2a",
      accent: "#5f9169",
      accentFg: "#111111",
      navBg: "rgba(20, 23, 26, 0.92)",
      heroBg: "#14171a",
    },
  },
  {
    id: "torrehome",
    name: "TORRE HOME",
    tagline: "Katër Breza Ndërtimi. Një Adresë e Re.",
    description: "TORRE HOME ndërton në rrugën Emin Duraku, Ferizaj. Apartamente premium në Ndërtesa 1 dhe Ndërtesa 2.",
    subdomain: "torrehome.torre-ks.com",
    externalUrl: "https://torrehome.torre-ks.com",
    path: "/",
    phone: "+383 49 599 405",
    email: "info@torrehome.torre-ks.com",
    motion: "subtle",
    vibe: "editorial",
    sectionOrder: ["gallery", "proof", "services", "faq"],
    previewSectionOrder: ["gallery", "services", "pourquoi", "process", "faq"],
    accentHsl: "212 47% 29%",
    category: "Apartamente në Ferizaj",
    heroHeadline: "Apartamenti Juaj, Në Zemër të Ferizajt.",
    heroSub: "TORRE HOME ndërton në rrugën Emin Duraku, Ferizaj. Ndërtesa 1 dhe Ndërtesa 2, pranë parkut të ri të qytetit.",
    heroImage: "/images/torrehome/hero-day.jpg",
    heroImageAlt: "Fasada e Ndërtesës TORRE HOME, pamje dite",
    gallery: [
      { src: "/images/torrehome/hero-day.jpg", alt: "TORRE HOME, pamje ditore e fasadës", caption: "Fasada Kryesore" },
      { src: "/images/torrehome/exterior-night.jpg", alt: "TORRE HOME i ndriçuar natën", caption: "Ndërtesa Natën" },
      { src: "/images/torrehome/exterior-alt.jpg", alt: "TORRE HOME, pamje nga këndi i rrugës", caption: "Pamje nga Rruga" },
      // terrace-detail.jpg dropped: it's a composite marketing slide (photo +
      // baked-in text panel), not a plain photo — object-cover crops it
      // unpredictably depending on tile aspect ratio. Re-add once a
      // photo-only crop of it exists.
      { src: "/images/torrehome/duplex-lower.jpg", alt: "Render 3D i katit të poshtëm të një dupleksi, me kuzhinë, ndenjëse dhe tarracë", caption: "Duplex — Kati i Poshtëm" },
      { src: "/images/torrehome/duplex-upper.jpg", alt: "Render 3D i katit të sipërm të një dupleksi me shkallë të brendshme", caption: "Duplex — Kati i Sipërm" },
      { src: "/images/torrehome/penthouse-layout.jpg", alt: "Render 3D i planimetrisë së penthouse-it me tri dhoma gjumi", caption: "Penthouse — Planimetria" },
      { src: "/images/torrehome/floorplan-a2.jpg", alt: "Plan apartamenti 3-dhomësh, tip A2, 132.39 m²", caption: "Plan Apartamenti — Tip A2" },
      { src: "/images/torrehome/parking.jpg", alt: "Parkingu nëntokësor i sigurt i TORRE HOME", caption: "Parkingu Nëntokësor" },
    ],
    proofEyebrow: "Pse TORRE HOME",
    proofTitle: "Dy ndërtesa reale, jo një koncept.",
    proofFacts: [
      "Katër breza trashëgimi ndërtimi, që nga 1950 në Stubëll të Vitisë.",
      "Dy ndërtesa reale në rrugën Emin Duraku, Ferizaj.",
      "0% paradhënie me kredi, sipas bankave partnere.",
    ],
    services: [
      { title: "Ndërtesa 1 — Apartamente", description: "Apartamente 1+1, 2+1 dhe 3+1 në Ndërtesën 1. Kati i parë deri kati i tetë. Pamje panoramike dhe parking i siguruar.", price: "Nga €55,000", icon: "Building2" },
      { title: "Ndërtesa 2 — Apartamente", description: "Apartamente luksoze 2+1 dhe 3+1 në Ndërtesën 2 me finime premium. Tarracë, ashensor dhe sistem sigurie 24/7.", price: "Nga €75,000", icon: "Building" },
      { title: "Blerje me Kredi", description: "Bashkëpunojmë me bankat lokale për t'ju ofruar kushtet më të mira të financimit. Proces i thjeshtë dhe i shpejtë.", price: "0% paradhënie", icon: "TrendingUp" },
      { title: "Apartamente të Gatshme", description: "Apartamente të gatshme për t'u banuar menjëherë — të mobiluara ose të pamobiluara sipas zgjedhjes suaj.", price: "Me kërkesë", icon: "Home" },
      { title: "Personalizim i Brendshëm", description: "Zgjidhni finimetin tuaj të preferuar — dysheme, flise, ngjyra muresh dhe pajisje sanitare sipas katalogjeve tona premium.", price: "Falas", icon: "Sparkles" },
      { title: "Menaxhim Prone", description: "Shërbim menaxhimi prone për investitorët — qiradhënie, mirëmbajtje dhe administrim profesional i apartamentit tuaj.", price: "Nga €80/muaj", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "2", label: "Ndërtesa Reale" },
      { value: "1950", label: "Origjina e Familjes" },
      { value: "0%", label: "Paradhënie me Kredi" },
      { value: "A+", label: "Klasa Energjetike" },
    ],
    testimonials: [
      { quote: "Blemë apartamentin tonë në Ndërtesën 1 — procesi ishte i thjeshtë dhe transparent. Jemi shumë të kënaqur me cilësinë.", name: "Besnik Aliu", role: "Pronar Apartamenti, Ndërtesa 1", rating: 5 },
      { quote: "Ndërtesa 2 tejkaloi pritshmëritë tona. Materialet janë premium dhe ekipi i shitjes ishte shumë i dobishëm gjatë gjithë procesit.", name: "Lindita Hoxha", role: "Pronare Apartamenti, Ndërtesa 2", rating: 5 },
      { quote: "Investuam në apartamentin e dytë te TORRE HOME — kthimi nga qiraja është i shkëlqyer dhe menaxhimi i pronës profesional.", name: "Agim Krasniqi", role: "Investitor, Prishtinë", rating: 5 },
      { quote: "Procesi i blerjes me kredi bankare u menaxhua nga TORRE HOME nga fillimi deri në fund. Shumë lehtë.", name: "Zana Berisha", role: "Pronare Apartamenti, Ndërtesa 1", rating: 5 },
      { quote: "Kualiteti i ndërtimit të Ndërtesës 2 është i dukshëm — dyshemetë, muret, izolimi — gjithçka e nivelit të lartë.", name: "Edon Gashi", role: "Pronar Apartamenti, Ndërtesa 2", rating: 5 },
      { quote: "Personalizuam finimin e apartamentit tonë sipas preferencave tona. TORRE HOME e realizoi çdo kërkesë me profesionalizëm.", name: "Valbona Musliu", role: "Pronare Apartamenti, Ndërtesa 1", rating: 5 },
    ],
    faqIntro: "Pyetjet e blerësve tanë.",
    faqs: [
      { q: "A mund të blej me kredi bankare?", a: "Po. Bashkëpunojmë me bankat kryesore në Kosovë për të ofruar kushte krediti preferenciale. Mund të financohet deri 80% e vlerës së apartamentit me afat deri 30 vjet." },
      { q: "Sa janë shpenzimet shtesë (taksat, noteri)?", a: "Transferi i pronësisë tatohet me 0% TVSH (banesa e parë) ose 8% për blerje të dytë. Noteri kushton rreth €200–400. Regjistri i Pronave kushton €30–50." },
      { q: "A ka parking i siguruar?", a: "Po. Çdo apartament ka të paktën 1 vend parkimi të siguruar. Apartamentet me 3 dhoma kanë 2 vende parkimi. Parkingu nëntokësor është i mbrojtur 24/7." },
    ],
    theme: {
      bg: "#f0f3f7",
      bgAlt: "#e4e9f0",
      surface: "#ffffff",
      fg: "#1a2a3a",
      muted: "#506a85",
      border: "#cdd6e0",
      // Deeper shade of the original blue-grey. Kept in the same family so the brand
      // still reads as it did, but dark enough to separate from muted text.
      accent: "#27496d",
      accentFg: "#ffffff",
      navBg: "rgba(240, 243, 247, 0.92)",
      heroBg: "#f0f3f7",
    },
  },
];
