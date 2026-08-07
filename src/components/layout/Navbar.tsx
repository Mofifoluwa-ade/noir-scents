'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { NAV_LINKS, STORE_CONFIG } from '@/lib/constants';
import MobileMenu from './MobileMenu';
import CartDrawer from '@/components/cart/CartDrawer';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const cartItemCount = items ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navbar}`}>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
              NOIR SCENTS
            </Link>
            <span className={styles.tagline}>{STORE_CONFIG?.tagline || 'Luxury Perfumes'}</span>
          </div>

          <nav className={styles.desktopNav}>
            {NAV_LINKS?.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/shop" className={styles.iconBtn} aria-label="Search">
              <Search size={20} />
            </Link>
            <Link href="/account" className={styles.iconBtn} aria-label="User Account">
              <User size={20} />
            </Link>
            <button 
              className={styles.cartBtn} 
              aria-label="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className={styles.cartBadge}>{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <CartDrawer
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
      />
    </>
  );
}
