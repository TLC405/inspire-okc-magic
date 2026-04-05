import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Singles", href: "/singles" },
  { label: "Fitness", href: "/fitness" },
  { label: "Volunteering", href: "/volunteering" },
  { label: "Discover", href: "/discover" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur-sm sticky top-0 z-50" style={{ boxShadow: '0 1px 4px hsl(0 0% 0% / 0.06), 0 4px 12px hsl(0 0% 0% / 0.03)' }}>
      <div className="container flex items-center justify-between py-3 md:py-4">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="font-black text-lg md:text-xl tracking-[-0.03em] text-foreground">INSPIRE</span>
          <span className="dateline text-muted-foreground ml-1 hidden sm:inline">Oklahoma City</span>
        </Link>

        <nav className="flex items-center gap-4 md:gap-6">
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
          <ThemeToggle className="text-muted-foreground hover:text-foreground" />
        </nav>
      </div>
    </header>
  );
}
