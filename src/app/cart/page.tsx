'use client'

import { useState } from 'react'
import { addToCart, decrementQty, removeFromCart, clearCart } from '@/store/slices/cartSlice'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import Image from 'next/image'

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items)
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-20 text-[#0c132c]">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <div className="text-gray-400">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded shadow"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={60}
                  height={60}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <div className="font-medium text-[#0c132c] line-clamp-2">
                    {product.title}
                  </div>
                  <div className="text-sm font-semibold text-gray-500">
                    ₦{product.price.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center border rounded text-[#0c132c]">
                  <button
                    className="px-3 cursor-pointer"
                    onClick={() => dispatch(decrementQty(product.id))}
                  >
                    -
                  </button>
                  <div className="px-3">{qty}</div>
                  <button
                    className="px-3 cursor-pointer"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-red-500 text-sm"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total + Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
            <div>
              <div className="text-gray-500">Total</div>
              <div className="text-2xl font-bold">
                ₦{total.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="px-4 py-2 bg-gray-200 rounded text-red-500 cursor-pointer w-full sm:w-auto"
                onClick={() => setShowModal(true)}
              >
                Clear Cart
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer w-full sm:w-auto">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#0c132c]">
              Clear Cart?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to clear all items from your cart? This
              action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer text-[#0c132c]"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
                onClick={() => {
                  dispatch(clearCart())
                  setShowModal(false)
                }}
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
