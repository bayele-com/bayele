import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[] | undefined;
  isLoading: boolean;
  userType: string | null;
  onCreateLink: (productId: string) => Promise<void>;
  onAddProduct: () => void;
}

const ProductGrid = ({ products, isLoading, userType, onCreateLink, onAddProduct }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found</p>
        {userType === "business" && (
          <Button
            variant="outline"
            className="mt-4"
            onClick={onAddProduct}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Product
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          actionButton={
            userType === "business" ? (
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {/* Handle edit */}}
              >
                Edit Product
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() => onCreateLink(product.id)}
              >
                Create Affiliate Link
              </Button>
            )
          }
        />
      ))}
    </div>
  );
};

export default ProductGrid;