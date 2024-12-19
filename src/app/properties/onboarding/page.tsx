'use client';

import React, { useState } from 'react';
import PropertyTypeSelector from '@/components/PropertyTypeSelector';
import PropertyDetailsForm, { PropertyDetails } from '@/components/PropertyDetailsForm';
import AmenitiesSelector from '@/components/AmenitiesSelector';
import ImageUploader from '@/components/ImageUploader';
import PricingForm, { PricingDetails } from '@/components/PricingForm';

export default function PropertyOnboarding() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  const [amenities, setAmenities] = useState<{
    standard: string[];
    highlights: string[];
  } | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number>(-1);
  const [pricing, setPricing] = useState<PricingDetails | null>(null);

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Tipo de Imóvel</h1>
            <PropertyTypeSelector 
              onSelect={(type) => {
                setPropertyType(type);
                handleNextStep();
              }} 
            />
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Detalhes do Imóvel</h1>
            <PropertyDetailsForm 
              onSubmit={(details) => {
                setPropertyDetails(details);
                handleNextStep();
              }} 
            />
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePreviousStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Comodidades</h1>
            <AmenitiesSelector 
              onSelect={(selectedAmenities) => {
                setAmenities(selectedAmenities);
                handleNextStep();
              }} 
            />
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePreviousStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Fotos do Imóvel</h1>
            <ImageUploader 
              onImagesUpload={(uploadedImages) => {
                setImages(uploadedImages);
              }}
              onCoverImageSelect={(index) => {
                setCoverImageIndex(index);
              }}
            />
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePreviousStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Voltar
              </button>
              <button 
                type="button" 
                onClick={handleNextStep}
                disabled={images.length === 0}
                className={`
                  py-2 px-4 rounded-md
                  ${images.length > 0 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                `}
              >
                Próximo
              </button>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Precificação</h1>
            <PricingForm 
              onSubmit={(pricingDetails) => {
                setPricing(pricingDetails);
                handleNextStep();
              }} 
            />
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={handlePreviousStep}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
              >
                Voltar
              </button>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-center">Revisar e Publicar</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Imóvel</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Tipo de Imóvel:</strong>
                  <p>{propertyType}</p>
                </div>
                
                <div>
                  <strong>Endereço:</strong>
                  <p>{propertyDetails?.address}</p>
                </div>
                
                <div>
                  <strong>Capacidade:</strong>
                  <p>{propertyDetails?.guests} hóspedes</p>
                </div>
                
                <div>
                  <strong>Quartos:</strong>
                  <p>{propertyDetails?.bedrooms}</p>
                </div>
                
                <div>
                  <strong>Banheiros:</strong>
                  <p>{propertyDetails?.bathrooms}</p>
                </div>
                
                <div>
                  <strong>Camas:</strong>
                  <p>{propertyDetails?.beds}</p>
                </div>
              </div>

              <div className="mt-4">
                <strong>Comodidades:</strong>
                <div className="flex space-x-4 mt-2">
                  <div>
                    <h3 className="font-semibold">Padrão:</h3>
                    <ul className="list-disc list-inside">
                      {amenities?.standard.map(amenity => (
                        <li key={amenity}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Destaque:</h3>
                    <ul className="list-disc list-inside">
                      {amenities?.highlights.map(amenity => (
                        <li key={amenity}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <strong>Imagens:</strong>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={URL.createObjectURL(image)} 
                        alt={`Property image ${index + 1}`} 
                        className={`
                          w-full h-40 object-cover rounded-md
                          ${index === coverImageIndex ? 'border-4 border-green-500' : ''}
                        `}
                      />
                      {index === coverImageIndex && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Capa
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <strong>Precificação:</strong>
                <p>Preço por noite: R$ {pricing?.basePrice}</p>
                <div className="mt-2">
                  <h3 className="font-semibold">Descontos:</h3>
                  <ul className="list-disc list-inside">
                    {pricing?.firstThreeBookingsDiscount && (
                      <li>10% de desconto para as primeiras 3 reservas</li>
                    )}
                    {pricing?.weeklyDiscount && (
                      <li>10% de desconto para estadias de 7 noites ou mais</li>
                    )}
                    {pricing?.monthlyDiscount && (
                      <li>20% de desconto para estadias de 28 noites ou mais</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button 
                  type="button" 
                  onClick={handlePreviousStep}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                >
                  Editar
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    // TODO: Implement property publication logic
                    alert('Imóvel publicado com sucesso!');
                  }}
                  className="bg-green-600 text-white py-2 px-4 rounded-md"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      {renderStep()}
    </div>
  );
}
