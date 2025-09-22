'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts } from '@/service/api/productService';
import { Product } from '@/service/types/products';
import Loading from '@/shared/components/loader';

export default function Products() {
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
    <div className="relative min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
          <Loading />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
        <h2 className="text-2xl font-semibold mb-4"> All Products</h2>

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
      </div>
    </div>
  );
}
