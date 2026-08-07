'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface OrderStatusSelectProps {
  orderId: string;
  initialStatus: string;
}

export default function OrderStatusSelect({ orderId, initialStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);
    } catch (error) {
      console.error('Error updating status:', error);
      // Revert on error
      setStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case 'pending': return '#d97706';
      case 'processing': return '#2563eb';
      case 'delivered': return '#059669';
      case 'cancelled': return '#dc2626';
      default: return '#4b5563';
    }
  };

  const getStatusBg = (currentStatus: string) => {
    switch (currentStatus.toLowerCase()) {
      case 'pending': return '#fef3c7';
      case 'processing': return '#dbeafe';
      case 'delivered': return '#d1fae5';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      style={{
        padding: '0.25rem 0.5rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        border: 'none',
        outline: 'none',
        cursor: loading ? 'wait' : 'pointer',
        color: getStatusColor(status),
        backgroundColor: getStatusBg(status),
        appearance: 'none',
        textAlign: 'center',
      }}
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}
