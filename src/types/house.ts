export type City = 'Yaounde' | 'Douala';

export interface District {
  id: string;
  name: string;
  city: City;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: City;
  district_id?: string;
}

export interface RentalProperty {
  id: string;
  title: string;
  description: string;
  property_type: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  city: City;
  neighborhood_id: string;
  address?: string;
  image_urls: string[];
  contact_info: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  features?: Record<string, any>;
  status: string;
  user_id?: string;
}