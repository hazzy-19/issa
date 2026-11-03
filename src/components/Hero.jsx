import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCafe } from "../context/CafeContext";

export default function Hero() {
  const { cafeData } = useCafe();
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
    <section id="home" className="scroll-mt-20 pt-2 pb-6 md:py-6">
      {/* Hero Container covering the entire section */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#321B11] h-[520px] sm:h-[500px] md:h-[540px] flex items-end md:items-center">
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

        {/* Delicate Vignette: keeps coffee photography luminous and clear while ensuring text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/35 md:to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* ============================================================ */}
        {/* LIQUID FROSTED GLASS CARD: Compact & elegant on all screens  */}
        {/* ============================================================ */}
        <div className="relative z-10 m-3 sm:m-5 md:my-8 md:ml-8 lg:ml-12 max-w-md lg:max-w-lg w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-left backdrop-blur-xl bg-black/45 md:bg-white/15 border border-white/25 md:border-white/35 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.35)]">
          {/* Main Tagline */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug mb-2 sm:mb-3 drop-shadow-md">
            {cafeData.brand.tagline}
          </h1>

          {/* Subtitle / Blurb */}
          <p className="text-xs sm:text-sm text-[#FAF5EE]/90 mb-4 sm:mb-6 leading-relaxed drop-shadow-xs line-clamp-2 sm:line-clamp-none">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Action Pills */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 bg-[#C07A46] hover:bg-[#D58E59] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
            >
              Explore our menu
            </Link>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold rounded-full shadow-xs hover:shadow border border-white/35 backdrop-blur-md transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening Hours Info */}
          <div className="pt-2.5 border-t border-white/20 flex items-center gap-2 text-[#FAF5EE]/85">
            <svg
              className="w-3.5 h-3.5 text-[#D58E59] flex-shrink-0"
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
            <p className="text-[11px] sm:text-xs leading-normal font-medium drop-shadow-2xs">
              {cafeData.hours.display}
            </p>
          </div>
        </div>

        {/* Slideshow Indicator Dots: Floating in bottom-right corner of the section */}
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-white/20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-white ${
                idx === currentSlide ? "w-5 sm:w-6 bg-[#C07A46]" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
