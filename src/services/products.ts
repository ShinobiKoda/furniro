import { PaginatedResponse } from "@/types/type";
import { ENV } from "@/lib/config";
import { Category } from "./categories";

export interface Product{
    id: number;
    category_id: number;
    category: Category | null;
    name: string;
    slug: string;
    sku: string;
    price: number;
    stock: number;
    is_active: boolean;
    short_description: string;
    image_url: string | null;
    compare_at_price: number | null;
    description: string | null;
    is_featured: boolean;
    material?: string;
    dimensions?: string;
}



export async function fetchProducts(): Promise<PaginatedResponse<Product>>{
    const response = await fetch(`${ENV.API_URL}/products`, {
    next: { revalidate: 60 } // ISR caching
  });
    if(!response.ok){
        throw new Error(`Failed to fetch Products: ${response.status}`);
    }

  return response.json();
}

export async function fetchProductBySlug(slug: string): Promise<Product>{
    const response = await fetch(`${ENV.API_URL}/products/${slug}`, {
        next: {revalidate: 60}
    });

    if(!response.ok){
        throw new Error(`Failed to fetch Product: ${response.status}`)
    }


    return response.json();
}