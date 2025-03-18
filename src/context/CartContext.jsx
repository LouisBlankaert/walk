"use client"

import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  // Fermer le mini-panier après 5 secondes
  useEffect(() => {
    let timeout;
    if (isMiniCartOpen) {
      timeout = setTimeout(() => setIsMiniCartOpen(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isMiniCartOpen]);

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isLoading]);

  const addToCart = (product) => {
    setIsMiniCartOpen(true);
    setCart(currentCart => {
      const existingItem = currentCart.find(
        item => item.id === product.id
      );

      if (existingItem) {
        // Si le produit existe déjà, augmenter la quantité
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Sinon, ajouter un nouveau produit
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart =>
      currentCart.filter(item => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isMiniCartOpen,
        setIsMiniCartOpen,
      }}
    >
      {!isLoading && children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
