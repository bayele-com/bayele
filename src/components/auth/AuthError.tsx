import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const AuthError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Alert variant="destructive" className="max-w-md w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription className="mt-2 space-y-4">
          <p className="text-sm">
            There was a problem authenticating your account. Please try again.
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleRetry}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Try again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};