'use client';

import React, { useState } from 'react';

export interface PricingDetails {
  basePrice: number;
  firstThreeBookingsDiscount: boolean;
  weeklyDiscount: boolean;
  monthlyDiscount: boolean;
}

interface PricingFormProps {
  onSubmit: (pricing: PricingDetails) => void;
}

export default function PricingForm({ onSubmit }: PricingFormProps) {
  const [pricing, setPricing] = useState<PricingDetails>({
    basePrice: 0,
    firstThreeBookingsDiscount: false,
    weeklyDiscount: false,
    monthlyDiscount: false
  });

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricing(prev => ({
      ...prev,
      basePrice: Number(e.target.value)
    }));
  };

  const toggleDiscount = (discountType: keyof Omit<PricingDetails, 'basePrice'>) => {
    setPricing(prev => ({
      ...prev,
      [discountType]: !prev[discountType]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pricing);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="basePrice" className="block text-sm font-medium text-gray-700">
          Preço por Noite (R$)
        </label>
        <input
          type="number"
          id="basePrice"
          name="basePrice"
          min="0"
          step="0.01"
          value={pricing.basePrice}
          onChange={handlePriceChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Digite o preço por noite"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Descontos</h3>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="firstThreeBookingsDiscount"
            checked={pricing.firstThreeBookingsDiscount}
            onChange={() => toggleDiscount('firstThreeBookingsDiscount')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="firstThreeBookingsDiscount" 
            className="ml-2 block text-sm text-gray-900"
          >
            10% de desconto para as primeiras 3 reservas
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="weeklyDiscount"
            checked={pricing.weeklyDiscount}
            onChange={() => toggleDiscount('weeklyDiscount')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="weeklyDiscount" 
            className="ml-2 block text-sm text-gray-900"
          >
            10% de desconto para estadias de 7 noites ou mais
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="monthlyDiscount"
            checked={pricing.monthlyDiscount}
            onChange={() => toggleDiscount('monthlyDiscount')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label 
            htmlFor="monthlyDiscount" 
            className="ml-2 block text-sm text-gray-900"
          >
            20% de desconto para estadias de 28 noites ou mais
          </label>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Confirmar Precificação
      </button>
    </form>
  );
}
