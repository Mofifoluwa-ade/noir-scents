'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Edit2, Save, X } from 'lucide-react';
import styles from './Account.module.css';

export default function ProfileForm({ user, profile }: { user: any, profile: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: profile.full_name || user.user_metadata?.full_name || '',
    phone: profile.phone || '',
    address: profile.address || '',
  });

  const router = useRouter();
  const supabase = createClient();

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      // Also update user metadata if name changed
      if (formData.full_name !== user.user_metadata?.full_name) {
        await supabase.auth.updateUser({
          data: { full_name: formData.full_name }
        });
      }

      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <>
        <div className={styles.header} style={{ marginTop: '2rem' }}>
          <h2 className={styles.title}>Personal Information</h2>
          <button 
            className="btn btn-dark" 
            onClick={() => setIsEditing(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Full Name</span>
            <span className={styles.detailValue}>{formData.full_name || 'Not set'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>{user.email}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Phone Number</span>
            <span className={styles.detailValue}>{formData.phone || 'Not set'}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Shipping Address</span>
            <span className={styles.detailValue}>{formData.address || 'Not set'}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.header} style={{ marginTop: '2rem' }}>
        <h2 className={styles.title}>Edit Profile</h2>
        <button 
          className="btn" 
          onClick={() => setIsEditing(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid #ccc' }}
        >
          <X size={16} />
          Cancel
        </button>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label className={styles.label}>Full Name</label>
          <input 
            type="text" 
            className={styles.input} 
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input 
            type="email" 
            className={styles.input} 
            value={user.email}
            disabled
            style={{ backgroundColor: '#f5f5f5', color: '#888' }}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Phone Number</label>
          <input 
            type="tel" 
            className={styles.input} 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Shipping Address</label>
          <textarea 
            className={styles.input} 
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button 
          className="btn btn-primary" 
          onClick={handleSave}
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Save size={16} />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </>
  );
}
