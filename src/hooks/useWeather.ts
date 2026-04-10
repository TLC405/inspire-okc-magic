import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

const weatherCodeMap: Record<number, { desc: string; icon: string }> = {
  0: { desc: "Clear", icon: "☀️" },
  1: { desc: "Mostly Clear", icon: "🌤️" },
  2: { desc: "Partly Cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Foggy", icon: "🌫️" },
  48: { desc: "Rime Fog", icon: "🌫️" },
  51: { desc: "Light Drizzle", icon: "🌦️" },
  53: { desc: "Drizzle", icon: "🌦️" },
  55: { desc: "Heavy Drizzle", icon: "🌧️" },
  61: { desc: "Light Rain", icon: "🌧️" },
  63: { desc: "Rain", icon: "🌧️" },
  65: { desc: "Heavy Rain", icon: "🌧️" },
  71: { desc: "Light Snow", icon: "🌨️" },
  73: { desc: "Snow", icon: "❄️" },
  75: { desc: "Heavy Snow", icon: "❄️" },
  80: { desc: "Showers", icon: "🌦️" },
  81: { desc: "Moderate Showers", icon: "🌧️" },
  82: { desc: "Violent Showers", icon: "⛈️" },
  95: { desc: "Thunderstorm", icon: "⛈️" },
  96: { desc: "Hail Storm", icon: "⛈️" },
  99: { desc: "Severe Hail", icon: "⛈️" },
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // OKC coordinates: 35.4676, -97.5164
    fetch("https://api.open-meteo.com/v1/forecast?latitude=35.4676&longitude=-97.5164&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago")
      .then(r => r.json())
      .then(data => {
        const code = data.current?.weather_code ?? 0;
        const mapped = weatherCodeMap[code] || { desc: "Fair", icon: "☀️" };
        setWeather({
          temperature: Math.round(data.current?.temperature_2m ?? 72),
          description: mapped.desc,
          icon: mapped.icon,
        });
      })
      .catch(() => {
        setWeather({ temperature: 72, description: "Fair", icon: "☀️" });
      });
  }, []);

  return weather;
}
