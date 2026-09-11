import { client } from "@/lib/api-client";
import {  MessageResponse } from "@/types/type";
import { Product } from "./products";

export interface CartItem{
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    product: Product;

}

export async function fetchCartItems (): Promise<CartItem[]>{
    const data = await client.get('/cart');
    return data;
}

export async function addItemToCart( product_id: number, quantity?: number):Promise<MessageResponse<CartItem>>{
    const data = await client.post("/cart-items", {
        product_id,
        quantity
    });

    return data;
}

export async function removeItemFromCart(item_id: number): Promise<MessageResponse<CartItem[]>>{
    const data = await client.delete(`/cart-items/${item_id}`);

    return data;
}

