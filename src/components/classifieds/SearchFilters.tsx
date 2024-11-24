import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cameroonRegions } from "@/data/locations";

interface SearchFiltersProps {
  searchTerm: string;
  category: string;
  location: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
}

const SearchFilters = ({
  searchTerm,
  category,
  location,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: SearchFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Input
        placeholder="Search ads..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Jobs">Jobs</SelectItem>
          <SelectItem value="Announcements">Announcements</SelectItem>
          <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
        </SelectContent>
      </Select>
      <Select value={location} onValueChange={onLocationChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {cameroonRegions.map((loc) => (
            <SelectItem key={loc.region} value={loc.capital}>
              {loc.capital}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;