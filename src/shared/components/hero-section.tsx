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

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-12 relative">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="text-center">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-balance mb-8">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/products"
                      className="inline-flex items-center space-x-2 px-8 py-3 text-base bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* <button className="px-8 py-3 text-base bg-transparent border border-border rounded-md hover:bg-muted transition-colors">
                      Learn More
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-background transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm border hover:bg-background transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-foreground w-8" : "bg-[#fff] hover:bg-muted-foreground/50 w-2"
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
