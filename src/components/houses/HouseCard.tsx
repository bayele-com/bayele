import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import HouseImage from "./card/HouseImage";
import HouseDetails from "./card/HouseDetails";
import HouseFooter from "./card/HouseFooter";

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
      description: isFavorite 
        ? "Property removed from your favorites" 
        : "Property added to your favorites",
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <HouseImage
        imageUrl={imageUrl}
        title={title}
        propertyType={propertyType}
        isFavorite={isFavorite}
        onFavoriteClick={handleFavoriteClick}
      />
      
      <CardContent className="p-0">
        <HouseDetails
          title={title}
          location={location}
          propertyType={propertyType}
        />
      </CardContent>
      
      <CardFooter className="p-0">
        <HouseFooter
          price={price}
          onContactClick={() => onContactClick(id)}
        />
      </CardFooter>
    </Card>
  );
};

export default HouseCard;