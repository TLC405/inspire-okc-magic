import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoReveal } from "./LogoReveal";
import { LiveTicker } from "./LiveTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";

const directories = [
  { num: "01", name: "Social Singles OKC", desc: "Events & meetups", href: "/community#singles" },
  { num: "02", name: "OKC Workouts", desc: "Fitness & movement", href: "/community#workouts" },
  { num: "03", name: "Volunteering OKC", desc: "Give back locally", href: "/community#volunteering" },
  { num: "04", name: "Coach TLC", desc: "Personal growth", href: "/community#coaching" },
  { num: "05", name: "Men-Talk OKC", desc: "Real conversations", href: "/men-talk" },
];

const navLinks = [
  { label: "Story", href: "/story" },
  { label: "Programs", href: "/community" },
  { label: "Info", href: "/info" },
];

export function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="relative h-screen overflow-hidden flex flex-col">
      {/* Background with vignette */}
      <img
        src={heroBg}
        alt="Oklahoma City"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ position: "fixed" }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/50" />
      <div className="vignette" />

      {/* Header — no small logo, just nav + toggle */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
      >
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="label-caps text-white/40 hover:text-white transition-colors py-1">
              {link.label}
            </Link>
          ))}
        </div>
        {/* Spacer on mobile to push toggle + hamburger right */}
        <div className="md:hidden flex-1" />
        <div className="flex items-center gap-3">
          <ThemeToggle className="text-white/40 hover:text-white" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-6xl">
        <div className="mb-6">
          <LogoReveal />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="quote-block mb-6"
        >
          <p className="italic text-xl md:text-3xl font-light text-white/60 leading-snug max-w-lg">
            "The city is a chassis.<br />We are the architects."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mb-8"
        >
          <LiveTicker />
        </motion.div>

        {/* Directory grid — clickable with proper destinations */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-4 mb-8"
        >
          {directories.map((d) => (
            <Link
              key={d.num}
              to={d.href}
              className="group block py-2"
            >
              <span className="font-mono text-accent text-xs">({d.num})</span>
              <p className="text-white text-base font-bold tracking-tight leading-tight group-hover:text-accent transition-colors duration-150">
                {d.name}
              </p>
              <p className="text-white/25 text-xs group-hover:text-white/50 transition-colors">{d.desc}</p>
              <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300 mt-1.5" />
            </Link>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <Link
            to="/community"
            className="inline-flex items-center gap-3 border-2 border-accent text-accent label-caps py-4 px-10 hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] transition-all duration-150"
          >
            Browse Directories <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      {/* Footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/8"
      >
        <p className="text-xs text-white/25 tracking-wide">Community. Connection. Health.</p>
        <p className="text-xs text-white/20 font-mono">© {new Date().getFullYear()} INSPIRE OKC</p>
      </motion.div>
    </section>
  );
}
