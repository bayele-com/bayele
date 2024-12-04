import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuthState = () => {
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

        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            switch (event) {
              case 'SIGNED_OUT':
                setUser(null);
                setSession(null);
                navigate('/login');
                toast({ title: "Signed out successfully" });
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

  return { user, session, isLoading, isError, setUser, setSession };
};