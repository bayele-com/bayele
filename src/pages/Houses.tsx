import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import HouseCard from "@/components/houses/HouseCard";
import SearchFilters from "@/components/houses/SearchFilters";
import ContactDialog from "@/components/houses/ContactDialog";
import type { RentalProperty } from "@/types/house";

const Houses = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: houses, isLoading } = useQuery({
    queryKey: ['houses', location, priceRange, propertyType],
    queryFn: async () => {
      let query = supabase
        .from('rental_properties')
        .select(`
          *,
          neighborhood:neighborhoods(name, city)
        `)
        .eq('status', 'available');

      // Only add city filter if a valid city is selected
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
        toast({
          variant: "destructive",
          title: "Error loading properties",
          description: "Please try again later",
        });
        throw error;
      }

      return data as (RentalProperty & {
        neighborhood: { name: string; city: string };
      })[];
    }
  });

  const handleContactClick = (id: string) => {
    setSelectedHouseId(id);
  };

  const handleSearch = () => {
    // The search will be triggered automatically by the useQuery hook
  };

  const selectedHouse = houses?.find(house => house.id === selectedHouseId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our curated selection of rental properties in Yaoundé and Douala
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-8">
          <SearchFilters
            location={location}
            setLocation={setLocation}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            onSearch={handleSearch}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses?.map((house) => (
              <HouseCard
                key={house.id}
                id={house.id}
                title={house.title}
                location={house.neighborhood.name}
                price={house.price}
                imageUrl={house.image_urls?.[0]}
                propertyType={house.property_type}
                onContactClick={handleContactClick}
              />
            ))}
          </div>
        )}
      </main>

      <ContactDialog
        isOpen={!!selectedHouseId}
        onOpenChange={() => setSelectedHouseId(null)}
        title={selectedHouse?.title}
        contactInfo={selectedHouse?.contact_info}
      />

      <Footer />
    </div>
  );
};

export default Houses;