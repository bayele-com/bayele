import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderTrackingDashboard from "@/components/orders/OrderTrackingDashboard";
import { Separator } from "@/components/ui/separator";

const OrdersPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your orders
          </p>
        </div>
        <Separator />
        <OrderTrackingDashboard />
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;