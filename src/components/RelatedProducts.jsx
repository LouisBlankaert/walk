"use client"

import ProductCard from "./ProductCard";

export default function RelatedProducts({ currentProduct }) {
  // Simulation de produits similaires (à remplacer par une vraie API/base de données)
  const relatedProducts = [
    {
      id: 'related-1',
      title: "Produit Similaire 1",
      price: 99,
      image: "/images/hat.png"
    },
    {
      id: 'related-2',
      title: "Produit Similaire 2",
      price: 119,
      image: "/images/hat.png"
    },
    {
      id: 'related-3',
      title: "Produit Similaire 3",
      price: 89,
      image: "/images/hat.png"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-light mb-8">Vous aimerez aussi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {relatedProducts.map((product, index) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
