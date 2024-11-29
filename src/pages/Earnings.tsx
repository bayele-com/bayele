import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";
import { useToast } from "@/hooks/use-toast";

const Earnings = () => {
  const { formatAmount } = useCurrency();
  const { toast } = useToast();
  
  const { data: earnings, isLoading } = useQuery({
    queryKey: ["affiliate-earnings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to view your earnings",
        });
        throw new Error("Not authenticated");
      }

      const { data, error } = await supabase
        .from("affiliate_earnings")
        .select("amount, created_at")
        .eq("affiliate_id", user.id)
        .eq("status", "paid");

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching earnings",
          description: error.message,
        });
        throw error;
      }

      // Calculate total earnings and sales from the raw earnings data
      const totalEarnings = data.reduce((sum, earning) => sum + Number(earning.amount), 0);
      
      return {
        total_earnings: totalEarnings,
        total_sales: data.length,
        first_sale_date: data[0]?.created_at || null,
        last_sale_date: data[data.length - 1]?.created_at || null,
      };
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Earnings</h1>
          <CurrencySelector />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? "Loading..." : formatAmount(earnings?.total_earnings || 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? "Loading..." : earnings?.total_sales || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {isLoading ? "Loading..." : `${((earnings?.total_sales || 0) / 100).toFixed(2)}%`}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;