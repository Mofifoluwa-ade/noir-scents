import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/constants';
import styles from './ProductDetail.module.css';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('products')
      .select('name, description')
      .eq('slug', slug)
      .single();
    product = data;
  } catch (e) {}

  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.slug === slug);
  }

  if (!product) return { title: 'Product Not Found | Noir Scents' };

  return {
    title: `${product.name} | Noir Scents`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product: any = null;
  let relatedProducts: any[] = [];

  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug)
      `)
      .eq('slug', slug)
      .single();

    if (data) {
      product = data;
      const { data: rel } = await supabase
        .from('products')
        .select(`*, category:categories(id, name, slug)`)
        .eq('category_id', product.category_id)
        .neq('id', product.id)
        .limit(4);
      if (rel) relatedProducts = rel;
    }
  } catch (e) {}

  if (!product) {
    product = MOCK_PRODUCTS.find(p => p.slug === slug);
    if (product) {
      relatedProducts = MOCK_PRODUCTS.filter(p => p.id !== product.id && p.category_id === product.category_id).slice(0, 4);
    }
  }

  if (!product) {
    notFound();
  }

  const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.mainGrid}>
        <div className={styles.imageContainer}>
          {categoryName && (
            <div className={styles.categoryBadge}>
              {categoryName}
            </div>
          )}
          <Image
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'}
            alt={product.name}
            fill
            className={styles.productImage}
            priority
          />
        </div>

        <div>
          <h1 className={styles.productTitle}>
            {product.name}
          </h1>
          
          <p className={styles.productDescription}>
            {product.description}
          </p>

          <ProductDetailClient product={product} />
          
          <div className={styles.storySection}>
            <h3 className={styles.storyTitle}>The Story</h3>
            <p className={styles.storyText}>
              {product.story || `Every drop of ${product.name} tells a story of craftsmanship and dedication. Sourced from the finest ingredients globally, it is designed to evoke memories and create new ones. A true masterpiece for the modern connoisseur.`}
            </p>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((rp: any) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
