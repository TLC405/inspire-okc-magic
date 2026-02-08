import { motion } from "framer-motion";

export function LogoReveal() {
  return (
    <div className="relative">
      {/* INSPIRE */}
      <motion.h1
        initial={{ x: -80, opacity: 0, filter: "blur(20px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(3.5rem,14vw,12rem)] font-black tracking-[-0.06em] text-white leading-[0.85] select-none"
      >
        INSPIRE
      </motion.h1>

      {/* OKC */}
      <motion.h2
        initial={{ x: 80, opacity: 0, filter: "blur(20px)" }}
        animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-[clamp(3.5rem,14vw,12rem)] font-black tracking-[-0.06em] text-accent leading-[0.85] select-none"
      >
        OKC
      </motion.h2>

      {/* Vertical accent bar */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -left-6 md:-left-8 top-0 bottom-0 w-1 bg-accent origin-top"
      />
    </div>
  );
}
