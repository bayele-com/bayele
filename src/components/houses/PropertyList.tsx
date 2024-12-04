import { Loader2 } from "lucide-react";
import HouseCard from "./HouseCard";
import type { RentalProperty } from "@/types/house";

interface PropertyListProps {
  houses: (RentalProperty & {
    neighborhood: { name: string; city: string };
  })[] | undefined;
  isLoading: boolean;
  onContactClick: (id: string) => void;
}

const PropertyList = ({ houses, isLoading, onContactClick }: PropertyListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {houses?.map((house) => (
        <HouseCard
          key={house.id}
          id={house.id}
          title={house.title}
          location={house.neighborhood.name}
          price={house.price}
          imageUrl={house.image_urls?.[0]}
          propertyType={house.property_type}
          onContactClick={onContactClick}
        />
      ))}
    </div>
  );
};

export default PropertyList;