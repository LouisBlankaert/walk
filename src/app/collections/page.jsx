"use client"

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products as allProducts } from '@/data/products';

export default function CollectionsPage() {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [loading, setLoading] = useState(false);

  const loadMoreProducts = () => {
    setLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setVisibleProducts(prev => Math.min(prev + 4, allProducts.length));
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-roller mb-8">Collections</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        {visibleProducts < allProducts.length && (
          <div className="flex justify-center mt-12 mb-16">
            <button
              onClick={loadMoreProducts}
              disabled={loading}
              className="bg-white text-black py-2 px-8 border border-black hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? 'Chargement...' : 'Voir plus'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
