import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ShieldCheck, Lock, CreditCard, ChevronLeft, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Dados passados pelo estado da rota
  const plan = location.state as { 
    planId: string;
    planName: string; 
    price: string; 
    billing: string 
  } | null;

  if (!plan) {
    return <Navigate to="/plans" replace />;
  }

  const handleStripeCheckout = async () => {
    setIsProcessing(true);
    
    // SIMULAÇÃO DE CHAMADA AO STRIPE
    // No futuro, aqui você faria:
    // 1. Chamar seu backend para criar uma Checkout Session
    // 2. Usar o session ID para redirecionar o usuário:
    // const stripe = await loadStripe('SUA_CHAVE_PUBLICA');
    // await stripe.redirectToCheckout({ sessionId: session.id });

    setTimeout(() => {
      setIsProcessing(false);
      alert('Simulação de Integração Stripe:\n\nConectando ao gateway seguro...\n\nNo ambiente de produção, você seria redirecionado para checkout.stripe.com agora.');
      
      if (plan.planId === 'free') {
        navigate('/register');
      } else {
        // Simula sucesso
        navigate('/register');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Voltar aos planos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Coluna de Resumo */}
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Finalizar Assinatura</h1>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Plano Selecionado</span>
                    <h2 className="text-2xl font-bold text-gray-900">{plan.planName}</h2>
                  </div>
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <Truck className="text-indigo-600" size={32} />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-gray-600">
                    <CheckCircle2 size={18} className="text-green-500 mr-3" />
                    <span className="text-sm">Acesso imediato ao painel após confirmação</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CheckCircle2 size={18} className="text-green-500 mr-3" />
                    <span className="text-sm">Cobrança recorrente por {plan.billing}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CheckCircle2 size={18} className="text-green-500 mr-3" />
                    <span className="text-sm">Cancele a qualquer momento sem taxas</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                   <div className="flex justify-between items-baseline">
                      <span className="text-gray-500 font-medium">Total do Investimento</span>
                      <div className="text-right">
                        <p className="text-4xl font-black text-gray-900">R$ {plan.price.replace('.', ',')}</p>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Faturamento por {plan.billing}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex items-start bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <AlertCircle className="text-blue-500 mt-0.5 flex-shrink-0" size={20} />
              <p className="ml-3 text-sm text-blue-700 leading-relaxed">
                Você será redirecionado para o ambiente seguro do <strong>Stripe</strong> para inserir seus dados de pagamento. O VanConnect não armazena suas informações de cartão.
              </p>
            </div>
          </div>

          {/* Coluna de Ação */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center space-x-2 mb-8 opacity-80">
                  <Lock size={16} className="text-yellow-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">Checkout Seguro</span>
                </div>

                <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                  Utilizamos tecnologia de ponta para proteger seus dados financeiros. Sua segurança é nossa prioridade número um.
                </p>

                <Button 
                  onClick={handleStripeCheckout}
                  isLoading={isProcessing}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-black py-6 rounded-2xl shadow-xl shadow-yellow-500/10 transition-all hover:scale-[1.03] text-lg uppercase mb-6"
                >
                  <CreditCard className="mr-2" /> Pagar com Stripe
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-6" />
                  </div>
                  <div className="flex items-center justify-center space-x-3 pt-4 border-t border-white/10">
                    <ShieldCheck size={20} className="text-green-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Proteção de Dados Garantida</span>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-400 text-[10px] mt-6 uppercase font-bold tracking-widest px-4 leading-loose">
                Ao clicar em pagar, você concorda com nossos termos de serviço e política de reembolso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};