import ProductForm from '@/components/admin/ProductForm';
import styles from './NewProduct.module.css';

export default function NewProductPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Add New Product</h1>
      <ProductForm />
    </div>
  );
}
