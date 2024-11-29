import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const protectedRoutes = ['/dashboard', '/products', '/orders', '/post-classified', '/links'];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Initialize session
    const initSession = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }

        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            // Handle auth events
            if (event === 'SIGNED_OUT') {
              setUser(null);
              setSession(null);
              navigate('/login');
            } else if (event === 'SIGNED_IN' && currentSession) {
              const returnTo = location.state?.from || '/dashboard';
              navigate(returnTo);
            }
          }
        });

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error('Auth error:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message || "Failed to initialize session",
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initSession();

    return () => {
      mounted = false;
    };
  }, [navigate, location.state, toast]);

  useEffect(() => {
    if (!isLoading && !user && protectedRoutes.includes(location.pathname)) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to access this page",
      });
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [user, location.pathname, isLoading, navigate, toast]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const value = {
    user,
    session,
    signOut,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
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