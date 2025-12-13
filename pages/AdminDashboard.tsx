import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { MOCK_DRIVERS, MOCK_PARTNERS, MOCK_USER_CLIENT, DEFAULT_HERO_IMAGES } from '../constants';
import { Users, Truck, Store, BarChart, Settings, Search, Image as ImageIcon, Trash2, Plus, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';

interface AdminDashboardProps {
  user: User | null;
}

type AdminTab = 'DASHBOARD' | 'DRIVERS' | 'PARTNERS' | 'USERS' | 'SETTINGS' | 'HERO';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('DASHBOARD');
  
  // States for Hero Image Management
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_IMAGES);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    // Carregar imagens do localStorage ao montar
    const storedImages = localStorage.getItem('vanconnect_hero_images');
    if (storedImages) {
        try {
            const parsed = JSON.parse(storedImages);
            if(Array.isArray(parsed)) setHeroImages(parsed);
        } catch (e) { console.error("Erro ao parsear imagens", e); }
    }
  }, []);

  const handleSaveImages = () => {
    localStorage.setItem('vanconnect_hero_images', JSON.stringify(heroImages));
    alert('Imagens do banner atualizadas com sucesso! As alterações aparecerão na página inicial.');
  };

  const handleAddImage = () => {
    if (!newImageUrl) return;
    setHeroImages([...heroImages, newImageUrl]);
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...heroImages];
    newImages.splice(index, 1);
    setHeroImages(newImages);
  };

  const handleResetImages = () => {
      if(confirm('Isso restaurará as imagens padrão do sistema. Deseja continuar?')) {
          setHeroImages(DEFAULT_HERO_IMAGES);
          localStorage.removeItem('vanconnect_hero_images');
      }
  };

  if (!user || user.role !== UserRole.ADMIN) {
    return <Navigate to="/login" replace />;
  }

  const NavItem = ({ tab, label, icon: Icon }: { tab: AdminTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors mb-1 text-left ${
        activeTab === tab 
          ? 'bg-gray-900 text-yellow-400 shadow-md' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      <Icon size={20} className={`mr-3 ${activeTab === tab ? 'text-yellow-400' : 'text-gray-400'}`} /> 
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden w-64 bg-gray-800 text-white min-h-screen md:flex flex-col flex-shrink-0">
        <div className="p-6 text-xl font-bold border-b border-gray-700 flex items-center">
            <span className="text-yellow-400 mr-2">Admin</span> Panel
        </div>
        <nav className="flex-1 p-4">
          <NavItem tab="DASHBOARD" label="Visão Geral" icon={BarChart} />
          <NavItem tab="DRIVERS" label="Motoristas" icon={Truck} />
          <NavItem tab="PARTNERS" label="Parceiros" icon={Store} />
          <NavItem tab="USERS" label="Usuários" icon={Users} />
          <div className="my-4 border-t border-gray-700"></div>
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Configurações</p>
          <NavItem tab="HERO" label="Imagens do Site" icon={ImageIcon} />
          <NavItem tab="SETTINGS" label="Preferências" icon={Settings} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar Mobile (Menu placeholder if needed) */}
        <div className="md:hidden bg-gray-800 p-4 text-white flex justify-between items-center">
            <span className="font-bold">Painel Admin</span>
            {/* Simple Dropdown or just use Navbar */}
        </div>

        <div className="flex-1 overflow-auto p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    {activeTab === 'DASHBOARD' && 'Visão Geral'}
                    {activeTab === 'DRIVERS' && 'Gerenciar Motoristas'}
                    {activeTab === 'PARTNERS' && 'Gerenciar Parceiros'}
                    {activeTab === 'USERS' && 'Usuários do Sistema'}
                    {activeTab === 'HERO' && 'Personalizar Página Inicial'}
                    {activeTab === 'SETTINGS' && 'Configurações'}
                </h1>
                {activeTab !== 'HERO' && activeTab !== 'DASHBOARD' && (
                    <Button size="sm"><Plus size={16} className="mr-2" /> Adicionar Novo</Button>
                )}
            </div>

            {/* DASHBOARD CONTENT */}
            {activeTab === 'DASHBOARD' && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-sm text-gray-500">Total Motoristas</p>
                        <h3 className="text-3xl font-bold">{MOCK_DRIVERS.length}</h3>
                        </div>
                        <Truck className="text-yellow-500 opacity-50" size={32} />
                    </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-sm text-gray-500">Total Parceiros</p>
                        <h3 className="text-3xl font-bold">{MOCK_PARTNERS.length}</h3>
                        </div>
                        <Store className="text-blue-500 opacity-50" size={32} />
                    </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-sm text-gray-500">Usuários Ativos</p>
                        <h3 className="text-3xl font-bold">142</h3>
                        </div>
                        <Users className="text-green-500 opacity-50" size={32} />
                    </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
                    <div className="flex justify-between items-start">
                        <div>
                        <p className="text-sm text-gray-500">Receita Mensal</p>
                        <h3 className="text-3xl font-bold">R$ 12k</h3>
                        </div>
                        <BarChart className="text-purple-500 opacity-50" size={32} />
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Atividades Recentes</h2>
                    </div>
                    <div className="p-6 text-gray-500 text-sm">
                        Nenhuma atividade recente registrada no log do sistema.
                    </div>
                </div>
                </>
            )}

            {/* DRIVERS CONTENT */}
            {activeTab === 'DRIVERS' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Veículo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rota</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_DRIVERS.map((driver) => (
                        <tr key={driver.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full object-cover" src={driver.photoUrl} alt="" />
                                </div>
                                <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                                <div className="text-sm text-gray-500">ID: {driver.id}</div>
                                </div>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {driver.vehicle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {driver.route}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                            ★ {driver.rating}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">Editar</button>
                            <button className="text-red-600 hover:text-red-900">Banir</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            )}

            {/* PARTNERS CONTENT */}
            {activeTab === 'PARTNERS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_PARTNERS.map(partner => (
                         <div key={partner.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                            <div className="flex items-center mb-4">
                                <img src={partner.photoUrl} className="w-12 h-12 rounded-full object-cover mr-3" />
                                <div>
                                    <h3 className="font-bold text-gray-800">{partner.name}</h3>
                                    <p className="text-xs text-gray-500">{partner.category}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 truncate">{partner.description}</p>
                            <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="outline">Ver Detalhes</Button>
                            </div>
                         </div>
                    ))}
                </div>
            )}

            {/* HERO IMAGES MANAGER */}
            {activeTab === 'HERO' && (
                <div className="space-y-6">
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertTriangle className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Diretrizes de Imagem</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>Para garantir a melhor qualidade visual na página inicial, siga estas recomendações:</p>
                                    <ul className="list-disc pl-5 space-y-1 mt-1">
                                        <li><strong>Resolução Recomendada:</strong> 1920x600 pixels (ou proporção 3:1).</li>
                                        <li><strong>Formato:</strong> JPG ou PNG otimizado para web.</li>
                                        <li><strong>Conteúdo:</strong> Evite textos na imagem, pois o título do site ficará sobreposto.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionar Nova Imagem</h3>
                        <div className="flex gap-4">
                            <input 
                                type="text" 
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                                placeholder="Cole a URL da imagem aqui (ex: https://...)"
                                value={newImageUrl}
                                onChange={(e) => setNewImageUrl(e.target.value)}
                            />
                            <Button onClick={handleAddImage} disabled={!newImageUrl}>
                                <Plus size={18} className="mr-2" /> Adicionar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">Imagens Ativas ({heroImages.length})</h3>
                            <button 
                                onClick={handleResetImages}
                                className="text-sm text-gray-500 hover:text-red-500 flex items-center"
                            >
                                <RefreshCw size={14} className="mr-1" /> Restaurar Padrões
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {heroImages.map((url, index) => (
                                <div key={index} className="group relative rounded-lg overflow-hidden border border-gray-200 aspect-[3/1]">
                                    <img src={url} alt={`Banner ${index}`} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => handleRemoveImage(index)}
                                            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transform hover:scale-110 transition-transform"
                                            title="Remover Imagem"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                        Slide {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button size="lg" onClick={handleSaveImages}>
                                Salvar Alterações
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* USERS/SETTINGS PLACEHOLDERS */}
            {(activeTab === 'USERS' || activeTab === 'SETTINGS') && (
                <div className="bg-white p-12 rounded-xl shadow-sm border border-dashed border-gray-300 text-center">
                    <Settings size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Em Desenvolvimento</h3>
                    <p className="text-gray-500 mt-2">Este módulo estará disponível na próxima atualização do sistema.</p>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};