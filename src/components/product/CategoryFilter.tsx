'use client';

import React from 'react';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  categories?: { id: string; name: string; slug: string }[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export default function CategoryFilter({ categories = [], activeCategory, onCategoryChange }: CategoryFilterProps) {
  // Use passed categories or fallback to constants
  const items = categories.length > 0 
    ? [{ slug: 'all', name: 'All Collections' }, ...categories]
    : [{ slug: 'all', name: 'All Collections' }, ...PRODUCT_CATEGORIES];

  return (
    <div className={styles.container}>
      {items.map((category) => (
        <button
          key={category.slug}
          className={`${styles.pill} ${activeCategory === category.slug ? styles.pillActive : ''}`}
          onClick={() => onCategoryChange(category.slug)}
          type="button"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
