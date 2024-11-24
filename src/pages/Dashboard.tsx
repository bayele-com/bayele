import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  user_type: "affiliate" | "business" | "user" | "admin";
  full_name: string | null;
}

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("user_type, full_name")
        .eq("id", user.id)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching profile",
          description: error.message,
        });
        return;
      }

      setProfile(data);
    };

    getProfile();
  }, [user, toast]);

  const renderDashboardContent = () => {
    switch (profile?.user_type) {
      case "affiliate":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-primary">$0.00</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Active Links</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Clicks</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
          </div>
        );

      case "business":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
              <p className="text-3xl font-bold text-primary">$0.00</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Active Products</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
          </div>
        );

      case "user":
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Active Ads</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Messages</h3>
              <p className="text-3xl font-bold text-primary">0</p>
            </Card>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading dashboard content...</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || "User"}!</h1>
          <p className="text-gray-600 mt-2">Here's an overview of your account</p>
        </div>
        {renderDashboardContent()}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-gray-500">No recent activity to display</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;