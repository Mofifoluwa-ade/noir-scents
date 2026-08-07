import { ReactNode } from 'react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--color-surface)'
    }}>
      <header style={{ padding: '2rem', textAlign: 'center' }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          letterSpacing: '0.1em',
          textDecoration: 'none'
        }}>
          NOIR SCENTS
        </Link>
      </header>
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {children}
      </main>
    </div>
  );
}
