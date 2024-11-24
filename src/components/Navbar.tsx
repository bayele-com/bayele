import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/ad68881a-e358-4d27-8f08-09d76c4de1ff.png"
                alt="Bayele"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/how-it-works"
              className="text-gray-900 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
            >
              How It Works
            </Link>
            <Link
              to="/features"
              className="text-gray-900 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
            >
              Features
            </Link>
            <Link
              to="/classifieds"
              className="text-gray-900 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
            >
              Classifieds
            </Link>
            <Link
              to="/login"
              className="text-gray-900 hover:text-primary transition-colors px-3 py-2 text-sm font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-900">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{language === "en" ? "EN" : "FR"}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <button
              onClick={() => handleNavigation("/how-it-works")}
              className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavigation("/features")}
              className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => handleNavigation("/classifieds")}
              className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Classifieds
            </button>
            <button
              onClick={() => handleNavigation("/login")}
              className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("/signup")}
              className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90 w-full text-left"
            >
              Get Started
            </button>
            <div className="px-3 py-2">
              <button
                onClick={() => {
                  setLanguage(language === "en" ? "fr" : "en");
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-900"
              >
                <Globe className="w-4 h-4" />
                <span>{language === "en" ? "Français" : "English"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;