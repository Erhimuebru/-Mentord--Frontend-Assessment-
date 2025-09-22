'use client'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { ProductCardProps } from '@/service/types/products';
import Image from 'next/image';
import { RootState } from '@/store';

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartItems.some((item) => item.product.id === product.id);

  const handleClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
<div className="rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-95 p-4 flex flex-col text-[#0c132c]">
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

  <h3 className="mt-4 text-sm font-medium line-clamp-2 text-[#0c132c]">
    {product.title}
  </h3>
  <div className="mt-2 flex items-center justify-between">
    <span className="font-semibold text-[#0c132c]">
      ₦{product.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
    </span>
    <button
      onClick={handleClick}
      className={`ml-4 px-3 py-1 rounded cursor-pointer ${
        isInCart ? 'bg-red-600' : 'bg-indigo-600'
      } text-white`}
    >
      {isInCart ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  </div>
</div>


  );
}
