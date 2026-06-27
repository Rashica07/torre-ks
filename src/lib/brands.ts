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

export type Brand = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  subdomain: string;
  externalUrl: string;
  path: string;
  accentHsl: string;
  category: string;
  heroHeadline: string;
  heroSub: string;
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: Faq[];
  theme: BrandTheme;
};

export type Service = { title: string; description: string; price: string; icon: string; };
export type Stat = { value: string; label: string };
export type Testimonial = { quote: string; name: string; role: string; rating: number };
export type Faq = { q: string; a: string };

export const BRANDS: Brand[] = [
  {
    id: "magfa",
    name: "MAGFA GROUP",
    tagline: "Ndërtim Shtëpish me Cilësi",
    description: "Ndërtim shtëpish private dhe rezidenciale me materiale premium. Nga themeli deri te çelësi — MAGFA GROUP ndërton ëndrrën tuaj.",
    subdomain: "magfa.torre-ks.com",
    externalUrl: "https://magfa.torre-ks.com",
    path: "/magfa",
    accentHsl: "200 100% 45%",
    category: "Ndërtim Rezidencial",
    heroHeadline: "Shtëpia Juaj, e Ndërtuar Saktë.",
    heroSub: "MAGFA GROUP specializohet në ndërtimin e shtëpive private dhe rezidenciale. Cilësi superiore, materiale premium dhe dorëzim në kohë — garantuar.",
    services: [
      { title: "Ndërtim Shtëpish Private", description: "Ndërtim shtëpish individuale nga themeli deri te përfundimi. Çdo detaj i planifikuar dhe realizuar me kujdes.", price: "Nga €45,000", icon: "Home" },
      { title: "Dizajn Arkitekturor", description: "Projektim arkitekturor i personalizuar sipas nevojave dhe dëshirave tuaja. Plani ideal për shtëpinë tuaj.", price: "Nga €2,500", icon: "Building2" },
      { title: "Renovim & Rinovim", description: "Renovim i plotë ose i pjesshëm i shtëpive ekzistuese. Transformojmë hapësirën tuaj me cilësi dhe stil.", price: "Nga €8,000", icon: "Wrench" },
      { title: "Dizajn Interiori", description: "Dizajn i brendshëm profesional — nga zgjedhja e ngjyrave deri te vendosja e mobiljeve dhe ndriçimit.", price: "Nga €1,500", icon: "Sparkles" },
      { title: "Mbikëqyrje e Ndërtimit", description: "Mbikëqyrje profesionale e çdo faze të ndërtimit. Sigurohemi që gjithçka realizohet sipas standardeve.", price: "Nga €900", icon: "HardHat" },
      { title: "Konsultim Falas", description: "Konsultim fillestar falas për të diskutuar projektin tuaj, buxhetin dhe afatet kohore.", price: "Falas", icon: "Star" },
    ],
    stats: [
      { value: "350+", label: "Shtëpi të Ndërtuara" },
      { value: "15+", label: "Vjet Përvojë" },
      { value: "98%", label: "Klientë të Kënaqur" },
      { value: "100%", label: "Dorëzim në Kohë" },
    ],
    testimonials: [
      { quote: "MAGFA GROUP ndërtoi shtëpinë tonë saktësisht siç e imagjinonim. Cilësia e materialeve dhe punës është e jashtëzakonshme.", name: "Arben Krasniqi", role: "Klient, Prishtinë", rating: 5 },
      { quote: "Nga konsultimi i parë deri te çelësi — ekipi i MAGFA-s ishte profesional dhe transparent gjatë gjithë procesit.", name: "Vjosa Berisha", role: "Klient, Prizren", rating: 5 },
      { quote: "Renovimi i shtëpisë sonë u krye brenda afatit dhe buxhetit. Rezultati tejkaloi çdo pritshmëri.", name: "Driton Morina", role: "Klient, Ferizaj", rating: 5 },
      { quote: "Ekipi i MAGFA-s është shumë profesional. Çdo pyetje u iu përgjigj me kujdes dhe transparencë.", name: "Liridon Hoxha", role: "Klient, Gjakovë", rating: 5 },
      { quote: "Shtëpia jonë është realizimi i ëndrrës. MAGFA GROUP e ktheu vizionin tonë në realitet.", name: "Shqipe Gashi", role: "Klient, Mitrovicë", rating: 5 },
      { quote: "Punë cilësore, njerëz të besueshëm. MAGFA GROUP është zgjedhja e duhur për çdo projekt ndërtimi.", name: "Mentor Aliu", role: "Klient, Pejë", rating: 5 },
    ],
    faqs: [
      { q: "Sa kohë zgjat ndërtimi i një shtëpie?", a: "Koha e ndërtimit varet nga madhësia dhe kompleksiteti i projektit. Mesatarisht, një shtëpi standarde (150–200m²) ndërtohet brenda 8–14 muajsh nga fillimi i punimeve." },
      { q: "A jepni garanci për punën e kryer?", a: "Po — ofrojmë garanci 5-vjeçare për strukturën e ndërtimit dhe 2-vjeçare për punimet e brendshme (suvatime, bojëra, veshje). Çdo material vjen me garancitë e prodhuesit." },
      { q: "Si funksionon procesi i pagesës?", a: "Pagesat bëhen në faza sipas avancimit të punimeve: 20% në nënshkrimin e kontratës, 30% në përfundimin e strukturës, 30% në suvatim, dhe 20% në dorëzim final." },
      { q: "A kryeni punë edhe jashtë Prishtinës?", a: "Po — operojmë në të gjithë Kosovën, duke përfshirë Prizrenin, Ferizajn, Gjakovën, Pejën dhe Mitrovicën. Transporti dhe logjistika përfshihen në ofertë." },
      { q: "A mund të na ndihmoni me lejet e ndërtimit?", a: "Po — MAGFA GROUP ofron ndihmë të plotë me procedurën e lejeve të ndërtimit, duke punuar me arkitektë të licencuar dhe duke u marrë me të gjitha dokumentet e nevojshme." },
    ],
    theme: {
      bg: "#faf8f6",
      bgAlt: "#f3efeb",
      surface: "#ffffff",
      fg: "#2c2420",
      muted: "#8d7e74",
      border: "#e0d6ce",
      accent: "#00a0e9",
      accentFg: "#ffffff",
      navBg: "rgba(250, 248, 246, 0.92)",
      heroBg: "#faf8f6",
    },
  },
  {
    id: "swisstech",
    name: "SWISSTECH",
    tagline: "Fabrikë Dritaresh & Montim Professional",
    description: "Prodhim dhe montim i dritareve dhe dyerve PVC e alumini me cilësi evropiane. Fabrika jonë lokale siguron çmime konkurruese dhe dorëzim të shpejtë.",
    subdomain: "swisstech.torre-ks.com",
    externalUrl: "https://swisstech.torre-ks.com",
    path: "/swisstech",
    accentHsl: "180 100% 30%",
    category: "Dritare & Fasada",
    heroHeadline: "Dritaret e Cilësisë Evropiane.",
    heroSub: "SWISSTECH prodhon dhe monton dritare e dyer PVC dhe alumini me precizion gjerman. Fabrika jonë garanton cilësi maksimale dhe izolim termik superior.",
    services: [
      { title: "Dritare PVC", description: "Dritare PVC me profil gjerman — izolim termik dhe akustik i shkëlqyer. Të disponueshme në të gjitha madhësitë dhe ngjyrat.", price: "Nga €85/m²", icon: "Square" },
      { title: "Dritare Alumini", description: "Dritare dhe fasada alumini me ndërprerje termike për ndërtesa residenciale dhe komerciale. Dizajn modern dhe i qëndrueshëm.", price: "Nga €120/m²", icon: "Layers" },
      { title: "Dyer PVC & Alumini", description: "Dyer hyrëse, ballkonesh dhe garazhesh me siguri të lartë dhe izolim të plotë. Sistemet tona plotësojnë standardet evropiane.", price: "Nga €350/copë", icon: "Building" },
      { title: "Montim Professional", description: "Ekipet tona të certifikuara montojnë çdo sistem me precizion. Montim i saktë = performancë maksimale dhe garanci e plotë.", price: "Nga €15/m²", icon: "HardHat" },
      { title: "Fasada & Xham Struktural", description: "Sisteme fasadash me xham për ndërtesa komerciale dhe rezidenciale. Dizajn arkitekturor me performancë energjetike superiore.", price: "Me kërkesë", icon: "Building2" },
      { title: "Servisim & Riparim", description: "Servisim periodik, rregullim dhe riparim i dritareve dhe dyerve ekzistuese. Zëvendësim xhami dhe guarnicionesh.", price: "Nga €30", icon: "Wrench" },
    ],
    stats: [
      { value: "5,000+", label: "Dritare të Montuara" },
      { value: "12+", label: "Vjet në Treg" },
      { value: "48h", label: "Dorëzim Oferte" },
      { value: "10 vjet", label: "Garanci Profile" },
    ],
    testimonials: [
      { quote: "Dritaret e SWISSTECH-ut janë të jashtëzakonshme — shtëpia jonë është shumë më e ngrohtë gjatë dimrit dhe ka reduktuar konsumin e ngrohjes.", name: "Burim Kastrati", role: "Klient, Prishtinë", rating: 5 },
      { quote: "Montimi u krye brenda dy ditëve pa asnjë problem. Ekipi ishte shumë profesional dhe i rregullt.", name: "Teuta Osmani", role: "Klient, Prizren", rating: 5 },
      { quote: "Çmime konkurruese dhe cilësi e lartë. SWISSTECH-u është kompania e duhur për dritare dhe dyer.", name: "Flamur Sejdiu", role: "Klient, Gjakovë", rating: 5 },
      { quote: "Prodhimi lokal me standard gjerman — kombinim perfekt. Oferta u dërgua brenda 24 orësh.", name: "Donika Rexhepi", role: "Arkitekte, Studio DR", rating: 5 },
      { quote: "Kemi punuar me SWISSTECH-un për disa projekte. Cilësia është konstante dhe montimi gjithmonë preciz.", name: "Agron Berisha", role: "Kontraktor, AB Ndërtim", rating: 5 },
      { quote: "Fasada e ndërtesës sonë u realizua nga SWISSTECH — rezultati është impresionues dhe klientët na pyesin çdo ditë.", name: "Nita Bajrami", role: "Pronare, Qendra Tregtare Nano", rating: 5 },
    ],
    faqs: [
      { q: "Sa kohë duhet nga porosia deri te montimi?", a: "Prodhimi standard zgjat 10–15 ditë pune. Për porosi urgjente, ofrojmë shërbim të përshpejtuar brenda 7 ditësh (me tarifë shtesë). Montimi planifikohet menjëherë pas arritjes së produkteve." },
      { q: "Çfarë garancish ofroni?", a: "Ofrojmë garanci 10-vjeçare për profilet PVC dhe alumini, 5-vjeçare për mekanizmat dhe aksesorët, dhe 2-vjeçare për montimin. Xhami garanton nga prodhuesi (6–8 vjet)." },
      { q: "A mund të vizitojmë fabrikën tuaj?", a: "Po — fabrika jonë është e hapur për vizita me takim paraprak. Mund të shihni procesin e prodhimit dhe kampionët e materialeve direkt." },
      { q: "A bëni matje në terren?", a: "Po — ekipi ynë teknik vjen falas për matje të sakta në terren para se të fillojë prodhimi. Saktësia e matjes është çelësi i montimit perfekt." },
      { q: "A punoni me kontraktorë dhe arkitektë?", a: "Po — kemi program special për kontraktorë dhe arkitektë me çmime preferenciale, suport teknik dhe dorëzim prioritar. Na kontaktoni për partneritet." },
    ],
    theme: {
      bg: "#0f1419",
      bgAlt: "#1a2028",
      surface: "#1e2630",
      fg: "#e8edf2",
      muted: "#7a8a9a",
      border: "#2a3642",
      accent: "#009698",
      accentFg: "#ffffff",
      navBg: "rgba(15, 20, 25, 0.92)",
      heroBg: "#0f1419",
    },
  },
  {
    id: "torre-umbria",
    name: "TORRE DI UMBRIA",
    tagline: "Zhvillim i Ndërtesave Rezidenciale",
    description: "Ndërtim dhe zhvillim i ndërtesave rezidenciale moderne në Kosovë. Projektet tona combinojnë arkitekturë bashkëkohore me cilësi ndërtimi të lartë.",
    subdomain: "torre-umbria.torre-ks.com",
    externalUrl: "https://torre-umbria.torre-ks.com",
    path: "/torre-umbria",
    accentHsl: "142 70% 45%",
    category: "Zhvillim Rezidencial",
    heroHeadline: "Ndërtesa Moderne. Cilësi e Garantuar.",
    heroSub: "TORRE DI UMBRIA zhvillon ndërtesa rezidenciale moderne në Kosovë — nga koncepti arkitekturor deri te dorëzimi final, me standarde ndërtimi të larta.",
    services: [
      { title: "Zhvillim Ndërtesash", description: "Projektim dhe ndërtim ndërtesash rezidenciale moderne me arkitekturë bashkëkohore dhe materiale cilësore.", price: "Me kërkesë", icon: "Building2" },
      { title: "Menaxhim Projekti", description: "Menaxhim i plotë i projekteve të ndërtimit — planifikim, koordinim, mbikëqyrje dhe raportim periodik.", price: "Me kërkesë", icon: "HardHat" },
      { title: "Arkitekturë & Inxhinieri", description: "Shërbime të plota arkitekturore dhe inxhinierike — nga studimet paraprake deri te vizatimet e detajuara.", price: "Me kërkesë", icon: "Layers" },
      { title: "Infrastrukturë & Rrjete", description: "Realizim i rrjeteve të ujësjellësit, kanalizimit, energjisë elektrike dhe telekomunikacionit sipas standardeve moderne.", price: "Me kërkesë", icon: "Zap" },
      { title: "Hapësira të Përbashkëta", description: "Dizajn dhe realizim i hapësirave të përbashkëta — hyrje, ashensorë, kopshte dhe zona pushimi.", price: "Me kërkesë", icon: "Leaf" },
      { title: "Certifikim & Dokumentacion", description: "Trajtim i të gjitha lejeve, certifikatave dhe dokumenteve ligjore të nevojshme për legalizim dhe regjistrim.", price: "Me kërkesë", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "8+", label: "Ndërtesa të Realizuara" },
      { value: "500+", label: "Njësi Rezidenciale" },
      { value: "10+", label: "Vjet Përvojë" },
      { value: "100%", label: "Projekte të Legalizuara" },
    ],
    testimonials: [
      { quote: "TORRE DI UMBRIA ndërtoi ndërtesën tonë sipas çdo specifikimi. Cilësia e punës dhe serioziteti i ekipit janë të jashtëzakonshëm.", name: "Kushtrim Gashi", role: "Investitor, Prishtinë", rating: 5 },
      { quote: "Koordinimi i projektit ishte impresionues — çdo fazë e dokumentuar dhe komunikimi me ekipin gjithmonë i hapur.", name: "Valdete Limani", role: "Investitore, Prizren", rating: 5 },
      { quote: "Ndërtesa jonë rezidenciale u dorëzua në kohë me të gjitha lejet në rregull. Procesi ishte shumë profesional.", name: "Rron Selimi", role: "Investitor, Ferizaj", rating: 5 },
      { quote: "Cilësia e materialeve të ndërtimit dhe preciziteti i punimeve janë standardet më të larta që kemi parë.", name: "Drita Mujaj", role: "Arkitekte, DM Studio", rating: 5 },
      { quote: "TORRE DI UMBRIA menaxhoi projektin tonë me efikasitet total. Asnjë surprizë, asnjë vonesë.", name: "Faton Kelmendi", role: "Investitor, Gjakovë", rating: 5 },
      { quote: "Punojmë me TORRE DI UMBRIA-n prej vitesh. Standartet e tyre janë konstante dhe rezultatet janë gjithmonë sipër pritshmërive.", name: "Shpend Canolli", role: "Zhvillues, SC Properties", rating: 5 },
    ],
    faqs: [
      { q: "Si fillon bashkëpunimi me TORRE DI UMBRIA-n?", a: "Procesi fillon me një takim konsultativ ku diskutojmë projektin, tokën/lokacionin, buxhetin dhe afatet. Pastaj ekipi ynë përgatit një studim parafizibilitet falas." },
      { q: "A merreni me gjetjen e tokës?", a: "Po — mund t'ju ndihmojmë në identifikimin e lokacioneve të përshtatshme për zhvillim, duke marrë parasysh infrastrukturën, aksesin dhe potencialin e zhvillimit." },
      { q: "Sa kohë zgjat ndërtimi i një ndërtese?", a: "Koha varet nga madhësia dhe kompleksiteti. Zakonisht, ndërtimi i një ndërtese 5–8 katësh zgjat 18–30 muaj nga marrja e lejeve deri te dorëzimi." },
      { q: "A merreni me të gjitha lejet e ndërtimit?", a: "Po — TORRE DI UMBRIA merret me të gjithë procesin e lejeve: urbanistike, ndërtimore, mjedisore dhe çdo dokument tjetër i nevojshëm nga institucionet kompetente." },
      { q: "A ofrohet garanci pas dorëzimit?", a: "Po — ofrojmë garanci 10-vjeçare për strukturën dhe fondaminët, 5-vjeçare për punimet e ndërtimit dhe 2-vjeçare për instalimet dhe punimet e brendshme." },
    ],
    theme: {
      bg: "#0a0f0a",
      bgAlt: "#111a11",
      surface: "#162016",
      fg: "#e4f0e4",
      muted: "#6b8a6b",
      border: "#243024",
      accent: "#22c55e",
      accentFg: "#ffffff",
      navBg: "rgba(10, 15, 10, 0.92)",
      heroBg: "#0a0f0a",
    },
  },
  {
    id: "torre-home",
    name: "TORRE HOME",
    tagline: "Apartamente Premium në Kosovë",
    description: "Blini apartamentin tuaj ideal në ndërtesat moderne të TORRE GROUP në Kosovë. Ndërtesa 1 dhe Ndërtesa 2 ofrojnë jetesë të rehatshme me standarde evropiane.",
    subdomain: "torre-home.torre-ks.com",
    externalUrl: "https://torre-home.torre-ks.com",
    path: "/torre-home",
    accentHsl: "215 20% 46%",
    category: "Apartamente në Kosovë",
    heroHeadline: "Apartamenti Juaj në Kosovë.",
    heroSub: "TORRE HOME ju ofron mundësinë të blini apartament premium në ndërtesat tona moderne. Ndërtesa 1 dhe Ndërtesa 2 — cilësi e lartë, çmim i drejtë, lokacion ideal.",
    services: [
      { title: "Ndërtesa 1 — Apartamente", description: "Apartamente 1+1, 2+1 dhe 3+1 në Ndërtesën 1. Kati i parë deri kati i tetë. Pamje panoramike dhe parking i siguruar.", price: "Nga €55,000", icon: "Building2" },
      { title: "Ndërtesa 2 — Apartamente", description: "Apartamente luksoze 2+1 dhe 3+1 në Ndërtesën 2 me finime premium. Tarracë, ashensor dhe sistem sigurie 24/7.", price: "Nga €75,000", icon: "Building" },
      { title: "Blerje me Kredi", description: "Bashkëpunojmë me bankat lokale për t'ju ofruar kushtet më të mira të financimit. Proces i thjeshtë dhe i shpejtë.", price: "0% paradhënie", icon: "TrendingUp" },
      { title: "Apartamente të Gatshme", description: "Apartamente të gatshme për t'u banuar menjëherë — të mobiluara ose të pamobiluara sipas zgjedhjes suaj.", price: "Me kërkesë", icon: "Home" },
      { title: "Personalizim i Brendshëm", description: "Zgjidhni finimetin tuaj të preferuar — dysheme, flise, ngjyra muresh dhe pajisje sanitare sipas katalogjeve tona premium.", price: "Falas", icon: "Sparkles" },
      { title: "Menaxhim Prone", description: "Shërbim menaxhimi prone për investitorët — qiradhënie, mirëmbajtje dhe administrim profesional i apartamentit tuaj.", price: "Nga €80/muaj", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "2", label: "Ndërtesa Aktive" },
      { value: "120+", label: "Apartamente Disponueshme" },
      { value: "A+", label: "Klasa Energjetike" },
      { value: "24/7", label: "Siguri & Mbikëqyrje" },
    ],
    testimonials: [
      { quote: "Blemë apartamentin tonë në Ndërtesën 1 — procesi ishte i thjeshtë dhe transparent. Jemi shumë të kënaqur me cilësinë.", name: "Besnik Aliu", role: "Pronar Apartamenti, Ndërtesa 1", rating: 5 },
      { quote: "Ndërtesa 2 tejkaloi pritshmëritë tona. Materialet janë premium dhe ekipi i shitjes ishte shumë i dobishëm gjatë gjithë procesit.", name: "Lindita Hoxha", role: "Pronare Apartamenti, Ndërtesa 2", rating: 5 },
      { quote: "Investuam në apartamentin e dytë te TORRE HOME — kthimi nga qiraja është i shkëlqyer dhe menaxhimi i pronës profesional.", name: "Agim Krasniqi", role: "Investitor, Prishtinë", rating: 5 },
      { quote: "Procesi i blerjes me kredi bankare u menaxhua nga TORRE HOME nga fillimi deri në fund. Shumë lehtë.", name: "Zana Berisha", role: "Pronare Apartamenti, Ndërtesa 1", rating: 5 },
      { quote: "Kualiteti i ndërtimit të Ndërtesës 2 është i dukshëm — dyshemetë, muret, izolimi — gjithçka e nivelit të lartë.", name: "Edon Gashi", role: "Pronar Apartamenti, Ndërtesa 2", rating: 5 },
      { quote: "Personalizuam finimin e apartamentit tonë sipas preferencave tona. TORRE HOME e realizoi çdo kërkesë me profesionalizëm.", name: "Valbona Musliu", role: "Pronare Apartamenti, Ndërtesa 1", rating: 5 },
    ],
    faqs: [
      { q: "Çfarë dokumentesh nevojiten për të blerë apartament?", a: "Dokumentet kryesore janë: letërnjoftimi/pasaporta, numri fiskal dhe raporti i të ardhurave (për blerje me kredi). Ekipi ynë i shitjes ju udhëzon hap pas hapi." },
      { q: "A mund të blej me kredi bankare?", a: "Po — bashkëpunojmë me bankat kryesore në Kosovë për të ofruar kushte krediti preferenciale. Mund të financohet deri 80% e vlerës së apartamentit me afat deri 30 vjet." },
      { q: "Sa janë shpenzimet shtesë (taksat, noteri)?", a: "Transferi i pronësisë tatohet me 0% TVSH (banesa e parë) ose 8% për blerje të dytë. Noteri kushton rreth €200–400. Regjistri i Pronave kosto €30–50. Ne ju orientojmë për gjithçka." },
      { q: "A janë apartamentet gati për t'u banuar?", a: "Apartamentet janë gati me finime standarde premium (dysheme laminat/parket, flise banje, bojëra, instalime elektrike dhe hidraulike). Opsioni i mobilimit është i disponueshëm." },
      { q: "A ka parking i siguruar?", a: "Po — çdo apartament ka të paktën 1 vend parkimi të siguruar. Apartamentet me 3 dhoma kanë 2 vende parkimi. Parkingu nëntokësor është i mbrojtur 24/7." },
    ],
    theme: {
      bg: "#f0f3f7",
      bgAlt: "#e4e9f0",
      surface: "#ffffff",
      fg: "#1a2a3a",
      muted: "#5f7e9f",
      border: "#cdd6e0",
      accent: "#5f7e9f",
      accentFg: "#ffffff",
      navBg: "rgba(240, 243, 247, 0.92)",
      heroBg: "#f0f3f7",
    },
  },
];
