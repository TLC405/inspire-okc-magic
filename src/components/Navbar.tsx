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
    <header className="bg-background sticky top-0 z-50">
      {/* Top rule */}
      <div className="rule-heavy" />

      {/* Edition row */}
      <div className="container flex items-center justify-between py-1.5">
        <span className="mono-data text-muted-foreground">
          Vol. I · No. {issueNo}
        </span>
        <span className="mono-data text-muted-foreground hidden sm:inline">
          ✦ Your City · Your Signal ✦
        </span>
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-muted-foreground hover:text-foreground" />
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <Settings size={13} />
          </Link>
        </div>
      </div>

      {/* Thin rule */}
      <div className="rule-thin" />

      {/* Masthead */}
      <div className="container py-2 md:py-3 text-center">
        <Link to="/" className="inline-block">
          <h1
            className="font-black tracking-[-0.04em] leading-none text-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
          >
            INSPIRE
          </h1>
          <p
            className="tracking-[0.12em] uppercase text-foreground/70 font-semibold leading-none mt-0.5"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(0.65rem, 1.8vw, 0.95rem)" }}
          >
            Oklahoma City
          </p>
        </Link>
      </div>

      {/* Double rule */}
      <div className="rule-double mx-auto" style={{ width: "100%" }} />

      {/* Nav row */}
      <div className="container flex items-center justify-between py-2">
        <span className="mono-data text-muted-foreground hidden md:inline">
          {dayName} · {dateStr}
        </span>

        <nav className="flex items-center gap-3 md:gap-5 mx-auto md:mx-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "label-caps py-1 transition-colors duration-100 relative",
                location.pathname === link.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
              {location.pathname === link.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom rule */}
      <div className="rule-heavy" />
    </header>
  );
}
