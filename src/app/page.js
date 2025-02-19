import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div className="relative">
      <div className="h-screen sticky top-0">
        <Hero />
      </div>
      <div className="relative bg-white">
        <ProductGrid />
      </div>
    </div>
  );
}
