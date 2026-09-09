
import { fetchProducts } from '@/services/products';
import { fetchCategories } from '@/services/categories';
import { HomePage } from './HomePageClient';


export default async function Products() {


  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories()
  ]
  )

  return <HomePage products={products.data} categories={categories} />
}