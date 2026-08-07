import { createClient } from '@/lib/supabase/server';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from './Advertisements.module.css';

export default async function AdminAdvertisementsPage() {
  const supabase = await createClient();
  // Fetch from ads table (assuming table is 'advertisements')
  const { data: ads } = await supabase.from('advertisements').select('*').order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Advertisements</h1>
        <button className={styles.addButton}>
          <Plus size={20} />
          Add Advertisement
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads?.map((ad) => (
              <tr key={ad.id}>
                <td>
                  <img src={ad.image_url || '/placeholder-banner.jpg'} alt={ad.title} className={styles.thumbnail} />
                </td>
                <td className={styles.title}>{ad.title}</td>
                <td>{ad.position || 'Hero'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${ad.is_active ? styles.active : styles.inactive}`}>
                    {ad.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.editBtn}><Edit size={18} /></button>
                    <button className={styles.deleteBtn}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {(!ads || ads.length === 0) && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>No advertisements found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
