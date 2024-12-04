import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HouseFooterProps {
  price: number;
  onContactClick: () => void;
}

const HouseFooter = ({ price, onContactClick }: HouseFooterProps) => {
  const formatPrice = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="p-4 pt-0 flex justify-between items-center">
      <div className="text-lg font-semibold text-primary">
        {formatPrice(price)}
        <span className="text-sm text-gray-500 font-normal">/month</span>
      </div>
      <Button 
        onClick={onContactClick}
        size="sm"
        className="flex items-center gap-1"
      >
        <MessageSquare className="h-4 w-4" />
        Contact
      </Button>
    </div>
  );
};

export default HouseFooter;