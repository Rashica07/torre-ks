export type Brand = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  subdomain: string;
  path: string;
  accentHsl: string;
  accentDark: string;
  category: string;
  heroHeadline: string;
  heroSub: string;
  services: Service[];
  stats: Stat[];
  testimonials: Testimonial[];
  faqs: Faq[];
};

export type Service = {
  title: string;
  description: string;
  price: string;
  icon: string;
};

export type Stat = { value: string; label: string };
export type Testimonial = { quote: string; name: string; role: string; rating: number };
export type Faq = { q: string; a: string };

export const BRANDS: Brand[] = [
  {
    id: "magfa",
    name: "MAGFA GROUP",
    tagline: "Excellence in Construction",
    description: "Architecture, engineering and design at institutional scale — built for clients who accept nothing less than extraordinary.",
    subdomain: "magfa.torre-ks.com",
    path: "/magfa",
    accentHsl: "42 52% 62%",
    accentDark: "42 45% 20%",
    category: "Architecture & Construction",
    heroHeadline: "Built to Outlast.",
    heroSub: "Architecture and construction at the highest institutional level. From master plan to final handover — MAGFA GROUP accepts no compromise.",
    services: [
      { title: "Architecture & Master Planning", description: "End-to-end architectural direction from concept through planning permission to construction drawings.", price: "From €450,000", icon: "Building2" },
      { title: "Construction Management", description: "On-site programme management with precision scheduling and zero-compromise quality control.", price: "From €850,000", icon: "HardHat" },
      { title: "Interior Design", description: "Material-led interior environments. Every surface, fixture and fitting selected with editorial rigour.", price: "From €120,000", icon: "Sparkles" },
      { title: "Facade Engineering", description: "Technically complex facades engineered for longevity, energy performance, and visual impact.", price: "From €220,000", icon: "Layers" },
      { title: "Project Finance Advisory", description: "Structuring and oversight for large-scale development finance — from senior debt to equity.", price: "From €35,000", icon: "TrendingUp" },
      { title: "Bespoke Commissioning", description: "White-glove commissioning for clients with singular visions. No brief too complex.", price: "On application", icon: "Star" },
    ],
    stats: [
      { value: "2,500+", label: "Projects Delivered" },
      { value: "€4.2B", label: "Construction Value" },
      { value: "98%", label: "Client Retention" },
      { value: "15 yrs", label: "In Operation" },
    ],
    testimonials: [
      { quote: "MAGFA delivered our CHF 120M headquarters on time and 3% under budget. The attention to the facade glazing was extraordinary.", name: "Luca Ferretti", role: "CEO, Ferretti Capital", rating: 5 },
      { quote: "Working with MAGFA felt like having the world's best architectural firm on retainer. The villa exceeded every expectation.", name: "Isabelle Morand", role: "Private Client, Geneva", rating: 5 },
      { quote: "The architectural direction they brought to our mixed-use tower redefined what we thought was possible.", name: "Marco Ricci", role: "MD, Ricci Developments", rating: 5 },
      { quote: "From first consultation to handover — absolute transparency, absolute quality.", name: "Dr. Anna Keller", role: "Director, Keller Medical Group", rating: 5 },
      { quote: "MAGFA's construction division is the gold standard. Every project is delivered as though it were their own.", name: "Stefan Baumann", role: "Head of Real Estate, UBS", rating: 5 },
      { quote: "The bespoke interiors MAGFA delivered for our penthouse are beyond comparison. Generational quality.", name: "Charlotte Laurent", role: "Private Client, Lausanne", rating: 5 },
    ],
    faqs: [
      { q: "What is the minimum project size for MAGFA GROUP?", a: "Our architecture and construction mandates typically begin at €2M in project value. For interior design and advisory, minimum engagements start at €85,000." },
      { q: "Do you operate internationally?", a: "Yes — MAGFA GROUP has active projects across Switzerland, Italy, France, UAE, and the UK. We mobilise wherever the mandate demands." },
      { q: "How does your fee structure work?", a: "Architecture fees are typically 8–14% of construction cost. Construction management is a fixed or percentage-of-contract model. Interior design is time-and-materials with a fixed retainer." },
      { q: "What is your sustainability approach?", a: "All MAGFA projects target a minimum 25% improvement over local energy regulations. We work with certified Passivhaus and BREEAM consultants on every mandate." },
      { q: "How long does a typical project take?", a: "A residential villa: 18–28 months from design start. A commercial building: 30–48 months. We provide a binding programme at contract stage — not an estimate." },
    ],
  },
  {
    id: "swisstech",
    name: "SWISSTECH",
    tagline: "Precision Window & Facade Systems",
    description: "Swiss-engineered window systems, curtain walls and facade solutions for luxury residential and commercial architecture.",
    subdomain: "swisstech.torre-ks.com",
    path: "/swisstech",
    accentHsl: "205 18% 68%",
    accentDark: "205 20% 18%",
    category: "Windows & Facades",
    heroHeadline: "Glass That Defines.",
    heroSub: "Swiss-engineered window and facade systems where thermal precision meets architectural beauty. 30-year standard warranty on every system.",
    services: [
      { title: "Bespoke Window Systems", description: "Thermally-broken aluminium and timber-aluminium composite windows engineered to Passivhaus standards.", price: "From CHF 85,000", icon: "Square" },
      { title: "Curtain Wall Facades", description: "Unitised and stick-built curtain wall systems for commercial and high-rise residential.", price: "From CHF 350,000", icon: "Building" },
      { title: "Glass & Glazing Solutions", description: "Structural glazing, laminated safety glass, and electrochromic smart glass for premium projects.", price: "From CHF 45,000", icon: "Layers" },
      { title: "Winter Gardens & Skylights", description: "Bespoke conservatories, winter gardens, and atrium glazing — connecting interior to landscape.", price: "From CHF 120,000", icon: "Sun" },
      { title: "Renovation & Restoration", description: "Window and facade restoration for listed buildings — period-accurate profiles, modern performance.", price: "From CHF 55,000", icon: "Wrench" },
      { title: "Engineering Certification", description: "Third-party structural engineering sign-off and CE marking for facade systems.", price: "From CHF 18,000", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "1,800+", label: "Facade Projects" },
      { value: "CHF 2.1B", label: "Installed Value" },
      { value: "47", label: "Countries Delivered" },
      { value: "30 yr", label: "Warranty Standard" },
    ],
    testimonials: [
      { quote: "SWISSTECH's curtain wall system transformed our commercial flagship. Energy costs dropped 38% against the old facade.", name: "Peter Zürcher", role: "Head of Property, Migros Group", rating: 5 },
      { quote: "The triple-glazed winter garden they designed for our mountain chalet is technically and aesthetically flawless.", name: "Heidi Brunner", role: "Private Client, Davos", rating: 5 },
      { quote: "Every detail engineered with Swiss precision. No deviation from specification. Zero punchlist at handover.", name: "François Dupont", role: "Project Director, Bouygues CH", rating: 5 },
      { quote: "SWISSTECH are the only facade contractor we work with. Once you experience their quality, nothing else is acceptable.", name: "James Whitmore", role: "Principal, Whitmore Architecture", rating: 5 },
      { quote: "The structural glass staircase they engineered for our Geneva offices has become an icon. Visitors ask about it daily.", name: "Marie-Claire Bernard", role: "CFO, Bernard & Partners", rating: 5 },
      { quote: "Delivered on programme across 4 countries simultaneously. Remarkable logistics, remarkable quality.", name: "Aleksei Petrov", role: "CEO, Eastern European Retail Group", rating: 5 },
    ],
    faqs: [
      { q: "What is the lead time for SWISSTECH window systems?", a: "Standard bespoke windows: 12–16 weeks from order. Curtain wall systems: 20–28 weeks. We hold stock profiles for urgent residential projects." },
      { q: "Do SWISSTECH products meet Passivhaus requirements?", a: "Yes — our full window range is certified to Passivhaus Institut standards. We routinely supply to Passivhaus and MINERGIE-P certified projects." },
      { q: "What warranty is standard?", a: "30-year warranty on all aluminium profiles. 10-year on seals and hardware. 25-year on glass coatings. All backed by our Swiss-domiciled guarantee fund." },
      { q: "Can you work on listed buildings?", a: "Yes — our heritage division specialises in matching historical profiles, glass types, and ironmongery while upgrading thermal and acoustic performance to modern standards." },
      { q: "Do you install or supply only?", a: "Both. SWISSTECH operates its own certified installation teams across Switzerland, Austria, Germany, and Italy. For other markets, we work with pre-qualified installation partners." },
    ],
  },
  {
    id: "torre-umbria",
    name: "TORRE UMBRIA",
    tagline: "Luxury Real Estate Development",
    description: "Landmark residential development across Italy's most coveted addresses. Penthouses, villas and palazzos designed for those who define taste.",
    subdomain: "torre-umbria.torre-ks.com",
    path: "/torre-umbria",
    accentHsl: "22 55% 58%",
    accentDark: "22 40% 18%",
    category: "Luxury Real Estate",
    heroHeadline: "Italy. Elevated.",
    heroSub: "Landmark residences across Italy's most coveted addresses. Penthouses, villas, and palazzos designed to last generations.",
    services: [
      { title: "Luxury Villas", description: "Architect-designed private villas across Umbria, Tuscany, and the Italian Lakes. Bespoke construction on curated land.", price: "From €2,400,000", icon: "Home" },
      { title: "Penthouse Collection", description: "Rooftop residences in Florence, Rome, and Milan. Floor-to-ceiling glass, private terraces, concierge by default.", price: "From €1,200,000", icon: "Building2" },
      { title: "Commercial Spaces", description: "Trophy offices and retail units in A-grade Italian city-centre locations.", price: "From €650,000", icon: "Briefcase" },
      { title: "Land Acquisition", description: "Off-market land assembly and planning consent services for institutional and private buyers.", price: "From €180,000", icon: "MapPin" },
      { title: "Restoration Projects", description: "Historic palazzo and farmhouse restoration — preserving provenance while delivering 21st-century living standards.", price: "From €480,000", icon: "Star" },
      { title: "Investment Portfolio", description: "Curated portfolios of income-producing Italian real estate. Minimum commitment €1M.", price: "From €1,000,000", icon: "TrendingUp" },
    ],
    stats: [
      { value: "320+", label: "Residences Delivered" },
      { value: "€1.8B", label: "Portfolio Value" },
      { value: "97%", label: "Sold on Launch" },
      { value: "8 cities", label: "Across Italy" },
    ],
    testimonials: [
      { quote: "Our TORRE UMBRIA villa in the hills above Perugia is beyond anything we could have imagined. The proportions are perfect.", name: "Sir Richard Ashworth", role: "Private Client, London", rating: 5 },
      { quote: "The Florentine penthouse sold for 18% above reserve within 72 hours of launch. TORRE UMBRIA's product sells itself.", name: "Giacomo Russo", role: "MD, Russo Real Estate", rating: 5 },
      { quote: "Every surface of our palazzo restoration tells its history. TORRE UMBRIA understand that authenticity is the luxury.", name: "Countess di Castellini", role: "Private Client, Orvieto", rating: 5 },
      { quote: "Their investment portfolio has outperformed Italian prime residential by 4.2% annually. Exceptional stewardship.", name: "Hans Meyer", role: "CIO, Meyer Family Office", rating: 5 },
      { quote: "The attention to provenance in their restorations is extraordinary. My farmhouse feels as though it was always perfect.", name: "Sophie Laurent", role: "Private Client, Val d'Orcia", rating: 5 },
      { quote: "TORRE UMBRIA are the only Italian developer I trust for off-market land. Their network is unparalleled.", name: "David Chen", role: "Principal, Chen Capital", rating: 5 },
    ],
    faqs: [
      { q: "Can international buyers purchase TORRE UMBRIA properties?", a: "Yes — we have dedicated advisors for non-EU buyers, including guidance on the Italian flat-tax regime (€100,000/year for new residents) and all conveyancing." },
      { q: "Are properties sold freehold?", a: "All TORRE UMBRIA residential properties are sold freehold (piena proprietà). Commercial units are available freehold or as long-leasehold depending on structure." },
      { q: "What is included in the purchase price?", a: "All our villas and penthouses include bespoke kitchen, all bathroom fittings, underfloor heating/cooling, and home automation as standard. Furniture packages are optional." },
      { q: "Do you offer a rental management service?", a: "Yes — our property management division handles short and long-term lettings, achieving 94% occupancy on managed properties. Fee: 12% of gross rental income." },
      { q: "How do I secure a reservation?", a: "A 10% reservation deposit (refundable within 14 days) secures any property. Preliminary contract within 30 days. Completion typically 60–90 days thereafter." },
    ],
  },
  {
    id: "torre-home",
    name: "TORRE HOME",
    tagline: "Premium Residential Living",
    description: "Thoughtfully designed homes and renovations for discerning buyers. TORRE HOME brings luxury sensibility to the premium residential market.",
    subdomain: "torre-home.torre-ks.com",
    path: "/torre-home",
    accentHsl: "152 20% 54%",
    accentDark: "152 18% 14%",
    category: "Premium Residences",
    heroHeadline: "Home, Perfected.",
    heroSub: "Premium homes, renovations, and interiors for buyers who know what excellence feels like. Every detail considered. Every finish chosen.",
    services: [
      { title: "Premium Residences", description: "Architect-designed homes in curated locations. Superior build quality, superior materials, superior management.", price: "From €380,000", icon: "Home" },
      { title: "Home Renovations", description: "Full residential renovations — from kitchen replacement to whole-house transformation. Managed end-to-end.", price: "From €95,000", icon: "Wrench" },
      { title: "Interior Styling", description: "Move-in-ready interior styling packages. Furniture, art, soft furnishings — curated and installed.", price: "From €45,000", icon: "Sparkles" },
      { title: "Smart Home Integration", description: "KNX and Lutron home automation. Lighting scenes, climate, security, AV — unified control.", price: "From €28,000", icon: "Zap" },
      { title: "Garden & Landscape", description: "Landscape architecture and garden design integrated with the property's architecture and aspect.", price: "From €22,000", icon: "Leaf" },
      { title: "Property Management", description: "Concierge property management for owners who want their home maintained to hotel standards.", price: "From €2,400/yr", icon: "ShieldCheck" },
    ],
    stats: [
      { value: "1,200+", label: "Homes Delivered" },
      { value: "96%", label: "Recommend Us" },
      { value: "€420M", label: "Portfolio Value" },
      { value: "12 yrs", label: "In Operation" },
    ],
    testimonials: [
      { quote: "TORRE HOME renovated our apartment in 11 weeks — on time, on budget, and finished beautifully. Remarkable.", name: "Emma Scholz", role: "Private Client, Munich", rating: 5 },
      { quote: "The smart home system TORRE HOME installed is intuitive and invisible. Exactly what premium should be.", name: "Thomas Müller", role: "Private Client, Hamburg", rating: 5 },
      { quote: "Our garden was a blank canvas. TORRE HOME turned it into the best room in the house.", name: "Catherine Fournier", role: "Private Client, Lyon", rating: 5 },
      { quote: "The property management service is worth every euro. My home is in better condition than when I leave it.", name: "Roberto Esposito", role: "Private Client, Milan", rating: 5 },
      { quote: "From first call to handover — they anticipated every need before we'd articulated it. True hospitality-level service.", name: "Anya Kovacs", role: "Private Client, Vienna", rating: 5 },
      { quote: "The interior styling package transformed our new build from a house into a home in two weeks.", name: "Henrik Larsson", role: "Private Client, Stockholm", rating: 5 },
    ],
    faqs: [
      { q: "What is the difference between TORRE HOME and TORRE UMBRIA?", a: "TORRE UMBRIA operates in the ultra-luxury and trophy asset segment (typically €1M+). TORRE HOME serves the premium residential market from €95,000 renovations to €2M new builds — exceptional quality, broader accessibility." },
      { q: "How long does a typical renovation take?", a: "A full apartment renovation (80–120m²): 8–14 weeks. A kitchen-only project: 3–5 weeks. Full house: 16–26 weeks. We provide a fixed programme before work starts." },
      { q: "Do you work across borders?", a: "TORRE HOME currently operates in Switzerland, Germany, Austria, France, and Italy. We are expanding to Portugal and the UK in Q1 2026." },
      { q: "What is your process for new build purchases?", a: "We present available plots and existing projects monthly to registered clients. Reservation requires a 5% deposit. Completion at handover — no phased payments on residential." },
      { q: "Is there a minimum spend for property management?", a: "Our management service starts at €2,400/year for apartments up to 100m². This covers quarterly inspections, emergency response, and utility management. Larger properties quoted individually." },
    ],
  },
];
