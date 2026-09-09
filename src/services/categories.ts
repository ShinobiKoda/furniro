import { ENV } from "@/lib/config";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${ENV.API_URL}/categories`, {
    next: { revalidate: 60 } // ISR caching
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchCategoryById(id: number): Promise<Category>{
  const response = await fetch(`${ENV.API_URL}/categories/${id}`, {
    next: {revalidate: 60}
  })

  if(!response.ok){
    throw new Error(`Failed to fech Category: ${response.status}`);
  }

  return response.json();
}