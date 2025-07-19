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
