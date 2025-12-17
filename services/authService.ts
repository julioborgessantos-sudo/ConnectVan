import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, UserRole } from '../types';
import { MOCK_USER_ADMIN, MOCK_USER_CLIENT, MOCK_USER_DRIVER, MOCK_USER_PARTNER } from '../constants';

const mapSessionToUser = async (sessionUser: any): Promise<User | null> => {
  if (!sessionUser) return null;

  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single();

    if (error || !profile) {
      return {
        id: sessionUser.id,
        email: sessionUser.email || '',
        name: sessionUser.user_metadata?.name || 'Usuário',
        role: (sessionUser.user_metadata?.role as UserRole) || UserRole.CLIENT,
      };
    }

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role as UserRole,
      avatarUrl: profile.avatar_url
    };
  } catch (err) {
    console.error('Erro ao mapear sessão:', err);
    return null;
  }
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Fallback para mocks apenas se falhar no Supabase e for um usuário conhecido de teste
        const isMock = ['admin@vanconnect.com', 'roberto@exemplo.com', 'pai@exemplo.com', 'oficina@parceiro.com'].includes(email);
        if (!isMock) throw error;
      } else if (data.user) {
        const mapped = await mapSessionToUser(data.user);
        if (mapped) return mapped;
      }
    }

    // Fallback Mock (Modo Demo)
    if (email === 'admin@vanconnect.com' && password === 'admin123') return MOCK_USER_ADMIN;
    if (email === 'roberto@exemplo.com' && password === '123456') return MOCK_USER_DRIVER;
    if (email === 'pai@exemplo.com' && password === '123456') return MOCK_USER_CLIENT;
    if (email === 'oficina@parceiro.com' && password === '123456') return MOCK_USER_PARTNER;

    throw new Error('Credenciais inválidas.');
  },

  register: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    if (!isSupabaseConfigured) throw new Error('Supabase não configurado.');

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, role } }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Erro ao criar usuário.');

    // Salva na tabela public.profiles
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: authData.user.id, name, email, role }
    ]);

    if (profileError) {
      console.error("Erro ao criar perfil na tabela profiles:", profileError);
      // O usuário já foi criado no Auth, então não bloqueamos o retorno, 
      // mas o perfil pode precisar de correção manual no DB.
    }

    return { id: authData.user.id, name, email, role };
  },

  logout: async (): Promise<void> => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
  },

  getCurrentSession: async (): Promise<User | null> => {
    if (!isSupabaseConfigured) return null;
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user ? await mapSessionToUser(session.user) : null;
  }
};