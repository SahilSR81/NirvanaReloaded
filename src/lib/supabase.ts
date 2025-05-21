import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  toast.error('Supabase configuration is missing. Please check your environment variables.');
  console.error('Supabase environment variables are missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Add error handling for storage operations
export const handleStorageError = (error: any) => {
  const message = error?.message || 'An error occurred while accessing storage';
  toast.error(message);
  console.error('Storage operation failed:', error);
};

// Test connection
supabase.auth.getSession().catch(error => {
  console.error('Failed to connect to Supabase:', error);
  toast.error('Failed to connect to Supabase. Please check your configuration.');
});