import React from 'react';
import { Button } from '../components/Button';
import { Check, Star, Shield, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planName: string, price: string) => {
    // Simulação de checkout
    const confirm = window.confirm(
      `Você selecionou o plano ${planName}.\n\nValor: ${price}\n\nDeseja prosseguir para a área de pagamento seguro?`
    );
    
    if (confirm) {
        if (planName === 'Gratuito') {
            alert('Plano ativado com sucesso! Você tem 90 dias de acesso gratuito. Aproveite para cadastrar sua van.');
            navigate('/register');
        } else {
            alert('Redirecionando para gateway de pagamento... (Simulação: Pagamento Aprovado!)');
            navigate('/register');
        }
    }
  };

  const FeatureItem = ({ text }: { text: string }) => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0">
        <Check className="h-5 w-5 text-green-500" />
      </div>
      <p className="ml-3 text-sm text-gray-600">{text}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-base font-semibold tracking-wide text-yellow-500 uppercase">Investimento no seu negócio</h2>
          <p className="mt-2 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            Escolha o plano ideal para sua Van
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-300">
            Aumente sua visibilidade, gerencie manutenções e economize com nossos parceiros.
          </p>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-yellow-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl"></div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plano Gratuito */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-gray-100">
            <div className="p-8 flex-1">
              <h3 className="text-xl font-semibold text-gray-900">Degustação</h3>
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">Grátis</span>
                <span className="ml-1 text-xl font-semibold text-gray-500">/3 meses</span>
              </p>
              <p className="mt-6 text-gray-500 text-sm">
                Perfeito para testar a plataforma. Conta inativa automaticamente após 90 dias.
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <FeatureItem text="Visibilidade na busca básica" />
                <FeatureItem text="Painel de manutenção simples" />
                <FeatureItem text="Acesso limitado a parceiros" />
                <FeatureItem text="Perfil básico do motorista" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
              <Button 
                variant="outline" 
                className="w-full py-4 text-lg"
                onClick={() => handleSubscribe('Gratuito', 'R$ 0,00')}
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
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">R$ 399</span>
                <span className="ml-1 text-2xl font-semibold text-gray-500">,99</span>
              </p>
              <p className="mt-2 text-sm text-blue-600 font-medium">Equivalente a R$ 66,66/mês</p>
              <p className="mt-6 text-gray-500 text-sm">
                Para motoristas que buscam profissionalizar a gestão e captar mais alunos.
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <FeatureItem text="Destaque na busca" />
                <FeatureItem text="Gestão completa de manutenção" />
                <FeatureItem text="Alertas via WhatsApp" />
                <FeatureItem text="Clube de descontos completo" />
                <FeatureItem text="Perfil verificado com fotos" />
              </div>
            </div>
            <div className="p-8 bg-gray-50 rounded-b-2xl border-t border-gray-100">
              <Button 
                variant="secondary" 
                className="w-full py-4 text-lg shadow-md"
                onClick={() => handleSubscribe('Semestral', 'R$ 399,99')}
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
              <p className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">R$ 599</span>
                <span className="ml-1 text-2xl font-semibold text-gray-500">,99</span>
              </p>
              <p className="mt-2 text-sm text-green-600 font-bold">Economize 25% comparado ao semestral</p>
              <p className="mt-6 text-gray-500 text-sm">
                A solução definitiva. Máxima visibilidade e todos os recursos liberados.
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8 space-y-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0"><Shield className="h-5 w-5 text-yellow-500" /></div>
                    <p className="ml-3 text-sm font-medium text-gray-900">Tudo do plano Semestral</p>
                </div>
                <FeatureItem text="Prioridade máxima nas buscas" />
                <FeatureItem text="Selo 'Motorista Premium'" />
                <FeatureItem text="Suporte prioritário" />
                <FeatureItem text="Acesso antecipado a novos parceiros" />
              </div>
            </div>
            <div className="p-8 bg-yellow-50 rounded-b-2xl border-t border-yellow-100">
              <Button 
                className="w-full py-4 text-lg font-bold bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                onClick={() => handleSubscribe('Anual', 'R$ 599,99')}
              >
                Quero o Plano Anual
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">Pagamento 100% seguro via Cartão ou PIX</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
            <HelpCircle className="mr-2 text-gray-400" /> Perguntas Frequentes
        </h2>
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900">O que acontece após os 3 meses gratuitos?</h4>
                <p className="text-gray-600 mt-2 text-sm">Seu perfil será automaticamente inativado e deixará de aparecer nas buscas até que você escolha um dos planos pagos (Semestral ou Anual). Não há cobrança automática.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900">Como funcionam os descontos com parceiros?</h4>
                <p className="text-gray-600 mt-2 text-sm">Basta apresentar seu painel de motorista logado no estabelecimento parceiro para garantir descontos em oficinas, peças e serviços.</p>
            </div>
             <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-900">Posso cancelar a qualquer momento?</h4>
                <p className="text-gray-600 mt-2 text-sm">Sim, porém os planos Semestral e Anual são pagos antecipadamente. O cancelamento evita a renovação automática, mas o valor pago não é reembolsável.</p>
            </div>
        </div>
      </div>
    </div>
  );
};