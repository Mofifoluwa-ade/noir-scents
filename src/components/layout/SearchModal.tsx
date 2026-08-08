'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { MOCK_PRODUCTS } from '@/lib/constants';
import { formatPrice } from '@/lib/format';
import { getDiscountedPrice } from '@/lib/types';
import styles from './SearchModal.module.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = query.trim() === '' ? MOCK_PRODUCTS.slice(0, 4) : MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    (typeof p.category === 'object' ? p.category.name : p.category).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.searchHeader}>
          <Search size={22} color="#C9A84C" />
          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder="Search fragrances, notes, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">
            <X size={24} />
          </button>
        </div>

        <div className={styles.resultsList}>
          {results.length > 0 ? (
            results.map((product) => {
              const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
              const discountedPrice = getDiscountedPrice(product.price_50ml, product.discount_percent);
              
              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className={styles.resultItem}
                  onClick={onClose}
                >
                  <div className={styles.thumbWrapper}>
                    <Image
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'}
                      alt={product.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{product.name}</div>
                    <div className={styles.itemCategory}>{categoryName}</div>
                  </div>
                  <div className={styles.itemPrice}>{formatPrice(discountedPrice)}</div>
                </Link>
              );
            })
          ) : (
            <div className={styles.noResults}>
              No fragrances matching "{query}". Try searching for "Bloom", "Oud", or "Citrus".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
