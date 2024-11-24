import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProductImageUploadProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
}

export const ProductImageUpload = ({ imageUrls, onImagesChange }: ProductImageUploadProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      onImagesChange([...imageUrls, publicUrl]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
    }
  };

  return (
    <div>
      <FormLabel>Images</FormLabel>
      <div className="mt-2 grid grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div
            key={url}
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
          >
            <img
              src={url}
              alt={`Product ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => {
                onImagesChange(imageUrls.filter((_, i) => i !== index));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {imageUrls.length < 4 && (
          <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Upload className="w-6 h-6 text-gray-400" />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};