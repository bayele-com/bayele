import { ArrowRight, MegaphoneIcon, ListChecks, MessageSquare, Home } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] mix-blend-overlay" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="space-y-8 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Rent, Sell, Promote,{" "}
            <span className="text-primary">and Earn with Ease</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Discover rental homes, promote products, share ads, and earn effortlessly on the most intuitive platform.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Link
              to="/houses"
              className="glass-card hover-scale p-6 rounded-xl flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Find a House</h3>
              <p className="text-sm text-gray-600">Browse available rentals</p>
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
            
            <Link
              to="/post-classified"
              className="glass-card hover-scale p-6 rounded-xl flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MegaphoneIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Post an Ad</h3>
              <p className="text-sm text-gray-600">List your property or classified</p>
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
            
            <Link
              to="/signup?type=business"
              className="glass-card hover-scale p-6 rounded-xl flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ListChecks className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">List and Sell</h3>
              <p className="text-sm text-gray-600">Create your business profile</p>
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
            
            <Link
              to="/signup?type=affiliate"
              className="glass-card hover-scale p-6 rounded-xl flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Become an Affiliate</h3>
              <p className="text-sm text-gray-600">Start earning today</p>
              <ArrowRight className="w-5 h-5 text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;