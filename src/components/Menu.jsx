import React from "react";
import { Link } from "react-router-dom";
import { cafeData } from "../data/cafe";

function formatPrice(priceStr) {
  if (!priceStr) return "";
  return priceStr.replace(/\.00$/, "");
}

export default function Menu() {
  const items = cafeData.menuHighlights || cafeData.menuItems.slice(0, 6);

  return (
    <section id="menu" className="scroll-mt-20 py-6 md:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
            Menu favorites
          </h2>
        </div>
        <Link
          to="/menu"
          className="text-xs sm:text-sm font-semibold text-[#C07A46] hover:text-[#A96434] transition-colors flex items-center gap-1 group"
        >
          <span>See all</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* ============================================================ */}
      {/* 2-COLUMN ON MOBILE, 3-COLUMN ON DESKTOP                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl sm:rounded-3xl border border-[#DFCCA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C07A46]/60 transition-all flex flex-col justify-between p-3 sm:p-4 group"
          >
            <div>
              {/* Photo Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3 bg-[#FAF5EE]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 text-[10px] sm:text-xs font-bold text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                  {formatPrice(item.price)}
                </span>
                {item.dietaryTag && (
                  <span className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] font-semibold text-[#1E100A] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs">
                    {item.dietaryTag}
                  </span>
                )}
              </div>

              {/* Title & Category */}
              <h3 className="font-serif font-bold text-xs sm:text-base text-[#1E100A] group-hover:text-[#C07A46] transition-colors truncate mb-1">
                {item.name}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-[#542F1E] leading-relaxed line-clamp-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Call-to-action to go to Full Menu Page */}
      <div className="text-center">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 bg-[#1E100A] hover:bg-[#C07A46] text-[#FAF5EE] text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
        >
          <span>Explore Full Menu ({cafeData.menuItems.length}+ Items)</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
