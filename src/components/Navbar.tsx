import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";

const navLinks = [
  { label: "Singles", href: "/singles" },
  { label: "Events", href: "/events" },
  { label: "Fitness", href: "/fitness" },
  { label: "Volunteering", href: "/volunteering" },
  { label: "Discover", href: "/discover" },
];

const today = new Date();
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
const dayName = dayNames[today.getDay()];
const issueNo = Math.floor((today.getTime() - new Date("2026-01-01").getTime()) / 86400000) + 1;

export function Navbar() {
  const location = useLocation();

  return (
    <header className="bg-background sticky top-0 z-50 border-b-[3px] border-double border-foreground">
      {/* Top thin rule */}
      <div className="h-[2px] bg-foreground" />

      {/* Masthead block */}
      <div className="container">
        {/* Upper utility row */}
        <div className="flex items-center justify-between py-1 border-b border-foreground/20">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
            Vol. I · No. {issueNo}
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground hidden sm:inline">
            {dayName} · {dateStr}
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
              <Settings size={12} />
            </Link>
          </div>
        </div>

        {/* Nameplate */}
        <div className="py-3 md:py-4 text-center border-b-[2px] border-foreground">
          <Link to="/" className="inline-block">
            {/* Decorative flourish */}
            <div className="flex items-center justify-center gap-3 mb-1">
              <span className="block w-12 md:w-20 h-[1px] bg-foreground/40" />
              <span className="font-mono text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                ✦ Est. 2026 ✦
              </span>
              <span className="block w-12 md:w-20 h-[1px] bg-foreground/40" />
            </div>
            <h1
              className="font-black tracking-[-0.03em] leading-[0.85] text-foreground"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              INSPIRE
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="block w-8 md:w-14 h-[1px] bg-foreground/30" />
              <p
                className="tracking-[0.25em] uppercase text-foreground/60 font-semibold leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.55rem, 1.5vw, 0.8rem)" }}
              >
                Oklahoma City
              </p>
              <span className="block w-8 md:w-14 h-[1px] bg-foreground/30" />
            </div>
          </Link>
        </div>

        {/* Navigation row */}
        <div className="flex items-center justify-center py-2">
          <nav className="flex items-center gap-4 md:gap-6">
            {navLinks.map((link, i) => (
              <span key={link.href} className="flex items-center gap-4 md:gap-6">
                {i > 0 && <span className="text-foreground/20 text-xs hidden sm:inline">·</span>}
                <Link
                  to={link.href}
                  className={cn(
                    "font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase py-1 transition-colors duration-100 relative",
                    location.pathname === link.href
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
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
    </header>
  );
}
