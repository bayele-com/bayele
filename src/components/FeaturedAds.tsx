import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Using the same mock data from Classifieds component
const mockClassifieds = [
  {
    id: 1,
    title: "Experienced Driver Needed",
    category: "Jobs",
    location: "Accra",
    description: "Looking for an experienced driver with 5+ years experience",
    price: 2000,
    featured: true,
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: 2,
    title: "House Help Required",
    category: "Jobs",
    location: "Kumasi",
    description: "Seeking reliable house help for daily cleaning and cooking",
    price: 1500,
    featured: true,
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

const FeaturedAds = () => {
  const navigate = useNavigate();
  const featuredAds = mockClassifieds.filter(ad => ad.featured).slice(0, 10);

  const handleCardClick = () => {
    navigate('/classifieds');
  };

  return (
    <section className="py-16 px-4 md:px-8" id="featured-ads">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Featured Ads</h2>
          <button
            onClick={() => navigate('/classifieds')}
            className="text-primary hover:underline"
          >
            View All Classifieds
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAds.map((ad) => (
            <Card
              key={ad.id}
              className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={handleCardClick}
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
    </section>
  );
};

export default FeaturedAds;