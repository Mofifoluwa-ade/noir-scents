import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BoutiqueAddress from '@/components/home/BoutiqueAddress';
import Newsletter from '@/components/home/Newsletter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noir Scents | Luxury Perfumes & Fragrances',
  description: 'Discover our exclusive collection of premium fragrances crafted for the elite.',
};

export default async function Home() {
  return (
    <main>
      <HeroSection />
      
      {/* Brand Story Section */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Our Heritage</h2>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-secondary)', margin: '0 auto 2rem' }}></div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-primary)', opacity: 0.8 }}>
            At Noir Scents, we believe that a fragrance is more than just a scent—it is an unspoken language, an invisible yet unforgettable accessory. 
            Meticulously blended from the rarest ingredients around the world, our perfumes are crafted to embody the essence of luxury, elegance, and power.
          </p>
        </div>
      </section>

      <FeaturedProducts />

      {/* Refund Policy Teaser */}
      <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f0ebe1', borderTop: '1px solid rgba(201, 168, 76, 0.3)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>The Noir Guarantee</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-primary)', opacity: 0.8, marginBottom: '1.5rem' }}>
            We stand behind the exceptional quality of our fragrances. Enjoy a complimentary sample with every order to try before you open the full size. 
            If it’s not your perfect signature scent, return the unopened bottle for a full refund.
          </p>
        </div>
      </section>

      <BoutiqueAddress />
      <Newsletter />
    </main>
  );
}
