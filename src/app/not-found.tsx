import Link from 'next/link';
import { Home, ShoppingBag, Sparkles, Compass } from 'lucide-react';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <main className={styles.notFoundWrapper}>
      <div className={styles.card}>
        <div className={styles.iconBadge}>
          <Sparkles size={36} />
        </div>

        <h1 className={styles.code404}>404</h1>
        <div className={styles.goldDivider}></div>

        <h2 className={styles.title}>Fragrance Not Found</h2>
        <p className={styles.message}>
          The scent note or page you are seeking has evaporated into thin air. 
          It may have been relocated, renamed, or is temporarily out of stock.
        </p>

        <div className={styles.buttonGroup}>
          <Link href="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Home
          </Link>
          <Link href="/shop" className="btn btn-outline-gold btn-lg">
            <ShoppingBag size={18} /> Visit Shop
          </Link>
        </div>

        <div className={styles.quickLinksSection}>
          <p className={styles.quickLinksTitle}>Or Explore Popular Destinations</p>
          <div className={styles.quickLinksGrid}>
            <Link href="/gallery" className={styles.linkItem}>
              Fragrance Gallery
            </Link>
            <Link href="/about" className={styles.linkItem}>
              Our Story & Heritage
            </Link>
            <Link href="/visit-us" className={styles.linkItem}>
              Visit Owerri Boutique
            </Link>
            <Link href="/contact" className={styles.linkItem}>
              Contact Concierge
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
