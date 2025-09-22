'use client';

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts } from '@/service/api/productService';
import { Product } from '@/service/types/products';

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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-indigo-600">Loading products...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
