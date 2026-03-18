import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"text" | "video" | "done">("text");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Phase 1: "Powered by" text holds for 2s then transitions to video
    const timer = setTimeout(() => setPhase("video"), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [phase]);

  const handleVideoEnd = () => {
    if (phase === "done") return;
    setPhase("done");
    setTimeout(onComplete, 600);
  };

  // Fallback: if video fails to load/play or takes too long, skip after 6s
  useEffect(() => {
    if (phase === "video") {
      const fallback = setTimeout(handleVideoEnd, 6000);
      return () => clearTimeout(fallback);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Phase 1: "Powered by" text */}
          <AnimatePresence mode="wait">
            {phase === "text" && (
              <motion.div
                key="powered-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3"
              >
                {/* Horizontal line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-px bg-white/20 origin-center"
                />

                {/* "Powered by" */}
                <motion.span
                  initial={{ opacity: 0, y: 8, letterSpacing: "0.3em" }}
                  animate={{ opacity: 0.4, y: 0, letterSpacing: "0.25em" }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium"
                >
                  Powered by
                </motion.span>

                {/* INSPIRE */}
                <motion.h1
                  initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-white leading-none"
                >
                  INSPIRE
                </motion.h1>

                {/* OKLAHOMA CITY */}
                <motion.span
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-lg md:text-2xl font-black tracking-[-0.02em] leading-none"
                  style={{ color: "hsl(16, 70%, 50%)" }}
                >
                  OKLAHOMA CITY
                </motion.span>

                {/* Bottom line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-16 h-px bg-white/20 origin-center mt-1"
                />
              </motion.div>
            )}

            {/* Phase 2: Video logo reveal */}
            {phase === "video" && (
              <motion.div
                key="video-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full flex items-center justify-center"
              >
                <video
                  ref={videoRef}
                  src="/videos/logo-reveal.mp4"
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  onError={handleVideoEnd}
                  className="w-full h-full object-contain max-w-[90vw] max-h-[90vh]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
