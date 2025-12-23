import { User, UserRole } from '../types';
import { MOCK_USER_ADMIN, MOCK_USER_CLIENT, MOCK_USER_DRIVER, MOCK_USER_PARTNER } from '../constants';

// Simulação de persistência de sessão local
const SESSION_KEY = 'vanconnect_mock_user';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulação de delay de rede
    await new Promise(resolve => setTimeout(resolve, 800));

    let user: User | null = null;

    if (email === 'admin@vanconnect.com' && password === 'admin123') user = MOCK_USER_ADMIN;
    else if (email === 'roberto@exemplo.com' && password === '123456') user = MOCK_USER_DRIVER;
    else if (email === 'pai@exemplo.com' && password === '123456') user = MOCK_USER_CLIENT;
    else if (email === 'oficina@parceiro.com' && password === '123456') user = MOCK_USER_PARTNER;

    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    }

    throw new Error('Credenciais inválidas. Tente os usuários de exemplo listados abaixo.');
  },

  register: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simula a criação de um novo usuário
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    };

    // Em modo mock, apenas retornamos sucesso. 
    // Em um app real sem backend, poderíamos salvar em uma lista no localStorage.
    return newUser;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentSession: async (): Promise<User | null> => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
};