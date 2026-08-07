import type { Metadata } from 'next';
import Link from 'next/link';
import { STORE_CONFIG } from '@/lib/constants';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Calendar, 
  Coffee,
  Navigation,
  ExternalLink
} from 'lucide-react';
import styles from './VisitUs.module.css';

export const metadata: Metadata = {
  title: 'Visit Our Flagship Boutique | Noir Scents Owerri',
  description: 'Experience haute perfumerie at the Noir Scents flagship boutique in Owerri, Imo State. Scent consultations, custom decants, and luxury fitting sessions.',
};

export default function VisitUsPage() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hello Noir Scents, I would like to book a private fragrance fitting appointment at your Owerri boutique."
  )}`;

  return (
    <main>
      {/* Hero Header */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>Owerri Atelier & Boutique</span>
        <h1 className={styles.heroTitle}>Visit Our Flagship</h1>
        <div className={styles.goldDivider}></div>
        <p className={styles.heroSubtitle}>
          Step into a sanctuary of olfactory elegance. Discover rare extraits de parfum, experience personalized scent profiling, 
          and sample our entire collection in a serene luxury setting.
        </p>
      </section>

      {/* Main Info Section */}
      <section className={styles.visitSection}>
        <div className="container">
          <div className={styles.visitGrid}>
            
            {/* Opening Hours & Location Card */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <Clock className={styles.cardTitleIcon} size={28} /> Opening Hours & Location
              </h2>

              <div className={styles.hoursList}>
                <div className={styles.hoursRow}>
                  <span className={styles.dayLabel}>Monday – Friday</span>
                  <span className={styles.timeLabel}>
                    9:00 AM – 7:00 PM <span className={styles.openBadge}>Open Today</span>
                  </span>
                </div>
                <div className={styles.hoursRow}>
                  <span className={styles.dayLabel}>Saturday</span>
                  <span className={styles.timeLabel}>10:00 AM – 6:00 PM</span>
                </div>
                <div className={styles.hoursRow}>
                  <span className={styles.dayLabel}>Sunday</span>
                  <span className={styles.timeLabel} style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                    Closed (VIP Appointments Only)
                  </span>
                </div>
              </div>

              {/* Address Box */}
              <div className={styles.addressBox}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <MapPin size={18} style={{ color: 'var(--color-secondary-dark)' }} />
                  <span className={styles.addressText}>{STORE_CONFIG.address.full}</span>
                </div>
                <p className={styles.directionsText}>
                  Landmark: Located in the premier commercial district of Owerri, directly opposite the Central Plaza. Ample VIP valet parking available.
                </p>
              </div>

              {/* Direct Contacts */}
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Phone size={18} className={styles.contactItemIcon} />
                  <span>Call Us: <a href={`tel:${STORE_CONFIG.phone}`} style={{ fontWeight: 600 }}>{STORE_CONFIG.phone}</a></span>
                </div>
                <div className={styles.contactItem}>
                  <MessageSquare size={18} className={styles.contactItemIcon} />
                  <span>WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>{STORE_CONFIG.phone}</a></span>
                </div>
              </div>
            </div>

            {/* VIP Scent Consultation Card */}
            <div className={styles.vipCard}>
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-secondary)' }}>
                Bespoke Experience
              </span>
              <h2 className={styles.vipTitle}>Private Scent Fitting</h2>
              <p className={styles.vipSubtitle}>
                Schedule a one-on-one fragrance consultation with our master scent stylist. 
                Discover fragrance layering techniques tailored to your body chemistry and lifestyle.
              </p>

              <div className={styles.vipFeatures}>
                <div className={styles.vipFeatureItem}>
                  <Sparkles size={20} className={styles.vipFeatureIcon} />
                  <div className={styles.vipFeatureText}>
                    <h4>Personal Olfactory Profile</h4>
                    <p>Sample rare raw accords—ouds, roses, ambers, and musks—to identify your signature notes.</p>
                  </div>
                </div>

                <div className={styles.vipFeatureItem}>
                  <Coffee size={20} className={styles.vipFeatureIcon} />
                  <div className={styles.vipFeatureText}>
                    <h4>Complementary Refreshments</h4>
                    <p>Enjoy premium espresso or champagne during your relaxed 45-minute fitting session.</p>
                  </div>
                </div>

                <div className={styles.vipFeatureItem}>
                  <Calendar size={20} className={styles.vipFeatureIcon} />
                  <div className={styles.vipFeatureText}>
                    <h4>Custom Decant Set Included</h4>
                    <p>Leave with a curated 3x 5ml travel atomizer set of your top chosen fragrance formulations.</p>
                  </div>
                </div>
              </div>

              <div className={styles.vipBtnGroup}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <MessageSquare size={18} /> Book Appointment on WhatsApp
                </a>
                <Link href="/contact" className="btn btn-outline-gold" style={{ width: '100%' }}>
                  Inquire via Email
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Full-width Google Maps Embed */}
        <div className={styles.fullMapSection}>
          <div className={styles.mapHeaderBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Navigation size={24} style={{ color: 'var(--color-secondary)' }} />
              <div>
                <h3 className={styles.mapHeaderTitle}>Interactive Store Map</h3>
                <span style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.7)' }}>
                  123 Luxury Avenue, Owerri, Imo State, Nigeria
                </span>
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-gold btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              Open in Google Maps <ExternalLink size={14} />
            </a>
          </div>

          <iframe
            src={STORE_CONFIG.address.mapEmbedUrl}
            className={styles.fullMapIframe}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Noir Scents Boutique Google Map"
          />
        </div>
      </section>
    </main>
  );
}
