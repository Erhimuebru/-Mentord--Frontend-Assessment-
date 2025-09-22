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
      <div className="fixed sm:top-3 top-2 left-0 right-0 z-40 flex justify-center transition-all duration-300 mb-20">
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





// 'use client'
// import { RootState } from '@/store'
// import Link from 'next/link'
// import { useSelector } from 'react-redux'

// export default function NavBar() {

//   const items = useSelector((state: RootState) => state.cart.items)
//   const totalQty = items.reduce((s, i) => s + i.qty, 0)

//   return (
//     <header className=" border-b">
//       <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        // <div className="flex items-center space-x-4">
        //   <Link href="/" className="font-bold text-lg">
        //     Catalog
        //   </Link>
        //   <nav className="hidden md:flex space-x-3 text-sm text-gray-600">
        //     <Link href="/" className="hover:underline">Home</Link>
        //     <Link href="/products" className="hover:underline">Products</Link>
        //     <Link href="/cart" className="hover:underline">Cart</Link>
        //   </nav>
        // </div>

        // <div className="flex items-center gap-4">
        //   <Link href="/products" className="px-3 py-2 bg-indigo-600 text-white rounded-md">Shop</Link>
        //   <Link href="/cart" className="relative">
        //     <span className="inline-block px-3 py-2 border rounded-md">Cart</span>
        //     {totalQty > 0 && (
        //       <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
        //         {totalQty}
        //       </span>
        //     )}
        //   </Link>
        // </div>
//       </div>
//     </header>
//   )
// }
