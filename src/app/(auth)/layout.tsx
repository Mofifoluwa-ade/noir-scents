import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: '#0a0a0a',
      backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(201, 168, 76, 0.08) 0%, transparent 60%)',
    }}>
      {children}
    </div>
  );
}
