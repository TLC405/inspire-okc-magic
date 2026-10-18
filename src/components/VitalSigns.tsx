import { useEffect, useState } from "react";

interface Alert { event: string; headline: string }

function edition(d: Date) {
  const h = Number(d.toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "America/Chicago" }));
  if (h >= 5 && h < 11) return "Morning Edition";
  if (h >= 11 && h < 17) return "Midday Edition";
  return "Night Final";
}

function aqiLabel(v: number) {
  if (v <= 50) return "Good";
  if (v <= 100) return "Moderate";
  if (v <= 150) return "Sensitive";
  return "Unhealthy";
}

async function timed(url: string, ms = 10000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try { return await (await fetch(url, { signal: ctrl.signal })).json(); } finally { clearTimeout(t); }
}

/** City Vital Signs strip: live NWS alerts for Oklahoma County, air quality, and edition. */
export function VitalSigns() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [aqi, setAqi] = useState<number | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const load = async () => {
      try {
        const j = await timed("https://api.weather.gov/alerts/active?zone=OKC109");
        setAlerts((j?.features ?? []).map((f: any) => ({ event: f.properties.event, headline: f.properties.headline })));
      } catch { /* keep last */ }
      try {
        const j = await timed("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=35.4676&longitude=-97.5164&current=us_aqi");
        if (typeof j?.current?.us_aqi === "number") setAqi(j.current.us_aqi);
      } catch { /* keep last */ }
    };
    load();
    const a = setInterval(load, 300000);
    const c = setInterval(() => setNow(new Date()), 60000);
    return () => { clearInterval(a); clearInterval(c); };
  }, []);

  return (
    <div className="border-b border-foreground/15 bg-background">
      {alerts.length > 0 && (
        <div className="bg-destructive text-destructive-foreground px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-center">
          NWS Bulletin: {alerts[0].event}{alerts.length > 1 ? ` (+${alerts.length - 1} more)` : ""}
        </div>
      )}
      <div className="container mx-auto px-4 py-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        <span className="font-bold text-foreground">{edition(now)}</span>
        <span>·</span>
        <span>Air Quality: {aqi === null ? "--" : `${aqi} (${aqiLabel(aqi)})`}</span>
        <span>·</span>
        <span>NWS Alerts: {alerts.length === 0 ? "None Active" : alerts.length}</span>
      </div>
    </div>
  );
}
