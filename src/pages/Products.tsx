import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, Grid, List, Eye, Edit, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import AddEditProductModal from "@/components/products/AddEditProductModal";
import ProductCard from "@/components/products/ProductCard";
import ProductList from "@/components/products/ProductList";
import { useToast } from "@/hooks/use-toast";

const ProductsPage = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (productId: string) => {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product",
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Products</h1>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Button>
        </div>

        <div className="flex justify-between items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <Toggle
              pressed={isGridView}
              onPressedChange={() => setIsGridView(true)}
              size="sm"
            >
              <Grid className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={!isGridView}
              onPressedChange={() => setIsGridView(false)}
              size="sm"
            >
              <List className="w-4 h-4" />
            </Toggle>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : isGridView ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => setEditingProduct(product)}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </div>
        ) : (
          <ProductList
            products={filteredProducts || []}
            onEdit={(product) => setEditingProduct(product)}
            onDelete={handleDelete}
          />
        )}

        <AddEditProductModal
          open={isAddModalOpen || !!editingProduct}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;