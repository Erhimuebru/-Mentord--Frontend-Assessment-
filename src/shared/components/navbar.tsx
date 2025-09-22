"use client"

import { RootState } from "@/store"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"

const NavBar = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header>
      <div className="fixed sm:top-3 top-2 left-0 right-0 z-40 flex justify-center transition-all duration-300">
        <nav className="sm:p-6 p-1 bg-white shadow-md transition-all duration-300 w-[95%] mt-3 rounded-xl">
          <div className="sm:h-[30px] h-[40px] flex justify-between items-center">
            {/* Logo / Catalog */}
            <Link href="/" className="font-bold text-lg text-[#000] pl-2">
            Blessedstore
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-3 text-sm gap-10 text-gray-600">
              <Link href="/" className="hover:underline font-semibold">
                Home
              </Link>
              <Link href="/products" className="hover:underline font-semibold">
                Products
              </Link>
              <Link href="/cart" className="hover:underline font-semibold">
                Cart
              </Link>
            </nav>

            {/* Right side (Cart + Hamburger) */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-7 h-7 text-gray-700 hover:text-indigo-600" />
                {totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold rounded-full text-[12px] w-5 h-5 flex items-center justify-center">
                    {totalQty}
                  </span>
                )}
              </Link>

              {/* Hamburger Menu (Mobile Only) */}
              <button
                className="md:hidden p-2 rounded focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              mobileMenuOpen ? "max-h-40 mt-3" : "max-h-0"
            }`}
          >
            <div className="flex flex-col space-y-2 text-gray-700 bg-white rounded-lg p-4 shadow-md">
              <Link
                href="/"
                className="hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="hover:text-indigo-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
