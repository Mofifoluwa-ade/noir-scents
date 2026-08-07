import { LucideIcon } from 'lucide-react';
import styles from './KpiCard.module.css';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export default function KpiCard({ title, value, icon: Icon, trend, trendUp }: KpiCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.value}>{value}</p>
        </div>
        <div className={styles.iconWrapper}>
          <Icon size={24} className={styles.icon} />
        </div>
      </div>
      {trend && (
        <div className={`${styles.trend} ${trendUp ? styles.trendUp : styles.trendDown}`}>
          {trend}
        </div>
      )}
    </div>
  );
}
