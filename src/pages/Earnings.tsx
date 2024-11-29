import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrency } from "@/contexts/CurrencyContext";
import { CurrencySelector } from "@/components/CurrencySelector";

const Earnings = () => {
  const { formatAmount } = useCurrency();
  const { data: earnings, isLoading } = useQuery({
    queryKey: ["affiliate-earnings"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("affiliate_earnings_summary")
        .select("*")
        .eq("affiliate_id", user.id)
        .single();

      if (error) throw error;
      return data;
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