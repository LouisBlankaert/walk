"use client"

import { useCart } from '@/context/CartContext';
import dynamic from 'next/dynamic';

const MiniCart = dynamic(() => import('./MiniCart'), {
  ssr: false
});

export default function CartOverlay() {
  const { isMiniCartOpen, setIsMiniCartOpen } = useCart();
  return <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />;
}
