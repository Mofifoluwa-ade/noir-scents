import styles from './BoutiqueAddress.module.css';
import { STORE_CONFIG } from '@/lib/constants';

export default function BoutiqueAddress() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textColumn}>
            <h2 className={styles.title}>Visit Our Boutique</h2>
            <div className={styles.goldLine}></div>
            <p className={styles.description}>
              Experience the essence of luxury in person. Our boutique offers a curated 
              selection of the finest fragrances, guided by our expert perfumers.
            </p>
            <div className={styles.addressBox}>
              <h3 className={styles.addressTitle}>Noir Scents Flagship</h3>
              <p className={styles.addressLine}>{STORE_CONFIG.address.street}</p>
              <p className={styles.addressLine}>{STORE_CONFIG.address.city}, {STORE_CONFIG.address.state}</p>
              <p className={styles.addressLine}>{STORE_CONFIG.address.country}</p>
              
              <div className={styles.contactInfo}>
                <p><strong>Phone:</strong> {STORE_CONFIG.phone}</p>
                <p><strong>Email:</strong> {STORE_CONFIG.email}</p>
              </div>
            </div>
          </div>
          <div className={styles.mapColumn}>
            <iframe
              src={STORE_CONFIG.address.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126848.45041496019!2d3.2929312015391395!3d6.516568856637372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1716380628285!5m2!1sen!2sng"}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.map}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
