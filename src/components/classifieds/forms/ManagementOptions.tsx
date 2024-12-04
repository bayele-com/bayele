import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface ManagementOptionsProps {
  form: UseFormReturn<any>;
  category: string;
}

const ManagementOptions = ({ form, category }: ManagementOptionsProps) => {
  const isFurnished = category === "furnished_apartment";

  return (
    <FormField
      control={form.control}
      name="managementType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Property Management</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-3"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="self" />
                </FormControl>
                <FormLabel className="font-normal">
                  I will manage it myself
                  <FormDescription>
                    {isFurnished 
                      ? "5,000 FCFA monthly listing fee per property"
                      : "Standard listing, no additional fees"}
                  </FormDescription>
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="bayele" />
                </FormControl>
                <FormLabel className="font-normal">
                  I want Bayele to manage my clients
                  <FormDescription>
                    {isFurnished 
                      ? "10% fee for every paid booking"
                      : "2,500 FCFA monthly listing fee + 30% of one month's rent for successful rentals"}
                  </FormDescription>
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ManagementOptions;