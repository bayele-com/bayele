import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Link as LinkIcon,
  DollarSign,
  Settings,
  ShoppingCart,
  FileText,
  Users,
  MessageSquare,
  Eye,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

const Sidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("user_type")
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

      setUserType(data.user_type);
    };

    getProfile();
  }, [user, toast]);

  const getNavLinks = (): NavLink[] => {
    const baseLinks: NavLink[] = [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/settings", label: "Settings", icon: Settings },
    ];

    switch (userType) {
      case "affiliate":
        return [
          ...baseLinks,
          { href: "/products", label: "Products to Promote", icon: Package },
          { href: "/links", label: "My Links", icon: LinkIcon },
          { href: "/earnings", label: "Earnings", icon: DollarSign },
        ];

      case "business":
        return [
          ...baseLinks,
          { href: "/products", label: "My Products", icon: Package },
          { href: "/orders", label: "Orders", icon: ShoppingCart },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];

      case "user":
        return [
          ...baseLinks,
          { href: "/classifieds", label: "My Ads", icon: FileText },
          { href: "/views", label: "Ad Views", icon: Eye },
          { href: "/messages", label: "Messages", icon: MessageSquare },
        ];

      case "admin":
        return [
          ...baseLinks,
          { href: "/users", label: "Users", icon: Users },
          { href: "/products", label: "Products", icon: Package },
          { href: "/classifieds", label: "Classifieds", icon: FileText },
          { href: "/orders", label: "Orders", icon: ShoppingCart },
        ];

      default:
        return baseLinks;
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {getNavLinks().map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === href
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={signOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
