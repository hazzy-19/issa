import React, { useState } from "react";
import { cafeData } from "../data/cafe";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = cafeData.galleryCategories || [
    "All",
    "Customers & Moments",
    "Food & Treats",
    "The Space & Brews",
  ];

  const filteredItems =
    activeCategory === "All"
      ? cafeData.gallery
      : cafeData.gallery.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="scroll-mt-20 py-8 md:py-12">
      {/* Dark Roast Container for dramatic coffeehouse contrast */}
      <div className="bg-[#1E100A] text-[#FAF5EE] rounded-3xl p-6 sm:p-10 border border-[#321B11] shadow-2xl">
        {/* Section Header without fluff badges */}
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#FAF5EE]">
            The space gallery
          </h2>
        </div>

        {/* Category Filter Pills: Customers, Foods, Space */}
        <div className="flex overflow-x-auto gap-2.5 pb-2 mb-8 scrollbar-none justify-start sm:justify-center -mx-2 px-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                  isActive
                    ? "bg-[#C07A46] text-white shadow-md"
                    : "bg-[#26140D] text-[#D1B89F] border border-[#3D2217] hover:border-[#C07A46] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid of Distinct Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="text-center group">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-[#26140D] shadow-lg border border-[#321B11] mb-2.5">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-semibold text-white drop-shadow-xs">
                    {item.title}
                  </span>
                </div>
              </div>
              <p className="font-serif text-sm font-medium text-[#D1B89F] group-hover:text-white transition-colors">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
