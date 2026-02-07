import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="INSPIRE Oklahoma City"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Solid dark overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]/75" />

      <div className="container relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="label-caps text-white/50 mb-6 tracking-[0.3em]"
        >
          Oklahoma City
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white mb-4"
        >
          INSPIRE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="text-base md:text-lg text-white/60 max-w-md mx-auto mb-10"
        >
          Community. Culture. Growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-8 h-12 rounded-sm shadow-md"
          >
            <Link to="/community">Explore Programs</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown size={20} className="text-white/30" />
      </div>
    </section>
  );
}
