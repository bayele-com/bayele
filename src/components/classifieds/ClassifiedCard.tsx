import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Mail, MessageSquare, Star } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface ClassifiedAd {
  id: string;
  title: string;
  category: string;
  location: string | null;
  description: string;
  price?: number;
  featured?: boolean;
  image_urls?: string[] | null;
  contact_info: Json;
  created_at: string;
}

interface ClassifiedCardProps {
  ad: ClassifiedAd;
  featured?: boolean;
}

const ClassifiedCard = ({ ad, featured }: ClassifiedCardProps) => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  const contactInfo = ad.contact_info as {
    website?: string;
    email?: string;
    whatsapp?: string;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={ad.image_urls?.[0] || '/placeholder.svg'}
            alt={ad.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span className="text-sm">Featured</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-2">{ad.title}</h4>
          <p className="text-gray-600 mb-4">{ad.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span>{ad.category}</span>
            <span>{ad.location}</span>
          </div>
          {contactInfo && (
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
              {contactInfo.email && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = `mailto:${contactInfo.email}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassifiedCard;