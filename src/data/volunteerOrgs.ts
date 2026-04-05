export interface VolunteerOrg {
  id: string;
  name: string;
  category: "Food" | "Environment" | "Housing" | "Youth" | "Community" | "Homelessness";
  neighborhood: string;
  description: string;
  source: string;
  tags: string[];
}

export const volunteerOrgs: VolunteerOrg[] = [
  {
    id: "v-01",
    name: "Regional Food Bank of Oklahoma",
    category: "Food",
    neighborhood: "South Oklahoma City",
    description: "Sort, pack, and prepare food for Oklahomans living with hunger. Individual and group volunteer slots available daily.",
    source: "https://www.regionalfoodbank.org/volunteer/",
    tags: ["hands-on", "daily slots", "groups welcome"],
  },
  {
    id: "v-02",
    name: "United Way of Central Oklahoma",
    category: "Community",
    neighborhood: "Downtown",
    description: "Multiple volunteer programs including community investment, agency support, and seasonal campaigns.",
    source: "https://unitedwayokc.org/get-involved/volunteer/",
    tags: ["variety", "seasonal", "professional"],
  },
  {
    id: "v-03",
    name: "OKC Beautiful",
    category: "Environment",
    neighborhood: "Citywide",
    description: "Tree planting, litter pickup, school garden programs, and neighborhood beautification projects across Oklahoma City.",
    source: "https://www.okcbeautiful.com/volunteer",
    tags: ["outdoor", "environment", "schools"],
  },
  {
    id: "v-04",
    name: "Rebuilding Together OKC",
    category: "Housing",
    neighborhood: "Citywide",
    description: "Home repair and renovation for at-risk homeowners. Skills-based volunteering — carpentry, painting, landscaping.",
    source: "https://rebuildingtogetherokc.org/volunteer/",
    tags: ["skilled", "home repair", "impact"],
  },
  {
    id: "v-05",
    name: "Salvation Army Central Oklahoma",
    category: "Community",
    neighborhood: "Multiple Locations",
    description: "Year-round volunteer opportunities including food service, holiday drives, and community outreach programs.",
    source: "https://southernusa.salvationarmy.org/central-oklahoma/volunteer/",
    tags: ["year-round", "holiday", "outreach"],
  },
  {
    id: "v-06",
    name: "Neighborhood Services Organization (NSO)",
    category: "Homelessness",
    neighborhood: "Downtown",
    description: "Direct service to individuals experiencing homelessness. Meal service, shelter support, and transition programs.",
    source: "https://www.nsookc.org/volunteer/",
    tags: ["direct service", "meals", "shelter"],
  },
  {
    id: "v-07",
    name: "City Care OKC",
    category: "Homelessness",
    neighborhood: "Downtown",
    description: "Fight homelessness through community response. Volunteer for outreach events, supply drives, and awareness campaigns.",
    source: "https://www.citycareokc.org/volunteer",
    tags: ["outreach", "awareness", "community"],
  },
  {
    id: "v-08",
    name: "Habitat for Humanity — Central Oklahoma",
    category: "Housing",
    neighborhood: "Citywide",
    description: "Build homes alongside future homeowners. No construction experience needed — training provided on site.",
    source: "https://www.habitatokc.org/",
    tags: ["construction", "families", "no experience needed"],
  },
  {
    id: "v-09",
    name: "Positive Tomorrows",
    category: "Youth",
    neighborhood: "NW Oklahoma City",
    description: "Oklahoma's only school for homeless children. Volunteer as tutors, mentors, and classroom assistants.",
    source: "https://www.positivetomorrows.org/",
    tags: ["education", "children", "mentoring"],
  },
  {
    id: "v-10",
    name: "Feed the Children",
    category: "Food",
    neighborhood: "NW Oklahoma City",
    description: "Oklahoma City-headquartered global nonprofit. Local warehouse volunteering, community distribution events.",
    source: "https://www.feedthechildren.org/",
    tags: ["global HQ", "warehouse", "distribution"],
  },
];

export const volunteerCategories = ["All", "Food", "Environment", "Housing", "Youth", "Community", "Homelessness"] as const;
