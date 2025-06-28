import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase URL ve Anon Key'i buraya ekle
const SUPABASE_URL = 'https://iqalytsgyfzfrntfczme.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxYWx5dHNneWZ6ZnJudGZjem1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTIyNzgsImV4cCI6MjA2MTU4ODI3OH0.1trJwfnlViTVXBg8FaS6cMBTu7DRSqpY1xC0pdraQ6E';
// // Supabase URL ve Anon Key'i buraya ekle

// Supabase istemcisini oluştur
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  // ✅ Realtime devre dışı bırakılıyor
  realtime: {
    enabled: false,
  },
});

export default supabase;
