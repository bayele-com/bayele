import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedRentals from "../components/FeaturedRentals";
import FeaturedAds from "../components/FeaturedAds";
import Footer from "../components/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <ErrorBoundary>
        <Navbar />
        <Hero />
        <div className="flex-grow">
          <FeaturedRentals />
          <FeaturedAds />
        </div>
        <Footer />
      </ErrorBoundary>
    </main>
  );
};

export default Index;