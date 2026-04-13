// Static image map — curated Unsplash CDN URLs for instant rendering
// No API key needed, served from global CDN

// Category fallback images (used when no specific listing match)
const categoryFallbacks: Record<string, string> = {
  // Fitness
  "CrossFit": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  "Gym": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80",
  "Yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  "HIIT": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
  "Bootcamp": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80",
  "Outdoor": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
  "Running": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80",
  "Climbing": "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80",
  "Boxing": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&q=80",
  "Martial Arts": "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80",
  "BJJ": "https://images.unsplash.com/photo-1564415637254-92c66292cd64?w=400&q=80",
  "Cycling": "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80",
  "Swimming": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80",
  "Pilates": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  "Barre": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  "Personal Training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "Recovery": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
  "Powerlifting": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&q=80",
  "Tennis": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
  "Pickleball": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
  "Dance": "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=400&q=80",
  "Infrared": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80",
  "Mind-Body": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
  "Senior/Adaptive": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  "Kids/Family": "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&q=80",
  "Aerial": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80",
  "Stretch": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
  "Rec Center": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&q=80",
  "Sports Training": "https://images.unsplash.com/photo-1461896836934-bd45ba862e38?w=400&q=80",

  // Volunteer
  "Food": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80",
  "Environment": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
  "Housing": "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80",
  "Youth": "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80",
  "Community": "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
  "Homelessness": "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80",
  "Animals": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80",
  "Health": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80",
  "Arts": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  "Education": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80",
  "Disaster Relief": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80",
  "Veterans": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=400&q=80",

  // Singles / Events
  "Speed Dating": "https://images.unsplash.com/photo-1529543544282-ea9407407c2b?w=400&q=80",
  "Mixer": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&q=80",
  "Social": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80",
  "Activity": "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80",
  "Faith": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&q=80",
  "Date Night": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  "Team Building": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80",

  // Discover
  "architecture": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
  "policy": "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&q=80",
  "sustainability": "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=80",
  "culture": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  "growth": "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=400&q=80",
};

// Listing-type fallbacks (last resort)
const typeFallbacks: Record<string, string> = {
  fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  volunteer: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80",
  singles: "https://images.unsplash.com/photo-1529543544282-ea9407407c2b?w=400&q=80",
  discover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
};

/**
 * Get a static image URL for any listing, instantly.
 * Falls back: category image → listing type fallback
 */
export function getStaticImage(
  listingType: string,
  listingId: string,
  category?: string
): string {
  // Category-specific image
  if (category && categoryFallbacks[category]) {
    return categoryFallbacks[category];
  }
  // Type fallback
  return typeFallbacks[listingType] || typeFallbacks.fitness;
}
