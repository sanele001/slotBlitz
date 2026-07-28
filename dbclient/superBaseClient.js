import { createClient } from '@supabase/supabase-js';

// Grab the environment variables based on your build tool
const supabaseUrl = 'https://riwpejbjodmpnfrplyeo.supabase.co';
const supabaseAnonKey = 'sb_publishable_20H6DiVNgLqZBHkOLfYGPQ_gkeqB-mC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
