// TypeScript interfaces for Noir Scents

export interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category?: Category;
  description: string;
  story: string;
  price_50ml: number;
  price_100ml: number;
  price_200ml: number;
  discount_percent: number;
  images: string[];
  stock_status: 'in_stock' | 'out_of_stock' | 'low_stock';
  status: 'active' | 'inactive';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductSize = '50ml' | '100ml' | '200ml';

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  payment_method: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  size: ProductSize;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface Advertisement {
  id: string;
  title: string;
  image_url: string;
  link_url: string;
  position: string;
  active: boolean;
  sort_order: number;
  created_at: string;
}

// Admin dashboard types
export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalUsers: number;
}

// Price helper
export function getPriceForSize(product: Product, size: ProductSize): number {
  const priceMap: Record<ProductSize, number> = {
    '50ml': product.price_50ml,
    '100ml': product.price_100ml,
    '200ml': product.price_200ml,
  };
  return priceMap[size];
}

export function getDiscountedPrice(price: number, discountPercent: number): number {
  if (discountPercent <= 0) return price;
  return Math.round(price * (1 - discountPercent / 100));
}
