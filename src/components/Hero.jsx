import React from "react";
import { cafeData } from "../data/cafe";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-6 pb-12 md:py-12">
      {/* ============================================================ */}
      {/* DESKTOP HERO (768px and up): Card over full photographic canvas */}
      {/* ============================================================ */}
      <div className="hidden md:block relative rounded-3xl overflow-hidden shadow-xl border border-warmstone-200 min-h-[500px] lg:min-h-[540px]">
        {/* Full-bleed real hero photography with warm vignette */}
        <img
          src={cafeData.brand.heroImage}
          alt="The Corner Café warm interior"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-warmstone-900/70 via-warmstone-900/30 to-black/10 backdrop-brightness-95"
          aria-hidden="true"
        />

        {/* Floating warm artisan card on left */}
        <div className="relative z-10 my-10 ml-8 lg:my-12 lg:ml-12 max-w-md lg:max-w-lg bg-white/95 backdrop-blur-md border border-warmstone-200/80 rounded-2xl p-8 lg:p-10 shadow-2xl">
          <span className="inline-block text-xs uppercase tracking-widest font-semibold text-terracotta-600 mb-2">
            Welcome to Brookside
          </span>

          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-warmstone-900 leading-tight mb-4">
            {cafeData.brand.tagline}
          </h1>

          <p className="text-sm lg:text-base text-warmstone-700 mb-8 leading-relaxed">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="#menu"
              className="inline-block px-6 py-3 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600 text-center"
            >
              Explore our menu
            </a>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 border border-warmstone-300 bg-white hover:bg-warmstone-100 text-warmstone-800 text-xs sm:text-sm font-semibold rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600 text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening hours line */}
          <div className="pt-3 border-t border-warmstone-200 flex items-center gap-2 text-warmstone-600">
            <svg className="w-4 h-4 text-terracotta-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs leading-normal font-medium">
              {cafeData.hours.display}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE HERO (< 768px): Separate top photo, card below       */}
      {/* ============================================================ */}
      <div className="block md:hidden">
        {/* Top photographic image with rounded corners */}
        <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md">
          <img
            src={cafeData.brand.heroImage}
            alt="The Corner Café interior"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Text card positioned below image, visibly separate */}
        <div className="-mt-8 mx-2 relative z-10 bg-white rounded-2xl border border-warmstone-200 p-6 shadow-xl text-center">
          <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-terracotta-600 mb-1.5">
            Welcome to Brookside
          </span>

          <h1 className="font-serif text-2xl font-bold tracking-tight text-warmstone-900 leading-snug mb-3">
            {cafeData.brand.tagline}
          </h1>

          <p className="text-xs sm:text-sm text-warmstone-700 mb-5 leading-relaxed">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <a
              href="#menu"
              className="inline-block py-2.5 px-2 bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600 text-center"
            >
              Explore our menu
            </a>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-2.5 px-2 border border-warmstone-300 bg-white hover:bg-warmstone-100 text-warmstone-800 text-xs font-semibold rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600 text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening hours line */}
          <div className="pt-2.5 border-t border-warmstone-200">
            <p className="text-[11px] text-warmstone-600 leading-tight">
              {cafeData.hours.display}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
