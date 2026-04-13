// ═══════════════════════════════════════
// Civic Intelligence Data — Oklahoma City
// Wire Ticker, Mayor's Desk, Thunder, Comets
// ═══════════════════════════════════════

export interface TickerItem {
  tag: string;
  headline: string;
}

export interface MayorInitiative {
  name: string;
  status: string;
  description: string;
  date: string;
}

export interface MayorData {
  name: string;
  title: string;
  term: string;
  quote: string;
  initiatives: MayorInitiative[];
}

export interface ThunderData {
  season: string;
  record: string;
  standing: string;
  mvpCandidate: string;
  nextGame: string;
  playoffSeed: string;
}

export interface CometGame {
  date: string;
  opponent: string;
  venue: string;
  time: string;
}

export interface DateNightListing {
  id: number;
  title: string;
  venue: string;
  district: string;
  frequency: string;
  price: string;
  verified: string | null;
  image: string | null;
  description: string;
}

// ── Wire Ticker Headlines ──────────────────────────
export const tickerItems: TickerItem[] = [
  { tag: "THUNDER WIRE", headline: "SGA drops 36 pts as OKC defeats Denver 118–103, clinches No. 1 seed in the Western Conference — playoffs begin April 19" },
  { tag: "COMET WATCH", headline: "OKC Comets announce 2026 NWSL home schedule — season opener vs. Portland Thorns, May 3 at Taft Stadium, tickets from $18" },
  { tag: "CITY HALL", headline: "Mayor Holt signs Broadband Equity Act, directing $12M to connect 28 underserved OKC neighborhoods by 2027" },
  { tag: "MAPS 4 UPDATE", headline: "City Council greenlights downtown light-rail feasibility study — OKC-to-Edmond corridor environmental review underway" },
  { tag: "SPORTS BRIEF", headline: "Thunder vs. LA Clippers — Playoffs Round 1 Game 1, April 19 at Paycom Center, 7:00 PM CT — tickets from $85" },
  { tag: "PARKS DESK", headline: "Scissortail Park Phase III groundbreaking set for May 15 — 22 additional acres of urban green space to be added by 2028" },
  { tag: "GROWTH REPORT", headline: "Oklahoma City ranks No. 3 fastest-growing major US city — Census Bureau preliminary 2025 estimates confirm metro surge" },
  { tag: "ARTS & CULTURE", headline: "Paseo Arts Festival confirms May 24–26 dates — 100+ working artists, live music on three stages, free admission" },
  { tag: "WEATHER DESK", headline: "NWS urges OKC metro preparedness as severe weather season enters peak window — shelter map posted at okc.gov" },
];

// ── Mayor's Desk ──────────────────────────
export const mayorData: MayorData = {
  name: "Mayor David Holt",
  title: "39th Mayor of Oklahoma City",
  term: "In office since 2018",
  quote: "Oklahoma City is not just growing — it is growing with intention. Every decision we make today shapes the city our children will inherit.",
  initiatives: [
    {
      name: "Broadband Equity Act",
      status: "Signed into Law",
      description: "$12M directed to connect 28 underserved neighborhoods with fiber-optic broadband by year-end 2027.",
      date: "April 10, 2026",
    },
    {
      name: "MAPS 4 Light Rail Corridor",
      status: "Study Phase",
      description: "Feasibility study approved for downtown-to-Edmond light rail. Environmental review underway. Public comment period opens May 2026.",
      date: "March 28, 2026",
    },
    {
      name: "Scissortail Park Phase III",
      status: "Groundbreaking May 15",
      description: "22 additional acres of urban green space connecting the lower park to the Oklahoma River trail system.",
      date: "Announced March 2026",
    },
  ],
};

// ── OKC Thunder ──────────────────────────
export const thunderData: ThunderData = {
  season: "2025–26",
  record: "62–20",
  standing: "No. 1 Western Conference",
  mvpCandidate: "Shai Gilgeous-Alexander",
  nextGame: "vs. LA Clippers — April 19, 7:00 PM CT",
  playoffSeed: "#1 Seed",
};

// ── OKC Comets (NWSL) ──────────────────────────
export const cometSchedule: CometGame[] = [
  { date: "May 3", opponent: "Portland Thorns", venue: "Taft Stadium", time: "7:00 PM" },
  { date: "May 10", opponent: "Kansas City Current", venue: "Taft Stadium", time: "7:00 PM" },
  { date: "May 17", opponent: "at Houston Dash", venue: "Shell Energy Stadium", time: "7:30 PM" },
  { date: "May 24", opponent: "Angel City FC", venue: "Taft Stadium", time: "7:00 PM" },
  { date: "June 7", opponent: "at Chicago Red Stars", venue: "SeatGeek Stadium", time: "6:00 PM" },
];

// ── Date Night Listings ──────────────────────────
export const dateNightListings: DateNightListing[] = [
  {
    id: 1,
    title: "Factory Obscura Immersive Art Date",
    venue: "Factory Obscura",
    district: "Automobile Alley",
    frequency: "Daily",
    price: "$18–$25",
    verified: "95%",
    image: "https://images.squarespace-cdn.com/content/v1/59ae0149e45a7c36968d9f4e/1556660706855-A3S4A7CDX9A3O0CH924F/Factory+Obscura+Mix-Tape-24.jpg",
    description: "Walk through immersive, interactive art installations together. One of OKC's most unique experiences.",
  },
  {
    id: 2,
    title: "Scissortail Park Sunset Kayaking",
    venue: "Scissortail Park Lower Park",
    district: "Downtown",
    frequency: "Seasonal",
    price: "$15–$25",
    verified: "88%",
    image: "https://scissortailpark.org/wp-content/uploads/2021/05/Kayak-sunset.jpg",
    description: "Paddle the Oklahoma River at sunset from Scissortail Park. Stunning skyline views.",
  },
  {
    id: 3,
    title: "Wheeler District Waterfront Dinner",
    venue: "The Patriarch / Wheeler Ferris Wheel area",
    district: "Wheeler District",
    frequency: "Daily",
    price: "$30–$60",
    verified: "90%",
    image: "https://www.wheelerdistrict.com/wp-content/uploads/2021/12/Updated-WHEELER_Maps_MasterDevPlan_Nov2024-faded.jpg",
    description: "Dinner in Wheeler District followed by a ride on the Wheeler Ferris Wheel overlooking the Oklahoma River.",
  },
  {
    id: 4,
    title: "Paseo First Friday Gallery Walk",
    venue: "Paseo Arts District",
    district: "Paseo",
    frequency: "Monthly",
    price: "Free",
    verified: "95%",
    image: "https://images.squarespace-cdn.com/content/v1/59dfd666d55b410976378e9b/1550509623547-2N5B7U2PCOV8L5Z99I6Q/Paseo+First+Friday.jpg",
    description: "Free monthly gallery walk through the Paseo Arts District. Dozens of galleries, live music, food trucks.",
  },
  {
    id: 5,
    title: "OKC Riversport Adventure Date",
    venue: "Riversport Adventures",
    district: "Boathouse District",
    frequency: "Daily/Seasonal",
    price: "$20–$50",
    verified: "92%",
    image: "https://www.visitokc.com/includes/public/assets/images/blog/Adventure_Course_Zip_Line.jpg",
    description: "Zip line, white water rafting, rock climbing, and kayaking on the Oklahoma River.",
  },
  {
    id: 6,
    title: "Automobile Alley Cocktail Crawl",
    venue: "Broadway Ave corridor",
    district: "Automobile Alley",
    frequency: "Daily",
    price: "$10–$20",
    verified: null,
    image: null,
    description: "Bar hop through Oklahoma City's most vibrant corridor. Craft cocktails, local bars, great architecture.",
  },
  {
    id: 7,
    title: "Winchester Drive-In Movie",
    venue: "Winchester Drive-In",
    district: "South OKC",
    frequency: "Seasonal",
    price: "$12–$20",
    verified: null,
    image: "https://www.winchesterdrivein.com/wp-content/uploads/2021/05/slideshow_4.jpg",
    description: "Double feature under the stars. Retro vibes, fresh popcorn, one of OKC's last drive-ins.",
  },
  {
    id: 8,
    title: "First Americans Museum Evening Experience",
    venue: "FAM",
    district: "East OKC",
    frequency: "Daily",
    price: "$12–$18",
    verified: null,
    image: "https://famok.org/wp-content/uploads/2021/04/FAM-Aerial-Evening-Sunset-1024x683.jpg",
    description: "Explore the First Americans Museum with special exhibitions and a stunning rooftop view of the OKC skyline.",
  },
  {
    id: 9,
    title: "Devon Energy Tower Observation Tour",
    venue: "Devon Energy Tower",
    district: "Downtown",
    frequency: "Weekends",
    price: "$10",
    verified: null,
    image: null,
    description: "Guided tour of Oklahoma City's tallest skyscraper. Panoramic city views from the upper floors.",
  },
  {
    id: 10,
    title: "Boathouse District Sunset Cruise",
    venue: "Boathouse District",
    district: "Boathouse District",
    frequency: "Seasonal",
    price: "$25–$40",
    verified: null,
    image: null,
    description: "Sunset boat tour on the Oklahoma River from the Boathouse District. Craft beer included.",
  },
];

// ── "For Who" Taglines ──────────────────────────
export const singlesForWho = [
  "For the newly single",
  "If you haven't dated in a while",
  "For the shy ones",
  "The weekend social type",
  "If you just moved here",
  "For the extrovert",
  "The meet-someone-new type",
  "If apps aren't working",
  "For the selective dater",
  "If you want something real",
  "For the dance floor crowd",
  "If you like a little structure",
  "The first-time-out type",
  "For those who hate small talk",
  "If faith matters to you",
  "The one who keeps almost going",
  "For the person tired of going home alone",
  "If you'd rather be doing something",
  "The slow-burn type",
  "For the recently divorced",
];

export const fitnessForWho = [
  "For the total beginner",
  "The comeback athlete",
  "If you need accountability",
  "For parents between drop-offs",
  "The competitive type",
  "If you haven't worked out in years",
  "For the social workout crowd",
  "If you like to sweat alone",
  "The 5am crowd",
  "If you prefer being outside",
  "The weekend warrior",
  "If you want community, not just cardio",
  "For kids and teens",
  "If you're training for something specific",
  "The stress-release type",
  "For the recently moved-in",
  "If gyms feel intimidating",
  "The all-or-nothing type",
  "For the person who keeps restarting",
  "If your therapist said to move your body",
];

export const volunteerForWho = [
  "If you just moved here and know no one",
  "For the empty nester",
  "Bring the whole family",
  "The solo Saturday contributor",
  "For students building something",
  "If you want to meet your people",
  "The weekend-only helper",
  "If animals are your thing",
  "The regular committer",
  "For the one-and-done visit",
  "If you like working outdoors",
  "For the newly retired",
  "A family project waiting to happen",
  "For the person between jobs",
  "The food-first volunteer",
  "If you need a reason to get out of the house",
  "For the kid who has too much free time",
  "The type who wants to give back but doesn't know how",
  "For the newly arrived Oklahoman",
  "If you want to feel useful on a Saturday",
];

export const dateNightForWho = [
  "First date approved",
  "For the couple that's been together 10 years",
  "Solo adventurer welcome",
  "Bring the kids",
  "For the adventurous pair",
  "If you've run out of date ideas",
  "Date number three energy",
  "For the forever-together couple",
  "If you're trying to impress someone",
  "For a quiet night that means something",
  "The bold choice",
  "For someone new to Oklahoma City",
  "Bring your person",
  "If you need a reason to leave the house",
  "For the long-distance visit",
  "The spontaneous Saturday plan",
  "If anniversary dinners feel too formal",
  "For the parent who finally got a sitter",
  "The kind of night you talk about for years",
  "If solo is how you prefer it",
];
