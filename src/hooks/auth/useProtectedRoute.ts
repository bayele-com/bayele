import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

export const protectedRoutes = ['/dashboard', '/products', '/orders', '/links'];

export const useProtectedRoute = (user: User | null, isLoading: boolean) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && !user && protectedRoutes.some(route => location.pathname.startsWith(route))) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to access this page",
      });
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, location.pathname, isLoading, navigate, toast]);
};