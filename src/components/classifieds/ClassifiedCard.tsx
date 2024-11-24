import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Mail, MessageSquare, Star } from "lucide-react";

interface ClassifiedAd {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  price?: number;
  featured?: boolean;
  sponsored?: boolean;
  date: string;
  image: string;
  contact?: {
    website?: string;
    email?: string;
    whatsapp?: string;
  };
}

interface ClassifiedCardProps {
  ad: ClassifiedAd;
  featured?: boolean;
}

const ClassifiedCard = ({ ad, featured }: ClassifiedCardProps) => {
  const handleWhatsAppClick = (phone: string) => {
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {ad.sponsored && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span className="text-sm">Sponsored</span>
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
          {ad.contact && (
            <div className="flex gap-2 mt-4">
              {ad.contact.website && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(ad.contact!.website, '_blank')}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Button>
              )}
              {ad.contact.email && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = `mailto:${ad.contact!.email}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              )}
              {ad.contact.whatsapp && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhatsAppClick(ad.contact!.whatsapp)}
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