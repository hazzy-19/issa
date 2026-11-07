import React from "react";
import { Outlet } from "react-router-dom";
import OnboardingHeader from "./components/OnboardingHeader";
import OnboardingFooter from "./components/OnboardingFooter";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#1E100A] font-sans selection:bg-[#C07A46]/20 selection:text-[#1E100A] overflow-x-hidden">
      {/* Accessible skip link as first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E100A] focus:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#C07A46] rounded-full text-xs font-semibold shadow-md"
      >
        Skip to main content
      </a>

      {/* Onboarding Header */}
      <OnboardingHeader />

      {/* Onboarding Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full focus:outline-none">
        <Outlet />
      </main>

      {/* Onboarding Footer */}
      <OnboardingFooter />
    </div>
  );
}
