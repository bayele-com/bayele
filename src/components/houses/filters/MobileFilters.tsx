import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { FilterOptions } from "./FilterOptions";

interface MobileFiltersProps {
  location: string;
  setLocation: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  onSearch: () => void;
}

const MobileFilters = ({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
  onSearch,
}: MobileFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80%]">
        <SheetHeader>
          <SheetTitle>Filter Properties</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <FilterOptions
            location={location}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            isMobile={true}
          />
          <Button onClick={onSearch} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;