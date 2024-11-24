import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderTrackingDashboard from "@/components/orders/OrderTrackingDashboard";

const OrdersPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your orders
          </p>
        </div>
        <OrderTrackingDashboard />
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;