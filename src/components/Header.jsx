import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCafe } from "../context/CafeContext";

export default function Header() {
  const { cafeData } = useCafe();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, href) => {
    closeMobileMenu();

    if (href === "/") {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to home with target hash
        navigate(`/#${sectionId}`);
      }
      return;
    }
  };

  // Close on Escape key press and prevent background scroll when drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#1E100A]/95 backdrop-blur-md border-b border-[#321B11] text-[#FAF5EE] transition-colors shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-20">
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="font-serif text-2xl font-bold tracking-wide text-[#FAF5EE] hover:text-[#C07A46] transition-colors flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            >
              <span className="w-8 h-8 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-sm font-serif shadow-xs">
                C
              </span>
              <span>{cafeData.brand.name}</span>
            </Link>

            <nav
              aria-label="Desktop Navigation"
              className="flex items-center space-x-7 text-sm font-medium text-[#D1B89F]"
            >
              {cafeData.navigation.map((item) => {
                const isPage = item.href === "/menu" || item.href === "/gallery";
                const isActive =
                  location.pathname === item.href ||
                  (item.href === "/" && location.pathname === "/");

                return isPage ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                      isActive ? "text-[#C07A46] font-semibold" : "hover:text-[#FAF5EE]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <a
              href={`tel:${cafeData.contact.phoneRaw}`}
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs font-semibold rounded-full shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
              </svg>
              <span>Call us</span>
            </a>
          </div>

          {/* Mobile Header (< 768px) */}
          <div className="flex md:hidden items-center justify-between h-16">
            {/* Hamburger toggle button */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="p-2 border border-[#321B11] text-[#FAF5EE] bg-[#26140D] hover:bg-[#321B11] rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] transition-colors"
            >
              <span className="sr-only">Menu</span>
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
            </button>

            {/* Logo center */}
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="font-serif text-lg font-bold text-[#FAF5EE] tracking-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            >
              {cafeData.brand.name}
            </Link>

            {/* Call us button */}
            <a
              href={`tel:${cafeData.contact.phoneRaw}`}
              className="px-4 py-1.5 bg-[#C07A46] hover:bg-[#A96434] text-white text-xs font-semibold rounded-full shadow-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            >
              Call us
            </a>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE SIDEBAR: Slides smoothly from the side with backdrop  */}
      {/* ============================================================ */}
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Side Drawer panel coming from left */}
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Sidebar"
        className={`fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-[#1E100A] text-[#FAF5EE] z-50 p-6 flex flex-col justify-between shadow-2xl border-r border-[#321B11] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Top Header with Brand and Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-[#321B11] mb-6">
            <Link
              to="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="font-serif text-xl font-bold tracking-wide text-[#FAF5EE] flex items-center gap-2.5"
            >
              <span className="w-8 h-8 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-sm font-serif font-bold shadow-xs">
                C
              </span>
              <span>{cafeData.brand.name}</span>
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label="Close navigation menu"
              className="p-2 text-[#D1B89F] hover:text-white rounded-full hover:bg-[#26140D] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links with smooth hover styling */}
          <nav aria-label="Mobile Navigation Links" className="flex flex-col space-y-2">
            {cafeData.navigation.map((item) => {
              const isPage = item.href === "/menu" || item.href === "/gallery";
              const isActive =
                location.pathname === item.href ||
                (item.href === "/" && location.pathname === "/");

              return isPage ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`py-3 px-3.5 rounded-xl text-base font-medium transition-all flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] ${
                    isActive
                      ? "bg-[#26140D] text-[#C07A46] font-semibold"
                      : "text-[#FAF5EE] hover:bg-[#26140D] hover:text-[#C07A46]"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    className="w-4 h-4 text-[#D1B89F] group-hover:text-[#C07A46] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="py-3 px-3.5 rounded-xl text-base font-medium text-[#FAF5EE] hover:bg-[#26140D] hover:text-[#C07A46] transition-all flex items-center justify-between group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
                >
                  <span>{item.label}</span>
                  <svg
                    className="w-4 h-4 text-[#D1B89F] group-hover:text-[#C07A46] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer with direct Call button */}
        <div className="pt-6 border-t border-[#321B11] space-y-3">
          <a
            href={`tel:${cafeData.contact.phoneRaw}`}
            className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#C07A46] hover:bg-[#A96434] text-white rounded-full text-sm font-semibold shadow-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
            </svg>
            <span>Call us: {cafeData.contact.phone}</span>
          </a>
          <p className="text-[11px] text-center text-[#A8917A]">
            {cafeData.hours.display}
          </p>
        </div>
      </aside>
    </>
  );
}
