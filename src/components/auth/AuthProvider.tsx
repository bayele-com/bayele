import { createContext, useContext, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "@/hooks/auth/useAuthState";
import { useProtectedRoute } from "@/hooks/auth/useProtectedRoute";
import { AuthError } from "./AuthError";
import { LoadingScreen } from "./LoadingScreen";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, session, isLoading, isError } = useAuthState();
  const { toast } = useToast();
  const navigate = useNavigate();

  useProtectedRoute(user, isLoading);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
        toast({
          title: "Signed out",
          description: "You have been signed out successfully",
        });
      } else if (event === 'SIGNED_IN' && currentSession) {
        const returnTo = localStorage.getItem('returnTo') || '/dashboard';
        localStorage.removeItem('returnTo');
        navigate(returnTo);
        toast({
          title: "Welcome back",
          description: `Signed in as ${currentSession.user.email}`,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  if (isError) {
    return <AuthError />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ user, session, signOut, isLoading, isError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};