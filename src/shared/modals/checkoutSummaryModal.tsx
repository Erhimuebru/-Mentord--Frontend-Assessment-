"use client";

import { CartItem } from "@/service/types/cart";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items:  CartItem [];
  total: number;
}

export default function CheckoutSummaryModal({
  isOpen,
  onClose,
  items,
  total,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-lg mx-4 p-6 shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-[#0c132c]">
          Checkout Summary
        </h3>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 border-b pb-2"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={50}
                height={50}
                className="object-contain w-12 h-12"
              />
              <div className="flex-1">
                <div className="font-medium text-[#0c132c] line-clamp-1">
                  {product.title}
                </div>
                <div className="text-sm text-gray-500">
                  {qty} × ₦
                  {product.price.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className="font-bold">
                ₦
                {(product.price * qty).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-500">Total:</span>
          <span className="text-xl font-bold">
            ₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
            Confirm Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
