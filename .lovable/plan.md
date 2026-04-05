

# INSPIRE Oklahoma City — Showcase Hub + AI-Powered City Intelligence

## Vision

Transform the site from a 3-directory listing app into a **civic showcase platform** that actively promotes Oklahoma City — its architecture, skyline, growth, legislation, sustainability, culture, and momentum. AI fetches, formats, and presents real city data and imagery. The three existing directories (Singles, Fitness, Volunteering) remain but are joined by a rich, visual **Showcase section** on the homepage and a dedicated `/discover` page.

---

## Architecture

### Routes

| Route | Purpose |
|---|---|
| `/` | Homepage — masthead + city showcase cards + 3 directory teasers |
| `/discover` | Full AI-powered Oklahoma City showcase — buildings, laws, eco, culture |
| `/singles` | Unchanged |
| `/fitness` | Unchanged |
| `/volunteering` | Unchanged |

### AI Infrastructure

An edge function (`supabase/functions/city-intel/index.ts`) uses Lovable AI to:
1. Accept a category (architecture, legislation, sustainability, etc.)
2. Generate structured JSON about Oklahoma City using its training data
3. Return formatted content the frontend renders as showcase cards

A second edge function (`supabase/functions/city-photos/index.ts`) uses the **Unsplash API** (free, no key needed for demo-tier) or **Wikimedia Commons API** (fully free) to fetch real Creative Commons photos of Oklahoma City landmarks, buildings, and scenes.

---

## 20 Extraordinary Ideas Per Category

These are NOT generic tourism facts. These are specific, surprising, editorial-grade showcase items the AI will source and format.

### Architecture & Built Environment
1. Devon Energy Tower — tallest building between Chicago and Dallas, 844ft
2. First Americans Museum — land-integrated design by Hornbeck and Butzer
3. Scissortail Park pedestrian bridge — 700ft cantilever over I-40
4. Wheeler District — repurposed airport runway community
5. Oklahoma Contemporary Arts Center — Rand Elliott's folded-steel masterpiece
6. Civic Center Music Hall — 1937 WPA-era Art Deco landmark
7. Gold Star Memorial Bridge — cable-stayed icon on the Oklahoma River
8. Stage Center by John Johansen — Brutalist theater (demolished, documented)
9. The Flatiron Flats — adaptive reuse of 1910 warehouse district
10. Colcord Hotel — 1910 skyscraper, oldest in the city, now boutique hotel
11. Oklahoma City National Memorial — Butzer Design Partnership reflective pools
12. Tower Theatre — 1937 Art Deco cinema restored as music venue
13. SandRidge Energy Commons — downtown corporate campus with public art
14. Automobile Alley streetscape — ASCE award-winning urban redesign
15. First National Center — 1931 Art Deco tower, $300M renovation
16. Oklahoma State Capitol — only capitol with working oil wells on grounds
17. Oklahoma River boathouses — Olympic-grade rowing/kayaking facilities
18. Myriad Botanical Gardens — Crystal Bridge tropical conservatory
19. 21c Museum Hotel — contemporary art museum inside a hotel
20. Skydance Bridge — 380ft land bridge sculpture by Butzer Design

### New Laws & Policy Innovation
1. Oklahoma Promise — tuition waiver for low-income students since 1992
2. Medical marijuana passed 2018 — one of most accessible programs in US
3. Criminal justice reform SB 1470 — reclassified drug possession
4. 2023 Right to Garden Act — legal protection for residential food growing
5. Wind energy tax credits — Oklahoma is #3 in US wind generation
6. MAPS (Metropolitan Area Projects) — voter-approved sales tax for infrastructure since 1993
7. MAPS 4 — $978M package for mental health, parks, transit (2019 vote)
8. Opportunity Zones — 44 designated census tracts downtown
9. 2024 childcare business tax credit — employers get credits for on-site care
10. Aerospace commerce deregulation — launched Oklahoma Space Port
11. Film incentive rebate program — 20-37% for productions
12. Innovation District zoning — mixed-use density code for NE downtown
13. Electric vehicle infrastructure bill — state-funded charging network
14. Cottage food expansion — home bakers can sell up to $75K/year
15. 2023 occupational licensing reform — removed barriers for 30+ trades
16. Veteran entrepreneur tax exemption — first 3 years income-tax-free
17. Data center incentive act — tax breaks for tech infrastructure
18. 2024 housing trust fund — $50M for affordable housing citywide
19. Open carry with training requirement — unique hybrid gun law
20. Municipal broadband authorization — cities can build their own fiber

### Sustainability & Eco Data
1. Oklahoma City ranks #7 in US for solar growth potential (NREL)
2. 42% of state electricity from wind — up from 1% in 2003
3. Devon Energy's LEED Platinum HQ — greenest skyscraper in mid-continent
4. Scissortail Park captures 100% stormwater on-site
5. Oklahoma River water recycling — Class A effluent reuse system
6. Oklahoma City's urban tree canopy: 23% coverage, $1.8B ecosystem value
7. Electric bus fleet expansion — EMBARK transit electrification
8. Low-barrier recycling program — 30% diversion rate, rising
9. Oklahoma wind energy powers 1.8M homes equivalent
10. Community solar gardens — 2024 legislation for shared solar
11. Lake Hefner water treatment — gravity-fed, energy-efficient since 1947
12. Oklahoma City Beautiful — 15,000 trees planted since 2010
13. Wheeler District net-zero homes — passive solar design standard
14. Air quality improvement — 40% reduction in ozone days since 2005
15. Myriad Gardens — zero-pesticide maintenance since 2019
16. Food desert elimination — 12 new grocery stores in underserved areas
17. MAPS 4 bicycle/pedestrian trails — 100+ miles funded
18. Smart water meters — 200K installations saving 15% water usage
19. Oklahoma Climate Survey — oldest state mesonet in the nation
20. Lake Thunderbird watershed restoration — $42M federal investment

### Culture & Hidden Gems
1. Paseo Arts District — 20+ galleries in bungalow row, First Friday walks
2. Factory Obscura — immersive art collective in warehouse, nationally recognized
3. Plaza District — independent shops, live murals, Festival of the Arts
4. Asian District — Pho, dim sum, Vietnamese bakeries on Classen Blvd
5. Tamashii Ramen — 3am late-night ramen in Automobile Alley
6. Riversport Adventures — urban whitewater rafting, zip line, sky trail
7. Oklahoma City Philharmonic — Joel Levine legacy, Civic Center residency
8. Blue Seven — specialty coffee roaster, Midtown institution
9. Elk Valley Brewing — farmhouse ales in a converted auto shop
10. Oklahoma City Thunder — 2024 youngest team to reach conference semis
11. Red Earth Festival — largest Native American cultural festival in US
12. deadCenter Film Festival — Oscar-qualifying, largest in Oklahoma
13. Bleu Garten — outdoor food truck park, local-first vendors
14. Tower Theatre music scene — Phoebe Bridgers, Jason Isbell, Khruangbin
15. Science Museum Oklahoma — Kirkpatrick Planetarium + CurioCity
16. Mule Alley / Stockyards City — working livestock auction since 1910
17. Oklahoma Hall of Fame — Gaylord-Pickens Museum
18. Plenty Mercantile — zero-waste general store in downtown
19. Wheeler Ferris Wheel — relocated carnival wheel, riverfront icon
20. Oklahoma City National Memorial Marathon — 25,000 runners, April tradition

### Growth & Economic Momentum
1. Population grew 15% in 10 years — fastest in the Southern Plains
2. Paycom HQ expansion — $100M campus, 2,000 tech jobs
3. Amazon fulfillment center — 2.5M sqft, 1,500 employees
4. Tinker Air Force Base — $5.6B annual economic impact, largest single-site employer
5. Boeing defense expansion — MQ-25 Stingray drone production
6. Oklahoma City Thunder franchise valued at $2.3B (Forbes 2024)
7. Continental Resources HQ — Harold Hamm's energy empire downtown
8. Innovation District — 500+ tech workers in NE downtown corridor
9. Will Rogers World Airport — $900M terminal modernization
10. Median home price $210K — 60% below national coastal average
11. Cost of living 14% below national average
12. Remote worker migration — top 15 city for WFH relocations (2023)
13. Startups: Tailwind, Clevyr, Chirpify — homegrown tech companies
14. Film industry — $200M+ in productions since incentive program
15. Kramer School of Nursing — $35M health education campus
16. OU Health Sciences Center — $2.4B medical research complex
17. 70+ craft breweries in metro — up from 5 in 2010
18. Midtown Renaissance — $1B in private development since 2015
19. Western Avenue corridor — 2 miles of new restaurants and retail
20. Oklahoma City ranked #3 "Best City to Start a Business" (WalletHub 2024)

---

## Technical Plan

### Phase 1: Static Showcase (This Build)
Hardcode the 100 showcase items above into `src/data/cityShowcase.ts` organized by category. Render them as rich editorial cards on the homepage (below the directory teasers) and on a new `/discover` page with category filtering.

### Phase 2: AI-Powered Content (Next Build)
Create edge function to use Lovable AI to generate and refresh showcase content dynamically. Connect Firecrawl to scrape live sources.

### Phase 3: Photo Integration (Next Build)
Edge function to fetch CC-licensed photos from Wikimedia Commons API for each showcase item. Cache URLs in the data model.

---

## Files

| Action | File | Details |
|---|---|---|
| Create | `src/data/cityShowcase.ts` | 100 items across 5 categories with titles, descriptions, source URLs |
| Create | `src/pages/Discover.tsx` | Full showcase page with category filtering + search |
| Modify | `src/pages/Index.tsx` | Add showcase teaser section below directory columns |
| Modify | `src/App.tsx` | Add `/discover` route |
| Modify | `src/components/Navbar.tsx` | Add "Discover" nav link |

No new dependencies. Static data first, AI and photo scraping in follow-up phase.

