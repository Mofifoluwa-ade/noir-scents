// Formatting utilities for Noir Scents

import { STORE_CONFIG } from './constants';

/**
 * Format a price in Nigerian Naira
 */
export function formatPrice(amount: number): string {
  return `${STORE_CONFIG.currency.symbol}${amount.toLocaleString('en-NG')}`;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format a date with time
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NS-${timestamp}-${random}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Generate a slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Calculate discount percentage display
 */
export function formatDiscount(percent: number): string {
  return `-${percent}%`;
}

/**
 * Get stock status label and color
 */
export function getStockStatusInfo(status: string): { label: string; color: string } {
  switch (status) {
    case 'in_stock':
      return { label: 'In Stock', color: 'success' };
    case 'out_of_stock':
      return { label: 'Out of Stock', color: 'danger' };
    case 'low_stock':
      return { label: 'Low Stock', color: 'warning' };
    default:
      return { label: status, color: 'info' };
  }
}

/**
 * Get order status label and color
 */
export function getOrderStatusInfo(status: string): { label: string; color: string } {
  switch (status) {
    case 'pending':
      return { label: 'Pending', color: 'warning' };
    case 'processing':
      return { label: 'Processing', color: 'info' };
    case 'delivered':
      return { label: 'Delivered', color: 'success' };
    case 'cancelled':
      return { label: 'Cancelled', color: 'danger' };
    default:
      return { label: status, color: 'info' };
  }
}

/**
 * Pluralize a word
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || `${singular}s`);
}
