import { ReactNode } from 'react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import styles from './AdminLayout.module.css';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  let user = null;
  
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user;
  } catch (e) {
    console.warn('Auth check skipped in AdminLayout:', e);
  }

  // Redirect to login if unauthenticated
  if (!user && process.env.NODE_ENV === 'production') {
    redirect('/login?redirect=/admin');
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
