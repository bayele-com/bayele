import { Link } from "react-router-dom";
import NavLink from "./NavLink";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const MobileMenu = ({ isOpen, setIsOpen, language, setLanguage }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
        <NavLink to="/how-it-works" onClick={() => setIsOpen(false)}>
          How It Works
        </NavLink>
        <NavLink to="/features" onClick={() => setIsOpen(false)}>
          Features
        </NavLink>
        <NavLink to="/classifieds" onClick={() => setIsOpen(false)}>
          Classifieds
        </NavLink>
        <NavLink to="/login" onClick={() => setIsOpen(false)}>
          Login
        </NavLink>
        <Link
          to="/signup"
          className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90 w-full text-left"
          onClick={() => setIsOpen(false)}
        >
          Get Started
        </Link>
        <div className="px-3 py-2">
          <button
            onClick={() => {
              setLanguage(language === "en" ? "fr" : "en");
              setIsOpen(false);
            }}
            className="flex items-center space-x-2 text-gray-900"
          >
            <span>{language === "en" ? "Français" : "English"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;