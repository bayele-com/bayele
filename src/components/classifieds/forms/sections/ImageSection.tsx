import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { ImageUpload } from "../../ImageUpload";
import { UseFormReturn } from "react-hook-form";

interface ImageSectionProps {
  form: UseFormReturn<any>;
}

const ImageSection = ({ form }: ImageSectionProps) => {
  return (
    <FormField
      control={form.control}
      name="image_urls"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Images (Max 7 images, 0.5MB each)</FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onChange={field.onChange}
              maxFiles={7}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageSection;