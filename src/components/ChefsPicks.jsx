import React from "react";
import { cafeData } from "../data/cafe";

function formatPrice(priceStr) {
  if (!priceStr) return "";
  return priceStr.replace(/\.00$/, "");
}

export default function ChefsPicks() {
  const handleItemClick = (e, menuItemId) => {
    e.preventDefault();
    const menuItem = cafeData.menuItems.find((m) => m.id === menuItemId);
    window.dispatchEvent(
      new CustomEvent("select-menu-item", {
        detail: {
          menuItemId,
          category: menuItem?.category || "Main course",
        },
      })
    );
  };

  return (
    <section id="chefs-picks" className="scroll-mt-24 py-12 md:py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-terracotta-600 block mb-1">
          Handcrafted Daily
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-warmstone-900">
          Chef's picks
        </h2>
        <p className="text-xs sm:text-sm text-warmstone-600 mt-2 max-w-md mx-auto">
          A few favourites from our kitchen, made fresh every day.
        </p>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP (768px and up): 4-column grid                         */}
      {/* ============================================================ */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {cafeData.chefsPicks.map((item) => (
          <a
            key={item.id}
            href={`#${item.menuItemId}`}
            onClick={(e) => handleItemClick(e, item.menuItemId)}
            className="group block text-left bg-white p-3.5 rounded-2xl border border-warmstone-200/80 shadow-sm hover:shadow-md hover:border-terracotta-500/40 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
            aria-label={`View ${item.name} in menu for ${formatPrice(item.price)}`}
          >
            {/* Real photo container with smooth zoom */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-warmstone-100">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Name and Price */}
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <h3 className="font-serif font-bold text-warmstone-900 text-base group-hover:text-terracotta-600 transition-colors">
                {item.name}
              </h3>
              <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-warmstone-600 leading-relaxed">
              {item.description}
            </p>
          </a>
        ))}
      </div>

      {/* ============================================================ */}
      {/* MOBILE (< 768px): Horizontal swipe carousel with snap scroll */}
      {/* ============================================================ */}
      <div className="block md:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-1 scrollbar-none -mx-4 px-4">
          {cafeData.chefsPicks.map((item) => (
            <a
              key={item.id}
              href={`#${item.menuItemId}`}
              onClick={(e) => handleItemClick(e, item.menuItemId)}
              className="flex-none w-[75vw] sm:w-[50vw] snap-start group block text-left bg-white p-3.5 rounded-2xl border border-warmstone-200/80 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
              aria-label={`View ${item.name} in menu for ${formatPrice(item.price)}`}
            >
              {/* Photo */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-3 bg-warmstone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name and Price */}
              <div className="flex items-baseline justify-between gap-2 mb-1.5">
                <h3 className="font-serif font-bold text-warmstone-900 text-sm">
                  {item.name}
                </h3>
                <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {formatPrice(item.price)}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-warmstone-600 leading-relaxed">
                {item.description}
              </p>
            </a>
          ))}
        </div>

        {/* Swipe for more hint */}
        <div className="flex justify-center mt-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-warmstone-300 text-[11px] font-medium text-warmstone-700 bg-white shadow-xs">
            <svg
              className="w-3.5 h-3.5 text-terracotta-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            Swipe for more
          </span>
        </div>
      </div>
    </section>
  );
}
