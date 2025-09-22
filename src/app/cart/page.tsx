'use client'

import { addToCart, decrementQty, removeFromCart, clearCart } from '@/store/slices/cartSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={product.image} alt={product.title} className="w-16 h-16 object-contain" />
                <div>
                  <div className="font-medium">{product.title}</div>
                  <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded">
                  <button className="px-3" onClick={() => dispatch(decrementQty(product.id))}>
                    -
                  </button>
                  <div className="px-3">{qty}</div>
                  <button className="px-3" onClick={() => dispatch(addToCart(product))}>
                    +
                  </button>
                </div>

                <button className="text-red-500" onClick={() => dispatch(removeFromCart(product.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-4">
            <div>
              <div className="text-gray-500">Total</div>
              <div className="text-2xl font-bold">${total.toFixed(2)}</div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => dispatch(clearCart())}>
                Clear
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
