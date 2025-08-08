export interface FurnitureProps {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number | null;
  discount_percent?: number | null;
  image_url: string;
  tag: string;
  new?: string;
  furniture_details: FurnitureDetails | null;
}

export interface FurnitureDetails{
  short_description: string
  full_description: string
  sales_package: string;
  model_number: string
  secondary_material: string;
  config: string;
  upholstery_material: string
  upholstery_color: string
  filling_material: string;
  finish_type: string
  maximum_load_capacity: string;
  origin_of_manufacture: string
  width: string
  height: string
  depth: string
  weight: string
  seat_height?: string;
  leg_height?: string;
  warranty_summary: string
  covered_in_warranty: string
  not_covered_in_warranty: string
  domestic_warranty: string
  review: number;
  sku: string
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  capital?: string[];
  region: string;
  subregion: string;
  population: number;
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
}

export interface FetchCountriesResponse {
  success: boolean;
  data?: Country[];
  error?: string;
}
