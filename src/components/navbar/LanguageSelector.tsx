import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
  isMobile?: boolean;
}

const LanguageSelector = ({ language, setLanguage, isMobile = false }: LanguageSelectorProps) => {
  if (isMobile) {
    return (
      <div className="px-3 py-2">
        <button
          onClick={() => setLanguage(language === "en" ? "fr" : "en")}
          className="flex items-center space-x-2 text-gray-900"
        >
          <Globe className="w-4 h-4" />
          <span>{language === "en" ? "Français" : "English"}</span>
        </button>
      </div>
    );
  }

  return (
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
  );
};

export default LanguageSelector;