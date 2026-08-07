import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Flame, Droplets, Wind, ArrowRight } from 'lucide-react';
import styles from './Gallery.module.css';

export const metadata: Metadata = {
  title: 'Fragrance Gallery & Lifestyle Portfolio | Noir Scents',
  description: 'Explore the aesthetic universe of Noir Scents. View our luxury fragrance compositions, signature bottle profiles, and olfactory notes.',
};

const GALLERY_ITEMS = [
  {
    id: 'eternal-bloom',
    title: 'Eternal Bloom',
    category: 'Floral Extraits',
    description: 'Sun-drenched French Jasmine and Velvet Damascus Rose in full bloom, enveloped in sheer Cashmere Wood.',
    notes: ['Velvet Rose', 'French Jasmine', 'White Musk', 'Cashmere Wood'],
    price: '₦45,000',
    accentGradient: 'linear-gradient(135deg, #2b1720 0%, #0a0a0a 100%)',
    icon: Sparkles,
  },
  {
    id: 'midnight-oak',
    title: 'Midnight Oak',
    category: 'Woody Extraits',
    description: 'Smoky Atlas Cedarwood and aged Royal Amber in the twilight hours. Mysterious, grounded, and noble.',
    notes: ['Smoky Cedarwood', 'Aged Oud', 'Bourbon Tobacco', 'Black Pepper'],
    price: '₦52,000',
    accentGradient: 'linear-gradient(135deg, #1c221a 0%, #0a0a0a 100%)',
    icon: Flame,
  },
  {
    id: 'golden-citrus',
    title: 'Golden Citrus',
    category: 'Citrus Extraits',
    description: 'Zesty Calabrian Bergamot, Neroli, and warm Mediterranean Amber sunset. Crisp, vibrant, and invigorating.',
    notes: ['Calabrian Bergamot', 'Orange Blossom', 'Warm Amber', 'Vetiver'],
    price: '₦42,000',
    accentGradient: 'linear-gradient(135deg, #2c2415 0%, #0a0a0a 100%)',
    icon: Droplets,
  },
  {
    id: 'mystic-oud',
    title: 'Mystic Oud',
    category: 'Oriental Extraits',
    description: 'Deep Royal Oud wood, rare saffron strands, and intoxicating incense from the ancient Orient.',
    notes: ['Cambodian Oud', 'Saffron Threads', 'Myrrh Incense', 'Dark Leather'],
    price: '₦60,000',
    accentGradient: 'linear-gradient(135deg, #2a1528 0%, #0a0a0a 100%)',
    icon: Sparkles,
  },
  {
    id: 'ocean-breeze',
    title: 'Ocean Breeze',
    category: 'Fresh Extraits',
    description: 'Crisp Atlantic Sea Salt, sun-dried Driftwood, and crushed Mint Leaves. Cool, fresh, and expansive.',
    notes: ['Atlantic Sea Salt', 'Driftwood', 'Crushed Mint', 'Marine Ambergris'],
    price: '₦40,000',
    accentGradient: 'linear-gradient(135deg, #12242b 0%, #0a0a0a 100%)',
    icon: Wind,
  },
  {
    id: 'vanilla-dream',
    title: 'Vanilla Dream',
    category: 'Gourmand Extraits',
    description: 'Warm Madagascar Bourbon Vanilla, roasted Tonka Bean, and creamy Australian Sandalwood.',
    notes: ['Bourbon Vanilla', 'Roasted Tonka', 'Creamy Sandalwood', 'Orchid'],
    price: '₦48,000',
    accentGradient: 'linear-gradient(135deg, #2e1d16 0%, #0a0a0a 100%)',
    icon: Droplets,
  },
  {
    id: 'bleu-spirit',
    title: 'Bleu Spirit',
    category: 'Fresh Extraits',
    description: 'A modern masterpiece of Grapefruit zest, Pink Pepper, and radiant Cedarwood. Unforgettable sophistication.',
    notes: ['Fresh Grapefruit', 'Pink Pepper', 'Iso E Super', 'Dry Cedar'],
    price: '₦50,000',
    accentGradient: 'linear-gradient(135deg, #111a2e 0%, #0a0a0a 100%)',
    icon: Wind,
  },
  {
    id: 'imperial-velvet',
    title: 'Imperial Velvet',
    category: 'Oriental Extraits',
    description: 'Crushed Florentine Iris, luscious Blackberries, and rich Tuscan Leather. Dark, velvety, and regal.',
    notes: ['Florentine Iris', 'Wild Blackberry', 'Tuscan Leather', 'Patchouli'],
    price: '₦58,000',
    accentGradient: 'linear-gradient(135deg, #241126 0%, #0a0a0a 100%)',
    icon: Sparkles,
  },
];

export default function GalleryPage() {
  return (
    <main>
      {/* Hero Header */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>Olfactory Masterpieces</span>
        <h1 className={styles.heroTitle}>Fragrance Gallery</h1>
        <div className={styles.goldDivider}></div>
        <p className={styles.heroSubtitle}>
          An artistic showcase of our signature extraits de parfum. Immerse yourself in the scent profiles, 
          ingredient origins, and aesthetic stories behind each bottle.
        </p>
      </section>

      {/* Gallery Showcase Grid */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.galleryGrid}>
            {GALLERY_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.id} className={styles.galleryCard}>
                  {/* Card Visual Placeholder Header */}
                  <div className={styles.cardVisual}>
                    <div 
                      className={styles.cardVisualBackground} 
                      style={{ background: item.accentGradient }}
                    />
                    <div className={styles.cardVisualBackgroundPattern} />
                    
                    <span className={styles.categoryBadge}>{item.category}</span>

                    <div className={styles.bottleIconWrapper}>
                      <IconComponent size={36} />
                    </div>

                    <h3 className={styles.cardTitle}>{item.title}</h3>
                  </div>

                  {/* Card Content */}
                  <div className={styles.cardBody}>
                    <p className={styles.cardDescription}>{item.description}</p>
                    
                    <div className={styles.notesHeader}>Key Fragrance Notes</div>
                    <div className={styles.notesList}>
                      {item.notes.map((note, idx) => (
                        <span key={idx} className={styles.notePill}>
                          {note}
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.priceTag}>Starting at {item.price}</span>
                      <Link href="/shop" className={styles.viewBtn}>
                        Explore <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
