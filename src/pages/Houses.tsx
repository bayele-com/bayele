import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/houses/ContactDialog";
import PropertyList from "@/components/houses/PropertyList";
import { useRentalProperties } from "@/hooks/useRentalProperties";
import HouseHeader from "@/components/houses/HouseHeader";
import HouseSearchSection from "@/components/houses/HouseSearchSection";
import Breadcrumb from "@/components/navigation/Breadcrumb";

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

  const breadcrumbItems = [
    { label: "Properties", href: "/houses" },
    ...(location ? [{ label: location }] : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <HouseHeader />
        <HouseSearchSection
          location={location}
          setLocation={setLocation}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          propertyType={propertyType}
          setPropertyType={setPropertyType}
          onSearch={handleSearch}
        />
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