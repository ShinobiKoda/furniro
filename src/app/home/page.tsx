
import { fetchProducts } from '@/services/products';
import { fetchCategories } from '@/services/categories';
import { HomePage } from './HomePageClient';


export default async function Products() {

  const products = await fetchProducts();
  const categories = await fetchCategories();

  return <HomePage products={products.data} categories={categories}/>
}