import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Houses = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
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
      
      return data;
    }
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load houses. Please try again later."
    });
  }

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

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
                aria-label="Location search"
              />
            </div>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger aria-label="Select price range">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-50000">0 - 50,000 FCFA</SelectItem>
                <SelectItem value="50000-100000">50,000 - 100,000 FCFA</SelectItem>
                <SelectItem value="100000-200000">100,000 - 200,000 FCFA</SelectItem>
                <SelectItem value="200000">200,000+ FCFA</SelectItem>
              </SelectContent>
            </Select>

            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger aria-label="Select property type">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="room">Single Room</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" size="lg">
            <Search className="mr-2 h-5 w-5" />
            Search Properties
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses?.map((house) => (
              <div key={house.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-100">
                  {house.image_urls?.[0] && (
                    <img 
                      src={house.image_urls[0]} 
                      alt={house.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{house.title}</h3>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{house.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <Home className="h-4 w-4 mr-1" />
                    <span>{house.subcategory}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">
                      {Number(house.price).toLocaleString()} FCFA/month
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Houses;