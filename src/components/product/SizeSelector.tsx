'use client';

import React from 'react';
import { Product, getDiscountedPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { PRODUCT_SIZES } from '@/lib/constants';
import styles from './SizeSelector.module.css';

interface SizeSelectorProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ product, selectedSize, onSizeChange }: SizeSelectorProps) {
  const getPriceForSize = (size: string) => {
    switch (size) {
      case '100ml': return product.price_100ml;
      case '200ml': return product.price_200ml;
      case '50ml':
      default:
        return product.price_50ml;
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Select Size</span>
      <div className={styles.options}>
        {PRODUCT_SIZES.map((size) => {
          const originalPrice = getPriceForSize(size.value);
          const price = getDiscountedPrice(originalPrice, product.discount_percent);
          const isActive = selectedSize === size.value;
          
          return (
            <button
              key={size.value}
              className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
              onClick={() => onSizeChange(size.value)}
              type="button"
            >
              <span className={styles.sizeLabel}>{size.label}</span>
              <span className={styles.priceLabel}>{formatPrice(price)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
