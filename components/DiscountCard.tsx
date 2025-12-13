import React from 'react';
import { Discount } from '../types';
import { Tag, Clock, Copy } from 'lucide-react';

interface DiscountCardProps {
  discount: Discount;
}

export const DiscountCard: React.FC<DiscountCardProps> = ({ discount }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(discount.code);
    alert('Código copiado!');
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
        -{discount.percentageOff}% OFF
      </div>
      
      <div className="flex items-center mb-4 text-blue-600">
        <Tag className="mr-2" size={20} />
        <span className="font-semibold text-sm uppercase tracking-wide">{discount.partnerName}</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{discount.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{discount.description}</p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-100">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 flex items-center mb-1">
            <Clock size={12} className="mr-1" /> Válido até {new Date(discount.expiryDate).toLocaleDateString()}
          </span>
          <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded px-2 py-1">
            <code className="text-sm font-mono font-bold text-gray-800">{discount.code}</code>
            <button onClick={handleCopy} className="text-gray-400 hover:text-blue-500" title="Copiar código">
              <Copy size={14} />
            </button>
          </div>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Ver Detalhes &rarr;
        </button>
      </div>
    </div>
  );
};
