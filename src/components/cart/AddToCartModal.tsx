'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Product, getDiscountedPrice } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { useCartStore } from '@/store/cart';
import { generateProductWhatsAppLink } from '@/lib/whatsapp';
import SizeSelector from '../product/SizeSelector';
import QuantityStepper from '../product/QuantityStepper';
import styles from './AddToCartModal.module.css';

interface AddToCartModalProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddToCartModal({ product, open, onOpenChange }: AddToCartModalProps) {
  const [selectedSize, setSelectedSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setSelectedSize('50ml');
      setQuantity(1);
    }
  }, [open]);

  const getPriceForSize = (size: string) => {
    switch (size) {
      case '100ml': return product.price_100ml;
      case '200ml': return product.price_200ml;
      case '50ml':
      default:
        return product.price_50ml;
    }
  };

  const currentPrice = getDiscountedPrice(getPriceForSize(selectedSize), product.discount_percent);
  const totalPrice = currentPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedSize as any, quantity);
    onOpenChange(false);
  };

  const handleWhatsAppOrder = () => {
    const link = generateProductWhatsAppLink(product, selectedSize as any, quantity);
    window.open(link, '_blank');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Dialog.Close className={styles.closeButton}>
            <X size={20} />
          </Dialog.Close>
          
          <div className={styles.grid}>
            <div className={styles.imageContainer}>
              <Image
                src={product.images?.[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className={styles.image}
              />
            </div>
            
            <div className={styles.details}>
              <Dialog.Title className={styles.title}>{product.name}</Dialog.Title>
              <Dialog.Description className={styles.description}>
                {product.description}
              </Dialog.Description>
              
              <div className={styles.controls}>
                <SizeSelector 
                  product={product} 
                  selectedSize={selectedSize} 
                  onSizeChange={setSelectedSize} 
                />
                
                <div className={styles.quantityRow}>
                  <span className={styles.label}>Quantity</span>
                  <QuantityStepper 
                    quantity={quantity} 
                    onQuantityChange={setQuantity} 
                  />
                </div>
              </div>
              
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total Price</span>
                <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
              </div>
              
              <div className={styles.actions}>
                <button className="btn btn-dark" onClick={handleAddToCart}>
                  <ShoppingBag size={18} className="mr-2" />
                  Add to Cart
                </button>
                <button className="btn btn-whatsapp" onClick={handleWhatsAppOrder}>
                  <MessageCircle size={18} className="mr-2" />
                  Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
