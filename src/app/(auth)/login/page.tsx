'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import styles from './Login.module.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const redirect = searchParams?.get('redirect') || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      router.push(redirect);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.badge}>NOIR SCENTS</span>
        <h1 className={styles.heading}>Welcome Back</h1>
        <p className={styles.subtitle}>Enter your email & password to access your account</p>
      </div>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.row}>
          <label className={styles.checkboxContainer}>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className={styles.forgot}>
            Forgot password?
          </Link>
        </div>
        
        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      
      <div className={styles.footer}>
        Don't have an account?
        <Link href={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`} className={styles.link}>
          Create one
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ color: '#C9A84C', textAlign: 'center', padding: '3rem' }}>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
