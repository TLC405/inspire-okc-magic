export interface FitnessSpot {
  id: string;
  name: string;
  category: "CrossFit" | "Gym" | "Yoga" | "Outdoor" | "Running" | "Climbing";
  neighborhood: string;
  description: string;
  source: string;
  tags: string[];
}

export const fitnessSpots: FitnessSpot[] = [
  {
    id: "cf-01",
    name: "Scissortail CrossFit",
    category: "CrossFit",
    neighborhood: "Midtown",
    description: "Veteran-owned CrossFit box focused on community and competitive programming. All skill levels welcome.",
    source: "https://www.scissortailcrossfit.com/",
    tags: ["veteran-owned", "community", "competitive"],
  },
  {
    id: "cf-02",
    name: "CrossFit OKC",
    category: "CrossFit",
    neighborhood: "NW Oklahoma City",
    description: "One of Oklahoma City's original CrossFit boxes. Youth classes, strength programs, and metabolic conditioning.",
    source: "https://crossfitokc.com/",
    tags: ["established", "youth programs", "strength"],
  },
  {
    id: "cf-03",
    name: "Koda CrossFit",
    category: "CrossFit",
    neighborhood: "Multiple Locations",
    description: "High-quality gym collective with multiple Oklahoma City locations. Digital and on-site programming, personal training available.",
    source: "https://www.kodacrossfit.com/",
    tags: ["multi-location", "personal training", "digital"],
  },
  {
    id: "cf-04",
    name: "CrossFit Fiend",
    category: "CrossFit",
    neighborhood: "NW Oklahoma City",
    description: "Results-driven CrossFit with 24-hour access, day-care, saunas, and a full-service gym attached.",
    source: "https://crossfitfiend.com/",
    tags: ["24-hour", "daycare", "sauna"],
  },
  {
    id: "cf-05",
    name: "CrossFit Loud City",
    category: "CrossFit",
    neighborhood: "Edmond",
    description: "Edmond's premier CrossFit gym. Built on connection, encouragement, and relentless pursuit of better.",
    source: "http://loudcityfitness.com/",
    tags: ["edmond", "community", "encouraging"],
  },
  {
    id: "out-01",
    name: "Lake Hefner Trail",
    category: "Outdoor",
    neighborhood: "NW Oklahoma City",
    description: "9-mile paved loop around Lake Hefner. Popular for running, cycling, and sunset walks. Oklahoma City's most-used trail.",
    source: "https://www.okc.gov/departments/parks-recreation",
    tags: ["free", "paved", "scenic", "popular"],
  },
  {
    id: "out-02",
    name: "Scissortail Park",
    category: "Outdoor",
    neighborhood: "Downtown",
    description: "70-acre urban park in the heart of downtown. Walking paths, outdoor fitness areas, yoga on the lawn events.",
    source: "https://scissortailpark.org/",
    tags: ["free", "downtown", "events", "yoga"],
  },
  {
    id: "out-03",
    name: "Oklahoma River Trails",
    category: "Outdoor",
    neighborhood: "South Oklahoma City",
    description: "Multi-use trails along the Oklahoma River. Rowing, cycling, running — Olympic-level facilities open to the public.",
    source: "https://www.okc.gov/",
    tags: ["free", "river", "multi-use", "olympic"],
  },
  {
    id: "out-04",
    name: "Martin Park Nature Center",
    category: "Outdoor",
    neighborhood: "NW Oklahoma City",
    description: "140 acres of nature trails. Trail running, bird watching, and nature hikes in the city.",
    source: "https://www.okc.gov/departments/parks-recreation",
    tags: ["free", "nature", "trails", "peaceful"],
  },
  {
    id: "run-01",
    name: "OKC Running Club",
    category: "Running",
    neighborhood: "Citywide",
    description: "Weekly group runs from Scissortail Park and Lake Hefner. All paces welcome. Post-run socializing.",
    source: "https://www.meetup.com/okc-running-club/",
    tags: ["free", "social", "all levels"],
  },
  {
    id: "run-02",
    name: "Landrun 100",
    category: "Running",
    neighborhood: "Citywide",
    description: "Oklahoma City's premier 100-mile ultra cycling and running event. Annual spring race through Oklahoma terrain.",
    source: "https://www.landrun100.com/",
    tags: ["annual", "ultra", "competitive"],
  },
  {
    id: "climb-01",
    name: "Summit Climbing Gym",
    category: "Climbing",
    neighborhood: "NW Oklahoma City",
    description: "Indoor climbing, bouldering, and fitness. Social climb nights on Thursdays draw a great crowd.",
    source: "https://www.summitclimbing.com/",
    tags: ["indoor", "social", "bouldering"],
  },
];

export const fitnessCategories = ["All", "CrossFit", "Gym", "Outdoor", "Running", "Climbing", "Yoga"] as const;
