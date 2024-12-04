import { Button } from "@/components/ui/button";
import { Globe, Mail, MessageSquare } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ClassifiedContactProps {
  contactInfo: {
    website?: string;
    email?: string;
    whatsapp?: string;
  };
}

const ClassifiedContact = ({ contactInfo }: ClassifiedContactProps) => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <div className="flex gap-2 mt-4">
      {contactInfo.website && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(contactInfo.website, '_blank')}
        >
          <Globe className="w-4 h-4 mr-2" />
          Website
        </Button>
      )}
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
    </div>
  );
};

export default ClassifiedContact;