import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { User, UserRole, MaintenanceRecord, MaintenanceType } from '../types';
import { MOCK_MAINTENANCE_HISTORY } from '../constants';
import { Button } from '../components/Button';
import { Wrench, Gauge, Plus, Calendar, AlertTriangle, CheckCircle, Droplet, Disc, Truck, BellRing, Save, Filter, X, Send, Smartphone, ChevronDown, Edit3 } from 'lucide-react';

interface DriverDashboardProps {
  user: User | null;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ user }) => {
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceRecord[]>(MOCK_MAINTENANCE_HISTORY);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentKm, setCurrentKm] = useState(125000);
  
  // Estados de Filtro
  const [filterType, setFilterType] = useState<MaintenanceType | 'ALL'>('ALL');
  const [filterMonth, setFilterMonth] = useState<string>('ALL');
  const [filterYear, setFilterYear] = useState<string>('ALL');

  // Estado do formulário
  const [newRecord, setNewRecord] = useState({
    type: 'OLEO' as MaintenanceType,
    otherTypeDetail: '',
    date: new Date().toISOString().split('T')[0],
    km: currentKm,
    description: '',
    cost: '',
    nextDueKm: '',
    notifyWhatsapp: false,
    notifyEmail: false
  });

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

  // Opções de Mês e Ano para o filtro
  const months = [
    { value: '0', label: 'Janeiro' },
    { value: '1', label: 'Fevereiro' },
    { value: '2', label: 'Março' },
    { value: '3', label: 'Abril' },
    { value: '4', label: 'Maio' },
    { value: '5', label: 'Junho' },
    { value: '6', label: 'Julho' },
    { value: '7', label: 'Agosto' },
    { value: '8', label: 'Setembro' },
    { value: '9', label: 'Outubro' },
    { value: '10', label: 'Novembro' },
    { value: '11', label: 'Dezembro' },
  ];

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  }, []);

  if (!user || user.role !== UserRole.DRIVER) {
    return <Navigate to="/" replace />;
  }

  // Lógica de Filtro Refinada
  const filteredHistory = useMemo(() => {
    return [...maintenanceList]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter(record => {
        const dateObj = new Date(record.date);
        const matchesType = filterType === 'ALL' || record.type === filterType;
        const matchesMonth = filterMonth === 'ALL' || dateObj.getMonth().toString() === filterMonth;
        const matchesYear = filterYear === 'ALL' || dateObj.getFullYear().toString() === filterYear;
        
        return matchesType && matchesMonth && matchesYear;
      });
  }, [maintenanceList, filterType, filterMonth, filterYear]);

  const clearFilters = () => {
    setFilterType('ALL');
    setFilterMonth('ALL');
    setFilterYear('ALL');
  };

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
    const finalDescription = newRecord.type === 'OUTROS' ? newRecord.otherTypeDetail : newRecord.description;
    
    const record: MaintenanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      type: newRecord.type,
      date: newRecord.date,
      km: Number(newRecord.km),
      description: finalDescription || 'Manutenção registrada',
      cost: Number(newRecord.cost),
      nextDueKm: newRecord.nextDueKm ? Number(newRecord.nextDueKm) : undefined
    };

    setMaintenanceList([record, ...maintenanceList]);
    if (record.km > currentKm) setCurrentKm(record.km);
    
    // Reset form
    setNewRecord({
      type: 'OLEO',
      otherTypeDetail: '',
      date: new Date().toISOString().split('T')[0],
      km: record.km,
      description: '',
      cost: '',
      nextDueKm: '',
      notifyWhatsapp: false,
      notifyEmail: false
    });
    
    setShowAddForm(false);
    alert('Manutenção registrada com sucesso!');
  };

  const sendWhatsAppReminder = (record: MaintenanceRecord) => {
    if (!record.nextDueKm) return;
    const remaining = record.nextDueKm - currentKm;
    const typeLabel = record.type === 'OUTROS' ? record.description : record.type;
    const text = `🚐 *Lembrete VanConnect* 🚐\nA manutenção de *${typeLabel}* está próxima.\n📅 Realizada em: ${new Date(record.date).toLocaleDateString()}\n🔢 Próxima: ${record.nextDueKm.toLocaleString()} km\n⚠️ Restam: ${remaining.toLocaleString()} km`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Painel</h1>
          <p className="text-gray-500">Gerencie a saúde da sua van escolar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card Resumo KM */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500 flex items-center">
            <div className="bg-blue-50 p-3 rounded-full mr-4">
              <Gauge size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">KM Atual</p>
              <h2 className="text-2xl font-bold text-gray-800">{currentKm.toLocaleString()} km</h2>
            </div>
          </div>

           {/* Card Saúde Óleo */}
           <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 flex items-center ${kmSinceOilChange > 10000 ? 'border-red-500' : 'border-green-500'}`}>
            <div className={`p-3 rounded-full mr-4 ${kmSinceOilChange > 10000 ? 'bg-red-50' : 'bg-green-50'}`}>
              <Droplet size={24} className={oilStatusColor} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Óleo</p>
              <h2 className={`text-2xl font-bold ${oilStatusColor}`}>{oilStatusText}</h2>
              <p className="text-xs text-gray-400">Há {kmSinceOilChange.toLocaleString()} km</p>
            </div>
          </div>

          {/* Card Veículo */}
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400 flex items-center">
            <div className="bg-yellow-50 p-3 rounded-full mr-4">
              <Truck size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase">Veículo</p>
              <h2 className="text-xl font-bold text-gray-800">Sprinter 516</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Wrench className="mr-2 text-gray-500" size={20} />
              Histórico de Manutenções
            </h2>
            <Button onClick={() => setShowAddForm(!showAddForm)} size="sm">
              {showAddForm ? 'Cancelar' : <><Plus size={16} className="mr-2" /> Nova Manutenção</>}
            </Button>
          </div>

          {/* BARRA DE FILTROS AVANÇADA */}
          <div className="px-6 py-4 bg-white border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center text-gray-500 font-medium">
                <Filter size={18} className="mr-2" /> 
                <span className="hidden sm:inline">Filtrar por:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                {/* Filtro Tipo */}
                <div className="relative">
                   <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                   >
                     <option value="ALL">Todos os Tipos</option>
                     <option value="OLEO">Óleo</option>
                     <option value="PNEUS">Pneus</option>
                     <option value="FREIOS">Freios</option>
                     <option value="REVISAO">Revisão</option>
                     <option value="OUTROS">Outros</option>
                   </select>
                   <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>

                {/* Filtro Mês */}
                <div className="relative">
                   <select 
                    value={filterMonth}
                    onChange={(e) => setFilterMonth(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                   >
                     <option value="ALL">Mês (Todos)</option>
                     {months.map(m => (
                       <option key={m.value} value={m.value}>{m.label}</option>
                     ))}
                   </select>
                   <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>

                {/* Filtro Ano */}
                <div className="relative">
                   <select 
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                   >
                     <option value="ALL">Ano (Todos)</option>
                     {years.map(y => (
                       <option key={y} value={y}>{y}</option>
                     ))}
                   </select>
                   <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {(filterType !== 'ALL' || filterMonth !== 'ALL' || filterYear !== 'ALL') && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center justify-center text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 bg-red-50 rounded-lg transition-colors border border-red-100"
                >
                  <X size={16} className="mr-1" /> Limpar
                </button>
              )}
            </div>
          </div>

          {showAddForm && (
            <div className="p-6 bg-blue-50 border-b border-blue-100 animate-fade-in">
              <form onSubmit={handleAddMaintenance} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                    <select 
                      className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({...newRecord, type: e.target.value as MaintenanceType})}
                    >
                      <option value="OLEO">Troca de Óleo</option>
                      <option value="PNEUS">Pneus / Alinhamento</option>
                      <option value="FREIOS">Sistema de Freios</option>
                      <option value="REVISAO">Revisão Geral</option>
                      <option value="OUTROS">Outros</option>
                    </select>
                  </div>
                  
                  {newRecord.type === 'OUTROS' && (
                    <div className="animate-fade-in">
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <Edit3 size={14} className="mr-1 text-blue-500" /> Especifique a Manutenção
                      </label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Ex: Ar Condicionado, Alarme, Lanternagem..."
                        className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                        value={newRecord.otherTypeDetail}
                        onChange={(e) => setNewRecord({...newRecord, otherTypeDetail: e.target.value})}
                      />
                    </div>
                  )}

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Data</label>
                     <input type="date" required className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white" value={newRecord.date} onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} />
                  </div>
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">KM</label>
                     <input type="number" required className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white" value={newRecord.km} onChange={(e) => setNewRecord({...newRecord, km: Number(e.target.value)})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Custo (R$)</label>
                     <input type="number" step="0.01" required className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white" value={newRecord.cost} onChange={(e) => setNewRecord({...newRecord, cost: e.target.value})} />
                  </div>
                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-1">Próxima Troca (KM)</label>
                     <input type="number" className="w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 bg-white" value={newRecord.nextDueKm} onChange={(e) => setNewRecord({...newRecord, nextDueKm: e.target.value})} />
                  </div>
                  <div className="pt-6">
                    <Button type="submit" className="w-full"><Save size={18} className="mr-2" /> Salvar</Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">KM</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Custo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Alertas</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((record) => {
                   const isLate = record.nextDueKm && currentKm >= record.nextDueKm;
                   return (
                    <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getIconByType(record.type)}
                          <div className="ml-2 flex flex-col">
                            <span className="text-sm text-gray-700 font-semibold">{record.type}</span>
                            {record.type === 'OUTROS' && (
                              <span className="text-[10px] text-gray-400 italic">({record.description})</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                        {record.km.toLocaleString()} km
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        R$ {record.cost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isLate ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">
                            VENCIDO
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            OK
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {record.nextDueKm && (
                          <button onClick={() => sendWhatsAppReminder(record)} className="text-green-600 hover:text-green-800 p-1" title="Enviar Lembrete WhatsApp">
                            <Send size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                   );
                })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      Nenhum registro encontrado para os filtros selecionados.
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