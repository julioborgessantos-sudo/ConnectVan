import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, UserRole } from '../types';
import { MOCK_USER_ADMIN, MOCK_USER_CLIENT, MOCK_USER_DRIVER, MOCK_USER_PARTNER } from '../constants';

// Helper para mapear dados do Supabase para o nosso tipo User
const mapSessionToUser = async (sessionUser: any): Promise<User | null> => {
  if (!sessionUser) return null;

  // Objeto de usuário fallback (usando metadados do Auth)
  const fallbackUser: User = {
    id: sessionUser.id,
    email: sessionUser.email || '',
    name: sessionUser.user_metadata?.name || 'Usuário',
    role: UserRole.CLIENT, // Default role
  };

  try {
    // Busca o perfil na tabela 'profiles' para pegar o Role e o Nome
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single();

    if (error) {
       // Se o erro for "Row not found" (PGRST116), apenas retornamos o fallback sem logar erro
       // Isso acontece se o usuário existe no Auth mas não na tabela profiles
       if (error.code === 'PGRST116') {
         return fallbackUser;
       }
       // Se a tabela não existir (42P01) ou outro erro, lançamos
       throw error;
    }

    if (!profile) {
      return fallbackUser;
    }

    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role as UserRole,
      avatarUrl: profile.avatar_url // Opcional, se adicionar coluna no futuro
    };
  } catch (err: any) {
    // Log mais limpo para debug, evitando [object Object]
    // 42P01 é o código PostgREST para "relation does not exist" (tabela não existe)
    if (err?.code === '42P01') {
        console.warn('Tabela "profiles" não encontrada. Usando dados básicos do Auth.');
    } else {
        console.warn('Falha ao recuperar perfil detalhado (usando dados básicos):', err.message || err);
    }
    
    // Retorna dados básicos da sessão se falhar o acesso ao banco de dados
    return fallbackUser;
  }
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Se o Supabase não estiver configurado, verificamos APENAS os mocks
    if (!isSupabaseConfigured) {
      if (email === 'admin@vanconnect.com' && password === 'admin123') return MOCK_USER_ADMIN;
      if (email === 'roberto@exemplo.com' && password === '123456') return MOCK_USER_DRIVER;
      if (email === 'pai@exemplo.com' && password === '123456') return MOCK_USER_CLIENT;
      if (email === 'oficina@parceiro.com' && password === '123456') return MOCK_USER_PARTNER;
      
      throw new Error('Modo Demo: Backend desconectado. Use as credenciais de teste listadas na tela.');
    }

    try {
      // 1. Tenta Login no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const mappedUser = await mapSessionToUser(data.user);
        if (mappedUser) return mappedUser;
      }
      
      throw new Error('Usuário autenticado, mas erro ao recuperar perfil.');

    } catch (err: any) {
      // 2. Fallback para Mocks se Supabase falhar (rede ou credencial errada lá)
      // Útil se o usuário usar credenciais de mock mesmo com supabase configurado, ou se a conexão cair
      if (email === 'admin@vanconnect.com' && password === 'admin123') return MOCK_USER_ADMIN;
      if (email === 'roberto@exemplo.com' && password === '123456') return MOCK_USER_DRIVER;
      if (email === 'pai@exemplo.com' && password === '123456') return MOCK_USER_CLIENT;
      if (email === 'oficina@parceiro.com' && password === '123456') return MOCK_USER_PARTNER;

      // Tratamento de erros específicos
      if (err.message === 'Invalid login credentials') {
         throw new Error('Email ou senha incorretos.');
      }

      // Se não for mock e for erro de chave/rede
      if (err.message && (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('API key'))) {
          throw new Error('Erro de conexão com o servidor. Se você não configurou o Supabase, use os usuários de exemplo.');
      }
      
      throw new Error(err.message || 'Falha na autenticação');
    }
  },

  register: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    // Bloqueia registro real se não houver backend
    if (!isSupabaseConfigured) {
        // Simula um delay para UX
        await new Promise(resolve => setTimeout(resolve, 800));
        throw new Error('Modo Demo: O cadastro de novos usuários requer configuração do backend (Supabase). Por favor, use as contas de teste na tela de login.');
    }

    try {
        // 1. Cria usuário na Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name } // Salva nome nos metadados também por segurança
            }
        });

        if (authError) {
            // Tradução amigável para erro comum
            if (authError.message.includes('already registered') || authError.message.includes('unique constraint')) {
                throw new Error('Este e-mail já está cadastrado. Tente fazer login.');
            }
            throw authError;
        }

        if (!authData.user) throw new Error('Erro ao criar usuário.');
        
        // Verifica se o usuário já existia (Supabase pode retornar usuário existente se email confirm não for required, mas sem logar)
        // Se identities for vazio ou null, pode indicar que o usuário já existia
        if (authData.user.identities && authData.user.identities.length === 0) {
            throw new Error('Este e-mail já está cadastrado. Tente fazer login.');
        }

        // 2. Cria registro na tabela de perfis (public.profiles)
        // Nota: Se a tabela não existir, isso falhará, mas o usuário Auth foi criado.
        // O login funcionará via fallback.
        const { error: profileError } = await supabase
        .from('profiles')
        .insert([
            {
            id: authData.user.id,
            name: name,
            email: email,
            role: role
            }
        ]);

        if (profileError) {
            // Logamos como warning, pois o login ainda funcionará sem o perfil extra
            console.warn("Aviso ao criar perfil (tabela 'profiles' pode não existir):", profileError.message);
        }

        return {
            id: authData.user.id,
            name,
            email,
            role
        };
    } catch (err: any) {
        if (err.message && (err.message.includes('fetch') || err.message.includes('network') || err.message.includes('API key'))) {
            throw new Error('Erro de conexão. Não foi possível realizar o cadastro.');
        }
        throw err;
    }
  },

  logout: async (): Promise<void> => {
    if (isSupabaseConfigured) {
        try {
            await supabase.auth.signOut();
        } catch (e) {
            console.error('Erro ao sair:', e);
        }
    }
    localStorage.removeItem('currentUser');
  },

  // Recupera o usuário atual da sessão ativa
  getCurrentSession: async (): Promise<User | null> => {
    if (!isSupabaseConfigured) return null;

    try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
            return await mapSessionToUser(session.user);
        }
    } catch (err) {
        // Silencioso na inicialização, a menos que seja erro crítico
        return null;
    }
    return null;
  }
};