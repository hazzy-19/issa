import React from "react";
import { cafeData } from "../data/cafe";

export default function Footer() {
  return (
    <footer className="bg-[#140A06] text-[#D1B89F] pt-16 pb-12 text-sm border-t border-[#26140D]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Interesting Top Artisan Badge Banner */}
        <div className="mb-14 pb-10 border-b border-[#26140D] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C07A46]/15 border border-[#C07A46]/30 flex items-center justify-center text-[#C07A46]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-base font-bold text-[#FAF5EE]">
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

        {/* Main Footer Info: Stacked on mobile, 3 columns on desktop */}
        <div className="flex flex-col space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-12 mb-12">
          {/* Brand Blurb */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#C07A46] text-white flex items-center justify-center text-xs font-serif font-bold">
                C
              </span>
              <h3 className="font-serif text-xl font-bold text-[#FAF5EE]">
                {cafeData.brand.name}
              </h3>
            </div>
            <p className="text-[#A8917A] max-w-xs leading-relaxed mb-4">
              {cafeData.brand.blurb}
            </p>
            <div className="inline-block text-[11px] font-semibold text-[#C07A46] bg-[#C07A46]/10 px-3 py-1 rounded-full border border-[#C07A46]/20">
              Your neighborhood daily ritual
            </div>
          </div>

          {/* Visit Us */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#FAF5EE] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Visit us</span>
            </h3>
            <p className="text-[#FAF5EE] font-medium">{cafeData.contact.address}</p>
            <p className="text-[#A8917A] mt-2.5 text-xs sm:text-sm">
              <a
                href={`mailto:${cafeData.contact.email}`}
                className="hover:text-[#C07A46] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
              >
                {cafeData.contact.email}
              </a>
              {" - "}
              <a
                href={`tel:${cafeData.contact.phoneRaw}`}
                className="hover:text-[#C07A46] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
              >
                {cafeData.contact.phone}
              </a>
            </p>
            <p className="text-[11px] text-[#8C7662] mt-3">
              Indoor seating, cozy patio and takeaway available.
            </p>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#FAF5EE] mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#C07A46]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Opening hours</span>
            </h3>
            <div className="space-y-1.5 text-xs sm:text-sm text-[#FAF5EE]">
              {cafeData.hours.lines.map((line) => (
                <div key={line.days} className="flex items-center justify-between py-1 border-b border-[#26140D]">
                  <span className="text-[#A8917A]">{line.days}</span>
                  <span className="font-semibold text-[#FAF5EE]">{line.hours}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#C07A46] mt-2 font-medium">
              {cafeData.hours.kitchenNotice}
            </p>
          </div>
        </div>

        {/* Social Media Pages with Circular Badges */}
        <div className="text-center pt-8 border-t border-[#26140D]">
          <h4 className="font-serif text-sm font-semibold text-[#FAF5EE] mb-4">
            Social media pages
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
            {cafeData.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                className="px-4 py-2 rounded-full bg-[#1E100A] border border-[#321B11] text-[#D1B89F] hover:text-[#FAF5EE] hover:bg-[#C07A46] hover:border-[#C07A46] transition-all shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C07A46]"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-[#7A6452]">
          <p>© {cafeData.copyrightYear} {cafeData.brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
