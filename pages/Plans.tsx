import React from 'react';
import { Button } from '../components/Button';
import { Check, Star, Shield, HelpCircle, Store, Zap, Heart, TrendingUp, Users, Target, CreditCard, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planId: string, planName: string, price: string, billing: string) => {
    // Redireciona para a página de checkout preparando para o Stripe
    navigate('/checkout', { 
      state: { 
        planId,
        planName, 
        price, 
        billing
      } 
    });
  };

  const FeatureItem = ({ text, dark = false }: { text: string; dark?: boolean }) => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0">
        <Check className={`h-5 w-5 ${dark ? 'text-indigo-300' : 'text-green-500'}`} />
      </div>
      <p className={`ml-3 text-sm ${dark ? 'text-indigo-100' : 'text-gray-600'}`}>{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-base font-semibold tracking-wide text-yellow-500 uppercase">Investimento no seu negócio</h2>
          <p className="mt-2 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            Sua Van em <span className="text-yellow-500">Destaque</span>
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            Aumente sua visibilidade, gerencie manutenções e conecte-se com novos alunos.
          </p>
        </div>
        
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
      </div>

      {/* Driver Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Plano Gratuito */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100">
            <div className="p-8 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Degustação</h3>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">Grátis</span>
                <span className="ml-1 text-xl font-semibold text-gray-500">/3 meses</span>
              </div>
              <p className="mt-6 text-gray-500 text-sm">
                Perfeito para testar a plataforma. Conta inativa automaticamente após 90 dias.
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <FeatureItem text="Visibilidade na busca básica" />
                <FeatureItem text="Painel de manutenção simples" />
                <FeatureItem text="Acesso limitado a parceiros" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
              <Button 
                variant="outline" 
                className="w-full py-4 text-lg"
                onClick={() => handleSubscribe('free', 'Degustação Grátis', '0.00', '3 meses')}
              >
                Começar Grátis
              </Button>
            </div>
          </div>

          {/* Plano Semestral */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-blue-100 relative">
             <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                Popular
             </div>
            <div className="p-8 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Semestral</h3>
              <div className="mt-4">
                <div className="flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold mr-1">R$</span>
                  <span className="text-5xl font-extrabold tracking-tight">399</span>
                  <span className="text-2xl font-semibold text-gray-500">,99</span>
                </div>
                <div className="mt-1 text-sm text-gray-400 font-medium italic">ou 12x de <span className="text-gray-600 font-bold">R$ 33,33</span></div>
              </div>
              
              <p className="mt-6 text-gray-500 text-sm">
                Para motoristas que buscam profissionalizar a gestão e captar mais alunos.
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <FeatureItem text="Destaque na busca por bairro" />
                <FeatureItem text="Gestão completa de manutenção" />
                <FeatureItem text="Clube de descontos completo" />
                <FeatureItem text="Perfil com fotos e bio" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
              <Button 
                variant="secondary" 
                className="w-full py-4 text-lg shadow-md"
                onClick={() => handleSubscribe('semestral', 'Plano Semestral', '399.99', 'semestre')}
              >
                Assinar Semestral
              </Button>
            </div>
          </div>

          {/* Plano Anual - Destaque */}
          <div className="bg-white rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex flex-col border-2 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <div className="absolute top-0 right-0 mt-4 mr-4 text-yellow-500">
               <Star className="fill-current" size={32} />
            </div>
            
            <div className="p-8 flex-1">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                Anual <span className="ml-2 px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-800">MELHOR VALOR</span>
              </h3>
              
              <div className="mt-4">
                <div className="flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold mr-1">R$</span>
                  <span className="text-5xl font-extrabold tracking-tight">599</span>
                  <span className="text-2xl font-semibold text-gray-500">,99</span>
                </div>
                <div className="mt-1 text-sm text-yellow-600 font-medium italic">ou 12x de <span className="text-yellow-700 font-black">R$ 49,99</span></div>
              </div>

              <p className="mt-4 text-sm text-green-600 font-bold bg-green-50 inline-block px-2 py-1 rounded">Economize 25% anual</p>

              <div className="mt-8 border-t border-gray-100 pt-8 space-y-2">
                <FeatureItem text="Prioridade máxima nas buscas" />
                <FeatureItem text="Selo 'Motorista Premium' no perfil" />
                <FeatureItem text="Alertas via WhatsApp ilimitados" />
                <FeatureItem text="Acesso antecipado a promoções" />
                <FeatureItem text="Suporte prioritário 24h" />
              </div>
            </div>
            <div className="p-8 bg-yellow-50 rounded-b-2xl border-t border-yellow-100">
              <Button 
                className="w-full py-4 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                onClick={() => handleSubscribe('anual', 'Plano Anual Premium', '599.99', 'ano')}
              >
                Ativar Plano Anual
              </Button>
            </div>
          </div>
        </div>

        {/* --- NOVO CARD DE PARCEIRO --- */}
        <div className="relative mt-20 mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 bg-gray-50 text-2xl font-extrabold text-gray-900 flex items-center tracking-tight">
              <Store className="mr-3 text-indigo-600" size={28} /> Para Empresas & Comércios
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-indigo-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-indigo-700 flex flex-col lg:flex-row transform transition-all hover:shadow-indigo-500/10">
              {/* Coluna de Benefícios */}
              <div className="p-8 lg:p-12 lg:w-3/5 text-white">
                <div className="flex items-center space-x-3 mb-6">
                   <div className="p-2 bg-indigo-500/30 rounded-xl">
                    <Zap className="text-yellow-400" size={24} />
                   </div>
                   <span className="text-indigo-200 font-bold tracking-widest uppercase text-xs">Visibilidade Estratégica</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
                  Sua marca no dia a dia das <span className="text-indigo-300">famílias e motoristas</span>
                </h3>
                
                <p className="text-indigo-100/80 mb-10 text-lg leading-relaxed">
                  Torne-se um parceiro oficial e anuncie suas ofertas para um público altamente qualificado e segmentado na região de Santa Bárbara d'Oeste.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <FeatureItem text="Painel de Gestão de Cupons" dark />
                  <FeatureItem text="Relatórios de Engajamento" dark />
                  <FeatureItem text="Selo de Parceiro Verificado" dark />
                  <FeatureItem text="Link direto para WhatsApp" dark />
                  <FeatureItem text="Destaque no Mapa de Serviços" dark />
                  <FeatureItem text="Notificações Push de Ofertas" dark />
                </div>

                <div className="mt-12 flex items-center justify-center gap-6 p-6 bg-indigo-950/40 rounded-3xl border border-indigo-500/20 mx-auto max-w-lg">
                   <div className="flex flex-col items-center text-center">
                      <Users className="text-indigo-400 mb-1" size={24} />
                      <span className="text-[10px] uppercase font-bold text-indigo-300">Milhares de Pais</span>
                   </div>
                   <div className="h-8 w-px bg-indigo-500/20 flex-shrink-0"></div>
                   <div className="flex flex-col items-center text-center">
                      <Target className="text-indigo-400 mb-1" size={24} />
                      <span className="text-[10px] uppercase font-bold text-indigo-300">Público Local</span>
                   </div>
                   <div className="h-8 w-px bg-indigo-500/20 flex-shrink-0"></div>
                   <div className="flex flex-col items-center text-center">
                      <TrendingUp className="text-indigo-400 mb-1" size={24} />
                      <span className="text-[10px] uppercase font-bold text-indigo-300">Crescimento</span>
                   </div>
                </div>
              </div>
              
              {/* Coluna de Preço/Ação */}
              <div className="bg-indigo-800/50 p-8 lg:p-12 lg:w-2/5 flex flex-col justify-center items-center text-center border-t lg:border-t-0 lg:border-l border-indigo-700/50 backdrop-blur-sm relative">
                <div className="mb-10 w-full">
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] mb-6">Assinatura Anual Business</p>
                  
                  {/* Container de Preço Elegante */}
                  <div className="relative inline-block px-8 py-6">
                    {/* Brilho de fundo sutil */}
                    <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full"></div>
                    
                    <div className="relative flex items-center justify-center text-white">
                      <span className="text-3xl font-bold self-start mt-2 mr-1 text-indigo-300">R$</span>
                      <span className="text-[96px] font-black leading-none tracking-tighter drop-shadow-2xl">99</span>
                      <div className="flex flex-col items-start ml-2">
                        <span className="text-4xl font-extrabold leading-none text-indigo-200">,99</span>
                        <span className="text-sm font-bold uppercase tracking-widest mt-1 text-indigo-400">por mês</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 text-sm text-indigo-300 font-medium italic">ou 12x de <span className="text-white font-black">R$ 99,99</span></div>
                </div>
                
                <div className="w-full space-y-4 px-4">
                  <Button 
                    onClick={() => handleSubscribe('partner_business', 'Assinatura Anual Business', '99.99', 'mês (Anual)')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-black py-5 rounded-2xl shadow-xl shadow-yellow-500/10 transition-all hover:scale-[1.03] active:scale-95 text-lg uppercase tracking-tight"
                  >
                    Seja um Parceiro
                  </Button>
                  <div className="flex items-center justify-center text-indigo-300 text-[11px] font-bold uppercase tracking-[0.15em] bg-indigo-950/30 py-3 rounded-2xl border border-indigo-500/10">
                    <Shield size={14} className="mr-2 text-indigo-400" /> Pagamento 100% Seguro
                  </div>
                </div>
                
                <p className="text-indigo-400 text-[11px] mt-8 uppercase font-bold tracking-widest opacity-60">
                  Total Anual: R$ 1.199,88
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
            <HelpCircle className="mr-2 text-gray-400" /> Perguntas Frequentes
        </h2>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900">Sou empresa, como funciona o plano de 99,99?</h4>
                <p className="text-gray-600 mt-2 text-sm">Este plano é exclusivo para oficinas, papelarias, borracharias e outros serviços. Ele permite que você anuncie ofertas no "Clube de Vantagens" que todos os usuários do app visualizam.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900">O que acontece após os 3 meses gratuitos para motoristas?</h4>
                <p className="text-gray-600 mt-2 text-sm">Seu perfil será pausado. Você poderá reativá-lo a qualquer momento escolhendo o plano Semestral ou Anual. Seus dados de manutenção não são apagados.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 flex items-center">
                  <Heart size={16} className="text-red-500 mr-2" /> O VanConnect cobra comissão?
                </h4>
                <p className="text-gray-600 mt-2 text-sm">Não cobramos nenhuma comissão sobre os contratos de transporte ou sobre as vendas dos parceiros. Somos uma plataforma de conexão por assinatura fixa.</p>
            </div>
        </div>
      </div>
    </div>
  );
};