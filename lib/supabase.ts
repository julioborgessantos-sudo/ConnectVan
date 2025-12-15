import { createClient } from '@supabase/supabase-js';

// Access environment variables safely. In some environments import.meta.env might be undefined during initialization.
// We cast to any to allow safe checking even if types define env as required.
const env = (import.meta as any).env || {};

// Configuração do Supabase
// Utilizamos a URL fornecida como padrão
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://vonsiffqeupyrlwljhya.supabase.co';

// Utilizamos a chave fornecida como padrão
// Nota: A chave fornecida é uma Service Role Key (admin). 
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvbnNpZmZxZXVweXJsd2xqaHlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1MjIwMSwiZXhwIjoyMDgxMjI4MjAxfQ.Xw_b2OmKVwODQOMksOhswt6pu_nIXX5zNp7j_BP7EgY';

// Verifica se a chave existe e é válida (não vazia e não é o placeholder antigo)
export const isSupabaseConfigured = !!supabaseAnonKey && supabaseAnonKey !== 'placeholder';

if (!isSupabaseConfigured) {
  console.warn(
    'Aviso: VITE_SUPABASE_ANON_KEY não encontrada. O app funcionará em modo de demonstração com usuários Mock.'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'placeholder'
);