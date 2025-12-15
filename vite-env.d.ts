// Manually define ImportMetaEnv to avoid "Cannot find type definition file for 'vite/client'" error
// and ensure lib/supabase.ts can access import.meta.env correctly.

interface ImportMetaEnv {
  // Fixed: Corrected the type from a URL string literal to 'string'
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}