'use client';

import React, { useState } from 'react';
import { ShoppingBag, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { Product, getDiscountedPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import SizeSelector from '@/components/product/SizeSelector';
import QuantityStepper from '@/components/product/QuantityStepper';

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
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedSize as any, quantity);
  };

  const handleWhatsAppOrder = () => {
    const link = generateProductWhatsAppLink(product, selectedSize as any, quantity);
    window.open(link, '_blank');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <span className="text-3xl font-semibold text-[var(--color-primary)]">
          {formatPrice(currentPrice)}
        </span>
        {hasDiscount && (
          <span className="text-xl text-gray-400 line-through">
            {formatPrice(originalPrice)}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <SizeSelector 
          product={product} 
          selectedSize={selectedSize} 
          onSizeChange={setSelectedSize} 
        />
        
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
            Quantity
          </span>
          <div className="self-start">
            <QuantityStepper 
              quantity={quantity} 
              onQuantityChange={setQuantity} 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        <button 
          className="btn btn-dark w-full py-4 text-lg flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>
        <button 
          className="btn btn-whatsapp w-full py-4 text-lg flex items-center justify-center gap-2"
          onClick={handleWhatsAppOrder}
        >
          <MessageCircle size={20} />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
}
