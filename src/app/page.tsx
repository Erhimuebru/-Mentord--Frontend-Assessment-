'use client';

import { HeroSection } from '@/shared/components/hero-section';
import { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '@/service/api/productService';
import { Product } from '@/service/types/products';
import ProductCard from './products/components/ProductCard';
import Loading from '@/shared/components/loader';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Group products by category
  const productsByCategory = useMemo(() => {
    return products.reduce((acc: Record<string, Product[]>, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [products]);

  return (
    <div className="min-h-screen flex flex-col relative text-[#0c132c]">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
          <Loading />
        </div>
      )}

      <HeroSection />

      <section className="pr-6 pl-6 mt-10">
        <div className="max-w-7xl mx-auto mb-14">
          {!loading && (
            <div className="space-y-12">
              {Object.entries(productsByCategory).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-xl font-bold mb-6 capitalize border-b pb-2">
                    {category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
