import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Story", href: "/story" },
  { label: "Community", href: "/community" },
  { label: "Apply", href: "/apply" },
  { label: "Info", href: "/info" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHeroPage = location.pathname === "/" || location.pathname === "/community";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-background border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="container flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="relative z-10">
            <span className={cn(
              "text-xl md:text-2xl font-bold tracking-tight",
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
                  "text-[11px] uppercase tracking-[0.12em] font-semibold py-1 transition-colors duration-200",
                  location.pathname === link.href
                    ? (!scrolled && isHeroPage ? "text-white" : "text-foreground")
                    : (!scrolled && isHeroPage ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground")
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden relative z-10 p-2",
              !scrolled && isHeroPage && !isOpen ? "text-white" : "text-foreground"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
                    "text-2xl font-semibold transition-colors",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
