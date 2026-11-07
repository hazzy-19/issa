import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sampleCafe } from "../data/cafe";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = sampleCafe.galleryCategories || [
    "All",
    "Customers & Moments",
    "Food & Treats",
    "The Space & Brews",
  ];

  const filteredItems =
    activeCategory === "All"
      ? sampleCafe.gallery
      : sampleCafe.gallery.filter((item) => item.category === activeCategory);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <div className="py-6 sm:py-10">
      {/* Top Navigation Bar with Back Link */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E100A] hover:text-[#C07A46] bg-white px-4 py-2 rounded-full border border-[#DFCCAA] shadow-xs hover:shadow transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </Link>

        <span className="text-xs font-semibold text-[#7A4B29] bg-[#C07A46]/10 px-3 py-1 rounded-full">
          {filteredItems.length} Photos
        </span>
      </div>

      {/* Page Title & Intro */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1E100A] mb-2">
          Gallery & Moments
        </h1>
        <p className="text-xs sm:text-sm text-[#542F1E] max-w-lg mx-auto">
          Candid snapshots of our customers, freshly baked treats, and sunlit mornings in our coffeehouse.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto gap-2 pb-3 mb-8 scrollbar-none justify-start sm:justify-center -mx-2 px-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                isActive
                  ? "bg-[#1E100A] text-white shadow-md"
                  : "bg-white text-[#542F1E] border border-[#DFCCAA] hover:border-[#C07A46] hover:text-[#1E100A]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* PINTEREST WATERFALL MASONRY (2 COLUMNS ON MOBILE)            */}
      {/* ============================================================ */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="break-inside-avoid block mb-3 md:mb-4 group rounded-2xl overflow-hidden bg-white border border-[#DFCCAA] shadow-xs hover:shadow-xl transition-all cursor-pointer"
          >
            <div className={`relative w-full ${item.aspect || "aspect-[3/4]"} overflow-hidden bg-[#FAF5EE]`}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 sm:p-4 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C07A46] mb-0.5">
                  {item.category}
                </span>
                <span className="text-xs sm:text-sm font-semibold drop-shadow-xs line-clamp-2">
                  {item.title}
                </span>
              </div>
            </div>
            <div className="p-2.5 sm:p-3 text-left">
              <span className="block text-[10px] font-bold text-[#A96434] uppercase tracking-wider mb-0.5">
                {item.category}
              </span>
              <p className="font-serif text-xs sm:text-sm font-semibold text-[#1E100A] line-clamp-1">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close photo preview"
              className="absolute -top-12 right-0 sm:-right-4 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />

            <div className="mt-4 text-center text-white">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#C07A46] mb-1">
                {selectedImage.category}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
