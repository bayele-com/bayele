import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import AuthModal from "@/components/auth/AuthModal";

const Login = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAuthModalOpen(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        className="mb-8"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to your account
          </p>
        </div>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={handleClose}
          defaultView="sign_in"
        />
      </div>
    </div>
  );
};

export default Login;