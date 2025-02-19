"use client"

import ProductCard from './ProductCard';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
      <div className="pt-8 sm:pt-12 lg:pt-16">
        <Link href="/collections">
          <button type="button" className="flex mt-4 mx-auto w-auto sm:w-1/8 bg-white text-black py-2 px-4 sm:px-6 rounded border border-black hover:bg-black hover:text-white transition-colors duration-300 text-sm sm:text-base">
            Voir Collection
          </button>
        </Link>
      </div>
    </section>
  );
}
