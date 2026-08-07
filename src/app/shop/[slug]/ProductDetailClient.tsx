'use client';

import React, { useState } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Product, getDiscountedPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import SizeSelector from '@/components/product/SizeSelector';
import QuantityStepper from '@/components/product/QuantityStepper';
import styles from './ProductDetail.module.css';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  const getPriceForSize = (size: string) => {
    switch (size) {
      case '100ml': return product.price_100ml;
      case '200ml': return product.price_200ml;
      case '50ml':
      default:
        return product.price_50ml;
    }
  };

  const originalPrice = getPriceForSize(selectedSize);
  const currentPrice = getDiscountedPrice(originalPrice, product.discount_percent);
  const hasDiscount = product.discount_percent > 0;

  const handleAddToCart = () => {
    addItem(product, selectedSize as any, quantity);
  };

  const handleWhatsAppOrder = () => {
    const link = generateProductWhatsAppLink(product, selectedSize as any, quantity);
    window.open(link, '_blank');
  };

  return (
    <div className={styles.detailsContent}>
      <div className={styles.priceRow}>
        <span className={styles.currentPrice}>
          {formatPrice(currentPrice)}
        </span>
        {hasDiscount && (
          <span className={styles.originalPrice}>
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      <div className={styles.sizeSection}>
        <SizeSelector 
          product={product} 
          selectedSize={selectedSize} 
          onSizeChange={setSelectedSize} 
        />
      </div>
      
      <div className={styles.quantitySection}>
        <span className={styles.sectionLabel}>
          Quantity
        </span>
        <QuantityStepper 
          quantity={quantity} 
          onQuantityChange={setQuantity} 
        />
      </div>

      <div className={styles.actionsColumn}>
        <button 
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>
        <button 
          className={styles.whatsappBtn}
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle size={20} />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
}
