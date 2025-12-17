import { createClient } from '@supabase/supabase-js';

// Access environment variables safely.
const env = (import.meta as any).env || {};

// Configuração do Supabase
// Utilizamos a URL fornecida como padrão
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://vonsiffqeupyrlwljhya.supabase.co';

// Utilizamos a chave fornecida como padrão
// Nota: A chave hardcoded aqui parece ser uma Service Role Key baseada nos comentários anteriores.
// Em produção real, deve-se usar a Anon Key no frontend e configurar RLS (Row Level Security) no banco.
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbnNpZmZxZXVweXJsd2xqaHlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1MjIwMSwiZXhwIjoyMDgxMjI4MjAxfQ.Xw_b2OmKVwODQOMksOhswt6pu_nIXX5zNp7j_BP7EgY';

// Verifica se a chave existe e é válida
export const isSupabaseConfigured = !!supabaseKey && supabaseKey !== 'placeholder';

if (!isSupabaseConfigured) {
  console.warn(
    'Aviso: Credenciais do Supabase não encontradas. O app funcionará com limitações.'
  );
}

// Inicializa o cliente com configurações de persistência
export const supabase = createClient(
  supabaseUrl,
  supabaseKey || 'placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);