import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import HouseCard from "@/components/houses/HouseCard";
import SearchFilters from "@/components/houses/SearchFilters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Json } from "@/integrations/supabase/types";

interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
}

interface HouseData {
  id: string;
  title: string;
  location: string | null;
  price: number;
  image_urls: string[] | null;
  subcategory: string | null;
  contact_info: ContactInfo;
}

const Houses = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: houses, isLoading, error } = useQuery({
    queryKey: ['houses', location, priceRange, propertyType],
    queryFn: async () => {
      let query = supabase
        .from('classified_ads')
        .select('*')
        .eq('category', 'housing')
        .eq('status', 'published');

      if (location) {
        query = query.ilike('location', `%${location}%`);
      }

      if (propertyType) {
        query = query.eq('subcategory', propertyType);
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
          title: "Error fetching houses",
          description: error.message
        });
        throw error;
      }
      
      return data as HouseData[];
    }
  });

  const handleContactClick = (id: string) => {
    setSelectedHouseId(id);
  };

  const handleSearch = () => {
    // The search will be triggered automatically by the useQuery hook
    // when the dependencies change
  };

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load houses. Please try again later."
    });
  }

  const selectedHouse = houses?.find(house => house.id === selectedHouseId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Rental Home
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our curated selection of rental properties
          </p>
        </div>

        <SearchFilters
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          onSearch={handleSearch}
        />

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
                location={house.location || ""}
                price={Number(house.price)}
                imageUrl={house.image_urls?.[0]}
                propertyType={house.subcategory || ""}
                onContactClick={handleContactClick}
              />
            ))}
          </div>
        )}
      </main>

      <Dialog open={!!selectedHouseId} onOpenChange={() => setSelectedHouseId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedHouse?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Contact information:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              {selectedHouse?.contact_info && (
                <>
                  {selectedHouse.contact_info.phone && (
                    <p className="font-medium">Phone: {selectedHouse.contact_info.phone}</p>
                  )}
                  {selectedHouse.contact_info.email && (
                    <p className="font-medium">Email: {selectedHouse.contact_info.email}</p>
                  )}
                  {selectedHouse.contact_info.whatsapp && (
                    <p className="font-medium">WhatsApp: {selectedHouse.contact_info.whatsapp}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Houses;