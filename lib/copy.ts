export const firm = "Batin Lateef Capital";
export const wordmark = "BATIN LATEEF";
export const headerWordmark = "BATIN LATEEF CAPITAL";

export const menu = {
  approach: "Investment architecture",
  structure: "Fund structure",
  portal: "Investor portal",
  prospectus: "Request prospectus",
} as const;

export const hero = {
  lineOne: "Hidden depth &",
  lineOneItalic: "gentle execution",
  lineTwo: "a multi-jurisdictional media fund",
} as const;

export const about = {
  id: "about",
  heading: "We Leverage Treaties to Drive Visibility",
  paragraphs: [
    "Batin Lateef is a specialized multi-jurisdictional media fund dedicated to financing high-yield, four-quadrant global film and television content. By strategically arbitrage-stacking Canadian and South African production incentives, we de-risk private equity exposure to 20-30% of project budgets while targeting a consistent 12-15% ROI, delivering premium commercial entertainment with profound character depth.",
    "In a market where many funds pass capital and step back, we stay in the work: treaty compliance, presales, production finance, and delivery. Our team combines line producers, distribution strategists, and institutional capital partners who have shipped commercial slates to streaming and theatrical windows.",
  ],
} as const;

export const manifesto = {
  quote:
    "Batin Lateef champions empathetic visibility through the art of the unsaid. We reject tokenism and overt didactic storytelling. Instead, we embed ethical underrepresented Islamic heritage into the quiet spaces of mainstream cinema through a character's background choices, ancestral subtext, and subtle moral compasses.",
  closing: "The depth is hidden (Batin). The execution is gentle and nuanced (Lateef).",
} as const;

export const commit = {
  id: "commit",
  heading: "De-Risked Through Ultimate Delivery",
  paragraphs: [
    "We finance slates where treaty arbitrage, presales, and genre velocity align. We do not chase volume. Structure first, then story.",
    "Once capital is deployed, we remain active through delivery and recoupment. When a slate performs, we scale the architecture across the next production cycle rather than diluting the model.",
  ],
} as const;

export const howItWorks = {
  id: "how-it-works",
  eyebrow: "The architecture in motion",
  heading: "How Capital Moves Through Batin Lateef",
  lead: "Five stages. Each one de risks the next. Equity deploys first to unlock the stack, then recoups as incentives and sales certify.",
  steps: [
    {
      id: "equity-deploys",
      number: 1,
      title: "Equity Deploys",
      description:
        "Private equity fills the 20 to 30 percent gap in the financing stack. This commitment is what triggers presale commitments, broadcaster licences, and gap financing from institutional partners.",
    },
    {
      id: "package-presales",
      number: 2,
      title: "Package and Presales",
      description:
        "Four quadrant genre projects are packaged with cast, director, and budget. With equity committed, international territory presales close and contract revenue before greenlight.",
    },
    {
      id: "treaty-coproduction",
      number: 3,
      title: "Treaty Co Production",
      description:
        "Productions qualify as national in Canada and South Africa under the modernized audiovisual co production treaty. CPTC, provincial credits, CMF, and DTIC incentives are filed pre production and certified post delivery.",
    },
    {
      id: "production-delivery",
      number: 4,
      title: "Production and Delivery",
      description:
        "Batin Lateef stays active through production, post production, and delivery. No passive capital. Treaty compliance, production finance, and delivery are managed in house.",
    },
    {
      id: "recoupment-upside",
      number: 5,
      title: "Recoupment and Upside",
      description:
        "Certified incentive rebates, presale revenues, and broadcaster fees recoup through the waterfall. Backend participation of up to 30 percent delivers returns when the slate performs across streaming and theatrical windows.",
    },
  ],
} as const;

export const metrics = {
  eyebrow: "Fund structure",
  heading: "Target architecture",
  items: [
    { label: "Private equity exposure", value: "20-30%" },
    { label: "Target ROI", value: "12-15%" },
    { label: "Soft-money ratio", value: "4.0x" },
    { label: "Backend participation", value: "Up to 30%" },
  ],
  note: "Target fund architecture. Not audited performance.",
} as const;

export const portfolio = {
  id: "architecture",
  eyebrow: "Investment architecture",
  heading: "Structure. Velocity. Depth.",
  intro:
    "Every slate runs on three layers: multi-jurisdictional incentive design, commercial genre packages, and character-led storytelling. Each layer is built on its own terms. Together, they form a single recoupment path.",
  items: [
    {
      id: "incentive-architecture",
      name: "Incentive Architecture",
      layer: "Structural",
      category: "Canada · South Africa",
      invested: "Active",
      exited: "",
      valuation: "Incentive-led",
      description:
        "Treaty-compliant co-production across Canada and South Africa to stack federal, provincial, and location rebates. Private equity sits at 20-30% of budget after soft money is locked.",
      image: "/images/toronto-table-mountain-skyline.png",
    },
    {
      id: "genre-velocity",
      name: "Genre Velocity",
      layer: "Commercial",
      category: "Action · Horror · Sci-fi · Thriller",
      invested: "Active",
      exited: "",
      valuation: "Four-quadrant",
      description:
        "Four-quadrant packages built for international streaming and theatrical windows. Presales, genre positioning, and delivery timelines are mapped before equity is called.",
      image: "/images/film-soundstage.png",
    },
    {
      id: "lateef-standard",
      name: "Batin Lateef Standard",
      layer: "Creative",
      category: "The Art of The Unsaid",
      invested: "Active",
      exited: "",
      valuation: "Character-led",
      description:
        "Mainstream genre films where philosophical and ethical subtext lives in character choice, background, and moral compass. No tokenism. No lecture.",
      image: "/images/lateef-islamic-film.png",
    },
  ],
} as const;

export const closing = {
  id: "closing",
  eyebrow: "The full arc",
  heading: "From Treaty Stack to Empathetic Visibility",
  lead: "Every investment begins with structure and ends with a story that reaches someone.",
  paragraphs: [
    "Treaties reduce exposure. Genre packages drive commercial velocity. Character depth earns audience loyalty that outlasts opening weekend.",
    "Batin Lateef sits at the junction: institutional capital on one side, empathetic visibility on the other. Hidden depth in the architecture. Gentle execution on the screen.",
  ],
  cta: "Request prospectus",
} as const;

export const portalModal = {
  title: "Access restricted.",
  body: "Authorized limited partners only.",
  close: "Close",
} as const;

export const prospectus = {
  title: "Request investor prospectus",
  helper: "For qualified limited partners and accredited investors only.",
  name: "Name",
  nameHelper: "As it should appear on correspondence.",
  email: "Institutional email",
  emailHelper: "Use your firm or family-office domain.",
  type: "Investor type",
  typeHelper: "Select the category that best describes the allocating entity.",
  types: [
    "Family Office",
    "Fund of Funds",
    "HNWI",
    "Institutional",
    "Strategic",
  ] as const,
  submit: "Submit request",
  submitting: "Submitting",
  successTitle: "Request received.",
  successBody:
    "Your prospectus request is queued for review. Investor relations will respond to the institutional email provided.",
  errorRequired: "This field is required.",
  errorEmail: "Enter a valid institutional email address.",
} as const;

export const footer = {
  copyright: "Copyright 2026 Batin Lateef Capital.",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  disclaimers: [
    "Batin Lateef Capital utilizes a dual-jurisdiction structure. Interests are offered strictly to qualified limited partners and accredited investors. This website is not an offer to sell or a solicitation to buy any security.",
    "ROI targets, equity exposure bands, and leverage figures describe target fund architecture. They are not historical results. Past performance does not guarantee future returns.",
    "Nothing on this page should be used as the sole basis for an investment decision. All figures are internal, unaudited, and subject to change.",
  ],
} as const;
