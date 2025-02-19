"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ id, image, title, price }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, title, price, image }, 'M'); // Taille par défaut, à améliorer
  };

  return (
    <div className="group relative">
      <Link href={`/products/${encodeURIComponent(title.toLowerCase())}`} className="block relative">
        <div className="relative aspect-[3/4] mb-2 sm:mb-4 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Bouton Ajouter au panier */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 left-1/2 -translate-x-1/2
                       bg-white/90 backdrop-blur-sm text-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg
                       opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-all duration-300
                       hover:bg-black hover:text-white active:bg-black active:text-white
                       text-xs sm:text-sm font-medium z-10
                       touch-device:opacity-100 touch-device:bg-black touch-device:text-white"
          >
            Ajout rapide
          </button>
        </div>
        <div className="relative">
          <div className="flex justify-between items-baseline px-1">
            <h3 className="text-xs sm:text-sm font-light truncate mr-2">{title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{price}€</p>
          </div>
          <span className="absolute -bottom-1 left-1/2 w-0 h-[1.5px] bg-black group-hover:w-full group-hover:left-0 transition-all duration-500 ease-in-out" />
        </div>
      </Link>
    </div>
  );
}
