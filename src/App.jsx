import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import GalleryPage from "./pages/GalleryPage";
import WelcomePage from "./pages/WelcomePage";
import SetupPage from "./pages/SetupPage";
import { CafeProvider, useCafe } from "./context/CafeContext";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 50);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function HomeRouteHandler() {
  const { hasSaved } = useCafe();
  const location = useLocation();

  // Allow visiting live example if demo flag or query param is set
  const isDemo =
    location.search.includes("example") ||
    location.search.includes("demo") ||
    Boolean(location.state?.allowDemo) ||
    (typeof window !== "undefined" && sessionStorage.getItem("cafe_demo_allowed") === "true");

  // First-visit redirect: redirect the home route to /welcome when hasSaved is false
  if (!hasSaved && !isDemo) {
    return <Navigate to="/welcome" replace />;
  }

  return (
    <>
      {!hasSaved && isDemo && (
        <div className="bg-[#1E100A] text-[#FAF5EE] py-2 px-4 rounded-2xl mb-4 border border-[#321B11] flex items-center justify-between text-xs shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C07A46] animate-pulse" />
            <span className="font-medium">You are viewing the live example site.</span>
          </div>
          <Link
            to="/setup"
            className="px-3.5 py-1 bg-[#C07A46] hover:bg-[#D58E59] text-white font-semibold rounded-full transition-colors text-[11px]"
          >
            Set up your café
          </Link>
        </div>
      )}
      <HomePage />
    </>
  );
}

export default function App() {
  return (
    <CafeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF5EE] text-[#1E100A] font-sans selection:bg-[#C07A46]/20 selection:text-[#1E100A] overflow-x-hidden">
          {/* Accessible skip link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1E100A] focus:text-[#FAF5EE] focus:outline-none focus:ring-2 focus:ring-[#C07A46] rounded-full text-xs font-semibold"
          >
            Skip to main content
          </a>

          {/* Global Sticky Header */}
          <Header />

          {/* Main Content Pages */}
          <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6">
            <Routes>
              <Route path="/" element={<HomeRouteHandler />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/setup" element={<SetupPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="*" element={<HomeRouteHandler />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </CafeProvider>
  );
}
