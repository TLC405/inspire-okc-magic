import { useState, useEffect, useCallback } from "react";

interface TickerItem {
  tag: string;
  text: string;
}

const weatherCodeMap: Record<number, string> = {
  0: "CLEAR SKY",
  1: "MOSTLY CLEAR",
  2: "PARTLY CLOUDY",
  3: "OVERCAST",
  45: "FOGGY",
  48: "RIME FOG",
  51: "LIGHT DRIZZLE",
  53: "DRIZZLE",
  55: "HEAVY DRIZZLE",
  61: "LIGHT RAIN",
  63: "RAIN",
  65: "HEAVY RAIN",
  71: "LIGHT SNOW",
  73: "SNOW",
  75: "HEAVY SNOW",
  80: "LIGHT SHOWERS",
  81: "SHOWERS",
  82: "HEAVY SHOWERS",
  95: "THUNDERSTORM",
  96: "THUNDERSTORM W/ HAIL",
  99: "SEVERE THUNDERSTORM",
};

const curatedItems: TickerItem[] = [
  { tag: "OKC", text: "FOUNDED APRIL 22, 1889 — THE LAND RUN" },
  { tag: "OKC", text: "DEVON ENERGY CENTER — 844 FT — TALLEST IN OK" },
  { tag: "OKC", text: "SCISSORTAIL PARK — 70 ACRES DOWNTOWN" },
  { tag: "THUNDER", text: "PAYCOM CENTER — HOME OF THE THUNDER" },
  { tag: "OKC", text: "PASEO ARTS DISTRICT — EST. 1929" },
  { tag: "OKC", text: "BRICKTOWN CANAL — 1 MILE LOOP" },
  { tag: "OKC", text: "OKC NATIONAL MEMORIAL — APRIL 19, 1995" },
  { tag: "OKC", text: "BOATHOUSE DISTRICT — OLYMPIC TRAINING SITE" },
  { tag: "OKC", text: "FACTORY OBSCURA — IMMERSIVE ART" },
  { tag: "OKC", text: "WHEELER DISTRICT — NEW URBANISM" },
  { tag: "MAYOR", text: "MAYOR DAVID HOLT — SINCE 2018" },
  { tag: "THUNDER", text: "OKC THUNDER — EST. 2008 — NBA WESTERN CONF" },
  { tag: "OKC", text: "POPULATION 700K+ — METRO 1.4M" },
  { tag: "OKC", text: "THE BIG FRIENDLY — 405 AREA CODE" },
  { tag: "OKC", text: "MIDTOWN · BRICKTOWN · PASEO · PLAZA DISTRICT" },
  { tag: "THUNDER", text: "SGA · CHET · JDUB — THUNDER UP" },
  { tag: "OKC", text: "AUTOMOBILE ALLEY — HISTORIC DISTRICT" },
  { tag: "OKC", text: "FILM ROW — ARTS & CULTURE HUB" },
];

function getTimeItem(): TickerItem {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
    hour12: true,
  }).toUpperCase();
  return { tag: "LIVE", text: `${timeStr} CST — OKLAHOMA CITY` };
}

export function LiveTicker() {
  const [weatherItem, setWeatherItem] = useState<TickerItem | null>(null);
  const [timeItem, setTimeItem] = useState<TickerItem>(getTimeItem());

  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=35.4676&longitude=-97.5164&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago"
      );
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code as number;
      const condition = weatherCodeMap[code] || "MIXED CONDITIONS";
      setWeatherItem({ tag: "WEATHER", text: `${temp}°F ${condition} — OKC NOW` });
    } catch {
      setWeatherItem({ tag: "WEATHER", text: "OKC WEATHER — CHECK LOCAL" });
    }
  }, []);

  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 10 * 60 * 1000);
    const timeInterval = setInterval(() => setTimeItem(getTimeItem()), 30000);
    return () => {
      clearInterval(weatherInterval);
      clearInterval(timeInterval);
    };
  }, [fetchWeather]);

  const allItems: TickerItem[] = [
    timeItem,
    ...(weatherItem ? [weatherItem] : []),
    ...curatedItems,
  ];

  // Double items for seamless loop
  const doubled = [...allItems, ...allItems];

  return (
    <div className="overflow-hidden border-y border-white/10 py-3">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap mx-5 inline-flex items-center gap-2">
            <span className="ticker-tag">[{item.tag}]</span>
            <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-white/40">
              {item.text}
            </span>
            <span className="text-accent mx-2 text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
