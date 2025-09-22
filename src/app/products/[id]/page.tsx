'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { fetchProductById } from '@/service/api/productService';
import Image from 'next/image';
import { Product } from '@/service/types/products';
import Loading from '@/shared/components/loader';
import Button from '@/shared/components/button';
import { RootState } from '@/store';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = product
    ? cartItems.some((item) => item.product.id === product.id)
    : false;

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">Product not found</div>
    );
  }

  const handleCartToggle = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-8 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Product Image */}
        <div className="flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={160}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
          <div className="text-gray-200 mb-4">{product.category}</div>
          <div className="text-3xl font-bold mb-4">
            ₦{product.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-gray-100 mb-6">{product.description}</p>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleCartToggle}
              className={`px-4 py-2 rounded cursor-pointer whitespace-nowrap ${
                isInCart
                  ? 'bg-red-600 hover:bg-red-700 hover:text-red-500'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:text-indigo-500'
              }`}
            >
              {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
