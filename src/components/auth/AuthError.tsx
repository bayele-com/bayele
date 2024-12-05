import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

export const AuthError = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Alert variant="destructive" className="max-w-md w-full">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication Error</AlertTitle>
        <AlertDescription className="mt-4 space-y-4">
          <p className="text-sm">
            There was a problem authenticating your account. This could be due to:
          </p>
          <ul className="text-sm list-disc pl-4 space-y-1">
            <li>An expired session</li>
            <li>Network connectivity issues</li>
            <li>Invalid credentials</li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleRetry}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Try again
            </Button>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};