import { ArrowRight, MegaphoneIcon, ListChecks, MessageSquare, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:24px] md:bg-[size:40px] bg-[position:center] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px] md:bg-[size:40px] bg-[position:center] mix-blend-overlay" />
      </div>
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div className="space-y-8 animate-fade-up text-center">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto">
            Rent, Sell, Earn—
            <span className="text-primary">All from Your Phone</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
            Discover rental homes, promote products, and earn effortlessly on our mobile-optimized platform.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 max-w-4xl mx-auto">
            <Link
              to="/houses"
              className="glass-card hover-scale p-4 md:p-6 rounded-xl flex flex-col items-center text-center space-y-2 md:space-y-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">Find a House</h3>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">Browse available rentals</p>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </Link>
            
            <Link
              to="/post-classified"
              className="glass-card hover-scale p-4 md:p-6 rounded-xl flex flex-col items-center text-center space-y-2 md:space-y-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MegaphoneIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">Post an Ad</h3>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">List your property</p>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </Link>
            
            <Link
              to="/signup?type=business"
              className="glass-card hover-scale p-4 md:p-6 rounded-xl flex flex-col items-center text-center space-y-2 md:space-y-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ListChecks className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">List and Sell</h3>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">Create business profile</p>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </Link>
            
            <Link
              to="/signup?type=affiliate"
              className="glass-card hover-scale p-4 md:p-6 rounded-xl flex flex-col items-center text-center space-y-2 md:space-y-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">Become Affiliate</h3>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">Start earning today</p>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;