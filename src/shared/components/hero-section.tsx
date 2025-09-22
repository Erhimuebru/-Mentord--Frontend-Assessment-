"use client"

import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  const slides = [
    {
      title: "Exceptional quality meets modern design",
      description:
        "Transform your space with our carefully curated collection of premium products designed for the modern lifestyle.",
      buttonText: "Explore Products",
    },
    {
      title: "Crafted for perfection in every detail",
      description:
        "Discover handpicked items that blend functionality with aesthetic appeal, creating spaces that inspire and delight.",
      buttonText: "Shop Collection",
    },
    {
      title: "Innovation meets timeless elegance",
      description:
        "Experience the perfect harmony of cutting-edge design and classic sophistication in every piece we offer.",
      buttonText: "View Catalog",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrent(index)
  }

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] pt-20 sm:pt-0 flex items-center justify-center px-4 sm:px-6 md:px-12 bg-[#0c132c] text-[#fff]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden">
          {/* Slides wrapper */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2 sm:px-6 mt-0 sm:mt-32">
                <div className="text-center">
                  {/* Title */}
                  <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-balance mb-6 sm:mb-8">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-2">
                    {slide.description}
                  </p>

                  {/* Button */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base bg-[#fff] text-[#0c132c] rounded-md hover:bg-foreground/90 transition-colors"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prev button */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-transparent backdrop-blur-sm border hover:bg-background transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 sm:p-2 rounded-full bg-transparent backdrop-blur-sm border hover:bg-background transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-foreground w-6 sm:w-8" : "bg-[#fff] hover:bg-muted-foreground/50 w-2"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
