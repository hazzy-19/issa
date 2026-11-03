import React from "react";
import { Link } from "react-router-dom";
import { useCafe } from "../context/CafeContext";

export default function Footer() {
  const { cafeData } = useCafe();
  return (
    <footer className="bg-[#140A06] text-[#D1B89F] pt-12 sm:pt-16 pb-10 sm:pb-12 text-sm border-t border-[#26140D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Artisan Badge Banner */}
        <div className="mb-10 sm:mb-12 pb-6 sm:pb-8 border-b border-[#26140D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C07A46]/15 border border-[#C07A46]/30 flex items-center justify-center text-[#C07A46] flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-sm sm:text-base font-bold text-[#FAF5EE]">
                Freshly Roasted & Ground Daily
              </p>
              <p className="text-xs text-[#D1B89F]">
                Ethically sourced single-origin beans and artisanal comforting dishes
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#26140D] border border-[#3D2217] text-xs font-medium text-[#FAF5EE]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kitchen & Bar Open Daily</span>
          </div>
        </div>

        {/* Main Footer Info: 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-10">
          {/* Brand Blurb: Spans 2 on mobile, 1 on desktop */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-7 h-7 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-xs font-serif font-bold">
                C
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF5EE]">
                {cafeData.brand.name}
              </h3>
            </div>
            <p className="text-[#A8917A] text-xs sm:text-sm max-w-sm leading-relaxed mb-3">
              {cafeData.brand.blurb}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link to="/menu" className="text-[#C07A46] hover:underline font-medium">
                Menu &rarr;
              </Link>
              <span className="text-[#3D2217]">&bull;</span>
              <Link to="/gallery" className="text-[#C07A46] hover:underline font-medium">
                Gallery &rarr;
              </Link>
              <span className="text-[#3D2217]">&bull;</span>
              <Link to="/setup" className="text-[#C07A46] hover:underline font-medium">
                Edit my details &rarr;
              </Link>
            </div>
          </div>

          {/* Visit Us: 1 col on mobile */}
          <div className="col-span-1">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-[#FAF5EE] mb-2 sm:mb-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Visit us</span>
            </h3>
            <p className="text-[#FAF5EE] text-xs sm:text-sm font-medium leading-snug">
              {cafeData.contact.address}
            </p>
            <p className="text-[#A8917A] mt-2 text-[11px] sm:text-xs">
              <a
                href={`tel:${cafeData.contact.phoneRaw}`}
                className="hover:text-[#C07A46] transition-colors"
              >
                {cafeData.contact.phone}
              </a>
            </p>
          </div>

          {/* Opening Hours: 1 col on mobile */}
          <div className="col-span-1">
            <h3 className="font-serif text-xs sm:text-sm font-bold text-[#FAF5EE] mb-2 sm:mb-3 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Hours</span>
            </h3>
            <div className="space-y-1 text-[11px] sm:text-xs text-[#FAF5EE]">
              {cafeData.hours.lines.map((line) => (
                <div key={line.days} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-0.5 border-b border-[#26140D]">
                  <span className="text-[#A8917A]">{line.days}</span>
                  <span className="font-semibold text-[#FAF5EE]">{line.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Pages */}
        <div className="text-center pt-6 border-t border-[#26140D]">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-xs">
            {cafeData.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="px-3.5 py-1.5 rounded-full bg-[#1E100A] border border-[#321B11] text-[#D1B89F] hover:text-[#FAF5EE] hover:bg-[#C07A46] hover:border-[#C07A46] transition-all text-xs"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright & Edit Details Link */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6452] gap-2">
          <p>&copy; {cafeData.copyrightYear} {cafeData.brand.name}. All rights reserved.</p>
          <Link
            to="/setup"
            className="text-[#D1B89F] hover:text-[#C07A46] transition-colors underline flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit my details</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
