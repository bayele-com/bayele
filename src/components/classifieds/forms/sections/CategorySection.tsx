import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySectionProps {
  form: UseFormReturn<any>;
  onCategoryChange: (value: string) => void;
}

const categories = [
  { value: "rental_home", label: "Rental Home" },
  { value: "furnished_apartment", label: "Furnished Apartment" },
  { value: "announcements", label: "Announcements" },
  { value: "jobs", label: "Jobs" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const CategorySection = ({ form, onCategoryChange }: CategorySectionProps) => {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              onCategoryChange(value);
            }} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CategorySection;