import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { useRef, useEffect } from "react";

const navLinks = [
  { label: "Singles", href: "/singles", numeral: "I" },
  { label: "Events", href: "/events", numeral: "II" },
  { label: "Date Nights", href: "/date-nights", numeral: "III" },
  { label: "Fitness", href: "/fitness", numeral: "IV" },
  { label: "Volunteering", href: "/volunteering", numeral: "V" },
  { label: "Discover", href: "/discover", numeral: "VI" },
];

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayName = dayNames[today.getDay()];
const issueNo = Math.floor((today.getTime() - new Date("2026-01-01").getTime()) / 86400000) + 1;
const hour = today.getHours();
const edition = hour < 12 ? "Morning Edition" : hour < 17 ? "Afternoon Edition" : "Final Edition";

export function Navbar() {
  const location = useLocation();
  const navScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active nav link into view on mobile
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
      <div className="h-[3px] bg-foreground" />
      <div className="h-[1px] bg-foreground/30 mt-[2px]" />

      <div className="container">
        {/* Upper utility row */}
        <div className="flex items-center justify-between py-1.5 border-b border-foreground/15">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
              Vol. I · No. {issueNo}
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60">
              ✦
            </span>
            <span className="hidden sm:inline font-mono text-[9px] tracking-[0.12em] uppercase text-muted-foreground/70">
              Fair · 72°F
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-foreground/70 font-semibold hidden sm:inline">
            {edition}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground hidden md:inline">
              {dayName} · {dateStr}
            </span>
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={11} />
            </Link>
          </div>
        </div>

        {/* Double rule above nameplate */}
        <div className="h-[2px] bg-foreground mt-1" />
        <div className="h-[1px] bg-foreground/20 mt-[2px]" />

        {/* Nameplate */}
        <div className="py-3 md:py-4 text-center">
          <Link to="/" className="inline-block">
            {/* Corner ornament + Est. line */}
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="block w-10 md:w-16 h-[1px] bg-foreground/30" />
              <span className="font-mono text-[7px] md:text-[8px] tracking-[0.35em] uppercase text-muted-foreground">
                ❧ Est. 2026 ❧
              </span>
              <span className="block w-10 md:w-16 h-[1px] bg-foreground/30" />
            </div>

            {/* Main title */}
            <h1
              className="font-black tracking-[-0.03em] leading-[0.85] text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 7vw, 4.5rem)" }}
            >
              INSPIRE
            </h1>

            {/* Subtitle */}
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="block w-6 md:w-12 h-[1px] bg-foreground/25" />
              <p
                className="tracking-[0.25em] uppercase text-foreground/60 font-semibold leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.5rem, 1.5vw, 0.75rem)" }}
              >
                Oklahoma City
              </p>
              <span className="block w-6 md:w-12 h-[1px] bg-foreground/25" />
            </div>

            {/* Motto */}
            <p
              className="mt-1 text-muted-foreground/60 italic"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.5rem, 1.2vw, 0.65rem)", letterSpacing: "0.05em" }}
            >
              "All the City's News That Inspires"
            </p>
          </Link>
        </div>

        {/* Double rule below nameplate */}
        <div className="h-[2px] bg-foreground" />
        <div className="h-[1px] bg-foreground/20 mt-[2px]" />

        {/* Navigation row — horizontal scroll on mobile */}
        <div
          ref={navScrollRef}
          className="flex items-center md:justify-center py-2 overflow-x-auto scrollbar-hide"
        >
          <nav className="flex items-center gap-3 md:gap-5 px-1">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-3 md:gap-5 flex-shrink-0">
                {i > 0 && <span className="text-foreground/15 text-[8px] hidden sm:inline">✦</span>}
                <Link
                  to={link.href}
                  data-active={location.pathname === link.href}
                  className={cn(
                    "font-mono text-[9px] md:text-[10px] tracking-[0.15em] uppercase py-1 transition-colors duration-100 relative flex items-center gap-1.5 whitespace-nowrap",
                    location.pathname === link.href
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className="text-[7px] md:text-[8px] text-muted-foreground/40 font-normal">{link.numeral}</span>
                  {link.label}
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
      <div className="h-[2px] bg-foreground" />
      <div className="h-[1px] bg-foreground/15 mt-[1px]" />
    </header>
  );
}
