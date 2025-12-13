import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { MOCK_DISCOUNTS } from '../constants';
import { DiscountCard } from '../components/DiscountCard';
import { ShieldCheck, LogOut, Bell } from 'lucide-react';

interface PartnersAreaProps {
  user: User | null;
}

export const PartnersArea: React.FC<PartnersAreaProps> = ({ user }) => {
  // Lógica de Notificação de Novos Descontos (apenas para quem tem interesse: motorista, pai, parceiro)
  useEffect(() => {
    if (user && (user.role === UserRole.DRIVER || user.role === UserRole.CLIENT)) {
      const STORAGE_KEY = `vanconnect_seen_discounts_${user.id}`; // Chave única por usuário
      
      // Recupera IDs já vistos
      const storedData = localStorage.getItem(STORAGE_KEY);
      const seenIds: string[] = storedData ? JSON.parse(storedData) : [];
      
      // Filtra descontos que o usuário ainda não viu (ID não está na lista salva)
      const newDiscounts = MOCK_DISCOUNTS.filter(d => !seenIds.includes(d.id));

      if (newDiscounts.length > 0) {
        // Prepara a mensagem de notificação
        const titles = newDiscounts.map(d => `• ${d.title} na ${d.partnerName}`).join('\n');
        
        const message = `🔔 NOVIDADE NO CLUBE!\n\nOlá ${user.name}, temos ${newDiscounts.length} novo(s) desconto(s) para você:\n\n${titles}\n\nAproveite agora!`;
        
        // Dispara o alerta (simulando notificação push)
        alert(message);
        console.log('Novos descontos identificados:', newDiscounts);

        // Atualiza o storage com TODOS os IDs atuais para não notificar novamente os mesmos
        const allCurrentIds = MOCK_DISCOUNTS.map(d => d.id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentIds));
      } else {
        // Se for a primeira vez que entra e não tem histórico, salva o estado atual
        if (!storedData) {
           const allCurrentIds = MOCK_DISCOUNTS.map(d => d.id);
           localStorage.setItem(STORAGE_KEY, JSON.stringify(allCurrentIds));
        }
      }
    }
  }, [user]);

  // Permite acesso para Motoristas, Parceiros e Pais (CLIENT)
  const allowedRoles = [UserRole.DRIVER, UserRole.PARTNER, UserRole.CLIENT, UserRole.ADMIN];
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck size={150} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <span className="uppercase tracking-wider text-xs font-bold text-blue-200">Área de Benefícios</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">Clube de Vantagens</h1>
          <p className="mt-3 text-blue-100 max-w-2xl text-lg leading-relaxed">
            {user.role === UserRole.DRIVER 
              ? 'Economize na manutenção da sua van e em serviços essenciais. Descontos exclusivos para motoristas.'
              : 'Aproveite descontos especiais em materiais escolares e serviços dos nossos parceiros.'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            Ofertas Disponíveis 
            <span className="ml-3 bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {MOCK_DISCOUNTS.length}
            </span>
          </h2>
          <div className="text-sm text-gray-500 flex items-center">
            <Bell size={16} className="mr-1" />
            Novas ofertas serão notificadas
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_DISCOUNTS.map(discount => (
            <DiscountCard key={discount.id} discount={discount} />
          ))}
        </div>

        {MOCK_DISCOUNTS.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <ShieldCheck size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum desconto no momento</h3>
            <p className="text-gray-500 mt-2">Estamos negociando novas parcerias. Volte em breve!</p>
          </div>
        )}
      </div>
    </div>
  );
};