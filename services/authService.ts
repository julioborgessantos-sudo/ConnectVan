import { User } from '../types';
import { 
  MOCK_USER_CLIENT, 
  MOCK_USER_DRIVER, 
  MOCK_USER_PARTNER, 
  MOCK_USER_ADMIN 
} from '../constants';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulação de verificação de senha
        if (password !== '123456' && email !== 'admin@vanconnect.com') {
          // Senha padrão para testes: 123456
          // Senha admin: admin123 (tratada abaixo)
           reject(new Error('Credenciais inválidas. Tente senha: "123456"'));
           return;
        }

        let user: User | null = null;

        // Roteamento simples de mock por email
        if (email === 'admin@vanconnect.com' && password === 'admin123') {
          user = MOCK_USER_ADMIN;
        } else if (email.includes('pai') || email.includes('cliente')) {
          user = MOCK_USER_CLIENT;
        } else if (email.includes('roberto') || email.includes('motorista')) {
          user = MOCK_USER_DRIVER;
        } else if (email.includes('oficina') || email.includes('parceiro')) {
          user = MOCK_USER_PARTNER;
        }

        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Usuário não encontrado.'));
        }
      }, 800);
    });
  },

  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        resolve();
      }, 300);
    });
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
};