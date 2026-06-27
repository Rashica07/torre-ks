export type Brand = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  subdomain: string;
  path: string;
  accentHsl: string;
  category: string;
  heroHeadline: string;
  heroSub: string;
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

export type Service = { title: string; description: string; price: string; icon: string; };
export type Stat = { value: string; label: string };
export type Testimonial = { quote: string; name: string; role: string; rating: number };
export type Faq = { q: string; a: string };

export const BRANDS: Brand[] = [
  {
    id: "magfa",
    name: "MAGFA GROUP",
    tagline: "Ekselencë në Ndërtim",
    description: "Arkitekturë, inxhinieri dhe dizajn në shkallë institucionale — ndërtuar për klientë që pranojnë vetëm të jashtëzakonshmen.",
    subdomain: "magfa.torre-ks.com",
    path: "/magfa",
    accentHsl: "182 62% 36%",
    category: "Arkitekturë & Ndërtim",
    heroHeadline: "Ndërtuar për t'i Rezistuar Kohës.",
    heroSub: "Arkitekturë dhe ndërtim në nivelin më të lartë institucional. Nga plani kryesor deri te dorëzimi final — MAGFA GROUP nuk pranon kompromis.",
    services: [
      { title: "Arkitekturë & Planifikim Kryesor", description: "Drejtim arkitekturor nga koncepti nëpër lejen e planifikimit deri te vizatimet e ndërtimit.", price: "Nga €450,000", icon: "Building2" },
      { title: "Menaxhim Ndërtimi", description: "Menaxhim programi në terren me planifikim me precizion dhe kontroll cilësie pa kompromis.", price: "Nga €850,000", icon: "HardHat" },
      { title: "Dizajn Interiori", description: "Ambiente interiori të udhëhequra nga materiali. Çdo sipërfaqe, instalim dhe pajisje zgjedhur me rigorozitet editorial.", price: "Nga €120,000", icon: "Sparkles" },
      { title: "Inxhinieri Fasade", description: "Fasada teknikisht komplekse të inxhinieruara për qëndrueshmëri, performancë energjie dhe ndikim vizual.", price: "Nga €220,000", icon: "Layers" },
      { title: "Këshillim Financiar i Projektit", description: "Strukturim dhe mbikëqyrje e financimit të zhvillimeve në shkallë të madhe — nga borxhi kryesor deri te kapitali.", price: "Nga €35,000", icon: "TrendingUp" },
      { title: "Komisionim i Personalizuar", description: "Komisionim i dorës së bardhë për klientë me vizione singulare. Asnjë brifing nuk është shumë kompleks.", price: "Me kërkesë", icon: "Star" },
    ],
    stats: [
      { value: "2,500+", label: "Projekte të Realizuara" },
      { value: "€4.2B", label: "Vlera e Ndërtimit" },
      { value: "98%", label: "Mbajtja e Klientëve" },
      { value: "15 vjet", label: "Në Operim" },
    ],
    testimonials: [
      { quote: "MAGFA dorëzoi selinë tonë prej CHF 120M në kohë dhe 3% nën buxhet. Vëmendja ndaj xhamit të fasadës ishte e jashtëzakonshme.", name: "Luca Ferretti", role: "Drejtor Ekzekutiv, Ferretti Capital", rating: 5 },
      { quote: "Puna me MAGFA-n ishte sikur të kishim firmën arkitekturore më të mirë në botë me kontratë. Vila i tejkaloi çdo pritshmëri.", name: "Isabelle Morand", role: "Klient Privat, Gjenevë", rating: 5 },
      { quote: "Drejtimi arkitekturor që solli kullës sonë me shumë funksione ripërcaktoi çka mendonim se ishte e mundshme.", name: "Marco Ricci", role: "Drejtor, Ricci Developments", rating: 5 },
      { quote: "Nga konsultimi i parë deri te dorëzimi — transparencë absolute, cilësi absolute.", name: "Dr. Anna Keller", role: "Drejtoreshë, Keller Medical Group", rating: 5 },
      { quote: "Divizioni i ndërtimit të MAGFA-s është standardi i artë. Çdo projekt dorëzohet sikur të ishte yni.", name: "Stefan Baumann", role: "Kreu i Pasurive, UBS", rating: 5 },
      { quote: "Brendësia e personalizuar që MAGFA realizoi për penthouse-in tonë është pa krahasim. Cilësi gjenerate.", name: "Charlotte Laurent", role: "Klient Privat, Lozanë", rating: 5 },
    ],
    faqs: [
      { q: "Cila është madhësia minimale e projektit për MAGFA GROUP?", a: "Mandatet tona të arkitekturës dhe ndërtimit fillojnë zakonisht nga €2M në vlerën e projektit. Për dizajn interiori dhe këshillim, angazhimet minimale fillojnë nga €85,000." },
      { q: "A operoni ndërkombëtarisht?", a: "Po — MAGFA GROUP ka projekte aktive nëpër Zvicër, Itali, Francë, EBA dhe MB. Ne mobilizohemi kudo që mandati kërkon." },
      { q: "Si funksionon struktura e tarifave tuaja?", a: "Tarifat e arkitekturës janë zakonisht 8–14% e kostos së ndërtimit. Menaxhimi i ndërtimit është me model fiks ose si përqindje e kontratës. Dizajn interiori është kohë-dhe-materiale me retencion fiks." },
      { q: "Cila është qasja juaj ndaj qëndrueshmërisë?", a: "Të gjitha projektet e MAGFA-s synojnë minimum 25% përmirësim mbi rregulloret lokale të energjisë. Punojmë me konsulentë të certifikuar Passivhaus dhe BREEAM në çdo mandat." },
      { q: "Sa kohë zgjat një projekt tipik?", a: "Një vilë rezidenciale: 18–28 muaj nga fillimi i dizajnit. Një ndërtesë komerciale: 30–48 muaj. Ne ofrojmë një program detyrues në fazën e kontratës — jo një vlerësim." },
    ],
  },
  {
    id: "swisstech",
    name: "SWISSTECH",
    tagline: "Sisteme Dritaresh & Fasade me Precizion",
    description: "Sisteme dritaresh të inxhinieruara zviceranisht, mure xhami dhe zgjidhje fasade për arkitekturë luksoze rezidenciale dhe komerciale.",
    subdomain: "swisstech.torre-ks.com",
    path: "/swisstech",
    accentHsl: "210 30% 42%",
    category: "Dritare & Fasada",
    heroHeadline: "Xhami që Përcakton.",
    heroSub: "Sisteme dritaresh dhe fasade të inxhinieruara zviceranisht ku precizioni termik takon bukurinë arkitekturore. Garanci standarde 30-vjeçare për çdo sistem.",
    services: [
      { title: "Sisteme Dritaresh të Personalizuara", description: "Dritare alumini me ndërprerje termike dhe alumin-dru të inxhinieruara sipas standardeve Passivhaus.", price: "Nga CHF 85,000", icon: "Square" },
      { title: "Fasada me Mure Xhami", description: "Sisteme muresh xhami të bashkuara dhe me shkopinj për ndërtesa komerciale dhe rezidenciale të larta.", price: "Nga CHF 350,000", icon: "Building" },
      { title: "Zgjidhje Xhami & Qelqi", description: "Xham struktural, xham sigurie i laminuar dhe xham i zgjuar elektrokromik për projekte premium.", price: "Nga CHF 45,000", icon: "Layers" },
      { title: "Kopshte Dimërore & Dritare Çatie", description: "Konsevatori, kopshte dimërore dhe xham atriumi të personalizuar — që lidhin brendësinë me peizazhin.", price: "Nga CHF 120,000", icon: "Sun" },
      { title: "Rinovim & Restaurim", description: "Restaurim i dritareve dhe fasadave për ndërtesa të listuara — profile historikisht të sakta, performancë moderne.", price: "Nga CHF 55,000", icon: "Wrench" },
      { title: "Certifikim Inxhinierik", description: "Nënshkrim inxhinierik struktural nga palë e tretë dhe shënjimi CE për sistemet e fasadave.", price: "Nga CHF 18,000", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "1,800+", label: "Projekte Fasade" },
      { value: "CHF 2.1B", label: "Vlera e Instaluar" },
      { value: "47", label: "Shtete të Realizuara" },
      { value: "30 vjet", label: "Standardi i Garancisë" },
    ],
    testimonials: [
      { quote: "Sistemi i murit të xhamit të SWISSTECH-ut transformoi ndërtesën tonë kryesore komerciale. Kostot e energjisë u ulën me 38% krahasuar me fasadën e vjetër.", name: "Peter Zürcher", role: "Kreu i Pronës, Migros Group", rating: 5 },
      { quote: "Kopshti dimëror me xham të trefishtë që projektuan për çaletën tonë malore është teknikisht dhe estetikisht i paqortueshëm.", name: "Heidi Brunner", role: "Klient Privat, Davos", rating: 5 },
      { quote: "Çdo detaj i inxhinieruar me precizion zviceran. Asnjë devijim nga specifikimi. Zero listë punësh në dorëzim.", name: "François Dupont", role: "Drejtor Projekti, Bouygues CH", rating: 5 },
      { quote: "SWISSTECH-u është kontraktorja e vetme e fasadave me të cilën punojmë. Kur e përjetoni cilësinë e tyre, asgjë tjetër nuk pranohet.", name: "James Whitmore", role: "Kryetar, Whitmore Architecture", rating: 5 },
      { quote: "Shkalla e xhamit struktural që inxhinieruan për zyrat tona në Gjenevë është bërë ikonë. Vizitorët pyesin për të çdo ditë.", name: "Marie-Claire Bernard", role: "Drejtore Financiare, Bernard & Partners", rating: 5 },
      { quote: "Dorëzuar sipas programit në 4 shtete njëkohësisht. Logjistikë e jashtëzakonshme, cilësi e jashtëzakonshme.", name: "Aleksei Petrov", role: "Drejtor Ekzekutiv, Eastern European Retail Group", rating: 5 },
    ],
    faqs: [
      { q: "Cili është koha e kryerjes për sistemet e dritareve SWISSTECH?", a: "Dritare standarde të personalizuara: 12–16 javë nga porosia. Sisteme muresh xhami: 20–28 javë. Mbajmë profile stoku për projekte rezidenciale urgjente." },
      { q: "A i plotësojnë produktet SWISSTECH kërkesat Passivhaus?", a: "Po — gama e plotë e dritareve tona është e certifikuar sipas standardeve të Institutit Passivhaus. Ne furnizojmë rregullisht projekte të certifikuara Passivhaus dhe MINERGIE-P." },
      { q: "Cila garanci është standarde?", a: "Garanci 30-vjeçare për të gjitha profilet e aluminit. 10-vjeçare për vulat dhe pajisjet. 25-vjeçare për mbulimet e xhamit. Të gjitha të mbështetura nga fondi i garancisë me bazë zvicerane." },
      { q: "A mund të punoni me ndërtesa të listuara?", a: "Po — divizioni ynë i trashëgimisë specializohet në përputhjen e profileve historike, llojeve të xhamit dhe hekurisë ndërkohë që modernizon performancën termike dhe akustike." },
      { q: "A instaloni apo furnizoni vetëm?", a: "Të dyja. SWISSTECH-u operon ekipet e veta të certifikuara të instalimit nëpër Zvicër, Austri, Gjermani dhe Itali. Për tregjet e tjera, punojmë me partnerë instalimi të para-kualifikuar." },
    ],
  },
  {
    id: "torre-umbria",
    name: "TORRE DI UMBRIA",
    tagline: "Zhvillim i Pasurive të Paluajtshme Luksoze",
    description: "Zhvillim i pasurive rezidenciale historike nëpër adresat më të dëshiruara të Italisë. Penthouse, villa dhe pallate projektuar për ata që përcaktojnë shijen.",
    subdomain: "torre-umbria.torre-ks.com",
    path: "/torre-umbria",
    accentHsl: "148 50% 36%",
    category: "Pasuri e Paluajtshme Luksoze",
    heroHeadline: "Italia. E Ngritur.",
    heroSub: "Rezidenca historike nëpër adresat më të dëshiruara të Italisë. Penthouse, villa dhe pallate projektuar të zgjasin gjenerata.",
    services: [
      { title: "Villa Luksoze", description: "Villa private të projektuara nga arkitektë nëpër Umbria, Toskana dhe Liqenet Italiane. Ndërtim i personalizuar në tokë të zgjedhur.", price: "Nga €2,400,000", icon: "Home" },
      { title: "Koleksioni Penthouse", description: "Rezidenca në çati në Firence, Romë dhe Milan. Xham nga dyshemeja deri te tavani, tarracë private, menaxhim me porosi si standarde.", price: "Nga €1,200,000", icon: "Building2" },
      { title: "Hapësira Komerciale", description: "Zyra dhe njësi tregtare trofeu në vendndodhje qendrore italo të kategorisë A.", price: "Nga €650,000", icon: "Briefcase" },
      { title: "Blerja e Tokës", description: "Montazh i tokës jashtë tregut dhe shërbime të lejes së planifikimit për blerës institucionalë dhe privatë.", price: "Nga €180,000", icon: "MapPin" },
      { title: "Projekte Restaurimi", description: "Restaurimi i palazove historike dhe fermave — ruajtja e origjinës ndërkohë që ofrohen standarde jetese të shekullit 21.", price: "Nga €480,000", icon: "Star" },
      { title: "Portofoli i Investimeve", description: "Portofole të kuruar të pasurive italiane prodhuese të të ardhurave. Angazhim minimal €1M.", price: "Nga €1,000,000", icon: "TrendingUp" },
    ],
    stats: [
      { value: "320+", label: "Rezidenca të Realizuara" },
      { value: "€1.8B", label: "Vlera e Portofolit" },
      { value: "97%", label: "Shitur në Lansim" },
      { value: "8 qytete", label: "Nëpër Itali" },
    ],
    testimonials: [
      { quote: "Vila jonë e TORRE DI UMBRIA-s në kodrat mbi Perugia është përtej çdo gjëje që mund të kishim imagjinuar. Proporcionet janë perfekte.", name: "Sir Richard Ashworth", role: "Klient Privat, Londër", rating: 5 },
      { quote: "Penthouse-i florentinas u shit me 18% mbi rezervën brenda 72 orësh nga lansimi. Produkti i TORRE DI UMBRIA-s shet vetë.", name: "Giacomo Russo", role: "Drejtor, Russo Real Estate", rating: 5 },
      { quote: "Çdo sipërfaqe e restaurimit të palazos sonë tregon historinë e saj. TORRE DI UMBRIA kupton se autenticiteti është luksi.", name: "Countess di Castellini", role: "Klient Privat, Orvieto", rating: 5 },
      { quote: "Portofoli i tyre i investimeve ka tejkaluar banesën prime italiane me 4.2% vjetore. Administrim i jashtëzakonshëm.", name: "Hans Meyer", role: "Kryetar Investimesh, Meyer Family Office", rating: 5 },
      { quote: "Vëmendja ndaj origjinës në restaurimet e tyre është e jashtëzakonshme. Ferma ime duket sikur ka qenë gjithmonë perfekte.", name: "Sophie Laurent", role: "Klient Privat, Val d'Orcia", rating: 5 },
      { quote: "TORRE DI UMBRIA është zhvilluesi i vetëm italian të cilit i besoj për tokën jashtë tregut. Rrjeti i tyre është i pakrahasueshëm.", name: "David Chen", role: "Kryetar, Chen Capital", rating: 5 },
    ],
    faqs: [
      { q: "A mund të blejnë blerës ndërkombëtarë prona të TORRE DI UMBRIA-s?", a: "Po — kemi këshilltarë të dedikuar për blerës jashtë BE-së, duke përfshirë udhëzime për regjimin italian të taksës së sheshtë (€100,000/vit për rezidentët e rinj) dhe të gjithë procedurën notariale." },
      { q: "A shiten pronat me pronësi të plotë?", a: "Të gjitha pronat rezidenciale të TORRE DI UMBRIA-s shiten si piena proprietà — pronësi e plotë, pa pengesa." },
      { q: "Çfarë përfshihet në çmimin e blerjes?", a: "Të gjitha villat dhe penthouse-et tona përfshijnë kuzhinë të personalizuar, të gjitha pajisjet e banjës, ngrohje/ftohje nënpodiumore dhe automatizim shtëpiak si standarde. Paketa mobiliesh janë opsionale." },
      { q: "A ofroni shërbim menaxhimi me qira?", a: "Po — divizioni ynë i menaxhimit të pronës trajton qiranë afatshkurtër dhe afatgjatë, duke arritur 94% zënie të pronave të menaxhuara. Tarifa: 12% e të ardhurave bruto nga qiraja." },
      { q: "Si rezervoj një pronë?", a: "Depozita e rezervimit 10% (e kthyeshme brenda 14 ditësh) siguron çdo pronë. Kontrata paraprake brenda 30 ditësh. Përfundimi zakonisht 60–90 ditë pas." },
    ],
  },
  {
    id: "torre-home",
    name: "TORRE HOME",
    tagline: "Jetesë Rezidenciale Premium",
    description: "Shtëpi dhe rinovime të menduara me kujdes për blerës të vëmendshëm. TORRE HOME sjell ndjeshmëri luksoze në tregun rezidencial premium.",
    subdomain: "torre-home.torre-ks.com",
    path: "/torre-home",
    accentHsl: "220 14% 44%",
    category: "Banesa Premium",
    heroHeadline: "Shtëpia, e Përsosur.",
    heroSub: "Shtëpi premium, rinovime dhe ambiente interiori për blerës që e dinë si duket ekselenca. Çdo detaj i menduar. Çdo mbarim i zgjedhur.",
    services: [
      { title: "Banesa Premium", description: "Shtëpi të projektuara nga arkitektë në vendndodhje të zgjedhura. Cilësi superiore ndërtimi, materiale superiore, menaxhim superior.", price: "Nga €380,000", icon: "Home" },
      { title: "Rinovime Shtëpiake", description: "Rinovime të plota rezidenciale — nga zëvendësimi i kuzhinës deri te transformimi i të gjithë shtëpisë. E menaxhuar nga fillimi deri në fund.", price: "Nga €95,000", icon: "Wrench" },
      { title: "Stilim Interiori", description: "Paketa stilimi interiori gati për t'u shpërngulur. Mobilje, art, tapiçeri — të kuruar dhe të instaluar.", price: "Nga €45,000", icon: "Sparkles" },
      { title: "Integrim i Shtëpisë Inteligjente", description: "Automatizim shtëpiak KNX dhe Lutron. Skena ndriçimi, klimë, siguri, AV — kontroll i unifikuar.", price: "Nga €28,000", icon: "Zap" },
      { title: "Kopësht & Peizazh", description: "Arkitekturë peizazhi dhe dizajn kopshti i integruar me arkitekturën dhe aspektin e pronës.", price: "Nga €22,000", icon: "Leaf" },
      { title: "Menaxhim Prone", description: "Menaxhim prone me porosi për pronarë që duan shtëpinë e tyre të mirëmbahet sipas standardeve hoteliere.", price: "Nga €2,400/vit", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "1,200+", label: "Shtëpi të Realizuara" },
      { value: "96%", label: "Na Rekomandojnë" },
      { value: "€420M", label: "Vlera e Portofolit" },
      { value: "12 vjet", label: "Në Operim" },
    ],
    testimonials: [
      { quote: "TORRE HOME rinovoi apartamentin tonë në 11 javë — në kohë, brenda buxhetit, dhe i përfunduar bukur. I jashtëzakonshëm.", name: "Emma Scholz", role: "Klient Privat, Mynih", rating: 5 },
      { quote: "Sistemi i shtëpisë inteligjente që instaloi TORRE HOME është intuitiv dhe i padukshëm. Pikërisht çfarë duhet të jetë premium.", name: "Thomas Müller", role: "Klient Privat, Hamburg", rating: 5 },
      { quote: "Kopshti ynë ishte një kanavacë e zbrazët. TORRE HOME e ktheu në dhomën më të mirë të shtëpisë.", name: "Catherine Fournier", role: "Klient Privat, Lion", rating: 5 },
      { quote: "Shërbimi i menaxhimit të pronës ia vlen çdo euro. Shtëpia ime është në gjendje më të mirë se kur e lë.", name: "Roberto Esposito", role: "Klient Privat, Milan", rating: 5 },
      { quote: "Nga thirrja e parë deri te dorëzimi — paraprinin çdo nevoje para se ta kishim shprehur. Standarde të vërteta shërbimi hotelier.", name: "Anya Kovacs", role: "Klient Privat, Vjenë", rating: 5 },
      { quote: "Paketa e stilimit interiori e transformoi ndërtesën tonë të re nga një ndërtesë në një shtëpi të vërtetë brenda dy javësh.", name: "Henrik Larsson", role: "Klient Privat, Stokholm", rating: 5 },
    ],
    faqs: [
      { q: "Cili është ndryshimi midis TORRE HOME dhe TORRE DI UMBRIA-s?", a: "TORRE DI UMBRIA operon në segmentin ultra-luks dhe të aseteve trofeu (zakonisht €1M+). TORRE HOME shërben tregun rezidencial premium nga rinovimet €95,000 deri te ndërtesat e reja €2M — cilësi e jashtëzakonshme, akses më i gjerë." },
      { q: "Sa kohë zgjat një rinovim tipik?", a: "Rinovim i plotë apartamenti (80–120m²): 8–14 javë. Projekt vetëm kuzhinë: 3–5 javë. Shtëpi e plotë: 16–26 javë. Ne ofrojmë një program fiks para fillimit të punës." },
      { q: "A punoni ndërkufitarisht?", a: "TORRE HOME aktualisht operon në Zvicër, Gjermani, Austri, Francë dhe Itali. Po zgjerojmë në Portugali dhe MB në T1 2026." },
      { q: "Cili është procesi juaj për blerjet e ndërtesave të reja?", a: "Prezantojmë parcela të disponueshme dhe projekte ekzistuese çdo muaj klientëve të regjistruar. Rezervimi kërkon depozitë 5%. Përfundimi në dorëzim — pa pagesa me faza për rezidenciale." },
      { q: "A ka një shpenzim minimal për menaxhimin e pronës?", a: "Shërbimi ynë i menaxhimit fillon nga €2,400/vit për apartamente deri në 100m². Kjo mbulon inspektime tremujore, reagim emergjent dhe menaxhim të shërbimeve. Pronat më të mëdha caktohen individualisht." },
    ],
  },
];
