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
        <div className={`rounded-full p-0.5 ${dark ? 'bg-indigo-500/20' : 'bg-green-100'}`}>
          <Check className={`h-4 w-4 ${dark ? 'text-indigo-300' : 'text-green-600'}`} />
        </div>
      </div>
      <p className={`ml-3 text-sm font-medium ${dark ? 'text-indigo-100' : 'text-gray-600'}`}>{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-sm font-black tracking-[0.3em] text-yellow-500 uppercase mb-4">Investimento no seu futuro</h2>
          <p className="mt-2 text-5xl font-black sm:text-7xl tracking-tighter leading-tight">
            Sua Van no <span className="text-yellow-500">Topo</span>
          </p>
          <p className="max-w-xl mt-6 mx-auto text-xl text-gray-400 font-medium">
            Planos flexíveis que cabem no seu orçamento mensal.
          </p>
        </div>
        
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
      </div>

      {/* Driver Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Plano Gratuito */}
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col border border-gray-100 overflow-hidden">
            <div className="p-10 flex-1">
              <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-6">Degustação</h3>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-6xl font-black tracking-tighter">Grátis</span>
                <span className="ml-2 text-lg font-bold text-gray-400">/ 90 dias</span>
              </div>
              <p className="mt-8 text-gray-500 text-sm font-medium leading-relaxed">
                Ideal para conhecer as ferramentas básicas de busca e manutenção.
              </p>

              <div className="mt-10 space-y-2">
                <FeatureItem text="Visibilidade na busca básica" />
                <FeatureItem text="Painel de manutenção" />
                <FeatureItem text="Suporte por e-mail" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 border-t border-gray-100">
              <Button 
                variant="outline" 
                className="w-full py-6 text-base font-bold rounded-2xl border-2"
                onClick={() => handleSubscribe('free', 'Degustação Grátis', '0.00', '3 meses')}
              >
                Experimentar agora
              </Button>
            </div>
          </div>

          {/* Plano Semestral */}
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
              Custo-Benefício
            </div>
            <div className="p-10 flex-1">
              <h3 className="text-lg font-bold text-blue-600 uppercase tracking-widest mb-2">Semestral</h3>
              <p className="text-xs text-gray-400 font-bold mb-6">Total: R$ 399,99 à vista</p>
              
              <div className="mt-4">
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest block mb-1">Apenas</span>
                <div className="flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold mr-1">12x R$</span>
                  <span className="text-6xl font-black tracking-tighter">33</span>
                  <span className="text-3xl font-bold">,33</span>
                </div>
              </div>
              
              <div className="mt-10 space-y-2">
                <FeatureItem text="Destaque regional nas buscas" />
                <FeatureItem text="Alertas inteligentes de KM" />
                <FeatureItem text="Clube de parceiros completo" />
                <FeatureItem text="Perfil personalizado" />
              </div>
            </div>
            <div className="p-8 bg-blue-50/50 border-t border-blue-50">
              <Button 
                variant="secondary" 
                className="w-full py-6 text-base font-bold rounded-2xl shadow-lg shadow-blue-200"
                onClick={() => handleSubscribe('semestral', 'Plano Semestral', '399.99', 'semestre')}
              >
                Assinar Plano
              </Button>
            </div>
          </div>

          {/* Plano Anual - Destaque Máximo */}
          <div className="bg-white rounded-3xl shadow-2xl transition-all duration-500 transform hover:scale-[1.03] flex flex-col border-2 border-yellow-400 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <div className="absolute top-6 right-8 text-yellow-500/20">
               <Star className="fill-current" size={80} />
            </div>
            
            <div className="p-10 flex-1 relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-widest">Anual Premium</h3>
                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-yellow-400 text-gray-900">RECOMENDADO</span>
              </div>
              <p className="text-xs text-gray-400 font-bold mb-6">Total: R$ 599,99 à vista (Economia de 25%)</p>
              
              <div className="mt-4">
                <span className="text-xs font-black text-yellow-600 uppercase tracking-widest block mb-1">Apenas</span>
                <div className="flex items-baseline text-gray-900">
                  <span className="text-3xl font-bold mr-1">12x R$</span>
                  <span className="text-7xl font-black tracking-tighter">49</span>
                  <span className="text-3xl font-bold">,99</span>
                </div>
              </div>

              <div className="mt-10 space-y-2">
                <FeatureItem text="Prioridade máxima em buscas" />
                <FeatureItem text="Selo verificado de motorista" />
                <FeatureItem text="Notificações via WhatsApp" />
                <FeatureItem text="Gestão de frota e custos" />
                <FeatureItem text="Suporte VIP 24h" />
              </div>
            </div>
            <div className="p-8 bg-yellow-400 border-t border-yellow-500">
              <Button 
                className="w-full py-6 text-base font-black bg-gray-900 hover:bg-black text-white rounded-2xl shadow-xl shadow-yellow-500/20"
                onClick={() => handleSubscribe('anual', 'Plano Anual Premium', '599.99', 'ano')}
              >
                Ativar Agora
              </Button>
            </div>
          </div>
        </div>

        {/* --- NOVO CARD DE PARCEIRO --- */}
        <div className="relative mt-24 mb-16">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-8 bg-gray-50 text-2xl font-black text-gray-900 flex items-center tracking-tighter uppercase">
              <Store className="mr-3 text-indigo-600" size={28} /> Para Empresas & Parceiros
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-indigo-900 rounded-[3rem] shadow-3xl overflow-hidden border border-indigo-700 flex flex-col lg:flex-row transform transition-all duration-500 hover:shadow-indigo-500/20">
              {/* Coluna de Benefícios */}
              <div className="p-10 lg:p-16 lg:w-7/12 text-white">
                <div className="flex items-center space-x-3 mb-8">
                   <div className="p-2 bg-indigo-500/30 rounded-xl">
                    <Zap className="text-yellow-400" size={24} />
                   </div>
                   <span className="text-indigo-300 font-black tracking-[0.2em] uppercase text-[10px]">Visibilidade B2B e B2C</span>
                </div>
                
                <h3 className="text-4xl lg:text-5xl font-black mb-8 leading-none tracking-tighter">
                  Venda para quem <span className="text-indigo-400">decide</span>
                </h3>
                
                <p className="text-indigo-100/70 mb-12 text-lg font-medium leading-relaxed">
                  Conecte sua empresa a milhares de famílias e motoristas em SBO de forma estratégica e recorrente.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                  <FeatureItem text="Cupons Personalizados" dark />
                  <FeatureItem text="Analytics de Acesso" dark />
                  <FeatureItem text="Destaque no Mapa" dark />
                  <FeatureItem text="Anúncios Push" dark />
                </div>
              </div>
              
              {/* Coluna de Preço/Ação Business */}
              <div className="bg-indigo-950 p-10 lg:p-16 lg:w-5/12 flex flex-col justify-center items-center text-center border-t lg:border-t-0 lg:border-l border-indigo-800 relative">
                <div className="mb-10 w-full relative z-10">
                  <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Plano Business Anual</p>
                  <p className="text-indigo-500/60 text-xs font-bold mb-6">Total: R$ 1.199,88/ano</p>
                  
                  <div className="relative inline-block mb-2">
                    <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                    <div className="relative flex items-center justify-center text-white">
                      <span className="text-2xl font-bold self-start mt-2 mr-1 text-indigo-400 uppercase">12x R$</span>
                      <span className="text-8xl font-black tracking-tighter drop-shadow-2xl">99</span>
                      <span className="text-3xl font-bold self-end mb-4 ml-1 text-indigo-200">,99</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full space-y-6">
                  <Button 
                    onClick={() => handleSubscribe('partner_business', 'Assinatura Anual Business', '99.99', 'mês (Anual)')}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-7 rounded-2xl shadow-2xl transition-all hover:scale-[1.05] active:scale-95 text-xl uppercase tracking-tighter"
                  >
                    Seja Parceiro VIP
                  </Button>
                  <div className="flex items-center justify-center text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] space-x-2">
                    <Lock size={12} /> <span>Pagamento Criptografado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Compacto */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-20">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-12 flex items-center justify-center tracking-tighter">
            <HelpCircle className="mr-3 text-yellow-500" size={32} /> Dúvidas Frequentes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Posso mudar de plano depois?</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Sim! Você pode fazer o upgrade para o plano anual a qualquer momento para aproveitar os descontos maiores.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Quais as formas de pagamento?</h4>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Aceitamos todos os cartões via Stripe, com parcelamento em até 12x, além de PIX no pagamento à vista.</p>
            </div>
        </div>
      </div>
    </div>
  );
};