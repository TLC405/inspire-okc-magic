import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogoReveal } from "./LogoReveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroBg from "@/assets/hero-bg.jpg";

const directories = [
  { num: "01", name: "Social Singles OKC", desc: "Events & meetups" },
  { num: "02", name: "OKC Workouts", desc: "Fitness & movement" },
  { num: "03", name: "Volunteering OKC", desc: "Give back locally" },
  { num: "04", name: "Coach TLC", desc: "Personal growth" },
  { num: "05", name: "Men-Talk OKC", desc: "Real conversations" },
];

const tickerItems = [
  "NO DUES", "NO CLUB", "OKC METRO AREA", "THE ANTI-CLUB",
  "BROWSE DON'T JOIN", "EST. 2024", "405 AREA CODE",
  "MIDTOWN • BRICKTOWN • PASEO", "700K+ CITY / 1.4M METRO",
  "WITHOUT APPLICATION", "THE BIG FRIENDLY",
];

export function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden flex flex-col">
      {/* Background */}
      <img
        src={heroBg}
        alt="Oklahoma City"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ position: "fixed" }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/70" />

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
        <div className="flex items-center gap-6">
          <Link to="/story" className="label-caps text-white/50 hover:text-white transition-colors hidden md:block">Story</Link>
          <Link to="/community" className="label-caps text-white/50 hover:text-white transition-colors hidden md:block">Programs</Link>
          <Link to="/info" className="label-caps text-white/50 hover:text-white transition-colors hidden md:block">Info</Link>
          <ThemeToggle className="text-white/50 hover:text-white" />
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
          <p className="italic text-xl md:text-3xl font-light text-white/70 leading-snug max-w-lg">
            "The city is a chassis.<br />We are the architects."
          </p>
        </motion.div>

        {/* Marquee ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="overflow-hidden border-y border-white/10 py-2.5 mb-6"
        >
          <div className="marquee-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="label-caps text-white/25 whitespace-nowrap mx-4">
                {item} <span className="text-accent mx-2">•</span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Directory grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-3 mb-6"
        >
          {directories.map((d) => (
            <div key={d.num} className="group">
              <span className="font-mono text-accent text-xs">({d.num})</span>
              <p className="text-white text-sm font-bold tracking-tight leading-tight">{d.name}</p>
              <p className="text-white/30 text-xs">{d.desc}</p>
            </div>
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
            className="inline-block border-2 border-accent text-accent label-caps py-3 px-8 hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
          >
            Browse Directories
          </Link>
        </motion.div>
      </div>

      {/* Footer line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4"
      >
        <p className="text-xs text-white/20">Community. Connection. Health.</p>
        <p className="text-xs text-white/20 font-mono">© {new Date().getFullYear()} INSPIRE OKC</p>
      </motion.div>
    </section>
  );
}
