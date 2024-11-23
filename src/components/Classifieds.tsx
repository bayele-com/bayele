import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Globe, Mail, MessageSquare, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cameroonRegions } from "@/data/locations";
import { Button } from "@/components/ui/button";

// Updated mock data with contact methods and sponsored status
const mockClassifieds = [
  {
    id: 1,
    title: "Experienced Driver Needed",
    category: "Jobs",
    location: "Douala",
    description: "Looking for an experienced driver with 5+ years experience",
    price: 2000,
    featured: true,
    sponsored: true,
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    contact: {
      website: "https://example.com",
      email: "contact@example.com",
      whatsapp: "+237600000000"
    }
  },
  {
    id: 2,
    title: "House Help Required",
    category: "Jobs",
    location: "Kumasi",
    description: "Seeking reliable house help for daily cleaning and cooking",
    price: 1500,
    featured: false,
    date: "2024-02-19",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    id: 3,
    title: "Community Meeting Announcement",
    category: "Announcements",
    location: "Tema",
    description: "Important community meeting this weekend",
    featured: true,
    date: "2024-02-18",
    image: "https://images.unsplash.com/photo-1452960962994-acf4fd70b632",
  },
];

const Classifieds = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Jobs">Jobs</SelectItem>
              <SelectItem value="Announcements">Announcements</SelectItem>
              <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {cameroonRegions.map((loc) => (
                <SelectItem key={loc.region} value={loc.capital}>
                  {loc.capital}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured & Sponsored Ads */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Ads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds
              .filter((ad) => ad.featured)
              .map((ad) => (
                <Card
                  key={ad.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {ad.sponsored && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">Sponsored</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{ad.title}</h4>
                      <p className="text-gray-600 mb-4">{ad.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>{ad.category}</span>
                        <span>{ad.location}</span>
                      </div>
                      {ad.contact && (
                        <div className="flex gap-2 mt-4">
                          {ad.contact.website && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(ad.contact.website, '_blank')}
                            >
                              <Globe className="w-4 h-4 mr-2" />
                              Website
                            </Button>
                          )}
                          {ad.contact.email && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.location.href = `mailto:${ad.contact.email}`}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </Button>
                          )}
                          {ad.contact.whatsapp && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleWhatsAppClick(ad.contact.whatsapp)}
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              WhatsApp
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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
                <Card
                  key={ad.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{ad.title}</h4>
                      <p className="text-gray-600 mb-4">{ad.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{ad.category}</span>
                        <span>{ad.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Classifieds;
