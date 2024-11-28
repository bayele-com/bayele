import { useState } from "react";
import SearchFilters from "./classifieds/SearchFilters";
import ClassifiedCard from "./classifieds/ClassifiedCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Classifieds = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: ads, isLoading } = useQuery({
    queryKey: ["classifieds"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("classified_ads")
        .select("*")
        .eq("status", "published");

      if (error) throw error;
      return data;
    },
  });

  const filteredAds = ads?.filter((ad) => {
    const matchesCategory = category === "all" || ad.category === category;
    const matchesLocation = location === "all" || ad.location === location;
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  if (isLoading) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredAds = filteredAds?.filter((ad) => ad.featured) || [];
  const regularAds = filteredAds?.filter((ad) => !ad.featured) || [];

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

        {featuredAds.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Featured Ads</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAds.map((ad) => (
                <ClassifiedCard key={ad.id} ad={ad} featured />
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-semibold mb-6">Recent Ads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularAds.map((ad) => (
              <ClassifiedCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classifieds;