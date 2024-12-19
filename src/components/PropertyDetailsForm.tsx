'use client';

import React, { useState } from 'react';

export interface PropertyDetails {
  address: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;
}

interface PropertyDetailsFormProps {
  onSubmit: (details: PropertyDetails) => void;
}

export default function PropertyDetailsForm({ onSubmit }: PropertyDetailsFormProps) {
  const [details, setDetails] = useState<PropertyDetails>({
    address: '',
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    beds: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: name === 'address' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Endereço
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={details.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Digite o endereço completo"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
            Hóspedes
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            min="1"
            value={details.guests}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">
            Quartos
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            min="1"
            value={details.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">
            Banheiros
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            min="1"
            value={details.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
            Camas
          </label>
          <input
            type="number"
            id="beds"
            name="beds"
            min="1"
            value={details.beds}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Próximo
      </button>
    </form>
  );
}
