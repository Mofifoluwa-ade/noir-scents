import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xvdjnewculljznykdkyd.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZGpuZXdjdWxsanpueWtka3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5Njg3NzQsImV4cCI6MjEwMTU0NDc3NH0.R5OFzNUHca3yvMAmKxejTX1ouHP2B1uelItTgCkmv54';

  return createBrowserClient(url, key);
}
