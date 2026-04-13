import { useState } from "react";
import { getStaticImage } from "@/data/listingImages";
import { Heart, Dumbbell, HandHelping, MapPin, Building2 } from "lucide-react";

const categoryGradients: Record<string, string> = {
  "Date Night": "from-rose-500/30 to-pink-600/20",
  "Speed Dating": "from-orange-500/30 to-amber-600/20",
  "Mixer": "from-violet-500/30 to-purple-600/20",
  "Social": "from-blue-500/30 to-cyan-600/20",
  "Dance": "from-fuchsia-500/30 to-pink-600/20",
  "Activity": "from-emerald-500/30 to-teal-600/20",
  "Faith": "from-amber-400/30 to-yellow-600/20",
  "Team Building": "from-blue-500/30 to-indigo-600/20",
  "CrossFit": "from-orange-500/30 to-red-600/20",
  "Gym": "from-slate-500/30 to-gray-600/20",
  "Yoga": "from-indigo-400/30 to-purple-500/20",
  "HIIT": "from-red-500/30 to-orange-600/20",
  "Bootcamp": "from-red-400/30 to-rose-600/20",
  "Outdoor": "from-green-500/30 to-emerald-600/20",
  "Running": "from-sky-400/30 to-blue-500/20",
  "Climbing": "from-amber-500/30 to-orange-600/20",
  "Boxing": "from-red-600/30 to-rose-700/20",
  "Martial Arts": "from-red-500/30 to-amber-600/20",
  "BJJ": "from-blue-600/30 to-indigo-700/20",
  "Cycling": "from-lime-500/30 to-green-600/20",
  "Swimming": "from-cyan-400/30 to-blue-500/20",
  "Pilates": "from-pink-400/30 to-rose-500/20",
  "Barre": "from-pink-300/30 to-fuchsia-400/20",
  "Personal Training": "from-amber-500/30 to-yellow-600/20",
  "Recovery": "from-teal-400/30 to-cyan-500/20",
  "Powerlifting": "from-zinc-500/30 to-slate-600/20",
  "Tennis": "from-lime-400/30 to-green-500/20",
  "Pickleball": "from-yellow-400/30 to-lime-500/20",
  "default": "from-muted/40 to-muted/20",
};

const categoryIcons: Record<string, typeof Heart> = {
  "Date Night": Heart,
  "fitness": Dumbbell,
  "volunteer": HandHelping,
  "discover": Building2,
};

interface ListingImageProps {
  listingType: string;
  listingId: string;
  name: string;
  category?: string;
  websiteUrl?: string;
  className?: string;
}

export const ListingImage = ({ listingType, listingId, name, category, className = "" }: ListingImageProps) => {
  const staticUrl = getStaticImage(listingType, listingId, category);
  const [imgError, setImgError] = useState(false);

  const gradient = categoryGradients[category || ""] || categoryGradients["default"];
  const FallbackIcon = categoryIcons[category || ""] || categoryIcons[listingType] || MapPin;

  if (imgError) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <FallbackIcon size={24} className="text-foreground/20" />
      </div>
    );
  }

  return (
    <img
      src={staticUrl}
      alt={name}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={() => setImgError(true)}
    />
  );
};
