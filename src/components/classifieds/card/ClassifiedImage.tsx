import { Star } from "lucide-react";
import { useState } from "react";

interface ClassifiedImageProps {
  imageUrl?: string;
  title: string;
  featured?: boolean;
}

const ClassifiedImage = ({ imageUrl, title, featured }: ClassifiedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative">
      <div className={`w-full h-48 bg-gray-100 rounded-t-lg ${isLoading ? 'animate-pulse' : ''}`}>
        <img
          src={imageUrl || '/placeholder.svg'}
          alt={title}
          className={`w-full h-48 object-cover rounded-t-lg transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
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