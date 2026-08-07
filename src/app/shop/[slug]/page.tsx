import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import ProductDetailClient from './ProductDetailClient';
import ProductCard from '@/components/product/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/constants';

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

  return (
    <div className="container section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="relative aspect-square md:aspect-[4/5] bg-[#111] rounded-sm overflow-hidden border border-gold/20">
          {product.category && (
            <div className="absolute top-4 left-4 z-10 bg-[var(--color-secondary)] text-white text-xs tracking-wider uppercase px-3 py-1 font-semibold">
              {typeof product.category === 'object' ? product.category.name : product.category}
            </div>
          )}
          <Image
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-display text-[var(--color-primary)] mb-4">
            {product.name}
          </h1>
          
          <div className="prose prose-sm md:prose-base text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <ProductDetailClient product={product} />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-display text-2xl mb-4">The Story</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.story || `Every drop of ${product.name} tells a story of craftsmanship and dedication. Sourced from the finest ingredients globally, it is designed to evoke memories and create new ones. A true masterpiece for the modern connoisseur.`}
            </p>
          </div>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-24">
          <h2 className="text-3xl font-display text-center mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rp: any) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
