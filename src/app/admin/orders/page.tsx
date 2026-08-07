import { createClient } from '@/lib/supabase/server';
import { formatPrice, formatDate } from '@/lib/format';
import OrderStatusSelect from '@/components/admin/OrderStatusSelect';
import styles from './AdminOrders.module.css';

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Orders</h1>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className={styles.orderNumber}>{order.order_number || order.id.substring(0, 8)}</td>
                <td>{order.customer_name}</td>
                <td>{order.customer_email}</td>
                <td>{order.items_count || 1}</td>
                <td className={styles.price}>{formatPrice(order.total_amount)}</td>
                <td>
                  <OrderStatusSelect orderId={order.id} initialStatus={order.status || 'Pending'} />
                </td>
                <td>{formatDate(order.created_at)}</td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
