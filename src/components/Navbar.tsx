import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Settings, Clock, MapPin, Zap, Star, Heart, Github } from "lucide-react";
import { ThunderPlayoffTeaser } from "./ThunderPlayoffBracket";
import { WireTicker } from "./WireTicker";
import { useRef, useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import { useLiveClock } from "@/hooks/useLiveClock";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Singles", href: "/singles", numeral: "I", desk: "Social" },
  { label: "Events", href: "/events", numeral: "II", desk: "Culture" },
  { label: "Date Nights", href: "/date-nights", numeral: "III", desk: "Romance" },
  { label: "Fitness", href: "/fitness", numeral: "IV", desk: "Wellness" },
  { label: "Volunteering", href: "/volunteering", numeral: "V", desk: "Community" },
  { label: "Discover", href: "/discover", numeral: "VI", desk: "Metro" },
];

const sectionMap: Record<string, { section: string; desk: string }> = {
  "/singles": { section: "B", desk: "The Singles Beat" },
  "/events": { section: "E", desk: "The Events Desk" },
  "/date-nights": { section: "F", desk: "The Social Scene" },
  "/fitness": { section: "C", desk: "The Lifestyle Report" },
  "/volunteering": { section: "D", desk: "The Civic Report" },
  "/discover": { section: "VI", desk: "The Metro" },
};

const todayFocus = (() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning Pick: Yoga & Coffee Runs";
  if (hour < 17) return "Afternoon: Volunteer Slots Open Now";
  return "Tonight: Live Events & Date Nights";
})();

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fullMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const fullDateStr = `${dayNames[today.getDay()]}, ${fullMonths[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayName = dayNames[today.getDay()];
const issueNo = Math.floor((today.getTime() - new Date("2026-01-01").getTime()) / 86400000) + 1;

const tickerHeadlines = [
  "YOUR GUIDE TO OKLAHOMA CITY",
  "COMMUNITY · CULTURE · CONNECTION",
  "ALL THE CITY'S NEWS THAT INSPIRES",
  `${dayName.toUpperCase()} IN OKLAHOMA CITY`,
  "DISCOVER WHAT'S HAPPENING TODAY",
];

const forecastDayLabels = (() => {
  const d = new Date();
  return [0, 1, 2].map(i => {
    const nd = new Date(d);
    nd.setDate(d.getDate() + i);
    return i === 0 ? "Today" : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][nd.getDay()];
  });
})();

export function Navbar() {
  const location = useLocation();
  const navScrollRef = useRef<HTMLDivElement>(null);
  const weather = useWeather();
  const { timeStr, edition } = useLiveClock();
  const [tickerIdx, setTickerIdx] = useState(0);
  const { theme: rawTheme, resolvedTheme } = useTheme();
  const theme = rawTheme || resolvedTheme;
  const isTeamTheme = theme === "thunder" || theme === "comets" || theme === "tlc";
  const [scrolled, setScrolled] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);

  const currentSection = sectionMap[location.pathname];

  useEffect(() => {
    let raf = 0;
    let lastScrolled = false;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const nowScrolled = window.scrollY > 80;
        if (nowScrolled !== lastScrolled) {
          lastScrolled = nowScrolled;
          setScrolled(nowScrolled);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTickerIdx(p => (p + 1) % tickerHeadlines.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (navScrollRef.current) {
      const active = navScrollRef.current.querySelector('[data-active="true"]');
      if (active) {
        active.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [location.pathname]);

  return (
    <header className="bg-background sticky top-0 z-50">
      {/* Top thick rule */}
      <div className={cn(
        "h-[4px]",
        theme === "thunder" ? "bg-[hsl(200,100%,45%)]" :
        theme === "comets" ? "bg-[hsl(270,55%,55%)]" :
        theme === "tlc" ? "bg-[hsl(340,35%,50%)]" :
        "bg-foreground"
      )} />
      <div className={cn(
        "h-[1px] mt-[2px]",
        theme === "thunder" ? "bg-[hsl(8,87%,54%,0.5)]" :
        theme === "comets" ? "bg-[hsl(168,100%,39%,0.5)]" :
        theme === "tlc" ? "bg-[hsl(340,35%,50%,0.3)]" :
        "bg-foreground/30"
      )} />

      <div className="container">
        {/* ═══ UPPER UTILITY BAR ═══ */}
        <div className="flex items-center justify-between py-1 border-b border-foreground/15">
          <div className="flex items-center gap-2">
            {theme === "thunder" && (
              <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 border bg-[hsl(200,100%,45%,0.15)] border-[hsl(200,100%,45%,0.3)] text-[hsl(200,100%,65%)]">
                <Zap size={8} className="text-[hsl(8,87%,54%)]" />
                Thunder
              </span>
            )}
            {theme === "comets" && (
              <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 border bg-[hsl(270,55%,55%,0.15)] border-[hsl(270,55%,55%,0.3)] text-[hsl(270,55%,75%)]">
                <Star size={8} className="text-[hsl(48,100%,50%)]" />
                Comets
              </span>
            )}
            {theme === "tlc" && (
              <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-widest uppercase font-extrabold px-1.5 py-0.5 border bg-[hsl(340,35%,50%,0.1)] border-[hsl(340,35%,50%,0.25)] text-[hsl(340,35%,45%)]" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                <Heart size={8} className="text-[hsl(340,55%,55%)]" />
                TLC
              </span>
            )}
            {!isTeamTheme && (
              <span className="font-mono text-[8px] md:text-[9px] tracking-widest uppercase text-foreground font-bold bg-foreground/5 px-1.5 py-0.5 border border-foreground/10">
                City Guide
              </span>
            )}
            <span className="hidden sm:inline text-foreground/15 text-[6px]">|</span>
            <span className="hidden sm:inline font-mono text-[7px] md:text-[8px] tracking-wider uppercase text-muted-foreground">
              {theme === "thunder" ? "Thunder Up · OKC" : theme === "comets" ? "OKC Comets · NWSL" : theme === "tlc" ? "Tender Love & Care · OKC" : "Community & Culture"}
            </span>
            {/* Per-page section label */}
            {currentSection && (
              <>
                <span className="hidden md:inline text-foreground/15 text-[6px]">|</span>
                <span className="hidden md:inline font-mono text-[7px] tracking-wider uppercase text-accent font-bold">
                  §{currentSection.section} {currentSection.desk}
                </span>
              </>
            )}
            {/* Thunder playoff teaser */}
            {theme === "thunder" && (
              <>
                <span className="hidden sm:inline text-foreground/15 text-[6px]">|</span>
                <ThunderPlayoffTeaser />
              </>
            )}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-widest uppercase text-muted-foreground">
              Vol. I, No. {issueNo}
            </span>
            <span className="text-foreground/15 text-[6px]">·</span>
            <span className="font-mono text-[8px] tracking-wider uppercase text-muted-foreground/60">
              Printed in Oklahoma
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {weather && (
              <button
                onClick={() => setWeatherOpen(!weatherOpen)}
                className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <span className="text-[10px]">{weather.current.icon}</span>
                <span className="hidden sm:inline font-semibold">{weather.current.description}</span>
                <span className="font-bold text-foreground">{weather.current.temperature}°F</span>
              </button>
            )}
            <span className="text-foreground/15 text-[6px]">|</span>
            <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-wider text-muted-foreground">
              <Clock size={8} className="text-muted-foreground/50" />
              <span className="font-semibold text-foreground/80">{timeStr}</span>
            </span>
            <span className="text-foreground/15 text-[6px] hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-0.5 font-mono text-[8px] tracking-wider uppercase text-muted-foreground">
              <MapPin size={7} className="text-muted-foreground/50" />
              OKC
            </span>
            <span className="text-foreground/15 text-[6px] hidden md:inline">|</span>
            <Link to="/momento-mori" className="text-muted-foreground hover:text-foreground transition-colors" title="Momento Mori">
              <Github size={10} />
            </Link>
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={10} />
            </Link>
          </div>
        </div>

        {/* ═══ WEATHER FORECAST DROPDOWN ═══ */}
        {weatherOpen && weather && weather.forecast.length > 0 && (
          <div className="border-b border-foreground/10 py-2 animate-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-center gap-6">
              {weather.forecast.map((day, i) => (
                <div key={i} className="flex items-center gap-2 font-mono text-[9px]">
                  <span className="text-muted-foreground/60 uppercase tracking-wider font-bold w-10">{forecastDayLabels[i]}</span>
                  <span className="text-sm">{day.icon}</span>
                  <span className="text-foreground font-bold tabular-nums">{day.tempMax}°</span>
                  <span className="text-muted-foreground/50 tabular-nums">{day.tempMin}°</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ NAMEPLATE (collapses on scroll) ═══ */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-in-out will-change-[grid-template-rows]",
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          )}
        >
          <div className="overflow-hidden">
          <div className="h-[3px] bg-foreground mt-1" />
          <div className="h-[1px] bg-foreground/20 mt-[2px]" />

          <div className="py-4 md:py-8 text-center">
            <Link to="/" className="inline-block group">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="block w-12 md:w-24 h-[1px] bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
                <span className="font-mono text-[6px] md:text-[8px] tracking-[0.35em] uppercase text-muted-foreground">
                  ❧ Est. 2026 ❧
                </span>
                <span className="block w-12 md:w-24 h-[1px] bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
              </div>
              <h1
                className="font-black tracking-[-0.03em] leading-[0.82] text-foreground"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 9vw, 6rem)" }}
              >
                INSPIRE
              </h1>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="block w-8 md:w-16 h-[1px] bg-foreground/25" />
                <p
                  className="tracking-[0.25em] uppercase text-foreground/60 font-semibold leading-none"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.45rem, 1.5vw, 0.75rem)" }}
                >
                  Oklahoma City
                </p>
                <span className="block w-8 md:w-16 h-[1px] bg-foreground/25" />
              </div>
              <p
                className="mt-0.5 text-muted-foreground/50 italic"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.45rem, 1.1vw, 0.6rem)", letterSpacing: "0.05em" }}
              >
                "All the City's News That Inspires"
              </p>
            </Link>
          </div>

          <div className="h-[3px] bg-foreground" />
          <div className="h-[1px] bg-foreground/20 mt-[2px]" />
          </div>
        </div>

        {/* ═══ DATE + EDITION + TODAY'S FOCUS BAR ═══ */}
        <div className="flex items-center justify-between py-1 border-b border-foreground/10">
          <span className="font-mono text-[7px] md:text-[8px] tracking-wider uppercase text-muted-foreground">
            <span className="hidden md:inline">{fullDateStr}</span>
            <span className="md:hidden">{dayName} · {dateStr}</span>
          </span>
          <span
            className="font-mono text-[7px] md:text-[8px] tracking-widest uppercase text-foreground/50 font-semibold transition-opacity duration-700 hidden md:inline"
            key={tickerIdx}
            style={{ animation: "fadeInUp 0.6s ease-out" }}
          >
            {tickerHeadlines[tickerIdx]}
          </span>
          <span className="font-mono text-[7px] md:text-[8px] tracking-wider uppercase text-accent/70 font-semibold md:hidden">
            {todayFocus.split(":")[0]}
          </span>
          <span className="font-mono text-[7px] md:text-[8px] tracking-widest uppercase text-foreground/60 font-bold">
            {edition}
          </span>
        </div>

        {/* ═══ Desktop nav ═══ */}
        <div
          ref={navScrollRef}
          className="hidden md:flex items-center justify-center py-2"
        >
          <nav className="flex items-center gap-5">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-5 flex-shrink-0">
                {i > 0 && <span className="text-foreground/15 text-[8px]">✦</span>}
                <Link
                  to={link.href}
                  data-active={location.pathname === link.href}
                  className={cn(
                    "font-mono text-[10px] tracking-widest uppercase py-1 transition-colors duration-100 relative flex items-center gap-1.5 whitespace-nowrap group",
                    location.pathname === link.href
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-[8px] text-muted-foreground/40 font-normal">{link.numeral}</span>
                  {link.label}
                  <span className="text-[6px] text-muted-foreground/30 font-normal hidden lg:inline">({link.desk})</span>
                  {location.pathname === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
                  )}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom thick + thin rule */}
      <div className={cn(
        "h-[3px]",
        theme === "thunder" ? "bg-[hsl(200,100%,45%)]" :
        theme === "comets" ? "bg-[hsl(270,55%,55%)]" :
        theme === "tlc" ? "bg-[hsl(340,35%,50%)]" :
        "bg-foreground"
      )} />
      <div className={cn(
        "h-[1px] mt-[1px]",
        theme === "thunder" ? "bg-[hsl(8,87%,54%,0.4)]" :
        theme === "comets" ? "bg-[hsl(168,100%,39%,0.4)]" :
        theme === "tlc" ? "bg-[hsl(340,35%,50%,0.25)]" :
        "bg-foreground/15"
      )} />

      <WireTicker />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
}
