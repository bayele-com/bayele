import { MapPin, Home, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface HouseCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  imageUrl?: string;
  propertyType: string;
  onContactClick: (id: string) => void;
}

const HouseCard = ({
  id,
  title,
  location,
  price,
  imageUrl,
  propertyType,
  onContactClick,
}: HouseCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your favorites" : "Property added to your favorites",
    });
  };

  const formatPrice = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      maximumFractionDigits: 0,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Badge className="absolute top-2 left-2 bg-primary">{propertyType}</Badge>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
          {title}
        </h3>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Home className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm">{propertyType}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="text-lg font-semibold text-primary">
          {formatPrice(price)}
          <span className="text-sm text-gray-500 font-normal">/month</span>
        </div>
        <Button 
          onClick={() => onContactClick(id)}
          size="sm"
          className="flex items-center gap-1"
        >
          <MessageSquare className="h-4 w-4" />
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HouseCard;