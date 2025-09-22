'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { addToCart } from '@/store/slices/cartSlice';
import { fetchProductById } from '@/service/api/productService';
import Image from 'next/image';
import { Product } from '@/service/types/products';


export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">Loading…</div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={160} 
            className="max-h-80 object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <div className="text-gray-600 mb-4">{product.category}</div>
          <div className="text-3xl font-bold mb-4">
            ${product.price.toFixed(2)}
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex gap-3">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
