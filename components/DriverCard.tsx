import React from 'react';
import { Driver } from '../types';
import { Bus, MapPin, Phone, MessageCircle } from 'lucide-react';

interface DriverCardProps {
  driver: Driver;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  // Remove caracteres não numéricos para o link do WhatsApp
  const cleanPhone = driver.phone.replace(/\D/g, '');
  // Assume código do país +55 (Brasil) para o exemplo
  const whatsappUrl = `https://wa.me/55${cleanPhone}?text=Olá ${driver.name}, encontrei seu perfil no VanConnect e gostaria de mais informações.`;

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col h-full transform hover:-translate-y-3 hover:rotate-1 hover:scale-[1.02] cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={driver.photoUrl} 
          alt={driver.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col relative bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-yellow-600 transition-colors duration-300">
          {driver.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <Bus size={14} className="mr-1 text-yellow-500" /> {driver.vehicle}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <MapPin size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600 font-medium">{driver.route}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {driver.schools.map((school, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tight border border-blue-100">
                {school}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-5 border-t border-gray-100">
          <p className="text-sm text-gray-500 line-clamp-2 italic mb-5 leading-relaxed">
            "{driver.bio}"
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={`tel:${driver.phone}`} 
              className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-2.5 px-3 rounded-xl transition-all text-xs border border-gray-200"
            >
              <Phone size={14} className="mr-2" />
              Ligar
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-3 rounded-xl transition-all shadow-sm hover:shadow-green-500/20 text-xs"
            >
              <MessageCircle size={14} className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};