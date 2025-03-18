"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function MiniCart({ isOpen, onClose }) {
  const { cart, getCartTotal, removeFromCart } = useCart();

  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Mini panier */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Panier</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 flex-grow overflow-auto max-h-[calc(100vh-200px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Votre panier est vide</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b relative group">
                  <div className="relative w-20 aspect-[3/4]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.title}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        title="Supprimer l'article"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    <p className="text-sm font-medium">{item.price}€</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4">
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-medium">{getCartTotal()}€</span>
          </div>
          <Link 
            href="/cart"
            className="block w-full bg-black text-white text-center py-3 hover:bg-gray-800 transition-colors duration-300"
            onClick={onClose}
          >
            Voir le panier
          </Link>
        </div>
      </div>
    </>
  );
}
