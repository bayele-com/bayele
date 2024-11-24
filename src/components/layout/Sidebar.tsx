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
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const affiliateLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/products", label: "Products to Promote", icon: Package },
    { href: "/links", label: "My Links", icon: LinkIcon },
    { href: "/earnings", label: "Earnings", icon: DollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const businessLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/products", label: "My Products", icon: Package },
    { href: "/orders", label: "Orders", icon: ShoppingCart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const userLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/classifieds", label: "My Classifieds", icon: FileText },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const adminLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/users", label: "Users", icon: Users },
    { href: "/products", label: "Products", icon: Package },
    { href: "/classifieds", label: "Classifieds", icon: FileText },
    { href: "/orders", label: "Orders", icon: ShoppingCart },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  // TODO: Get user type from profile and show appropriate links
  const links = affiliateLinks;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
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