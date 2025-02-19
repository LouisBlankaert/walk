"use client"

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import RelatedProducts from "@/components/RelatedProducts";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const getProductData = (slug) => {
  const title = slug
    .replace(/%20/g, " ")
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const product = products.find(p => p.title.toLowerCase() === title.toLowerCase());
  
  if (!product) {
    // Retourner un produit par défaut si non trouvé
    return products[0];
  }

  return product;
};

export default function ProductPage() {
  const params = useParams();
  const product = getProductData(params.slug);
  const [mainImage, setMainImage] = useState(0);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galerie d'images */}
        <div className="space-y-4">
          <div className="relative aspect-[4/4] w-full">
            <Image
              src={product.images[mainImage]}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-[3/4] ${mainImage === index ? 'ring-2 ring-black' : ''}`}
                onClick={() => setMainImage(index)}
              >
                <Image
                  src={image}
                  alt={`${product.title} vue ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informations produit */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light mb-2">{product.title}</h1>
            <p className="text-xl text-gray-700">{product.price}€</p>
          </div>

          {/* Bouton d'ajout au panier */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 hover:bg-gray-800 transition-colors duration-300"
          >
            Ajouter au panier
          </button>

          {/* Description et détails */}
          <div className="space-y-6 pt-8 border-t">
            <div>
              <h2 className="text-lg font-medium mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Détails</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
      <RelatedProducts currentProduct={product.title} />
    </div>
  );
}
