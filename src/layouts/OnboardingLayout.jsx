import React from "react";
import { Outlet } from "react-router-dom";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#1E100A] font-sans selection:bg-[#C07A46]/20 selection:text-[#1E100A] overflow-x-hidden">
      <header className="p-4 border-b border-[#DFCCA] text-center text-sm font-medium">
        Onboarding header
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
        <Outlet />
      </main>
      <footer className="p-4 border-t border-[#DFCCA] text-center text-sm font-medium">
        Onboarding footer
      </footer>
    </div>
  );
}
