import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading properties",
      description: "Please try again later",
    });
  }

  if (isLoading) {
    return (
      <section className="py-12 px-4 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Featured Rentals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 md:py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
          Featured Rentals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {properties?.map((property) => (
            <Card 
              key={property.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/houses/${property.id}`)}
            >
              <div className="aspect-video relative">
                <img
                  src={property.image_urls?.[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-sm">
                  {property.property_type}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
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
      </div>
    </section>
  );
};

export default FeaturedRentals;