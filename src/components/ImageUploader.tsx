'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploaderProps {
  onImagesUpload: (images: File[]) => void;
  onCoverImageSelect?: (imageIndex: number) => void;
}

export default function ImageUploader({ 
  onImagesUpload, 
  onCoverImageSelect 
}: ImageUploaderProps) {
  const [images, setImages] = useState<File[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedImages = [...images, ...newFiles];
      setImages(updatedImages);
      onImagesUpload(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesUpload(updatedImages);

    // Adjust cover image index if needed
    if (coverImageIndex === index) {
      setCoverImageIndex(null);
      onCoverImageSelect && onCoverImageSelect(-1);
    } else if (coverImageIndex !== null && index < coverImageIndex) {
      setCoverImageIndex(coverImageIndex - 1);
      onCoverImageSelect && onCoverImageSelect(coverImageIndex - 1);
    }
  };

  const handleCoverImageSelect = (index: number) => {
    setCoverImageIndex(index);
    onCoverImageSelect && onCoverImageSelect(index);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-uploader space-y-4">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple 
        accept="image/*" 
        className="hidden" 
      />
      
      <button 
        type="button"
        onClick={triggerFileInput}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Adicionar Imagens
      </button>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <Image 
                src={URL.createObjectURL(image)}
                alt={`Property image ${index + 1}`}
                width={200}
                height={200}
                className={`
                  w-full h-40 object-cover rounded-md
                  ${coverImageIndex === index 
                    ? 'border-4 border-green-500' 
                    : 'border border-gray-300'}
                `}
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleCoverImageSelect(index)}
                  className="bg-green-500 text-white p-1 rounded-full text-xs"
                  title="Definir como imagem de capa"
                >
                  Capa
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white p-1 rounded-full text-xs"
                  title="Remover imagem"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
