import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt="INSPIRE Oklahoma City"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      {/* Dark overlay — solid, no gradient */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="container relative z-10 pb-20 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="label-caps text-white/40 mb-4 tracking-[0.25em]">
            Oklahoma City
          </p>

          <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-[-0.04em] text-white leading-[0.9] mb-6">
            INSPIRE
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-md mb-10 leading-relaxed">
            Get out. Do something. Build real connections in OKC.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm tracking-wide px-8 h-12 rounded-sm shadow-lg"
            >
              <Link to="/community">Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 text-sm tracking-wide px-8 h-12 rounded-sm"
            >
              <Link to="/apply">Apply Now</Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown size={20} className="text-white/25" />
      </div>
    </section>
  );
}
