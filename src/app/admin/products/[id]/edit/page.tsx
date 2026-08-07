import { createClient } from '@/lib/supabase/server';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';
import styles from '../../new/NewProduct.module.css';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
