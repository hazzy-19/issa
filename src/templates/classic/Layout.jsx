import React from "react";
import { Outlet } from "react-router-dom";
import StorefrontHeader from "./components/StorefrontHeader";
import StorefrontFooter from "./components/StorefrontFooter";

export default function CafeLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#1E100A] font-sans selection:bg-[#C07A46]/20 selection:text-[#1E100A] overflow-x-hidden">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E100A] focus:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#C07A46] rounded-full text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Café Header */}
      <StorefrontHeader />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        <Outlet />
      </main>

      {/* Café Footer */}
      <StorefrontFooter />
    </div>
  );
}
