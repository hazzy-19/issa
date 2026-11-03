import React from "react";
import { Link } from "react-router-dom";
import { cafeData } from "../data/cafe";

export default function WelcomePage() {
  const handleSeeLiveExample = () => {
    try {
      sessionStorage.setItem("cafe_demo_allowed", "true");
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  const steps = [
    {
      number: "01",
      title: "Add your café details",
      description:
        "Enter your café name, tagline, opening schedule, and warm welcome blurb.",
    },
    {
      number: "02",
      title: "Connect maps & contacts",
      description:
        "Provide your street address for Google Maps and phone for one-tap WhatsApp orders.",
    },
    {
      number: "03",
      title: "Launch & share with guests",
      description:
        "Your site is immediately ready on phones, tablets, and desktops. Update anytime.",
    },
  ];

  const features = [
    {
      title: "Hours & Schedule",
      description:
        "Display weekday and weekend service hours, kitchen cut-offs, and allergy notes clearly.",
      icon: (
        <svg className="w-5 h-5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Map & Directions",
      description:
        "Interactive Google Maps embed and one-click navigation link straight to your front door.",
      icon: (
        <svg className="w-5 h-5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      title: "WhatsApp Link",
      description:
        "Direct chat button so customers can reserve a table or order takeaway with one tap.",
      icon: (
        <svg className="w-5 h-5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      title: "Social Links",
      description:
        "Link your Instagram, Facebook, TikTok, and Twitter so guests follow your daily specials.",
      icon: (
        <svg className="w-5 h-5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
  ];

  const trustPoints = [
    "No code needed",
    "Mobile ready",
    "WhatsApp ordering",
  ];

  return (
    <div className="py-6 sm:py-12 max-w-5xl mx-auto space-y-12 sm:space-y-16">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section
        id="top"
        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E100A] via-[#2A160E] to-[#140A06] text-[#FAF5EE] p-5 sm:p-10 lg:p-12 border border-[#321B11] shadow-2xl"
      >
        {/* Subtle decorative background glow */}
        <div
          className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#C07A46]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#321B11] border border-[#C07A46]/40 text-[#C07A46] text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C07A46] animate-pulse" />
              <span>Café Owner Onboarding</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Your café website, ready in under five minutes.
            </h1>

            <p className="text-sm sm:text-base text-[#D1B89F] leading-relaxed mb-6 sm:mb-8">
              Create an inviting digital home for your coffeehouse or bistro. Set up your hours, location, WhatsApp ordering, and social channels without touching a line of code.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
              <Link
                to="/setup"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#C07A46] hover:bg-[#D58E59] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
              >
                Get started
              </Link>

              <Link
                to="/?example=true"
                onClick={handleSeeLiveExample}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF5EE] text-sm font-semibold rounded-full border border-white/25 backdrop-blur-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white text-center"
              >
                See a live example
              </Link>
            </div>

            {/* Trust points row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-2 border-t border-[#321B11]/80 text-xs text-[#D1B89F]">
              {trustPoints.map((point) => (
                <div key={point} className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#C07A46] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image Collage & Floating Mini Site Preview Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-none mx-auto aspect-[4/4] sm:aspect-[4/4] lg:aspect-[4/5]">
              {/* Soft caramel radial glow behind collage */}
              <div
                className="absolute -inset-4 bg-[#C07A46]/25 rounded-full blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* 1. Large Image: Latte art (heroSlides[0]) */}
              <div className="absolute top-4 left-4 sm:left-6 w-[70%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#26140D]">
                <img
                  src={cafeData.brand.heroSlides[0]?.url}
                  alt={cafeData.brand.heroSlides[0]?.alt || "Barista pouring latte art into cup"}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2. Second Image: Café interior (heroSlides[1]), overlapping bottom left with 4px cream border */}
              <div className="absolute bottom-2 left-0 w-[54%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF5EE] z-10 bg-[#26140D]">
                <img
                  src={cafeData.brand.heroSlides[1]?.url}
                  alt={cafeData.brand.heroSlides[1]?.alt || "Sunlit café interior and seating"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 3. Third Image: Avocado toast (chefsPicks[0].image), overlapping top right with 4px cream border */}
              <div className="absolute top-0 right-1 sm:right-2 w-[42%] aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF5EE] z-10 bg-[#26140D]">
                <img
                  src={cafeData.chefsPicks[0]?.image}
                  alt="Fresh artisan avocado toast with poached egg"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 4. Floating Mini Site Preview Card on top of collage */}
              <div className="absolute -bottom-3 right-0 sm:right-2 z-20 bg-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-[#DFCCA] text-[#1E100A] max-w-[210px] sm:max-w-[230px] w-full animate-gentle-float">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C07A46] flex-shrink-0" />
                  <span className="font-serif font-bold text-xs sm:text-sm text-[#1E100A] truncate">
                    {cafeData.brand.name}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#542F1E] mb-2 font-medium">
                  Open today 8:00 am to 8:00 pm
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-[#DFCCA]/60">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#C07A46] text-white text-[10px] font-semibold rounded-full shadow-xs">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z" />
                    </svg>
                    <span>Call us</span>
                  </span>
                  <span className="text-[10px] text-[#7A4B29] font-medium">
                    Menu &bull; Directions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HOW IT WORKS ROW (3 STEPS)                                */}
      {/* ============================================================ */}
      <section id="how" className="scroll-mt-24 space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E100A] mb-2">
            How it works
          </h2>
          <p className="text-xs sm:text-sm text-[#542F1E]">
            Three straightforward steps to launch your digital storefront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#DFCCA] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="w-10 h-10 rounded-full bg-[#C07A46]/10 text-[#C07A46] font-serif font-bold text-sm flex items-center justify-center mb-4">
                {step.number}
              </div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E100A] mb-2">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#542F1E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT YOU CAN SET UP (2 COLUMNS ON MOBILE)                 */}
      {/* ============================================================ */}
      <section id="features" className="scroll-mt-24 space-y-6">
        <div className="text-center max-w-md mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E100A] mb-2">
            What you can set up
          </h2>
          <p className="text-xs sm:text-sm text-[#542F1E]">
            All essential customer touchpoints included right out of the box.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#DFCCA] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#FAF5EE] border border-[#DFCCA] flex items-center justify-center mb-3">
                  {feat.icon}
                </div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#1E100A] mb-1.5">
                  {feat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#542F1E] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FINAL CALL TO ACTION / EXAMPLE                            */}
      {/* ============================================================ */}
      <section id="example" className="scroll-mt-24 bg-[#1E100A] text-[#FAF5EE] rounded-3xl p-6 sm:p-10 text-center border border-[#321B11] shadow-xl space-y-4">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
          Ready to set up your café?
        </h2>
        <p className="text-xs sm:text-sm text-[#D1B89F] max-w-lg mx-auto leading-relaxed">
          It takes just a couple of minutes to fill in your details and view your site live on any device.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/setup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#C07A46] hover:bg-[#D58E59] text-white text-sm font-semibold rounded-full shadow-lg transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Get started
          </Link>
          <Link
            to="/?example=true"
            onClick={handleSeeLiveExample}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-xs sm:text-sm text-[#D1B89F] hover:text-white transition-colors"
          >
            Or preview the live example
          </Link>
        </div>
      </section>
    </div>
  );
}
