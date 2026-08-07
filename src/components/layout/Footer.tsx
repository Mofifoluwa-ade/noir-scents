import Link from 'next/link';
import { Share2, Globe, MessageCircle } from 'lucide-react';
import { STORE_CONFIG, FOOTER_QUICK_LINKS } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>NOIR SCENTS</h2>
            <p className={styles.tagline}>{STORE_CONFIG?.tagline || 'Luxury Perfumes'}</p>
          </div>
          <div className={styles.newsletter}>
            <h3 className={styles.newsletterTitle}>Join Our Inner Circle</h3>
            <p className={styles.newsletterDesc}>Exclusive offers, early access, and perfume stories.</p>
            <form className={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className={styles.input}
                required
              />
              <button type="submit" className={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {FOOTER_QUICK_LINKS?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Visit Us</h4>
            <p className={styles.text}>{STORE_CONFIG?.address?.full || '123 Luxury Avenue, Owerri'}</p>
            <p className={styles.text}>
              <a href={`mailto:${STORE_CONFIG?.email || 'hello@noirscents.com'}`} className={styles.link}>
                {STORE_CONFIG?.email || 'hello@noirscents.com'}
              </a>
            </p>
            <p className={styles.text}>
              <a href={`tel:${STORE_CONFIG?.phone || ''}`} className={styles.link}>
                {STORE_CONFIG?.phone || '+234 800 000 0000'}
              </a>
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Follow Us</h4>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <Globe size={24} />
              </a>
              <a href="#" aria-label="Twitter" className={styles.socialIcon}>
                <Share2 size={24} />
              </a>
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {currentYear} Noir Scents. All rights reserved.
          </p>
          <div className={styles.legal}>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
