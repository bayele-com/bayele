import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedRentals from "../components/FeaturedRentals";
import FeaturedAds from "../components/FeaturedAds";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedRentals />
      <FeaturedAds />
      <Footer />
    </main>
  );
};

export default Index;