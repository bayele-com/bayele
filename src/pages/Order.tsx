import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import OrderFormSteps from "@/components/orders/OrderFormSteps";

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    if (!user || !productId) return;

    setIsSubmitting(true);
    try {
      // Get product details
      const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (!product) throw new Error("Product not found");

      // Calculate commission
      const commissionAmount = (product.price * product.commission_rate) / 100;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_id: user.id,
          business_id: product.business_id,
          product_id: productId,
          total_amount: product.price,
          commission_amount: commissionAmount,
          payment_method: formData.paymentMethod,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order details
      const { error: detailsError } = await supabase
        .from("order_details")
        .insert({
          order_id: order.id,
          full_name: formData.customerDetails.fullName,
          email: formData.customerDetails.email,
          phone: formData.customerDetails.phone,
          delivery_address: formData.deliveryInfo,
        });

      if (detailsError) throw detailsError;

      toast({
        title: "Order placed successfully",
        description: "You will receive a confirmation email shortly.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error placing order",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!productId) return null;

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Place Order</h1>
      <OrderFormSteps
        productId={productId}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default OrderPage;