import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single Supabase client for the entire app
// Works in both Server Components and Client Components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
