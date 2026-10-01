export type IncentiveJurisdiction = {
  country: string;
  code: string;
  headlineCredit: string;
  percentage: number | null;
  mapRate?: string;
  category: string;
  notes: string;
  source: string;
  lastVerified: string;
};

export const incentives: IncentiveJurisdiction[] = [
  {
    country: "Canada",
    code: "CA",
    headlineCredit: "Federal CPTC plus provincial credits",
    percentage: null,
    mapRate: "40%+",
    category: "Stacked tax credits",
    notes:
      "A labour stack, not a share of the budget. Provincial assistance reduces the federal 25% base. Ontario 35% and British Columbia 40% of labour, Québec 25% of spend, Alberta 22% of costs, Manitoba 45% of salaries.",
    source:
      "https://www.canada.ca/en/canadian-heritage/services/funding/cavco-tax-credits/canadian-film-video-production.html",
    lastVerified: "2026-10-01",
  },
  {
    country: "Colombia",
    code: "CO",
    headlineCredit: "Fondo Fílmico Colombia cash rebate",
    percentage: 40,
    category: "Cash rebate",
    notes:
      "40% of audiovisual-service expenses and 20% of logistical-service expenses incurred in Colombia. The 2026 cap is COP 3,340,196,500 (USD $907,662). Eligible services are carried out in Colombia and contracted from Colombian residents. The call stays open until funds are exhausted.",
    source: "https://comisionfilmicacolombia.com/en/incentives/ffc-cash-rebate/",
    lastVerified: "2026-10-01",
  },
  {
    country: "South Africa",
    code: "ZA",
    headlineCredit: "Foreign Film and Television Production Incentive",
    percentage: 25,
    category: "Cash rebate",
    notes: "25% of Qualifying South African Production Expenditure for location shooting, subject to a cap. An additional 5% of QSAPE may apply when post-production is completed in South Africa using a Black-owned service company.",
    source:
      "http://www.thedtic.gov.za/financial-and-non-financial-support/incentives/film-incentive/foreign-film-and-television-production-and-post-production-incentive-foreign-film/",
    lastVerified: "2026-10-01",
  },
  {
    country: "Australia",
    code: "AU",
    headlineCredit: "30% Post, Digital & VFX (PDV) Offset",
    percentage: 30,
    category: "Tax offset",
    notes: "30% of qualifying Australian PDV expenditure. Minimum spend and a final certificate apply. The Location Offset and Producer Offset are separate programs.",
    source: "https://www.arts.gov.au/funding-and-support/tax-rebates-film-and-television-producers",
    lastVerified: "2026-10-01",
  },
  {
    country: "Thailand",
    code: "TH",
    headlineCredit: "30% cash rebate on all production",
    percentage: 30,
    category: "Cash rebate",
    notes: "Thailand Film Office cash rebate. Official guidelines calculate the rebate between 15% and 30% of qualifying local spend, depending on expenditure level and additional criteria, with 30% as the maximum.",
    source: "https://tfo.dot.go.th/wp-content/uploads/2025/03/Thailand-Incentive-Measures-Guidelines.pdf",
    lastVerified: "2026-10-01",
  },
  {
    country: "Ireland",
    code: "IE",
    headlineCredit: "Section 481 film corporation tax credit",
    percentage: 32,
    category: "Tax credit",
    notes: "32% of the lowest of eligible expenditure, 80% of total production cost, or €125 million. An enhanced 40% rate can apply to qualifying lower-budget films and to a capped band of visual-effects expenditure.",
    source: "https://www.revenue.ie/en/companies-and-charities/reliefs-and-exemptions/film-relief/index.aspx",
    lastVerified: "2026-10-01",
  },
  {
    country: "United Kingdom",
    code: "GB",
    headlineCredit: "Audio-Visual Expenditure Credit (AVEC)",
    percentage: 34,
    category: "Expenditure credit",
    notes: "34% of qualifying expenditure for films and TV programmes other than children's programming, animation, and certified independent films, which can qualify at higher rates. The credit is taxable.",
    source: "https://www.gov.uk/guidance/claim-audio-visual-expenditure-credits-for-corporation-tax",
    lastVerified: "2026-10-01",
  },
  {
    country: "France",
    code: "FR",
    headlineCredit: "Tax Rebate for International Productions (TRIP)",
    percentage: 30,
    category: "Tax rebate",
    notes: "30% of qualifying expenditure incurred in France, capped at €30 million per project. The rate is 40% when qualifying French VFX expenditure exceeds €2 million.",
    source: "https://www.cnc.fr/web/en/funds/the-tax-rebate-for-international-productions-trip_190742",
    lastVerified: "2026-10-01",
  },
  {
    country: "New Zealand",
    code: "NZ",
    headlineCredit: "New Zealand Screen Production Rebate",
    percentage: 20,
    category: "Cash rebate",
    notes: "20% of Qualifying New Zealand Production Expenditure for international productions. A further 5% uplift, to 25%, is available when additional criteria are met.",
    source: "https://www.nzfilm.co.nz/incentives/rebate-international-nzspr",
    lastVerified: "2026-10-01",
  },
  {
    country: "Hungary",
    code: "HU",
    headlineCredit: "Hungarian film incentive",
    percentage: 30,
    category: "Cash rebate",
    notes: "30% rebate on eligible Hungarian production expenditure, administered by the National Film Institute. The incentive can extend to 37.5% of eligible production expense when a capped portion of non-Hungarian costs is included.",
    source: "https://nfi.hu/en/filming-in-hungary/hungarian-film-incentive",
    lastVerified: "2026-10-01",
  },
];

export function incentiveRateLabel(
  entry: IncentiveJurisdiction,
  detailsOnRequest = "Details on request",
): string {
  if (entry.mapRate) return entry.mapRate;
  return entry.percentage == null ? detailsOnRequest : `${entry.percentage}%`;
}

export function incentiveHeadline(entry: IncentiveJurisdiction): string {
  const rate = incentiveRateLabel(entry);
  if (!entry.headlineCredit.startsWith(rate)) return entry.headlineCredit;
  const rest = entry.headlineCredit.slice(rate.length).trim();
  return rest || entry.headlineCredit;
}
