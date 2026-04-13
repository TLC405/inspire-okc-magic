import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heroSkyline from "@/assets/hero-okc-skyline.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import heroDiscover from "@/assets/hero-discover.jpg";
import heroFitness from "@/assets/hero-fitness.jpg";
import heroSingles from "@/assets/hero-singles.jpg";
import heroVolunteer from "@/assets/hero-volunteer.jpg";

const defaultPhotos = [
  { src: heroSkyline, alt: "Oklahoma City skyline at golden hour", headline: "Your City. Tonight.", sub: "Oklahoma City's most curated community guide", href: "/" },
  { src: heroSingles, alt: "Singles events in Oklahoma City", headline: "Meet Someone Real", sub: "Verified singles events — zero ghost profiles", href: "/singles" },
  { src: heroFitness, alt: "Fitness in Oklahoma City", headline: "Sweat Together", sub: "Every gym, trail, and studio across every district", href: "/fitness" },
  { src: heroVolunteer, alt: "Volunteering in Oklahoma City", headline: "Give Back", sub: "Connect with causes that matter in OKC", href: "/volunteering" },
  { src: heroBg, alt: "Oklahoma City landscape", headline: "Date Night, Sorted", sub: "Curated evenings for couples and adventurers", href: "/date-nights" },
  { src: heroDiscover, alt: "Discover Oklahoma City", headline: "Discover the Metro", sub: "Architecture, culture, and hidden gems", href: "/discover" },
];

type SlideData = { src: string; alt: string; headline: string; sub: string; href: string };

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [photos, setPhotos] = useState<SlideData[]>(defaultPhotos);

  useEffect(() => {
    supabase
      .from("hero_slides")
      .select("title, subtitle, cta_text, cta_link, image_url")
      .eq("active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPhotos(
            (data as any[]).map((d) => ({
              src: d.image_url,
              alt: d.title,
              headline: d.title,
              sub: d.subtitle,
              href: d.cta_link,
            }))
          );
        }
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  return (
    <div className="relative w-full h-[380px] md:h-[560px] overflow-hidden">
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

      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-4 text-center">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-4 text-center transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <h2
              className="text-white font-black tracking-[-0.02em] leading-[0.9] masthead-shadow"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 6vw, 3.5rem)" }}
            >
              {photo.headline}
            </h2>
            <p className="text-white/80 text-sm md:text-base mt-2 max-w-md masthead-shadow">
              {photo.sub}
            </p>
            {photo.href !== "/" && (
              <Link
                to={photo.href}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded text-white text-xs md:text-sm font-semibold uppercase tracking-wider hover:bg-white/25 transition-colors"
              >
                Explore <ArrowRight size={12} />
              </Link>
            )}
          </div>
        ))}
      </div>

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
