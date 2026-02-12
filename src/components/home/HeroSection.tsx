import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LogoReveal } from "./LogoReveal";
import { LiveTicker } from "./LiveTicker";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";

const directories = [
  { num: "01", name: "Social Singles OKC", desc: "Events & meetups", href: "/community" },
  { num: "02", name: "OKC Workouts", desc: "Fitness & movement", href: "/community" },
  { num: "03", name: "Volunteering OKC", desc: "Give back locally", href: "/community" },
  { num: "04", name: "Coach TLC", desc: "Personal growth", href: "/community" },
  { num: "05", name: "Men-Talk OKC", desc: "Real conversations", href: "/men-talk" },
];

export function HeroSection() {
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
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/50" />
      {/* Vignette */}
      <div className="vignette" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-[-0.02em] text-white">INSPIRE</span>
          <span className="label-caps text-accent">OKC</span>
        </div>
        <div className="flex items-center gap-8">
          <Link to="/story" className="label-caps text-white/40 hover:text-white transition-colors hidden md:block py-1">Story</Link>
          <Link to="/community" className="label-caps text-white/40 hover:text-white transition-colors hidden md:block py-1">Programs</Link>
          <Link to="/info" className="label-caps text-white/40 hover:text-white transition-colors hidden md:block py-1">Info</Link>
          <ThemeToggle className="text-white/40 hover:text-white" />
        </div>
      </motion.header>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-6xl">
        {/* Logo reveal */}
        <div className="mb-6">
          <LogoReveal />
        </div>

        {/* Quote block */}
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

        {/* Live ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="mb-6"
        >
          <LiveTicker />
        </motion.div>

        {/* Directory grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-3 mb-6"
        >
          {directories.map((d) => (
            <Link
              key={d.num}
              to={d.href}
              className="group block"
            >
              <span className="font-mono text-accent text-xs">({d.num})</span>
              <p className="text-white text-sm font-bold tracking-tight leading-tight group-hover:text-accent transition-colors">
                {d.name}
              </p>
              <p className="text-white/25 text-xs group-hover:text-white/40 transition-colors">{d.desc}</p>
              <div className="h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-200 mt-1" />
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
