import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-gray-600">Loading your content...</p>
      </div>
    </div>
  );
};