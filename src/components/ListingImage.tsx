import { useListingImage } from "@/hooks/useListingImage";
import { ImageOff, Heart, Dumbbell, HandHelping, MapPin, Building2 } from "lucide-react";

const categoryGradients: Record<string, string> = {
  "Date Night": "from-rose-500/30 to-pink-600/20",
  "Speed Dating": "from-orange-500/30 to-amber-600/20",
  "Mixer": "from-violet-500/30 to-purple-600/20",
  "Social": "from-blue-500/30 to-cyan-600/20",
  "Dance": "from-fuchsia-500/30 to-pink-600/20",
  "Activity": "from-emerald-500/30 to-teal-600/20",
  "Faith": "from-amber-400/30 to-yellow-600/20",
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

export const ListingImage = ({ listingType, listingId, name, category, websiteUrl, className = "" }: ListingImageProps) => {
  const { imageUrl, loading } = useListingImage(listingType, listingId, name, {
    category,
    websiteUrl,
  });

  const gradient = categoryGradients[category || ""] || categoryGradients["default"];
  const FallbackIcon = categoryIcons[category || ""] || categoryIcons[listingType] || MapPin;

  if (loading) {
    return (
      <div className={`bg-muted/30 animate-pulse flex items-center justify-center ${className}`}>
        <div className="w-6 h-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <FallbackIcon size={24} className="text-foreground/20" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className={`object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
};
