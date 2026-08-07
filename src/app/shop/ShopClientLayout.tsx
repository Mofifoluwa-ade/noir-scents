'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/product/CategoryFilter';
import { Search } from 'lucide-react';
import styles from './Shop.module.css';

interface ShopClientLayoutProps {
  initialProducts: any[];
  categories: any[];
}

export default function ShopClientLayout({ initialProducts, categories }: ShopClientLayoutProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const matchesCategory = activeCategory === 'all' || (product.category && product.category.slug === activeCategory);
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, activeCategory, searchQuery]);

  return (
    <>
      <div className={styles.controlsBar}>
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search fragrances..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className={styles.searchIcon} size={18} />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No fragrances found</h3>
          <p className={styles.emptyText}>Try adjusting your search or filter criteria.</p>
          <button 
            className="btn btn-dark"
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
