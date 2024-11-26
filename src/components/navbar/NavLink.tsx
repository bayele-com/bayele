import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ to, children, className = "", onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block transition-colors px-3 py-2 text-sm font-medium ${
        isActive 
          ? "text-primary" 
          : "text-gray-900 hover:text-primary"
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;