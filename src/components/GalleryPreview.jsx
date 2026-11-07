import React from "react";
import { Link } from "react-router-dom";
import { sampleCafe } from "../data/cafe";

export default function GalleryPreview() {
  // Show a curated selection of 6 varied photos for the Pinterest preview on home page
  const previewItems = sampleCafe.gallery.slice(0, 6);

  return (
    <section id="gallery" className="scroll-mt-20 py-6 md:py-8">
      {/* Dark Roast Container for rich coffeehouse contrast */}
      <div className="bg-[#1E100A] text-[#FAF5EE] rounded-3xl p-5 sm:p-8 md:p-10 border border-[#321B11] shadow-2xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#FAF5EE]">
              The space & moments
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-xs sm:text-sm font-semibold text-[#C07A46] hover:text-[#D58E59] transition-colors flex items-center gap-1 group"
          >
            <span>Full gallery</span>
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
        {/* PINTEREST WATERFALL MASONRY PREVIEW (2 COLUMNS ON MOBILE)   */}
        {/* ============================================================ */}
        <div className="columns-2 md:columns-3 gap-3 md:gap-4 mb-6">
          {previewItems.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              className="break-inside-avoid block mb-3 md:mb-4 group rounded-2xl overflow-hidden bg-[#26140D] border border-[#321B11] shadow-md hover:shadow-2xl transition-all"
            >
              <div className={`relative w-full ${item.aspect || "aspect-[3/4]"} overflow-hidden`}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] sm:text-xs font-semibold text-white drop-shadow-xs line-clamp-1">
                    {item.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <div className="text-center pt-2">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3 bg-[#C07A46] hover:bg-[#D58E59] text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <span>Explore Full Gallery ({sampleCafe.gallery.length} Photos)</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
