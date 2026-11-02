import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ChefsPicks from "./components/ChefsPicks";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import FindUs from "./components/FindUs";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#1E100A] font-sans selection:bg-[#C07A46]/20 selection:text-[#1E100A] overflow-x-hidden">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E100A] focus:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#C07A46] rounded-full text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        {/* Phase 2: Hero */}
        <Hero />

        {/* Phase 3: Chef's picks */}
        <ChefsPicks />

        {/* Phase 4: Menu */}
        <Menu />

        {/* Phase 5: Gallery & Find us */}
        <Gallery />
        <FindUs />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
