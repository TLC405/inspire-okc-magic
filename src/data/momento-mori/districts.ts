export interface StreetLegend {
  name: string;
  nickname: string;
  sign: string;
  situation: string;
  backstory: string;
  quote: string;
  yearsOnStreet: number;
  hasDog: boolean;
  dogName?: string;
  accessories: string[];
}

export interface District {
  id: string;
  name: string;
  tagline: string;
  history: string;
  knownFor: string[];
  coolPlaces: { name: string; type: string }[];
  landmarks: string[];
  website?: string;
  coordinates: { x: number; y: number };
  legend: StreetLegend;
}

export const districts: District[] = [
  { id: "bricktown", name: "Bricktown", tagline: "Where the action never stops", history: "Once a warehouse district, Bricktown transformed into OKC's entertainment hotspot in the 1990s.", knownFor: ["Nightlife", "Canal walks", "Thunder games", "Live music venues"], coolPlaces: [{ name: "Toby Keith's I Love This Bar", type: "Bar & Grill" }, { name: "Mickey Mantle's Steakhouse", type: "Steakhouse" }, { name: "Tapwerks Ale House", type: "Craft Beer" }], landmarks: ["Chickasaw Bricktown Ballpark", "Bricktown Canal", "American Banjo Museum"], website: "https://www.bricktownokc.com", coordinates: { x: 65, y: 55 }, legend: { name: "Earl 'Canal' Thompson", nickname: "The Canal King", sign: "HOMELESS BUT MY VIEWS ARE WATERFRONT 🌊", situation: "Laying on the canal wall with a fishing pole", backstory: "Former river boat captain who says he's 'waiting for his ship to come in'.", quote: "The canal may be shallow, but my wisdom runs deep, friend.", yearsOnStreet: 12, hasDog: true, dogName: "Admiral", accessories: ["Captain's hat (torn)", "Fishing pole", "Anchor tattoo", "Flask"] } },
  { id: "midtown", name: "Midtown", tagline: "The heart of urban cool", history: "Midtown emerged as OKC's trendy neighborhood in the 2000s.", knownFor: ["Trendy restaurants", "Cocktail bars", "Urban living", "Food trucks"], coolPlaces: [{ name: "Packard's New American Kitchen", type: "New American" }, { name: "The Pump Bar", type: "Dive Bar" }, { name: "Empire Slice House", type: "Pizza" }], landmarks: ["Classen Curve", "Tower Theatre", "Gold Dome Building"], coordinates: { x: 45, y: 40 }, legend: { name: "Marcus 'WiFi' Johnson", nickname: "The Hotspot", sign: "WILL SHARE PASSWORD FOR FOOD 📶", situation: "Sitting against a coffee shop wall with a cracked phone", backstory: "Former tech startup founder whose app 'almost made it'.", quote: "I may be offline, but I'm always connected to the streets.", yearsOnStreet: 5, hasDog: false, accessories: ["Cracked iPhone", "Portable charger (dead)", "Startup hoodie", "AirPod (one)"] } },
  { id: "deep-deuce", name: "Deep Deuce", tagline: "Where jazz never died", history: "Once the heart of OKC's African American community and a thriving jazz district.", knownFor: ["Jazz history", "Soul food", "Historic culture", "Modern lofts"], coolPlaces: [{ name: "Deep Deuce Grill", type: "American" }, { name: "Flashback RetroPub", type: "Retro Bar" }], landmarks: ["Deep Deuce Historic Marker", "Charlie Christian statue site"], coordinates: { x: 60, y: 48 }, legend: { name: "Jerome 'Sax' Williams", nickname: "The Last Note", sign: "MY SAXOPHONE IS IN THE PAWN SHOP BUT THE MUSIC LIVES ON 🎷", situation: "Sitting on a milk crate humming jazz standards", backstory: "Played backup for several jazz greats in the 80s.", quote: "This street corner has seen more soul than any concert hall.", yearsOnStreet: 18, hasDog: true, dogName: "Bebop", accessories: ["Bucket drums", "Fedora (dusty)", "Jazz records collection", "Gold tooth"] } },
  { id: "paseo", name: "Paseo Arts District", tagline: "Where creativity lives rent-free", history: "Oklahoma's oldest arts district since the 1920s.", knownFor: ["Art galleries", "First Friday", "Live music", "Bohemian culture"], coolPlaces: [{ name: "Paseo Grill", type: "American" }, { name: "Picasso Cafe", type: "Mediterranean" }], landmarks: ["Paseo Gateway", "Historic galleries"], website: "https://thepaseo.org", coordinates: { x: 42, y: 28 }, legend: { name: "Stella 'Canvas' Rodriguez", nickname: "The Street Picasso", sign: "WILL DRAW YOUR PORTRAIT FOR WHATEVER YOU GOT 🎨", situation: "Surrounded by chalk art on the sidewalk", backstory: "Art school dropout who says galleries 'couldn't handle her vision'.", quote: "Every surface is a canvas when you're brave enough.", yearsOnStreet: 9, hasDog: true, dogName: "Frida", accessories: ["Paint-splattered everything", "Beret", "Chalk collection", "Portfolio of sketches"] } },
  { id: "plaza", name: "Plaza District", tagline: "Weird is our brand", history: "The Plaza District emerged from urban decay in the 2000s.", knownFor: ["Vintage shops", "Live shows", "LIVE on the Plaza", "Street art"], coolPlaces: [{ name: "Empire Slice House", type: "Pizza" }, { name: "Saints", type: "Southern" }], landmarks: ["Plaza Theatre", "Lyric Theatre", "Plaza Walls murals"], website: "https://plazadistrict.org", coordinates: { x: 38, y: 32 }, legend: { name: "Crazy Pete Peterson", nickname: "The Plaza Prophet", sign: "THE END IS NEAR BUT THESE TACOS ARE WORTH IT 🌮", situation: "Standing on a milk crate 'preaching' about vintage finds", backstory: "Former stockbroker who predicted the 2008 crash.", quote: "I may be crazy, but I know a good thrift score when I see one.", yearsOnStreet: 14, hasDog: true, dogName: "Prophet", accessories: ["Sandwich board with reviews", "Megaphone (broken)", "Vintage suit (torn)", "Crystal ball (bowling ball)"] } },
  { id: "stockyards", name: "Stockyards City", tagline: "Real cowboys, real beef", history: "The world's largest stocker and feeder cattle market since 1910.", knownFor: ["Cattle auctions", "Western wear", "Steakhouses", "Rodeo culture"], coolPlaces: [{ name: "Cattlemen's Steakhouse", type: "Steakhouse" }, { name: "Langston's Western Wear", type: "Western Store" }], landmarks: ["Livestock Exchange Building", "Cattle pens", "Rodeo arena"], website: "https://www.stockyardscity.org", coordinates: { x: 25, y: 55 }, legend: { name: "Old Buck Buchanan", nickname: "The Last Cowboy", sign: "RODE BULLS FOR 40 YEARS NOW MY BACK RIDES ME 🤠", situation: "Sitting on a hay bale, tells everyone he's 'resting between rounds'", backstory: "Actual retired rodeo champion. Has the buckles to prove it.", quote: "That's some fancy footwear, city slicker.", yearsOnStreet: 11, hasDog: false, accessories: ["Championship buckles (5)", "Cowboy hat (weathered)", "Boots (real ostrich)", "Lasso"] } },
];
