export interface FurnitureDetails{
  id: number;
  name: string
  description: string;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_url: string;
}