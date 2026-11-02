import React from "react";
import { cafeData } from "../data/cafe";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-6 pb-12 md:py-12">
      {/* ============================================================ */}
      {/* DESKTOP HERO (768px and up): Glassy card over photographic canvas */}
      {/* ============================================================ */}
      <div className="hidden md:block relative rounded-3xl overflow-hidden shadow-2xl border border-[#DFCCA] min-h-[500px] lg:min-h-[540px]">
        {/* Full-bleed real hero photography with rich coffeehouse vignette */}
        <img
          src={cafeData.brand.heroImage}
          alt="Barista brewing artisan coffee"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1E100A]/80 via-[#1E100A]/35 to-transparent backdrop-brightness-95"
          aria-hidden="true"
        />

        {/* Floating Glassmorphic card on left */}
        <div className="relative z-10 my-10 ml-8 lg:my-12 lg:ml-12 max-w-md lg:max-w-lg bg-white/70 backdrop-blur-2xl border border-white/80 rounded-3xl p-8 lg:p-10 shadow-[0_16px_40px_rgba(30,16,10,0.28)] ring-1 ring-white/40">
          <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#C07A46] bg-[#C07A46]/10 backdrop-blur-md border border-[#C07A46]/20 px-3.5 py-1 rounded-full mb-3">
            Brewed to Perfection
          </span>

          <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-[#1E100A] leading-tight mb-4 drop-shadow-2xs">
            {cafeData.brand.tagline}
          </h1>

          <p className="text-sm lg:text-base text-[#422417] mb-8 leading-relaxed font-medium">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Pill Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <a
              href="#menu"
              className="inline-block px-7 py-3 bg-[#C07A46]/95 hover:bg-[#A96434] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-xl backdrop-blur-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] text-center"
            >
              Explore our menu
            </a>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-7 py-3 bg-[#1E100A]/90 hover:bg-[#1E100A] text-[#FAF5EE] text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow-md border border-white/30 backdrop-blur-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening hours line */}
          <div className="pt-3.5 border-t border-[#DFCCA]/60 flex items-center gap-2 text-[#422417]">
            <svg className="w-4 h-4 text-[#C07A46] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs leading-normal font-medium">
              {cafeData.hours.display}
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE HERO (< 768px): Photo with overlapping Glassy card    */}
      {/* ============================================================ */}
      <div className="block md:hidden">
        {/* Top photo with rounded-3xl corners */}
        <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden shadow-lg border border-[#DFCCA]">
          <img
            src={cafeData.brand.heroImage}
            alt="Barista brewing artisan coffee"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Glassmorphic card positioned below/overlapping image */}
        <div className="-mt-12 mx-3 relative z-10 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-6 shadow-2xl ring-1 ring-white/50 text-center">
          <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#C07A46] bg-[#C07A46]/10 px-3 py-1 rounded-full mb-2.5">
            Brewed to Perfection
          </span>

          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#1E100A] leading-snug mb-3">
            {cafeData.brand.tagline}
          </h1>

          <p className="text-xs sm:text-sm text-[#422417] mb-5 leading-relaxed font-medium">
            {cafeData.brand.heroBlurb}
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <a
              href="#menu"
              className="inline-block py-3 px-3 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs font-semibold rounded-full shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] text-center"
            >
              Explore our menu
            </a>

            <a
              href={cafeData.contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 px-3 bg-[#1E100A]/90 hover:bg-[#1E100A] text-[#FAF5EE] text-xs font-semibold rounded-full border border-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] text-center"
            >
              Get directions
            </a>
          </div>

          {/* Opening hours line */}
          <div className="pt-3 border-t border-[#DFCCA]/60">
            <p className="text-[11px] text-[#422417] leading-tight font-medium">
              {cafeData.hours.display}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
