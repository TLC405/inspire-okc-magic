import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Story", href: "/story" },
  { label: "Programs", href: "/community" },
  { label: "Info", href: "/info" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === "/";
  const isHeroPage = location.pathname === "/community";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Homepage has its own header built into HeroSection
  if (isHomepage) return null;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-background border-b-2 border-border"
            : "bg-transparent"
        )}
      >
        <nav className="container flex items-center justify-between h-18 md:h-22">
          <Link to="/" className="relative z-10">
            <span className={cn(
              "text-xl md:text-2xl font-black tracking-[-0.02em]",
              !scrolled && isHeroPage ? "text-white" : "text-foreground"
            )}>
              INSPIRE
            </span>
            <span className="label-caps text-accent ml-2">OKC</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "label-caps py-2 transition-colors duration-150 relative",
                  location.pathname === link.href
                    ? (!scrolled && isHeroPage ? "text-white" : "text-foreground")
                    : (!scrolled && isHeroPage ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground")
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </Link>
            ))}
            <ThemeToggle className={cn(
              !scrolled && isHeroPage ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"
            )} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle className={cn(
              !scrolled && isHeroPage && !isOpen ? "text-white" : "text-foreground"
            )} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "relative z-10 p-2",
                !scrolled && isHeroPage && !isOpen ? "text-white" : "text-foreground"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-background md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "text-2xl font-bold transition-colors relative",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {location.pathname === link.href && (
                    <span className="absolute -left-4 top-0 bottom-0 w-1 bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
