import React from 'react';
import { createClient } from '@/lib/supabase/server';
import ShopClientLayout from './ShopClientLayout';
import { MOCK_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants';
import { Product } from '@/lib/types';
import styles from './Shop.module.css';

export const metadata = {
  title: 'Our Collection | Noir Scents',
  description: 'Explore our luxury perfume collection.',
};

export default async function ShopPage() {
  let productsList: Product[] = [];
  let categoriesList: any[] = [];

  try {
    const supabase = await createClient();
    
    // Fetch active products
    const { data: products } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (products && products.length > 0) {
      productsList = products as any[];
    }

    // Fetch categories
    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categories && categories.length > 0) {
      categoriesList = categories;
    }
  } catch (e) {
    console.warn('Failed to fetch from Supabase, using mock shop data:', e);
  }

  if (productsList.length === 0) {
    productsList = MOCK_PRODUCTS as any[];
  }

  if (categoriesList.length === 0) {
    categoriesList = PRODUCT_CATEGORIES.filter(c => c.slug !== 'all').map((c, i) => ({ id: `c${i+1}`, name: c.name, slug: c.slug }));
  }

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Our Collection</h1>
        <p className={styles.subtitle}>
          Discover our range of meticulously crafted fragrances, designed to leave a lasting impression.
        </p>
      </div>

      <ShopClientLayout initialProducts={productsList} categories={categoriesList} />
    </div>
  );
}
