import React from "react";
import { Link } from "react-router-dom";
import { useCafe } from "../../../features/storefront/CafeContext";

function formatPrice(priceStr) {
  if (!priceStr) return "";
  return priceStr.replace(/\.00$/, "");
}

export default function ChefsPicks() {
  const { cafe } = useCafe();
  return (
    <section id="chefs-picks" className="scroll-mt-20 py-6 md:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
            Chef's picks
          </h2>
        </div>
        <Link
          to="/menu"
          className="text-xs sm:text-sm font-semibold text-[#C07A46] hover:text-[#A96434] transition-colors flex items-center gap-1 group"
        >
          <span>Full menu</span>
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
      {/* 2-COLUMN ON MOBILE, 4-COLUMN ON DESKTOP                       */}
      {/* ============================================================ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {cafe.chefsPicks.map((item) => (
          <Link
            key={item.id}
            to="/menu"
            className="group block text-left bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#DFCCAA] shadow-sm hover:shadow-xl hover:border-[#C07A46]/60 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            aria-label={`View ${item.name} in menu for ${formatPrice(item.price)}`}
          >
            {/* Real photo container with smooth zoom */}
            <div className="relative w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 bg-[#FAF5EE]">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 text-[10px] sm:text-xs font-bold text-white bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Name */}
            <h3 className="font-serif font-bold text-[#1E100A] text-xs sm:text-base group-hover:text-[#C07A46] transition-colors truncate mb-1">
              {item.name}
            </h3>

            {/* Description */}
            <p className="text-[11px] sm:text-xs text-[#542F1E] leading-relaxed line-clamp-2">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
