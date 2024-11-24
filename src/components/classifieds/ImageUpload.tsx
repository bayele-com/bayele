import { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  maxFiles?: number;
}

export const ImageUpload = ({ value = [], onChange, maxFiles = 4 }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

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

        setIsUploading(true);
        const fileExt = file.name.split(".").pop();
        const filePath = `${Math.random()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from("classified-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("classified-images")
          .getPublicUrl(filePath);

        onChange([...value, publicUrl]);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Please try again later",
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
    },
    [onChange, value]
  );

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-4">
        {value.map((url) => (
          <div key={url} className="relative aspect-square">
            <img
              src={url}
              alt="Upload"
              className="h-full w-full rounded-md object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(url)}
              className="absolute right-2 top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {value.length < maxFiles && (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={onUpload}
              disabled={isUploading}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {isUploading ? "Uploading..." : "Upload Image"}
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};