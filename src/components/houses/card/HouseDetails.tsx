import { MapPin, Home } from "lucide-react";

interface HouseDetailsProps {
  title: string;
  location: string;
  propertyType: string;
}

const HouseDetails = ({ title, location, propertyType }: HouseDetailsProps) => {
  return (
    <div className="p-4">
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
    </div>
  );
};

export default HouseDetails;