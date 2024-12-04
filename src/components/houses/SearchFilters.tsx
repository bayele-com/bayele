import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MobileFilters from "./filters/MobileFilters";
import { FilterOptions } from "./filters/FilterOptions";

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
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by location..."
              className="pl-9"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <MobileFilters
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          onSearch={onSearch}
        />
      </div>

      <div className="hidden lg:block">
        <FilterOptions
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
        />
      </div>
    </div>
  );
};

export default SearchFilters;