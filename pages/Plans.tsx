import React from 'react';
import { Button } from '../components/Button';
import { Check, Star, Shield, HelpCircle, Store, Zap, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Plans: React.FC = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planName: string, price: string) => {
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

  const FeatureItem = ({ text, dark = false }: { text: string; dark?: boolean }) => (
    <div className="flex items-start mb-4">
      <div className="flex-shrink-0">
        <Check className={`h-5 w-5 ${dark ? 'text-indigo-400' : 'text-green-500'}`} />
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
              <p className="mt-2 text-sm text-green-600 font-bold">Economize 25% anual</p>

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
                onClick={() => handleSubscribe('Anual', 'R$ 599,99')}
              >
                Ativar Plano Anual
              </Button>
            </div>
          </div>
        </div>

        {/* --- PARTNER SECTION --- */}
        <div className="relative mt-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-6 bg-gray-50 text-xl font-bold text-gray-500 flex items-center">
              <Store className="mr-2" /> Para Empresas e Parceiros
            </span>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="bg-indigo-900 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-indigo-700">
            <div className="p-10 md:w-2/3 text-white">
              <div className="flex items-center space-x-2 mb-4">
                 <Zap className="text-yellow-400" size={24} />
                 <span className="text-indigo-300 font-bold tracking-widest uppercase text-xs">Oportunidade de Negócio</span>
              </div>
              <h3 className="text-3xl font-extrabold mb-4">Plano Business Anual</h3>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                Divulgue seus serviços diretamente para centenas de motoristas e milhares de pais em Santa Bárbara d'Oeste e região.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <FeatureItem text="Painel de Gestão de Cupons" dark />
                <FeatureItem text="Destaque no Mapa de Parceiros" dark />
                <FeatureItem text="Métricas de Cliques e Visitas" dark />
                <FeatureItem text="Link direto para seu WhatsApp" dark />
                <FeatureItem text="Selo de Parceiro Oficial" dark />
                <FeatureItem text="Apoio ao Transporte Escolar" dark />
              </div>
            </div>
            
            <div className="bg-indigo-800 p-10 md:w-1/3 flex flex-col justify-center items-center text-center border-l border-indigo-700">
              <p className="text-indigo-200 text-sm font-medium mb-1">Assinatura Anual</p>
              <div className="flex items-baseline text-white">
                <span className="text-2xl font-bold">R$</span>
                <span className="text-6xl font-extrabold mx-1">99</span>
                <span className="text-2xl font-bold">,90</span>
              </div>
              <p className="text-indigo-300 text-sm mt-1 mb-8">por mês</p>
              
              <Button 
                onClick={() => handleSubscribe('Parceiro Business', 'R$ 99,90/mês (Anual)')}
                className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-4 rounded-xl shadow-xl transition-transform active:scale-95"
              >
                Seja um Parceiro
              </Button>
              <p className="text-indigo-400 text-[10px] mt-4 uppercase font-bold tracking-tighter">Faturamento anual: R$ 1.198,80</p>
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
                <h4 className="font-bold text-gray-900">Sou empresa, como funciona o plano de 99,90?</h4>
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