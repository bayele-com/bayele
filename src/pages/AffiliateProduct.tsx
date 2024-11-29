import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import OrderFormSteps from "@/components/orders/OrderFormSteps";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
}

const AffiliateProduct = () => {
  const { code } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { formatAmount } = useCurrency();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // First get the affiliate link details
        const { data: linkData, error: linkError } = await supabase
          .from("affiliate_links")
          .select("product_id")
          .eq("unique_code", code)
          .single();

        if (linkError) throw linkError;

        // Then get the product details
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", linkData.product_id)
          .single();

        if (productError) throw productError;

        setProduct(productData);

        // Record the link click
        await supabase.from("link_analytics").insert({
          link_id: linkData.id,
          user_agent: navigator.userAgent,
          referrer: document.referrer,
        });

      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading product",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [code, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Product not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {product.image_urls?.[0] && (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.image_urls[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-4">
                <p className="text-gray-600">{product.description}</p>
                <p className="text-2xl font-bold text-primary">
                  {formatAmount(product.price)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Now</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderFormSteps
              productId={product.id}
              onSubmit={async (data) => {
                // Handle order submission
                toast({
                  title: "Order submitted",
                  description: "We'll process your order shortly",
                });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffiliateProduct;