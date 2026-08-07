'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Product } from '@/lib/types';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  initialData?: Partial<Product>;
}

// Simple slugify function
const slugify = (text: string) => 
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categoryName = typeof initialData?.category === 'object' 
    ? initialData.category?.name 
    : (initialData?.category || 'Floral');

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: categoryName,
    description: initialData?.description || '',
    story: initialData?.story || '',
    price_50ml: initialData?.price_50ml || '',
    price_100ml: initialData?.price_100ml || '',
    price_200ml: initialData?.price_200ml || '',
    discount_percent: initialData?.discount_percent || 0,
    stock_status: initialData?.stock_status || 'in_stock',
    featured: initialData?.featured || false,
    status: initialData?.status || 'active',
    imageUrl: initialData?.images?.[0] || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }

    setFormData(prev => {
      const updated = { ...prev, [name]: parsedValue };
      if (name === 'name' && !initialData) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        story: formData.story,
        price_50ml: Number(formData.price_50ml) || 0,
        price_100ml: Number(formData.price_100ml) || 0,
        price_200ml: Number(formData.price_200ml) || 0,
        discount_percent: Number(formData.discount_percent) || 0,
        stock_status: formData.stock_status,
        featured: Boolean(formData.featured),
        status: formData.status,
        images: formData.imageUrl ? [formData.imageUrl] : ['/placeholder.jpg'],
      };

      if (initialData?.id) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', initialData.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);
        if (insertError) throw insertError;
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Slug</label>
          <input required name="slug" value={formData.slug} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Floral</option>
            <option>Woody</option>
            <option>Citrus</option>
            <option>Oriental</option>
            <option>Fresh</option>
            <option>Gourmand</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Stock Status</label>
          <select name="stock_status" value={formData.stock_status} onChange={handleChange}>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label>Description</label>
        <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} />
      </div>

      <div className={styles.field}>
        <label>Story (Optional)</label>
        <textarea name="story" value={formData.story} onChange={handleChange} rows={4} />
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Price 50ml (₦)</label>
          <input type="number" name="price_50ml" value={formData.price_50ml} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Price 100ml (₦)</label>
          <input type="number" name="price_100ml" value={formData.price_100ml} onChange={handleChange} />
        </div>
        <div className={styles.field}>
          <label>Price 200ml (₦)</label>
          <input type="number" name="price_200ml" value={formData.price_200ml} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.field}>
        <label>Image URL</label>
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className={styles.toggles}>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
          Featured Product
        </label>
        <label className={styles.checkboxLabel}>
          <input type="checkbox" name="status" checked={formData.status === 'active'} onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.checked ? 'active' : 'inactive' }))} />
          Active (Visible on store)
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" onClick={() => router.back()} className={styles.cancelBtn}>Cancel</button>
        <button type="submit" disabled={loading} className={styles.saveBtn}>
          {loading ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  );
}
