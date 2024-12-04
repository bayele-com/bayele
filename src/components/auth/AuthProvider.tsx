import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const protectedRoutes = ['/dashboard', '/products', '/orders', '/post-classified', '/links'];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

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
            switch (event) {
              case 'SIGNED_OUT':
                setUser(null);
                setSession(null);
                navigate('/login');
                toast({
                  title: "Signed out successfully",
                });
                break;
              case 'SIGNED_IN':
                if (currentSession) {
                  const returnTo = location.state?.from || '/dashboard';
                  navigate(returnTo);
                  toast({
                    title: "Signed in successfully",
                    description: `Welcome back${currentSession.user.email ? `, ${currentSession.user.email}` : ''}!`,
                  });
                }
                break;
              case 'USER_UPDATED':
                toast({
                  title: "Profile updated",
                  description: "Your profile has been updated successfully.",
                });
                break;
              case 'PASSWORD_RECOVERY':
                toast({
                  title: "Password recovery email sent",
                  description: "Please check your email to reset your password.",
                });
                break;
            }
          }
        });

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error: any) {
        console.error('Auth error:', error);
        if (mounted) {
          setIsError(true);
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: error.message || "Failed to initialize session",
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initSession();
  }, [navigate, location.state, toast]);

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
    isError,
  };

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">There was a problem initializing the authentication system.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        children
      )}
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