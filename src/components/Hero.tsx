import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 md:py-24">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 -z-10"
        aria-hidden="true"
      />
      
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Find Your Perfect Home in
          <span className="text-gradient block mt-2">Cameroon</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
          Discover apartments, houses, and more. Get connected with the best realtors
          and find your next home with ease.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/houses">
            <Button size="lg" className="w-full sm:w-auto">
              Browse Properties
            </Button>
          </Link>
          <Link to="/post-classified">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Post an Ad
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;