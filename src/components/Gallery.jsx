import React, { useState, useRef } from "react";
import { cafeData } from "../data/cafe";

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const width = carouselRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      if (newIndex >= 0 && newIndex < cafeData.gallery.length) {
        setCurrentSlide(newIndex);
      }
    }
  };

  const goToSlide = (index) => {
    const targetIndex = Math.max(0, Math.min(index, cafeData.gallery.length - 1));
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: targetIndex * width,
        behavior: "smooth",
      });
      setCurrentSlide(targetIndex);
    }
  };

  return (
    <section id="gallery" className="scroll-mt-24 py-12 md:py-16">
      {/* Dark Roast Container for dramatic coffeehouse contrast */}
      <div className="bg-[#1E100A] text-[#FAF5EE] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#321B11] shadow-2xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C07A46] bg-[#C07A46]/10 px-3.5 py-1 rounded-full inline-block mb-2">
            Our Atmosphere
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#FAF5EE]">
            The space gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#D1B89F] mt-2 max-w-md mx-auto">
            Take a look around. There's a seat here for your morning coffee or afternoon catch-up.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP (768px and up): 3-column grid                         */}
        {/* ============================================================ */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {cafeData.gallery.map((item) => (
            <div key={item.id} className="text-center group">
              {/* Photo Box with rounded-3xl corners */}
              <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-[#26140D] shadow-lg border border-[#321B11] mb-3.5">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-serif text-base font-semibold text-[#FAF5EE]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* MOBILE (< 768px): Swipe carousel with 1 / 3 counter & arrows */}
        {/* ============================================================ */}
        <div className="block md:hidden">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none w-full"
          >
            {cafeData.gallery.map((item) => (
              <div
                key={item.id}
                className="flex-none w-full snap-center px-1 text-center"
              >
                {/* Photo Box */}
                <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-[#26140D] shadow-md border border-[#321B11] mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="font-serif text-base font-semibold text-[#FAF5EE] mb-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Controls: Prev, 1 / 3, Next */}
          <div className="flex items-center justify-center gap-3 mt-3">
            <button
              type="button"
              onClick={() => goToSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
              className={`p-2.5 border border-[#3D2217] bg-[#26140D] rounded-full text-[#FAF5EE] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                currentSlide === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#321B11]"
              }`}
              aria-label="Previous gallery image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xs font-bold text-[#FAF5EE] min-w-[70px] text-center border border-[#3D2217] px-4 py-1.5 bg-[#26140D] rounded-full shadow-xs">
              {currentSlide + 1} / {cafeData.gallery.length}
            </span>

            <button
              type="button"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === cafeData.gallery.length - 1}
              className={`p-2.5 border border-[#3D2217] bg-[#26140D] rounded-full text-[#FAF5EE] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                currentSlide === cafeData.gallery.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#321B11]"
              }`}
              aria-label="Next gallery image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
