import React, { useState, useEffect } from "react";
import { cafeData } from "../data/cafe";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("Main course");

  // Listen for custom event from Chef's picks or external triggers
  useEffect(() => {
    const handleSelectMenuItem = (e) => {
      const { menuItemId, category } = e.detail || {};
      if (category) {
        setActiveCategory(category);
      }
      setTimeout(() => {
        const el = document.getElementById(menuItemId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("ring-2", "ring-[#C07A46]", "bg-white", "shadow-xl", "p-3", "-m-3", "rounded-2xl", "transition-all");
          setTimeout(() => {
            el.classList.remove("ring-2", "ring-[#C07A46]", "bg-white", "shadow-xl", "p-3", "-m-3", "rounded-2xl");
          }, 2200);
        }
      }, 120);
    };

    window.addEventListener("select-menu-item", handleSelectMenuItem);
    return () => window.removeEventListener("select-menu-item", handleSelectMenuItem);
  }, []);

  // Filter items by selected category
  const filteredItems = cafeData.menuItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="scroll-mt-24 py-12 md:py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C07A46] bg-[#C07A46]/10 px-3.5 py-1 rounded-full inline-block mb-2">
          Seasonal Selection
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#1E100A]">
          The menu
        </h2>
        <p className="text-xs sm:text-sm text-[#542F1E] mt-2 max-w-md mx-auto">
          Simple ingredients, freshly prepared. Find something you'll love.
        </p>
      </div>

      {/* Category Tabs: Scroll horizontally on mobile, centered on desktop */}
      <div className="mb-10">
        <div className="flex overflow-x-auto gap-2.5 pb-2 scrollbar-none justify-start md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
          {cafeData.menuCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                  isActive
                    ? "bg-[#1E100A] text-[#FAF5EE] shadow-md border border-[#1E100A]"
                    : "bg-white text-[#542F1E] border border-[#DFCCA] hover:border-[#C07A46] hover:text-[#1E100A]"
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Title & Kitchen Hours Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#DFCCA] pb-3 mb-8">
        <h3 className="font-serif text-2xl font-bold text-[#1E100A]">
          {activeCategory}
        </h3>
        <span className="text-xs text-[#542F1E] mt-1 sm:mt-0 font-medium bg-[#C07A46]/10 px-3 py-1 rounded-full">
          {cafeData.hours.kitchenNotice}
        </span>
      </div>

      {/* Menu Items Grid: Two-column on desktop, single column on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="flex items-start gap-4 text-left group transition-all"
          >
            {/* Real photo thumbnail with rounded-2xl corners */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-[#FAF5EE] border border-[#DFCCA] shadow-xs">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h4 className="font-serif font-bold text-[#1E100A] text-base leading-snug group-hover:text-[#C07A46] transition-colors">
                  {item.name}
                </h4>
                <span className="text-xs sm:text-sm font-bold text-[#C07A46] whitespace-nowrap">
                  {item.price}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#542F1E] leading-relaxed">
                {item.description}
              </p>

              {item.dietaryTag && (
                <span className="text-[11px] font-semibold text-[#8E4F25] bg-[#C07A46]/10 border border-[#C07A46]/20 px-2.5 py-0.5 rounded-full inline-block mt-1.5">
                  {item.dietaryTag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Notes Below the List */}
      <div className="mt-14 pt-6 border-t border-[#DFCCA] text-center space-y-1.5 bg-[#FAF5EE] rounded-3xl p-6 border border-[#DFCCA]">
        <p className="text-xs text-[#1E100A] font-semibold">
          {cafeData.hours.kitchenNotice}
        </p>
        <p className="text-xs text-[#542F1E]">
          {cafeData.hours.allergyNotice}
        </p>
      </div>
    </section>
  );
}
