import { createClient } from '@/lib/supabase/server';
import ProductCard from '@/components/product/ProductCard';
import styles from './FeaturedProducts.module.css';
import { Product } from '@/lib/types';
import { MOCK_PRODUCTS } from '@/lib/constants';

export default async function FeaturedProducts() {
  let productsList: Product[] = [];

  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from('products')
      .select('*, category:categories(id, name, slug)')
      .eq('featured', true)
      .eq('status', 'active')
      .limit(6);

    if (products && products.length > 0) {
      productsList = products as any[];
    }
  } catch (e) {
    console.warn('Failed to fetch products from Supabase, using mock products:', e);
  }

  if (productsList.length === 0) {
    productsList = MOCK_PRODUCTS.filter(p => p.featured) as any[];
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Featured Fragrances</h2>
          <div className={styles.goldLine}></div>
        </div>
        
        <div className={styles.grid}>
          {productsList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
