import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import AddEditProductModal from "@/components/products/AddEditProductModal";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/components/auth/AuthProvider";
import ProductHeader from "@/components/products/ProductHeader";
import ProductGrid from "@/components/products/ProductGrid";
import type { Product } from "@/types/product";

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
      
      if (userType === "business") {
        query.eq("business_id", user.id);
      } else if (userType === "affiliate") {
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
        <ProductHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddProduct={() => setIsAddModalOpen(true)}
          userType={userType}
        />

        <Separator />

        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          userType={userType}
          onCreateLink={handleCreateLink}
          onAddProduct={() => setIsAddModalOpen(true)}
        />

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