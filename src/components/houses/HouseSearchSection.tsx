import React from "react";
import { SearchCommand } from "./SearchCommand";
import SearchFilters from "./SearchFilters";

interface HouseSearchSectionProps {
  location: string;
  setLocation: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  onSearch: () => void;
}

const HouseSearchSection = ({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
  onSearch,
}: HouseSearchSectionProps) => {
  return (
    <div className="max-w-5xl mx-auto mb-8 space-y-4">
      <SearchFilters
        location={location}
        setLocation={setLocation}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        onSearch={onSearch}
      />
    </div>
  );
};

export default HouseSearchSection;