import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcjwvdbafyxyerrwvnhc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jand2ZGJhZnl4eWVycnd2bmhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTc4MzksImV4cCI6MjA5MjU5MzgzOX0.EeP53vgQCDXtuBTHWSSdtH2ypeBvlBJGQzh4SBF5C-M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);