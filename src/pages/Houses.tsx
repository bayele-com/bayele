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

// Sample data for development
const sampleListings: HouseData[] = [
  {
    id: "1",
    title: "Modern Studio Apartment in Bastos",
    location: "Bastos, Yaoundé",
    price: 150000,
    image_urls: ["https://images.unsplash.com/photo-1524230572899-a752b3835840"],
    subcategory: "studio",
    contact_info: {
      whatsapp: "+237670000001",
    }
  },
  {
    id: "2",
    title: "Spacious 3-Bedroom House in Bonanjo",
    location: "Bonanjo, Douala",
    price: 300000,
    image_urls: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625"],
    subcategory: "house",
    contact_info: {
      whatsapp: "+237670000002",
    }
  },
  {
    id: "3",
    title: "Cozy Single Room in Mvan",
    location: "Mvan, Yaoundé",
    price: 45000,
    image_urls: ["https://images.unsplash.com/photo-1721322800607-8c38375eef04"],
    subcategory: "room",
    contact_info: {
      whatsapp: "+237670000003",
    }
  },
];

const Houses = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: houses, isLoading } = useQuery({
    queryKey: ['houses', location, priceRange, propertyType],
    queryFn: async () => {
      // In development, return filtered sample data
      let filteredHouses = [...sampleListings];
      
      if (location) {
        filteredHouses = filteredHouses.filter(house => 
          house.location?.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (propertyType) {
        filteredHouses = filteredHouses.filter(house => 
          house.subcategory === propertyType
        );
      }

      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filteredHouses = filteredHouses.filter(house => {
          if (max) {
            return house.price >= min && house.price <= max;
          }
          return house.price >= min;
        });
      }

      return filteredHouses;
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