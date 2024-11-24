import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LinkList from "@/components/links/LinkList";

interface AffiliateLink {
  id: string;
  unique_code: string;
  status: string;
  created_at: string;
  product: {
    name: string;
    price: number;
    commission_rate: number;
  };
  analytics: {
    clicks: number;
    conversions: number;
  };
}

const Links = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: links, isLoading } = useQuery({
    queryKey: ["affiliate-links"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("affiliate_links")
        .select(`
          id,
          unique_code,
          status,
          created_at,
          products (
            name,
            price,
            commission_rate
          ),
          link_analytics (
            id
          )
        `)
        .eq("affiliate_id", user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching links",
          description: error.message,
        });
        throw error;
      }

      // Transform the data to include analytics counts
      return data.map((link) => ({
        ...link,
        analytics: {
          clicks: Array.isArray(link.link_analytics) ? link.link_analytics.length : 0,
          conversions: 0, // We'll implement this later
        },
      })) as AffiliateLink[];
    },
  });

  const filteredLinks = links?.filter((link) =>
    link.product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Links</h1>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="Search links..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading links...</p>
          </div>
        ) : filteredLinks?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No links found</p>
            <p className="text-sm text-gray-400 mt-2">
              Start by promoting products from the Products page
            </p>
          </div>
        ) : (
          <LinkList links={filteredLinks || []} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Links;