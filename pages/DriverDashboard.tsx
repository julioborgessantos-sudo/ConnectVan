import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { User, UserRole, MaintenanceRecord, MaintenanceType } from '../types';
import { MOCK_MAINTENANCE_HISTORY } from '../constants';
import { Button } from '../components/Button';
import { Wrench, Gauge, Plus, Calendar, AlertTriangle, CheckCircle, Droplet, Disc, Truck, BellRing, Save, Filter, X, MessageCircle, Send, Smartphone } from 'lucide-react';

interface DriverDashboardProps {
  user: User | null;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ user }) => {
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceRecord[]>(MOCK_MAINTENANCE_HISTORY);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentKm, setCurrentKm] = useState(125000); // Exemplo de KM atual
  const [filterType, setFilterType] = useState<MaintenanceType | 'ALL'>('ALL');

  // Estado do formulário
  const [newRecord, setNewRecord] = useState({
    type: 'OLEO' as MaintenanceType,
    date: new Date().toISOString().split('T')[0],
    km: currentKm,
    description: '',
    cost: '',
    nextDueKm: '', // Novo campo para o alerta
    notifyWhatsapp: false,
    notifyEmail: false
  });

  // Atualiza a sugestão de próxima manutenção quando o tipo ou KM muda
  useEffect(() => {
    if (showAddForm) {
      let interval = 0;
      switch (newRecord.type) {
        case 'OLEO': interval = 10000; break;
        case 'PNEUS': interval = 50000; break;
        case 'FREIOS': interval = 30000; break;
        case 'REVISAO': interval = 15000; break;
        default: interval = 0;
      }
      
      if (interval > 0) {
        setNewRecord(prev => ({
          ...prev,
          nextDueKm: (Number(prev.km) + interval).toString()
        }));
      }
    }
  }, [newRecord.type, newRecord.km, showAddForm]);

  if (!user || user.role !== UserRole.DRIVER) {
    return <Navigate to="/" replace />;
  }

  // Ordena por data (mais recente primeiro) e depois filtra
  const filteredHistory = [...maintenanceList]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .filter(record => filterType === 'ALL' || record.type === filterType);

  // Calcula status da próxima troca de óleo (exemplo simples)
  const lastOilChange = maintenanceList
    .filter(m => m.type === 'OLEO')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    
  const kmSinceOilChange = lastOilChange ? currentKm - lastOilChange.km : 0;
  const oilStatusColor = kmSinceOilChange > 10000 ? 'text-red-500' : kmSinceOilChange > 8000 ? 'text-yellow-500' : 'text-green-500';
  const oilStatusText = kmSinceOilChange > 10000 ? 'ATRASADO' : kmSinceOilChange > 8000 ? 'ATENÇÃO' : 'EM DIA';

  const getIconByType = (type: MaintenanceType) => {
    switch (type) {
      case 'OLEO': return <Droplet size={20} className="text-amber-600" />;
      case 'PNEUS': return <Disc size={20} className="text-gray-700" />;
      case 'FREIOS': return <AlertTriangle size={20} className="text-red-600" />;
      default: return <Wrench size={20} className="text-blue-600" />;
    }
  };

  const handleAddMaintenance = (e: React.FormEvent) => {
    e.preventDefault();
    
    const inputKm = Number(newRecord.km);
    const inputCost = Number(newRecord.cost);
    const inputNextDue = newRecord.nextDueKm ? Number(newRecord.nextDueKm) : undefined;

    const record: MaintenanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type: newRecord.type,
      date: newRecord.date,
      km: inputKm,
      description: newRecord.description,
      cost: inputCost,
      nextDueKm: inputNextDue
    };

    // Adiciona ao histórico
    setMaintenanceList([record, ...maintenanceList]);

    // Atualiza KM atual do veículo se o registro for mais novo/maior
    if (inputKm > currentKm) {
        setCurrentKm(inputKm);
    }

    setShowAddForm(false);
    
    // Feedback de simulação do "Bot"
    let alertMsg = 'Manutenção registrada com sucesso!';
    if (newRecord.notifyWhatsapp) {
      alertMsg += '\n\n🤖 BOT ATIVADO: O lembrete foi agendado! Nosso sistema enviará uma mensagem para seu WhatsApp quando a quilometragem estiver próxima.';
    }

    alert(alertMsg);
    
    // Reset form mas mantém data atual
    setNewRecord({ 
      type: 'OLEO', 
      date: new Date().toISOString().split('T')[0],
      km: inputKm > currentKm ? inputKm : currentKm,
      description: '', 
      cost: '',
      nextDueKm: '',
      notifyWhatsapp: false,
      notifyEmail: false
    });
  };

  const sendWhatsAppReminder = (record: MaintenanceRecord) => {
    if (!record.nextDueKm) return;
    
    const remaining = record.nextDueKm - currentKm;
    const status = remaining < 0 ? "VENCIDA" : "PRÓXIMA";
    
    const text = `🚐 *Lembrete VanConnect* 🚐\n\n` +
      `Atenção motorista! A manutenção de *${record.type}* está ${status}.\n` +
      `📅 Realizada em: ${new Date(record.date).toLocaleDateString()}\n` +
      `🔢 Próxima troca: ${record.nextDueKm.toLocaleString()} km\n` +
      `⚠️ Falta(m): ${remaining.toLocaleString()} km\n\n` +
      `_Agende com seu mecânico parceiro!_`;

    // Abre a API do WhatsApp para enviar mensagem (pode enviar para si mesmo ou para contato)
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const filterOptions: { label: string; value: MaintenanceType | 'ALL' }[] = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Óleo', value: 'OLEO' },
    { label: 'Pneus', value: 'PNEUS' },
    { label: 'Freios', value: 'FREIOS' },
    { label: 'Revisão', value: 'REVISAO' },
    { label: 'Outros', value: 'OUTROS' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
          <p className="text-gray-500">Gerencie a saúde da sua van escolar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Resumo KM */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 flex items-center transform transition hover:scale-105 duration-300">
            <div className="bg-blue-50 p-3 rounded-full mr-4">
              <Gauge size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Quilometragem Atual</p>
              <h2 className="text-2xl font-bold text-gray-800">{currentKm.toLocaleString()} km</h2>
            </div>
          </div>

           {/* Card Saúde Óleo */}
           <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 flex items-center transform transition hover:scale-105 duration-300 ${kmSinceOilChange > 10000 ? 'border-red-500' : 'border-green-500'}`}>
            <div className={`p-3 rounded-full mr-4 ${kmSinceOilChange > 10000 ? 'bg-red-50' : 'bg-green-50'}`}>
              <Droplet size={24} className={oilStatusColor} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Troca de Óleo</p>
              <h2 className={`text-2xl font-bold ${oilStatusColor}`}>{oilStatusText}</h2>
              <p className="text-xs text-gray-400">Rodou {kmSinceOilChange.toLocaleString()} km desde a última</p>
            </div>
          </div>

          {/* Card Veículo */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400 flex items-center transform transition hover:scale-105 duration-300">
            <div className="bg-yellow-50 p-3 rounded-full mr-4">
              <Truck size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Veículo</p>
              <h2 className="text-xl font-bold text-gray-800">Mercedes Sprinter</h2>
              <p className="text-xs text-gray-400">Placa: ABC-1234</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Wrench className="mr-2 text-gray-500" size={20} />
              Histórico de Manutenções
            </h2>
            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm" variant={showAddForm ? 'secondary' : 'primary'}>
              {showAddForm ? 'Cancelar' : <><Plus size={16} className="mr-2" /> Nova Manutenção</>}
            </Button>
          </div>

          {/* Barra de Filtros */}
          <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center overflow-x-auto">
            <div className="mr-3 text-gray-400 flex items-center">
              <Filter size={18} />
            </div>
            <div className="flex space-x-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterType(option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    filterType === option.value
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
              {filterType !== 'ALL' && (
                <button 
                  onClick={() => setFilterType('ALL')}
                  className="px-2 py-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  title="Limpar filtro"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {showAddForm && (
            <div className="p-6 bg-blue-50 border-b border-blue-100 animate-fade-in">
              <div className="flex items-center mb-6">
                 <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <Plus className="text-blue-600" size={20} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-gray-900">Adicionar Novo Registro</h3>
                   <p className="text-sm text-gray-500">Mantenha os dados atualizados para garantir a segurança.</p>
                 </div>
              </div>
              
              <form onSubmit={handleAddMaintenance} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coluna Esquerda */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de Serviço</label>
                    <select 
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 bg-white text-gray-900"
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({...newRecord, type: e.target.value as MaintenanceType})}
                    >
                      <option value="OLEO">Troca de Óleo</option>
                      <option value="PNEUS">Pneus / Alinhamento</option>
                      <option value="FREIOS">Sistema de Freios</option>
                      <option value="REVISAO">Revisão Geral</option>
                      <option value="OUTROS">Outros Reparos</option>
                    </select>
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Data do Serviço</label>
                     <input 
                      type="date" 
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 bg-white text-gray-900"
                      value={newRecord.date}
                      onChange={(e) => setNewRecord({...newRecord, date: e.target.value})}
                     />
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Custo Total (R$)</label>
                     <div className="relative">
                       <span className="absolute left-3 top-2.5 text-gray-500">R$</span>
                       <input 
                        type="number" 
                        step="0.01"
                        required
                        placeholder="0,00"
                        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 pl-10 bg-white text-gray-900"
                        value={newRecord.cost}
                        onChange={(e) => setNewRecord({...newRecord, cost: e.target.value})}
                       />
                     </div>
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">KM na ocasião</label>
                     <input 
                      type="number" 
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 bg-white text-gray-900"
                      value={newRecord.km}
                      onChange={(e) => setNewRecord({...newRecord, km: Number(e.target.value)})}
                     />
                     <p className="text-xs text-gray-500 mt-1">Isso atualizará a KM atual da van se for maior.</p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                     <label className="flex items-center text-sm font-bold text-yellow-800 mb-1">
                        <BellRing size={16} className="mr-2" />
                        Alerta de Próxima Manutenção
                     </label>
                     <input 
                      type="number" 
                      placeholder="Ex: 135000"
                      className="w-full rounded-lg border-yellow-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 py-2.5 px-3 bg-white text-gray-900"
                      value={newRecord.nextDueKm}
                      onChange={(e) => setNewRecord({...newRecord, nextDueKm: e.target.value})}
                     />
                     
                     {/* Configuração de Notificação */}
                     <div className="mt-3 pt-3 border-t border-yellow-200">
                        <p className="text-xs font-semibold text-yellow-800 mb-2">Enviar alertas via:</p>
                        <div className="flex space-x-4">
                           <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                             <input 
                               type="checkbox" 
                               className="rounded text-green-600 focus:ring-green-500 mr-2 h-4 w-4"
                               checked={newRecord.notifyWhatsapp}
                               onChange={(e) => setNewRecord({...newRecord, notifyWhatsapp: e.target.checked})}
                             />
                             <Smartphone size={14} className="mr-1 text-green-600" /> WhatsApp
                           </label>
                        </div>
                        <p className="text-xs text-yellow-700 mt-2 leading-tight">
                           * O bot enviará uma mensagem quando faltarem 10 dias ou 500km.
                        </p>
                     </div>
                  </div>
                </div>

                {/* Descrição - Largura Total */}
                <div className="md:col-span-2">
                   <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição / Notas</label>
                   <textarea 
                    rows={4}
                    placeholder="Ex: Óleo sintético 5w30, Filtro Fram, verificação de fluidos..."
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 bg-white text-gray-900 resize-none"
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                   />
                </div>

                <div className="md:col-span-2 pt-4 border-t border-blue-200 flex justify-end">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="mr-3" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex items-center">
                    <Save size={18} className="mr-2" />
                    Salvar Manutenção
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KM</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((record) => {
                   const isLate = record.nextDueKm && currentKm >= record.nextDueKm;
                   const isNear = record.nextDueKm && currentKm >= (record.nextDueKm - 1000); // Avisa 1000km antes
                   
                   return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-2 text-gray-400" />
                          {new Date(record.date).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2">{getIconByType(record.type)}</div>
                          <span className="text-sm text-gray-700 font-semibold">{record.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={record.description}>
                        {record.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {record.km.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isLate ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 animate-pulse">
                            <AlertTriangle size={12} className="mr-1" /> VENCIDO
                          </span>
                        ) : isNear ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                            <BellRing size={12} className="mr-1" /> PRÓXIMO
                          </span>
                        ) : record.nextDueKm ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                             Próx: {record.nextDueKm.toLocaleString()}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            <CheckCircle size={12} className="mr-1" /> OK
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {record.nextDueKm && (
                          <button
                            onClick={() => sendWhatsAppReminder(record)}
                            className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1.5 rounded-md transition-colors"
                            title="Enviar lembrete para WhatsApp"
                          >
                            <Send size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                   );
                })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      Nenhum registro encontrado para este filtro.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
