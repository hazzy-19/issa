import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCafe } from "../context/CafeContext";

function formatPrice(priceStr) {
  if (!priceStr) return "";
  return priceStr.replace(/\.00$/, "");
}

export default function MenuPage() {
  const { cafeData } = useCafe();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...cafeData.menuCategories];

  const filteredItems = useMemo(() => {
    return cafeData.menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-6 sm:py-10">
      {/* Top Navigation Bar with Back Link */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E100A] hover:text-[#C07A46] bg-white px-4 py-2 rounded-full border border-[#DFCCA] shadow-xs hover:shadow transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>

        <span className="text-xs font-semibold text-[#7A4B29] bg-[#C07A46]/10 px-3 py-1 rounded-full">
          {filteredItems.length} Dishes
        </span>
      </div>

      {/* Page Title & Notes */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E100A] mb-2">
          Full Café Menu
        </h1>
        <p className="text-xs sm:text-sm text-[#542F1E] max-w-lg mx-auto mb-3">
          Fresh seasonal ingredients, slow-fermented breads, and comforting hearth-fired plates.
        </p>
        <p className="text-[11px] sm:text-xs text-[#7A4B29]">
          {cafeData.hours.kitchenNotice} &bull; {cafeData.hours.allergyNotice}
        </p>
      </div>

      {/* Search Input & Category Filter Tabs */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search dishes, flatbreads, coffee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#DFCCA] rounded-full py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#1E100A] placeholder-[#8C705F] focus:outline-none focus:border-[#C07A46] focus:ring-1 focus:ring-[#C07A46] shadow-2xs"
          />
          <svg
            className="w-4 h-4 text-[#8C705F] absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8C705F] hover:text-[#1E100A]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start sm:justify-center -mx-2 px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                  isActive
                    ? "bg-[#1E100A] text-white shadow-xs"
                    : "bg-white text-[#542F1E] border border-[#DFCCA] hover:border-[#C07A46] hover:text-[#1E100A]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2-COLUMN ON MOBILE, 2/3-COLUMN ON DESKTOP                     */}
      {/* ============================================================ */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#DFCCA] p-8 max-w-md mx-auto">
          <p className="font-serif text-lg font-bold text-[#1E100A] mb-1">
            No dishes found
          </p>
          <p className="text-xs text-[#542F1E] mb-4">
            Try adjusting your search terms or category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-5 py-2 bg-[#C07A46] text-white text-xs font-semibold rounded-full hover:bg-[#A96434] transition-colors"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#DFCCA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#C07A46]/60 transition-all flex flex-col justify-between p-3 sm:p-4 group"
            >
              <div>
                {/* Photo */}
                <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-3 bg-[#FAF5EE]">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 text-[10px] sm:text-xs font-bold text-white bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
                    {formatPrice(item.price)}
                  </span>
                  {item.dietaryTag && (
                    <span className="absolute bottom-2 left-2 text-[9px] sm:text-[10px] font-semibold text-[#1E100A] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-2xs">
                      {item.dietaryTag}
                    </span>
                  )}
                </div>

                {/* Name */}
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
      )}
    </div>
  );
}
