import { useState, useEffect } from "react";

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

interface ForecastDay {
  tempMax: number;
  tempMin: number;
  description: string;
  icon: string;
}

export interface WeatherResult {
  current: WeatherData;
  forecast: ForecastDay[];
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

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function useWeather(): WeatherResult | null {
  const [weather, setWeather] = useState<WeatherResult | null>(null);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=35.4676&longitude=-97.5164&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&temperature_unit=fahrenheit&timezone=America/Chicago&forecast_days=3")
      .then(r => r.json())
      .then(data => {
        const code = data.current?.weather_code ?? 0;
        const mapped = weatherCodeMap[code] || { desc: "Fair", icon: "☀️" };
        
        const forecast: ForecastDay[] = (data.daily?.time || []).slice(0, 3).map((_, i: number) => {
          const fc = data.daily.weather_code?.[i] ?? 0;
          const fm = weatherCodeMap[fc] || { desc: "Fair", icon: "☀️" };
          return {
            tempMax: Math.round(data.daily.temperature_2m_max?.[i] ?? 72),
            tempMin: Math.round(data.daily.temperature_2m_min?.[i] ?? 55),
            description: fm.desc,
            icon: fm.icon,
          };
        });

        setWeather({
          current: {
            temperature: Math.round(data.current?.temperature_2m ?? 72),
            description: mapped.desc,
            icon: mapped.icon,
          },
          forecast,
        });
      })
      .catch(() => {
        setWeather({
          current: { temperature: 72, description: "Fair", icon: "☀️" },
          forecast: [],
        });
      });
  }, []);

  return weather;
}
