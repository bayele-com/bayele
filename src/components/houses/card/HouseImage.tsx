import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HouseImageProps {
  imageUrl?: string;
  title: string;
  propertyType: string;
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

const HouseImage = ({
  imageUrl,
  title,
  propertyType,
  isFavorite,
  onFavoriteClick,
}: HouseImageProps) => {
  return (
    <div className="aspect-[4/3] relative">
      <img
        src={imageUrl || "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
          isFavorite ? "text-red-500" : "text-gray-500"
        }`}
        onClick={onFavoriteClick}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
      </Button>
      <Badge className="absolute top-2 left-2 bg-primary">
        {propertyType}
      </Badge>
    </div>
  );
};

export default HouseImage;