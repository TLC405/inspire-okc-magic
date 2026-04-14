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

export interface ThunderGame {
  opponent: string;
  result?: "W" | "L";
  score?: string;
  date: string;
  time?: string;
  venue?: string;
  price?: string;
  home?: boolean;
  label?: string;
}

export interface ThunderData {
  season: string;
  record: string;
  standing: string;
  mvpCandidate: string;
  mvpStats: string;
  nextGame: string;
  playoffSeed: string;
  recentResults: ThunderGame[];
  upcoming: ThunderGame[];
}

export interface CometGame {
  date: string;
  opponent: string;
  venue: string;
  time: string;
  price?: string;
  home?: boolean;
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
  // ── THUNDER ──
  { tag: "THUNDER WIRE", headline: "SGA drops 36 pts as OKC defeats Denver 118–103, clinches No. 1 seed in the Western Conference — playoffs begin April 19" },
  { tag: "THUNDER WIRE", headline: "Chet Holmgren records triple-double (18-12-10) in Thunder's dominant win over Sacramento Kings" },
  { tag: "THUNDER WIRE", headline: "Jalen Williams named to All-Star reserves — third Thunder player selected this season" },
  { tag: "THUNDER WIRE", headline: "Thunder set franchise record with 67 regular-season wins, surpassing 2012–13 mark" },
  // ── COMETS ──
  { tag: "COMET WATCH", headline: "OKC Comets announce 2026 NWSL home schedule — season opener vs. Portland Thorns, May 3 at Taft Stadium, tickets from $18" },
  { tag: "COMET WATCH", headline: "Comets sign Colombian international midfielder Catalina Usme to two-year deal" },
  { tag: "COMET WATCH", headline: "Taft Stadium expansion to 12,000 seats approved — construction begins July 2026" },
  // ── ENERGY FC ──
  { tag: "ENERGY FC", headline: "OKC Energy FC opens USL Championship season with 3–1 home win over San Antonio" },
  { tag: "ENERGY FC", headline: "Energy FC academy product signs first professional contract at age 17" },
  // ── DODGERS ──
  { tag: "OKC BASEBALL", headline: "Oklahoma City Dodgers 2026 season underway — home games at Chickasaw Bricktown Ballpark through September" },
  { tag: "OKC BASEBALL", headline: "Dodgers prospect hits for the cycle in 9–2 win over Sugar Land Space Cowboys" },
  // ── CITY HALL ──
  { tag: "CITY HALL", headline: "Mayor Holt signs Broadband Equity Act, directing $12M to connect 28 underserved OKC neighborhoods by 2027" },
  { tag: "CITY HALL", headline: "City Council approves $45M affordable housing bond for five priority corridors" },
  { tag: "CITY HALL", headline: "OKC announces free citywide Wi-Fi pilot in Bricktown, Midtown, and Paseo districts" },
  // ── MAPS 4 ──
  { tag: "MAPS 4 UPDATE", headline: "City Council greenlights downtown light-rail feasibility study — OKC-to-Edmond corridor environmental review underway" },
  { tag: "MAPS 4 UPDATE", headline: "MAPS 4 mental health campus groundbreaking scheduled for June 2026 on NE 23rd Street" },
  // ── PARKS ──
  { tag: "PARKS DESK", headline: "Scissortail Park Phase III groundbreaking set for May 15 — 22 additional acres of urban green space to be added by 2028" },
  { tag: "PARKS DESK", headline: "Myriad Botanical Gardens launches free summer concert series every Friday in June and July" },
  // ── ARTS & CULTURE ──
  { tag: "ARTS & CULTURE", headline: "Paseo Arts Festival confirms May 24–26 dates — 100+ working artists, live music on three stages, free admission" },
  { tag: "ARTS & CULTURE", headline: "Oklahoma Contemporary opens 'Future Frequencies' digital art exhibition — runs through August" },
  { tag: "ARTS & CULTURE", headline: "Factory Obscura announces new immersive installation 'Echoes' opening Memorial Day weekend" },
  // ── WEATHER ──
  { tag: "WEATHER DESK", headline: "NWS urges OKC metro preparedness as severe weather season enters peak window — shelter map posted at okc.gov" },
  { tag: "WEATHER DESK", headline: "High of 88°F today with 20% chance of afternoon storms — stay hydrated, OKC" },
  // ── BUSINESS ──
  { tag: "BUSINESS", headline: "Boeing confirms 800-job expansion at Tinker Air Force Base maintenance facility" },
  { tag: "BUSINESS", headline: "OKC tech startup Tailwind Health raises $22M Series A to expand telehealth platform" },
  { tag: "BUSINESS", headline: "Paycom breaks ground on second headquarters tower in downtown Oklahoma City" },
  // ── REAL ESTATE ──
  { tag: "REAL ESTATE", headline: "OKC median home price reaches $285K — up 7% year-over-year, still among most affordable major metros" },
  { tag: "REAL ESTATE", headline: "New 400-unit mixed-use development announced for Film Row district, delivery expected 2028" },
  // ── FOOD & DRINK ──
  { tag: "FOOD & DRINK", headline: "James Beard semifinalist Nonesuch named one of America's best restaurants for third consecutive year" },
  { tag: "FOOD & DRINK", headline: "OKC's first Korean BBQ food hall opens in Asian District on Classen Boulevard" },
  // ── COMMUNITY ──
  { tag: "COMMUNITY", headline: "Regional Food Bank of Oklahoma distributes 2 million meals in Q1 2026 — volunteers needed" },
  { tag: "COMMUNITY", headline: "Habitat for Humanity OKC completes 50th home this year in Spencer neighborhood" },
  // ── EDUCATION ──
  { tag: "EDUCATION", headline: "OU Health Sciences Center receives $30M NIH grant for genomic medicine research" },
  { tag: "EDUCATION", headline: "OKCPS graduation rate hits 82% — highest in district history" },
  // ── TRANSIT ──
  { tag: "TRANSIT", headline: "EMBARK launches new rapid bus line connecting Edmond to downtown OKC — 25-minute express service" },
  { tag: "TRANSIT", headline: "Will Rogers World Airport reports record 5.2M passengers in 2025, new terminal expansion approved" },
  // ── GROWTH ──
  { tag: "GROWTH REPORT", headline: "Oklahoma City ranks No. 3 fastest-growing major US city — Census Bureau preliminary 2025 estimates confirm metro surge" },
  { tag: "GROWTH REPORT", headline: "OKC metro population surpasses 1.5 million — city proper at 720K residents" },
  // ── HEALTH ──
  { tag: "HEALTH", headline: "INTEGRIS opens new 120-bed behavioral health facility on I-44 corridor — largest in the state" },
  // ── TECH ──
  { tag: "TECH", headline: "Oklahoma Innovation District announces $50M venture fund for local startups" },
  { tag: "TECH", headline: "Cyber Command training center at Tinker AFB graduates 500th cohort of cybersecurity specialists" },
  // ── SPORTS BRIEF ──
  { tag: "SPORTS BRIEF", headline: "Thunder vs. LA Clippers — Playoffs Round 1 Game 1, April 19 at Paycom Center, 7:00 PM CT — tickets from $85" },
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
      description: "22 acres of new urban green space expanding the park's western reach. Includes amphitheater, walking trails, and a community garden.",
      date: "Announced April 1, 2026",
    },
    {
      name: "Housing for All OKC",
      status: "In Progress",
      description: "Commitment to develop 1,500 affordable housing units by 2028 across five priority corridors.",
      date: "Ongoing",
    },
  ],
};

// ── OKC Thunder ──────────────────────────
export const thunderData: ThunderData = {
  season: "2025–26",
  record: "67–15",
  standing: "No. 1 Seed — Western Conference",
  mvpCandidate: "Shai Gilgeous-Alexander",
  mvpStats: "32.4 PPG · 6.1 APG",
  nextGame: "vs. LA Clippers — April 19, 7:00 PM CT",
  playoffSeed: "#1 Seed",
  recentResults: [
    { opponent: "Denver Nuggets", result: "W", score: "118–103", date: "Apr 11" },
    { opponent: "Minnesota Timberwolves", result: "W", score: "124–108", date: "Apr 9" },
    { opponent: "Memphis Grizzlies", result: "W", score: "107–91", date: "Apr 7" },
  ],
  upcoming: [
    { opponent: "LA Clippers", label: "PLAYOFFS · Round 1 Game 1", date: "Apr 19", time: "7:00 PM CT", venue: "Paycom Center", price: "From $85", home: true },
    { opponent: "LA Clippers", label: "PLAYOFFS · Round 1 Game 2", date: "Apr 21", time: "7:30 PM CT", venue: "Paycom Center", price: "From $85", home: true },
    { opponent: "LA Clippers", label: "PLAYOFFS · Round 1 Game 3", date: "Apr 23", time: "9:30 PM CT", venue: "Crypto.com Arena", price: "Away", home: false },
  ],
};

// ── OKC Comets (NWSL) ──────────────────────────
export const cometSchedule: CometGame[] = [
  { opponent: "Kansas City Current", date: "Apr 19", time: "7:00 PM", venue: "Taft Stadium", price: "$15–$40", home: true },
  { opponent: "Portland Thorns", date: "May 3", time: "6:00 PM", venue: "Taft Stadium", price: "$18–$50", home: true },
  { opponent: "Orlando Pride", date: "May 17", time: "6:30 PM", venue: "Taft Stadium", price: "$18–$45", home: true },
  { opponent: "Angel City FC", date: "May 24", time: "9:30 PM", venue: "Away — Los Angeles", price: "Away", home: false },
  { opponent: "Washington Spirit", date: "Jun 7", time: "7:00 PM", venue: "Taft Stadium", price: "$20–$55", home: true },
  { opponent: "North Carolina Courage", date: "Jun 21", time: "6:00 PM", venue: "Taft Stadium", price: "$18–$45", home: true },
];

// ── Discover Categories (structured for admin briefing) ──
export interface DiscoverCategory {
  name: string;
  items: { title: string; tag: string; description: string; image?: string }[];
}

export const discoverCategories: DiscoverCategory[] = [
  {
    name: "Architecture",
    items: [
      { title: "Devon Energy Tower", tag: "Landmark", description: "OKC's tallest building at 50 stories. The defining element of the downtown skyline, completed in 2012." },
      { title: "Oklahoma State Capitol", tag: "Government", description: "The only state capitol with working oil wells on its grounds. Completed in 1917, dome added in 2002." },
      { title: "First Americans Museum", tag: "Cultural", description: "AIA award-winning architecture on the Oklahoma River. Designed to reflect Native American cosmology." },
      { title: "Oklahoma Contemporary Arts Center", tag: "Arts", description: "Modern cultural campus in the Film Row district." },
      { title: "Myriad Botanical Gardens Crystal Bridge", tag: "Parks", description: "Iconic glass-enclosed tropical conservatory in the heart of downtown." },
    ],
  },
  {
    name: "Policy",
    items: [
      { title: "Oklahoma Promise (OHLAP)", tag: "Education", description: "State-funded college scholarship for low-income Oklahoma 8th graders who maintain a 2.5 GPA." },
      { title: "MAPS 4", tag: "Infrastructure", description: "$978M Metropolitan Area Projects initiative passed in 2019 for parks, mental health, transit, and homelessness." },
      { title: "Oklahoma Medical Marijuana Authority", tag: "Regulation", description: "Oklahoma's regulated medical marijuana framework, one of the most permissive in the US." },
      { title: "Regional Transportation Plan 2045", tag: "Transit", description: "Long-range transportation planning for the Oklahoma City metro area." },
    ],
  },
  {
    name: "Sustainability",
    items: [
      { title: "Solar Growth Potential", tag: "Energy", description: "Oklahoma receives 237+ sunny days per year. Residential and commercial solar adoption growing at 18% annually." },
      { title: "OG&E Wind Power", tag: "Utility", description: "Oklahoma Gas & Electric's large-scale wind energy generation serving OKC metro residents." },
      { title: "Scissortail Park Stormwater System", tag: "Parks", description: "The park's 70-acre footprint incorporates a sophisticated urban stormwater management system." },
    ],
  },
  {
    name: "Culture",
    items: [
      { title: "Paseo Arts District", tag: "Neighborhood", description: "Oklahoma City's original arts district. Spanish Colonial Revival architecture, 80+ working artists, monthly gallery walks." },
      { title: "Film Row", tag: "Historic", description: "OKC's historic film distribution district, now a creative hub with restaurants, galleries, and event spaces." },
      { title: "Automobile Alley", tag: "Architecture", description: "Broadway corridor lined with 1920s brick auto dealerships, now a dining and retail destination." },
      { title: "Bricktown", tag: "Entertainment", description: "Former warehouse district turned entertainment hub. Canal walks, music venues, sports bars." },
      { title: "The Paseo", tag: "Arts", description: "Monthly First Friday Gallery Walk draws thousands. Annual Paseo Arts Festival every Memorial Day weekend." },
    ],
  },
  {
    name: "Growth",
    items: [
      { title: "Population Growth: 15% in 10 Years", tag: "Demographics", description: "OKC metro population surpassed 1.4 million. City proper at 700K+. One of the fastest-growing metros in the South." },
      { title: "Oklahoma City's GDP Growth", tag: "Economy", description: "Metro GDP grew from $68B to $90B between 2015 and 2024." },
      { title: "New Midtown Development", tag: "Real Estate", description: "$400M+ in new residential and mixed-use development in Midtown since 2018." },
    ],
  },
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
