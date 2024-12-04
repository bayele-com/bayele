import { Card, CardContent } from "@/components/ui/card";
import { Json } from "@/integrations/supabase/types";
import ClassifiedImage from "./card/ClassifiedImage";
import ClassifiedDetails from "./card/ClassifiedDetails";
import ClassifiedContact from "./card/ClassifiedContact";

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
  const contactInfo = ad.contact_info as {
    whatsapp?: string;
    phone?: string;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <ClassifiedImage
          imageUrl={ad.image_urls?.[0]}
          title={ad.title}
          featured={featured}
        />
        <ClassifiedDetails
          title={ad.title}
          description={ad.description}
          category={ad.category}
          location={ad.location}
        />
        <div className="px-6 pb-6">
          <ClassifiedContact contactInfo={contactInfo} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClassifiedCard;