import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_NAME } from "../config/product";

export default function OnboardingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isSetupFlow =
    location.pathname === "/setup" ||
    location.pathname.startsWith("/setup/");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
    closeMobileMenu();

    if (location.pathname === "/welcome") {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/welcome#${targetId}`);
    }
  };

  const handleSeeLiveExample = () => {
    closeMobileMenu();
    try {
      sessionStorage.setItem("cafe_demo_allowed", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  // Close dropdown on Escape key and handle window resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "How it works", target: "how" },
    { label: "Features", target: "features" },
    { label: "Example", target: "example" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1E100A]/95 backdrop-blur-md border-b border-[#321B11] text-[#FAF5EE] transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Brand Logo & Name */}
          <Link
            to="/welcome"
            onClick={closeMobileMenu}
            className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-[#FAF5EE] hover:text-[#C07A46] transition-colors flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-lg"
          >
            <span className="w-8 h-8 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-sm font-serif font-bold shadow-xs">
              {PRODUCT_NAME.charAt(0)}
            </span>
            <span>{PRODUCT_NAME}</span>
          </Link>

          {/* Setup / Assistant View: Show "Back to welcome" instead of anchor links */}
          {isSetupFlow ? (
            <div className="flex items-center gap-4">
              <Link
                to="/welcome"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#D1B89F] hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-lg py-1 px-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to welcome</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Centre (Desktop): Anchor Links */}
              <nav
                aria-label="Onboarding Navigation"
                className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#D1B89F]"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.target}
                    href={`#${link.target}`}
                    onClick={(e) => handleAnchorClick(e, link.target)}
                    className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-md py-1 px-1.5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Right (Desktop): Actions */}
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/?example=true"
                  onClick={handleSeeLiveExample}
                  className="text-xs sm:text-sm font-medium text-[#D1B89F] hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-md py-1.5 px-2.5"
                >
                  See a live example
                </Link>

                <Link
                  to="/setup"
                  className="inline-flex items-center justify-center px-5 py-2 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm hover:shadow transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
                >
                  Get started
                </Link>
              </div>

              {/* Mobile Hamburger Toggle (below md) */}
              <div className="flex md:hidden items-center gap-2">
                <Link
                  to="/setup"
                  className="px-3.5 py-1.5 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs font-semibold rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
                >
                  Get started
                </Link>

                <button
                  type="button"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="onboarding-mobile-menu"
                  className="p-2 border border-[#321B11] text-[#FAF5EE] bg-[#26140D] hover:bg-[#321B11] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 transition-colors"
                >
                  <span className="sr-only">Menu</span>
                  {isMobileMenuOpen ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Full-Width Dropdown (below md) */}
        {!isSetupFlow && isMobileMenuOpen && (
          <nav
            id="onboarding-mobile-menu"
            aria-label="Mobile Navigation Dropdown"
            className="md:hidden py-4 border-t border-[#321B11] bg-[#1E100A] space-y-2 animate-in fade-in duration-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => handleAnchorClick(e, link.target)}
                className="block py-2.5 px-3 rounded-xl text-sm font-medium text-[#FAF5EE] hover:bg-[#26140D] hover:text-[#C07A46] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#321B11] space-y-2">
              <Link
                to="/?example=true"
                onClick={handleSeeLiveExample}
                className="block py-2.5 px-3 rounded-xl text-sm font-medium text-[#D1B89F] hover:bg-[#26140D] hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
              >
                See a live example
              </Link>

              <Link
                to="/setup"
                onClick={closeMobileMenu}
                className="block text-center py-2.5 px-4 bg-[#C07A46] hover:bg-[#A96434] text-white text-sm font-semibold rounded-full shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
              >
                Get started
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
