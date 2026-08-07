'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import CategoryFilter from '@/components/product/CategoryFilter';
import { Search } from 'lucide-react';

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />
        
        <div className="relative w-full md:w-64 flex-shrink-0">
          <input
            type="text"
            placeholder="Search fragrances..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">No fragrances found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          <button 
            className="mt-6 btn btn-dark"
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </>
  );
}
