'use client';

import { HeroSection } from '@/shared/components/hero-section';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
    
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
