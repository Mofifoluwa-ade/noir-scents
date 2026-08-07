// Store configuration constants for Noir Scents

export const STORE_CONFIG = {
  name: 'Noir Scents',
  tagline: 'Crafted for those who speak without words',
  description: 'Premium fragrances that define your signature style',
  heroHeadline: 'Attitude of ELITE PERSONALITY',
  
  // Contact
  whatsappNumber: '2348000000000', // Placeholder — update with real number
  email: 'hello@noirscents.com',
  phone: '+234 800 000 0000',
  
  // Address
  address: {
    street: '123 Luxury Avenue',
    city: 'Owerri',
    state: 'Imo State',
    country: 'Nigeria',
    full: '123 Luxury Avenue, Owerri, Imo State, Nigeria',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127210.5684684675!2d7.0134!3d5.4836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10429a0e38f1c0ed%3A0x6e9bcaf0f5dba5a4!2sOwerri%2C%20Imo!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng',
  },
  
  // Social Links
  social: {
    instagram: 'https://instagram.com/noirscents',
    twitter: 'https://twitter.com/noirscents',
    facebook: 'https://facebook.com/noirscents',
    tiktok: 'https://tiktok.com/@noirscents',
  },
  
  // Currency
  currency: {
    code: 'NGN',
    symbol: '₦',
    locale: 'en-NG',
  },
} as const;

export const PRODUCT_CATEGORIES = [
  { name: 'All', slug: 'all' },
  { name: 'Floral', slug: 'floral' },
  { name: 'Woody', slug: 'woody' },
  { name: 'Citrus', slug: 'citrus' },
  { name: 'Oriental', slug: 'oriental' },
  { name: 'Fresh', slug: 'fresh' },
  { name: 'Gourmand', slug: 'gourmand' },
] as const;

export const PRODUCT_SIZES = [
  { label: '50 ml', value: '50ml' as const, shortLabel: '50ml' },
  { label: '100 ml', value: '100ml' as const, shortLabel: '100ml' },
  { label: '200 ml', value: '200ml' as const, shortLabel: '200ml' },
] as const;

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'warning' },
  { value: 'processing', label: 'Processing', color: 'info' },
  { value: 'delivered', label: 'Delivered', color: 'success' },
  { value: 'cancelled', label: 'Cancelled', color: 'danger' },
] as const;

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Visit Us', href: '/visit-us' },
  { label: 'About', href: '/about' },
] as const;

export const FOOTER_QUICK_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Refund Policy', href: '/refund-policy' },
] as const;

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Products', href: '/admin/products', icon: 'Package' },
  { label: 'Orders', href: '/admin/orders', icon: 'ShoppingBag' },
  { label: 'Advertisements', href: '/admin/advertisements', icon: 'Megaphone' },
  { label: 'View Website', href: '/', icon: 'ExternalLink' },
] as const;

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Eternal Bloom',
    slug: 'eternal-bloom',
    category_id: 'c1',
    category: { id: 'c1', name: 'Floral', slug: 'floral' },
    description: 'A timeless floral symphony that captures the essence of a garden in perpetual bloom. Notes of Bulgarian rose, jasmine sambac, and white peony dance together.',
    story: 'Inspired by the legendary gardens of Versailles, Eternal Bloom was crafted to embody the eternal beauty of nature\'s most exquisite flowers.',
    price_50ml: 15000,
    price_100ml: 25000,
    price_200ml: 40000,
    discount_percent: 10,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '2',
    name: 'Midnight Oak',
    slug: 'midnight-oak',
    category_id: 'c2',
    category: { id: 'c2', name: 'Woody', slug: 'woody' },
    description: 'A deep, mysterious woody fragrance that evokes the quiet strength of ancient forests. Rich sandalwood meets smoky vetiver and aged cedarwood.',
    story: 'Born from a midnight walk through the oak forests of Provence, this scent captures the raw power and silent wisdom of century-old trees.',
    price_50ml: 18000,
    price_100ml: 30000,
    price_200ml: 48000,
    discount_percent: 0,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '3',
    name: 'Golden Citrus',
    slug: 'golden-citrus',
    category_id: 'c3',
    category: { id: 'c3', name: 'Citrus', slug: 'citrus' },
    description: 'A vibrant burst of Mediterranean sunshine. Sicilian bergamot, blood orange, and yuzu create an uplifting citrus masterpiece.',
    story: 'Crafted during a summer along the Amalfi Coast, Golden Citrus bottles the pure joy of Italian sunshine and sea breeze.',
    price_50ml: 12000,
    price_100ml: 20000,
    price_200ml: 32000,
    discount_percent: 15,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '4',
    name: 'Mystic Oud',
    slug: 'mystic-oud',
    category_id: 'c4',
    category: { id: 'c4', name: 'Oriental', slug: 'oriental' },
    description: 'An opulent oriental treasure featuring rare Cambodian oud, saffron threads, and amber resin. Unapologetically luxurious.',
    story: 'Sourced from the most prized oud plantations in Southeast Asia, Mystic Oud represents the pinnacle of oriental perfumery.',
    price_50ml: 25000,
    price_100ml: 42000,
    price_200ml: 65000,
    discount_percent: 0,
    featured: false,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '5',
    name: 'Ocean Breeze',
    slug: 'ocean-breeze',
    category_id: 'c5',
    category: { id: 'c5', name: 'Fresh', slug: 'fresh' },
    description: 'A crisp, invigorating fresh fragrance that captures the Atlantic coast at dawn. Sea salt, marine accord, and white musk.',
    story: 'Created to bottle the feeling of standing on a cliff overlooking the ocean as the first light breaks across the waves.',
    price_50ml: 13000,
    price_100ml: 22000,
    price_200ml: 35000,
    discount_percent: 0,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '6',
    name: 'Vanilla Dream',
    slug: 'vanilla-dream',
    category_id: 'c6',
    category: { id: 'c6', name: 'Gourmand', slug: 'gourmand' },
    description: 'A warm, indulgent gourmand fragrance with Madagascar vanilla, tonka bean, and salted caramel. Pure comfort in a bottle.',
    story: 'Inspired by the vanilla plantations of Madagascar, this scent wraps you in warmth like a cashmere blanket on a winter evening.',
    price_50ml: 14000,
    price_100ml: 24000,
    price_200ml: 38000,
    discount_percent: 20,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'],
  },
  {
    id: '7',
    name: 'Blue de Channel',
    slug: 'blue-de-channel',
    category_id: 'c5',
    category: { id: 'c5', name: 'Fresh', slug: 'fresh' },
    description: 'A sophisticated fresh fragrance with notes of mint, grapefruit, incense, and cedar. Modern masculinity redefined.',
    story: 'A tribute to the modern gentleman who moves through life with quiet confidence and effortless style.',
    price_50ml: 20000,
    price_100ml: 35000,
    price_200ml: 55000,
    discount_percent: 5,
    featured: true,
    stock_status: 'in_stock' as const,
    status: 'active' as const,
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'],
  },
];
