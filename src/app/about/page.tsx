import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Sparkles, 
  Compass, 
  Eye, 
  Award, 
  ShieldCheck, 
  Crown, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import styles from './About.module.css';

export const metadata: Metadata = {
  title: 'Our Story | Noir Scents Luxury Fragrance',
  description: 'Learn about Noir Scents, a premier Nigerian haute parfumerie crafting opulent fragrances for individuals of distinction.',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>Haute Parfumerie</span>
        <h1 className={styles.heroTitle}>Our Story</h1>
        <div className={styles.goldDivider}></div>
        <p className={styles.heroSubtitle}>
          Born in Nigeria, crafted for the world. Noir Scents creates high-concentration, 
          evocative fragrances that express power, sophistication, and individuality without saying a word.
        </p>
      </section>

      {/* Brand Story Section */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <span className={styles.storyBadge}>Nigerian Luxury Redefined</span>
              <h2 className={styles.sectionHeading}>The Art of Unspoken Elegance</h2>
              <p className={styles.paragraph}>
                Founded with a conviction that scent is the ultimate personal signature, Noir Scents emerged 
                to redefine luxury perfumery in West Africa. We marry centuries-old French compounding traditions 
                with rare, exotic botanicals sourced across Africa, the Middle East, and Grasse.
              </p>
              <p className={styles.paragraph}>
                Every bottle from our Owerri atelier is an exercise in restraint and grandeur. We use 
                extraordinarily high oil concentrations—ensuring our extraits de parfum linger on skin and 
                fabric for over 24 hours, casting a intoxicating sillage.
              </p>
              <blockquote className={styles.quoteBlock}>
                &ldquo;A true fragrance does not announce your arrival loudly—it commands the room effortlessly and lingers in memory long after you have departed.&rdquo;
              </blockquote>
              
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>30%+</span>
                  <span className={styles.statLabel}>Oil Concentration</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>24h+</span>
                  <span className={styles.statLabel}>Sillage Longevity</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>100%</span>
                  <span className={styles.statLabel}>Artisanal Craft</span>
                </div>
              </div>
            </div>

            <div className={styles.storyVisualCard}>
              <span className={styles.visualBadge}>Noir Standards</span>
              <h3 className={styles.visualTitle}>The Noir Difference</h3>
              <p style={{ color: 'rgba(245, 240, 232, 0.8)', fontSize: '0.95rem' }}>
                We believe discerning scent enthusiasts deserve fragrances that perform exceptionally 
                without compromising on purity or elegance.
              </p>

              <div className={styles.visualList}>
                <div className={styles.visualListItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className={styles.visualItemText}>
                    <h4>Hand-Compounded Extracts</h4>
                    <p>Matured for 8 weeks in temperature-controlled oak vaults to allow notes to harmonize seamlessly.</p>
                  </div>
                </div>

                <div className={styles.visualListItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className={styles.visualItemText}>
                    <h4>Complimentary Sample Decant</h4>
                    <p>Every bottle includes a try-before-you-open tester, guaranteeing total confidence in your purchase.</p>
                  </div>
                </div>

                <div className={styles.visualListItem}>
                  <div className={styles.iconWrapper}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className={styles.visualItemText}>
                    <h4>Ethical & Sustainable Oils</h4>
                    <p>Responsibly harvested rare oud, rose, and amber extracts from certified artisanal distilleries.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className={styles.missionVisionSection}>
        <div className="container">
          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <div className={styles.mvHeader}>
                <div className={styles.mvIcon}>
                  <Compass size={28} />
                </div>
                <h3 className={styles.mvTitle}>Our Mission</h3>
              </div>
              <p className={styles.mvText}>
                To craft evocative, extra-long-lasting luxury fragrances that empower individuals to express 
                their unique identity, heritage, and distinction. We aim to elevate West African perfumery onto 
                the world stage through artisanal precision, opulent ingredients, and unmatched customer care.
              </p>
            </div>

            <div className={styles.mvCard}>
              <div className={styles.mvHeader}>
                <div className={styles.mvIcon}>
                  <Eye size={28} />
                </div>
                <h3 className={styles.mvTitle}>Our Vision</h3>
              </div>
              <p className={styles.mvText}>
                To become Africa&apos;s premier haute parfumerie house—celebrated globally for olfactory innovation, 
                timeless luxury aesthetic, and setting the gold standard of fragrance craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <h2>Pillars of Excellence</h2>
            <div className={styles.goldDivider}></div>
            <p>The uncompromising principles that guide every bottle we blend and every scent we create.</p>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}>
                <Award size={32} />
              </div>
              <h3 className={styles.valueTitle}>Quality</h3>
              <p className={valueTextClass}>
                We source only premium grade extraits and pure botanical oils. Never diluted, never compromised—built 
                for deep development on the skin.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}>
                <ShieldCheck size={32} />
              </div>
              <h3 className={styles.valueTitle}>Authenticity</h3>
              <p className={valueTextClass}>
                Original formulations created with distinct personality. We celebrate individuality and bottle scent profile 
                clarity that stands out.
              </p>
            </div>

            <div className={styles.valueCard}>
              <div className={styles.valueIconBox}>
                <Crown size={32} />
              </div>
              <h3 className={styles.valueTitle}>Luxury</h3>
              <p className={valueTextClass}>
                From heavy glass bottles to gold-embossed packaging, every detail is engineered to evoke a feeling 
                of prestige and royalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Find Your Signature Scent</h2>
          <p className={styles.ctaText}>
            Explore our curated catalog of extraits de parfum or visit our boutique for a personalized scent fitting.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Explore Fragrances <ArrowRight size={18} />
            </Link>
            <Link href="/visit-us" className="btn btn-outline-gold btn-lg">
              Visit Our Boutique
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const valueTextClass = styles.valueText;
