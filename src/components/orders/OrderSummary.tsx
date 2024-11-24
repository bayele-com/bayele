import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  productId: string;
  formData: {
    customerDetails: any;
    deliveryInfo: any;
    paymentMethod: string;
  };
}

const OrderSummary = ({ productId, formData }: OrderSummaryProps) => {
  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (!product) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Product Details</h3>
          <p>{product.name}</p>
          <p className="text-sm text-muted-foreground">
            Price: ${product.price.toFixed(2)}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Customer Details</h3>
          <p>{formData.customerDetails.fullName}</p>
          <p className="text-sm text-muted-foreground">
            {formData.customerDetails.email}
          </p>
          {formData.customerDetails.phone && (
            <p className="text-sm text-muted-foreground">
              {formData.customerDetails.phone}
            </p>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Delivery Information</h3>
          <p>{formData.deliveryInfo.address}</p>
          <p>
            {formData.deliveryInfo.city}, {formData.deliveryInfo.state}{" "}
            {formData.deliveryInfo.zipCode}
          </p>
          {formData.deliveryInfo.notes && (
            <p className="text-sm text-muted-foreground mt-2">
              Notes: {formData.deliveryInfo.notes}
            </p>
          )}
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Payment Method</h3>
          <p className="capitalize">
            {formData.paymentMethod.replace("_", " ")}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-medium mb-2">Total</h3>
          <p className="text-lg font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;