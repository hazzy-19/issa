import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin, MessageCircle, Share2 } from "lucide-react";
import { cafeData } from "../data/cafe";
import { useInView } from "../hooks/useInView";

function getOptimizedImageUrl(url, width = 800) {
  if (!url) return "";
  if (url.includes("images.unsplash.com")) {
    return url.replace(/w=\d+/, `w=${width}`);
  }
  return url;
}

function AnimatedCard({ children, index = 0, className = "" }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const delayMs = index * 80;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all duration-700 ease-out ${
        isInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 motion-reduce:opacity-100 motion-reduce:translate-y-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

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
      title: "Tell us about your café",
      description:
        "Fill out a fast 4-step form with your café name, opening hours, address, and social links.",
      visual: (
        <div className="aspect-[16/10] w-full rounded-2xl bg-[#1E100A] p-3.5 sm:p-4 flex flex-col justify-between shadow-inner border border-[#321B11]">
          <div className="space-y-2">
            <div className="h-2 w-1/3 bg-[#C07A46]/70 rounded-full" />
            <div className="h-4 sm:h-5 w-full bg-[#26140D] rounded-md border border-white/10 px-2 flex items-center">
              <div className="h-1.5 w-1/2 bg-white/30 rounded-full" />
            </div>
            <div className="h-4 sm:h-5 w-full bg-[#26140D] rounded-md border border-white/10 px-2 flex items-center">
              <div className="h-1.5 w-2/3 bg-white/30 rounded-full" />
            </div>
            <div className="h-4 sm:h-5 w-full bg-[#26140D] rounded-md border border-white/10 px-2 flex items-center">
              <div className="h-1.5 w-1/3 bg-white/30 rounded-full" />
            </div>
          </div>
          <div className="pt-1">
            <div className="h-5 sm:h-6 w-20 bg-[#C07A46] rounded-full flex items-center justify-center shadow-xs">
              <div className="h-1.5 w-10 bg-white rounded-full" />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Or just describe it",
      description:
        "Use natural phrasing in plain English to adjust schedules, dishes, or contact details in seconds.",
      visual: (
        <div className="aspect-[16/10] w-full rounded-2xl bg-[#1E100A] p-3.5 sm:p-4 flex flex-col justify-between shadow-inner border border-[#321B11]">
          <div className="space-y-2">
            {/* User message */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#C07A46] text-white text-[10px] sm:text-[11px] leading-tight px-3 py-1.5 rounded-2xl rounded-tr-xs shadow-xs font-medium">
                Open 8 to 8 on weekdays, 9 to 8 weekends
              </div>
            </div>
            {/* Assistant reply */}
            <div className="flex justify-start items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#C07A46]/20 text-[#C07A46] flex items-center justify-center text-[9px] font-bold">
                A
              </span>
              <div className="max-w-[75%] bg-[#26140D] text-[#FAF5EE] border border-white/10 text-[10px] sm:text-[11px] leading-tight px-3 py-1.5 rounded-2xl rounded-tl-xs shadow-xs font-medium">
                Done. Hours updated.
              </div>
            </div>
          </div>
          <div className="h-5 sm:h-6 w-full bg-[#26140D] rounded-full border border-white/10 px-2.5 flex items-center justify-between text-[9px] sm:text-[10px] text-[#D1B89F]">
            <span>Type a change...</span>
            <span className="w-3.5 h-3.5 rounded-full bg-[#C07A46] flex items-center justify-center text-white text-[8px] font-bold">&uarr;</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Your site goes live",
      description:
        "Instantly share your personalized website link with guests for one-tap orders, directions, and hours.",
      visual: (
        <div className="aspect-[16/10] w-full rounded-2xl bg-[#1E100A] overflow-hidden shadow-inner border border-[#321B11] flex flex-col">
          {/* Browser chrome bar */}
          <div className="h-5 sm:h-6 bg-[#26140D] border-b border-[#321B11] px-2.5 flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
            <div className="ml-2 h-2.5 w-28 bg-white/15 rounded-full" />
          </div>
          {/* Image preview */}
          <div className="relative flex-1 w-full overflow-hidden bg-[#1E100A]">
            <img
              src={getOptimizedImageUrl(cafeData.gallery[9]?.image, 800)}
              alt={cafeData.gallery[9]?.title || "Live café dining room preview"}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-end p-2.5">
              <span className="text-[10px] sm:text-xs font-semibold text-white drop-shadow-xs truncate">
                {cafeData.brand.name} &bull; Live online
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const featuresList = [
    {
      title: "Opening hours",
      description:
        "Display weekday and weekend schedules, kitchen cut-offs, and allergy notices clearly.",
      type: "icon",
      icon: <Clock className="w-5 h-5 text-[#C07A46]" aria-hidden="true" />,
    },
    {
      title: "Map and directions",
      description:
        "Interactive Google Maps embed and one-click navigation link straight to your entrance.",
      type: "icon",
      icon: <MapPin className="w-5 h-5 text-[#C07A46]" aria-hidden="true" />,
    },
    {
      title: "WhatsApp ordering",
      description:
        "Direct chat button so customers can reserve a table or order takeaway in a single tap.",
      type: "icon",
      icon: <MessageCircle className="w-5 h-5 text-[#C07A46]" aria-hidden="true" />,
    },
    {
      title: "Social links",
      description:
        "Link your Instagram, TikTok, Facebook, and Twitter so guests follow your daily moments.",
      type: "icon",
      icon: <Share2 className="w-5 h-5 text-[#C07A46]" aria-hidden="true" />,
    },
    {
      title: "Menu and prices",
      description:
        "Showcase dishes, bakery items, prices, dietary tags, and chef's picks with high-resolution photos.",
      type: "thumbnail",
      image: getOptimizedImageUrl(cafeData.menuHighlights[1]?.image || cafeData.menuItems[0]?.image, 800),
      alt: "Handmade pasta and artisan café dishes",
    },
    {
      title: "Photo gallery",
      description:
        "Pinterest-style masonry gallery sharing candid moments, coffee roasts, and cozy dining spaces.",
      type: "thumbnail",
      image: getOptimizedImageUrl(cafeData.gallery[0]?.image, 800),
      alt: "Customers enjoying morning coffee in café",
    },
  ];

  const trustPoints = [
    "No code needed",
    "Mobile ready",
    "WhatsApp ordering",
  ];

  return (
    <div className="space-y-0 overflow-x-hidden">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section
        id="top"
        className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pb-16 lg:pb-20"
      >
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E100A] via-[#2A160E] to-[#140A06] text-[#FAF5EE] p-5 sm:p-10 lg:p-12 border border-[#321B11] shadow-2xl">
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

              <p className="text-sm sm:text-base text-[#FAF5EE]/90 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Create an inviting digital home for your coffeehouse or bistro. Set up your hours, location, WhatsApp ordering, and social channels without touching a line of code.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-6">
                <Link
                  to="/setup"
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-[#C07A46] hover:bg-[#D58E59] text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2 text-center"
                >
                  Get started
                </Link>

                <Link
                  to="/?example=true"
                  onClick={handleSeeLiveExample}
                  className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF5EE] text-xs sm:text-sm font-semibold rounded-full border border-white/25 backdrop-blur-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 text-center"
                >
                  See a live example
                </Link>
              </div>

              {/* Trust points row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 border-t border-[#321B11]/80 text-xs text-[#FAF5EE]/85">
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

                {/* 1. Large Image: Latte art (eager loaded, only eager image on page) */}
                <div className="absolute top-4 left-4 sm:left-6 w-[70%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-[#26140D]">
                  <img
                    src={getOptimizedImageUrl(cafeData.brand.heroSlides[0]?.url, 1200)}
                    alt={cafeData.brand.heroSlides[0]?.alt || "Barista pouring latte art into cup"}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 2. Second Image: Café interior */}
                <div className="absolute bottom-2 left-0 w-[54%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF5EE] z-10 bg-[#26140D]">
                  <img
                    src={getOptimizedImageUrl(cafeData.brand.heroSlides[1]?.url, 800)}
                    alt={cafeData.brand.heroSlides[1]?.alt || "Sunlit café interior and seating"}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 3. Third Image: Avocado toast */}
                <div className="absolute top-0 right-1 sm:right-2 w-[42%] aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF5EE] z-10 bg-[#26140D]">
                  <img
                    src={getOptimizedImageUrl(cafeData.chefsPicks[0]?.image, 800)}
                    alt="Fresh artisan avocado toast with poached egg"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 4. Floating Mini Site Preview Card */}
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
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. HOW IT WORKS (Cream background, py-20 to py-28)           */}
      {/* ============================================================ */}
      <section
        id="how"
        className="scroll-mt-20 bg-[#FAF5EE] border-t border-[#DFCCA] py-20 sm:py-24 lg:py-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C07A46] mb-2.5">
              Simple Three-Step Setup
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E100A]">
              How it works
            </h2>
            <p className="text-xs sm:text-sm text-[#542F1E] mt-3 leading-relaxed">
              Launch an inviting, mobile-ready digital presence for your café in three simple steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting dashed line on desktop */}
            <div
              className="hidden md:block absolute top-[4.5rem] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-[#C07A46]/35 z-0 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
              {steps.map((step, index) => (
                <AnimatedCard key={step.number} index={index}>
                  <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#DFCCA] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0 flex flex-col justify-between h-full group">
                    <div>
                      {/* Top Visual: 16/10 aspect ratio */}
                      <div className="mb-5 overflow-hidden rounded-2xl">
                        {step.visual}
                      </div>

                      {/* Numbered circle */}
                      <div className="w-9 h-9 rounded-full bg-[#C07A46]/10 text-[#C07A46] font-serif font-bold text-sm flex items-center justify-center mb-3">
                        {step.number}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E100A] mb-2">
                        {step.title}
                      </h3>

                      {/* Two lines description */}
                      <p className="text-xs sm:text-sm text-[#542F1E] leading-relaxed line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. WHAT YOU CAN SET UP (White background, py-20 to py-28)    */}
      {/* ============================================================ */}
      <section
        id="features"
        className="scroll-mt-20 bg-white border-t border-[#DFCCA] py-20 sm:py-24 lg:py-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C07A46] mb-2.5">
              Everything Included
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E100A]">
              What you can set up
            </h2>
            <p className="text-xs sm:text-sm text-[#542F1E] mt-3 leading-relaxed">
              All essential customer touchpoints included right out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {featuresList.map((feat, index) => (
              <AnimatedCard key={feat.title} index={index}>
                <div className="bg-[#FAF5EE]/70 rounded-3xl p-5 sm:p-6 border border-[#DFCCA] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 motion-reduce:hover:translate-y-0 flex flex-col justify-between h-full group">
                  <div>
                    {/* Visual: Icon or Image Thumbnail */}
                    {feat.type === "thumbnail" ? (
                      <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden mb-4 bg-[#26140D] shadow-inner">
                        <img
                          src={feat.image}
                          alt={feat.alt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200 motion-reduce:group-hover:scale-100"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-[#C07A46]/10 border border-[#C07A46]/20 flex items-center justify-center mb-4">
                        {feat.icon}
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#1E100A] mb-2">
                      {feat.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#542F1E] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. SHOWCASE: SEE WHAT YOU GET (id="example")                 */}
      {/* ============================================================ */}
      <section
        id="example"
        className="scroll-mt-20 bg-[#FAF5EE] border-t border-[#DFCCA] py-20 sm:py-24 lg:py-28"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#C07A46] mb-2.5">
              Live Preview
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1E100A]">
              See what you get
            </h2>
            <p className="text-xs sm:text-sm text-[#542F1E] mt-3 leading-relaxed">
              A complete, mobile-optimized website for your café with all the details your customers look for.
            </p>
          </div>

          {/* Large Browser Frame Mockup */}
          <div className="relative max-w-4xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl border border-[#321B11] shadow-2xl bg-[#1E100A] overflow-hidden">
              {/* Browser Header Bar */}
              <div className="h-9 sm:h-11 bg-[#26140D] border-b border-[#321B11] px-3.5 sm:px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="w-48 sm:w-64 bg-[#1E100A] text-[#D1B89F] text-[11px] sm:text-xs font-mono py-1 px-3 rounded-full border border-white/10 flex items-center justify-center gap-1.5">
                  <svg className="w-3 h-3 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>yourcafe.com</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Accessible Summary for Screen Readers */}
              <p className="sr-only">
                Preview of a completed café website showing the full-bleed hero banner, opening hours, chef's picks menu items, and photo gallery.
              </p>

              {/* Mockup Canvas (Non-interactive) */}
              <div
                aria-hidden="true"
                className="pointer-events-none select-none bg-[#FAF5EE] text-[#1E100A] p-3 sm:p-6 space-y-4 sm:space-y-6"
              >
                {/* 1. Mini Hero */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/7] sm:aspect-[16/6] bg-[#1E100A] flex items-center px-4 sm:px-8">
                  <img
                    src={getOptimizedImageUrl(cafeData.brand.heroSlides[0]?.url, 1200)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="relative z-10 max-w-sm text-left">
                    <div className="font-serif font-bold text-base sm:text-2xl text-white leading-tight mb-1">
                      {cafeData.brand.name}
                    </div>
                    <p className="text-[10px] sm:text-xs text-[#FAF5EE]/90 line-clamp-1 mb-2">
                      {cafeData.brand.tagline}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C07A46] text-white text-[9px] sm:text-[10px] font-semibold">
                        Explore our menu
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[9px] sm:text-[10px] font-semibold border border-white/30 backdrop-blur-xs">
                        Get directions
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Mini Chef's Picks Row */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#1E100A]">
                      Chef's picks
                    </span>
                    <span className="text-[10px] text-[#C07A46] font-semibold">
                      Full menu &rarr;
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {cafeData.chefsPicks.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-2 border border-[#DFCCA] shadow-2xs"
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-1.5 bg-[#FAF5EE]">
                          <img
                            src={getOptimizedImageUrl(item.image, 600)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1 right-1 bg-black/70 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                            {item.price}
                          </span>
                        </div>
                        <p className="font-serif font-bold text-[10px] sm:text-xs truncate text-[#1E100A]">
                          {item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Mini Gallery Row */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-xs sm:text-sm text-[#1E100A]">
                      The space & moments
                    </span>
                    <span className="text-[10px] text-[#C07A46] font-semibold">
                      Full gallery &rarr;
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {cafeData.gallery.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="aspect-[4/3] rounded-xl overflow-hidden bg-[#26140D] border border-[#DFCCA]"
                      >
                        <img
                          src={getOptimizedImageUrl(item.image, 600)}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Three Pointing Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mt-6">
              <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFCCA] shadow-xs text-xs font-semibold text-[#1E100A]">
                <span className="text-[#C07A46] font-bold">&uarr;</span>
                <span>Your hours and location</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFCCA] shadow-xs text-xs font-semibold text-[#1E100A]">
                <span className="text-[#C07A46] font-bold">&uarr;</span>
                <span>Your menu with prices</span>
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DFCCA] shadow-xs text-xs font-semibold text-[#1E100A]">
                <span className="text-[#C07A46] font-bold">&uarr;</span>
                <span>Your photos</span>
              </div>
            </div>

            {/* Live Example Button */}
            <div className="text-center mt-8">
              <Link
                to="/?example=true"
                onClick={handleSeeLiveExample}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#1E100A] hover:bg-[#C07A46] text-[#FAF5EE] text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
              >
                <span>See the live example</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. SOCIAL PROOF STRIP (Honest, generic stat blocks)          */}
      {/* ============================================================ */}
      <section className="bg-white border-t border-[#DFCCA] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#DFCCA]">
            <div className="pt-4 sm:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1E100A] mb-1">
                5 minutes
              </div>
              <p className="text-xs sm:text-sm text-[#542F1E]">
                Average time to set up
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C07A46] mb-1">
                0 lines
              </div>
              <p className="text-xs sm:text-sm text-[#542F1E]">
                Of code required
              </p>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-4">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#1E100A] mb-1">
                100%
              </div>
              <p className="text-xs sm:text-sm text-[#542F1E]">
                Mobile and desktop ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. FINAL FULL-WIDTH CALL TO ACTION (Flush with footer)       */}
      {/* ============================================================ */}
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden mb-0">
        {/* Background Image: heroSlides[3] */}
        <img
          src={getOptimizedImageUrl(cafeData.brand.heroSlides[3]?.url, 1200)}
          alt={cafeData.brand.heroSlides[3]?.alt || "Warm ambient café interior"}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark espresso overlay (70% opacity) with soft gradient toward bottom */}
        <div
          className="absolute inset-0 bg-[#1E100A]/70 bg-gradient-to-b from-[#1E100A]/65 via-[#1E100A]/75 to-[#140A06]"
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-[#FAF5EE]">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Ready to open your doors online?
          </h2>
          <p className="text-sm sm:text-base text-[#FAF5EE]/90 max-w-lg mx-auto leading-relaxed mb-8">
            Set up your café presence in minutes and welcome local customers with a beautiful, fast digital storefront.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/setup"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-[#C07A46] hover:bg-[#D58E59] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46] focus-visible:outline-offset-2"
            >
              Get started
            </Link>

            <Link
              to="/setup/assistant"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 bg-transparent hover:bg-white/10 text-white text-sm font-semibold rounded-full border border-white/40 backdrop-blur-xs transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              Describe it instead
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
