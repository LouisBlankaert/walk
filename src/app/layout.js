import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartOverlay from "@/components/CartOverlay";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "WALK - Boutique de Mode",
  description: "Découvrez notre collection de vêtements et accessoires de mode.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <LoadingScreen />
        <CartProvider>
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartOverlay />
        </CartProvider>
      </body>
    </html>
  );
}
