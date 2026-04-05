import { useListingImage } from "@/hooks/useListingImage";
import { ImageOff } from "lucide-react";

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

  if (loading) {
    return (
      <div className={`bg-muted/30 animate-pulse flex items-center justify-center ${className}`}>
        <div className="w-6 h-6 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={`bg-muted/20 flex items-center justify-center ${className}`}>
        <ImageOff size={20} className="text-muted-foreground/30" />
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
