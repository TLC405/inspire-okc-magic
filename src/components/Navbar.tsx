import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Settings, Clock, MapPin } from "lucide-react";
import { WireTicker } from "./WireTicker";
import { useRef, useEffect, useState } from "react";
import { useWeather } from "@/hooks/useWeather";
import { useLiveClock } from "@/hooks/useLiveClock";

const navLinks = [
  { label: "Singles", href: "/singles", numeral: "I", desk: "Social" },
  { label: "Events", href: "/events", numeral: "II", desk: "Culture" },
  { label: "Date Nights", href: "/date-nights", numeral: "III", desk: "Romance" },
  { label: "Fitness", href: "/fitness", numeral: "IV", desk: "Wellness" },
  { label: "Volunteering", href: "/volunteering", numeral: "V", desk: "Community" },
  { label: "Discover", href: "/discover", numeral: "VI", desk: "Metro" },
];

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

export function Navbar() {
  const location = useLocation();
  const navScrollRef = useRef<HTMLDivElement>(null);
  const weather = useWeather();
  const { timeStr, edition } = useLiveClock();
  const [tickerIdx, setTickerIdx] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Scroll-collapse
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ticker rotation
  useEffect(() => {
    const t = setInterval(() => setTickerIdx(p => (p + 1) % tickerHeadlines.length), 4000);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll active nav link into view on desktop
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
      <div className="h-[4px] bg-foreground" />
      <div className="h-[1px] bg-foreground/30 mt-[2px]" />

      <div className="container">
        {/* ═══ UPPER UTILITY BAR ═══ */}
        <div className="flex items-center justify-between py-1 border-b border-foreground/15">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-foreground font-bold bg-foreground/5 px-1.5 py-0.5 border border-foreground/10">
              City Guide
            </span>
            <span className="hidden sm:inline text-foreground/15 text-[6px]">|</span>
            <span className="hidden sm:inline font-mono text-[7px] md:text-[8px] tracking-[0.12em] uppercase text-muted-foreground">
              Community & Culture
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-muted-foreground">
              Vol. I, No. {issueNo}
            </span>
            <span className="text-foreground/15 text-[6px]">·</span>
            <span className="font-mono text-[8px] tracking-[0.12em] uppercase text-muted-foreground/60">
              Printed in Oklahoma
            </span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            {weather && (
              <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-[0.1em] uppercase text-muted-foreground">
                <span className="text-[10px]">{weather.icon}</span>
                <span className="hidden sm:inline font-semibold">{weather.description}</span>
                <span className="font-bold text-foreground">{weather.temperature}°F</span>
              </span>
            )}
            <span className="text-foreground/15 text-[6px]">|</span>
            <span className="flex items-center gap-1 font-mono text-[8px] md:text-[9px] tracking-[0.1em] text-muted-foreground">
              <Clock size={8} className="text-muted-foreground/50" />
              <span className="font-semibold text-foreground/80">{timeStr}</span>
            </span>
            <span className="text-foreground/15 text-[6px] hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-0.5 font-mono text-[8px] tracking-[0.1em] uppercase text-muted-foreground">
              <MapPin size={7} className="text-muted-foreground/50" />
              OKC
            </span>
            <span className="text-foreground/15 text-[6px] hidden md:inline">|</span>
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={10} />
            </Link>
          </div>
        </div>

        {/* ═══ NAMEPLATE (collapses on scroll) ═══ */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            scrolled ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
          )}
        >
          <div className="h-[3px] bg-foreground mt-1" />
          <div className="h-[1px] bg-foreground/20 mt-[2px]" />

          <div className="py-2 md:py-4 text-center">
            <Link to="/" className="inline-block group">
              <div className="flex items-center justify-center gap-3 mb-0.5">
                <span className="block w-8 md:w-16 h-[1px] bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
                <span className="font-mono text-[6px] md:text-[8px] tracking-[0.35em] uppercase text-muted-foreground">
                  ❧ Est. 2026 ❧
                </span>
                <span className="block w-8 md:w-16 h-[1px] bg-foreground/30 group-hover:bg-foreground/50 transition-colors" />
              </div>
              <h1
                className="font-black tracking-[-0.03em] leading-[0.82] text-foreground group-hover:tracking-[-0.02em] transition-all duration-300"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 7vw, 4.5rem)" }}
              >
                INSPIRE
              </h1>
              <div className="flex items-center justify-center gap-2 mt-0.5">
                <span className="block w-5 md:w-12 h-[1px] bg-foreground/25" />
                <p
                  className="tracking-[0.25em] uppercase text-foreground/60 font-semibold leading-none"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.45rem, 1.5vw, 0.75rem)" }}
                >
                  Oklahoma City
                </p>
                <span className="block w-5 md:w-12 h-[1px] bg-foreground/25" />
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

        {/* ═══ DATE + EDITION BAR ═══ */}
        <div className="flex items-center justify-between py-1 border-b border-foreground/10">
          <span className="font-mono text-[7px] md:text-[8px] tracking-[0.12em] uppercase text-muted-foreground">
            <span className="hidden md:inline">{fullDateStr}</span>
            <span className="md:hidden">{dayName} · {dateStr}</span>
          </span>
          <span
            className="font-mono text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-foreground/50 font-semibold transition-opacity duration-700"
            key={tickerIdx}
            style={{ animation: "fadeInUp 0.6s ease-out" }}
          >
            {tickerHeadlines[tickerIdx]}
          </span>
          <span className="font-mono text-[7px] md:text-[8px] tracking-[0.15em] uppercase text-foreground/60 font-bold">
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
                    "font-mono text-[10px] tracking-[0.15em] uppercase py-1 transition-colors duration-100 relative flex items-center gap-1.5 whitespace-nowrap group",
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
      <div className="h-[3px] bg-foreground" />
      <div className="h-[1px] bg-foreground/15 mt-[1px]" />

      {/* Wire Ticker */}
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
