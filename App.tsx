import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { PartnersArea } from './pages/PartnersArea';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { DriverDashboard } from './pages/DriverDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Plans } from './pages/Plans';
import { authService } from './services/authService';
import { User } from './types';
import { supabase, isSupabaseConfigured } from './lib/supabase';

// Placeholder Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-gray-400">&copy; 2024 VanConnect. Todos os direitos reservados.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    // 1. Verifica sessão inicial
    authService.getCurrentSession().then((sessionUser) => {
      setUser(sessionUser);
      setLoadingSession(false);
    });

    // 2. Escuta mudanças de autenticação (login, logout, token refresh)
    // Apenas se o Supabase estiver configurado para evitar erros de API Key
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const currentUser = await authService.getCurrentSession();
          setUser(currentUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar 
          user={user} 
          onLogout={handleLogout} 
        />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route 
              path="/login" 
              element={<Login onLoginSuccess={handleLoginSuccess} />} 
            />
            <Route 
              path="/partners-area" 
              element={<PartnersArea user={user} />} 
            />
            <Route 
              path="/dashboard" 
              element={<DriverDashboard user={user} />} 
            />
             <Route 
              path="/admin" 
              element={<AdminDashboard user={user} />} 
            />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;