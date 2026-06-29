export interface ServiceDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  keywordPhrase: string;
}

export interface LocationDefinition {
  slug: string;
  name: string;
  region: string;
}

export const SERVICES: ServiceDefinition[] = [
  {
    slug: "small-removals",
    title: "Small Removals & House Moves",
    shortTitle: "Small Removals",
    keywordPhrase: "removals",
  },
  {
    slug: "courier",
    title: "Courier Services & Delivery",
    shortTitle: "Courier",
    keywordPhrase: "courier",
  },
  {
    slug: "waste-removal",
    title: "Tip Runs & Waste Removal",
    shortTitle: "Waste Removal",
    keywordPhrase: "waste removal",
  },
  {
    slug: "collection-and-delivery",
    title: "In-Store Collection & Delivery",
    shortTitle: "Collection & Delivery",
    keywordPhrase: "collection and delivery",
  },
  {
    slug: "end-of-tenancy",
    title: "End-of-Tenancy Clearance",
    shortTitle: "End of Tenancy",
    keywordPhrase: "house clearance",
  },
  {
    slug: "flat-pack-assembly",
    title: "Flat Pack Assembly",
    shortTitle: "Flat Pack Assembly",
    keywordPhrase: "flat pack assembly",
  },
];

/** Locations with GSC position >= 13 or poor CTR — get dedicated location+service pages */
export const LOW_RANKING_LOCATIONS: LocationDefinition[] = [
  { slug: "irvine", name: "Irvine", region: "North Ayrshire" },
  { slug: "kilmarnock", name: "Kilmarnock", region: "East Ayrshire" },
  { slug: "troon", name: "Troon", region: "South Ayrshire" },
  { slug: "ayr", name: "Ayr", region: "South Ayrshire" },
  { slug: "dalry", name: "Dalry", region: "North Ayrshire" },
  { slug: "ardrossan", name: "Ardrossan", region: "North Ayrshire" },
  { slug: "cumnock", name: "Cumnock", region: "East Ayrshire" },
  { slug: "beith", name: "Beith", region: "North Ayrshire" },
  { slug: "auchinleck", name: "Auchinleck", region: "East Ayrshire" },
  { slug: "darvel", name: "Darvel", region: "East Ayrshire" },
  { slug: "mauchline", name: "Mauchline", region: "East Ayrshire" },
  { slug: "prestwick", name: "Prestwick", region: "South Ayrshire" },
  { slug: "newmilns", name: "Newmilns", region: "East Ayrshire" },
  { slug: "kirkconnel", name: "Kirkconnel", region: "East Ayrshire" },
  { slug: "mossblown", name: "Mossblown", region: "South Ayrshire" },
  { slug: "dreghorn", name: "Dreghorn", region: "North Ayrshire" },
  { slug: "girvan", name: "Girvan", region: "South Ayrshire" },
];

export const LOW_RANKING_SLUGS = new Set(
  LOW_RANKING_LOCATIONS.map((location) => location.slug)
);

/** Nearby towns for same-service cross-linking */
export const NEARBY_LOCATIONS: Record<string, string[]> = {
  irvine: ["kilwinning", "saltcoats", "ardrossan", "troon"],
  kilmarnock: ["stewarton", "darvel", "cumnock", "mauchline"],
  troon: ["prestwick", "ayr", "irvine", "saltcoats"],
  ayr: ["prestwick", "troon", "mossblown", "maybole"],
  dalry: ["kilwinning", "beith", "irvine", "ardrossan"],
  ardrossan: ["saltcoats", "kilwinning", "irvine", "dalry"],
  cumnock: ["mauchline", "auchinleck", "newmilns", "kilmarnock"],
  beith: ["kilwinning", "dalry", "irvine", "stewarton"],
  auchinleck: ["cumnock", "mauchline", "kilmarnock", "newmilns"],
  darvel: ["kilmarnock", "newmilns", "galston", "stewarton"],
  mauchline: ["cumnock", "auchinleck", "kilmarnock", "newmilns"],
  prestwick: ["troon", "ayr", "mossblown", "irvine"],
  newmilns: ["darvel", "galston", "kilmarnock", "mauchline"],
  kirkconnel: ["sanquhar", "cumnock", "newmilns", "mauchline"],
  mossblown: ["ayr", "prestwick", "troon", "maybole"],
  dreghorn: ["irvine", "kilwinning", "kilmarnock", "stewarton"],
  girvan: ["maybole", "ayr", "troon", "prestwick"],
};

const LOCATION_NAME_LOOKUP: Record<string, string> = {
  kilwinning: "Kilwinning",
  saltcoats: "Saltcoats",
  stewarton: "Stewarton",
  maybole: "Maybole",
  galston: "Galston",
  sanquhar: "Sanquhar",
  ...Object.fromEntries(LOW_RANKING_LOCATIONS.map((l) => [l.slug, l.name])),
};

export function isLowRankingLocation(slug: string): boolean {
  return LOW_RANKING_SLUGS.has(slug);
}

export function getServiceLink(locationSlug: string, serviceSlug: string): string {
  if (isLowRankingLocation(locationSlug)) {
    return `/locations/${locationSlug}/${serviceSlug}`;
  }
  return `/services/${serviceSlug}`;
}

export function getLocationBySlug(slug: string): LocationDefinition | undefined {
  return LOW_RANKING_LOCATIONS.find((location) => location.slug === slug);
}

export function getLocationName(slug: string): string {
  return LOCATION_NAME_LOOKUP[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getLocationServiceStaticPaths() {
  return LOW_RANKING_LOCATIONS.flatMap((location) =>
    SERVICES.map((service) => ({
      params: { location: location.slug, service: service.slug },
    }))
  );
}

export function getLocationHubTitle(locationName: string, slug: string): string {
  if (isLowRankingLocation(slug)) {
    return `Man with a Van ${locationName} | Removals & Courier | Chris`;
  }
  return `Van Services in ${locationName} | Chris, Your Man with a Van`;
}

export function getLocationHubMeta(locationName: string, slug: string): string {
  if (isLowRankingLocation(slug)) {
    return `Man with a van in ${locationName}. 77 Google reviews, 5-star rated. Removals, courier & waste removal. SEPA registered. Free WhatsApp quote.`;
  }
  return `Expert van services in ${locationName}. Same-day removals, courier & waste disposal. SEPA registered. Free WhatsApp quotes. Serving Ayrshire.`;
}

export function getLocationServiceSEO(locationSlug: string, serviceSlug: string) {
  const location = getLocationBySlug(locationSlug);
  const service = getServiceBySlug(serviceSlug);

  if (!location || !service) {
    return null;
  }

  const title = `${service.shortTitle} ${location.name} | Man with a Van | Chris`;
  const description = `${service.title} in ${location.name}, Ayrshire. 77 Google reviews, 5-star rated. SEPA registered. Free WhatsApp quote across Ayrshire.`;
  const h1 = `${service.title} in ${location.name}, Ayrshire`;
  const canonical = `https://chrisyourmanwithavan.com/locations/${locationSlug}/${serviceSlug}`;

  return { title, description, h1, canonical, location, service };
}

export function getServiceIntro(
  locationName: string,
  region: string,
  serviceSlug: string
): string {
  const intros: Record<string, string> = {
    "small-removals": `Looking for a reliable man with a van in ${locationName}? Chris provides professional small removals and house moves throughout ${locationName} and ${region}. Whether you are moving within the town, relocating to a new property, or need furniture transported locally, you get a personal, careful service backed by 77 five-star Google reviews.`,
    courier: `Need a courier or same-day delivery in ${locationName}? Chris offers fast, dependable courier services across ${locationName} and ${region}, connecting local homes and businesses with urgent collections and drop-offs. From documents and parcels to larger items, every job is handled personally with direct WhatsApp communication.`,
    "waste-removal": `Need tip runs or waste removal in ${locationName}? Chris is SEPA registered and provides legal, hassle-free waste disposal across ${locationName} and ${region}. Garage clearances, garden waste, end-of-tenancy rubbish, and household junk removal are all handled with proper disposal — no illegal dumping.`,
    "collection-and-delivery": `Bought furniture or need a store collection in ${locationName}? Chris collects from retailers, depots, and online delivery points across ${locationName} and ${region}, then delivers carefully to your door. Same-day collection and delivery is often available when you need items moved quickly.`,
    "end-of-tenancy": `Need an end-of-tenancy clearance in ${locationName}? Chris provides complete property clearances for tenants and landlords across ${locationName} and ${region}. Furniture removal, rubbish disposal, and full property emptying — all handled legally with SEPA registered waste removal.`,
    "flat-pack-assembly": `Need flat pack assembly in ${locationName}? Chris assembles IKEA and all major flat-pack furniture brands across ${locationName} and ${region}. Tools are provided, and assembly is done correctly the first time — saving you hours of frustration.`,
  };

  return intros[serviceSlug] ?? `Professional van services in ${locationName}.`;
}

export function getLocalizedFaqs(
  locationName: string,
  serviceSlug: string
): { question: string; answer: string }[] {
  const faqTemplates: Record<string, { question: string; answer: string }[]> = {
    "small-removals": [
      {
        question: `How much do small removals cost in ${locationName}?`,
        answer: `Costs depend on the volume of items, distance, and access at your property in ${locationName}. Most small moves start from around £50–100. Contact Chris on WhatsApp for a free, no-obligation quote tailored to your move.`,
      },
      {
        question: `Do you cover all areas of ${locationName}?`,
        answer: `Yes. Chris serves all residential and commercial areas in ${locationName} and surrounding neighbourhoods. Whether you are in the town centre or nearby villages, same-day availability is often possible.`,
      },
      {
        question: `Can you help with a same-day move in ${locationName}?`,
        answer: `Same-day small removals in ${locationName} are available when the schedule allows. Message on WhatsApp with your location, items, and preferred time for the fastest response.`,
      },
    ],
    courier: [
      {
        question: `Do you offer same-day courier in ${locationName}?`,
        answer: `Yes. Same-day courier and delivery is available across ${locationName} and connecting routes throughout Ayrshire. Message on WhatsApp with collection and delivery addresses for a quick quote.`,
      },
      {
        question: `What can you deliver in ${locationName}?`,
        answer: `Chris delivers parcels, documents, furniture, appliances, and business goods throughout ${locationName}. Items are handled carefully and delivered directly to the recipient.`,
      },
    ],
    "waste-removal": [
      {
        question: `Are tip runs in ${locationName} SEPA registered?`,
        answer: `Yes. All waste removal and tip runs in ${locationName} are carried out by a SEPA registered operator, ensuring legal disposal at licensed facilities.`,
      },
      {
        question: `What waste do you collect in ${locationName}?`,
        answer: `Household rubbish, garden waste, garage clearances, shed clearances, old furniture, and general junk from properties in ${locationName}. Contact Chris for a quote based on the volume.`,
      },
    ],
    "collection-and-delivery": [
      {
        question: `Can you collect from furniture stores near ${locationName}?`,
        answer: `Yes. Chris collects from furniture stores, retail parks, and online delivery depots serving ${locationName}, then delivers to your home with careful handling.`,
      },
    ],
    "end-of-tenancy": [
      {
        question: `How fast is end-of-tenancy clearance in ${locationName}?`,
        answer: `Most end-of-tenancy clearances in ${locationName} can be completed within 1–2 days depending on property size. Contact Chris on WhatsApp with your move-out date for availability.`,
      },
      {
        question: `Do you handle landlord clearances in ${locationName}?`,
        answer: `Yes. Chris works with both tenants and landlords in ${locationName}, clearing properties completely and disposing of waste legally through SEPA registered channels.`,
      },
    ],
    "flat-pack-assembly": [
      {
        question: `Do you assemble IKEA furniture in ${locationName}?`,
        answer: `Yes. Chris assembles IKEA and all major flat-pack brands in ${locationName}. All tools are provided and assembly includes positioning furniture where you need it.`,
      },
    ],
  };

  return faqTemplates[serviceSlug] ?? [];
}
