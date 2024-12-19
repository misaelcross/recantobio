'use client';

import React, { useState } from 'react';

const STANDARD_AMENITIES = [
  { id: 'tv', label: 'TV' },
  { id: 'parking', label: 'Estacionamento' },
  { id: 'kitchen', label: 'Cozinha' },
  { id: 'wifi', label: 'Wi-Fi' },
  { id: 'airConditioning', label: 'Ar Condicionado' },
  { id: 'heating', label: 'Aquecedor' }
];

const HIGHLIGHT_AMENITIES = [
  { id: 'pool', label: 'Piscina' },
  { id: 'hydroBathroom', label: 'Banheiro de Hidro' },
  { id: 'fireplace', label: 'Lareira' },
  { id: 'jacuzzi', label: 'Jacuzzi' },
  { id: 'barbecue', label: 'Churrasqueira' },
  { id: 'garden', label: 'Jardim' }
];

interface AmenitiesSelectorProps {
  onSelect: (amenities: {
    standard: string[];
    highlights: string[];
  }) => void;
}

export default function AmenitiesSelector({ onSelect }: AmenitiesSelectorProps) {
  const [selectedStandardAmenities, setSelectedStandardAmenities] = useState<string[]>([]);
  const [selectedHighlightAmenities, setSelectedHighlightAmenities] = useState<string[]>([]);

  const toggleStandardAmenity = (amenityId: string) => {
    setSelectedStandardAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const toggleHighlightAmenity = (amenityId: string) => {
    setSelectedHighlightAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const handleSubmit = () => {
    onSelect({
      standard: selectedStandardAmenities,
      highlights: selectedHighlightAmenities
    });
  };

  return (
    <div className="amenities-selector space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Comodidades Padrão</h3>
        <div className="grid grid-cols-3 gap-4">
          {STANDARD_AMENITIES.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleStandardAmenity(amenity.id)}
              className={`
                p-2 border rounded-md transition-all duration-300
                ${selectedStandardAmenities.includes(amenity.id) 
                  ? 'bg-blue-500 text-white border-blue-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}
              `}
            >
              {amenity.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Comodidades em Destaque</h3>
        <div className="grid grid-cols-3 gap-4">
          {HIGHLIGHT_AMENITIES.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleHighlightAmenity(amenity.id)}
              className={`
                p-2 border rounded-md transition-all duration-300
                ${selectedHighlightAmenities.includes(amenity.id) 
                  ? 'bg-green-500 text-white border-green-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}
              `}
            >
              {amenity.label}
            </button>
          ))}
        </div>
      </div>

      <button 
        type="button"
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Confirmar Comodidades
      </button>
    </div>
  );
}
