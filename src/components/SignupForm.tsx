import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import AuthModal from "./auth/AuthModal";
import { useToast } from "@/hooks/use-toast";

interface SignupFormProps {
  userType: string;
  onBack: () => void;
}

const SignupForm = ({ userType, onBack }: SignupFormProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleClose = () => {
    setIsAuthModalOpen(false);
    navigate("/signup");
  };

  return (
    <div className="max-w-md mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to user types
      </Button>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleClose}
        defaultView="sign_up"
        userType={userType}
      />
    </div>
  );
};

export default SignupForm;