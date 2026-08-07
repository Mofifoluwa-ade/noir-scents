import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Attitude of ELITE PERSONALITY</h1>
        <p className={styles.subtitle}>Crafted for those who speak without words</p>
        <Link href="/shop" className={`btn btn-primary ${styles.cta}`}>
          Explore Collection
        </Link>
        <div className={styles.goldLineDecor}></div>
      </div>
    </section>
  );
}
