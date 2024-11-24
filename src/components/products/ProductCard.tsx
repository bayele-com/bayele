import { Edit, Trash, Eye } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    commission_rate: number;
    status: string;
    image_urls: string[];
  };
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader className="p-4">
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          {product.image_urls?.[0] ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Eye className="w-8 h-8" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-sm text-gray-600">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Commission: {product.commission_rate}%
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Switch
            checked={product.status === "active"}
            onCheckedChange={() => {}}
          />
          <span className="text-sm text-gray-600">
            {product.status === "active" ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;