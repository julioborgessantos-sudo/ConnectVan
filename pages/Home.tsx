import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_DRIVERS, MOCK_PARTNERS, DEFAULT_HERO_IMAGES } from '../constants';
import { DriverCard } from '../components/DriverCard';
import { PartnerCard } from '../components/PartnerCard';
import { Button } from '../components/Button';
import { Search, School, MapPin, X, AlertCircle, Store, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_IMAGES);

  // Driver Filter State
  const [selectedSchool, setSelectedSchool] = useState('');
  const [neighborhoodSearch, setNeighborhoodSearch] = useState('');
  const [inputError, setInputError] = useState('');

  // Partner Filter State
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [partnerSearch, setPartnerSearch] = useState('');

  // Load Hero Images from Local Storage on mount
  useEffect(() => {
    const storedImages = localStorage.getItem('vanconnect_hero_images');
    if (storedImages) {
      try {
        const parsed = JSON.parse(storedImages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHeroImages(parsed);
        }
      } catch (e) {
        console.error("Erro ao carregar imagens do banner", e);
      }
    }
  }, []);

  // Extract unique schools for the dropdown
  const allSchools = useMemo(() => {
    const schools = MOCK_DRIVERS.flatMap(d => d.schools);
    return Array.from(new Set(schools)).sort();
  }, []);

  // Extract unique partner categories for the filter
  const partnerCategories = useMemo(() => {
    const categories = MOCK_PARTNERS.map(p => p.category);
    return ['Todas', ...Array.from(new Set(categories)).sort()];
  }, []);

  // Helper: Normalize text for consistent comparison
  const normalizeText = (text: string) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  };

  // Helper: Validate Neighborhood Input
  const handleNeighborhoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValid = /^[a-zA-Z0-9\s\-\.\u00C0-\u00FF]*$/.test(value);
    
    if (value.length > 40) {
      setInputError('O nome do bairro é muito longo (máximo 40 caracteres).');
      return;
    }

    if (isValid || value === '') {
      const sanitizedValue = value.replace(/\s{2,}/g, ' ');
      setNeighborhoodSearch(sanitizedValue);
      setInputError('');
    } else {
      setInputError('Caractere inválido detectado.');
    }
  };

  // Filter Drivers logic
  const filteredDrivers = useMemo(() => {
    return MOCK_DRIVERS.filter(driver => {
      const matchesSchool = selectedSchool ? driver.schools.includes(selectedSchool) : true;
      const normalizedRoute = normalizeText(driver.route);
      const normalizedSearch = normalizeText(neighborhoodSearch);
      const matchesNeighborhood = neighborhoodSearch ? normalizedRoute.includes(normalizedSearch) : true;
      return matchesSchool && matchesNeighborhood;
    });
  }, [selectedSchool, neighborhoodSearch]);

  // Consistência: Verificar se a escola selecionada existe no bairro pesquisado
  const hasConsistencyIssue = useMemo(() => {
    if (!selectedSchool || !neighborhoodSearch || filteredDrivers.length > 0) return false;
    const anyDriverForSchool = MOCK_DRIVERS.some(d => d.schools.includes(selectedSchool));
    return anyDriverForSchool;
  }, [selectedSchool, neighborhoodSearch, filteredDrivers]);

  // Filter Partners logic (Category + Search)
  const filteredPartners = useMemo(() => {
    const normalizedSearchTerm = normalizeText(partnerSearch);
    
    return MOCK_PARTNERS.filter(partner => {
      const matchesCategory = selectedCategory === 'Todas' || partner.category === selectedCategory;
      
      const matchesText = !partnerSearch || 
        normalizeText(partner.name).includes(normalizedSearchTerm) || 
        normalizeText(partner.description).includes(normalizedSearchTerm);

      return matchesCategory && matchesText;
    });
  }, [selectedCategory, partnerSearch]);

  const clearFilters = () => {
    setSelectedSchool('');
    setNeighborhoodSearch('');
    setInputError('');
  };

  const clearPartnerFilters = () => {
    setSelectedCategory('Todas');
    setPartnerSearch('');
  };

  // Carousel Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const scrollToDrivers = () => {
    const element = document.getElementById('drivers-list');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <div className="relative h-[650px] flex items-center justify-center overflow-hidden bg-gray-900">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 drop-shadow-lg">
            Transporte Escolar <span className="text-yellow-400">Seguro e Confiável</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 opacity-90">
            Conectamos pais a motoristas qualificados. Encontre o transporte ideal para seu filho ou aproveite benefícios exclusivos como parceiro.
          </p>
          <div className="mt-12 mb-10 flex justify-center space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 shadow-sm ${
                  index === currentSlide 
                    ? 'bg-yellow-400 scale-125 ring-4 ring-yellow-400/30' 
                    : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-center flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full px-10 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg shadow-xl shadow-yellow-500/20"
              onClick={scrollToDrivers}
            >
              Encontrar Motorista
            </Button>
            <LinkButton 
              to="/plans" 
              variant="outline" 
              size="lg" 
              className="rounded-full px-10 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-md"
            >
              Ver Planos
            </LinkButton>
          </div>
        </div>
      </div>

      {/* Drivers Section */}
      <div id="drivers-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Encontre seu Motorista</h2>
            <p className="text-gray-500 mt-1">Busque por escola ou bairro atendido.</p>
          </div>
          <LinkButton to="/register" variant="outline" size="sm">É motorista? Cadastre-se</LinkButton>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10 transition-all">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="relative w-full md:w-1/3 group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Escola Alvo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School size={18} className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                </div>
                <select
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm appearance-none transition-shadow"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="">Todas as Escolas</option>
                  {allSchools.map(school => (
                    <option key={school} value={school}>{school}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative w-full md:w-1/3 group">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Bairro de Atendimento</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
                </div>
                <input
                  type="text"
                  maxLength={41}
                  className={`block w-full pl-10 pr-4 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 sm:text-sm transition-all ${
                    inputError 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50' 
                      : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                  }`}
                  placeholder="Ex: Mollon, Centro..."
                  value={neighborhoodSearch}
                  onChange={handleNeighborhoodChange}
                />
              </div>
              {inputError && (
                <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-500 flex items-center animate-pulse">
                  <AlertCircle size={10} className="mr-1" />
                  {inputError}
                </div>
              )}
            </div>

            <div className="flex items-end gap-2 w-full md:w-auto mt-4 md:mt-0 pt-5">
              {(selectedSchool || neighborhoodSearch) && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center text-sm text-gray-400 hover:text-red-500 font-medium px-3 py-3 rounded-lg hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
                >
                  <X size={16} className="mr-1" />
                  Limpar
                </button>
              )}
              <div className={`px-4 py-3 rounded-lg text-xs font-bold transition-colors border flex items-center ${
                filteredDrivers.length > 0 
                  ? 'bg-green-50 text-green-700 border-green-100' 
                  : (selectedSchool || neighborhoodSearch) ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-gray-50 text-gray-500 border-gray-100'
              }`}>
                {filteredDrivers.length} Motorista{filteredDrivers.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
          {hasConsistencyIssue && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3 animate-fade-in">
              <Info size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Temos motoristas que atendem a escola <strong>{selectedSchool}</strong>, mas nenhum parece cobrir o bairro <strong>{neighborhoodSearch}</strong> no momento. Tente buscar por um bairro vizinho ou limpe os filtros.
              </p>
            </div>
          )}
        </div>
        
        {filteredDrivers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-inner">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 mb-6">
              <Search size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Busca sem resultados</h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              Não encontramos motoristas para os critérios selecionados. Remova os filtros para ver todos os profissionais disponíveis em SBO.
            </p>
            <button 
              onClick={clearFilters}
              className="mt-6 inline-flex items-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all transform hover:scale-105"
            >
              Ver Todos os Motoristas
            </button>
          </div>
        )}
      </div>

      {/* Partners Section (Public Preview) */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
            <p className="text-gray-500 mt-3 text-lg">Empresas que confiam e apoiam o transporte escolar</p>
          </div>

          {/* Área de Filtros de Parceiros */}
          <div className="max-w-2xl mx-auto mb-10">
            {/* Campo de Busca de Parceiros */}
            <div className="relative group mb-6">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Buscar parceiro por nome ou serviço..."
                className="block w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
                value={partnerSearch}
                onChange={(e) => setPartnerSearch(e.target.value)}
              />
              {partnerSearch && (
                <button 
                  onClick={() => setPartnerSearch('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-500"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filtro de Parceiros por Categoria */}
            <div className="flex flex-wrap justify-center gap-2">
              {partnerCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 ring-2 ring-blue-600 ring-offset-2'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Parceiros Filtrados */}
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPartners.map(partner => (
                <PartnerCard key={partner.id} partner={partner} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                 <Store size={32} className="text-gray-300" />
               </div>
               <h3 className="text-xl font-bold text-gray-900">Nenhum parceiro encontrado</h3>
               <p className="text-gray-500 mt-2">Não encontramos resultados para "{partnerSearch}" nesta categoria.</p>
               <button 
                  onClick={clearPartnerFilters}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-bold text-sm flex items-center mx-auto"
                >
                  <X size={16} className="mr-1" /> Limpar filtros de busca
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper for navigation
const LinkButton: React.FC<any> = ({ to, children, ...props }) => (
  <Link to={to}>
    <Button {...props}>{children}</Button>
  </Link>
);