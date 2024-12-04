import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  createdAt: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onAction?: () => void;
}

const RecommendationCard = ({ recommendation, onAction }: RecommendationCardProps) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{recommendation.title}</CardTitle>
        <Badge className={priorityColors[recommendation.priority]}>
          {recommendation.priority}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{recommendation.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4" />
            <span>{recommendation.category}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4" />
            <span>{new Date(recommendation.createdAt).toLocaleDateString()}</span>
          </div>
          {onAction && (
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={onAction}
            >
              Take Action
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;