import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoReveal } from "./LogoReveal";
import { LiveTicker } from "./LiveTicker";
import { SearchSurface } from "@/components/SearchSurface";
import { SignalChip } from "@/components/SignalChip";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";

const directories = [
  { num: "01", name: "Singles Events", desc: "17 events live", href: "/singles" },
  { num: "02", name: "Fitness", desc: "12 spots mapped", href: "/workouts" },
  { num: "03", name: "Volunteering", desc: "10 organizations", href: "/volunteering" },
  { num: "04", name: "Coach TLC", desc: "3 tracks active", href: "/coaching" },
  { num: "05", name: "Men-Talk", desc: "Code required", href: "/men-talk" },
];

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Events", href: "/events" },
  { label: "Stories", href: "/stories" },
  { label: "Ask", href: "/ask" },
  { label: "Info", href: "/info" },
];

const neighborhoods = ["Midtown", "Bricktown", "Paseo Arts", "Plaza District", "Deep Deuce", "Automobile Alley", "Film Row", "Uptown 23rd"];

export function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-y-auto flex flex-col">
      {/* Background */}
      <img
        src={heroBg}
        alt="Oklahoma City skyline"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ position: "fixed" }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080D]/95 via-[#06080D]/75 to-[#06080D]/60" />
      <div className="vignette" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
      >
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="label-caps text-white/30 hover:text-white transition-colors py-1">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex-1" />
        <div className="flex items-center gap-3">
          <ThemeToggle className="text-white/30 hover:text-white" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/40 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-[#06080D]/98 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)} className="text-2xl font-bold text-white/50 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-5xl">
        {/* Logo reveal */}
        <div className="mb-8">
          <LogoReveal />
        </div>

        {/* Search surface — dominant element */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mb-8 max-w-2xl"
        >
          <SearchSurface variant="hero" />
        </motion.div>

        {/* City pulse ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <SignalChip label="Live" variant="live" pulse />
            <span className="mono-data text-white/20">City Pulse · Oklahoma City</span>
          </div>
          <LiveTicker />
        </motion.div>

        {/* Directory grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="mono-data text-white/20">Directories</span>
            <div className="h-px flex-1 bg-white/8" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-3 mb-8">
            {directories.map((d) => (
              <Link key={d.num} to={d.href} className="group block py-2">
                <span className="mono-data text-signal-secondary">({d.num})</span>
                <p className="text-white text-sm font-bold tracking-tight leading-tight group-hover:text-accent transition-colors duration-150">
                  {d.name}
                </p>
                <p className="text-white/20 text-xs group-hover:text-white/40 transition-colors">{d.desc}</p>
                <div className="h-px w-0 bg-accent group-hover:w-full transition-all duration-300 mt-1.5" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Neighborhoods teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2">
            {neighborhoods.map((n) => (
              <span key={n} className="mono-data text-white/15 hover:text-accent/60 transition-colors cursor-default">{n}</span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <Link
            to="/explore"
            className="inline-flex items-center gap-3 border border-accent text-accent label-caps py-3.5 px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-150"
          >
            Explore Oklahoma City <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-t border-white/6"
      >
        <p className="mono-data text-white/15">Community. Connection. Health.</p>
        <p className="mono-data text-white/10">© {new Date().getFullYear()} INSPIRE Oklahoma City</p>
      </motion.div>
    </section>
  );
}
