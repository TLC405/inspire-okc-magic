import { useState, useEffect } from "react";
import heroSkyline from "@/assets/hero-okc-skyline.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import heroDiscover from "@/assets/hero-discover.jpg";
import heroFitness from "@/assets/hero-fitness.jpg";
import heroSingles from "@/assets/hero-singles.jpg";
import heroVolunteer from "@/assets/hero-volunteer.jpg";

const photos = [
  { src: heroSkyline, alt: "Oklahoma City skyline at golden hour" },
  { src: heroBg, alt: "Oklahoma City landscape" },
  { src: heroDiscover, alt: "Discover Oklahoma City" },
  { src: heroFitness, alt: "Fitness in Oklahoma City" },
  { src: heroSingles, alt: "Singles events in Oklahoma City" },
  { src: heroVolunteer, alt: "Volunteering in Oklahoma City" },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[340px] md:h-[500px] overflow-hidden">
      {photos.map((photo, i) => (
        <img
          key={i}
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          width={1920}
          height={640}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-background" />

      {/* Photo indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white/90 w-4" : "bg-white/40"
            }`}
            aria-label={`Show photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
