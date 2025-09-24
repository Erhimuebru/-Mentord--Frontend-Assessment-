'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts } from '@/service/api/productService';
import { Product } from '@/service/types/products';
import Loading from '@/shared/components/loader';
import { motion, Variants } from 'framer-motion';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  // filter first
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  // group the filtered products by category
  const productsByCategory = useMemo(() => {
    return filteredProducts.reduce((acc: Record<string, Product[]>, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
  }, [filteredProducts]);

  // Framer Motion variants
  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.17, 0.67, 0.83, 0.67] 
      }
    })
  };

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
          <Loading />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 mt-24 text-[#0c132c]">
        <h2 className="text-3xl font-bold mb-6">All Products</h2>

        {/* Search box */}
        <div className="mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full p-3 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Products grouped by category */}
        <div className="space-y-16">
          {Object.entries(productsByCategory).map(([category, items], idx) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={idx}
            >
              <h3 className="text-xl font-bold mb-6 capitalize border-b pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((p, pIdx) => (
                  <motion.div
                    key={p.id}
                    variants={categoryVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    custom={pIdx}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
