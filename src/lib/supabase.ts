
import { createClient } from '@supabase/supabase-js';

// Setup instructions for the user:
// 1. Create a project on https://supabase.com
// 2. Initialise the database using the schema in supabase_schema.sql
// 3. Get your URL and NON-PUBLIC (Anon) Key
// 4. Create a .env file and add:
//    VITE_SUPABASE_URL=your-project-url
//    VITE_SUPABASE_ANON_KEY=your-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
