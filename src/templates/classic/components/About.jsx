import React from "react";
import { useCafe } from "../../../features/storefront/CafeContext";

export default function About() {
  const { cafe } = useCafe();
  const { about } = cafe;

  return (
    <section id="about" className="scroll-mt-20 py-6 md:py-8">
      {/* Section Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
          About us
        </h2>
      </div>

      {/* Story & History Section */}
      <div className="bg-[#FAF5EE] rounded-3xl border border-[#DFCCAA] p-5 sm:p-8 lg:p-10 shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E100A] mb-2 sm:mb-3">
              {about.historyTitle}
            </h3>
            <p className="text-[#542F1E] text-xs sm:text-sm md:text-base leading-relaxed mb-3">
              {about.historyText}
            </p>
            <p className="text-[#7A4B29] text-xs sm:text-sm leading-relaxed">
              Every bean we grind and every loaf of sourdough we bake follows one simple philosophy: respect the craft, honor the farmer, and create space for people to gather.
            </p>
          </div>

          <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#DFCCAA]">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
              alt="Craft coffee roasting and brewing"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* 3 Core Principles in 2-Column Mobile Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {about.principles.map((principle, index) => (
          <div
            key={principle.title}
            className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DFCCAA] shadow-xs hover:shadow-md transition-shadow ${
              index === 2 ? "col-span-2 md:col-span-1" : "col-span-1"
            }`}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#C07A46]/10 text-[#C07A46] flex items-center justify-center font-serif font-bold text-xs sm:text-base mb-2.5 sm:mb-3">
              0{index + 1}
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#1E100A] mb-1 sm:mb-1.5">
              {principle.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-[#542F1E] leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
