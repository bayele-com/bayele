import { Button } from "@/components/ui/button";
import { MessageSquare, Phone } from "lucide-react";

interface ClassifiedContactProps {
  contactInfo: {
    whatsapp?: string;
    phone?: string;
  };
}

const ClassifiedContact = ({ contactInfo }: ClassifiedContactProps) => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  return (
    <div className="flex gap-2 mt-4">
      {contactInfo.whatsapp && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleWhatsAppClick(contactInfo.whatsapp!)}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          WhatsApp
        </Button>
      )}
      {contactInfo.phone && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePhoneClick(contactInfo.phone!)}
        >
          <Phone className="w-4 h-4 mr-2" />
          Phone
        </Button>
      )}
    </div>
  );
};

export default ClassifiedContact;