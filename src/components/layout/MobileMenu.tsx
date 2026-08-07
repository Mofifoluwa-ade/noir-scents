'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import Link from 'next/link';
import { NAV_LINKS, FOOTER_QUICK_LINKS } from '@/lib/constants';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <span className={styles.logo}>NOIR SCENTS</span>
            <Dialog.Close asChild>
              <button className={styles.closeBtn} aria-label="Close menu">
                <X size={24} />
              </button>
            </Dialog.Close>
          </div>
          
          <nav className={styles.nav}>
            {NAV_LINKS?.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.navLink}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
            
            <div className={styles.divider} />
            
            {FOOTER_QUICK_LINKS?.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.subLink}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
