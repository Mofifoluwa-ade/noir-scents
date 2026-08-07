import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PackageOpen } from 'lucide-react';
import styles from './Orders.module.css';
import { formatPrice, formatDate, getOrderStatusInfo } from '@/lib/format';

export default async function OrdersPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/account/orders');
  }

  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        id
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Orders</h1>
      
      <div className={styles.card}>
        {!orders || orders.length === 0 ? (
          <div className={styles.emptyState}>
            <PackageOpen className={styles.emptyIcon} />
            <div>
              <div className={styles.emptyText}>No orders yet</div>
              <div className={styles.emptySubtext}>When you place orders, they will appear here.</div>
            </div>
            <Link href="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusInfo = getOrderStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td className={styles.orderId}>
                      {order.id.split('-')[0].toUpperCase()}
                    </td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.items?.length || 0} items</td>
                    <td style={{ fontWeight: 600 }}>{formatPrice(order.total || 0)}</td>
                    <td>
                      <span className={`badge badge-${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
