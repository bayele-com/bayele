import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { cameroonRegions } from "@/data/locations";

interface LocationPriceSectionProps {
  form: UseFormReturn<any>;
}

const LocationPriceSection = ({ form }: LocationPriceSectionProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cameroonRegions.map((loc) => (
                  <SelectItem key={loc.capital} value={loc.capital}>
                    {loc.capital}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price (Optional)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Enter price in FCFA" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default LocationPriceSection;