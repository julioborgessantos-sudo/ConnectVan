import React from 'react';
import { Partner } from '../types';
import { MapPin, Phone, MessageCircle, Store } from 'lucide-react';

interface PartnerCardProps {
  partner: Partner;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
  // Tratamento do telefone para o link do WhatsApp
  const cleanPhone = partner.phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${cleanPhone}?text=Olá, vi sua empresa no VanConnect e gostaria de saber mais sobre seus serviços.`;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Área da Imagem com efeito de Zoom */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={partner.photoUrl} 
          alt={partner.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        
        {/* Badge da Categoria */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center">
            <Store size={12} className="mr-1" />
            {partner.category}
          </span>
        </div>
      </div>
      
      {/* Conteúdo do Card */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {partner.name}
          </h3>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
            {partner.description}
          </p>
        </div>
        
        <div className="space-y-3 mb-6 mt-auto">
          <div className="flex items-start text-gray-600 text-sm">
            <MapPin size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
            <span>{partner.address}</span>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
          <a 
            href={`tel:${partner.phone}`}
            className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-gray-50 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <Phone size={16} className="mr-2" />
            Ligar
          </a>
          <a 
            href={whatsappUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center py-2.5 px-4 rounded-lg bg-green-500 text-white font-medium text-sm hover:bg-green-600 shadow-sm hover:shadow-md transition-all"
          >
            <MessageCircle size={16} className="mr-2" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};