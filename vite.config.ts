import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  // O cast (process as any) evita erros de tipagem no build se @types/node faltar
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Isso permite usar process.env.API_KEY no código do cliente sem quebrar o build.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});