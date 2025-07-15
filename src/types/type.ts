export interface FurnitureProps{
  id: number;
  name: string
  description: string;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_url: string;
  tag: string;
  new?: string;
}