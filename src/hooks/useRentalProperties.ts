import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { RentalProperty } from "@/types/house";

interface UseRentalPropertiesProps {
  location: string;
  priceRange: string;
  propertyType: string;
}

export const useRentalProperties = ({ location, priceRange, propertyType }: UseRentalPropertiesProps) => {
  const { toast } = useToast();

  return useQuery({
    queryKey: ['houses', location, priceRange, propertyType],
    queryFn: async () => {
      try {
        let query = supabase
          .from('rental_properties')
          .select(`
            *,
            neighborhood:neighborhoods(name, city)
          `)
          .eq('status', 'available');

        if (location && (location === 'Yaounde' || location === 'Douala')) {
          query = query.eq('city', location);
        }

        if (propertyType) {
          query = query.eq('property_type', propertyType);
        }

        if (priceRange) {
          const [min, max] = priceRange.split('-').map(Number);
          if (max) {
            query = query.gte('price', min).lte('price', max);
          } else {
            query = query.gte('price', min);
          }
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        return data as (RentalProperty & {
          neighborhood: { name: string; city: string };
        })[];
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error loading properties",
          description: error.message || "Please try again later",
        });
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // Data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 15, // Keep unused data in cache for 15 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
};