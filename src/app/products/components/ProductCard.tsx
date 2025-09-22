'use client'
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { addToCart } from '@/store/slices/cartSlice';
import { ProductCardProps } from '@/service/types/products';
import Image from 'next/image';


export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <Link
        href={`/products/${product.id}`}
        className="flex-1 flex items-center justify-center"
      >
      <Image
  src={product.image}
  alt={product.title}
  width={160}
  height={160} 
  className="object-contain max-h-40"
/>

      </Link>

      <h3 className="mt-4 text-sm font-medium line-clamp-2">{product.title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-semibold">${product.price.toFixed(2)}</span>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="ml-4 bg-indigo-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
