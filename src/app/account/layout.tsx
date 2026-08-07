'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, ShoppingCart } from 'lucide-react';
import styles from './AccountLayout.module.css';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'My Profile', href: '/account', icon: User },
    { name: 'My Orders', href: '/account/orders', icon: Package },
    { name: 'My Cart', href: '/account/cart', icon: ShoppingCart },
  ];

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.header}>
          <div className={styles.welcome}>Welcome back</div>
          <div className={styles.name}>Your Account</div>
        </div>
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
      
      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
}
