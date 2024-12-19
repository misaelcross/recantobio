'use client';

import React from 'react';

const PROPERTY_TYPES = [
  'Chácara', 
  'Sítio', 
  'Cabana', 
  'Chalé', 
  'Casa de Campo', 
  'Casa de Praia'
];

interface PropertyTypeSelectorProps {
  onSelect: (type: string) => void;
}

export default function PropertyTypeSelector({ onSelect }: PropertyTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {PROPERTY_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className="
            p-4 border rounded-lg 
            hover:bg-blue-500 hover:text-white 
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        >
          {type}
        </button>
      ))}
    </div>
  );
}
