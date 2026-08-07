import type { Metadata } from 'next';
import { STORE_CONFIG } from '@/lib/constants';
import ContactForm from './ContactForm';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Globe, 
  Share2, 
  ExternalLink
} from 'lucide-react';
import styles from './Contact.module.css';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch — Noir Scents',
  description: 'Connect with Noir Scents customer care and luxury concierge. Reach out for fragrance inquiries, order status, or boutique visits.',
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hello Noir Scents team, I'd like to inquire about your fragrances."
  )}`;

  return (
    <main>
      {/* Header / Hero */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>At Your Service</span>
        <h1 className={styles.heroTitle}>Get in Touch</h1>
        <div className={styles.goldDivider}></div>
        <p className={styles.heroSubtitle}>
          Whether you require a bespoke scent recommendation, assistance with an order, or boutique directions, 
          our concierge team is ready to serve you.
        </p>
      </section>

      {/* Main Contact Content */}
      <section className={styles.contactSection}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Form */}
            <ContactForm />

            {/* Information Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h2 className={styles.infoCardTitle}>Boutique & Concierge</h2>

                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={22} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Flagship Store</h3>
                      <p>{STORE_CONFIG.address.full}</p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Phone size={22} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Telephone</h3>
                      <p>
                        <a href={`tel:${STORE_CONFIG.phone}`}>{STORE_CONFIG.phone}</a>
                      </p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Mail size={22} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>Email Concierge</h3>
                      <p>
                        <a href={`mailto:${STORE_CONFIG.email}`}>{STORE_CONFIG.email}</a>
                      </p>
                    </div>
                  </div>

                  <div className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MessageSquare size={22} />
                    </div>
                    <div className={styles.infoContent}>
                      <h3>WhatsApp Direct</h3>
                      <p>
                        <a 
                          href={whatsappUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Chat on WhatsApp <ExternalLink size={14} style={{ display: 'inline', marginLeft: 4 }} />
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Order Card */}
              <div className={styles.whatsappCard}>
                <h3 className={styles.whatsappTitle}>Instant WhatsApp Support</h3>
                <p className={styles.whatsappText}>
                  Need rapid assistance or instant order confirmation? Connect with our master perfumer on WhatsApp.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={18} /> Chat on WhatsApp
                </a>
              </div>

              {/* Social Media Links */}
              <div className={styles.socialCard}>
                <h3 className={styles.socialTitle}>Follow Noir Scents</h3>
                <div className={styles.socialGrid}>
                  {STORE_CONFIG.social.instagram && (
                    <a
                      href={STORE_CONFIG.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label="Instagram"
                    >
                      <Globe size={20} />
                    </a>
                  )}
                  {STORE_CONFIG.social.twitter && (
                    <a
                      href={STORE_CONFIG.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label="Twitter"
                    >
                      <Share2 size={20} />
                    </a>
                  )}
                  {STORE_CONFIG.social.facebook && (
                    <a
                      href={STORE_CONFIG.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label="Facebook"
                    >
                      <MessageSquare size={20} />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Google Maps Embed */}
          <div className={styles.mapContainer}>
            <div className={styles.mapHeader}>
              <h3>Visit Our Owerri Boutique</h3>
              <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>123 Luxury Avenue, Owerri, Imo State</span>
            </div>
            <iframe
              src={STORE_CONFIG.address.mapEmbedUrl}
              className={styles.mapIframe}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Noir Scents Location Map"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
