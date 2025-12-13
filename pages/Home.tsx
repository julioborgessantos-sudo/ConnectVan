import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_DRIVERS, MOCK_PARTNERS, DEFAULT_HERO_IMAGES } from '../constants';
import { DriverCard } from '../components/DriverCard';
import { PartnerCard } from '../components/PartnerCard';
import { Button } from '../components/Button';
import { Search, Filter, School, MapPin, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>(DEFAULT_HERO_IMAGES);

  // Filter State
  const [selectedSchool, setSelectedSchool] = useState('');
  const [neighborhoodSearch, setNeighborhoodSearch] = useState('');
  const [inputError, setInputError] = useState('');

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

  // Helper: Normalize text for consistent comparison (removes accents, lowercase, trims)
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
    
    // Regex allows letters (including accents), numbers, spaces, hyphens, and dots.
    // Blocks special symbols like @#$%&*() which are invalid for neighborhood names.
    const isValid = /^[a-zA-Z0-9\s\-\.\u00C0-\u00FF]*$/.test(value);

    if (isValid || value === '') {
      setNeighborhoodSearch(value);
      setInputError('');
    } else {
      setInputError('Caractere inválido. Use apenas letras e números.');
    }
  };

  // Filter logic
  const filteredDrivers = useMemo(() => {
    return MOCK_DRIVERS.filter(driver => {
      const matchesSchool = selectedSchool ? driver.schools.includes(selectedSchool) : true;
      
      const normalizedRoute = normalizeText(driver.route);
      const normalizedSearch = normalizeText(neighborhoodSearch);

      const matchesNeighborhood = neighborhoodSearch 
        ? normalizedRoute.includes(normalizedSearch) 
        : true;
      
      return matchesSchool && matchesNeighborhood;
    });
  }, [selectedSchool, neighborhoodSearch]);

  const clearFilters = () => {
    setSelectedSchool('');
    setNeighborhoodSearch('');
    setInputError('');
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
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        
        {/* Carousel Background Layers */}
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

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4 drop-shadow-lg">
            Transporte Escolar <span className="text-yellow-400">Seguro e Confiável</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-200 opacity-90">
            Conectamos pais a motoristas qualificados. Encontre o transporte ideal para seu filho ou aproveite benefícios exclusivos como parceiro.
          </p>
          
          <div className="mt-10 flex justify-center gap-4">
            <Button 
              size="lg" 
              className="rounded-full px-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg"
              onClick={scrollToDrivers}
            >
              Encontrar Motorista
            </Button>
            <LinkButton 
              to="/plans" 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              Ver Planos
            </LinkButton>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-yellow-400 scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drivers Section */}
      <div id="drivers-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">Encontre seu Motorista</h2>
          <LinkButton to="/register" variant="outline" size="sm">É motorista? Cadastre-se</LinkButton>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center text-gray-700 font-semibold mr-2 mt-3 md:mt-0">
              <Filter size={20} className="mr-2 text-yellow-500" />
              Filtros:
            </div>
            
            <div className="relative w-full md:w-1/3 group">
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

            <div className="relative w-full md:w-1/3 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400 group-focus-within:text-yellow-500 transition-colors" />
              </div>
              <input
                type="text"
                maxLength={50}
                className={`block w-full pl-10 pr-4 py-3 border rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 sm:text-sm transition-shadow ${
                  inputError 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-yellow-500 focus:border-yellow-500'
                }`}
                placeholder="Filtrar por Bairro (ex: Mollon)"
                value={neighborhoodSearch}
                onChange={handleNeighborhoodChange}
              />
              {inputError && (
                <div className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center">
                  <AlertCircle size={10} className="mr-1" />
                  {inputError}
                </div>
              )}
            </div>

            {(selectedSchool || neighborhoodSearch) && (
              <button 
                onClick={clearFilters}
                className="flex items-center text-sm text-red-500 hover:text-red-700 font-medium ml-auto md:ml-0 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors mt-2 md:mt-0"
              >
                <X size={16} className="mr-1" />
                Limpar
              </button>
            )}
          </div>
        </div>
        
        {/* Drivers Grid */}
        {filteredDrivers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDrivers.map(driver => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nenhum motorista encontrado</h3>
            <p className="text-gray-500 mt-2">Tente ajustar seus filtros de escola ou bairro.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}
      </div>

      {/* Partners Section (Public Preview) */}
      <div className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nossos Parceiros</h2>
            <p className="text-gray-500 mt-3 text-lg">Empresas que confiam e apoiam o transporte escolar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PARTNERS.map(partner => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for navigation inside component for simplicity in this demo structure
const LinkButton: React.FC<any> = ({ to, children, ...props }) => (
  <Link to={to}>
    <Button {...props}>{children}</Button>
  </Link>
);