import React from "react";
import { cafeData } from "../data/cafe";

export default function About() {
  const { about } = cafeData;

  return (
    <section id="about" className="scroll-mt-20 py-8 md:py-12">
      {/* Section Header without fluff badges */}
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
          About us
        </h2>
      </div>

      {/* Story & History Section */}
      <div className="bg-[#FAF5EE] rounded-3xl border border-[#DFCCA] p-6 sm:p-10 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#1E100A] mb-3">
              {about.historyTitle}
            </h3>
            <p className="text-[#542F1E] text-sm sm:text-base leading-relaxed mb-4">
              {about.historyText}
            </p>
            <p className="text-[#7A4B29] text-xs sm:text-sm leading-relaxed">
              Every bean we grind and every loaf of sourdough we bake follows one simple philosophy: respect the craft, honor the farmer, and create space for people to gather.
            </p>
          </div>

          <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-md border border-[#DFCCA]">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
              alt="Craft coffee roasting and brewing"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* 3 Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {about.principles.map((principle, index) => (
          <div
            key={principle.title}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#DFCCA] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-[#C07A46]/10 text-[#C07A46] flex items-center justify-center font-serif font-bold text-base mb-4">
              0{index + 1}
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1E100A] mb-2">
              {principle.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#542F1E] leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
