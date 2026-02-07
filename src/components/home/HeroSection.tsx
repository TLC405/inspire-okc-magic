import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <img
        src={heroBg}
        alt="INSPIRE Oklahoma City"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="container relative z-10 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <p className="label-caps text-white/35 mb-6 tracking-[0.3em]">
            Oklahoma City
          </p>

          <h1 className="text-[clamp(4rem,12vw,10rem)] font-black tracking-[-0.05em] text-white leading-[0.85] mb-4">
            INSPIRE
          </h1>

          <div className="w-24 h-[2px] bg-accent mb-8" />

          <p className="text-xl md:text-2xl font-semibold text-white/80 tracking-tight mb-3">
            Community. Connection. Health.
          </p>
          <p className="text-sm md:text-base text-white/45 max-w-lg leading-relaxed">
            A set of community tools built around the psychology of belonging — 
            because disconnection is the crisis, and showing up for each other is the answer.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={18} className="text-white/20" />
      </div>
    </section>
  );
}
