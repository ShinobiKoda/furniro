

import { fetchProductBySlug } from "@/services/products";
import FurnitureClient from "./FurnitureClient";

interface FurniturePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FurniturePage({ params }: FurniturePageProps) {

  const {slug} = await params;

  const product = await fetchProductBySlug(slug);

  if (!product){
    return null;
  }



  return <FurnitureClient product={product} productSlug={slug}/>;
}
