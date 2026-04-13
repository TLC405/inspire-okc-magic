export interface City {
  id: string;
  name: string;
  state: string;
  stateAbbr: string;
  coordinates: { lat: number; lng: number };
  mapPosition: { x: number; y: number };
  size: 'major' | 'city' | 'town';
  hasDistricts: boolean;
  population?: string;
  description: string;
}

export const cities: City[] = [
  { id: "oklahoma-city", name: "Oklahoma City", state: "Oklahoma", stateAbbr: "OK", coordinates: { lat: 35.4676, lng: -97.5164 }, mapPosition: { x: 48, y: 52 }, size: "major", hasDistricts: true, population: "687K", description: "Capital of Oklahoma. Thunder territory." },
  { id: "tulsa", name: "Tulsa", state: "Oklahoma", stateAbbr: "OK", coordinates: { lat: 36.1540, lng: -95.9928 }, mapPosition: { x: 56, y: 45 }, size: "major", hasDistricts: true, population: "413K", description: "Art Deco capital of the world." },
  { id: "norman", name: "Norman", state: "Oklahoma", stateAbbr: "OK", coordinates: { lat: 35.2226, lng: -97.4395 }, mapPosition: { x: 49, y: 55 }, size: "city", hasDistricts: false, population: "128K", description: "Sooner stronghold. OU country." },
  { id: "lawton", name: "Lawton", state: "Oklahoma", stateAbbr: "OK", coordinates: { lat: 34.6036, lng: -98.3959 }, mapPosition: { x: 42, y: 60 }, size: "city", hasDistricts: false, population: "91K", description: "Gateway to the Wichita Mountains." },
  { id: "dallas", name: "Dallas", state: "Texas", stateAbbr: "TX", coordinates: { lat: 32.7767, lng: -96.7970 }, mapPosition: { x: 52, y: 72 }, size: "major", hasDistricts: true, population: "1.3M", description: "Big D. Glass towers and deep culture." },
  { id: "fort-worth", name: "Fort Worth", state: "Texas", stateAbbr: "TX", coordinates: { lat: 32.7555, lng: -97.3308 }, mapPosition: { x: 48, y: 73 }, size: "major", hasDistricts: true, population: "978K", description: "Where the West begins. Real cowboys." },
  { id: "austin", name: "Austin", state: "Texas", stateAbbr: "TX", coordinates: { lat: 30.2672, lng: -97.7431 }, mapPosition: { x: 45, y: 82 }, size: "major", hasDistricts: true, population: "1M", description: "Keep it weird. Live music capital." },
  { id: "houston", name: "Houston", state: "Texas", stateAbbr: "TX", coordinates: { lat: 29.7604, lng: -95.3698 }, mapPosition: { x: 58, y: 88 }, size: "major", hasDistricts: true, population: "2.3M", description: "Space City. Energy capital of the world." },
  { id: "san-antonio", name: "San Antonio", state: "Texas", stateAbbr: "TX", coordinates: { lat: 29.4241, lng: -98.4936 }, mapPosition: { x: 42, y: 90 }, size: "major", hasDistricts: true, population: "1.5M", description: "Remember the Alamo. River Walk awaits." },
  { id: "amarillo", name: "Amarillo", state: "Texas", stateAbbr: "TX", coordinates: { lat: 35.2220, lng: -101.8313 }, mapPosition: { x: 28, y: 56 }, size: "city", hasDistricts: false, population: "200K", description: "Cadillac Ranch. Route 66 legends." },
  { id: "marfa", name: "Marfa", state: "Texas", stateAbbr: "TX", coordinates: { lat: 30.3087, lng: -104.0214 }, mapPosition: { x: 15, y: 85 }, size: "town", hasDistricts: false, population: "2K", description: "Mysterious lights. Art in the desert." },
  { id: "denver", name: "Denver", state: "Colorado", stateAbbr: "CO", coordinates: { lat: 39.7392, lng: -104.9903 }, mapPosition: { x: 25, y: 25 }, size: "major", hasDistricts: true, population: "715K", description: "Mile High City. Gateway to the Rockies." },
  { id: "colorado-springs", name: "Colorado Springs", state: "Colorado", stateAbbr: "CO", coordinates: { lat: 38.8339, lng: -104.8214 }, mapPosition: { x: 26, y: 32 }, size: "city", hasDistricts: false, population: "488K", description: "Garden of the Gods. Olympic City." },
  { id: "boulder", name: "Boulder", state: "Colorado", stateAbbr: "CO", coordinates: { lat: 40.0150, lng: -105.2705 }, mapPosition: { x: 23, y: 22 }, size: "city", hasDistricts: false, population: "108K", description: "Flatirons. Mountain town vibes." },
  { id: "kansas-city", name: "Kansas City", state: "Kansas/Missouri", stateAbbr: "KC", coordinates: { lat: 39.0997, lng: -94.5786 }, mapPosition: { x: 62, y: 28 }, size: "major", hasDistricts: true, population: "508K", description: "BBQ throne. Jazz heritage." },
  { id: "wichita", name: "Wichita", state: "Kansas", stateAbbr: "KS", coordinates: { lat: 37.6872, lng: -97.3301 }, mapPosition: { x: 48, y: 35 }, size: "city", hasDistricts: false, population: "397K", description: "Air capital of the world." },
  { id: "little-rock", name: "Little Rock", state: "Arkansas", stateAbbr: "AR", coordinates: { lat: 34.7465, lng: -92.2896 }, mapPosition: { x: 72, y: 55 }, size: "major", hasDistricts: false, population: "202K", description: "Capital city on the river." },
  { id: "bentonville", name: "Bentonville", state: "Arkansas", stateAbbr: "AR", coordinates: { lat: 36.3729, lng: -94.2088 }, mapPosition: { x: 65, y: 42 }, size: "city", hasDistricts: false, population: "58K", description: "Crystal Bridges. Art in the Ozarks." },
  { id: "hot-springs", name: "Hot Springs", state: "Arkansas", stateAbbr: "AR", coordinates: { lat: 34.5037, lng: -93.0552 }, mapPosition: { x: 68, y: 58 }, size: "city", hasDistricts: false, population: "38K", description: "Healing waters. Gangster history." },
  { id: "st-louis", name: "St. Louis", state: "Missouri", stateAbbr: "MO", coordinates: { lat: 38.6270, lng: -90.1994 }, mapPosition: { x: 78, y: 35 }, size: "major", hasDistricts: true, population: "301K", description: "Gateway to the West. The Arch." },
  { id: "branson", name: "Branson", state: "Missouri", stateAbbr: "MO", coordinates: { lat: 36.6437, lng: -93.2185 }, mapPosition: { x: 68, y: 38 }, size: "town", hasDistricts: false, population: "12K", description: "Entertainment capital of the Ozarks." },
  { id: "santa-fe", name: "Santa Fe", state: "New Mexico", stateAbbr: "NM", coordinates: { lat: 35.6870, lng: -105.9378 }, mapPosition: { x: 12, y: 55 }, size: "city", hasDistricts: false, population: "89K", description: "Ancient adobe. Art capital." },
  { id: "albuquerque", name: "Albuquerque", state: "New Mexico", stateAbbr: "NM", coordinates: { lat: 35.0844, lng: -106.6504 }, mapPosition: { x: 10, y: 60 }, size: "major", hasDistricts: false, population: "564K", description: "Balloon Fiesta. Breaking Bad territory." },
  { id: "roswell", name: "Roswell", state: "New Mexico", stateAbbr: "NM", coordinates: { lat: 33.3943, lng: -104.5230 }, mapPosition: { x: 15, y: 72 }, size: "town", hasDistricts: false, population: "48K", description: "The crash site. Seek the truth." },
];

export const getCityById = (id: string): City | undefined => cities.find(city => city.id === id);
export const getCitiesByState = (state: string): City[] => cities.filter(city => city.state === state || city.stateAbbr === state);
