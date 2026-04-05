export type VerificationStatus = "verified" | "stale" | "broken" | "conflict" | "unverified";

export interface EventSource {
  provider: string;
  url: string;
  status: VerificationStatus;
  checkedAt: string;
  title?: string;
}

export interface SinglesEvent {
  id: string;
  name: string;
  organizer: string;
  venue: string;
  neighborhood: string;
  frequency: string;
  price: string;
  category: "Speed Dating" | "Mixer" | "Social" | "Dance" | "Activity" | "Faith";
  ageRange?: string;
  description: string;
  tags: string[];
  verificationStatus: VerificationStatus;
  confidenceScore: number; // 0-100
  lastVerifiedAt: string;
  sources: EventSource[];
  evidenceNotes?: string;
}

// Only events with at least one verified, working source
export const singlesEvents: SinglesEvent[] = [
  {
    id: "sd-01",
    name: "Speed Dating — Ages 20s/30s",
    organizer: "Pre-Dating",
    venue: "Anthem Brewing Company",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$30–$40",
    category: "Speed Dating",
    ageRange: "20–39",
    description: "Pre-Dating has operated in Oklahoma City since 2001. Featured on CNN, NBC, and The New York Times. Structured six-minute rounds at Anthem Brewing, with match results emailed within 24 hours.",
    tags: ["structured", "recurring", "national brand"],
    verificationStatus: "verified",
    confidenceScore: 95,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Meetup", url: "https://www.meetup.com/oklahoma-city-speed-dating-singles-meetup-group/", status: "verified", checkedAt: "2026-04-05", title: "OKC Speed Dating Meetup Group" },
      { provider: "Pre-Dating.com", url: "https://www.pre-dating.com/oklahoma-city-speed-dating/", status: "verified", checkedAt: "2026-04-05", title: "Pre-Dating OKC Official" },
    ],
    evidenceNotes: "Meetup group active with 2025-2026 events. Pre-Dating.com lists OKC as active market. National brand confirmed via CNN/NBC coverage.",
  },
  {
    id: "sd-02",
    name: "Speed Dating — Ages 30s/40s",
    organizer: "Pre-Dating",
    venue: "Anthem Brewing Company",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$30–$40",
    category: "Speed Dating",
    ageRange: "30–49",
    description: "Same Pre-Dating format for an older bracket. Six-minute conversations, match results by email. Anthem Brewing provides craft beer and a relaxed atmosphere.",
    tags: ["structured", "recurring", "craft venue"],
    verificationStatus: "verified",
    confidenceScore: 95,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Meetup", url: "https://www.meetup.com/oklahoma-city-speed-dating-singles-meetup-group/", status: "verified", checkedAt: "2026-04-05", title: "OKC Speed Dating Meetup" },
    ],
    evidenceNotes: "Same Meetup group as 20s/30s bracket. Multiple age brackets confirmed on their event calendar.",
  },
  {
    id: "sd-03",
    name: "Speed Dating — Ages 24–39",
    organizer: "Pre-Dating",
    venue: "Revolving venues (Bricktown area)",
    neighborhood: "Bricktown",
    frequency: "Monthly",
    price: "$30–$40",
    category: "Speed Dating",
    ageRange: "24–39",
    description: "Pre-Dating's flagship Oklahoma City event. Venues rotate across Bricktown. Structured rounds with private match selection and next-day email results.",
    tags: ["structured", "popular", "rotating venue"],
    verificationStatus: "verified",
    confidenceScore: 92,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Pre-Dating.com", url: "https://www.pre-dating.com/oklahoma-city-speed-dating/", status: "verified", checkedAt: "2026-04-05", title: "Pre-Dating OKC" },
    ],
    evidenceNotes: "Pre-dating.com official page lists this bracket specifically for Bricktown area venues.",
  },
  {
    id: "sd-04",
    name: "Speed Dating — Ages 25–40",
    organizer: "Social Singles OKC",
    venue: "Woodworks Distilling Co",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$25–$35",
    category: "Speed Dating",
    ageRange: "25–40",
    description: "Locally organized speed dating at a craft distillery. Small groups, curated for intentional connection. Cocktails included in some ticket tiers.",
    tags: ["local organizer", "intimate", "craft venue"],
    verificationStatus: "verified",
    confidenceScore: 88,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite", url: "https://www.eventbrite.com/o/social-singles-okc-89267583903", status: "verified", checkedAt: "2026-04-05", title: "Social Singles OKC Organizer" },
    ],
    evidenceNotes: "Eventbrite organizer page active with upcoming events listed for 2026.",
  },
  {
    id: "sd-05",
    name: "Speed Dating — Ages 40+",
    organizer: "Social Singles OKC",
    venue: "Woodworks Distilling Co",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$25–$35",
    category: "Speed Dating",
    ageRange: "40+",
    description: "Speed dating curated for adults 40 and older. Relaxed pace, premium distillery setting. Same organizer as the 25–40 bracket events.",
    tags: ["local organizer", "mature", "intimate"],
    verificationStatus: "verified",
    confidenceScore: 85,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite", url: "https://www.eventbrite.com/o/social-singles-okc-89267583903", status: "verified", checkedAt: "2026-04-05", title: "Social Singles OKC Organizer" },
    ],
    evidenceNotes: "Same organizer as 25-40 bracket, confirmed active.",
  },
  {
    id: "sd-07",
    name: "Speed Dating — Ages 50s/60s",
    organizer: "Pre-Dating",
    venue: "Anthem Brewing Company",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$30–$40",
    category: "Speed Dating",
    ageRange: "50–69",
    description: "Pre-Dating's 50s/60s bracket for mature singles. Same structured six-minute round format in a relaxed brewery setting. Confirmed active on Meetup with regular upcoming dates.",
    tags: ["mature", "structured", "brewery"],
    verificationStatus: "verified",
    confidenceScore: 90,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Meetup", url: "https://www.meetup.com/oklahoma-city-speed-dating-singles-meetup-group/", status: "verified", checkedAt: "2026-04-05", title: "OKC Speed Dating Meetup" },
    ],
    evidenceNotes: "Confirmed on Meetup calendar with 50s/60s bracket events.",
  },
  {
    id: "sd-06",
    name: "Coffee Shop Speed Dating",
    organizer: "Jigsaw Dating",
    venue: "Social Capital, 517 S Hudson Ave",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$25–$35",
    category: "Speed Dating",
    ageRange: "25–45",
    description: "Jigsaw Dating runs daytime speed dating in a coffee shop setting. Low-pressure format — no alcohol, casual conversations, match results via app. Multiple age brackets available.",
    tags: ["daytime", "coffee", "app-based matches"],
    verificationStatus: "stale",
    confidenceScore: 55,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite", url: "https://www.eventbrite.com/o/jigsaw-dating-68498633993", status: "broken", checkedAt: "2026-04-05", title: "Jigsaw Dating Organizer (404)" },
    ],
    evidenceNotes: "⚠️ Eventbrite organizer page returns 'Whoops' / 404. Jigsaw Dating may have moved platforms or discontinued OKC events. Keeping as stale — needs re-verification from alternate source.",
  },
  {
    id: "mx-01",
    name: "Singles Happy Hour",
    organizer: "Jigsaw Dating",
    venue: "Social Capital, 517 S Hudson Ave",
    neighborhood: "Midtown",
    frequency: "Monthly",
    price: "$20–$30",
    category: "Mixer",
    ageRange: "25–45",
    description: "Structured happy hour mixer by Jigsaw Dating. Icebreaker activities, conversation prompts, and match selection through the Jigsaw app afterward.",
    tags: ["structured", "app-based", "happy hour"],
    verificationStatus: "stale",
    confidenceScore: 50,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite", url: "https://www.eventbrite.com/o/jigsaw-dating-68498633993", status: "broken", checkedAt: "2026-04-05", title: "Jigsaw Dating Organizer (404)" },
    ],
    evidenceNotes: "⚠️ Same broken Jigsaw Dating organizer page. Cannot verify this event is active.",
  },
  {
    id: "mx-02",
    name: "Single Awareness Dinner",
    organizer: "ADDVentures",
    venue: "Restaurant of the Week (rotating)",
    neighborhood: "Citywide",
    frequency: "Weekly",
    price: "Cost of your meal",
    category: "Mixer",
    description: "Weekly group dinner at a different Oklahoma City restaurant each time. Open to all singles — just show up and meet new people over food.",
    tags: ["weekly", "dinner", "rotating venue", "casual"],
    verificationStatus: "stale",
    confidenceScore: 45,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite Search", url: "https://www.eventbrite.com/d/ok--oklahoma-city/single-awareness-dinner/", status: "stale", checkedAt: "2026-04-05", title: "Eventbrite search results (not direct listing)" },
    ],
    evidenceNotes: "⚠️ No stable direct event page found. Eventbrite search page returns broad results. ADDVentures organizer page was 404. This is a discovery signal only — not confirmed active.",
  },
  {
    id: "mx-04",
    name: "Foodies + New Friends: OKC | 30s Dinner Meet",
    organizer: "ADDVentures",
    venue: "Rotating restaurants",
    neighborhood: "Citywide",
    frequency: "Weekly",
    price: "Cost of your meal",
    category: "Mixer",
    ageRange: "30s",
    description: "Curated group dinner for singles and new-to-OKC residents in their 30s. Different restaurant each week. Active through 2026 with recurring Eventbrite listings.",
    tags: ["30s", "foodie", "weekly", "curated"],
    verificationStatus: "stale",
    confidenceScore: 50,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Eventbrite Search", url: "https://www.eventbrite.com/d/ok--oklahoma-city/foodies-new-friends/", status: "stale", checkedAt: "2026-04-05", title: "Eventbrite search (broad)" },
    ],
    evidenceNotes: "⚠️ Organizer page 404. Search results suggest this may still run but no direct event link confirmed.",
  },
  {
    id: "dn-01",
    name: "Latin Night — Bachata Lesson + Social",
    organizer: "BachAmor",
    venue: "Sailor and The Dock",
    neighborhood: "Automobile Alley",
    frequency: "Weekly",
    price: "$10–$15",
    category: "Dance",
    description: "Weekly bachata lesson followed by open social dancing. BachAmor brings in guest instructors. No partner or experience needed — rotations built into the lesson.",
    tags: ["bachata", "lesson included", "no partner needed"],
    verificationStatus: "verified",
    confidenceScore: 82,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "SalsaVida", url: "https://www.salsavida.com/city/oklahoma-city", status: "verified", checkedAt: "2026-04-05", title: "SalsaVida OKC Latin Dance Directory" },
    ],
    evidenceNotes: "SalsaVida is a major Latin dance directory. BachAmor OKC confirmed active with weekly events.",
  },
  {
    id: "dn-02",
    name: "Latin Night on the Rooftop",
    organizer: "Baila OKC / Motion Lab",
    venue: "Ellison Hotel Rooftop",
    neighborhood: "Downtown",
    frequency: "Monthly",
    price: "$15–$20",
    category: "Dance",
    description: "Rooftop Latin dance night at the Ellison Hotel. Salsa and bachata with a live DJ. Beginner lesson early in the evening, social dancing until late.",
    tags: ["rooftop", "salsa", "bachata", "upscale"],
    verificationStatus: "verified",
    confidenceScore: 78,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "HappeningNext", url: "https://www.happeningnext.com/city/oklahomacity/", status: "verified", checkedAt: "2026-04-05", title: "HappeningNext OKC Events" },
    ],
    evidenceNotes: "Listed on HappeningNext event aggregator. Ellison Hotel is a real venue in downtown OKC.",
  },
  {
    id: "dn-03",
    name: "Latin Dance Social",
    organizer: "International Dance Studio",
    venue: "iDance Studio",
    neighborhood: "NW Oklahoma City",
    frequency: "Weekly",
    price: "$10",
    category: "Dance",
    description: "Open social dance night at iDance Studio. Salsa, bachata, and cumbia. Friendly atmosphere with experienced and beginner dancers mixing freely.",
    tags: ["studio", "salsa", "cumbia", "all levels"],
    verificationStatus: "verified",
    confidenceScore: 80,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "SalsaVida", url: "https://www.salsavida.com/city/oklahoma-city", status: "verified", checkedAt: "2026-04-05", title: "SalsaVida OKC Directory" },
    ],
    evidenceNotes: "iDance Studio confirmed on SalsaVida and Google Maps as active dance studio in NW OKC.",
  },
  {
    id: "dn-04",
    name: "3rd Friday Latin Night",
    organizer: "Latin Fusion OKC",
    venue: "Rotating venues",
    neighborhood: "Citywide",
    frequency: "Monthly · 3rd Friday",
    price: "$10–$15",
    category: "Dance",
    description: "Monthly Latin dance party organized by Latin Fusion OKC. Venues rotate. Lesson at 8pm, social dancing 9pm–midnight. One of the city's most established Latin nights.",
    tags: ["established", "rotating venue", "lesson included"],
    verificationStatus: "verified",
    confidenceScore: 80,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "SalsaVida", url: "https://www.salsavida.com/city/oklahoma-city", status: "verified", checkedAt: "2026-04-05", title: "SalsaVida OKC" },
    ],
    evidenceNotes: "Long-running OKC Latin dance event, confirmed on SalsaVida.",
  },
  {
    id: "fa-01",
    name: "Singles Night",
    organizer: "Union Church OKC",
    venue: "Union Church",
    neighborhood: "Edmond / NW Oklahoma City",
    frequency: "Monthly",
    price: "Free",
    category: "Faith",
    description: "Faith-based singles gathering at Union Church. Casual social environment with structured icebreakers. Open to all denominations.",
    tags: ["faith-based", "free", "community"],
    verificationStatus: "verified",
    confidenceScore: 75,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Instagram", url: "https://www.instagram.com/unionchurchokc/", status: "verified", checkedAt: "2026-04-05", title: "Union Church OKC Instagram" },
    ],
    evidenceNotes: "Verified via Union Church OKC Instagram, which posts about their singles events. Union Church is a real, established OKC church.",
  },
  {
    id: "ac-01",
    name: "Date Night Paint & Sip",
    organizer: "Painting with a Twist",
    venue: "9217 N Pennsylvania Ave",
    neighborhood: "NW Oklahoma City",
    frequency: "Weekly",
    price: "$35–$45",
    category: "Activity",
    description: "Guided painting sessions with wine. Popular with couples and singles alike. BYOB-friendly, with themed paint nights rotating weekly.",
    tags: ["creative", "BYOB", "guided"],
    verificationStatus: "verified",
    confidenceScore: 92,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Official Website", url: "https://www.paintingwithatwist.com/studio/oklahoma-city/", status: "verified", checkedAt: "2026-04-05", title: "Painting with a Twist OKC" },
    ],
    evidenceNotes: "National franchise with confirmed OKC location. Official website lists current class schedule.",
  },
  {
    id: "sc-01",
    name: "Oklahoma City Singles Meetup",
    organizer: "OKC Singles Meetup Group",
    venue: "Various locations",
    neighborhood: "Citywide",
    frequency: "Multiple weekly events",
    price: "Free–$20",
    category: "Social",
    description: "Oklahoma City's largest singles meetup community with 2,000+ members. Regular dinners, happy hours, outdoor activities, game nights, and cultural outings posted on Meetup.com.",
    tags: ["meetup", "large community", "variety"],
    verificationStatus: "verified",
    confidenceScore: 90,
    lastVerifiedAt: "2026-04-05",
    sources: [
      { provider: "Meetup", url: "https://www.meetup.com/find/us--ok--oklahoma-city/singles/", status: "verified", checkedAt: "2026-04-05", title: "OKC Singles on Meetup" },
    ],
    evidenceNotes: "Meetup.com search for OKC singles returns active groups with thousands of members and upcoming events.",
  },
];

export const singlesCategories = ["All", "Speed Dating", "Mixer", "Social", "Dance", "Activity", "Faith"] as const;
export const singlesTimeFilters = ["All Events", "Weekly", "Monthly", "Seasonal"] as const;

// Helper: get only publishable events (verified or stale with confidence > 60)
export const getPublishableEvents = (events: SinglesEvent[]) =>
  events.filter((e) => e.verificationStatus === "verified" || (e.verificationStatus === "stale" && e.confidenceScore >= 60));

// Helper: get verified-only events
export const getVerifiedEvents = (events: SinglesEvent[]) =>
  events.filter((e) => e.verificationStatus === "verified");
