"use client"

import ProductCard from './ProductCard';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ProductGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
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
      <div className="pt-16">
        <Link href="/collections">
          <button type="button" className="flex mt-4 mx-auto w-1/8 bg-white text-black py-2 px-4 rounded border border-black hover:bg-black hover:text-white transition-colors duration-300">
            Voir Collection
          </button>
        </Link>
      </div>
    </section>
  );
}
