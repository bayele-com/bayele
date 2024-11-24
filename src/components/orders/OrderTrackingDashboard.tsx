import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

const OrderTrackingDashboard = () => {
  const { user } = useAuth();

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_details(*),
          order_status_history(
            status,
            notes,
            created_at
          ),
          products(
            name,
            price
          )
        `)
        .eq("customer_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!orders?.length) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No orders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Order #{order.id.slice(0, 8)}</CardTitle>
              <Badge
                variant={
                  order.status === "completed"
                    ? "default"
                    : order.status === "cancelled"
                    ? "destructive"
                    : "secondary"
                }
              >
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Product Details</h3>
              <p>{order.products?.name}</p>
              <p className="text-sm text-muted-foreground">
                ${order.products?.price.toFixed(2)}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Delivery Information</h3>
              <p>{order.order_details?.full_name}</p>
              <p>{order.order_details?.delivery_address.address}</p>
              <p>
                {order.order_details?.delivery_address.city},{" "}
                {order.order_details?.delivery_address.state}{" "}
                {order.order_details?.delivery_address.zipCode}
              </p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium mb-2">Order Timeline</h3>
              <div className="space-y-4">
                {order.order_status_history?.map((status, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium capitalize">
                        {status.status.replace("_", " ")}
                      </p>
                      {status.notes && (
                        <p className="text-sm text-muted-foreground">
                          {status.notes}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(status.created_at), "PPp")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderTrackingDashboard;