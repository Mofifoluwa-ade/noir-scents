'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LayoutDashboard, Package, ShoppingBag, Megaphone, ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './AdminSidebar.module.css';

const ADMIN_NAV_LINKS = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Advertisements', href: '/admin/advertisements', icon: Megaphone },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logoSection}>
          <h2 className={styles.logoText}>NOIR SCENTS</h2>
          <span className={styles.badge}>Admin</span>
        </div>

        <nav className={styles.nav}>
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin');
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.bottomNav}>
          <Link href="/" className={styles.navLink} target="_blank">
            <ExternalLink size={20} />
            <span>View Website</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
