export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  commission_rate: number;
  category: string;
  status: string;
  image_urls: string[];
}