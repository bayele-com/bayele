import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin } from "lucide-react";

interface SearchFiltersProps {
  location: string;
  setLocation: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  onSearch: () => void;
}

const SearchFilters = ({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
  onSearch,
}: SearchFiltersProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
            aria-label="Location search"
          />
        </div>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger aria-label="Select price range">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50000">0 - 50,000 FCFA</SelectItem>
            <SelectItem value="50000-100000">50,000 - 100,000 FCFA</SelectItem>
            <SelectItem value="100000-200000">100,000 - 200,000 FCFA</SelectItem>
            <SelectItem value="200000">200,000+ FCFA</SelectItem>
          </SelectContent>
        </Select>

        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger aria-label="Select property type">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="room">Single Room</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full mt-4" size="lg" onClick={onSearch}>
        <Search className="mr-2 h-5 w-5" />
        Search Properties
      </Button>
    </div>
  );
};

export default SearchFilters;