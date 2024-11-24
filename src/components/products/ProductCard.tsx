import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  commission_rate: number;
  category: string;
  status: string;
  image_urls: string[];
}

interface ProductCardProps {
  product: Product;
  actionButton: React.ReactNode;
}

const ProductCard = ({ product, actionButton }: ProductCardProps) => {
  return (
    <Card>
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          {product.image_urls?.[0] ? (
            <img
              src={product.image_urls[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-t-lg">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="space-y-1">
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-green-600">
            {product.commission_rate}% commission
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {actionButton}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;