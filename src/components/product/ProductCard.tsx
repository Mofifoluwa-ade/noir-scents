'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Product, getDiscountedPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import AddToCartModal from '@/components/cart/AddToCartModal';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const originalPrice = product.price_50ml;
  const discountedPrice = getDiscountedPrice(originalPrice, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          {product.category && (
            <div className={styles.badgeTopLeft}>{product.category.name}</div>
          )}
          {hasDiscount && (
            <div className={styles.badgeTopRight}>-{product.discount_percent}%</div>
          )}
          <Link href={`/shop/${product.slug}`}>
            <Image
              src={product.images?.[0] || '/placeholder.jpg'}
              alt={product.name}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.name}>{product.name}</h3>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{formatPrice(discountedPrice)}</span>
            {hasDiscount && (
              <span className={styles.originalPrice}>{formatPrice(originalPrice)}</span>
            )}
          </div>
          
          <div className={styles.actions}>
            <Link href={`/shop/${product.slug}`} className={styles.previewBtn}>
              Preview
            </Link>
            <button 
              className={styles.cartBtn} 
              onClick={() => setIsModalOpen(true)}
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </div>

      <AddToCartModal 
        product={product} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
}
