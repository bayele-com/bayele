import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface ProductHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddProduct: () => void;
  userType: string | null;
}

const ProductHeader = ({ searchQuery, setSearchQuery, onAddProduct, userType }: ProductHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        {userType === "business" ? "My Products" : "Available Products"}
      </h1>
      <div className="flex items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {userType === "business" && (
          <Button onClick={onAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Product
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;