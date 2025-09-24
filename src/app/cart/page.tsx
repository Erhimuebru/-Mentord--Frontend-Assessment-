'use client';

import { useState } from "react";
import {
  addToCart,
  decrementQty,
  removeFromCart,
  clearCart,
} from "@/store/slices/cartSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import ConfirmModal from "@/shared/modals/confirmModal";
import CheckoutSummaryModal from "@/shared/modals/checkoutSummaryModal";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Cart() {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] },
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-8 mt-24 text-[#0c132c]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <motion.div variants={itemVariants} className="text-gray-400">
          Your cart is empty.
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} className="space-y-4">
          {items.map(({ product, qty }) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded shadow"
            >
              {/* Product Info (clickable) */}
              <div
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => router.push(`/products/${product.id}`)}
              >
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
                    ₦
                    {product.price.toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Quantity Control */}
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <button
                    className={`px-4 py-2 text-lg font-bold transition ${
                      qty === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 text-[#0c132c] cursor-pointer"
                    }`}
                    onClick={() =>
                      qty > 1 && dispatch(decrementQty(product.id))
                    }
                    disabled={qty === 1}
                  >
                    -
                  </button>
                  <div className="px-5 py-2 text-lg font-semibold bg-white text-[#0c132c]">
                    {qty}
                  </div>
                  <button
                    className="px-4 py-2 text-lg font-bold bg-gray-200 hover:bg-gray-300 text-[#0c132c] transition cursor-pointer"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={() => dispatch(removeFromCart(product.id))}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}

          {/* Total + Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6"
          >
            <div>
              <div className="text-gray-500">Total</div>
              <div className="text-2xl font-bold">
                ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="px-4 py-2 bg-gray-200 rounded text-red-500 cursor-pointer w-full sm:w-auto"
                onClick={() => setShowModal(true)}
              >
                Clear Cart
              </button>
              <button
                onClick={() => setShowCheckout(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded cursor-pointer w-full sm:w-auto"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        title="Clear Cart?"
        message="Are you sure you want to clear all items from your cart? This action cannot be undone."
        confirmText="Yes, Clear"
        cancelText="Cancel"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          dispatch(clearCart());
          setShowModal(false);
        }}
      />

      <CheckoutSummaryModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={items}
        total={total}
      />
    </motion.div>
  );
}
