import React from 'react';
import { Driver } from '../types';
import { Star, Bus, MapPin, Phone, MessageCircle } from 'lucide-react';

interface DriverCardProps {
  driver: Driver;
}

export const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  // Remove caracteres não numéricos para o link do WhatsApp
  const cleanPhone = driver.phone.replace(/\D/g, '');
  // Assume código do país +55 (Brasil) para o exemplo
  const whatsappUrl = `https://wa.me/55${cleanPhone}?text=Olá ${driver.name}, encontrei seu perfil no VanConnect e gostaria de mais informações.`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <img 
          src={driver.photoUrl} 
          alt={driver.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-bold text-yellow-500 flex items-center shadow-sm">
          <Star size={16} className="mr-1 fill-current" />
          {driver.rating}
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{driver.name}</h3>
        <p className="text-gray-500 text-sm mb-4 flex items-center">
          <Bus size={14} className="mr-1" /> {driver.vehicle}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-start">
            <MapPin size={16} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">{driver.route}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {driver.schools.map((school, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-md">
                {school}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 line-clamp-2 italic mb-4">"{driver.bio}"</p>
          
          <div className="grid grid-cols-2 gap-3">
            <a 
              href={`tel:${driver.phone}`} 
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors text-sm"
            >
              <Phone size={16} className="mr-2" />
              Ligar
            </a>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
            >
              <MessageCircle size={16} className="mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};