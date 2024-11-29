import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import OrderFormSteps from "@/components/orders/OrderFormSteps";
import { useCurrency } from "@/contexts/CurrencyContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_urls: string[];
}

interface AffiliateProfile {
  whatsapp_number: string;
  full_name: string;
}

const AffiliateProduct = () => {
  const { code } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [affiliate, setAffiliate] = useState<AffiliateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { formatAmount } = useCurrency();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        // Get the affiliate link details
        const { data: linkData, error: linkError } = await supabase
          .from("affiliate_links")
          .select(`
            id,
            product_id,
            affiliate_id
          `)
          .eq("unique_code", code)
          .single();

        if (linkError) throw linkError;

        // Get the product details
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", linkData.product_id)
          .single();

        if (productError) throw productError;

        // Get affiliate details
        const { data: affiliateData, error: affiliateError } = await supabase
          .from("profiles")
          .select("whatsapp_number, full_name")
          .eq("id", linkData.affiliate_id)
          .single();

        if (affiliateError) throw affiliateError;

        setProduct(productData);
        setAffiliate(affiliateData);

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

  const handleSubmit = async (formData: any) => {
    if (!affiliate?.whatsapp_number) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Affiliate contact information not available",
      });
      return;
    }

    const message = `
New order for ${product?.name}:

Customer Details:
Name: ${formData.customerDetails.fullName}
Email: ${formData.customerDetails.email}
Phone: ${formData.customerDetails.phone}

Delivery Information:
Address: ${formData.deliveryInfo.address}
City: ${formData.deliveryInfo.city}
State: ${formData.deliveryInfo.state}
ZIP: ${formData.deliveryInfo.zipCode}
Notes: ${formData.deliveryInfo.notes}

Payment Method: ${formData.paymentMethod}

Total Amount: ${formatAmount(product?.price || 0)}
    `.trim();

    const whatsappUrl = `https://wa.me/${affiliate.whatsapp_number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Order submitted",
      description: "Redirecting you to WhatsApp to complete your order",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product || !affiliate) {
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
                <div className="pt-4">
                  <p className="text-sm text-gray-500">
                    Promoted by: {affiliate.full_name}
                  </p>
                </div>
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
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffiliateProduct;