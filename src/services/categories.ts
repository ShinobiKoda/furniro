export interface Category {
  id: number;
  name: string;
  slug: string;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('http://127.0.0.1:8000/api/categories', {
    next: { revalidate: 60 } // ISR caching
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
}