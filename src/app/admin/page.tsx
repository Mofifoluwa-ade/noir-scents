import { createClient } from '@/lib/supabase/server';
import KpiCard from '@/components/admin/KpiCard';
import { Package, ShoppingBag, Clock, Users } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/format';
import styles from './Dashboard.module.css';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch KPI data
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  const { count: pendingCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
  const { count: userCount } = await supabase.from('users').select('*', { count: 'exact', head: true }) || { count: 0 }; // Placeholder if no users table

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.pageTitle}>Dashboard</h1>

      <div className={styles.kpiGrid}>
        <KpiCard title="Total Products" value={productCount || 0} icon={Package} />
        <KpiCard title="Total Orders" value={orderCount || 0} icon={ShoppingBag} />
        <KpiCard title="Pending Orders" value={pendingCount || 0} icon={Clock} />
        <KpiCard title="Total Users" value={userCount || 0} icon={Users} />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Recent Orders</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.order_number || order.id.substring(0, 8)}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.items_count || 1}</td>
                  <td>{formatPrice(order.total_amount)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[order.status?.toLowerCase() || 'pending']}`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td>{formatDate(order.created_at)}</td>
                </tr>
              ))}
              {!recentOrders?.length && (
                <tr>
                  <td colSpan={6} className={styles.emptyState}>No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
