"use client"

import { RootState } from "@/store"
import Link from "next/link"
import { useSelector } from "react-redux"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

const NavBar = () => {
  const items = useSelector((state: RootState) => state.cart.items)
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header>
      <div className="fixed sm:top-3 top-2 left-0 right-0 z-40 flex justify-center transition-colors duration-300">
        <nav
          className={`sm:p-6 p-1 w-[95%] mt-3 rounded-xl shadow-md transition-colors duration-300 
            ${scrolled ? "bg-blue-950 text-white" : "bg-white text-[#000]"}`}
        >
          <div className="sm:h-[30px] h-[40px] flex justify-between items-center">
            {/* Logo */}
            <Link
              href="/"
              className={`font-bold text-lg pl-2 ${
                scrolled ? "text-white" : "text-[#000]"
              }`}
            >
              Blessedstore
            </Link>

            {/* Desktop Nav */}
            <nav
              className={`hidden md:flex space-x-3 text-sm gap-10 ${
                scrolled ? "text-white" : "text-gray-600"
              }`}
            >
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

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart
                  className={`w-7 h-7 transition-colors ${
                    scrolled
                      ? "text-white hover:text-gray-200"
                      : "text-gray-700 hover:text-indigo-600"
                  }`}
                />
                {totalQty > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold rounded-full text-[12px] w-5 h-5 flex items-center justify-center">
                    {totalQty}
                  </span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                className="md:hidden p-2 rounded focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X
                    className={`w-6 h-6 ${
                      scrolled ? "text-white" : "text-gray-700"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`w-6 h-6 ${
                      scrolled ? "text-white" : "text-gray-700"
                    }`}
                  />
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
            <div
              className={`flex flex-col space-y-2 rounded-lg p-4 shadow-md transition-colors ${
                scrolled ? "bg-blue-900 text-white" : "bg-white text-gray-700"
              }`}
            >
              <Link
                href="/"
                className="hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/cart"
                className="hover:underline"
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
