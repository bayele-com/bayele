import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RecommendationCard from "./RecommendationCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock recommendations for testing
const mockRecommendations = [
  {
    id: "1",
    title: "Complete Your Profile",
    description: "Add your contact information and profile picture to increase trust with potential clients.",
    priority: "high",
    category: "Profile",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Add Property Images",
    description: "Properties with high-quality images receive 2x more inquiries.",
    priority: "medium",
    category: "Listings",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Verify Your Account",
    description: "Verified accounts receive preferential placement in search results.",
    priority: "high",
    category: "Account",
    createdAt: new Date().toISOString(),
  },
] as const;

const RecommendationsList = () => {
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      // In production, this would fetch from the backend
      return mockRecommendations;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations?.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
        />
      ))}
    </div>
  );
};

export default RecommendationsList;