import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Loader2 } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { useToast } from "@/hooks/use-toast";
import AddEditProductModal from "@/components/products/AddEditProductModal";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/auth/AuthProvider";

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

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [userType, setUserType] = useState<string | null>(null);

  // Fetch user type
  useQuery({
    queryKey: ["userType", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("user_type")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setUserType(data.user_type);
      return data.user_type;
    },
    enabled: !!user,
  });

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ["products", user?.id, userType],
    queryFn: async () => {
      if (!user) return [];

      const query = supabase.from("products").select("*");
      
      // If user is a business, only show their products
      if (userType === "business") {
        query.eq("business_id", user.id);
      } else if (userType === "affiliate") {
        // For affiliates, show all active products
        query.eq("status", "active");
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
    enabled: !!user && !!userType,
  });

  const handleError = () => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading products",
        description: "Please try again later",
      });
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModalClose = () => {
    setIsAddModalOpen(false);
    refetch();
  };

  const handleCreateLink = async (productId: string) => {
    try {
      const uniqueCode = Math.random().toString(36).substring(7);
      const { error } = await supabase.from("affiliate_links").insert({
        affiliate_id: user?.id,
        product_id: productId,
        unique_code: uniqueCode,
        status: "active",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Affiliate link created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create affiliate link",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6">
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
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Button>
            )}
          </div>
        </div>

        <Separator />

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found</p>
            {userType === "business" && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
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
                      onClick={() => handleCreateLink(product.id)}
                    >
                      Create Affiliate Link
                    </Button>
                  )
                }
              />
            ))}
          </div>
        )}

        {userType === "business" && (
          <AddEditProductModal
            open={isAddModalOpen}
            onClose={handleModalClose}
            product={null}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Products;