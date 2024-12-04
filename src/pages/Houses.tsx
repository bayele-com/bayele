import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/houses/SearchFilters";
import ContactDialog from "@/components/houses/ContactDialog";
import { SearchCommand } from "@/components/houses/SearchCommand";
import PropertyList from "@/components/houses/PropertyList";
import { useRentalProperties } from "@/hooks/useRentalProperties";

const Houses = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);

  const { data: houses, isLoading } = useRentalProperties({
    location,
    priceRange,
    propertyType,
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
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-lg text-gray-600">
            Browse through our curated selection of rental properties in Yaoundé and Douala
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-8 space-y-4">
          <SearchCommand onSelect={setLocation} />
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

        <PropertyList
          houses={houses}
          isLoading={isLoading}
          onContactClick={handleContactClick}
        />
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