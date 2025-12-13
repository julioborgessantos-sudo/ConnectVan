import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  // O terceiro argumento '' garante que carregue todas as vars, não apenas as com prefixo VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      // Isso permite usar process.env.API_KEY no código do cliente sem quebrar o build.
      // Lembre-se de adicionar a variável 'API_KEY' nas configurações do projeto na Vercel.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});