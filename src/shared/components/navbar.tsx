"use client"

import { RootState } from '@/store'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import {  ShoppingCart } from "lucide-react"


const NavBar = ({

}) => {

  const items = useSelector((state: RootState) => state.cart.items)
  const totalQty = items.reduce((s, i) => s + i.qty, 0)
  return (
    <header>
      <div className="fixed sm:top-3 top-2 left-0 right-0 z-40 flex justify-center transition-all duration-300 ">
        <nav
          className="sm:p-6 p-1  bg-white shadow-md  transition-all duration-300 w-[95%] mt-3 rounded-xl"
        >
          <div className="sm:h-[30px] h-[40px] flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2">
              <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-lg">
            Catalog
          </Link>
          <nav className="hidden md:flex space-x-3 text-sm text-gray-600">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/cart" className="hover:underline">Cart</Link>
          </nav>
        </div>
              </div>
            </Link>

            <div className="flex gap-2 items-center">
            <div className="flex items-center gap-4">
    
            <Link href="/cart" className="relative">
            {/* cart icon */}
            <ShoppingCart className="w-7 h-7 text-gray-700 hover:text-indigo-600" />

            {totalQty > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}



export default NavBar