export interface Product{
    id: number;
    category_id: number;
    name: string;
    slug: string;
    sku: string;
    price: number;
    stock: number;
    is_active: boolean;
    short_description: string;
    image_url: string;
}

export async function fetchProducts(): Promise<Product[]>{
    const response = await fetch('http://127.0.0.1:8000/api/products', {
    next: { revalidate: 60 } // ISR caching
  });
    if(!response.ok){
        throw new Error("Failed to fetch Products");
    }

    return response.json();
}