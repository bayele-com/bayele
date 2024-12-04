import { useState, useEffect } from "react";
import { Menu, X, User, House } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NavLink from "./navbar/NavLink";
import LanguageSelector from "./navbar/LanguageSelector";
import MobileMenu from "./navbar/MobileMenu";
import { useAuth } from "./auth/AuthProvider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState("en");
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleLoginClick = () => {
    navigate("/login");
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
            <NavLink to="/houses" className="flex items-center space-x-2">
              <House className="h-4 w-4" />
              <span>Find a House</span>
            </NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/features">Features</NavLink>
            <NavLink to="/classifieds">Classifieds</NavLink>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleLoginClick}
                  className="text-gray-900 hover:text-primary transition-colors"
                >
                  Login
                </Button>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
            
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        language={language}
        setLanguage={setLanguage}
        user={user}
        onSignOut={signOut}
      />
    </nav>
  );
};

export default Navbar;