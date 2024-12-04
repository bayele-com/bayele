import { useCallback, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export const ImageUpload = ({ value = [], onChange, maxFiles = 7 }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const validateFile = (file: File) => {
    const maxSize = 512000; // 0.5MB in bytes
    if (file.size > maxSize) {
      throw new Error(`File size must be less than 0.5MB`);
    }
  };

  const optimizeImage = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: 'image/jpeg' }));
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.8);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const onUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files?.[0];
        if (!file) return;

        if (value.length >= maxFiles) {
          toast({
            variant: "destructive",
            title: "Maximum files reached",
            description: `You can only upload up to ${maxFiles} images`,
          });
          return;
        }

        validateFile(file);
        setIsUploading(true);
        const optimizedFile = await optimizeImage(file);
        const fileExt = optimizedFile.name.split(".").pop();
        const filePath = `${Math.random()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("classified-images")
          .upload(filePath, optimizedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("classified-images")
          .getPublicUrl(filePath);

        onChange([...value, publicUrl]);
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: error.message || "Please try again later",
        });
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange, maxFiles, toast]
  );

  const onRemove = useCallback(
    (url: string) => {
      onChange(value.filter((current) => current !== url));
      toast({
        title: "Image removed",
        description: "The image has been removed successfully",
      });
    },
    [onChange, value, toast]
  );

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square">
            <img
              src={url}
              alt="Upload"
              className="h-full w-full rounded-md object-cover"
              loading="lazy"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute right-2 top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm hover:bg-rose-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {value.length < maxFiles && (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-12">
          <label className="cursor-pointer text-center">
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              {isUploading ? (
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">
                {isUploading ? "Uploading..." : "Upload Image (Max 0.5MB)"}
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};