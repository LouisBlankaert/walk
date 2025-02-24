"use client"

import { useState } from 'react';
import Image from 'next/image';

// Données des images du lookbook
const lookbookImages = [
  {
    id: 1,
    src: "/images/image1.jpg",
    alt: "Look 1"
  },
  {
    id: 2,
    src: "/images/image2.jpg",
    alt: "Look 2"
  },
  {
    id: 3,
    src: "/images/image3.jpg",
    alt: "Look 3"
  },
  {
    id: 4,
    src: "/images/image4.jpg",
    alt: "Look 4"
  },
  // Ajoutez plus d'images ici
];

export default function LookbookPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden'; // Empêche le défilement du fond
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Réactive le défilement
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-roller mb-12">Lookbook</h1>
        
        {/* Grille d'images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lookbookImages.map((image) => (
            <div 
              key={image.id}
              className="relative aspect-[3/4] cursor-pointer group"
              onClick={() => openModal(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>

        {/* Modal de zoom */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] m-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white z-10 p-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-8 h-8"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
