export const firm = "Batin Lateef Capital";
export const wordmark = "BATIN LATEEF";
export const established = "2024";

export const menu = {
  slates: "Our slates",
  structure: "Fund structure",
  partners: "Treaty partners",
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
  heading: "A media fund unlike most",
  paragraphs: [
    "Batin Lateef is a specialized multi-jurisdictional media fund dedicated to financing high-yield, four-quadrant global film and television content. By strategically arbitrage-stacking Canadian and South African production incentives, we de-risk private equity exposure to 20-30% of project budgets while targeting a consistent 12-15% ROI, delivering premium commercial entertainment with profound character depth.",
    "In a market where many funds pass capital and step back, we stay in the work: treaty compliance, presales, production finance, and delivery. Our team combines line producers, distribution strategists, and institutional capital partners who have shipped commercial slates to streaming and theatrical windows.",
  ],
} as const;

export const manifesto = {
  quote:
    "Batin Lateef champions empathetic visibility through the art of the unsaid. We reject tokenism and overt didactic storytelling. Instead, we embed the rich, philosophical, and ethical architecture of Shia Islamic heritage into the quiet spaces of mainstream cinema through a character's background choices, ancestral subtext, and subtle moral compasses.",
  closing: "The depth is hidden (Batin). The execution is gentle and nuanced (Lateef).",
} as const;

export const sidebarQuote = {
  text: "The depth is hidden. The execution is gentle.",
  attribution: "Creative manifesto",
} as const;

export const commit = {
  id: "commit",
  heading: "When we commit, we commit",
  paragraphs: [
    "We finance slates where treaty arbitrage, presales, and genre velocity align. We do not chase volume. We underwrite structure first, then story.",
    "Once capital is deployed, we remain active through delivery and recoupment. When a slate performs, we scale the architecture across the next production cycle rather than diluting the model.",
  ],
} as const;

export const metrics = {
  items: [
    { label: "Private equity exposure", value: "20-30%" },
    { label: "Target ROI", value: "12-15%" },
    { label: "Soft-money ratio", value: "4.0x" },
  ],
  note: "Target fund architecture. Not audited performance.",
} as const;

export const portfolio = {
  id: "slates",
  headingTop: "Capital & conviction",
  heading: "our slates",
  intro:
    "We finance productions that combine commercial genre velocity with character depth. Each slate is built for international windows and structured for recoupment.",
  items: [
    {
      id: "treaty-stack",
      name: "Treaty Stack",
      category: "Canada / South Africa co-production",
      invested: "Active",
      exited: "",
      valuation: "Incentive-led",
      description:
        "Multi-jurisdictional arbitrage using Canada and South Africa audiovisual treaties to stack regional and federal soft money, keeping private equity at 20-30% of budget.",
      image: "/images/treaty-aerial.png",
    },
    {
      id: "genre-slate",
      name: "Genre Slate",
      category: "Sci-fi, thriller, action",
      invested: "Active",
      exited: "",
      valuation: "Four-quadrant",
      description:
        "Four-quadrant sci-fi, thriller, and action packages built for international streaming and theatrical partners, with production oversight from first script to final delivery.",
      image: "/images/film-soundstage.png",
    },
    {
      id: "lateef-narratives",
      name: "Lateef Narratives",
      category: "Empathetic visibility",
      invested: "Active",
      exited: "",
      valuation: "Character-led",
      description:
        "Mainstream genre films where philosophical and ethical subtext lives in character choice, background, and moral compass. No tokenism. No lecture.",
      image: "/images/arab-film-craft.png",
    },
  ],
} as const;

export const fundPartners = {
  id: "partners",
  heading: "treaty partners",
  intro:
    "We co-produce across jurisdictions where incentive depth and commercial distribution align.",
  items: [
    {
      name: "Canada",
      region: "North America",
      focus: "Federal and provincial audiovisual incentives",
    },
    {
      name: "South Africa",
      region: "Africa",
      focus: "Co-production treaty and location rebates",
    },
    {
      name: "Global distribution",
      region: "International",
      focus: "Streaming and territorial presales",
    },
  ],
} as const;

export const offices = [
  {
    city: "Toronto",
    address: "Bay Street, Toronto, Ontario (by appointment)",
  },
  {
    city: "Cape Town",
    address: "Waterfront District, Cape Town (by appointment)",
  },
  {
    city: "London",
    address: "Mayfair, London (film market meetings)",
  },
] as const;

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
