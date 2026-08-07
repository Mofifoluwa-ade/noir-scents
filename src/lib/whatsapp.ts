// WhatsApp deep link utilities for Noir Scents

import { STORE_CONFIG } from './constants';
import { formatPrice } from './format';
import type { CartItem, Product, ProductSize } from './types';
import { getPriceForSize, getDiscountedPrice } from './types';

/**
 * Generate a WhatsApp deep link for a single product order
 */
export function generateProductWhatsAppLink(
  product: Product,
  size: ProductSize,
  quantity: number
): string {
  const price = getPriceForSize(product, size);
  const finalPrice = getDiscountedPrice(price, product.discount_percent);
  const total = finalPrice * quantity;
  
  const message = [
    `🛍️ *New Order from Noir Scents*`,
    ``,
    `*Product:* ${product.name}`,
    `*Size:* ${size}`,
    `*Quantity:* ${quantity}`,
    `*Unit Price:* ${formatPrice(finalPrice)}`,
    `*Total:* ${formatPrice(total)}`,
    ``,
    `I'd like to order this fragrance. Please confirm availability and payment details.`,
  ].join('\n');
  
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a WhatsApp deep link for a full cart order
 */
export function generateCartWhatsAppLink(items: CartItem[]): string {
  const itemLines = items.map((item, index) => {
    const price = getPriceForSize(item.product, item.size);
    const finalPrice = getDiscountedPrice(price, item.product.discount_percent);
    const lineTotal = finalPrice * item.quantity;
    return `${index + 1}. ${item.product.name} (${item.size}) x${item.quantity} — ${formatPrice(lineTotal)}`;
  });
  
  const grandTotal = items.reduce((sum, item) => {
    const price = getPriceForSize(item.product, item.size);
    const finalPrice = getDiscountedPrice(price, item.product.discount_percent);
    return sum + finalPrice * item.quantity;
  }, 0);
  
  const message = [
    `🛍️ *New Order from Noir Scents*`,
    ``,
    `*Items:*`,
    ...itemLines,
    ``,
    `*Grand Total:* ${formatPrice(grandTotal)}`,
    ``,
    `I'd like to order these fragrances. Please confirm availability and payment details.`,
  ].join('\n');
  
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a simple WhatsApp contact link
 */
export function getWhatsAppContactLink(message?: string): string {
  const defaultMessage = `Hi! I'm interested in Noir Scents fragrances. Can you help me?`;
  return `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message || defaultMessage)}`;
}
