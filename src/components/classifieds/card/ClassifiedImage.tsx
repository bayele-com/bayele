import { Star } from "lucide-react";

interface ClassifiedImageProps {
  imageUrl?: string;
  title: string;
  featured?: boolean;
}

const ClassifiedImage = ({ imageUrl, title, featured }: ClassifiedImageProps) => {
  return (
    <div className="relative">
      <img
        src={imageUrl || '/placeholder.svg'}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      {featured && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span className="text-sm">Featured</span>
        </div>
      )}
    </div>
  );
};

export default ClassifiedImage;