import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px] bg-[position:center] mix-blend-overlay" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="space-y-8 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Earn More,{" "}
            <span className="text-primary">Do Less.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Promote products, share ads, and earn effortlessly on the most intuitive platform for digital entrepreneurs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              to="/signup?type=affiliate"
              className="glass-card hover-scale inline-flex items-center px-6 py-3 rounded-full text-primary"
            >
              Promote and Earn
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/signup?type=business"
              className="glass-card hover-scale inline-flex items-center px-6 py-3 rounded-full text-primary"
            >
              List and Sell
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            
            <Link
              to="/signup?type=classified"
              className="glass-card hover-scale inline-flex items-center px-6 py-3 rounded-full text-primary"
            >
              Post Ads
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;