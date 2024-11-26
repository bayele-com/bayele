import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import LanguageSelector from "./LanguageSelector";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const MobileMenu = ({ isOpen, setIsOpen, language, setLanguage }: MobileMenuProps) => {
  if (!isOpen) return null;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
        <NavLink to="/how-it-works" onClick={handleLinkClick}>
          How It Works
        </NavLink>
        <NavLink to="/features" onClick={handleLinkClick}>
          Features
        </NavLink>
        <NavLink to="/classifieds" onClick={handleLinkClick}>
          Classifieds
        </NavLink>
        <NavLink to="/signup" onClick={handleLinkClick}>
          Login
        </NavLink>
        <Link
          to="/signup"
          className="block bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary/90 w-full text-left"
          onClick={handleLinkClick}
        >
          Get Started
        </Link>
        <LanguageSelector 
          language={language} 
          setLanguage={setLanguage} 
          isMobile={true} 
        />
      </div>
    </div>
  );
};

export default MobileMenu;