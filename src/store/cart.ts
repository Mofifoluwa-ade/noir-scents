// Zustand cart store for Noir Scents

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, ProductSize } from '@/lib/types';
import { getPriceForSize, getDiscountedPrice } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, size: ProductSize, quantity?: number) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  updateQuantity: (productId: string, size: ProductSize, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Computed
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (product, size, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.size === size
          );
          
          if (existingIndex >= 0) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + quantity,
            };
            return { items: updatedItems, isOpen: true };
          }
          
          // Add new item
          return {
            items: [...state.items, { product, size, quantity }],
            isOpen: true,
          };
        });
      },
      
      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        }));
      },
      
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((sum, item) => {
          const price = getPriceForSize(item.product, item.size);
          const finalPrice = getDiscountedPrice(price, item.product.discount_percent);
          return sum + finalPrice * item.quantity;
        }, 0);
      },
      
      getTotal: () => {
        // For now, total equals subtotal (no shipping/tax)
        return get().getSubtotal();
      },
    }),
    {
      name: 'noir-scents-cart',
      // Only persist items, not UI state
      partialize: (state) => ({ items: state.items }),
    }
  )
);
