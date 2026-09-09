
import { ShopHomepage } from "@/components/shop/ShopHomepage";
import { fetchProducts } from "@/services/products";

export default async function Shop() {

  const products = await fetchProducts();


  return <ShopHomepage products={products.data} />;
}
