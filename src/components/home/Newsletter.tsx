'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);
        
      if (error) throw error;
      
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMessage('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Stay in the Loop</h2>
          <p className={styles.subtitle}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className={styles.input}
                disabled={status === 'loading'}
              />
              <button 
                type="submit" 
                className={styles.button}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            
            {status === 'success' && <p className={styles.successMessage}>{message}</p>}
            {status === 'error' && <p className={styles.errorMessage}>{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
