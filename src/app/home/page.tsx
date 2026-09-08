
import { fetchProducts } from '@/services/products';
import { fetchCategories } from '@/services/categories';
import { HomePage } from './HomePageClient';


export default async function Products() {

  const products = await fetchProducts();
  const categories = await fetchCategories();

  console.log(products);

  return <HomePage products={products} categories={categories}/>
}