import {ENV} from "@/lib/config";

export interface Review{
    product_id: number | null;
    rating: number;
    title: string;
    comment: string;
    is_verified_purchase: string;
    created_at: string;
    updated_at: string;
}
