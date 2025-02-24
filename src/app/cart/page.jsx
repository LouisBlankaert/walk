"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0; // Frais de livraison gratuits
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-roller mb-8">Votre panier est vide</h1>
          <Link 
            href="/collections" 
            className="inline-block bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-roller mb-8">Panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des produits */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border">
                {/* Image du produit */}
                <div className="relative w-24 aspect-[3/4]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Informations du produit */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>

                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-black"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center border">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity)}€</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 p-6">
              <h2 className="text-lg font-medium mb-4">Résumé de la commande</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t pt-2 mt-2 font-medium text-base flex justify-between">
                  <span>Total</span>
                  <span>{total}€</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors duration-300">
                Passer la commande
              </button>

              <Link 
                href="/collections" 
                className="block text-center mt-4 text-sm text-gray-600 hover:text-black"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
