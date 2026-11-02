import React from "react";
import { cafeData } from "../data/cafe";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-6 pb-12 md:py-12">
      {/* Outer Photographic Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#321B11] min-h-[580px] sm:min-h-[560px] md:min-h-[520px] lg:min-h-[550px] flex items-end md:items-center">
        {/* Full-bleed real hero photography */}
        <img
          src={cafeData.brand.heroImage}
          alt="Barista brewing artisan coffee"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
        />

        {/* Ambient Dark Roast Vignette to make photo colors pop and glass card glow */}
        <div
          className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent"
          aria-hidden="true"
        />

        {/* ============================================================ */}
        {/* TRUE LIQUID GLASS / FROSTED GLASS CARD                       */}
        {/* ============================================================ */}
        <div className="relative z-10 m-4 sm:m-6 md:my-10 md:ml-10 lg:ml-14 max-w-md lg:max-w-lg w-full rounded-3xl p-6 sm:p-8 lg:p-10 text-left backdrop-blur-2xl bg-gradient-to-br from-white/25 via-white/10 to-white/5 border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.2)]">
          {/* Badge */}
          <span className="inline-block text-[11px] uppercase tracking-widest font-bold text-white bg-[#C07A46]/90 border border-white/30 backdrop-blur-md px-3.5 py-1 rounded-full shadow-xs mb-3.5">
            Brewed to Perfection
          </span>

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
      </div>
    </section>
  );
}
