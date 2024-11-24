import { useState } from "react";
import SearchFilters from "./classifieds/SearchFilters";
import ClassifiedCard from "./classifieds/ClassifiedCard";

// Mock data moved to a separate file
import { mockClassifieds } from "@/data/mockClassifieds";

const Classifieds = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAds = mockClassifieds.filter((ad) => {
    const matchesCategory = category === "all" || ad.category === category;
    const matchesLocation = location === "all" || ad.location === location;
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  return (
    <section className="py-16 px-4 md:px-8" id="classifieds">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Classifieds</h2>

        <SearchFilters
          searchTerm={searchTerm}
          category={category}
          location={location}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategory}
          onLocationChange={setLocation}
        />

        {/* Featured & Sponsored Ads */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Ads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds
              .filter((ad) => ad.featured)
              .map((ad) => (
                <ClassifiedCard key={ad.id} ad={ad} featured />
              ))}
          </div>
        </div>

        {/* Regular Ads */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Recent Ads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds
              .filter((ad) => !ad.featured)
              .map((ad) => (
                <ClassifiedCard key={ad.id} ad={ad} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classifieds;