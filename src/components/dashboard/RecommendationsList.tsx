import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import RecommendationCard from "./RecommendationCard";
import { generateRecommendations } from "@/services/recommendationService";
import { Skeleton } from "@/components/ui/skeleton";

const RecommendationsList = () => {
  const { user } = useAuth();

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  if (isProfileLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  const recommendations = generateRecommendations(
    profile?.user_type || "user",
    profile
  );

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
          onAction={() => {
            // Handle action based on recommendation category
            switch (recommendation.category) {
              case "Profile":
                window.location.href = "/settings";
                break;
              case "Listings":
                window.location.href = "/houses";
                break;
              case "Earnings":
                window.location.href = "/earnings";
                break;
              default:
                window.location.href = "/dashboard";
            }
          }}
        />
      ))}
    </div>
  );
};

export default RecommendationsList;