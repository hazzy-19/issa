import React, { useState, useEffect } from "react";
import { cafeData } from "../data/cafe";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close on Escape key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-warmstone-200 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between h-20">
          <a
            href="#home"
            className="font-serif text-2xl font-bold tracking-tight text-warmstone-900 hover:text-terracotta-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
          >
            {cafeData.brand.name}
          </a>

          <nav
            aria-label="Desktop Navigation"
            className="flex items-center space-x-8 text-sm font-medium text-warmstone-700"
          >
            {cafeData.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-terracotta-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Header (< 768px) */}
        <div className="flex md:hidden items-center justify-between h-16">
          {/* Hamburger toggle button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="p-2 border border-warmstone-300 text-warmstone-800 bg-white hover:bg-warmstone-100 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600 transition-colors"
          >
            <span className="sr-only">Menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo center */}
          <a
            href="#home"
            className="font-serif text-lg font-bold text-warmstone-900 tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
          >
            {cafeData.brand.name}
          </a>

          {/* Call us button */}
          <a
            href={`tel:${cafeData.contact.phoneRaw}`}
            className="px-3.5 py-1.5 border border-warmstone-900 bg-warmstone-900 text-white text-xs font-semibold rounded-full hover:bg-terracotta-600 hover:border-terracotta-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
          >
            Call us
          </a>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-warmstone-200 bg-[#FAF8F5] px-5 pt-3 pb-6 shadow-md"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {cafeData.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="py-2.5 text-base font-medium text-warmstone-800 border-b border-warmstone-200/60 hover:text-terracotta-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href={`tel:${cafeData.contact.phoneRaw}`}
                className="block w-full text-center py-2.5 bg-warmstone-900 text-white rounded-lg text-sm font-semibold hover:bg-terracotta-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-terracotta-600"
              >
                Call us: {cafeData.contact.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
