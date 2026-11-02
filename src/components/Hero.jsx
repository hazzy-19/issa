import React, { useState, useEffect } from "react";
import { cafeData } from "../data/cafe";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = cafeData.brand.heroSlides || [
    { url: cafeData.brand.heroImage, alt: "Café interior" },
  ];

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="scroll-mt-20 pt-4 pb-8 md:py-8">
      {/* Full Hero Container covering the entire section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#321B11] min-h-[580px] sm:min-h-[540px] md:min-h-[500px] lg:min-h-[540px] flex items-end md:items-center">
        {/* 5-Image Slideshow with smooth crossfade */}
        {slides.map((slide, index) => (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Ambient Dark Roast Vignette to emphasize coffee colors and glass sheen */}
        <div
          className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/40 to-black/15 pointer-events-none"
          aria-hidden="true"
        />

        {/* ============================================================ */}
        {/* TRUE LIQUID GLASS / FROSTED GLASS CARD                       */}
        {/* ============================================================ */}
        <div className="relative z-10 m-4 sm:m-6 md:my-10 md:ml-10 lg:ml-14 max-w-md lg:max-w-lg w-full rounded-3xl p-6 sm:p-8 lg:p-10 text-left backdrop-blur-2xl bg-gradient-to-br from-white/25 via-white/10 to-white/5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]">
          {/* Heading */}
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-3.5 drop-shadow-md">
            {cafeData.brand.tagline}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#FAF5EE]/90 mb-7 leading-relaxed drop-shadow-xs font-normal">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Pill Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="#menu"
              className="inline-block px-6 sm:px-7 py-3 bg-[#C07A46] hover:bg-[#D58E59] text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
            >
              Explore our menu
            </a>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 sm:px-7 py-3 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow border border-white/40 backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening hours line inside card under buttons */}
          <div className="pt-3.5 border-t border-white/20 flex items-center gap-2 text-[#FAF5EE]/85">
            <svg
              className="w-4 h-4 text-[#D58E59] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xs leading-normal font-medium drop-shadow-2xs">
              {cafeData.hours.display}
            </p>
          </div>
        </div>

        {/* Slideshow Indicator Dots */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white ${
                idx === currentSlide ? "w-6 bg-[#C07A46]" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
