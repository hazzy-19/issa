import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PRODUCT_NAME, PRODUCT_TAGLINE, PRODUCT_YEAR } from "../config/product";

export default function OnboardingFooter() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault();
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
    try {
      sessionStorage.setItem("cafe_demo_allowed", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  return (
    <footer className="bg-[#140A06] text-[#D1B89F] pt-12 pb-10 text-sm border-t border-[#26140D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info (spans 2 cols on mobile, 1 on desktop) */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/welcome"
              className="font-serif text-lg font-bold text-[#FAF5EE] flex items-center gap-2 mb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-md"
            >
              <span className="w-6 h-6 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-xs font-serif font-bold shadow-xs">
                {PRODUCT_NAME.charAt(0)}
              </span>
              <span>{PRODUCT_NAME}</span>
            </Link>
            <p className="text-xs text-[#A8917A] max-w-xs leading-relaxed">
              {PRODUCT_TAGLINE}
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="col-span-1">
            <h3 className="font-serif text-xs uppercase tracking-wider font-bold text-[#FAF5EE] mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#how"
                  onClick={(e) => handleAnchorClick(e, "how")}
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => handleAnchorClick(e, "features")}
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#example"
                  onClick={(e) => handleAnchorClick(e, "example")}
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  Example
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Start */}
          <div className="col-span-1">
            <h3 className="font-serif text-xs uppercase tracking-wider font-bold text-[#FAF5EE] mb-3">
              Start
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/setup"
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  Get started
                </Link>
              </li>
              <li>
                <Link
                  to="/setup/assistant"
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  Describe it instead
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: See it */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-serif text-xs uppercase tracking-wider font-bold text-[#FAF5EE] mb-3">
              See it
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/?example=true"
                  onClick={handleSeeLiveExample}
                  className="hover:text-[#FAF5EE] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 rounded-sm"
                >
                  Live example
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row: Product copyright only (no cafe address, phone, or socials) */}
        <div className="pt-6 border-t border-[#26140D] text-center text-xs text-[#7A6452]">
          <p>&copy; {PRODUCT_YEAR} {PRODUCT_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
