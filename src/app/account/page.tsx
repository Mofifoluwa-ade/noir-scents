import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import styles from './Account.module.css';
import ProfileForm from './ProfileForm';

export default async function AccountPage() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login?redirect=/account');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const name = profile?.full_name || user.user_metadata?.full_name || 'User';

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Profile</h1>
      
      <div className={styles.card}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {getInitials(name)}
          </div>
          <div className={styles.avatarInfo}>
            <div className={styles.avatarName}>{name}</div>
            <div className={styles.avatarEmail}>{user.email}</div>
          </div>
        </div>

        <ProfileForm 
          user={user} 
          profile={profile || {}} 
        />
      </div>
    </div>
  );
}
