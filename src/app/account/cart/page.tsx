'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { generateCartWhatsAppLink } from '@/lib/whatsapp';
import { getPriceForSize, getDiscountedPrice } from '@/lib/types';
import styles from './CartPage.module.css';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = getTotal ? getTotal() : 0;

  const handleCheckout = () => {
    const link = generateCartWhatsAppLink(items);
    window.open(link, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>My Cart</h1>
        <div className={styles.emptyState}>
          <ShoppingBag size={64} style={{ color: 'var(--color-secondary)', opacity: 0.5 }} />
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Your cart is empty
            </h2>
            <p style={{ color: '#666' }}>Looks like you haven't added any fragrances to your cart yet.</p>
          </div>
          <Link href="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Cart</h1>
      
      <div className={styles.layout}>
        <div className={styles.cartList}>
          {items.map((item, index) => {
            const basePrice = getPriceForSize(item.product, item.size);
            const unitPrice = getDiscountedPrice(basePrice, item.product.discount_percent);
            const lineTotal = unitPrice * item.quantity;
            
            return (
              <div key={`${item.product.id}-${item.size}-${index}`} className={styles.cartItem}>
                <div style={{ position: 'relative', width: '80px', height: '100px', flexShrink: 0 }}>
                  <Image
                    src={item.product.images?.[0] || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                  />
                </div>
                
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.product.name}</div>
                  <div className={styles.itemSize}>Size: {item.size}</div>
                  <div className={styles.itemPrice}>{formatPrice(lineTotal)}</div>
                </div>
                
                <div className={styles.itemActions}>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.product.id, item.size)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                  
                  <div className={styles.stepper}>
                    <button 
                      className={styles.stepperBtn}
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, minWidth: '1rem', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button 
                      className={styles.stepperBtn}
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ fontSize: '0.875rem', color: '#666' }}>Calculated on WhatsApp</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          <button 
            className="btn btn-whatsapp" 
            onClick={handleCheckout}
            style={{ width: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
          >
            Proceed via WhatsApp
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Link href="/shop" style={{ color: 'var(--color-primary)', textDecoration: 'underline', fontSize: '0.875rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
