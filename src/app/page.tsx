'use client';

import { HeroSection } from '@/shared/components/hero-section';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
    
      {/* Hero Section */}
      {/* <main className="flex-1">
        <div className="relative bg-indigo-50">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              Welcome to MyStore
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover amazing products at unbeatable prices.
            </p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </main> */}

      <HeroSection/>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
