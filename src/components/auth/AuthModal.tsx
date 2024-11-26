import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: "sign_in" | "sign_up";
  userType?: string;
}

const AuthModal = ({ isOpen, onClose, defaultView = "sign_in", userType }: AuthModalProps) => {
  const [view, setView] = useState(defaultView);
  const { toast } = useToast();

  const handleAuthError = (error: Error) => {
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: "Invalid email or password. Please try again.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#2563eb",
                  brandAccent: "#1d4ed8",
                },
              },
            },
            className: {
              container: "w-full",
              button: "w-full px-4 py-2 bg-primary text-white rounded",
              input: "w-full px-3 py-2 border rounded",
            },
          }}
          providers={[]}
          redirectTo={window.location.origin}
          onlyThirdPartyProviders={false}
          additionalData={userType ? { user_type: userType } : undefined}
          onError={handleAuthError}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;