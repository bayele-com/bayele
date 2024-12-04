import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { City } from "@/types/house";

interface FilterOptionsProps {
  location: string;
  setLocation: (value: string) => void;
  priceRange: string;
  setPriceRange: (value: string) => void;
  propertyType: string;
  setPropertyType: (value: string) => void;
  isMobile?: boolean;
}

export const FilterOptions = ({
  location,
  setLocation,
  priceRange,
  setPriceRange,
  propertyType,
  setPropertyType,
  isMobile = false,
}: FilterOptionsProps) => {
  const cities: { value: City; label: string }[] = [
    { value: "Yaounde", label: "Yaoundé" },
    { value: "Douala", label: "Douala" },
  ];

  const propertyTypes = [
    { value: "studio", label: "Studio" },
    { value: "apartment", label: "Apartment" },
    { value: "furnished_apartment", label: "Furnished Apartment" },
    { value: "house", label: "House" },
    { value: "room", label: "Single Room" },
  ];

  const priceRanges = [
    { value: "0-50000", label: "0 - 50,000 FCFA" },
    { value: "50000-100000", label: "50,000 - 100,000 FCFA" },
    { value: "100000-200000", label: "100,000 - 200,000 FCFA" },
    { value: "200000-300000", label: "200,000 - 300,000 FCFA" },
    { value: "300000", label: "300,000+ FCFA" },
  ];

  const containerClass = isMobile ? "space-y-4" : "grid grid-cols-3 gap-4";

  return (
    <div className={containerClass}>
      <div className="space-y-2">
        {isMobile && <label className="text-sm font-medium">City</label>}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger>
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {isMobile && <label className="text-sm font-medium">Property Type</label>}
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
          <SelectContent>
            {propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {isMobile && <label className="text-sm font-medium">Price Range</label>}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};