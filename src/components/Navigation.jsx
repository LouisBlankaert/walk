"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const CartCount = () => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  if (count === 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {count}
    </span>
  );
};

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className="relative group py-2"
    >
      <span className={`${isActive ? 'text-black' : 'text-gray-600'} group-hover:text-black transition-colors`}>
        {children}
      </span>
      <span className="absolute bottom-0 left-1/2 w-0 h-[1px] bg-black group-hover:w-full group-hover:left-0 transition-all duration-300" />
    </Link>
  );
};

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">WALK</Link>
        <div className="space-x-8">
          <NavLink href="/collections">Collections</NavLink>
          <NavLink href="/about">Notre Histoire</NavLink>
          <NavLink href="/lookbook">Lookbook</NavLink>
        </div>
        <div>
          <NavLink href="/cart" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <CartCount />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
