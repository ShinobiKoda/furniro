import { client } from "@/lib/api-client";
import { PaginatedResponse, CreateReponse } from "@/types/type";
import { Product } from "./products";



export interface CartItem{
    cart_id: number;
    product_id: number;
    quantity: number;
    product: Product;

}

export async function fetchCartItems (): Promise<PaginatedResponse<CartItem>>{
    const data = await client.get('/cart');
    return data;
}

export async function addItemToCart(cart_id: number, product_id: number):Promise<CreateReponse<CartItem>>{
    const data = await client.post("/cart-items", {
        cart_id, product_id
    });

    return data;
}

