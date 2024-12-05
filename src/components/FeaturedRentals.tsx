import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const FeaturedRentals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["featured-rentals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rental_properties")
        .select(`
          *,
          neighborhood: neighborhoods(
            name,
            city
          )
        `)
        .eq("status", "available")
        .limit(12);

      if (error) throw error;
      return data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    console.error("FeaturedRentals error:", error);
    toast({
      variant: "destructive",
      title: "Error loading properties",
      description: "Please try again later",
    });
    return null;
  }

  return (
    <section className="py-8 px-4 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 lg:mb-12">
          Featured Rentals
        </h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {properties?.map((property) => (
              <Card 
                key={property.id} 
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/houses/${property.id}`)}
              >
                <div className="aspect-video relative bg-gray-100">
                  <img
                    src={property.image_urls?.[0] || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded text-sm">
                    {property.property_type}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base md:text-lg mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {property.neighborhood?.name}, {property.neighborhood?.city}
                  </p>
                  <p className="text-primary font-semibold">
                    {property.price.toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'XAF' 
                    })}
                    <span className="text-gray-500 font-normal">/month</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedRentals;