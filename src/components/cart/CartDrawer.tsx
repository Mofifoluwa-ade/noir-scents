'use client';

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { generateCartWhatsAppLink } from '@/lib/whatsapp';
import QuantityStepper from '../product/QuantityStepper';
import styles from './CartDrawer.module.css';
import { getDiscountedPrice } from '@/lib/types';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  
  const total = getTotal ? getTotal() : 0;

  const handleCheckout = () => {
    const link = generateCartWhatsAppLink(items);
    window.open(link, '_blank');
  };

  const getPriceForSize = (product: any, size: string) => {
    switch (size) {
      case '100ml': return product.price_100ml;
      case '200ml': return product.price_200ml;
      case '50ml':
      default:
        return product.price_50ml;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>Your Cart</Dialog.Title>
            <Dialog.Close className={styles.closeButton}>
              <X size={24} />
            </Dialog.Close>
          </div>
          
          <div className={styles.body}>
            {items.length === 0 ? (
              <div className={styles.emptyState}>
                <ShoppingBag size={48} opacity={0.5} />
                <p>Your cart is empty.</p>
                <button 
                  className="btn btn-dark" 
                  onClick={() => onOpenChange(false)}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const basePrice = getPriceForSize(item.product, item.size);
                const price = getDiscountedPrice(basePrice, item.product.discount_percent);
                
                return (
                  <div key={`${item.product.id}-${item.size}-${index}`} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.product.images?.[0] || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h4 className={styles.itemName}>{item.product.name}</h4>
                      <span className={styles.itemSize}>{item.size}</span>
                      
                      <button 
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.product.id, item.size)}
                      >
                        Remove
                      </button>
                      
                      <div className={styles.itemPriceRow}>
                        <QuantityStepper 
                          quantity={item.quantity}
                          onQuantityChange={(q) => updateQuantity(item.product.id, item.size, q)}
                        />
                        <span className={styles.itemPrice}>
                          {formatPrice(price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          
          {items.length > 0 && (
            <div className={styles.footer}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              <button className="btn btn-whatsapp w-full mb-3" onClick={handleCheckout}>
                <MessageCircle size={18} className="mr-2 inline" />
                Checkout via WhatsApp
              </button>
              <button 
                className="btn w-full" 
                onClick={() => onOpenChange(false)}
                style={{ backgroundColor: 'transparent', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
