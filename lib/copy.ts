export const firm = "Batin Lateef Capital";
export const wordmark = "BATIN LATEEF";

export const nav = {
  mission: "Mission",
  manifesto: "Manifesto",
  structure: "Structure",
  contact: "Contact",
  portal: "Investor Portal",
} as const;

export const hero = {
  headline: "The depth is hidden. The execution is gentle.",
  subhead:
    "A specialized multi-jurisdictional media fund financing high-yield, four-quadrant global film and television content.",
  primaryCta: "Request Investor Prospectus",
  secondaryCta: "View Fund Architecture",
} as const;

export const mission = {
  id: "mission",
  label: "Investor-Facing",
  heading: "Corporate Mission",
  body: "Batin Lateef is a specialized multi-jurisdictional media fund dedicated to financing high-yield, four-quadrant global film and television content. By strategically arbitrage-stacking Canadian and South African production incentives, we de-risk private equity exposure to 20-30% of project budgets while targeting a consistent 12-15% ROI, delivering premium commercial entertainment with profound character depth.",
} as const;

export const manifesto = {
  id: "manifesto",
  label: "Creator-Facing",
  heading: "Creative Manifesto",
  pullQuote: "Empathetic visibility through the art of the unsaid.",
  body: "Batin Lateef champions empathetic visibility through the art of the unsaid. We reject tokenism and overt didactic storytelling. Instead, we embed the rich, philosophical, and ethical architecture of Shia Islamic heritage into the quiet spaces of mainstream cinema, through a character's background choices, ancestral subtext, and subtle moral compasses. The depth is hidden (Batin); the execution is gentle and nuanced (Lateef).",
  etymology: {
    batin: "Hidden depth.",
    lateef: "Gentle execution.",
  },
} as const;

export const thesis = {
  id: "thesis",
  heading: "Execution Lanes",
  pillars: [
    {
      title: "Treaty Arbitrage",
      body: "Canada and South Africa co-production treaties stacked to compress private equity into 20-30% of budget.",
      image: "/images/treaty-aerial.png",
      alt: "Blue-hour aerial landscape evoking dual-hemisphere co-production geography.",
    },
    {
      title: "Four-Quadrant Genre",
      body: "Sci-fi, thriller, and action slates packaged for international streaming with studio-grade commercial velocity.",
      image: "/images/hero-dock.png",
      alt: "Cinematographer at dockside blue hour beside anamorphic glass.",
    },
    {
      title: "Empathetic Visibility",
      body: "Philosophical subtext carried in character choice, not lecture. Heritage as atmosphere, not annotation.",
      image: "/images/manifesto-film.png",
      alt: "Hands loading 35mm film magazine on a cinema camera.",
    },
  ],
} as const;

export const portalModal = {
  title: "Access Restricted.",
  body: "Authorized Limited Partners Only.",
  close: "Close",
} as const;

export const architecture = {
  id: "structure",
  heading: "Capital Architecture",
  note: "Target fund design. Illustrative mechanics, not audited performance.",
  metrics: [
    {
      value: "20-30%",
      caption: "Private equity exposure after incentive stacking",
    },
    {
      value: "12-15%",
      caption: "Target ROI on deployed capital",
    },
    {
      value: "4.0x",
      caption: "Production leverage via treaty stacking",
    },
  ],
  waterfallHeading: "Recoupment Waterfall",
  priorities: [
    {
      label: "Senior debt",
      body: "Territorial license fees clear senior debt first.",
    },
    {
      label: "Principal",
      body: "100% principal recoupment to equity investors.",
    },
    {
      label: "Preferred hurdle",
      body: "15% preferred dividend hurdle before backend participation.",
    },
    {
      label: "Backend",
      body: "50/50 long-tail split after hurdles are met.",
    },
  ],
} as const;

export const contact = {
  id: "contact",
  heading: "Qualified capital only.",
  body: "Prospectus materials release after institutional qualification at global film markets and by private introduction.",
} as const;

export const prospectus = {
  title: "Request Investor Prospectus",
  helper: "For qualified limited partners and accredited investors only.",
  name: "Name",
  nameHelper: "As it should appear on correspondence.",
  email: "Institutional Email",
  emailHelper: "Use your firm or family-office domain.",
  type: "Investor Type",
  typeHelper: "Select the category that best describes the allocating entity.",
  types: [
    "Family Office",
    "Fund of Funds",
    "HNWI",
    "Institutional",
    "Strategic",
  ] as const,
  submit: "Submit Request",
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
  lpLogin: "LP Portal Login",
  disclaimers: [
    "Batin Lateef Capital utilizes a dual-jurisdiction structure for the formation, administration, and operation of its media investment vehicles. Interests are offered strictly to qualified limited partners and accredited investors who meet applicable eligibility standards in the relevant jurisdiction. This website is not directed at the general public and does not constitute an offer to sell, or a solicitation of an offer to buy, any security.",
    "ROI targets, equity exposure bands, and recoupment waterfalls describe target fund architecture and illustrative mechanics. They are not representations of historical results. Past performance does not guarantee future returns. There can be no assurance that any investment will achieve its objectives or that investors will not lose some or all of their capital.",
    "Nothing on this page should be construed as fund marketing materials for prospective investors considering an allocation, or used as the sole basis for any investment decision. All figures are internal, unaudited, and subject to change. Access to the investor portal is restricted to authorized limited partners.",
  ],
} as const;
