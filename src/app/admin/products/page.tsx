import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import styles from './Products.module.css';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Products</h1>
        <Link href="/admin/products/new" className={styles.addButton}>
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image_url || '/placeholder.jpg'} alt={product.name} className={styles.thumbnail} />
                </td>
                <td className={styles.productName}>{product.name}</td>
                <td>{product.category}</td>
                <td>
                  <span className={`${styles.stockBadge} ${styles[product.stock_status?.replace(/\s+/g, '').toLowerCase() || 'instock']}`}>
                    {product.stock_status || 'In Stock'}
                  </span>
                </td>
                <td>
                  <span className={`${styles.statusBadge} ${product.is_active ? styles.active : styles.inactive}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <Link href={`/admin/products/${product.id}/edit`} className={styles.editBtn}>
                      <Edit size={18} />
                    </Link>
                    <button className={styles.deleteBtn}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={6} className={styles.emptyState}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
